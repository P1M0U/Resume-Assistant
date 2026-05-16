# 简历分析智能体
from langchain.agents import create_agent
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.messages import HumanMessage, AIMessage
from llm.zhipu.chat import zhipu_config
from llm.zhipu.prompts.resume_prompt import RESUME_SYSTEM_PROMPT
from llm.zhipu.tools import RESUME_TOOLS
from schemas import ResumeAnalysisResult
from loguru import logger
from typing import Dict, Any, Optional, List
import json
import re


class ResumeAnalyzerAgent:
    """简历分析智能体（带记忆）"""

    def __init__(self):
        """初始化简历分析智能体"""
        self.llm = zhipu_config.get_chat_model()
        self.tools = RESUME_TOOLS

        # 初始化对话记忆
        self.chat_history = ChatMessageHistory()

        # 使用 create_agent 创建 Agent
        self.agent = create_agent(
            model=self.llm,
            tools=self.tools,
            system_prompt=RESUME_SYSTEM_PROMPT
        )

        logger.info("简历分析 Agent 初始化成功（带记忆）")

    async def analyze(self, file_path: str) -> ResumeAnalysisResult:
        """
        分析简历文件

        Args:
            file_path: 简历文件路径

        Returns:
            ResumeAnalysisResult: 分析结果
        """
        logger.info(f"开始分析简历文件 | 路径: {file_path}")

        input_text = f"""请分析简历文件：{file_path}

请使用工具解析文件，提取技能，搜索相似简历，然后给出分析结果。"""

        try:
            # 使用带记忆的 Agent
            result = await self.agent.ainvoke(
                {"messages": [("user", input_text)]}
            )

            # 提取最后一条消息
            messages = result.get("messages", [])
            if messages:
                output = messages[-1].content
                logger.info(f"Agent 返回结果: {output[:200]}...")

                # 保存对话到记忆
                self.chat_history.add_user_message(input_text)
                self.chat_history.add_ai_message(output)

                json_data = self._extract_json(output)

                if json_data:
                    logger.success("成功解析 Agent 返回的 JSON 数据")
                    return ResumeAnalysisResult(**json_data)
        except Exception as e:
            logger.error(f"Agent 执行失败: {e}")

        logger.warning("Agent 模式失败，返回默认结果")
        return ResumeAnalysisResult(
            score=0,
            personal_info=None,
            highlights=[],
            issues=[],
            suggestions=[]
        )

    async def analyze_text(self, resume_text: str) -> ResumeAnalysisResult:
        """
        分析简历文本

        Args:
            resume_text: 简历文本内容

        Returns:
            ResumeAnalysisResult: 分析结果
        """
        logger.info(f"开始分析简历文本 | 文本长度: {len(resume_text)}")

        input_text = f"""请分析以下简历内容：

{resume_text}

请使用工具提取技能，搜索相似简历，然后给出分析结果。"""

        try:
            # 使用带记忆的 Agent
            result = await self.agent.ainvoke(
                {"messages": [("user", input_text)]}
            )

            # 提取最后一条消息
            messages = result.get("messages", [])
            if messages:
                output = messages[-1].content
                logger.info(f"Agent 返回结果: {output[:200]}...")

                # 保存对话到记忆
                self.chat_history.add_user_message(input_text)
                self.chat_history.add_ai_message(output)

                json_data = self._extract_json(output)

                if json_data:
                    logger.success("成功解析 Agent 返回的 JSON 数据")
                    return ResumeAnalysisResult(**json_data)
        except Exception as e:
            logger.error(f"Agent 执行失败: {e}")

        logger.warning("Agent 模式失败，返回默认结果")
        return ResumeAnalysisResult(
            score=0,
            personal_info=None,
            highlights=[],
            issues=[],
            suggestions=[]
        )

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

    def _extract_json(self, text: str) -> Optional[Dict[str, Any]]:
        """
        从文本中提取 JSON 数据

        Args:
            text: 包含 JSON 的文本

        Returns:
            解析后的字典或 None
        """
        try:
            # 尝试直接解析
            result_dict = json.loads(text)
            return result_dict
        except json.JSONDecodeError:
            pass

        # 提取 JSON 代码块
        json_match = re.search(r'```json\s*(\{.*?\})\s*```', text, re.DOTALL)
        if json_match:
            try:
                result_dict = json.loads(json_match.group(1))
                return result_dict
            except json.JSONDecodeError:
                pass

        # 提取任意 JSON 对象
        json_match = re.search(r'\{[^{}]*"score"[^{}]*\}', text, re.DOTALL)
        if json_match:
            try:
                result_dict = json.loads(json_match.group())
                return result_dict
            except json.JSONDecodeError:
                pass

        return None
