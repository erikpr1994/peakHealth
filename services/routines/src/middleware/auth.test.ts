import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { verifySupabaseJWT } from './auth';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

// Mock jsonwebtoken module
vi.mock('jsonwebtoken', () => {
  const mockVerify = vi.fn();
  const mockJsonWebTokenError = class JsonWebTokenError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'JsonWebTokenError';
    }
  };

  return {
    default: {
      verify: mockVerify,
      JsonWebTokenError: mockJsonWebTokenError,
    },
    verify: mockVerify,
    JsonWebTokenError: mockJsonWebTokenError,
  };
});

describe('verifySupabaseJWT middleware', () => {
  // Mock request, response, and next function
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: vi.Mock;

  // Setup environment variable
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();

    // Setup environment variables
    process.env = { ...originalEnv, SUPABASE_JWT_SECRET: 'test-secret' };

    // Setup request, response, and next function mocks
    req = {
      headers: {},
      user: undefined,
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    next = vi.fn();
  });

  afterEach(() => {
    // Restore environment variables
    process.env = originalEnv;
  });

  it('should pass with valid token and set user in request', () => {
    // Arrange
    const mockUser = {
      sub: 'user-123',
      email: 'test@example.com',
      role: 'user',
    };
    req.headers = { authorization: 'Bearer valid-token' };
    (jwt.verify as vi.Mock).mockReturnValue(mockUser);

    // Act
    verifySupabaseJWT(req as Request, res as Response, next);

    // Assert
    expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret');
    expect(req.user).toEqual({
      id: 'user-123',
      email: 'test@example.com',
      role: 'user',
    });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 401 when no authorization header is provided', () => {
    // Arrange
    req.headers = {};

    // Act
    verifySupabaseJWT(req as Request, res as Response, next);

    // Assert
    expect(jwt.verify).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Unauthorized',
      message: 'No valid token provided',
      code: 'auth/missing-token',
    });
  });

  it('should return 401 when authorization header does not start with Bearer', () => {
    // Arrange
    req.headers = { authorization: 'Basic invalid-format' };

    // Act
    verifySupabaseJWT(req as Request, res as Response, next);

    // Assert
    expect(jwt.verify).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Unauthorized',
      message: 'No valid token provided',
      code: 'auth/missing-token',
    });
  });

  it('should return 500 when SUPABASE_JWT_SECRET is not set', () => {
    // Arrange
    req.headers = { authorization: 'Bearer valid-token' };
    delete process.env.SUPABASE_JWT_SECRET;

    // Act
    verifySupabaseJWT(req as Request, res as Response, next);

    // Assert
    expect(jwt.verify).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Internal Server Error',
      message: 'Authentication configuration error',
      code: 'auth/config-error',
    });
  });

  it('should return 401 when token is invalid', () => {
    // Arrange
    req.headers = { authorization: 'Bearer invalid-token' };
    const jwtError = new jwt.JsonWebTokenError('invalid token');
    (jwt.verify as vi.Mock).mockImplementation(() => {
      throw jwtError;
    });

    // Act
    verifySupabaseJWT(req as Request, res as Response, next);

    // Assert
    expect(jwt.verify).toHaveBeenCalledWith('invalid-token', 'test-secret');
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Unauthorized',
      message: 'Invalid or expired token',
      code: 'auth/invalid-token',
    });
  });

  it('should return 500 when a non-JWT error occurs', () => {
    // Arrange
    req.headers = { authorization: 'Bearer valid-token' };
    const genericError = new Error('Some unexpected error');
    (jwt.verify as vi.Mock).mockImplementation(() => {
      throw genericError;
    });

    // Act
    verifySupabaseJWT(req as Request, res as Response, next);

    // Assert
    expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret');
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Internal Server Error',
      message: 'Authentication processing error',
      code: 'auth/processing-error',
    });
  });
});
