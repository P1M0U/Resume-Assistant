# Web搜索相关工具
from langchain_core.tools import tool
from typing import List, Dict, Any


@tool
def search_job_market_info(position: str) -> Dict[str, Any]:
    """
    搜索岗位市场信息

    Args:
        position: 岗位名称

    Returns:
        市场信息字典
    """
    mock_data = {
        "position": position,
        "avg_salary": "15k-25k",
        "demand_trend": "上升",
        "top_skills": ["Python", "SQL", "数据分析"],
        "market_size": "大型",
        "competition_level": "中等"
    }

    return mock_data


@tool
def search_company_info(company_name: str) -> Dict[str, Any]:
    """
    搜索公司信息

    Args:
        company_name: 公司名称

    Returns:
        公司信息字典
    """
    mock_data = {
        "name": company_name,
        "industry": "互联网",
        "scale": "500-1000人",
        "funding": "B轮",
        "location": "北京",
        "rating": 4.5
    }

    return mock_data


@tool
def search_industry_trends(industry: str) -> List[Dict[str, Any]]:
    """
    搜索行业趋势

    Args:
        industry: 行业名称

    Returns:
        行业趋势列表
    """
    mock_trends = [
        {
            "trend": "AI技术快速发展",
            "impact": "高",
            "description": "人工智能技术在各行业广泛应用"
        },
        {
            "trend": "远程办公普及",
            "impact": "中",
            "description": "疫情后远程办公成为新常态"
        },
        {
            "trend": "数字化转型加速",
            "impact": "高",
            "description": "企业数字化转型需求激增"
        }
    ]

    return mock_trends


WEB_TOOLS = [
    search_job_market_info,
    search_company_info,
    search_industry_trends
]
