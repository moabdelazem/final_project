# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import Engine
from sqlalchemy.pool import Pool

# The DATABASE_URL variable is set to a SQLite database file named db.sqlite3.
DATABASE_URL = "sqlite:///./db.sqlite3"

# The create_engine function is used to create an engine object that represents the database connection.
engine: Engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
# The sessionmaker function is used to create a session class that will be used to interact with the database.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# The declarative_base function is used to create a base class for declarative class definitions.
Base: DeclarativeMeta = declarative_base()
