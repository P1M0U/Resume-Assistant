# 简历分析链
from langchain.chains import LLMChain
from langchain_community.chat_models import ChatZhipuAI
from langchain.output_parsers import PydanticOutputParser
from settings import settings
from prompts.resume_prompt import RESUME_ANALYSIS_PROMPT
from shemas.resume_shema import ResumeAnalysisResult

class ResumeAnalyzerChain(LLMChain):
    pass