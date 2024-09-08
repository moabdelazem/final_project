# Booksnippet Library Management System API

This is a FastAPI-based Backend for a Library Management System that handles user authentication (registration, login) and book management (adding, retrieving books). It uses JWT for authentication and supports both regular users and admins.

## Requirements

Before starting, ensure you have the following installed:

- Python 3.7+
- FastAPI
- SQLAlchemy
- `python-jose` for JWT token handling
- Pydantic
- PostgreSQL (or any database configured via SQLAlchemy)

### Python Packages

You can install the required dependencies using:

```bash
pip install fastapi uvicorn sqlalchemy pydantic python-jose
```

# Models Documentation (`app/models.py`)

This module defines the database models for the Library Management System, including the `User` and `Book` models. It uses SQLAlchemy for ORM (Object-Relational Mapping) and Passlib for password hashing and verification.

## Models

### 1. `User`

This model represents the user in the system, with fields for ID, username, password, and an admin flag (`is_admin`). It includes methods for password hashing and verification.

#### Attributes:

- **id**: `Integer`
  - Primary key, auto-incremented.
- **username**: `String`

  - Username of the user, unique and indexed for quick lookups.

- **password**: `String`

  - Hashed password. The password is hashed using `bcrypt` for security.

- **is_admin**: `Boolean`
  - Flag indicating whether the user is an admin (`True`) or a regular user (`False`). Defaults to `False`.

#### Methods:

- **verify_password(plain_password: str) -> bool**:

  - Verifies whether a plain-text password matches the hashed password stored in the database.

  Example usage:

  ```python
  user = db_user  # A User instance from the database
  if user.verify_password("plain_password"):
      # Password is correct
  ```

# Routes Documentation (`app/routes.py`)

This module defines API endpoints for user authentication, user management, and book management. It uses FastAPI to build the endpoints, and JWT for authentication.

## Dependencies

- **`get_db()`**: Dependency that provides a database session to each request.
- **`create_access_token(data: dict, expires_delta: timedelta = None)`**: Helper function to create JWT tokens for authenticated users.

## Models

### 1. **`UserCreateRequest`**

- Model used to create a new user.

#### Attributes:

- `username`: `str` - The username of the user.
- `password`: `str` - The user's password.
- `is_admin`: `bool` - Whether the user is an admin (default: `False`).

### 2. **`UserLoginRequest`**

- Model used for user login.

#### Attributes:

- `username`: `str` - The username of the user.
- `password`: `str` - The password of the user.

### 3. **`BookCreate`**

- Model used to create a new book.

#### Attributes:

- `title`: `str` - The title of the book.
- `author`: `str` - The author of the book.

### 4. **`BookResponse`**

- Model used for returning book details.

#### Attributes:

- `id`: `int` - The ID of the book.
- `title`: `str` - The title of the book.
- `author`: `str` - The author of the book.
- `is_borrowed`: `bool` - Whether the book is borrowed.

### 5. **`Token`**

- Model used for returning access tokens.

#### Attributes:

- `access_token`: `str` - The JWT token for the user.
- `token_type`: `str` - The type of the token (default: `bearer`).

### 6. **`TokenData`**

- Model used to store token-related data.

#### Attributes:

- `username`: `str` - The username encoded in the token.

## Endpoints

### 1. **`GET /users`**

- Retrieve a list of all users.

#### Response:

- **200 OK**: A list of users, each containing:
  - `id`: `int` - The user's ID.
  - `username`: `str` - The user's username.
  - `is_admin`: `bool` - Whether the user is an admin.

#### Example Response:

```json
[
  {
    "id": 1,
    "username": "admin",
    "is_admin": true
  },
  {
    "id": 2,
    "username": "user123",
    "is_admin": false
  }
]
```
