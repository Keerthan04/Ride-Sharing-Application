# Backend API Documentation
==========================
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