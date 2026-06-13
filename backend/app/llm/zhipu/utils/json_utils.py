"""
通用工具模块 - JSON 提取
提供从 LLM 输出文本中提取 JSON 数据的统一方法
"""
import json
import re
from typing import Dict, Any, Optional
from loguru import logger


def extract_json(text: str) -> Optional[Dict[str, Any]]:
    """
    从文本中提取 JSON 数据，支持多种格式

    支持以下格式:
    1. 纯 JSON 字符串
    2. Markdown 代码块包裹的 JSON (```json {...} ```)
    3. 包含特定字段的 JSON 对象

    Args:
        text: 包含 JSON 的文本

    Returns:
        解析后的字典或 None
    """
    if not text:
        return None

    # 策略1: 尝试直接解析
    try:
        result = json.loads(text)
        if isinstance(result, dict):
            logger.success("JSON 直接解析成功")
            return result
    except json.JSONDecodeError:
        pass

    # 策略2: 提取 Markdown JSON 代码块
    json_match = re.search(r'```json\s*(\{.*?\})\s*```', text, re.DOTALL)
    if json_match:
        try:
            result = json.loads(json_match.group(1))
            logger.success("从代码块提取 JSON 成功")
            return result
        except json.JSONDecodeError:
            pass

    # 策略3: 提取第一个 JSON 对象
    json_match = re.search(r'\{[\s\S]*\}', text)
    if json_match:
        try:
            result = json.loads(json_match.group())
            if isinstance(result, dict):
                logger.success("从文本中提取 JSON 对象成功")
                return result
        except json.JSONDecodeError:
            pass

    # 策略4: 提取包含 "score" 字段的 JSON（简历/岗位专用）
    json_match = re.search(r'\{[^{}]*"score"[^{}]*\}', text, re.DOTALL)
    if json_match:
        try:
            result = json.loads(json_match.group())
            logger.success("从 score 模式提取 JSON 成功")
            return result
        except json.JSONDecodeError:
            pass

    logger.warning("JSON 提取失败，无法从文本中解析")
    return None
