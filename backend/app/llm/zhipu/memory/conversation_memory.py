# 对话记忆管理
from langchain.memory import ConversationBufferMemory
from langchain_community.chat_message_histories import ChatMessageHistory
from typing import Optional


class ConversationMemory:
    """对话记忆管理类"""

    def __init__(self, session_id: Optional[str] = None):
        """
        初始化对话记忆

        Args:
            session_id: 会话ID（可选）
        """
        self.session_id = session_id or "default"
        self.chat_history = ChatMessageHistory()
        self.memory = ConversationBufferMemory(
            chat_memory=self.chat_history,
            memory_key="chat_history",
            return_messages=True
        )

    def add_user_message(self, message: str):
        """
        添加用户消息

        Args:
            message: 用户消息内容
        """
        self.chat_history.add_user_message(message)

    def add_ai_message(self, message: str):
        """
        添加AI消息

        Args:
            message: AI消息内容
        """
        self.chat_history.add_ai_message(message)

    def get_memory(self) -> ConversationBufferMemory:
        """
        获取记忆对象

        Returns:
            ConversationBufferMemory: 记忆对象
        """
        return self.memory

    def clear(self):
        """清空记忆"""
        self.chat_history.clear()

    def get_history(self) -> list:
        """
        获取历史消息

        Returns:
            历史消息列表
        """
        return self.chat_history.messages
