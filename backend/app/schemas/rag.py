from pydantic import BaseModel
from typing import Optional, List


class StoreResumeRequest(BaseModel):
    """
    存储简历请求
    """
    resume_text: str
    file_name: str
    user_id: Optional[str] = "anonymous"


class StoreJobRequest(BaseModel):
    """
    存储岗位请求
    """
    job_title: str
    job_description: str
    requirements: List[str]
    source: Optional[str] = "unknown"


class RAGQueryRequest(BaseModel):
    """
    RAG 查询请求
    """
    query: str
    top_k: Optional[int] = 3


class RAGAnalyzeRequest(BaseModel):
    """
    RAG 分析请求
    """
    resume_text: str


class RAGRecommendRequest(BaseModel):
    """
    RAG 推荐请求
    """
    resume_text: str
    target_job: Optional[str] = None