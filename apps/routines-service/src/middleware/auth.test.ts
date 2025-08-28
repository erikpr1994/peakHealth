import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { verifySupabaseJWT, requireAuth, requireRole } from './auth.js';

// Mock jsonwebtoken
vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(),
  },
}));

describe('Authentication Middleware', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: any;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    mockNext = vi.fn();
    vi.clearAllMocks();
  });

  describe('verifySupabaseJWT', () => {
    it('should verify valid JWT token and attach user to request', async () => {
      const mockToken = 'valid.jwt.token';
      const mockDecoded = {
        sub: 'user123',
        email: 'test@example.com',
        role: 'user',
        aud: 'authenticated',
        exp: Date.now() / 1000 + 3600, // 1 hour from now
        iat: Date.now() / 1000,
      };

      mockReq.headers.authorization = `Bearer ${mockToken}`;
      (jwt.verify as any).mockReturnValue(mockDecoded);

      await verifySupabaseJWT(mockReq, mockRes, mockNext);

      expect(jwt.verify).toHaveBeenCalledWith(
        mockToken,
        process.env.SUPABASE_JWT_SECRET || ''
      );
      expect(mockReq.user).toEqual({
        id: 'user123',
        email: 'test@example.com',
        role: 'user',
      });
      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 401 for missing authorization header', async () => {
      await verifySupabaseJWT(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header',
        service: 'routines-service',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 for invalid authorization header format', async () => {
      mockReq.headers.authorization = 'InvalidFormat token';

      await verifySupabaseJWT(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header',
        service: 'routines-service',
      });
    });

    it('should return 401 for expired token', async () => {
      const mockToken = 'expired.jwt.token';
      const mockDecoded = {
        sub: 'user123',
        email: 'test@example.com',
        exp: Date.now() / 1000 - 3600, // 1 hour ago
      };

      mockReq.headers.authorization = `Bearer ${mockToken}`;
      (jwt.verify as any).mockReturnValue(mockDecoded);

      await verifySupabaseJWT(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Token has expired',
        service: 'routines-service',
      });
    });

    it('should return 401 for invalid token', async () => {
      const mockToken = 'invalid.jwt.token';
      mockReq.headers.authorization = `Bearer ${mockToken}`;
      (jwt.verify as any).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await verifySupabaseJWT(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Invalid token',
        service: 'routines-service',
      });
    });
  });

  describe('requireAuth', () => {
    it('should call next when user is authenticated', () => {
      mockReq.user = { id: 'user123', email: 'test@example.com' };

      requireAuth(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 401 when user is not authenticated', () => {
      requireAuth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Authentication required',
        service: 'routines-service',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('requireRole', () => {
    it('should call next when user has required role', () => {
      mockReq.user = { id: 'user123', role: 'trainer' };
      const middleware = requireRole('trainer');

      middleware(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should call next when user is admin', () => {
      mockReq.user = { id: 'user123', role: 'admin' };
      const middleware = requireRole('trainer');

      middleware(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 403 when user does not have required role', () => {
      mockReq.user = { id: 'user123', role: 'user' };
      const middleware = requireRole('trainer');

      middleware(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Forbidden',
        message: "Role 'trainer' required",
        service: 'routines-service',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 when user is not authenticated', () => {
      const middleware = requireRole('trainer');

      middleware(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Authentication required',
        service: 'routines-service',
      });
    });
  });
});
