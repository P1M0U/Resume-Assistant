from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from llm.zhipu.chains.resume_analyzer_chain import ResumeAnalyzerChain
from llm.zhipu.utils.file_parser import FileParser
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
        parser = FileParser()
        if file.filename.endswith('.pdf'):
            resume_text = parser.parse_pdf(tmp_path)
        else:
            resume_text = parser.parse_docx(tmp_path)

        # 调用LangChain分析
        chain = ResumeAnalyzerChain()
        result = await chain.analyze(resume_text)

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": result.dict(),
                "message": "分析成功"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # 清理临时文件
        os.unlink(tmp_path)
