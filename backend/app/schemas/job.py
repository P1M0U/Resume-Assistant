from pydantic import BaseModel
from typing import Optional, List
from .resume import Suggestion


class JobRecommendation(BaseModel):
    """
    岗位推荐
    """
    job_title: str
    match_score: int
    reason: str
    key_requirements: List[str] = []


class JobMatchResult(BaseModel):
    """
    岗位匹配结果
    """
    target_job: str
    match_score: int
    matched_skills: List[str] = []
    missing_skills: List[str] = []
    recommendations: List[JobRecommendation] = []
    optimization_suggestions: List[Suggestion] = []


class JobRecommendRequest(BaseModel):
    """
    岗位推荐请求参数
    """
    target_job: str
    resume_text: Optional[str] = None
