# 岗位推荐主应用
from llm.zhipu.agents.job_agent import JobRecommenderAgent
from llm.zhipu.schemas.resume_schema import JobMatchResult
from typing import List, Dict, Any, Optional


class JobRecommender:
    """岗位推荐主应用"""

    def __init__(self):
        """初始化岗位推荐器"""
        self.agent = JobRecommenderAgent()

    async def recommend_jobs_structured(
        self,
        resume_text: str,
        target_job: str
    ) -> JobMatchResult:
        """
        根据简历和期望岗位生成结构化的推荐结果

        Args:
            resume_text: 简历文本内容
            target_job: 期望岗位名称

        Returns:
            JobMatchResult: 结构化的岗位匹配结果
        """
        return await self.agent.recommend_structured(resume_text, target_job)
