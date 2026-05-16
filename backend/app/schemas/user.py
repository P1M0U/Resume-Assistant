"""
用户相关Schema
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserRegisterRequest(BaseModel):
    """
    用户注册请求
    """
    name: str = Field(..., min_length=2, max_length=50, description="用户名")
    password: str = Field(..., min_length=4, max_length=20, description="密码")
    email: EmailStr = Field(..., description="邮箱地址")


class UserLoginRequest(BaseModel):
    """
    用户登录请求
    """
    name: str = Field(..., description="用户名")
    password: str = Field(..., description="密码")


class UserResponse(BaseModel):
    """
    用户信息响应
    """
    id: int
    name: str
    email: str
    is_admin: bool
    create_time: Optional[datetime] = None

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    """
    Token响应
    """
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class UserUpdateRequest(BaseModel):
    """
    用户信息更新请求
    """
    name: Optional[str] = Field(None, min_length=2, max_length=50, description="用户名")
    email: Optional[EmailStr] = Field(None, description="邮箱地址")
    password: Optional[str] = Field(None, min_length=4, max_length=20, description="新密码")