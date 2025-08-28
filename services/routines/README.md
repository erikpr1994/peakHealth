# Routines Service

This is the backend service for the PeakHealth Routines feature. It provides API endpoints for managing workout routines and user progress.

## Setup

### Prerequisites

- Node.js v24 or higher
- pnpm v10.14.0 or higher
- MongoDB (local or remote instance)
- Supabase account (for authentication)

### Environment Variables

Copy the `.env.example` file to create a `.env` file:

```bash
cp .env.example .env
```

Then update the values in the `.env` file:

```
# Server Configuration
PORT=3001

# MongoDB Connection
MONGO_URI=mongodb://mongo:27017/routines

# Supabase Authentication
SUPABASE_JWT_SECRET=your_supabase_jwt_secret
```

### Getting the Supabase JWT Secret

To get your Supabase JWT secret:

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. In the **JWT Settings** section, find the **JWT Secret** value
4. Copy this value and add it to your `.env` file as `SUPABASE_JWT_SECRET`

![Supabase JWT Secret Location](https://supabase.com/docs/img/guides/api/api-keys-jwt-secret.png)

> **Important**: Keep your JWT secret secure and never commit it to version control.

### Installation

Install dependencies:

```bash
pnpm install
```

### Running the Service

Start the service in development mode:

```bash
pnpm start
```

## Authentication

This service uses Supabase JWT tokens for authentication. The tokens are verified using the `verifySupabaseJWT` middleware, which extracts the user ID from the token and attaches it to the request object.

For more details on the authentication implementation, see the [Authentication Investigation](../../docs/features/routines/backend/authentication-investigation.md) document.

## API Documentation

For detailed API documentation, refer to the [API Endpoints](../../docs/features/routines/backend/endpoints.md) document.
