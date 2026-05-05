from fastapi import APIRouter
from fastapi.responses import JSONResponse
from .resume_router import resume_router
from .job_router import job_router
from .rag_router import rag_router

router = APIRouter()

router.include_router(resume_router)
router.include_router(job_router)
router.include_router(rag_router)
