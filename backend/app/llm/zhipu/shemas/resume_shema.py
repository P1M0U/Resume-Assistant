from unicodedata import category
from pydantic import BaseModel
from typing import Optional, List

class PersonalInfo(BaseModel):
    """个人信息"""
    name: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
class Suggestions(BaseModel):
    """优化建议"""
    category: str
    title: str 
    content: str 
class ResumeAnalysisResult(BaseModel):
    """简历分析结果"""
    score: int
    personal_info: PersonalInfo = None
    highlights: List[str] = None
    issues: List[str] = None
    suggestions: List[Suggestions] = None