from fastapi import APIRouter, File, UploadFile,HTTPException
from fastapi.responses import JSONResponse
from app.llm.zhipu.chains.resume_analyzer_chain import ResumeAnalyzerChain
from app.llm.zhipu.utils.file_parser import FileParser
import tempfile
import os

resume_router = APIRouter(prefix="/resume",tags=["简历分析"])

@resume_router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf",".docx"):
        raise HTTPException(status_code=400,detail="文件格式错误")
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=os.path.splitext(file.filename)[1]
    ) as tmp:
        comtent = await file.read()
        tmp.write(comtent)
        tmp_path = tmp.name
    try:
        parser = FileParser()
        if file.filename.endswith(".pdf"):
            text = parser.parse_pdf(tmp_path)
        elif file.filename.endswith(".docx"):
            text = parser.parse_docx(tmp_path)
        else:
            raise HTTPException(status_code=400,detail="文件格式错误")
        chain = ResumeAnalyzerChain()
        result = await chain.analyze(resume_text)
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "result": result.dict(),
                "message": "分析成功"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
    finally:
        os.remove(tmp_path)
    
   