from typing import List, Optional
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.documents import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from loguru import logger
from settings import RAG_TOP_K
from llm.zhipu.chat import zhipu_config
from llm.zhipu.rag.vector_store import ResumeVectorStore, JobVectorStore
from llm.zhipu.rag.text_splitter import ResumeTextSplitter


RESUME_RAG_PROMPT = ChatPromptTemplate.from_template("""你是一位专业的简历分析专家。请根据以下参考信息来回答用户的问题。

参考信息：
{context}

用户问题：{question}

请基于参考信息给出专业、详细的分析。如果参考信息不足以回答问题，请说明并给出你的专业建议。""")

JOB_RAG_PROMPT = ChatPromptTemplate.from_template("""你是一位专业的职业规划顾问。请根据以下参考信息来回答用户的问题。

参考信息：
{context}

用户问题：{question}

请基于参考信息给出专业、详细的岗位推荐和职业建议。如果参考信息不足以回答问题，请说明并给出你的专业建议。""")


class BaseRAGChain:
    """RAG 检索增强生成链基类，提供通用的检索和生成逻辑"""

    def __init__(self, vector_store, prompt_template):
        """
        初始化 RAG 链

        Args:
            vector_store: 向量存储实例
            prompt_template: 提示词模板
        """
        self.vector_store = vector_store
        self.prompt_template = prompt_template
        self.top_k = RAG_TOP_K
        self.llm = zhipu_config.get_chat_model()

        self.chain = (
            {"context": self._retrieve, "question": RunnablePassthrough()}
            | self.prompt_template
            | self.llm
            | StrOutputParser()
        )
        logger.info(f"RAG 链初始化完成 | top_k: {self.top_k}")

    def _retrieve(self, query: str) -> str:
        """
        从向量存储中检索相关文档并格式化为上下文文本

        Args:
            query: 查询文本

        Returns:
            格式化后的上下文文本
        """
        docs = self.vector_store.similarity_search(query, k=self.top_k)
        if not docs:
            return "暂无相关参考信息。"

        context_parts = []
        for i, doc in enumerate(docs, 1):
            source_info = f"[来源: {doc.metadata.get('file_name', doc.metadata.get('job_title', '未知'))}]"
            context_parts.append(f"{source_info}\n{doc.page_content}")

        context = "\n\n---\n\n".join(context_parts)
        logger.info(f"检索到 {len(docs)} 个相关文档")
        return context

    async def ainvoke(self, query: str) -> str:
        """
        异步执行 RAG 链

        Args:
            query: 用户查询

        Returns:
            LLM 生成的回答
        """
        logger.info(f"RAG 查询: {query[:100]}...")
        result = await self.chain.ainvoke(query)
        logger.info(f"RAG 生成完成 | 结果长度: {len(result)}")
        return result


class ResumeRAGChain(BaseRAGChain):
    """简历 RAG 链，基于已存储的简历数据增强简历分析"""

    def __init__(self):
        """初始化简历 RAG 链"""
        vector_store = ResumeVectorStore()
        super().__init__(vector_store, RESUME_RAG_PROMPT)

    async def analyze_resume_with_context(self, resume_text: str) -> str:
        """
        基于历史简历上下文分析当前简历

        Args:
            resume_text: 当前简历文本

        Returns:
            增强分析结果
        """
        query = f"请分析以下简历内容，并结合已有简历数据给出优化建议：\n{resume_text}"
        return await self.ainvoke(query)

    async def get_optimization_suggestions(self, resume_text: str) -> str:
        """
        基于历史简历数据获取优化建议

        Args:
            resume_text: 简历文本

        Returns:
            优化建议
        """
        query = f"基于已有简历数据，请为以下简历提供优化建议：\n{resume_text}"
        return await self.ainvoke(query)


class JobRAGChain(BaseRAGChain):
    """岗位 RAG 链，基于已存储的岗位数据增强岗位推荐"""

    def __init__(self):
        """初始化岗位 RAG 链"""
        vector_store = JobVectorStore()
        super().__init__(vector_store, JOB_RAG_PROMPT)

    async def recommend_jobs_with_context(
        self,
        resume_text: str,
        target_job: Optional[str] = None
    ) -> str:
        """
        基于岗位数据推荐匹配的岗位

        Args:
            resume_text: 简历文本
            target_job: 目标岗位（可选）

        Returns:
            岗位推荐结果
        """
        if target_job:
            query = f"请根据简历内容和目标岗位推荐匹配的岗位：\n简历：{resume_text}\n目标岗位：{target_job}"
        else:
            query = f"请根据简历内容推荐匹配的岗位：\n{resume_text}"
        return await self.ainvoke(query)

    async def analyze_job_match(
        self,
        resume_text: str,
        job_title: str
    ) -> str:
        """
        分析简历与特定岗位的匹配度

        Args:
            resume_text: 简历文本
            job_title: 岗位名称

        Returns:
            匹配分析结果
        """
        query = f"请分析简历与岗位的匹配度：\n简历：{resume_text}\n岗位：{job_title}"
        return await self.ainvoke(query)


class RAGService:
    """RAG 服务类，统一管理简历和岗位的 RAG 操作"""

    def __init__(self):
        """初始化 RAG 服务"""
        self.resume_store = ResumeVectorStore()
        self.job_store = JobVectorStore()
        self.text_splitter = ResumeTextSplitter()
        self.resume_rag = ResumeRAGChain()
        self.job_rag = JobRAGChain()
        logger.info("RAG 服务初始化完成")

    async def store_resume(
        self,
        resume_text: str,
        file_name: str,
        user_id: str = "anonymous"
    ) -> int:
        """
        将简历文本分块后存入向量存储

        Args:
            resume_text: 简历文本
            file_name: 文件名
            user_id: 用户ID

        Returns:
            存储的文档块数量
        """
        documents = self.text_splitter.split_resume(
            resume_text, file_name, user_id
        )
        self.resume_store.add_documents(documents)
        logger.info(f"简历已存入向量存储 | 文件: {file_name} | 块数: {len(documents)}")
        return len(documents)

    async def store_job(
        self,
        job_title: str,
        job_description: str,
        requirements: List[str],
        source: str = "unknown"
    ) -> int:
        """
        将岗位信息存入向量存储

        Args:
            job_title: 岗位名称
            job_description: 岗位描述
            requirements: 岗位要求列表
            source: 数据来源

        Returns:
            存储的文档数量
        """
        self.job_store.add_job(
            job_title, job_description, requirements, source)
        logger.info(f"岗位已存入向量存储 | 岗位: {job_title}")
        return 1

    async def analyze_with_rag(self, resume_text: str) -> str:
        """
        使用 RAG 增强简历分析

        Args:
            resume_text: 简历文本

        Returns:
            增强分析结果
        """
        return await self.resume_rag.analyze_resume_with_context(resume_text)

    async def recommend_with_rag(
        self,
        resume_text: str,
        target_job: Optional[str] = None
    ) -> str:
        """
        使用 RAG 增强岗位推荐

        Args:
            resume_text: 简历文本
            target_job: 目标岗位

        Returns:
            增强推荐结果
        """
        return await self.job_rag.recommend_jobs_with_context(resume_text, target_job)
