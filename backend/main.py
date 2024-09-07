# app/main.py
from fastapi import FastAPI
from app.routes import router
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

# Create the database tables
Base.metadata.create_all(bind=engine)
