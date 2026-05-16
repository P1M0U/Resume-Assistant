from pydantic import BaseModel
from typing import Optional, List
from .resume import ResumeAnalysisResult
from .job import JobMatchResult


class ChatRequest(BaseModel):
    """
    对话请求
    """
    message: str
    resume_analysis_result: Optional[ResumeAnalysisResult] = None
    job_match_result: Optional[JobMatchResult] = None


class ChatResponse(BaseModel):
    """
    对话响应
    """
    response: str
    timestamp: str


class ChatHistoryResponse(BaseModel):
    """
    对话历史响应
    """
    history: List[dict]