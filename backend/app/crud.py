# app/crud.py
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models import User, Book
from passlib.context import CryptContext

# This is an instance of the CryptContext class from the passlib library.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# CRUD operations for the User model
# The get_users function returns a list of all users in the database.
def get_users(db: Session) -> List[User]:
    return db.query(User).all()


# The get_user_by_id function returns a user with the specified id.
def get_books(db: Session) -> List[Book]:
    return db.query(Book).all()


# The get_user_by_id function returns a user with the specified id.
def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()


# The get_user_by_name function returns a user with the specified username.
def get_book_by_id(db: Session, book_id: int) -> Optional[Book]:
    return db.query(Book).filter(Book.id == book_id).first()


# The get_user_by_name function returns a user with the specified username.
def get_user_by_name(db: Session, name: str) -> Optional[User]:
    return db.query(User).filter(User.username == name).first()


# The create_user function creates a new user in the database.
def create_book(
    db: Session, title: str, author: str, is_borrowed: bool = False
) -> Book:
    db_book = Book(title=title, author=author, is_borrowed=is_borrowed)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


# The create_user function creates a new user in the database.
def create_user(db: Session, username: str, password: str, is_admin: bool):
    hashed_password = pwd_context.hash(password)
    db_user = User(username=username, password=hashed_password, is_admin=is_admin)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# The verify_password function verifies if the provided plain password matches the hashed password.
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


# Create Superuser
def create_superuser(db: Session, username: str, password: str) -> User:
    hashed_password = User.hash_password(password)
    db_user = User(name=username, password=hashed_password, is_admin=True)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
