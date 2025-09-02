import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
  verifySupabaseJWT,
  requireRole,
  optionalAuth,
  getUserId,
  isAuthenticated,
} from './auth';
import { ApiError } from '../utils/error-handler';

// Mock jsonwebtoken
vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(),
    TokenExpiredError: class extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'TokenExpiredError';
      }
    },
    JsonWebTokenError: class extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'JsonWebTokenError';
      }
    },
    NotBeforeError: class extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'NotBeforeError';
      }
    },
  },
}));

describe('Authentication Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockConsoleError: any;

  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup environment
    process.env = {
      ...originalEnv,
      SUPABASE_JWT_SECRET: 'test-secret-key',
      NODE_ENV: 'test',
    };

    // Mock request, response, and next function
    mockRequest = {
      headers: {},
      user: undefined,
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    mockNext = vi.fn();
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('verifySupabaseJWT', () => {
    const validToken = 'valid.jwt.token';
    const mockUserPayload = {
      sub: 'user-123',
      email: 'test@example.com',
      role: 'authenticated',
      aud: 'authenticated',
      iss: 'https://test.supabase.co/auth/v1',
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
    };

    it('should authenticate valid token and set user on request', () => {
      mockRequest.headers = { authorization: `Bearer ${validToken}` };
      (jwt.verify as any).mockReturnValue(mockUserPayload);

      verifySupabaseJWT(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(jwt.verify).toHaveBeenCalledWith(validToken, 'test-secret-key', {
        algorithms: ['HS256'],
        clockTolerance: 30,
      });
      expect(mockRequest.user).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        role: 'authenticated',
        aud: 'authenticated',
        iss: 'https://test.supabase.co/auth/v1',
        sub: 'user-123',
        exp: mockUserPayload.exp,
        iat: mockUserPayload.iat,
      });
      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should handle missing authorization header', () => {
      mockRequest.headers = {};

      verifySupabaseJWT(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(jwt.verify).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'No valid token provided',
          statusCode: 401,
        })
      );
    });

    it('should handle invalid authorization header format', () => {
      mockRequest.headers = { authorization: 'Basic invalid-format' };

      verifySupabaseJWT(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(jwt.verify).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'No valid token provided',
          statusCode: 401,
        })
      );
    });

    it('should handle missing JWT secret', () => {
      delete process.env.SUPABASE_JWT_SECRET;
      mockRequest.headers = { authorization: `Bearer ${validToken}` };

      verifySupabaseJWT(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(jwt.verify).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Authentication configuration error',
          statusCode: 500,
        })
      );
    });

    it('should handle token missing sub claim', () => {
      mockRequest.headers = { authorization: `Bearer ${validToken}` };
      (jwt.verify as any).mockReturnValue({ email: 'test@example.com' }); // Missing sub

      verifySupabaseJWT(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Token missing required user identifier',
          statusCode: 401,
        })
      );
    });

    it('should handle expired token', () => {
      mockRequest.headers = { authorization: `Bearer ${validToken}` };
      (jwt.verify as any).mockImplementation(() => {
        throw new jwt.TokenExpiredError('jwt expired');
      });

      verifySupabaseJWT(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Token has expired',
          statusCode: 401,
        })
      );
    });

    it('should handle malformed token', () => {
      mockRequest.headers = { authorization: `Bearer ${validToken}` };
      (jwt.verify as any).mockImplementation(() => {
        throw new jwt.JsonWebTokenError('jwt malformed');
      });

      verifySupabaseJWT(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Invalid or malformed token',
          statusCode: 401,
        })
      );
    });

    it('should handle not-before token', () => {
      mockRequest.headers = { authorization: `Bearer ${validToken}` };
      (jwt.verify as any).mockImplementation(() => {
        throw new jwt.NotBeforeError('jwt not active');
      });

      verifySupabaseJWT(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Token not yet valid',
          statusCode: 401,
        })
      );
    });

    it('should handle unexpected errors', () => {
      mockRequest.headers = { authorization: `Bearer ${validToken}` };
      (jwt.verify as any).mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      verifySupabaseJWT(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Authentication processing error',
          statusCode: 500,
        })
      );
    });
  });

  describe('requireRole', () => {
    it('should allow access for user with required role', () => {
      mockRequest.user = { id: 'user-123', role: 'admin' };
      const middleware = requireRole(['admin', 'moderator']);

      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should deny access for user without required role', () => {
      mockRequest.user = { id: 'user-123', role: 'user' };
      const middleware = requireRole(['admin', 'moderator']);

      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Access denied. Required roles: admin, moderator',
          statusCode: 403,
        })
      );
    });

    it('should deny access for unauthenticated user', () => {
      mockRequest.user = undefined;
      const middleware = requireRole(['admin']);

      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Authentication required',
          statusCode: 401,
        })
      );
    });

    it('should use default role "authenticated" when role is missing', () => {
      mockRequest.user = { id: 'user-123' }; // No role specified
      const middleware = requireRole(['authenticated']);

      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
    });
  });

  describe('optionalAuth', () => {
    it('should proceed without authentication when no header provided', () => {
      mockRequest.headers = {};

      optionalAuth(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockRequest.user).toBeUndefined();
    });

    it('should proceed without authentication when invalid header format', () => {
      mockRequest.headers = { authorization: 'Basic invalid' };

      optionalAuth(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockRequest.user).toBeUndefined();
    });

    it('should verify token when valid header provided', () => {
      const validToken = 'valid.jwt.token';
      const mockUserPayload = {
        sub: 'user-123',
        email: 'test@example.com',
        role: 'authenticated',
      };

      mockRequest.headers = { authorization: `Bearer ${validToken}` };
      (jwt.verify as any).mockReturnValue(mockUserPayload);

      // Mock the verifySupabaseJWT by calling next directly
      vi.doMock('./auth', () => ({
        verifySupabaseJWT: (
          req: Request,
          res: Response,
          next: NextFunction
        ) => {
          req.user = {
            id: 'user-123',
            email: 'test@example.com',
            role: 'authenticated',
          };
          next();
        },
      }));

      optionalAuth(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('getUserId', () => {
    it('should return user ID when user is authenticated', () => {
      mockRequest.user = { id: 'user-123', email: 'test@example.com' };

      const userId = getUserId(mockRequest as Request);

      expect(userId).toBe('user-123');
    });

    it('should throw error when user is not authenticated', () => {
      mockRequest.user = undefined;

      expect(() => getUserId(mockRequest as Request)).toThrow(ApiError);
      expect(() => getUserId(mockRequest as Request)).toThrow(
        'User authentication required'
      );
    });

    it('should throw error when user object exists but has no ID', () => {
      mockRequest.user = { email: 'test@example.com' } as any;

      expect(() => getUserId(mockRequest as Request)).toThrow(ApiError);
      expect(() => getUserId(mockRequest as Request)).toThrow(
        'User authentication required'
      );
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when user is authenticated', () => {
      mockRequest.user = { id: 'user-123', email: 'test@example.com' };

      const result = isAuthenticated(mockRequest as Request);

      expect(result).toBe(true);
    });

    it('should return false when user is not authenticated', () => {
      mockRequest.user = undefined;

      const result = isAuthenticated(mockRequest as Request);

      expect(result).toBe(false);
    });

    it('should return false when user object exists but has no ID', () => {
      mockRequest.user = { email: 'test@example.com' } as any;

      const result = isAuthenticated(mockRequest as Request);

      expect(result).toBe(false);
    });
  });
});
