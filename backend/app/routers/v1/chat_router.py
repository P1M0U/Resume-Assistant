# d:\Study_or_work\CQIE_Python\resume_assistant\backend\app\routers\chat_router.py

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
from llm.zhipu.agents.chat_agent import AIChatAgent
from loguru import logger

chat_router = APIRouter(prefix="/chat", tags=["AI对话"])

# 全局 AI 对话 Agent 实例
chat_agent = AIChatAgent()


class ChatRequest(BaseModel):
    """对话请求"""
    message: str


class ChatResponse(BaseModel):
    """对话响应"""
    response: str
    timestamp: str


class ChatHistoryResponse(BaseModel):
    """对话历史响应"""
    history: List[dict]


@chat_router.post("/send", response_model=ChatResponse)
async def send_message(request: ChatRequest):
    """
    发送消息给AI助手

    Args:
        request: 对话请求

    Returns:
        AI回复
    """
    logger.info(f"收到对话请求 | 消息: {request.message[:50]}...")

    if not request.message.strip():
        raise HTTPException(status_code=400, detail="消息不能为空")

    try:
        # 调用 AI Agent 进行对话
        ai_response = await chat_agent.chat(request.message)

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
