from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
from llm.zhipu.rag.rag_chain import RAGService
from llm.zhipu.rag.vector_store import ResumeVectorStore, JobVectorStore
from loguru import logger

rag_router = APIRouter(prefix="/rag", tags=["RAG检索增强"])


class StoreResumeRequest(BaseModel):
    """存储简历请求"""
    resume_text: str
    file_name: str
    user_id: Optional[str] = "anonymous"


class StoreJobRequest(BaseModel):
    """存储岗位请求"""
    job_title: str
    job_description: str
    requirements: List[str]
    source: Optional[str] = "unknown"


class RAGQueryRequest(BaseModel):
    """RAG 查询请求"""
    query: str
    top_k: Optional[int] = 3


class RAGAnalyzeRequest(BaseModel):
    """RAG 分析请求"""
    resume_text: str


class RAGRecommendRequest(BaseModel):
    """RAG 推荐请求"""
    resume_text: str
    target_job: Optional[str] = None


@rag_router.post("/store/resume")
async def store_resume(request: StoreResumeRequest):
    """
    将简历存入向量数据库

    Args:
        request: 存储简历请求

    Returns:
        存储结果
    """
    logger.info(f"存储简历请求 | 文件: {request.file_name}")
    rag_service = RAGService()
    chunk_count = await rag_service.store_resume(
        request.resume_text,
        request.file_name,
        request.user_id
    )
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "data": {"chunk_count": chunk_count},
            "message": f"简历已存储，分为 {chunk_count} 个块"
        }
    )


@rag_router.post("/store/job")
async def store_job(request: StoreJobRequest):
    """
    将岗位信息存入向量数据库

    Args:
        request: 存储岗位请求

    Returns:
        存储结果
    """
    logger.info(f"存储岗位请求 | 岗位: {request.job_title}")
    rag_service = RAGService()
    await rag_service.store_job(
        request.job_title,
        request.job_description,
        request.requirements,
        request.source
    )
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "data": {"job_title": request.job_title},
            "message": "岗位信息已存储"
        }
    )


@rag_router.post("/search/resume")
async def search_resume(request: RAGQueryRequest):
    """
    在简历向量库中搜索相似简历

    Args:
        request: 查询请求

    Returns:
        搜索结果
    """
    logger.info(f"搜索简历 | 查询: {request.query[:50]}...")
    store = ResumeVectorStore()
    docs = store.similarity_search(request.query, k=request.top_k)
    results = []
    for doc in docs:
        results.append({
            "content": doc.page_content,
            "metadata": doc.metadata
        })
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "data": results,
            "message": f"找到 {len(results)} 个相似结果"
        }
    )


@rag_router.post("/search/job")
async def search_job(request: RAGQueryRequest):
    """
    在岗位向量库中搜索匹配岗位

    Args:
        request: 查询请求

    Returns:
        搜索结果
    """
    logger.info(f"搜索岗位 | 查询: {request.query[:50]}...")
    store = JobVectorStore()
    docs = store.similarity_search(request.query, k=request.top_k)
    results = []
    for doc in docs:
        results.append({
            "content": doc.page_content,
            "metadata": doc.metadata
        })
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "data": results,
            "message": f"找到 {len(results)} 个匹配结果"
        }
    )


@rag_router.post("/analyze")
async def rag_analyze(request: RAGAnalyzeRequest):
    """
    使用 RAG 增强简历分析

    Args:
        request: RAG 分析请求

    Returns:
        增强分析结果
    """
    logger.info("RAG 增强简历分析请求")
    rag_service = RAGService()
    result = await rag_service.analyze_with_rag(request.resume_text)
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "data": {"analysis": result},
            "message": "RAG 增强分析完成"
        }
    )


@rag_router.post("/recommend")
async def rag_recommend(request: RAGRecommendRequest):
    """
    使用 RAG 增强岗位推荐

    Args:
        request: RAG 推荐请求

    Returns:
        增强推荐结果
    """
    logger.info(f"RAG 增强岗位推荐请求 | 目标岗位: {request.target_job}")
    rag_service = RAGService()
    result = await rag_service.recommend_with_rag(
        request.resume_text,
        request.target_job
    )
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "data": {"recommendation": result},
            "message": "RAG 增强推荐完成"
        }
    )


@rag_router.get("/stats")
async def get_stats():
    """
    获取向量数据库统计信息

    Returns:
        统计信息
    """
    resume_store = ResumeVectorStore()
    job_store = JobVectorStore()
    resume_count = resume_store.get_collection_count()
    job_count = job_store.get_collection_count()
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "data": {
                "resume_count": resume_count,
                "job_count": job_count
            },
            "message": "统计信息获取成功"
        }
    )
