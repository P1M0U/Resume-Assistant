import os
from typing import Optional
from pydantic import BaseModel
from langchain_community.chat_models import ChatZhipuAI
from langchain_community.embeddings import ZhipuAIEmbeddings
from app.settings import settings

class ZhipuConfig(BaseModel):
    """智谱AI配置类"""
    
    api_key: str = settings["ZHIPU"]["API_KEY"]
    model_name: str = "glm-4.7-flash"  # 智谱GLM-4.7-flash模型
    temperature: float = 0.7
    max_tokens: int = 2000
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