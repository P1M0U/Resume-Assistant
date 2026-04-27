# 岗位推荐相关的提示词模版
# 岗位推荐相关的提示词模版
from langchain_core.prompts import PromptTemplate

JOB_RECOMMENDATION_PROMPT = PromptTemplate(
    input_variables=["resume_text", "preferred_position"],
    template="""你是一位专业的职业规划顾问，请根据以下简历内容和期望岗位，推荐合适的工作机会。

简历内容：
{resume_text}

期望岗位：{preferred_position}

请从以下几个方面进行分析：
1. 岗位匹配度分析
2. 技能差距分析
3. 市场需求分析
4. 薪资范围建议
5. 职业发展建议

请以JSON格式返回推荐结果，格式如下：
{{
    "recommended_jobs": [
        {{
            "title": "岗位名称",
            "company": "公司名称",
            "salary": "薪资范围",
            "location": "工作地点",
            "match_score": 85,
            "requirements": ["要求1", "要求2"],
            "reason": "推荐理由"
        }}
    ],
    "skill_gaps": ["缺失技能1", "缺失技能2"],
    "market_insights": {{
        "avg_salary": "平均薪资",
        "demand_trend": "需求趋势",
        "competition_level": "竞争程度"
    }},
    "career_advice": "职业发展建议"
}}"""
)

JOB_MATCH_ANALYSIS_PROMPT = PromptTemplate(
    input_variables=["resume_skills", "job_requirements"],
    template="""请分析以下简历技能与岗位要求的匹配度。

简历技能：
{resume_skills}

岗位要求：
{job_requirements}

请以JSON格式返回匹配分析结果，格式如下：
{{
    "match_score": 85,
    "matched_skills": ["匹配技能1", "匹配技能2"],
    "missing_skills": ["缺失技能1", "缺失技能2"],
    "strengths": ["优势1", "优势2"],
    "improvements": ["改进建议1", "改进建议2"]
}}"""
)