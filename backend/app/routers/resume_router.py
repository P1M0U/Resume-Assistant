from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from llm.zhipu.resume_analyzer import ResumeAnalyzer
from llm.zhipu.utils.file_parser import FileParser
from loguru import logger
import tempfile
import os

resume_router = APIRouter(prefix="/resume", tags=["简历分析"])


@resume_router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    """上传并分析简历"""
    # 验证文件格式
    if not (file.filename.endswith('.pdf') or file.filename.endswith('.docx')):
        raise HTTPException(status_code=400, detail="仅支持PDF和DOCX格式")

    # 保存临时文件
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=os.path.splitext(file.filename)[1]
    ) as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name

    try:
        # 解析文件
        logger.info(f"开始解析文件：{file.filename}")
        parser = FileParser()
        if file.filename.endswith('.pdf'):
            resume_text = parser.parse_pdf(tmp_path)
        else:
            resume_text = parser.parse_docx(tmp_path)
        
        logger.info(f"文件解析成功，文本长度：{len(resume_text)}")
        
        # 调用智能体分析
        logger.info("开始调用智能体分析")
        analyzer = ResumeAnalyzer()
        result = await analyzer.analyze_text(resume_text)
        
        logger.info(f"分析完成，评分：{result.score}")
        logger.info(f"亮点数量：{len(result.highlights)}, 问题数量：{len(result.issues)}")
        
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
        # 清理临时文件
        os.unlink(tmp_path)
