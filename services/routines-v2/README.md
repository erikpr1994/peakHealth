# Routines V2 Service

A redesigned Node.js/Express service for managing workout routines with enhanced reliability and performance.

## Features

- **Authentication**: Supabase JWT-based authentication
- **Rate Limiting**: Multi-tier rate limiting for API protection
- **Database**: MongoDB with Mongoose ODM
- **Error Handling**: Comprehensive error handling with RFC 9457 compliance
- **Pagination**: Built-in pagination support
- **Validation**: Request validation middleware
- **Testing**: Comprehensive test coverage with Vitest

## API Endpoints

### Routines

- `GET /health` - Health check endpoint
- `POST /api/routines` - Create a new routine
- `GET /api/routines` - Get routines with pagination and filtering
- `GET /api/routines/:id` - Get a specific routine
- `PUT /api/routines/:id` - Update a routine
- `DELETE /api/routines/:id` - Delete a routine
- `POST /api/routines/:id/assign` - Assign routine to user

## Development

### Prerequisites

- Node.js 18+
- MongoDB
- pnpm

### Installation

```bash
pnpm install
```

### Running the Service

```bash
# Development mode with auto-reload
pnpm dev

# Production build and start
pnpm build
pnpm start
```

### Testing

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Environment Variables

Create a `.env` file with the following variables:

```
PORT=3002
MONGO_URI=mongodb://localhost:27017/routines-v2
SUPABASE_JWT_SECRET=your-jwt-secret
NODE_ENV=development
```

## Architecture

The service follows a clean architecture pattern:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic layer
- **Models**: Database models and schemas
- **Middleware**: Authentication, validation, rate limiting
- **Utils**: Helper functions and utilities
