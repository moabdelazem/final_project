from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# This is an instance of the CryptContext class from the passlib library.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# The verify_password function verifies if the provided plain password matches the hashed password.
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# The get_password_hash function hashes the provided password.
def get_password_hash(password):
    return pwd_context.hash(password)


# The create_access_token function creates an access token with the provided data.
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
