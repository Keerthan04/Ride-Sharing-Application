# Backend API Documentation

## Users Endpoint

## POST /users/register
Creates a new user.

### Request Body
- fullname.firstname (string, min length 3)
- fullname.lastname (string, min length 3, optional)
- email (string, min length 6, must be valid email)
- password (string, min length 6)

### Response
- 201 Created if successful
- 400 Bad Request if validation fails

Example Request:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "SuperSecret"
}

```

Example Response:
```json
{
  "user": {
    "_id": "123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  },
  "token": "JWT_TOKEN"
}
```

## POST /users/login
Logs in an existing user.

### Request Body
- email (string, must be a valid email)
- password (string, min length 6)

### Response
- 200 OK if successfully logged in
- 400 Bad Request if validation fails
- 401 Unauthorized if invalid credentials

Example Request:
```json
{
  "email": "john@example.com",
  "password": "SuperSecret"
}
```

Example Response:
```json
{
  "user": {
    "_id": "123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  },
  "token": "JWT_TOKEN"
}
```
### GET /users/profile
Get the current user's profile information.

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string"
}
```

### POST /users/logout
Log out the current user and invalidate their token.

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
{
  "message": "Successfully logged out"
}
```