# AI对话智能体
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.messages import HumanMessage, AIMessage
from llm.zhipu.chat import zhipu_config
from llm.zhipu.prompts.chat_prompt import CHAT_SYSTEM_PROMPT, CHAT_CONTEXT_GUIDANCE
from schemas import ResumeAnalysisResult, JobMatchResult
from loguru import logger
from typing import List, Dict, Optional


class AIChatAgent:
    """AI对话智能体（带记忆）"""

    def __init__(self):
        """初始化AI对话智能体"""
        self.llm = zhipu_config.get_chat_model()

        # 初始化对话记忆
        self.chat_history = ChatMessageHistory()

        logger.info("AI对话 Agent 初始化成功（带记忆）")

    def _build_context_prompt(
        self,
        resume_analysis_result: Optional[ResumeAnalysisResult] = None,
        job_match_result: Optional[JobMatchResult] = None
    ) -> str:
        """
        构建上下文相关的系统提示词

        Args:
            resume_analysis_result: 简历分析结果
            job_match_result: 岗位推荐结果

        Returns:
            完整的系统提示词
        """
        context_parts = [CHAT_SYSTEM_PROMPT]

        # 如果有简历分析结果，添加简历上下文
        if resume_analysis_result:
            context_parts.append("\n\n## 当前用户的简历分析结果：")
            context_parts.append(f"\n综合评分：{resume_analysis_result.score}分")

            if resume_analysis_result.personal_info:
                info = resume_analysis_result.personal_info
                context_parts.append(f"\n姓名：{info.name or '未识别'}")
                if info.phone:
                    context_parts.append(f"\n电话：{info.phone}")
                if info.email:
                    context_parts.append(f"\n邮箱：{info.email}")

            if resume_analysis_result.highlights:
                context_parts.append("\n\n简历亮点：")
                for highlight in resume_analysis_result.highlights:
                    context_parts.append(f"\n- {highlight}")

            if resume_analysis_result.issues:
                context_parts.append("\n\n待改进项：")
                for issue in resume_analysis_result.issues:
                    context_parts.append(f"\n- {issue}")

            if resume_analysis_result.suggestions:
                context_parts.append("\n\n优化建议：")
                for suggestion in resume_analysis_result.suggestions:
                    context_parts.append(
                        f"\n- [{suggestion.category}] {suggestion.title}: {suggestion.content}"
                    )

        # 如果有岗位推荐结果，添加岗位上下文
        if job_match_result:
            context_parts.append("\n\n## 当前用户的岗位推荐结果：")
            context_parts.append(
                f"\n目标岗位：{job_match_result.target_job}"
            )
            context_parts.append(
                f"\n匹配度：{job_match_result.match_score}%"
            )

            if job_match_result.matched_skills:
                context_parts.append("\n\n匹配技能：")
                for skill in job_match_result.matched_skills:
                    context_parts.append(f"\n- {skill}")

            if job_match_result.missing_skills:
                context_parts.append("\n\n缺失技能：")
                for skill in job_match_result.missing_skills:
                    context_parts.append(f"\n- {skill}")

            if job_match_result.recommendations:
                context_parts.append("\n\n推荐岗位：")
                for rec in job_match_result.recommendations:
                    context_parts.append(
                        f"\n- {rec.job_title} (匹配度: {rec.match_score}%)"
                    )

            if job_match_result.optimization_suggestions:
                context_parts.append("\n\n岗位优化建议：")
                for suggestion in job_match_result.optimization_suggestions:
                    context_parts.append(
                        f"\n- [{suggestion.category}] {suggestion.title}: {suggestion.content}"
                    )

        # 添加指导说明
        if resume_analysis_result or job_match_result:
            context_parts.append(CHAT_CONTEXT_GUIDANCE)

        return "".join(context_parts)

    async def chat(
        self,
        user_message: str,
        resume_analysis_result: Optional[ResumeAnalysisResult] = None,
        job_match_result: Optional[JobMatchResult] = None
    ) -> str:
        """
        与用户对话

        Args:
            user_message: 用户消息
            resume_analysis_result: 简历分析结果（可选）
            job_match_result: 岗位推荐结果（可选）

        Returns:
            AI回复内容
        """
        logger.info(f"收到用户消息: {user_message[:50]}...")

        # 构建上下文相关的系统提示词
        system_prompt = self._build_context_prompt(
            resume_analysis_result, job_match_result
        )

        try:
            # 构建消息列表
            messages = [
                {"role": "system", "content": system_prompt}
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
