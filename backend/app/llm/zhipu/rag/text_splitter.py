from typing import List
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from loguru import logger
from settings import RAG_CHUNK_SIZE, RAG_CHUNK_OVERLAP


class ResumeTextSplitter:
    """简历文本分块处理器，将长简历文本分割为适合向量化的小块"""

    def __init__(
        self,
        chunk_size: int = RAG_CHUNK_SIZE,
        chunk_overlap: int = RAG_CHUNK_OVERLAP
    ):
        """
        初始化文本分块器

        Args:
            chunk_size: 每个文本块的最大字符数
            chunk_overlap: 相邻文本块之间的重叠字符数
        """
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size,
            chunk_overlap=self.chunk_overlap,
            separators=["\n\n", "\n", "。", "；", "，", " ", ""],
            length_function=len
        )
        logger.info(
            f"文本分块器初始化 | 块大小: {self.chunk_size} | 重叠: {self.chunk_overlap}")

    def split_text(self, text: str) -> List[str]:
        """
        将文本分割为多个块

        Args:
            text: 原始文本

        Returns:
            分割后的文本块列表
        """
        chunks = self.splitter.split_text(text)
        logger.info(f"文本分割完成 | 原始长度: {len(text)} | 块数: {len(chunks)}")
        return chunks

    def split_text_to_documents(
        self,
        text: str,
        metadata: dict = None
    ) -> List[Document]:
        """
        将文本分割为 LangChain Document 对象列表

        Args:
            text: 原始文本
            metadata: 附加到每个文档的元数据

        Returns:
            Document 对象列表
        """
        base_metadata = metadata or {}
        documents = self.splitter.create_documents(
            texts=[text],
            metadatas=[base_metadata]
        )

        for i, doc in enumerate(documents):
            doc.metadata["chunk_index"] = i
            doc.metadata["total_chunks"] = len(documents)

        logger.info(f"文本分割为 {len(documents)} 个 Document 对象")
        return documents

    def split_resume(
        self,
        resume_text: str,
        file_name: str = "",
        user_id: str = "anonymous"
    ) -> List[Document]:
        """
        专门用于简历文本的分块处理

        Args:
            resume_text: 简历文本内容
            file_name: 文件名
            user_id: 用户ID

        Returns:
            Document 对象列表
        """
        metadata = {
            "type": "resume",
            "file_name": file_name,
            "user_id": user_id
        }
        return self.split_text_to_documents(resume_text, metadata)

    def split_job_description(
        self,
        job_title: str,
        job_description: str,
        source: str = "unknown"
    ) -> List[Document]:
        """
        专门用于岗位描述的分块处理

        Args:
            job_title: 岗位名称
            job_description: 岗位描述
            source: 数据来源

        Returns:
            Document 对象列表
        """
        metadata = {
            "type": "job",
            "job_title": job_title,
            "source": source
        }
        return self.split_text_to_documents(job_description, metadata)
