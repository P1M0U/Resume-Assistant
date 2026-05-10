from typing import List
from langchain_core.embeddings import Embeddings
from pydantic import BaseModel
import httpx
import time
from loguru import logger
from settings import (
    ZHIPU_API_KEY,
    VECTOR_STORE_MAX_RETRIES,
    VECTOR_STORE_RETRY_DELAY,
    VECTOR_STORE_REQUEST_DELAY
)


class ZhipuAIEmbeddings(Embeddings, BaseModel):
    """
    自定义智谱 AI Embeddings 类，使用智谱 AI 的 Embedding API
    不依赖 zhipuai 库，直接使用 HTTP 请求
    """

    api_key: str = ZHIPU_API_KEY
    model: str = "embedding-3"
    api_base: str = "https://open.bigmodel.cn/api/paas/v4"
    max_retries: int = VECTOR_STORE_MAX_RETRIES
    retry_delay: float = VECTOR_STORE_RETRY_DELAY
    request_delay: float = VECTOR_STORE_REQUEST_DELAY

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """
        将多个文本转换为向量，支持批量请求

        Args:
            texts: 文本列表

        Returns:
            向量列表
        """
        if not texts:
            return []

        embeddings = []
        for i, text in enumerate(texts):
            if i > 0:
                time.sleep(self.request_delay)
            embedding = self._get_embedding_with_retry(text)
            embeddings.append(embedding)
        logger.info(f"生成 {len(embeddings)} 个文本向量")
        return embeddings

    def embed_query(self, text: str) -> List[float]:
        """
        将查询文本转换为向量

        Args:
            text: 查询文本

        Returns:
            向量
        """
        embedding = self._get_embedding_with_retry(text)
        logger.info(f"生成查询向量 | 文本长度: {len(text)}")
        return embedding

    def _get_embedding_with_retry(self, text: str) -> List[float]:
        """
        带重试机制的获取向量方法

        Args:
            text: 文本内容

        Returns:
            向量列表
        """
        last_error = None
        for attempt in range(self.max_retries):
            try:
                return self._get_embedding(text)
            except httpx.HTTPStatusError as e:
                last_error = e
                if e.response.status_code == 429:
                    wait_time = self.retry_delay * (attempt + 1) * 2
                    logger.warning(
                        f"触发限流，等待 {wait_time} 秒后重试 (尝试 {attempt + 1}/{self.max_retries})")
                    time.sleep(wait_time)
                else:
                    raise
            except Exception as e:
                last_error = e
                logger.error(f"获取向量失败: {e}")
                if attempt < self.max_retries - 1:
                    time.sleep(self.retry_delay)

        raise last_error or Exception("获取向量失败")

    def _get_embedding(self, text: str) -> List[float]:
        """
        调用智谱 AI Embedding API 获取文本向量

        Args:
            text: 文本内容

        Returns:
            向量列表
        """
        url = f"{self.api_base}/embeddings"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": self.model,
            "input": text
        }

        with httpx.Client(timeout=30.0) as client:
            response = client.post(url, headers=headers, json=data)
            response.raise_for_status()
            result = response.json()

        embedding = result["data"][0]["embedding"]
        return embedding
