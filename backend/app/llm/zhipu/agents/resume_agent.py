# 简历分析智能体
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from settings import (
    ZHIPU_API_KEY,
    ZHIPU_MODEL_NAME,
    ZHIPU_TEMPERATURE,
    ZHIPU_MAX_TOKENS
)
from llm.zhipu.tools.resume_tools import RESUME_TOOLS
from llm.zhipu.schemas.resume_schema import ResumeAnalysisResult
from loguru import logger
import json
import re


class ResumeAnalyzerAgent:
    """简历分析智能体"""

    def __init__(self):
        """初始化简历分析智能体"""
        self.llm = ChatOpenAI(
            model=ZHIPU_MODEL_NAME,
            temperature=ZHIPU_TEMPERATURE,
            max_tokens=ZHIPU_MAX_TOKENS,
            openai_api_key=ZHIPU_API_KEY,
            openai_api_base="https://open.bigmodel.cn/api/paas/v4/"
        )

        self.system_prompt = """你是一位专业的简历分析专家。请分析用户提供的简历内容。

请严格按照以下 JSON 格式返回分析结果，不要添加任何其他文字说明：

{
    "score": 78,
    "personal_info": {
        "name": "姓名",
        "phone": "电话",
        "email": "邮箱",
        "location": "地点"
    },
    "highlights": ["亮点1", "亮点2", "亮点3"],
    "issues": ["问题1", "问题2", "问题3"],
    "suggestions": [
        {
            "category": "分类",
            "title": "建议标题",
            "content": "建议内容"
        }
    ]
}

分析要求：
1. score: 综合评分（0-100分）
2. personal_info: 提取的个人信息
3. highlights: 3-5个简历亮点
4. issues: 3-5个待改进项
5. suggestions: 分类给出优化建议

请直接返回 JSON 对象，不要使用代码块包裹。"""

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
