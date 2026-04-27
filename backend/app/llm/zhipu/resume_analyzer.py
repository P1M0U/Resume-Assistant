# 简历分析主应用
from llm.zhipu.agents.resume_agent import ResumeAnalyzerAgent
from llm.zhipu.schemas.resume_schema import ResumeAnalysisResult
from typing import Optional


class ResumeAnalyzer:
    """简历分析主应用"""

    def __init__(self):
        """初始化简历分析器"""
        self.agent = ResumeAnalyzerAgent()

    async def analyze_file(self, file_path: str) -> ResumeAnalysisResult:
        """
        分析简历文件

        Args:
            file_path: 简历文件路径

        Returns:
            ResumeAnalysisResult: 分析结果
        """
        return await self.agent.analyze(file_path)

    async def analyze_text(self, resume_text: str) -> ResumeAnalysisResult:
        """
        分析简历文本

        Args:
            resume_text: 简历文本内容

        Returns:
            ResumeAnalysisResult: 分析结果
        """
        return await self.agent.analyze_text(resume_text)
