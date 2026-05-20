# Author:CQIE_PIDUJING
"""
FastAPI应用主入口文件
负责应用初始化、中间件配置、路由注册和生命周期管理
"""
import sys
import time
from pathlib import Path
from contextlib import asynccontextmanager
from typing import AsyncGenerator

# 必须先导入settings，确保sys.path被设置
import settings

from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from loguru import logger

from routers.v1.main_router import router
from settings import ZHIPU_API_KEY, APP_DEBUG

# 配置日志


def setup_logger():
    """
    配置Loguru日志记录器
    """
    # 移除默认的处理器
    logger.remove()

    # 控制台输出 - 彩色格式
    logger.add(
        sys.stdout,
        format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
        level="INFO",
        colorize=True,
        enqueue=True
    )


# 初始化日志
setup_logger()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    应用生命周期管理
    负责应用启动和关闭时的资源初始化与清理
    """
    # ========== 启动阶段 ==========
    logger.info("="*50)
    logger.info("开始初始化应用资源...")
    logger.info(f"应用名称: {app.title}")
    logger.info(f"应用版本: {app.version}")

    # 初始化智谱AI配置
    zhipu_api_key = ZHIPU_API_KEY
    if zhipu_api_key:
        logger.info("智谱AI配置加载成功")
    else:
        logger.warning("未配置智谱AI API密钥")

    # 初始化数据库
    from dbs.mysql.database import init_db
    init_db()
    logger.info("数据库初始化完成")

    logger.info("应用资源初始化完成")
    logger.info("="*50)

    yield

    # ========== 关闭阶段 ==========
    logger.info("="*50)
    logger.info("开始关闭应用资源...")

    # 清理资源
    logger.info("应用资源关闭完成")
    logger.info("="*50)

# 创建FastAPI应用实例
app = FastAPI(
    title="AI简历助手",
    version="1.0.0",
    description="""
    ## 🤖 AI简历助手 API
    
    基于智谱AI大模型的智能简历分析与岗位推荐系统
    
    ### 主要功能
    - 📄 **简历分析**: 智能解析简历内容，提供专业的优化建议
    - 💼 **岗位推荐**: 根据简历内容推荐匹配度高的岗位
    - 🎯 **技能评估**: 分析技能匹配度，提供提升建议
    
    ### 技术栈
    - FastAPI + Python 3.13
    - 智谱AI GLM-4
    - LangChain
    """,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# ========== 添加中间件 ==========

# Gzip压缩中间件
app.add_middleware(GZipMiddleware, minimum_size=1000)

# CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    """
    请求日志中间件
    记录每个请求的方法、路径、处理时间和状态码
    """
    start_time = time.time()

    # 记录请求信息
    logger.info(f"请求开始 | {request.method} {request.url.path}")

    # 处理请求
    response = await call_next(request)

    # 计算处理时间
    process_time = time.time() - start_time

    # 记录响应信息
    logger.info(
        f"请求完成 | {request.method} {request.url.path} | "
        f"状态码: {response.status_code} | 耗时: {process_time:.3f}s"
    )

    # 添加处理时间到响应头
    response.headers["X-Process-Time"] = f"{process_time:.3f}s"

    return response

# ========== 注册路由 ==========
app.include_router(router, prefix="/api", tags=["API"])


# ========== 核心端点 ==========

@app.get("/", tags=["根路径"])
async def root():
    """
    根路径欢迎信息
    """
    return {
        "message": "欢迎使用AI简历助手",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/health", tags=["健康检查"])
async def health_check():
    """
    健康检查端点
    用于监控服务运行状态
    """
    return {
        "status": "healthy",
        "service": "AI简历助手",
        "version": "1.0.0"
    }


@app.get("/welcome", tags=["欢迎"])
async def read_root():
    """
    欢迎页面
    """
    return {"message": "Welcome to the AI Resume Assistant"}

# ========== 异常处理 ==========


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """
    HTTP异常处理器
    """
    logger.error(
        f"HTTP异常 | {request.method} {request.url.path} | 状态码: {exc.status_code} | 详情: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "type": "HTTPException",
                "code": exc.status_code,
                "message": exc.detail
            }
        }
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """
    全局异常处理器
    捕获所有未处理的异常
    """
    logger.exception(
        f"全局异常 | {request.method} {request.url.path} | 异常类型: {type(exc).__name__} | 异常信息: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "type": "InternalServerError",
                "code": 500,
                "message": "服务器内部错误，请稍后重试" if not APP_DEBUG else str(exc)
            }
        }
    )
