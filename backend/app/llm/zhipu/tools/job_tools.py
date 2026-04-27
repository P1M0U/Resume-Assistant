# 岗位推荐相关工具
from langchain_core.tools import tool
from typing import List, Dict, Any, Optional


@tool
def search_jobs_by_keywords(keywords: List[str]) -> List[Dict[str, Any]]:
    """
    根据关键词搜索匹配的岗位
    
    Args:
        keywords: 关键词列表（如技能、职位名称等）
        
    Returns:
        匹配的岗位列表
    """
    mock_jobs = [
        {
            "title": "Python开发工程师",
            "company": "某科技公司",
            "salary": "15k-25k",
            "location": "北京",
            "requirements": ["Python", "Django", "MySQL"],
            "match_score": 85
        },
        {
            "title": "数据分析师",
            "company": "某数据公司",
            "salary": "12k-20k",
            "location": "上海",
            "requirements": ["Python", "SQL", "数据分析"],
            "match_score": 80
        },
        {
            "title": "后端开发工程师",
            "company": "某互联网公司",
            "salary": "18k-30k",
            "location": "深圳",
            "requirements": ["Python", "FastAPI", "PostgreSQL"],
            "match_score": 90
        }
    ]
    
    return mock_jobs


@tool
def analyze_job_match(resume_skills: List[str], job_requirements: List[str]) -> Dict[str, Any]:
    """
    分析简历与岗位的匹配度
    
    Args:
        resume_skills: 简历中的技能列表
        job_requirements: 岗位要求列表
        
    Returns:
        匹配分析结果
    """
    matched = []
    missing = []
    
    for req in job_requirements:
        if req.lower() in [skill.lower() for skill in resume_skills]:
            matched.append(req)
        else:
            missing.append(req)
    
    match_score = len(matched) / len(job_requirements) * 100 if job_requirements else 0
    
    return {
        "match_score": match_score,
        "matched_skills": matched,
        "missing_skills": missing,
        "total_requirements": len(job_requirements)
    }


@tool
def generate_job_recommendations(
    resume_text: str,
    preferred_position: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    根据简历内容生成岗位推荐
    
    Args:
        resume_text: 简历文本内容
        preferred_position: 期望岗位名称（可选）
        
    Returns:
        推荐岗位列表
    """
    recommendations = []
    
    if "Python" in resume_text:
        recommendations.append({
            "position": "Python开发工程师",
            "reason": "简历中包含Python相关经验",
            "priority": "高"
        })
    
    if "数据分析" in resume_text or "SQL" in resume_text:
        recommendations.append({
            "position": "数据分析师",
            "reason": "具备数据分析相关技能",
            "priority": "中"
        })
    
    if "机器学习" in resume_text or "AI" in resume_text:
        recommendations.append({
            "position": "机器学习工程师",
            "reason": "有机器学习相关经验",
            "priority": "高"
        })
    
    if preferred_position:
        recommendations.insert(0, {
            "position": preferred_position,
            "reason": "用户期望岗位",
            "priority": "最高"
        })
    
    return recommendations


@tool
def format_job_recommendation(jobs: List[Dict[str, Any]]) -> str:
    """
    格式化岗位推荐结果
    
    Args:
        jobs: 岗位列表
        
    Returns:
        格式化后的推荐文本
    """
    result = "岗位推荐报告\n" + "="*50 + "\n\n"
    
    for i, job in enumerate(jobs, 1):
        result += f"{i}. {job.get('title', job.get('position', '未知岗位'))}\n"
        result += f"   公司：{job.get('company', '未知')}\n"
        result += f"   薪资：{job.get('salary', '面议')}\n"
        result += f"   地点：{job.get('location', '未知')}\n"
        
        if 'match_score' in job:
            result += f"   匹配度：{job['match_score']}%\n"
        
        if 'reason' in job:
            result += f"   推荐理由：{job['reason']}\n"
        
        if 'priority' in job:
            result += f"   优先级：{job['priority']}\n"
        
        result += "\n"
    
    return result


JOB_TOOLS = [
    search_jobs_by_keywords,
    analyze_job_match,
    generate_job_recommendations,
    format_job_recommendation
]