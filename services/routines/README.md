# Routines Service

This service handles routines-related functionality for the Peak Health application.

## Authentication

The service uses Supabase JWT authentication. The `verifySupabaseJWT` middleware verifies tokens from the `Authorization: Bearer` header and attaches the authenticated user's information to the request object.

### Environment Variables

- `SUPABASE_JWT_SECRET`: JWT secret from Supabase for token verification (required)
- `PORT`: The port to run the server on (default: 3001)
- `MONGO_URI`: MongoDB connection string (default: mongodb://mongo:27017/routines)

### Protected Routes

All protected routes use the `verifySupabaseJWT` middleware to authenticate requests and rate limiting for security. The authentication middleware:

1. Extracts the JWT from the Authorization header
2. Verifies it using the SUPABASE_JWT_SECRET
3. Attaches the user information to the request object

Rate limiting is applied to all protected routes to prevent brute force attacks:
- 100 requests per 15 minutes per IP address

Example of a protected route:

```typescript
app.get(
  '/api/v1/protected-test',
  profileLimiter, // Rate limiting
  verifySupabaseJWT, // Authentication
  (req: Request, res: Response) => {
    res.status(200).json({
      userId: req.user?.id,
      email: req.user?.email,
      role: req.user?.role,
      message: 'Authentication successful',
    });
  }
);
```

### Testing

The authentication middleware has comprehensive unit tests covering:

- Requests with a valid token
- Requests with an invalid/expired token
- Requests with a malformed `Authorization` header
- Requests with no token at all

Run tests with:

```bash
pnpm test
```

Run tests with coverage:

```bash
pnpm test:coverage
```
