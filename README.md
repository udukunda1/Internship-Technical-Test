# User Management REST API

A simple REST API for user management built with Node.js and Express.js. This API allows you to create and retrieve users with basic validation and error handling.

## Technology Stack

- **Programming Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Additional Libraries**: 
  - `cors` - For handling Cross-Origin Resource Sharing
  - `crypto` - For generating UUIDs (built-in Node.js module)

## Features

- ✅ Create new users with name and email
- ✅ Retrieve users by ID
- ✅ Retrieve all users (bonus endpoint)
- ✅ Input validation and error handling
- ✅ In-memory data storage
- ✅ CORS support for cross-origin requests
- ✅ Health check endpoint

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the API

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` by default. You can change the port by setting the `PORT` environment variable.

## API Endpoints

### 1. Create User
**POST** `/users`

Creates a new user with the provided name and email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### 2. Get User by ID
**GET** `/users/:id`

Retrieves a user by their unique ID.

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Response (404 Not Found):**
```json
{
  "error": "User not found",
  "message": "No user found with the provided ID"
}
```

### 3. Get All Users
**GET** `/users`

Retrieves all users in the system.

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "createdAt": "2024-01-15T11:00:00.000Z"
  }
]
```

### 4. Health Check
**GET** `/health`

Returns the API health status.

**Response (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Testing with cURL

### Create a new user:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### Get a user by ID:
```bash
curl -X GET http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000
```

### Get all users:
```bash
curl -X GET http://localhost:3000/users
```

### Health check:
```bash
curl -X GET http://localhost:3000/health
```

## Error Handling

The API includes comprehensive error handling for various scenarios:

- **400 Bad Request**: Missing or invalid input fields
- **404 Not Found**: User not found
- **409 Conflict**: Email already exists
- **500 Internal Server Error**: Server-side errors

### Example Error Responses:

**Missing required fields:**
```json
{
  "error": "Missing required fields",
  "message": "Both name and email are required"
}
```

**Invalid email format:**
```json
{
  "error": "Invalid email",
  "message": "Please provide a valid email address"
}
```

**Email already exists:**
```json
{
  "error": "Email already exists",
  "message": "A user with this email already exists"
}
```

## Data Storage

This API uses in-memory storage (JavaScript Map) for simplicity. All data is lost when the server restarts. In a production environment, you would want to use a persistent database like PostgreSQL, MongoDB, or Redis.

## Project Structure

```
user-api/
├── package.json          # Project dependencies and scripts
├── server.js            # Main server file with all endpoints
└── README.md            # This file
```

## Future Enhancements

- Database integration (PostgreSQL, MongoDB)
- User authentication and authorization
- Input sanitization
- Rate limiting
- API documentation with Swagger
- Unit and integration tests
- Docker containerization

## License

MIT License 