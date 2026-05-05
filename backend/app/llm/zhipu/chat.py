import os
from typing import Optional
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from llm.zhipu.embeddings import ZhipuAIEmbeddings
from settings import (ZHIPU_API_KEY,
                      ZHIPU_MODEL_NAME,
                      ZHIPU_TEMPERATURE,
                      ZHIPU_MAX_TOKENS
                      )


class ZhipuConfig(BaseModel):
    """智谱AI配置类"""

    api_key: str = ZHIPU_API_KEY
    model_name: str = ZHIPU_MODEL_NAME
    temperature: float = ZHIPU_TEMPERATURE
    max_tokens: int = ZHIPU_MAX_TOKENS
    streaming: bool = False

    def get_chat_model(self) -> ChatOpenAI:
        """获取智谱聊天模型实例（使用 OpenAI 兼容接口）"""
        return ChatOpenAI(
            model=self.model_name,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            openai_api_key=self.api_key,
            openai_api_base="https://open.bigmodel.cn/api/paas/v4/",
            streaming=self.streaming
        )

    def get_embeddings(self) -> ZhipuAIEmbeddings:
        """获取智谱嵌入模型实例"""
        return ZhipuAIEmbeddings()


# 全局配置实例
zhipu_config = ZhipuConfig()
