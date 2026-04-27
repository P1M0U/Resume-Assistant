# 简历分析相关工具
from langchain_core.tools import tool
from typing import Optional, Dict, Any
from llm.zhipu.utils.file_parser import FileParser
from llm.zhipu.schemas.resume_schema import ResumeAnalysisResult
import json


@tool
def parse_resume_file(file_path: str) -> str:
    """
    解析简历文件（支持PDF和DOCX格式）

    Args:
        file_path: 简历文件路径

    Returns:
        简历文本内容
    """
    parser = FileParser()

    if file_path.endswith('.pdf'):
        return parser.parse_pdf(file_path)
    elif file_path.endswith('.docx'):
        return parser.parse_docx(file_path)
    else:
        return f"不支持的文件格式：{file_path}"


@tool
def extract_personal_info(resume_text: str) -> Dict[str, Any]:
    """
    从简历文本中提取个人信息

    Args:
        resume_text: 简历文本内容

    Returns:
        包含个人信息的字典
    """
    import re

    info = {
        "name": None,
        "phone": None,
        "email": None,
        "location": None
    }

    phone_pattern = r'1[3-9]\d{9}'
    email_pattern = r'[\w\.-]+@[\w\.-]+\.\w+'

    phone_match = re.search(phone_pattern, resume_text)
    if phone_match:
        info["phone"] = phone_match.group()

    email_match = re.search(email_pattern, resume_text)
    if email_match:
        info["email"] = email_match.group()

    return info


@tool
def calculate_resume_score(resume_text: str) -> int:
    """
    计算简历评分（基于简单规则）

    Args:
        resume_text: 简历文本内容

    Returns:
        简历评分（0-100）
    """
    score = 50

    if len(resume_text) > 500:
        score += 10
    if len(resume_text) > 1000:
        score += 10

    keywords = ['项目', '经验', '技能', '教育', '工作']
    for keyword in keywords:
        if keyword in resume_text:
            score += 5

    return min(score, 100)


@tool
def format_analysis_result(
    score: int,
    personal_info: Dict[str, Any],
    highlights: list,
    issues: list,
    suggestions: list
) -> str:
    """
    格式化简历分析结果为可读文本

    Args:
        score: 简历评分
        personal_info: 个人信息
        highlights: 亮点列表
        issues: 问题列表
        suggestions: 建议列表

    Returns:
        格式化后的分析结果文本
    """
    result = f"""简历分析报告
{'='*50}
综合评分：{score}/100

个人信息：
  姓名：{personal_info.get('name', '未提取')}
  电话：{personal_info.get('phone', '未提取')}
  邮箱：{personal_info.get('email', '未提取')}

简历亮点：
"""

    for i, highlight in enumerate(highlights, 1):
        result += f"  {i}. {highlight}\n"

    result += "\n待改进项：\n"
    for i, issue in enumerate(issues, 1):
        result += f"  {i}. {issue}\n"

    result += "\n优化建议：\n"
    for suggestion in suggestions:
        result += f"  [{suggestion.get('category', '其他')}] {suggestion.get('title', '')}\n"
        result += f"    {suggestion.get('content', '')}\n"

    return result


RESUME_TOOLS = [
    parse_resume_file,
    extract_personal_info,
    calculate_resume_score,
    format_analysis_result
]
