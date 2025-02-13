# NestJS Microservices Example

This project demonstrates the implementation of a microservices architecture using NestJS. The project consists of three main components:

- API Gateway
- Authentication Service
- User Service

## Architecture

### API Gateway (Port: 3000)

API Gateway serves as a single entry point for all client requests. It is responsible for:

- Routing requests to appropriate microservices
- Authentication and authorization of requests
- API Documentation (Swagger)
- Error handling

### Authentication Service (Port: 3001)

The authentication service is responsible for:

- User authentication
- JWT token generation
- Token validation
- User session management

### User Service (Port: 3002)

The user service is responsible for:

- CRUD operations with users
- Storing user data in PostgreSQL
- User profile management

## Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger/OpenAPI
- **Package Manager**: Yarn
- **Transport Layer**: TCP (for inter-service communication)

## Prerequisites

- Node.js (v14 or higher)
- Yarn
- PostgreSQL
- Docker (optional)

## Installation and Setup

1. Clone the repository:

```bash
 git clone <repository-url>
 cd nestjs-microservices
```

2. Install dependencies for each service:

```bash

# API Gateway

cd api-gateway
yarn install

# Auth Service

cd ../auth-service
yarn install

# User Service

cd ../user-service
yarn install
```

3. Set up the database:

```bash

# In user-service directory

cd ../user-service

# Create .env file from example

cp .env.example .env

# Initialize database

yarn prisma migrate dev

```

4. Start the services (each in a separate terminal):

```bash

# Auth Service

cd auth-service
yarn start:dev

# User Service

cd user-service
yarn start:dev

# API Gateway

cd api-gateway
yarn start:dev

```

## API Endpoints

### Authentication

#### Login

```http
POST /auth/login
Content-Type: application/json

{
"username": "john",
"password": "Aa12345678!"
}
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1..."
}
```

### Users

All user endpoints require JWT token in the header:

```bash
Authorization: Bearer <your-token>
```

#### Create User

```http
POST /users
Content-Type: application/json

{
"email": "user@example.com",
"name": "John Doe"
}
```

#### Get User

```http
GET /users/:id
```

#### Update User

```http
PUT /users/:id
Content-Type: application/json

{
"name": "Updated Name"
}
```

#### Delete User

```http
DELETE /users/:id
```

#### List All Users

```http
GET /users
```

## Swagger Documentation

Swagger UI is available at: \`http://localhost:3000/api\`

## Security

1. **JWT Tokens**: All protected endpoints require a valid JWT token
2. **Password Hashing**: Passwords are hashed using bcrypt
3. **Guards**: NestJS guards are used to protect endpoints
4. **Environment Variables**: Sensitive data is stored in .env files

## Project Structure

```
nestjs-microservices/
├── api-gateway/
│ ├── src/
│ │ ├── auth/
│ │ ├── users/
│ │ ├── app.module.ts
│ │ └── main.ts
│ └── package.json
├── auth-service/
│ ├── src/
│ │ ├── auth/
│ │ │ ├── strategies/
│ │ │ ├── auth.controller.ts
│ │ │ ├── auth.service.ts
│ │ │ └── auth.module.ts
│ │ ├── app.module.ts
│ │ └── main.ts
│ └── package.json
└── user-service/
├── src/
│ ├── user/
│ ├── app.module.ts
│ └── main.ts
├── prisma/
│ ├── migrations/
│ └── schema.prisma
└── package.json
```

## Test Credentials

For API testing, you can use the following credentials:

- Username: john
- Password: Aa12345678!

## Development

### Adding a New Microservice

1. Create a new directory for the service
2. Initialize a new NestJS project
3. Configure TCP transport
4. Add necessary controllers and services
5. Integrate with API Gateway

### Debugging

For debugging, use:

- NestJS logging
- Swagger UI for API testing
- Postman or similar tools

## Deployment Recommendations

1. Use Docker for service containerization
2. Set up load balancing
3. Use environment variables for configuration
4. Configure monitoring and logging
5. Ensure high availability

## Future Improvements

1. Add tests (unit, integration, e2e)
2. Implement caching (Redis)
3. Add logging system
4. Implement monitoring
5. Add CI/CD
6. Implement rate limiting
7. Add API documentation using Compodoc
8. Implement Event Bus system
9. Add health checks
10. Implement data backup system
