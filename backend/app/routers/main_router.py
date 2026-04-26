from fastapi import APIRouter
from fastapi.responses import JSONResponse
from resume_router import resume_router

router = APIRouter(prefix="/")

router.include_router(resume_router)
