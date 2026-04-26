# 简历分析相关的提示词模版
from langchain.prompts import PromptTemplate

RESUME_ANALYSIS_PROMPT = PromptTemplate(
    input_variables=["resume_text"],
    template=f"""
    你是一位专业的简历分析师，请分析以下简历内容并提供详细的分析报告。
    简历内容：{resume_text}
    请从以下几个方面进行分析：
    1. 个人信息（姓名、联系方式、邮箱）
    2. 教育背景（学校、专业、学历、时间）
    3. 工作或者实习经历（公司、职位、时间、职责）
    4. 项目经验（项目名称、技术栈、成果）
    5. 技能标签（编程语言、框架、工具）
    6. 综合评分（0-100分）
    7. 简历亮点（3-5个）
    8. 待改进项（3-5个）
    9. 优化建议（分类给出）
    
    请以JSON格式返回分析结果，格式如下：
    {{
        "score": 0,
        "personal_info": {{...}},
        "highlights":[],
        "issues":[],
        "suggestions":[]

    }}
    """
)