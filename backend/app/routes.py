from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud
from app.database import SessionLocal
from pydantic import BaseModel
from typing import List
from jose import JWTError, jwt
from datetime import datetime
from datetime import timedelta
import os

# Get environment variables
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "secret")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPI", 15)

# Create API Router
router = APIRouter()


# Models is a Pydantic model that represents the request and response models for the API endpoints.
# Pydantic models are used to define the request and response models for the API endpoints.
# User Models
class UserCreateRequest(BaseModel):
    """
    Represents a user creation request.

    Attributes:
        username (str): The username of the user.
        password (str): The password of the user.
        is_admin (bool, optional): Indicates whether the user is an admin. Defaults to False.
    """

    username: str
    password: str
    is_admin: bool = False


# User Login Request
class UserLoginRequest(BaseModel):
    """
    User Login Request Model

    Attributes:
    - username: str
    - password: str
    """

    username: str
    password: str


# User Response
class BookCreate(BaseModel):
    """
    Book Create Model

    Attributes:
    - title: str
    - author: str
    """

    title: str
    author: str


# Book Response
class BookResponse(BookCreate):
    """
    Book Response Model

    Attributes:
    - id: int
    - is_borrowed: bool
    """

    id: int
    is_borrowed: bool

    class Config:
        orm_mode = True


# Token
class Token(BaseModel):
    """
    Token Model

    Attributes:
    - access_token: str
    - token_type: str
    """

    access_token: str
    token_type: str


# Token Data
class TokenData(BaseModel):
    """
    Token Data Model

    Attributes:
    - username: str
    """

    username: str


# Get Database
def get_db():
    # Create a new session for each request
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_access_token(data: dict, expires_delta: timedelta = None):
    # Create access token
    to_encode = data.copy()
    # Set expiration time
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=15)
    # Add expiration time to token
    to_encode.update({"exp": expire})
    # Encode token
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.get("/users", response_model=List[dict])
def get_users(db: Session = Depends(get_db)):
    # Get all users
    users = crud.get_users(db)
    # Return users
    return [
        {"id": user.id, "username": user.username, "is_admin": user.is_admin}
        for user in users
    ]


@router.get("/users/{user_id}", response_model=dict)
def get_user(user_id: int, db: Session = Depends(get_db)):
    # Get user by id
    user = crud.get_user_by_id(db, user_id)
    # If user does not exist, return 404
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": user.id, "username": user.username, "is_admin": user.is_admin}


@router.get("/books", response_model=List[dict])
def get_books(db: Session = Depends(get_db)):
    # Get all books
    books = crud.get_books(db)
    return [
        {
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "is_borrowed": book.is_borrowed,
        }
        for book in books
    ]


@router.post("/books", response_model=BookResponse)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    # Create book
    db_book = crud.create_book(db, book.title, book.author)
    # Return book
    return db_book


@router.get("/books/{book_id}", response_model=dict)
def get_book(book_id: int, db: Session = Depends(get_db)):
    # Check if book exists
    book = crud.get_book_by_id(db, book_id)
    # If book does not exist, return 404
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return {
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "is_borrowed": book.is_borrowed,
    }


# On Admin Level
@router.post("/users", response_model=dict)
def create_user(user: UserCreateRequest, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = crud.create_user(db, user.username, user.password, user.is_admin)
    # Return user
    return {"id": db_user.id, "name": db_user.username, "is_admin": db_user.is_admin}


@router.post("/register", response_model=dict)
def register(user: UserCreateRequest, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = crud.get_user_by_name(db, user.username)
    # If user already exists, return 400
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    # Create user
    db_user = crud.create_user(db, user.username, user.password, user.is_admin)
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # Return access token
    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )
    # Return access token
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
def login(user: UserLoginRequest, db: Session = Depends(get_db)):
    # Check if user exists and password is correct
    db_user = crud.get_user_by_name(db, user.username)
    # If user does not exist or password is incorrect, return 401
    if not db_user or not crud.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )
    # Return access
    return {"access_token": access_token, "token_type": "bearer"}
