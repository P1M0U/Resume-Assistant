"""
用户服务层
处理用户相关的业务逻辑
"""
from sqlalchemy.orm import Session
from dbs.mysql.models.user import User
from core.security import get_password_hash, verify_password, create_access_token
from schemas import UserRegisterRequest, UserResponse, TokenResponse
from fastapi import HTTPException, status
from loguru import logger
from typing import Optional


class UserService:
    """用户服务类"""
    
    @staticmethod
    def register_user(db: Session, user_data: UserRegisterRequest) -> User:
        """
        用户注册
        
        Args:
            db: 数据库会话
            user_data: 用户注册数据
            
        Returns:
            创建的用户对象
            
        Raises:
            HTTPException: 用户名或邮箱已存在
        """
        existing_user = db.query(User).filter(
            (User.name == user_data.name) | (User.email == user_data.email)
        ).first()
        
        if existing_user:
            if existing_user.name == user_data.name:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="用户名已存在"
                )
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="邮箱已被注册"
                )
        
        hashed_password = get_password_hash(user_data.password)
        
        new_user = User(
            name=user_data.name,
            email=user_data.email,
            password=hashed_password,
            is_admin=False
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        logger.info(f"用户注册成功 | 用户名: {new_user.name} | 邮箱: {new_user.email}")
        
        return new_user
    
    @staticmethod
    def login_user(db: Session, name: str, password: str) -> TokenResponse:
        """
        用户登录
        
        Args:
            db: 数据库会话
            name: 用户名
            password: 密码
            
        Returns:
            Token响应
            
        Raises:
            HTTPException: 用户名或密码错误
        """
        user = db.query(User).filter(User.name == name).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="用户名或密码错误",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        if not verify_password(password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="用户名或密码错误",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        access_token = create_access_token(data={"sub": user.id})
        
        logger.info(f"用户登录成功 | 用户名: {user.name}")
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse(
                id=user.id,
                name=user.name,
                email=user.email,
                is_admin=user.is_admin,
                create_time=user.create_time
            )
        )
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
        """
        根据ID获取用户
        
        Args:
            db: 数据库会话
            user_id: 用户ID
            
        Returns:
            用户对象或None
        """
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def get_user_by_name(db: Session, name: str) -> Optional[User]:
        """
        根据用户名获取用户
        
        Args:
            db: 数据库会话
            name: 用户名
            
        Returns:
            用户对象或None
        """
        return db.query(User).filter(User.name == name).first()
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        """
        根据邮箱获取用户
        
        Args:
            db: 数据库会话
            email: 邮箱地址
            
        Returns:
            用户对象或None
        """
        return db.query(User).filter(User.email == email).first()