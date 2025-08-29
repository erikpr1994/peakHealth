import { describe, it, expect, vi, beforeEach } from 'vitest';
import express, { Request, Response } from 'express';
import request from 'supertest';

// Mock express-rate-limit
vi.mock('express-rate-limit', () => ({
  default: vi.fn(() => (req: Request, res: Response, next: Function) => {
    // Mock implementation that always passes through
    next();
  }),
}));

// Mock the auth middleware
vi.mock('./middleware/auth', () => ({
  verifySupabaseJWT: vi.fn((req: Request, res: Response, next: Function) => {
    // Check if authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No valid token provided',
        code: 'auth/missing-token',
      });
    }
    
    // Mock implementation to simulate successful authentication
    if (req.headers.authorization === 'Bearer valid-token') {
      req.user = {
        id: 'user-123',
        email: 'test@example.com',
        role: 'user',
      };
      return next();
    }
    
    // If we get here, the token exists but is invalid
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token',
      code: 'auth/invalid-token',
    });
  }),
}));

// Import after mocking
import { verifySupabaseJWT } from './middleware/auth';
import rateLimit from 'express-rate-limit';

describe('Protected Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());

    // Setup the protected test route
    app.get(
      '/api/v1/protected-test',
      rateLimit({ // Add rate limiting to protect against brute force attacks
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
      }),
      verifySupabaseJWT,
      (req: Request, res: Response) => {
        res.status(200).json({
          userId: req.user?.id,
          email: req.user?.email,
          role: req.user?.role,
          message: 'Authentication successful',
        });
      }
    );
  });

  it('should return 200 and user data when valid token is provided', async () => {
    // Act
    const response = await request(app)
      .get('/api/v1/protected-test')
      .set('Authorization', 'Bearer valid-token');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      userId: 'user-123',
      email: 'test@example.com',
      role: 'user',
      message: 'Authentication successful',
    });
  });

  it('should return 401 when no token is provided', async () => {
    // Act
    const response = await request(app).get('/api/v1/protected-test');

    // Assert
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: 'Unauthorized',
      message: 'No valid token provided',
      code: 'auth/missing-token',
    });
  });

  it('should return 401 when invalid token is provided', async () => {
    // Act
    const response = await request(app)
      .get('/api/v1/protected-test')
      .set('Authorization', 'Bearer invalid-token');

    // Assert
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: 'Unauthorized',
      message: 'Invalid or expired token',
      code: 'auth/invalid-token',
    });
  });
});
