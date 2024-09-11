# API Documentation

This document outlines the API endpoints and models for the Booksnippet application.

## Table of Contents

1. [Models](#models)
2. [Endpoints](#endpoints)
3. [Authentication](#authentication)

## Models

### User Models

#### UserCreateRequest

```python
class UserCreateRequest(BaseModel):
    username: str
    password: str
    is_admin: bool = False
```

Represents a user creation request.

#### UserResponse

```python
class UserResponse(BaseModel):
    id: int
    username: str
    is_admin: bool
```

Represents a user response.

#### UserLoginRequest

```python
class UserLoginRequest(BaseModel):
    username: str
    password: str
```

Represents a user login request.

### Book Models

#### BookCreate

```python
class BookCreate(BaseModel):
    title: str
    author: str
```

Represents a book creation request.

#### BookResponse

```python
class BookResponse(BookCreate):
    id: int
    is_borrowed: bool
```

Represents a book response.

#### UpdateBookResponse

```python
class UpdateBookResponse(BaseModel):
    id: int
    is_borrowed: bool
```

Represents an update book response.

### Token Models

#### Token

```python
class Token(BaseModel):
    access_token: str
    token_type: str
```

Represents an authentication token.

#### TokenData

```python
class TokenData(BaseModel):
    username: str
```

Represents token data.

## Endpoints

### User Endpoints

- `GET /users`: Get all users
- `GET /users/{user_id}`: Get a specific user by ID
- `POST /users`: Create a new user (Admin level)
- `POST /register`: Register a new user
- `POST /login`: Login a user

### Book Endpoints

- `GET /books`: Get all books
- `POST /books`: Create a new book
- `PUT /books/{book_id}`: Update a book's status
- `GET /books/{book_id}`: Get a specific book by ID
- `DELETE /books/{book_id}`: Delete a book

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. When a user registers or logs in, they receive an access token. This token should be included in the Authorization header of subsequent requests.

Example:

```plaintext
Authorization: Bearer <access_token>
```

The access token expires after a set time (default is 15 minutes, configurable via environment variable).

## Environment Variables

- `JWT_SECRET_KEY`: Secret key for JWT encoding/decoding (default: "secret")
- `JWT_ALGORITHM`: Algorithm used for JWT encoding/decoding (default: "HS256")
- `ACCESS_TOKEN_EXPI`: Access token expiration time in minutes (default: 15)

## Error Handling

The API uses standard HTTP status codes for error responses:

- 400: Bad Request (e.g., user already exists)
- 401: Unauthorized (e.g., invalid credentials)
- 404: Not Found (e.g., user or book not found)

Error responses include a "detail" field with a description of the error.

## Database

The API uses SQLAlchemy with a SQLite database. The database session is managed per request using the `get_db` dependency.

---

This documentation provides an overview of the API structure and usage. For more detailed information about specific endpoints or models, refer to the inline comments in the code.
