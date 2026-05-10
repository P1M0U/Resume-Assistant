# 简历分析智能体
from langchain.agents import create_agent
from llm.zhipu.chat import zhipu_config
from llm.zhipu.prompts.resume_prompt import RESUME_SYSTEM_PROMPT
from llm.zhipu.tools.resume_tools import RESUME_TOOLS
from llm.zhipu.schemas.resume_schema import ResumeAnalysisResult
from loguru import logger
import json
import re


class ResumeAnalyzerAgent:
    """简历分析智能体"""

    def __init__(self):
        """初始化简历分析智能体"""
        self.llm = zhipu_config.get_chat_model()
        self.system_prompt = RESUME_SYSTEM_PROMPT
        self.agent = create_agent(
            model=self.llm,
            tools=RESUME_TOOLS,
            system_prompt=self.system_prompt
        )

    async def analyze(self, file_path: str) -> ResumeAnalysisResult:
        """
        分析简历

        Args:
            file_path: 简历文件路径

        Returns:
            ResumeAnalysisResult: 分析结果
        """
        result = await self.agent.ainvoke(
            {"messages": [("user", f"请分析简历文件：{file_path}")]}
        )

        output = result.get(
            "messages", [])[-1].content if result.get("messages") else ""

        try:
            json_match = re.search(r'\{.*\}', output, re.DOTALL)
            if json_match:
                result_dict = json.loads(json_match.group())
                return ResumeAnalysisResult(**result_dict)
        except (json.JSONDecodeError, Exception):
            pass

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
        logger.info(f"开始分析简历，文本长度：{len(resume_text)}")

        result = await self.agent.ainvoke(
            {"messages": [("user", f"请分析以下简历内容：\n\n{resume_text}")]}
        )

        messages = result.get("messages", [])
        logger.info(f"智能体返回 {len(messages)} 条消息")

        if not messages:
            logger.error("智能体未返回任何消息")
            return ResumeAnalysisResult(
                score=0,
                personal_info=None,
                highlights=[],
                issues=[],
                suggestions=[]
            )

        output = messages[-1].content
        logger.info(f"智能体最终输出：{output[:500]}...")  # 只输出前500字符

        try:
            # 尝试多种 JSON 提取方式
            # 方式1：直接解析
            try:
                result_dict = json.loads(output)
                logger.success("直接解析 JSON 成功")
                return ResumeAnalysisResult(**result_dict)
            except json.JSONDecodeError:
                pass

            # 方式2：提取 JSON 代码块
            json_match = re.search(
                r'```json\s*(\{.*?\})\s*```', output, re.DOTALL)
            if json_match:
                result_dict = json.loads(json_match.group(1))
                logger.success("从代码块提取 JSON 成功")
                return ResumeAnalysisResult(**result_dict)

            # 方式3：提取任意 JSON 对象
            json_match = re.search(
                r'\{[^{}]*"score"[^{}]*\}', output, re.DOTALL)
            if json_match:
                result_dict = json.loads(json_match.group())
                logger.success("从文本提取 JSON 成功")
                return ResumeAnalysisResult(**result_dict)

            logger.warning(f"无法从输出中提取 JSON，原始输出：{output}")

        except (json.JSONDecodeError, Exception) as e:
            logger.error(f"JSON 解析失败：{e}")

        # 返回默认结果
        logger.warning("返回默认空结果")
        return ResumeAnalysisResult(
            score=0,
            personal_info=None,
            highlights=[],
            issues=[],
            suggestions=[]
        )
