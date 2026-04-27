from pydantic import BaseModel
from typing import Optional, List


class PersonalInfo(BaseModel):
    """个人信息"""
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None


class Suggestion(BaseModel):
    """优化建议"""
    category: str
    title: str
    content: str


class ResumeAnalysisResult(BaseModel):
    """简历分析结果"""
    score: int
    personal_info: Optional[PersonalInfo] = None
    highlights: List[str] = []
    issues: List[str] = []
    suggestions: List[Suggestion] = []


class JobRecommendation(BaseModel):
    """岗位推荐"""
    job_title: str
    match_score: int
    reason: str
    key_requirements: List[str] = []


class JobMatchResult(BaseModel):
    """岗位匹配结果"""
    target_job: str
    match_score: int
    matched_skills: List[str] = []
    missing_skills: List[str] = []
    recommendations: List[JobRecommendation] = []
    optimization_suggestions: List[Suggestion] = []


class JobRecommendRequest(BaseModel):
    """岗位推荐请求参数"""
    target_job: str
    resume_text: Optional[str] = None
