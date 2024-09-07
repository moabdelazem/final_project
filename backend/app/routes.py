from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud
from app.database import SessionLocal
from pydantic import BaseModel
from typing import List
from jose import JWTError, jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()


class UserCreateRequest(BaseModel):
    username: str
    password: str
    is_admin: bool = False


class UserLoginRequest(BaseModel):
    username: str
    password: str


class BookCreate(BaseModel):
    title: str
    author: str


class BookResponse(BookCreate):
    id: int
    is_borrowed: bool

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.get("/users", response_model=List[dict])
def get_users(db: Session = Depends(get_db)):
    users = crud.get_users(db)
    return [
        {"id": user.id, "username": user.username, "is_admin": user.is_admin}
        for user in users
    ]


@router.get("/users/{user_id}", response_model=dict)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": user.id, "username": user.username, "is_admin": user.is_admin}


@router.get("/books", response_model=List[dict])
def get_books(db: Session = Depends(get_db)):
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
    db_book = crud.create_book(db, book.title, book.author)
    return db_book


@router.get("/books/{book_id}", response_model=dict)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = crud.get_book_by_id(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return {
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "is_borrowed": book.is_borrowed,
    }


@router.post("/users", response_model=dict)
def create_user(user: UserCreateRequest, db: Session = Depends(get_db)):
    db_user = crud.create_user(db, user.username, user.password, user.is_admin)
    return {"id": db_user.id, "name": db_user.username, "is_admin": db_user.is_admin}


@router.post("/register", response_model=dict)
def register(user: UserCreateRequest, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_name(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    db_user = crud.create_user(db, user.username, user.password, user.is_admin)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
def login(user: UserLoginRequest, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_name(db, user.username)
    if not db_user or not crud.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
