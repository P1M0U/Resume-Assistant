"""
用户数据模型
"""
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from dbs.mysql.database import Base
from datetime import datetime


class User(Base):
    """
    用户表模型
    """
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), unique=True, index=True, nullable=True)
    password = Column(String(255), nullable=True)
    email = Column(String(255), unique=True, index=True, nullable=True)
    create_time = Column(DateTime, default=datetime.now, nullable=True)
    latest_update = Column(DateTime, default=datetime.now,
                           onupdate=datetime.now, nullable=True)
    is_admin = Column(Boolean, default=False, nullable=True)

    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email})>"
