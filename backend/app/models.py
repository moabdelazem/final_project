# app/models.py
from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    password = Column(String)
    is_admin = Column(Boolean, default=False)

    def verify_password(self, plain_password: str) -> bool:
        return pwd_context.verify(plain_password, self.password)

    @classmethod
    def hash_password(cls, plain_password: str) -> str:
        return pwd_context.hash(plain_password)


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String, index=True)
    is_borrowed = Column(Boolean, default=False)
