from pydantic import BaseModel
from typing import Optional, List


class PersonalInfo(BaseModel):
    """
    个人信息
    """
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None


class Suggestion(BaseModel):
    """
    优化建议
    """
    category: str
    title: str
    content: str


class ResumeAnalysisResult(BaseModel):
    """
    简历分析结果
    """
    score: int
    personal_info: Optional[PersonalInfo] = None
    highlights: List[str] = []
    issues: List[str] = []
    suggestions: List[Suggestion] = []