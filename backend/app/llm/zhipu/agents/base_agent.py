"""
智能体基类
提供对话记忆管理的通用实现，供所有 Agent 继承
"""
from typing import List, Dict
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.messages import HumanMessage, AIMessage
from loguru import logger


class BaseAgent:
    """智能体基类，封装对话记忆管理的通用逻辑"""

    def __init__(self):
        """初始化对话记忆"""
        self.chat_history = ChatMessageHistory()

    def clear_memory(self):
        """清空对话记忆"""
        self.chat_history.clear()
        logger.info(f"{self.__class__.__name__} 对话记忆已清空")

    def get_memory_history(self) -> List[Dict[str, str]]:
        """
        获取对话历史

        Returns:
            对话历史列表，每条包含 role 和 content
        """
        history = []
        for msg in self.chat_history.messages:
            if isinstance(msg, HumanMessage):
                history.append({"role": "user", "content": msg.content})
            elif isinstance(msg, AIMessage):
                history.append({"role": "assistant", "content": msg.content})
        return history
