# app/models.py
from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base
from passlib.context import CryptContext


# This is an instance of the CryptContext class from the passlib library.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    """
    Represents a user in the system.

    Attributes:
        id (int): The unique identifier of the user.
        username (str): The username of the user.
        password (str): The hashed password of the user.
        is_admin (bool): Indicates whether the user is an admin or not.

    Methods:
        verify_password(plain_password: str) -> bool:
            Verifies if the provided plain password matches the user's hashed password.

        hash_password(plain_password: str) -> str:
            Hashes the provided plain password.

    """

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    password = Column(String)
    is_admin = Column(Boolean, default=False)

    # This method verifies if the provided plain password matches the user's hashed password.
    def verify_password(self, plain_password: str) -> bool:
        return pwd_context.verify(plain_password, self.password)

    # This method is a class method because it does not require the instance of the class to be created.
    @classmethod
    def hash_password(cls, plain_password: str) -> str:
        return pwd_context.hash(plain_password)


class Book(Base):
    """
    Represents a book.

    Attributes:
        id (int): The unique identifier of the book.
        title (str): The title of the book.
        author (str): The author of the book.
        is_borrowed (bool): Indicates whether the book is currently borrowed or not.
    """

    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String, index=True)
    is_borrowed = Column(Boolean, default=False)
