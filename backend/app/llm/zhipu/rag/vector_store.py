import os
from typing import List, Optional, Dict, Any
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
from loguru import logger
from settings import (
    ZHIPU_API_KEY,
    CHROMA_PERSIST_DIR,
    CHROMA_COLLECTION_RESUME,
    CHROMA_COLLECTION_JOB
)
from llm.zhipu.embeddings import ZhipuAIEmbeddings


class ChromaVectorStore:
    """ChromaDB 向量存储管理类，负责简历和岗位数据的向量化存储与检索"""

    def __init__(self, collection_name: str):
        """
        初始化向量存储

        Args:
            collection_name: 集合名称，用于区分不同类型的数据（简历/岗位）
        """
        self.embeddings = ZhipuAIEmbeddings()
        self.collection_name = collection_name
        self.persist_directory = CHROMA_PERSIST_DIR

        os.makedirs(self.persist_directory, exist_ok=True)

        self.vectorstore = Chroma(
            collection_name=self.collection_name,
            embedding_function=self.embeddings,
            persist_directory=self.persist_directory
        )
        logger.info(
            f"向量存储初始化完成 | 集合: {self.collection_name} | 目录: {self.persist_directory}")

    def add_documents(self, documents: List[Document]) -> List[str]:
        """
        添加文档到向量存储

        Args:
            documents: LangChain Document 对象列表

        Returns:
            添加的文档ID列表
        """
        if not documents:
            logger.warning("文档列表为空，跳过添加")
            return []

        ids = self.vectorstore.add_documents(documents)
        logger.info(f"添加 {len(documents)} 个文档到集合 {self.collection_name}")
        return ids

    def add_texts(
        self,
        texts: List[str],
        metadatas: Optional[List[Dict[str, Any]]] = None
    ) -> List[str]:
        """
        添加文本到向量存储

        Args:
            texts: 文本列表
            metadatas: 元数据列表（可选）

        Returns:
            添加的文档ID列表
        """
        if not texts:
            logger.warning("文本列表为空，跳过添加")
            return []

        ids = self.vectorstore.add_texts(texts=texts, metadatas=metadatas)
        logger.info(f"添加 {len(texts)} 条文本到集合 {self.collection_name}")
        return ids

    def similarity_search(self, query: str, k: int = 3) -> List[Document]:
        """
        相似度搜索，返回最相似的文档

        Args:
            query: 查询文本
            k: 返回结果数量

        Returns:
            相似文档列表
        """
        results = self.vectorstore.similarity_search(query=query, k=k)
        logger.info(f"相似度搜索 | 查询: {query[:50]}... | 结果数: {len(results)}")
        return results

    def similarity_search_with_score(self, query: str, k: int = 3) -> List[tuple]:
        """
        相似度搜索（带分数），返回最相似的文档及其相似度分数

        Args:
            query: 查询文本
            k: 返回结果数量

        Returns:
            (文档, 分数) 元组列表，分数越小越相似
        """
        results = self.vectorstore.similarity_search_with_score(
            query=query, k=k)
        logger.info(f"带分数相似度搜索 | 查询: {query[:50]}... | 结果数: {len(results)}")
        return results

    def delete_by_metadata(self, key: str, value: str) -> None:
        """
        根据元数据删除文档

        Args:
            key: 元数据键名
            value: 元数据值
        """
        collection = self.vectorstore._collection
        results = collection.get(where={key: value})
        if results['ids']:
            collection.delete(ids=results['ids'])
            logger.info(f"删除 {len(results['ids'])} 个文档 | {key}={value}")
        else:
            logger.info(f"未找到匹配文档 | {key}={value}")

    def get_collection_count(self) -> int:
        """
        获取集合中的文档数量

        Returns:
            文档数量
        """
        collection = self.vectorstore._collection
        count = collection.count()
        logger.info(f"集合 {self.collection_name} 中有 {count} 个文档")
        return count

    def clear_collection(self) -> None:
        """清空集合中的所有文档"""
        self.vectorstore.delete_collection()
        self.vectorstore = Chroma(
            collection_name=self.collection_name,
            embedding_function=self.embeddings,
            persist_directory=self.persist_directory
        )
        logger.info(f"已清空集合 {self.collection_name}")


class ResumeVectorStore(ChromaVectorStore):
    """简历向量存储，专门管理简历数据的存储与检索"""

    def __init__(self):
        """初始化简历向量存储"""
        super().__init__(collection_name=CHROMA_COLLECTION_RESUME)

    def add_resume(
        self,
        resume_text: str,
        file_name: str,
        user_id: Optional[str] = None
    ) -> List[str]:
        """
        添加简历到向量存储

        Args:
            resume_text: 简历文本内容
            file_name: 文件名
            user_id: 用户ID（可选）

        Returns:
            添加的文档ID列表
        """
        metadata = {
            "type": "resume",
            "file_name": file_name,
            "user_id": user_id or "anonymous"
        }
        return self.add_texts([resume_text], [metadata])

    def search_similar_resumes(self, query: str, k: int = 3) -> List[Document]:
        """
        搜索相似简历

        Args:
            query: 查询文本
            k: 返回结果数量

        Returns:
            相似简历文档列表
        """
        return self.similarity_search(query, k)


class JobVectorStore(ChromaVectorStore):
    """岗位向量存储，专门管理岗位数据的存储与检索"""

    def __init__(self):
        """初始化岗位向量存储"""
        super().__init__(collection_name=CHROMA_COLLECTION_JOB)

    def add_job(
        self,
        job_title: str,
        job_description: str,
        requirements: List[str],
        source: Optional[str] = None
    ) -> List[str]:
        """
        添加岗位到向量存储

        Args:
            job_title: 岗位名称
            job_description: 岗位描述
            requirements: 岗位要求列表
            source: 数据来源（可选）

        Returns:
            添加的文档ID列表
        """
        full_text = f"岗位名称: {job_title}\n岗位描述: {job_description}\n岗位要求: {', '.join(requirements)}"
        metadata = {
            "type": "job",
            "job_title": job_title,
            "source": source or "unknown"
        }
        return self.add_texts([full_text], [metadata])

    def search_matching_jobs(self, query: str, k: int = 3) -> List[Document]:
        """
        搜索匹配的岗位

        Args:
            query: 查询文本（通常是简历内容或技能描述）
            k: 返回结果数量

        Returns:
            匹配岗位文档列表
        """
        return self.similarity_search(query, k)
