# PeakHealth Routines Service

A microservice for managing workout routines, exercises, and workout sessions in the PeakHealth platform.

## Overview

This service is responsible for:

- Managing workout routines and their components
- Exercise library management
- Workout session tracking
- Routine versioning and progression

## Architecture

- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: Supabase JWT
- **Deployment**: Railway (planned)

## Development

### Prerequisites

- Node.js 20.11.0 or >=22.0.0
- MongoDB instance
- Supabase project for authentication

### Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

### Environment Variables

- `PORT`: Server port (default: 4000)
- `MONGODB_URI`: MongoDB connection string
- `SUPABASE_JWT_SECRET`: JWT secret for token verification
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
- `NODE_ENV`: Environment (development/production)

## API Endpoints

### Health Check

- `GET /health` - Service health status

### Service Info

- `GET /` - Service information and available endpoints

### API v1

- `GET /api/v1` - API version information
- `GET /api/v1/routines` - Routines endpoint (to be implemented)
- `GET /api/v1/library` - Library endpoint (to be implemented)

## Project Structure

```
src/
├── api/                # Express routes and controllers
│   ├── v1/
│   │   └── index.ts
│   └── index.ts
├── config/             # Environment variables, database connections
│   └── db.ts
├── domain/             # Core business logic, entities, and interfaces
│   ├── calculations/
│   ├── transformers/
│   └── validators/
├── middleware/         # Shared Express middleware
│   └── auth.ts
├── services/           # Services that interact with the database
├── types/              # Shared TypeScript types
│   └── routine.ts
└── app.ts              # Main Express application setup
```

## Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## Building

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```
