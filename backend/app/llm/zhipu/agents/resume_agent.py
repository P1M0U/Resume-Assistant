"""简历分析智能体"""
from langchain.agents import create_agent
from llm.zhipu.chat import zhipu_config
from llm.zhipu.prompts.resume_prompt import RESUME_SYSTEM_PROMPT
from llm.zhipu.tools import RESUME_TOOLS
from llm.zhipu.agents.base_agent import BaseAgent
from llm.zhipu.utils.json_utils import extract_json
from schemas import ResumeAnalysisResult
from loguru import logger
from typing import Optional


class ResumeAnalyzerAgent(BaseAgent):
    """简历分析智能体（带记忆）"""

    def __init__(self):
        """初始化简历分析智能体"""
        super().__init__()
        self.llm = zhipu_config.get_chat_model()
        self.tools = RESUME_TOOLS

        # 使用 create_agent 创建 Agent
        self.agent = create_agent(
            model=self.llm,
            tools=self.tools,
            system_prompt=RESUME_SYSTEM_PROMPT
        )

        logger.info("简历分析 Agent 初始化成功（带记忆）")

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

                json_data = extract_json(output)

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
