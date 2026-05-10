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
    """智谱AI配置类（单例模式）"""

    api_key: str = ZHIPU_API_KEY
    model_name: str = ZHIPU_MODEL_NAME
    temperature: float = ZHIPU_TEMPERATURE
    max_tokens: int = ZHIPU_MAX_TOKENS
    streaming: bool = False

    _chat_model_instance: Optional[ChatOpenAI] = None
    _embeddings_instance: Optional[ZhipuAIEmbeddings] = None

    def get_chat_model(self) -> ChatOpenAI:
        """
        获取智谱聊天模型实例（单例模式）

        Returns:
            ChatOpenAI: 聊天模型实例
        """
        if self._chat_model_instance is None:
            self._chat_model_instance = ChatOpenAI(
                model=self.model_name,
                temperature=self.temperature,
                max_tokens=self.max_tokens,
                openai_api_key=self.api_key,
                openai_api_base="https://open.bigmodel.cn/api/paas/v4/",
                streaming=self.streaming
            )
        return self._chat_model_instance

    def get_embeddings(self) -> ZhipuAIEmbeddings:
        """
        获取智谱嵌入模型实例（单例模式）

        Returns:
            ZhipuAIEmbeddings: 嵌入模型实例
        """
        if self._embeddings_instance is None:
            self._embeddings_instance = ZhipuAIEmbeddings()
        return self._embeddings_instance


# 全局配置实例（单例）
zhipu_config = ZhipuConfig()
