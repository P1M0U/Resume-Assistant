# 岗位推荐主应用
from llm.zhipu.agents.job_agent import JobRecommenderAgent
from typing import List, Dict, Any, Optional


class JobRecommender:
    """岗位推荐主应用"""
    
    def __init__(self):
        """初始化岗位推荐器"""
        self.agent = JobRecommenderAgent()
    
    async def recommend_jobs(
        self,
        resume_text: str,
        preferred_position: Optional[str] = None
    ) -> str:
        """
        根据简历推荐岗位
        
        Args:
            resume_text: 简历文本内容
            preferred_position: 期望岗位（可选）
            
        Returns:
            推荐报告文本
        """
        return await self.agent.recommend(resume_text, preferred_position)
    
    async def analyze_match(
        self,
        resume_skills: List[str],
        job_requirements: List[str]
    ) -> Dict[str, Any]:
        """
        分析简历与岗位的匹配度
        
        Args:
            resume_skills: 简历技能列表
            job_requirements: 岗位要求列表
            
        Returns:
            匹配分析结果
        """
        return await self.agent.analyze_match(resume_skills, job_requirements)