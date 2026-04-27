# 岗位推荐智能体
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from settings import (
    ZHIPU_API_KEY,
    ZHIPU_MODEL_NAME,
    ZHIPU_TEMPERATURE,
    ZHIPU_MAX_TOKENS
)
from llm.zhipu.tools.job_tools import JOB_TOOLS
from llm.zhipu.tools.web_tools import WEB_TOOLS
from typing import List, Dict, Any, Optional


class JobRecommenderAgent:
    """岗位推荐智能体"""
    
    def __init__(self):
        """初始化岗位推荐智能体"""
        self.llm = ChatOpenAI(
            model=ZHIPU_MODEL_NAME,
            temperature=ZHIPU_TEMPERATURE,
            max_tokens=ZHIPU_MAX_TOKENS,
            openai_api_key=ZHIPU_API_KEY,
            openai_api_base="https://open.bigmodel.cn/api/paas/v4/"
        )
        
        self.system_prompt = """你是一位专业的职业规划顾问。你可以使用以下工具来推荐岗位：

岗位相关工具：
1. search_jobs_by_keywords: 根据关键词搜索岗位
2. analyze_job_match: 分析简历与岗位的匹配度
3. generate_job_recommendations: 生成岗位推荐
4. format_job_recommendation: 格式化推荐结果

市场信息工具：
5. search_job_market_info: 搜索岗位市场信息
6. search_company_info: 搜索公司信息
7. search_industry_trends: 搜索行业趋势

请根据用户的需求，自主选择合适的工具来完成任务。推荐岗位时，请：
- 分析用户的简历和技能
- 搜索匹配的岗位
- 分析岗位匹配度
- 提供市场信息和行业趋势
- 给出详细的推荐报告"""
        
        self.tools = JOB_TOOLS + WEB_TOOLS
        
        self.agent = create_agent(
            model=self.llm,
            tools=self.tools,
            system_prompt=self.system_prompt
        )
    
    async def recommend(
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
        input_text = f"请根据以下简历内容推荐合适的岗位：\n\n{resume_text}"
        
        if preferred_position:
            input_text += f"\n\n用户期望岗位：{preferred_position}"
        
        result = await self.agent.ainvoke(
            {"messages": [("user", input_text)]}
        )
        
        return result.get("messages", [])[-1].content if result.get("messages") else "无法生成推荐"
    
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
        result = await self.agent.ainvoke(
            {"messages": [("user", f"""请分析简历与岗位的匹配度：
            
简历技能：{', '.join(resume_skills)}
岗位要求：{', '.join(job_requirements)}""")]}
        )
        
        return result.get("messages", [])[-1].content if result.get("messages") else {}