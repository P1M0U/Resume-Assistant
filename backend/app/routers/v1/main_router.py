from fastapi import APIRouter
from fastapi.responses import JSONResponse
from .resume_router import resume_router
from .job_router import job_router
from .rag_router import rag_router
from .chat_router import chat_router
from .user_router import user_router

router = APIRouter(prefix="/v1", tags=["v1"])

router.include_router(resume_router)
router.include_router(job_router)
router.include_router(rag_router)
router.include_router(chat_router)
router.include_router(user_router)
