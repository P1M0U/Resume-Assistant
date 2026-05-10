from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from llm.zhipu.agents.job_agent import JobRecommenderAgent
from llm.zhipu.schemas.resume_schema import JobRecommendRequest
from loguru import logger

job_router = APIRouter(prefix="/resume", tags=["岗位推荐"])


@job_router.post("/job-recommend")
async def get_job_recommendation(request: JobRecommendRequest):
    """
    根据简历和期望岗位获取岗位推荐

    Args:
        request: 岗位推荐请求参数，包含目标岗位和可选的简历文本

    Returns:
        JSONResponse: 包含岗位匹配结果的响应
    """
    logger.info(f"收到岗位推荐请求 | 目标岗位: {request.target_job}")

    recommender = JobRecommenderAgent()

    result = await recommender.recommend_structured(
        resume_text=request.resume_text or "",
        target_job=request.target_job
    )

    logger.info(
        f"岗位推荐完成 | 目标岗位: {request.target_job} | 匹配度: {result.match_score}")

    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "data": result.dict(),
            "message": "岗位推荐成功"
        }
    )
