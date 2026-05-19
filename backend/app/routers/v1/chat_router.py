# d:\Study_or_work\CQIE_Python\resume_assistant\backend\app\routers\chat_router.py

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from schemas import ChatRequest, ChatResponse, ChatHistoryResponse
from llm.zhipu.agents.chat_agent import AIChatAgent
from loguru import logger

chat_router = APIRouter(prefix="/chat", tags=["AI对话"])

# 全局 AI 对话 Agent 实例
chat_agent = AIChatAgent()


@chat_router.post("/send", response_model=ChatResponse)
async def send_message(request: ChatRequest):
    """
    发送消息给AI助手

    Args:
        request: 对话请求（包含消息和可选的简历分析结果、岗位推荐结果）

    Returns:
        AI回复
    """
    logger.info(f"收到对话请求 | 完整请求: {request.model_dump_json(indent=2)}")
    logger.info(f"消息内容: {request.message}")
    logger.info(f"简历分析结果: {request.resume_analysis_result is not None}")
    logger.info(f"岗位推荐结果: {request.job_match_result is not None}")

    if not request.message or not request.message.strip():
        logger.error("消息为空或仅包含空白字符")
        raise HTTPException(status_code=400, detail="消息不能为空")

    try:
        # 调用 AI Agent 进行对话，传递上下文信息
        ai_response = await chat_agent.chat(
            user_message=request.message,
            resume_analysis_result=request.resume_analysis_result,
            job_match_result=request.job_match_result
        )

        # 获取当前时间戳
        from datetime import datetime
        timestamp = datetime.now().strftime("%H:%M")

        logger.success("AI对话成功")

        return ChatResponse(
            response=ai_response,
            timestamp=timestamp
        )

    except Exception as e:
        logger.error(f"AI对话失败: {e}")
        raise HTTPException(status_code=500, detail=f"AI对话失败: {str(e)}")


@chat_router.get("/history", response_model=ChatHistoryResponse)
async def get_chat_history():
    """
    获取对话历史

    Returns:
        对话历史列表
    """
    logger.info("获取对话历史")

    try:
        history = chat_agent.get_memory_history()

        logger.success(f"获取对话历史成功 | 共 {len(history)} 条消息")

        return ChatHistoryResponse(history=history)

    except Exception as e:
        logger.error(f"获取对话历史失败: {e}")
        raise HTTPException(status_code=500, detail=f"获取对话历史失败: {str(e)}")


@chat_router.post("/clear")
async def clear_chat():
    """
    清空对话历史

    Returns:
        成功消息
    """
    logger.info("清空对话历史")

    try:
        chat_agent.clear_memory()

        logger.success("对话历史已清空")

        return JSONResponse(
            content={"message": "对话历史已清空"},
            status_code=200
        )

    except Exception as e:
        logger.error(f"清空对话历史失败: {e}")
        raise HTTPException(status_code=500, detail=f"清空对话历史失败: {str(e)}")
