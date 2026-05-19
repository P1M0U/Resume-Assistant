"""
Schema模块统一导出
提供所有Pydantic模型的统一访问入口
"""

from .resume import (
    PersonalInfo,
    Suggestion,
    ResumeAnalysisResult,
)

from .job import (
    JobRecommendation,
    JobMatchResult,
    JobRecommendRequest,
)

from .rag import (
    StoreResumeRequest,
    StoreJobRequest,
    RAGQueryRequest,
    RAGAnalyzeRequest,
    RAGRecommendRequest,
)

from .chat import (
    ChatRequest,
    ChatResponse,
    ChatHistoryResponse,
)

from .user import (
    UserRegisterRequest,
    UserLoginRequest,
    UserResponse,
    TokenResponse,
    UserUpdateRequest,
    RegisterResponse,
)

__all__ = [
    # Resume schemas
    "PersonalInfo",
    "Suggestion",
    "ResumeAnalysisResult",
    # Job schemas
    "JobRecommendation",
    "JobMatchResult",
    "JobRecommendRequest",
    # RAG schemas
    "StoreResumeRequest",
    "StoreJobRequest",
    "RAGQueryRequest",
    "RAGAnalyzeRequest",
    "RAGRecommendRequest",
    # Chat schemas
    "ChatRequest",
    "ChatResponse",
    "ChatHistoryResponse",
    # User schemas
    "UserRegisterRequest",
    "UserLoginRequest",
    "UserResponse",
    "TokenResponse",
    "UserUpdateRequest",
    "RegisterResponse",
]
