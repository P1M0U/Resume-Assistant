# 岗位推荐智能体
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from settings import (
    ZHIPU_API_KEY,
    ZHIPU_MODEL_NAME,
    ZHIPU_TEMPERATURE,
    ZHIPU_MAX_TOKENS
)
from llm.zhipu.tools.job_tools import JOB_TOOLS
from llm.zhipu.tools.web_tools import WEB_TOOLS
from llm.zhipu.schemas.resume_schema import JobMatchResult, JobRecommendation, Suggestion
from loguru import logger
from typing import List, Dict, Any, Optional
import json
import re


class JobRecommenderAgent:
    """岗位推荐智能体"""

    def __init__(self):
        """初始化岗位推荐智能体"""
        self.llm = ChatOpenAI(
            model=ZHIPU_MODEL_NAME,
            temperature=ZHIPU_TEMPERATURE,
            max_tokens=ZHIPU_MAX_TOKENS,
            openai_api_key=ZHIPU_API_KEY,
            openai_api_base="https://open.bigmodel.cn/api/paas/v4/"
        )

        self.system_prompt = """你是一位专业的职业规划顾问。请根据用户的简历内容和期望岗位，提供岗位推荐和匹配分析。

请严格按照以下 JSON 格式返回推荐结果，不要添加任何其他文字说明：

{
    "match_score": 85,
    "matched_skills": ["技能1", "技能2"],
    "missing_skills": ["技能3", "技能4"],
    "recommendations": [
        {
            "job_title": "岗位名称",
            "match_score": 90,
            "reason": "推荐理由",
            "key_requirements": ["要求1", "要求2"]
        }
    ],
    "optimization_suggestions": [
        {
            "category": "分类",
            "title": "建议标题",
            "content": "建议内容"
        }
    ]
}

请确保：
1. match_score 是 0-100 的整数
2. matched_skills 和 missing_skills 是技能列表
3. recommendations 包含 3-5 个相关岗位
4. 每个岗位的 match_score 是 0-100 的整数
5. optimization_suggestions 包含 2-3 条具体建议
6. 所有字段都必须填写，不能为空"""

        self.tools = JOB_TOOLS + WEB_TOOLS

        try:
            self.agent = create_agent(
                model=self.llm,
                tools=self.tools,
                system_prompt=self.system_prompt
            )
            logger.info("Agent 初始化成功")
        except Exception as e:
            logger.warning(f"Agent 初始化失败: {e}，将使用直接 LLM 模式")
            self.agent = None

    async def recommend_structured(
        self,
        resume_text: str,
        target_job: str
    ) -> JobMatchResult:
        """
        根据简历和期望岗位生成结构化的推荐结果

        Args:
            resume_text: 简历文本内容
            target_job: 期望岗位名称

        Returns:
            JobMatchResult: 结构化的岗位匹配结果
        """
        logger.info(f"开始生成岗位推荐 | 目标岗位: {target_job}")

        if self.agent:
            return await self._recommend_with_agent(resume_text, target_job)
        else:
            return await self._recommend_with_llm(resume_text, target_job)

    async def _recommend_with_agent(
        self,
        resume_text: str,
        target_job: str
    ) -> JobMatchResult:
        """
        使用 Agent 进行岗位推荐

        Args:
            resume_text: 简历文本内容
            target_job: 期望岗位名称

        Returns:
            JobMatchResult: 结构化的岗位匹配结果
        """
        logger.info("使用 Agent 模式")

        input_text = f"""请根据以下信息生成岗位推荐：

简历内容：
{resume_text}

期望岗位：{target_job}

请分析简历与期望岗位的匹配度，并推荐相关岗位。"""

        try:
            result = await self.agent.ainvoke(
                {"messages": [("user", input_text)]}
            )

            output_text = result.get(
                "messages", [])[-1].content if result.get("messages") else ""

            logger.info(f"Agent 返回结果: {output_text[:200]}...")

            json_data = self._extract_json(output_text)

            if json_data:
                logger.success("成功解析 Agent 返回的 JSON 数据")
                return self._build_result(json_data, target_job)
        except Exception as e:
            logger.error(f"Agent 执行失败: {e}")

        logger.warning("Agent 模式失败，切换到直接 LLM 模式")
        return await self._recommend_with_llm(resume_text, target_job)

    async def _recommend_with_llm(
        self,
        resume_text: str,
        target_job: str
    ) -> JobMatchResult:
        """
        直接使用 LLM 进行岗位推荐（备选方案）

        Args:
            resume_text: 简历文本内容
            target_job: 期望岗位名称

        Returns:
            JobMatchResult: 结构化的岗位匹配结果
        """
        logger.info("使用直接 LLM 模式")

        input_text = f"""请根据以下信息生成岗位推荐：

简历内容：
{resume_text}

期望岗位：{target_job}

请分析简历与期望岗位的匹配度，并推荐相关岗位。"""

        messages = [
            ("system", self.system_prompt),
            ("user", input_text)
        ]

        result = await self.llm.ainvoke(messages)
        output_text = result.content

        logger.info(f"LLM 返回结果: {output_text[:200]}...")

        json_data = self._extract_json(output_text)

        if json_data:
            logger.success("成功解析 LLM 返回的 JSON 数据")
            return self._build_result(json_data, target_job)
        else:
            logger.warning("JSON 解析失败，使用默认值")
            return self._get_default_result(target_job)

    def _extract_json(self, text: str) -> Optional[Dict[str, Any]]:
        """
        从文本中提取 JSON 数据

        Args:
            text: 包含 JSON 的文本

        Returns:
            解析后的字典或 None
        """
        json_pattern = r'```json\s*([\s\S]*?)\s*```'
        matches = re.findall(json_pattern, text)

        if matches:
            json_str = matches[0]
        else:
            json_pattern2 = r'\{[\s\S]*\}'
            matches2 = re.findall(json_pattern2, text)
            if matches2:
                json_str = matches2[0]
            else:
                return None

        json_str = json_str.strip()

        try:
            data = json.loads(json_str)
            logger.success("JSON 解析成功")
            return data
        except json.JSONDecodeError as e:
            logger.error(f"JSON 解析失败: {e}")
            return None

    def _build_result(self, data: Dict[str, Any], target_job: str) -> JobMatchResult:
        """
        构建结构化的岗位匹配结果

        Args:
            data: 解析后的 JSON 数据
            target_job: 目标岗位

        Returns:
            JobMatchResult 对象
        """
        recommendations = []
        for rec in data.get("recommendations", []):
            recommendations.append(
                JobRecommendation(
                    job_title=rec.get("job_title", "未知岗位"),
                    match_score=rec.get("match_score", 0),
                    reason=rec.get("reason", ""),
                    key_requirements=rec.get("key_requirements", [])
                )
            )

        optimization_suggestions = []
        for sug in data.get("optimization_suggestions", []):
            optimization_suggestions.append(
                Suggestion(
                    category=sug.get("category", ""),
                    title=sug.get("title", ""),
                    content=sug.get("content", "")
                )
            )

        return JobMatchResult(
            target_job=target_job,
            match_score=data.get("match_score", 0),
            matched_skills=data.get("matched_skills", []),
            missing_skills=data.get("missing_skills", []),
            recommendations=recommendations,
            optimization_suggestions=optimization_suggestions
        )

    def _get_default_result(self, target_job: str) -> JobMatchResult:
        """
        获取默认的岗位匹配结果

        Args:
            target_job: 目标岗位

        Returns:
            默认的 JobMatchResult 对象
        """
        return JobMatchResult(
            target_job=target_job,
            match_score=50,
            matched_skills=[],
            missing_skills=[],
            recommendations=[
                JobRecommendation(
                    job_title=target_job,
                    match_score=50,
                    reason="请先上传简历以获得更准确的推荐",
                    key_requirements=[]
                )
            ],
            optimization_suggestions=[
                Suggestion(
                    category="简历优化",
                    title="上传完整简历",
                    content="请上传包含详细信息的简历，以获得更准确的岗位推荐"
                )
            ]
        )
