# Routines Service

A Node.js/Express service for managing workout routines with authentication and rate limiting.

## Rate Limiting

This service implements comprehensive rate limiting to prevent denial-of-service attacks. The rate limiting is configured at multiple levels:

### Global Rate Limiting

- Applied to all requests by default
- 1000 requests per 15 minutes per IP
- Health check endpoints are excluded from rate limiting

### Specific Rate Limiters

#### `globalLimiter`

- **Limit**: 1000 requests per 15 minutes per IP
- **Usage**: Applied globally to all requests
- **Exclusions**: Health check endpoints (`/health`)

#### `authLimiter`

- **Limit**: 100 requests per 15 minutes per IP
- **Usage**: For authentication and sensitive endpoints
- **Example**: Login, profile, protected test routes

#### `apiLimiter`

- **Limit**: 300 requests per 15 minutes per IP
- **Usage**: For general API endpoints
- **Example**: Data retrieval endpoints

#### `resourceLimiter`

- **Limit**: 100 requests per 15 minutes per IP
- **Usage**: For resource-specific endpoints
- **Example**: Routines CRUD operations

### Implementation

The rate limiting middleware is implemented in `src/middleware/rateLimit.ts` and provides:

- Standard rate limit headers (`RateLimit-*`)
- Custom error messages for different endpoint types
- Configurable limits and time windows
- IP-based tracking

### Usage Examples

```typescript
import {
  globalLimiter,
  authLimiter,
  resourceLimiter,
} from './middleware/rateLimit';

// Apply global rate limiting to all requests
app.use(globalLimiter);

// Apply stricter rate limiting to authentication endpoints
app.get('/api/auth/login', authLimiter, authController.login);

// Apply resource-specific rate limiting
app.use('/api/routines', resourceLimiter, routineRoutes);
```

### Rate Limit Headers

The middleware includes standard rate limit headers in responses:

- `RateLimit-Limit`: Maximum requests allowed
- `RateLimit-Remaining`: Remaining requests in current window
- `RateLimit-Reset`: Time when the rate limit resets

### Error Responses

When rate limits are exceeded, the service returns:

- HTTP 429 (Too Many Requests)
- JSON error message
- Rate limit headers with reset information

## Development

### Running Tests

```bash
pnpm test
```

### Running the Service

```bash
pnpm start
```

## Environment Variables

- `PORT`: Server port (default: 3001)
- `MONGO_URI`: MongoDB connection string
- `SUPABASE_JWT_SECRET`: JWT secret for token verification
