import { describe, it, expect, vi, beforeEach } from 'vitest';
import { verifySupabaseJWT } from './auth';
import jwt from 'jsonwebtoken';

// Mock jsonwebtoken
vi.mock('jsonwebtoken', () => ({
  verify: vi.fn(),
}));

describe('verifySupabaseJWT middleware', () => {
  const mockRequest = () => {
    return {
      headers: {
        authorization: 'Bearer test-token',
      },
    };
  };

  const mockResponse = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    process.env.SUPABASE_JWT_SECRET = 'test-secret';
  });

  it('should call next() when token is valid', () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mock successful token verification
    (jwt.verify as any).mockReturnValue({
      sub: 'test-user-id',
      email: 'test@example.com',
    });

    verifySupabaseJWT(req as any, res as any, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith('test-token', 'test-secret');
    expect(req).toHaveProperty('user');
    expect(req.user).toEqual({
      id: 'test-user-id',
      email: 'test@example.com',
      role: 'user',
    });
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 401 when no token is provided', () => {
    const req = { headers: {} };
    const res = mockResponse();

    verifySupabaseJWT(req as any, res as any, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Unauthorized',
      message: 'No valid token provided',
      code: 'auth/missing-token',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 when token is invalid', () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mock token verification failure
    (jwt.verify as any).mockImplementation(() => {
      throw new jwt.JsonWebTokenError('Invalid token');
    });

    verifySupabaseJWT(req as any, res as any, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Unauthorized',
      message: 'Invalid or expired token',
      code: 'auth/invalid-token',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 500 when SUPABASE_JWT_SECRET is not set', () => {
    const req = mockRequest();
    const res = mockResponse();

    // Remove environment variable
    delete process.env.SUPABASE_JWT_SECRET;

    verifySupabaseJWT(req as any, res as any, mockNext);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Internal Server Error',
      message: 'Authentication configuration error',
      code: 'auth/config-error',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
