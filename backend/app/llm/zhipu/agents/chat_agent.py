# AI对话智能体
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.messages import HumanMessage, AIMessage
from llm.zhipu.chat import zhipu_config
from loguru import logger
from typing import List, Dict


class AIChatAgent:
    """AI对话智能体（带记忆）"""

    def __init__(self):
        """初始化AI对话智能体"""
        self.llm = zhipu_config.get_chat_model()

        # 初始化对话记忆
        self.chat_history = ChatMessageHistory()

        # 系统提示词
        self.system_prompt = """你是一个专业的简历助手AI，专注于帮助用户优化简历、提供职业发展建议、面试技巧和薪资谈判指导。

你的职责：
1. 帮助用户优化简历内容和格式
2. 提供职业规划和发展建议
3. 分享面试技巧和注意事项
4. 指导薪资谈判策略
5. 回答与求职相关的其他问题

请用专业、友好、简洁的方式回答用户的问题。"""

        logger.info("AI对话 Agent 初始化成功（带记忆）")

    async def chat(self, user_message: str) -> str:
        """
        与用户对话

        Args:
            user_message: 用户消息

        Returns:
            AI回复内容
        """
        logger.info(f"收到用户消息: {user_message[:50]}...")

        try:
            # 构建消息列表
            messages = [
                {"role": "system", "content": self.system_prompt}
            ]

            # 添加历史对话
            history_messages = self.chat_history.messages
            for msg in history_messages:
                if isinstance(msg, HumanMessage):
                    messages.append({"role": "user", "content": msg.content})
                elif isinstance(msg, AIMessage):
                    messages.append(
                        {"role": "assistant", "content": msg.content})

            # 添加当前用户消息
            messages.append({"role": "user", "content": user_message})

            # 调用LLM
            response = await self.llm.ainvoke(messages)
            ai_message = response.content

            # 保存对话到记忆
            self.chat_history.add_user_message(user_message)
            self.chat_history.add_ai_message(ai_message)

            logger.success(f"AI回复成功: {ai_message[:50]}...")
            return ai_message

        except Exception as e:
            logger.error(f"AI对话失败: {e}")
            return f"抱歉，我遇到了一些问题：{str(e)}"

    def clear_memory(self):
        """清空对话记忆"""
        self.chat_history.clear()
        logger.info("对话记忆已清空")

    def get_memory_history(self) -> List[Dict[str, str]]:
        """
        获取对话历史

        Returns:
            对话历史列表
        """
        messages = self.chat_history.messages
        history = []
        for msg in messages:
            if isinstance(msg, HumanMessage):
                history.append({"role": "user", "content": msg.content})
            elif isinstance(msg, AIMessage):
                history.append({"role": "assistant", "content": msg.content})
        return history
