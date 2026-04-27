# 向量记忆管理
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import ZhipuAIEmbeddings
from langchain.memory import VectorStoreRetrieverMemory
from typing import Optional, List
from settings import ZHIPU_API_KEY


class VectorMemory:
    """向量记忆管理类"""
    
    def __init__(
        self,
        persist_directory: Optional[str] = None,
        collection_name: str = "resume_assistant"
    ):
        """
        初始化向量记忆
        
        Args:
            persist_directory: 向量数据库持久化目录
            collection_name: 集合名称
        """
        self.embeddings = ZhipuAIEmbeddings(
            zhipuai_api_key=ZHIPU_API_KEY
        )
        
        self.persist_directory = persist_directory
        self.collection_name = collection_name
        
        self.vectorstore = Chroma(
            embedding_function=self.embeddings,
            persist_directory=persist_directory,
            collection_name=collection_name
        )
        
        self.retriever = self.vectorstore.as_retriever(
            search_kwargs={"k": 3}
        )
        
        self.memory = VectorStoreRetrieverMemory(
            retriever=self.retriever
        )
    
    def add_memory(self, input_text: str, output_text: str):
        """
        添加记忆
        
        Args:
            input_text: 输入文本
            output_text: 输出文本
        """
        self.memory.save_context(
            {"input": input_text},
            {"output": output_text}
        )
    
    def search_related_memories(self, query: str, k: int = 3) -> List[str]:
        """
        搜索相关记忆
        
        Args:
            query: 查询文本
            k: 返回结果数量
            
        Returns:
            相关记忆列表
        """
        results = self.vectorstore.similarity_search(query, k=k)
        return [doc.page_content for doc in results]
    
    def get_memory(self) -> VectorStoreRetrieverMemory:
        """
        获取记忆对象
        
        Returns:
            VectorStoreRetrieverMemory: 记忆对象
        """
        return self.memory
    
    def clear(self):
        """清空向量存储"""
        self.vectorstore.delete_collection()
        self.vectorstore = Chroma(
            embedding_function=self.embeddings,
            persist_directory=self.persist_directory,
            collection_name=self.collection_name
        )