# 简历分析链
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from settings import (
    ZHIPU_API_KEY,
    ZHIPU_MODEL_NAME,
    ZHIPU_TEMPERATURE,
    ZHIPU_MAX_TOKENS
)
from llm.zhipu.prompts.resume_prompt import RESUME_ANALYSIS_PROMPT
from llm.zhipu.shemas.resume_shema import ResumeAnalysisResult
import json
import re

class ResumeAnalyzerChain:
    """简历分析链"""
    
    def __init__(self):
        """初始化简历分析链"""
        # 初始化智谱AI模型（使用OpenAI兼容方式）
        self.llm = ChatOpenAI(
            model=ZHIPU_MODEL_NAME,
            temperature=ZHIPU_TEMPERATURE,
            max_tokens=ZHIPU_MAX_TOKENS,
            openai_api_key=ZHIPU_API_KEY,
            openai_api_base="https://open.bigmodel.cn/api/paas/v4/"
        )
        
        # 输出解析器
        self.parser = PydanticOutputParser(pydantic_object=ResumeAnalysisResult)
        
        # 创建链（使用LCEL）
        self.chain = RESUME_ANALYSIS_PROMPT | self.llm
    
    async def analyze(self, resume_text: str) -> ResumeAnalysisResult:
        """
        分析简历
        
        Args:
            resume_text: 简历文本内容
        
        Returns:
            ResumeAnalysisResult: 分析结果
        """
        # 调用LLM分析（使用LCEL）
        response = await self.chain.ainvoke({"resume_text": resume_text})
        
        # 提取响应内容
        response_text = response.content
        
        # 解析JSON响应
        try:
            # 尝试直接解析JSON
            result_dict = json.loads(response_text)
            return ResumeAnalysisResult(**result_dict)
        except json.JSONDecodeError:
            # 如果不是纯JSON，尝试提取JSON部分
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                result_dict = json.loads(json_match.group())
                return ResumeAnalysisResult(**result_dict)
            else:
                # 返回默认结果
                return ResumeAnalysisResult(
                    score=0,
                    personal_info=None,
                    highlights=[],
                    issues=[],
                    suggestions=[]
                )