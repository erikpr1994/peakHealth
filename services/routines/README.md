# Routines Service

Backend service for the PeakHealth Routines feature, providing comprehensive workout management and routine creation capabilities.

## Features

- **MongoDB Integration**: Flexible database for complex workout structures
- **Supabase Authentication**: JWT-based authentication system
- **RESTful API**: Complete CRUD operations for routines, workouts, and sections
- **Versioning Support**: Immutable routine versions for data integrity
- **Health Monitoring**: Built-in health checks and monitoring

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: Supabase JWT
- **Development**: tsx for hot reloading

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB instance
- Supabase project

### Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Environment setup:**

   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Development:**

   ```bash
   pnpm dev
   ```

4. **Production:**
   ```bash
   pnpm build
   pnpm start
   ```

## Environment Variables

| Variable              | Description               | Default                 |
| --------------------- | ------------------------- | ----------------------- |
| `PORT`                | Server port               | `4000`                  |
| `NODE_ENV`            | Environment               | `development`           |
| `MONGODB_URI`         | MongoDB connection string | Required                |
| `MONGODB_DATABASE`    | Database name             | Required                |
| `SUPABASE_JWT_SECRET` | JWT verification secret   | Required                |
| `CORS_ORIGIN`         | Allowed CORS origin       | `http://localhost:3000` |
| `LOG_LEVEL`           | Logging level             | `info`                  |

## API Endpoints

### Health Check

- `GET /api/health` - Service health status

### Routines (Coming Soon)

- `GET /api/routines` - List user routines
- `POST /api/routines` - Create new routine
- `GET /api/routines/:id` - Get routine details
- `PUT /api/routines/:id` - Update routine
- `DELETE /api/routines/:id` - Delete routine

### Library (Coming Soon)

- `GET /api/library/sections` - List reusable sections
- `POST /api/library/sections` - Create section template
- `PUT /api/library/sections/:id` - Update section template

## Development

### Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

### Project Structure

```
src/
├── api/                # Express routes and controllers
├── config/             # Configuration files
├── domain/             # Business logic and entities
├── middleware/         # Express middleware
├── services/           # Service layer
├── types/              # TypeScript type definitions
└── index.ts            # Main application entry point
```

## Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

## Deployment

The service is designed to be deployed on Railway with the following considerations:

- **Port**: Uses `PORT` environment variable (Railway sets this automatically)
- **Database**: MongoDB connection via `MONGODB_URI`
- **Environment**: Set `NODE_ENV=production` in production
- **Health Checks**: Railway can use `/api/health` endpoint

## Contributing

1. Follow the established project structure
2. Use TypeScript for all new code
3. Write tests for new functionality
4. Follow the API conventions documented in the main project
5. Ensure all linting and type checking passes

## License

MIT
