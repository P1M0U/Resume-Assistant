from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from llm.zhipu.resume_analyzer import ResumeAnalyzer
from llm.zhipu.rag.rag_chain import RAGService
from llm.zhipu.utils.file_parser import FileParser
from settings import VECTOR_STORE_ENABLED
from loguru import logger
import tempfile
import os

resume_router = APIRouter(prefix="/resume", tags=["简历分析"])


@resume_router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    """
    上传并分析简历，同时将简历存入向量数据库以支持 RAG 检索

    Args:
        file: 上传的简历文件（PDF 或 DOCX 格式）

    Returns:
        JSONResponse: 包含分析结果的响应
    """
    if not (file.filename.endswith('.pdf') or file.filename.endswith('.docx')):
        raise HTTPException(status_code=400, detail="仅支持PDF和DOCX格式")

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=os.path.splitext(file.filename)[1]
    ) as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name

    try:
        logger.info(f"开始解析文件：{file.filename}")
        parser = FileParser()
        if file.filename.endswith('.pdf'):
            resume_text = parser.parse_pdf(tmp_path)
        else:
            resume_text = parser.parse_docx(tmp_path)

        logger.info(f"文件解析成功，文本长度：{len(resume_text)}")

        # 将简历存入向量数据库（失败不影响核心功能）
        if VECTOR_STORE_ENABLED:
            try:
                rag_service = RAGService()
                chunk_count = await rag_service.store_resume(
                    resume_text=resume_text,
                    file_name=file.filename
                )
                logger.info(f"简历已存入向量库 | 块数: {chunk_count}")
            except Exception as e:
                logger.warning(f"向量存储失败，跳过: {str(e)}")
        else:
            logger.info("向量存储已禁用，跳过")

        # 调用智能体分析
        logger.info("开始调用智能体分析")
        analyzer = ResumeAnalyzer()
        result = await analyzer.analyze_text(resume_text)

        logger.info(f"分析完成，评分：{result.score}")
        logger.info(
            f"亮点数量：{len(result.highlights)}, 问题数量：{len(result.issues)}")

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": result.dict(),
                "message": "分析成功"
            }
        )
    except Exception as e:
        logger.error(f"分析失败：{str(e)}")
        logger.exception(e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        os.unlink(tmp_path)
