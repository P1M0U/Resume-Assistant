import os
from typing import Optional
from pydantic import BaseModel
from langchain_community.chat_models import ChatZhipuAI
from langchain_community.embeddings import ZhipuAIEmbeddings
from settings import (ZHIPU_API_KEY, 
    ZHIPU_MODEL_NAME, 
    ZHIPU_TEMPERATURE, 
    ZHIPU_MAX_TOKENS
)

class ZhipuConfig(BaseModel):
    """智谱AI配置类"""
    
    api_key: str = ZHIPU_API_KEY
    model_name: str = ZHIPU_MODEL_NAME  # 智谱GLM-4.7-flash模型
    temperature: float = ZHIPU_TEMPERATURE
    max_tokens: int = ZHIPU_MAX_TOKENS
    streaming: bool = False
    
    def get_chat_model(self) -> ChatZhipuAI:
        """获取智谱聊天模型实例"""
        return ChatZhipuAI(
            zhipuai_api_key=self.api_key,
            model_name=self.model_name,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            streaming=self.streaming
        )
    
    def get_embeddings(self) -> ZhipuAIEmbeddings:
        """获取智谱嵌入模型实例"""
        return ZhipuAIEmbeddings(
            zhipuai_api_key=self.api_key
        )

# 全局配置实例
zhipu_config = ZhipuConfig()