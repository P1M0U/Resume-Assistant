# 岗位推荐智能体
from langchain.agents import create_agent
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.messages import HumanMessage, AIMessage
from llm.zhipu.chat import zhipu_config
from llm.zhipu.prompts.job_prompt import JOB_SYSTEM_PROMPT
from llm.zhipu.tools import JOB_TOOLS
from schemas import JobMatchResult, JobRecommendation, Suggestion
from loguru import logger
from typing import List, Dict, Any, Optional
import json
import re


class JobRecommenderAgent:
    """岗位推荐智能体（带记忆）"""

    def __init__(self):
        """初始化岗位推荐智能体"""
        self.llm = zhipu_config.get_chat_model()
        self.tools = JOB_TOOLS

        # 初始化对话记忆
        self.chat_history = ChatMessageHistory()

        # 使用 create_agent 创建 Agent
        self.agent = create_agent(
            model=self.llm,
            tools=self.tools,
            system_prompt=JOB_SYSTEM_PROMPT
        )

        logger.info("岗位推荐 Agent 初始化成功（带记忆）")

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

        input_text = f"""请根据以下信息生成岗位推荐：

简历内容：
{resume_text}

期望岗位：{target_job}

请使用工具搜索相关岗位，分析市场趋势，然后给出推荐结果。"""

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
                    return self._build_result(json_data, target_job)
        except Exception as e:
            logger.error(f"Agent 执行失败: {e}")

        logger.warning("Agent 模式失败，返回默认结果")
        return self._get_default_result(target_job)

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
