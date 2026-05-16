"""
用户路由
负责管理用户登录注册、身份验证等操作
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from dbs.mysql.database import get_db
from dbs.mysql.models.user import User
from schemas import UserRegisterRequest, UserLoginRequest, UserResponse, TokenResponse, UserUpdateRequest, RegisterResponse
from services.user_service import UserService
from core.security import get_current_active_user, get_password_hash
from loguru import logger

user_router = APIRouter(prefix="/user", tags=["用户管理"])


@user_router.post("/register", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserRegisterRequest,
    db: Session = Depends(get_db)
):
    """
    用户注册
    
    Args:
        user_data: 用户注册数据
        db: 数据库会话
        
    Returns:
        注册成功响应
    """
    logger.info(f"用户注册请求 | 用户名: {user_data.name} | 邮箱: {user_data.email}")
    
    user = UserService.register_user(db, user_data)
    
    logger.success(f"用户注册成功 | 用户ID: {user.id}")
    
    return RegisterResponse(
        message="注册成功，请登录",
        user=UserResponse(
            id=user.id,
            name=user.name,
            email=user.email,
            is_admin=user.is_admin,
            create_time=user.create_time
        )
    )


@user_router.post("/login", response_model=TokenResponse)
async def login(
    user_data: UserLoginRequest,
    db: Session = Depends(get_db)
):
    """
    用户登录
    
    Args:
        user_data: 用户登录数据
        db: 数据库会话
        
    Returns:
        Token响应
    """
    logger.info(f"用户登录请求 | 用户名: {user_data.name}")
    
    token_response = UserService.login_user(db, user_data.name, user_data.password)
    
    logger.success(f"用户登录成功 | 用户名: {user_data.name}")
    
    return token_response


@user_router.post("/login/form", response_model=TokenResponse)
async def login_form(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    OAuth2表单登录（用于Swagger UI测试）
    
    Args:
        form_data: OAuth2表单数据
        db: 数据库会话
        
    Returns:
        Token响应
    """
    logger.info(f"OAuth2表单登录请求 | 用户名: {form_data.username}")
    
    token_response = UserService.login_user(db, form_data.username, form_data.password)
    
    logger.success(f"OAuth2表单登录成功 | 用户名: {form_data.username}")
    
    return token_response


@user_router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_active_user)
):
    """
    获取当前用户信息
    
    Args:
        current_user: 当前登录用户
        
    Returns:
        用户信息
    """
    logger.info(f"获取当前用户信息 | 用户ID: {current_user.id}")
    
    return UserResponse(
        id=current_user.id,
        name=current_user.name,
        email=current_user.email,
        is_admin=current_user.is_admin,
        create_time=current_user.create_time
    )


@user_router.put("/me", response_model=UserResponse)
async def update_current_user(
    update_data: UserUpdateRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    更新当前用户信息
    
    Args:
        update_data: 更新数据
        current_user: 当前登录用户
        db: 数据库会话
        
    Returns:
        更新后的用户信息
    """
    logger.info(f"更新用户信息请求 | 用户ID: {current_user.id}")
    
    if update_data.name and update_data.name != current_user.name:
        existing_user = UserService.get_user_by_name(db, update_data.name)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="用户名已存在"
            )
        current_user.name = update_data.name
    
    if update_data.email and update_data.email != current_user.email:
        existing_user = UserService.get_user_by_email(db, update_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="邮箱已被使用"
            )
        current_user.email = update_data.email
    
    if update_data.password:
        from core.security import get_password_hash
        current_user.password = get_password_hash(update_data.password)
    
    db.commit()
    db.refresh(current_user)
    
    logger.success(f"用户信息更新成功 | 用户ID: {current_user.id}")
    
    return UserResponse(
        id=current_user.id,
        name=current_user.name,
        email=current_user.email,
        is_admin=current_user.is_admin,
        create_time=current_user.create_time
    )


@user_router.get("/{user_id}", response_model=UserResponse)
async def get_user_by_id(
    user_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    根据ID获取用户信息（需要管理员权限）
    
    Args:
        user_id: 用户ID
        current_user: 当前登录用户
        db: 数据库会话
        
    Returns:
        用户信息
        
    Raises:
        HTTPException: 权限不足或用户不存在
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="权限不足"
        )
    
    logger.info(f"管理员查询用户信息 | 用户ID: {user_id}")
    
    user = UserService.get_user_by_id(db, user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="用户不存在"
        )
    
    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        is_admin=user.is_admin,
        create_time=user.create_time
    )


@user_router.get("/", response_model=List[UserResponse])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    获取所有用户列表（需要管理员权限）
    
    Args:
        skip: 跳过的记录数
        limit: 返回的记录数
        current_user: 当前登录用户
        db: 数据库会话
        
    Returns:
        用户列表
        
    Raises:
        HTTPException: 权限不足
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="权限不足"
        )
    
    logger.info(f"管理员查询用户列表 | skip: {skip} | limit: {limit}")
    
    users = UserService.get_all_users(db, skip, limit)
    
    return [
        UserResponse(
            id=user.id,
            name=user.name,
            email=user.email,
            is_admin=user.is_admin,
            create_time=user.create_time
        )
        for user in users
    ]


@user_router.put("/{user_id}", response_model=UserResponse)
async def update_user_by_admin(
    user_id: int,
    update_data: UserUpdateRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    管理员更新用户信息
    
    Args:
        user_id: 用户ID
        update_data: 更新数据
        current_user: 当前登录用户
        db: 数据库会话
        
    Returns:
        更新后的用户信息
        
    Raises:
        HTTPException: 权限不足或用户不存在
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="权限不足"
        )
    
    logger.info(f"管理员更新用户信息 | 用户ID: {user_id}")
    
    user = UserService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="用户不存在"
        )
    
    if update_data.name and update_data.name != user.name:
        existing_user = UserService.get_user_by_name(db, update_data.name)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="用户名已存在"
            )
        user.name = update_data.name
    
    if update_data.email and update_data.email != user.email:
        existing_user = UserService.get_user_by_email(db, update_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="邮箱已被使用"
            )
        user.email = update_data.email
    
    if update_data.password:
        user.password = get_password_hash(update_data.password)
    
    db.commit()
    db.refresh(user)
    
    logger.success(f"管理员更新用户信息成功 | 用户ID: {user_id}")
    
    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        is_admin=user.is_admin,
        create_time=user.create_time
    )


@user_router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    删除用户（需要管理员权限）
    
    Args:
        user_id: 用户ID
        current_user: 当前登录用户
        db: 数据库会话
        
    Raises:
        HTTPException: 权限不足或用户不存在
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="权限不足"
        )
    
    if user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="不能删除自己的账号"
        )
    
    logger.info(f"管理员删除用户 | 用户ID: {user_id}")
    
    success = UserService.delete_user(db, user_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="用户不存在"
        )
    
    logger.success(f"管理员删除用户成功 | 用户ID: {user_id}")