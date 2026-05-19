from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from llm.zhipu.agents.resume_agent import ResumeAnalyzerAgent
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

        vector_store_success = False
        if VECTOR_STORE_ENABLED:
            try:
                rag_service = RAGService()
                chunk_count = await rag_service.store_resume(
                    resume_text=resume_text,
                    file_name=file.filename
                )
                vector_store_success = True
                logger.success(f"简历已存入向量库 | 块数: {chunk_count}")
            except Exception as e:
                logger.warning(f"向量存储失败，跳过: {str(e)}")
                logger.info("向量存储失败不影响简历分析，继续执行智能体分析")
        else:
            logger.info("向量存储已禁用，跳过")

        logger.info("="*50)
        logger.info("开始调用智能体分析简历")
        logger.info("="*50)

        analyzer = ResumeAnalyzerAgent()
        result = await analyzer.analyze_text(resume_text)

        logger.success("="*50)
        logger.success("智能体分析完成")
        logger.success(f"简历评分：{result.score}")
        logger.success(f"亮点数量：{len(result.highlights)}")
        logger.success(f"问题数量：{len(result.issues)}")
        logger.success(f"建议数量：{len(result.suggestions)}")
        logger.success("="*50)

        response_data = {
            "success": True,
            "data": result.model_dump(),
            "message": "分析成功",
            "vector_store_status": "success" if vector_store_success else "skipped"
        }

        logger.info(f"准备返回响应数据，数据大小：{len(str(response_data))} 字符")

        return JSONResponse(
            status_code=200,
            content=response_data
        )
    except Exception as e:
        logger.error(f"分析失败：{str(e)}")
        logger.exception(e)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        os.unlink(tmp_path)
