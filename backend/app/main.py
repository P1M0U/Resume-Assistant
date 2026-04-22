# Author:CQIE_PIDUJING
from fastapi import FastAPI, Depends, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from db.database import get_db, async_engine, Base
from api.router import router
from loguru import logger
# 导入缓存相关模块
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from core.cache import get_redis_client, check_redis_connection
# 导入上下文管理器相关模块
from contextlib import asynccontextmanager
from typing import AsyncGenerator

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """应用生命周期管理"""

    # 启动阶段 - 相当于@app.on_event("startup")
    logger.debug("开始初始化应用资源...")

    # 创建数据库表
    # logger.debug("正在创建数据库表...")
    # async with async_engine.begin() as conn:
    #     await conn.run_sync(Base.metadata.create_all)
    # logger.debug("数据库表创建完成")

    logger.debug("应用资源初始化完成，应用启动成功")

    # 程序运行阶段 - yield 之后的代码在应用关闭时执行
    yield

    # 关闭阶段 - 相当于@app.on_event("shutdown")
    logger.debug("开始关闭应用资源...")

    # 关闭数据库连接池
    try:
        await async_engine.dispose()
        logger.debug("数据库连接池已关闭")
    except Exception as e:
        logger.error(f"关闭数据库连接池时出现异常: {type(e).__name__}: {e}")

    # 同时尝试通过FastAPICache清理
    try:
        if hasattr(FastAPICache, 'clear'):
            try:
                await FastAPICache.clear()
                logger.debug("FastAPICache缓存已清理")
            except Exception as e:
                logger.error(f"清理FastAPICache缓存时出现异常: {type(e).__name__}: {e}")
    except Exception as e:
        logger.error(f"通过FastAPICache清理时出现异常: {type(e).__name__}: {e}")

    logger.debug("应用资源关闭完成")

# FastAPI版本为0.118.3
app = FastAPI(
    title="AI简历助手",
    version="1.0",
    description="基于FastAPI的高性能后端服务",
    lifespan=lifespan  # 使用lifespan上下文管理器
)

# 添加CORS配置，允许前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost", "http://127.0.0.1"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]  # 暴露所有响应头
)

# 集成API路由
app.include_router(router)


@app.get("/welcome")
async def read_root():
    return {"message": "Welcome to the AI Resume Assistant"}


@app.get("/db-test")
async def test_database_connection(db: AsyncSession = Depends(get_db)):
    try:
        # 尝试执行一个简单的查询
        result = await db.execute(text("SELECT 1"))
        return {"status": "success", "message": "数据库连接成功", "result": result.scalar()}
    except Exception as e:
        return {"status": "error", "message": f"数据库连接失败: {str(e)}"}

# 全局异常处理


@app.exception_handler(Exception)
def global_exception_handler(request: Request, exc: Exception):
    # 记录异常信息
    logger.error(f"全局异常: {str(exc)}")
    # 返回统一格式的错误响应
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)}
    )


@app.exception_handler(HTTPException)
def http_exception_handler(request: Request, exc: HTTPException):
    # 处理FastAPI的HTTP异常
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )