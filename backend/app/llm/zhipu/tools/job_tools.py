# tools/job_tools.py
from langchain_core.tools import tool
from typing import List, Dict, Any
from llm.zhipu.rag.vector_store import JobVectorStore
from loguru import logger


@tool
def search_jobs_from_vector_db(keywords: str, top_k: int = 5) -> List[Dict[str, Any]]:
    """
    从向量数据库中搜索相关岗位
    
    Args:
        keywords: 搜索关键词（如技能、岗位名称等）
        top_k: 返回结果数量，默认5个
        
    Returns:
        匹配的岗位列表，包含岗位信息和匹配度
    """
    logger.info(f"开始搜索岗位 | 关键词: {keywords} | 数量: {top_k}")
    
    job_store = JobVectorStore()
    job_count = job_store.get_collection_count()
    
    if job_count == 0:
        logger.warning("岗位向量库为空")
        return []
    
    docs = job_store.similarity_search(keywords, k=top_k)
    
    results = []
    for doc in docs:
        results.append({
            "job_title": doc.metadata.get("job_title", "未知岗位"),
            "content": doc.page_content,
            "metadata": doc.metadata
        })
    
    logger.info(f"搜索完成 | 找到 {len(results)} 个岗位")
    return results


@tool
def analyze_job_market(position: str) -> Dict[str, Any]:
    """
    分析岗位市场趋势（基于向量数据库中的数据）
    
    Args:
        position: 岗位名称
        
    Returns:
        市场分析结果，包含需求数量、平均薪资等
    """
    logger.info(f"开始分析岗位市场 | 岗位: {position}")
    
    job_store = JobVectorStore()
    job_count = job_store.get_collection_count()
    
    if job_count == 0:
        logger.warning("岗位向量库为空")
        return {
            "position": position,
            "total_jobs": 0,
            "analysis": "暂无岗位数据，请先添加岗位信息到知识库"
        }
    
    # 搜索相关岗位
    docs = job_store.similarity_search(position, k=10)
    
    # 统计分析
    total_jobs = len(docs)
    job_titles = [doc.metadata.get("job_title", "") for doc in docs]
    
    analysis = {
        "position": position,
        "total_jobs": total_jobs,
        "related_positions": list(set(job_titles)),
        "market_status": "有数据" if total_jobs > 0 else "无数据",
        "recommendation": f"找到 {total_jobs} 个相关岗位" if total_jobs > 0 else "建议添加更多岗位数据"
    }
    
    logger.info(f"市场分析完成 | 岗位数: {total_jobs}")
    return analysis


# 导出工具列表
JOB_TOOLS = [
    search_jobs_from_vector_db,
    analyze_job_market
]