# tools/resume_tools.py
from langchain_core.tools import tool
from typing import List, Dict, Any
from llm.zhipu.rag.vector_store import ResumeVectorStore
from llm.zhipu.utils.file_parser import FileParser
from loguru import logger
import re


@tool
def search_similar_resumes(resume_text: str, top_k: int = 3) -> List[Dict[str, Any]]:
    """
    从向量数据库中搜索相似的简历
    
    Args:
        resume_text: 简历文本内容
        top_k: 返回结果数量，默认3个
        
    Returns:
        相似简历列表，包含文件名和相似度
    """
    logger.info(f"开始搜索相似简历 | 文本长度: {len(resume_text)} | 数量: {top_k}")
    
    resume_store = ResumeVectorStore()
    resume_count = resume_store.get_collection_count()
    
    if resume_count == 0:
        logger.warning("简历向量库为空")
        return []
    
    # 使用前500字符进行搜索
    docs = resume_store.similarity_search(resume_text[:500], k=top_k)
    
    results = []
    for doc in docs:
        results.append({
            "file_name": doc.metadata.get("file_name", "未知文件"),
            "content_preview": doc.page_content[:300],
            "metadata": doc.metadata
        })
    
    logger.info(f"搜索完成 | 找到 {len(results)} 份相似简历")
    return results


@tool
def extract_skills_from_resume(resume_text: str) -> List[str]:
    """
    从简历文本中提取技能标签
    
    Args:
        resume_text: 简历文本内容
        
    Returns:
        提取的技能列表
    """
    logger.info(f"开始提取技能 | 文本长度: {len(resume_text)}")
    
    # 常见技能关键词
    skill_patterns = [
        r'Python|Java|JavaScript|TypeScript|C\+\+|Go|Rust',
        r'React|Vue|Angular|Node\.js|Django|Flask|FastAPI',
        r'MySQL|PostgreSQL|MongoDB|Redis|Elasticsearch',
        r'Docker|Kubernetes|AWS|Azure|GCP',
        r'机器学习|深度学习|NLP|计算机视觉|数据分析',
        r'Git|Linux|Nginx|Apache',
        r'HTML|CSS|SQL|NoSQL',
        r'TensorFlow|PyTorch|Keras|Scikit-learn|Pandas|NumPy'
    ]
    
    skills = set()
    for pattern in skill_patterns:
        matches = re.findall(pattern, resume_text, re.IGNORECASE)
        skills.update(matches)
    
    skill_list = list(skills)
    logger.info(f"技能提取完成 | 找到 {len(skill_list)} 个技能")
    return skill_list


@tool
def parse_resume_file(file_path: str) -> str:
    """
    解析简历文件（支持PDF和DOCX格式）
    
    Args:
        file_path: 简历文件路径
        
    Returns:
        简历文本内容
    """
    logger.info(f"开始解析简历文件 | 路径: {file_path}")
    
    parser = FileParser()
    
    if file_path.endswith('.pdf'):
        text = parser.parse_pdf(file_path)
    elif file_path.endswith('.docx'):
        text = parser.parse_docx(file_path)
    else:
        logger.error(f"不支持的文件格式: {file_path}")
        return f"不支持的文件格式：{file_path}"
    
    logger.info(f"文件解析完成 | 文本长度: {len(text)}")
    return text


# 导出工具列表
RESUME_TOOLS = [
    search_similar_resumes,
    extract_skills_from_resume,
    parse_resume_file
]