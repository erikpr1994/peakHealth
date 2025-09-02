import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { createApiError } from '../utils/error-handler';

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        role?: string;
        aud?: string;
        iss?: string;
        sub?: string;
        exp?: number;
        iat?: number;
      };
    }
  }
}

/**
 * Middleware to verify Supabase JWT tokens
 *
 * This middleware extracts the JWT from the Authorization header,
 * verifies it using the SUPABASE_JWT_SECRET environment variable,
 * and attaches the user information to the request object.
 *
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export const verifySupabaseJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Extract Bearer token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createApiError.unauthorized('No valid token provided');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify JWT secret is configured
    const jwtSecret = process.env.SUPABASE_JWT_SECRET;
    if (!jwtSecret) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('SUPABASE_JWT_SECRET environment variable is not set');
      }
      throw createApiError.serverError('Authentication configuration error');
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, jwtSecret, {
      algorithms: ['HS256'], // Supabase typically uses HS256
      clockTolerance: 30, // Allow 30 seconds of clock skew
    }) as any;

    // Extract and validate user information from the token
    if (!decoded.sub) {
      throw createApiError.unauthorized(
        'Token missing required user identifier'
      );
    }

    // Attach user information to request object
    req.user = {
      id: decoded.sub, // Supabase user ID
      email: decoded.email,
      role: decoded.role || 'authenticated',
      aud: decoded.aud,
      iss: decoded.iss,
      sub: decoded.sub,
      exp: decoded.exp,
      iat: decoded.iat,
    };

    next();
  } catch (error) {
    // Handle JWT-specific errors
    if (error instanceof jwt.TokenExpiredError) {
      return next(createApiError.unauthorized('Token has expired'));
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(createApiError.unauthorized('Invalid or malformed token'));
    }

    if (error instanceof jwt.NotBeforeError) {
      return next(createApiError.unauthorized('Token not yet valid'));
    }

    // Handle our custom API errors
    if (error instanceof Error && error.name === 'ApiError') {
      return next(error);
    }

    // Handle any other unexpected errors
    if (process.env.NODE_ENV !== 'test') {
      console.error('JWT verification unexpected error:', error);
    }
    return next(createApiError.serverError('Authentication processing error'));
  }
};

/**
 * Middleware to verify specific user roles
 * Should be used after verifySupabaseJWT
 *
 * @param allowedRoles Array of allowed roles
 */
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(createApiError.unauthorized('Authentication required'));
    }

    const userRole = req.user.role || 'authenticated';

    if (!allowedRoles.includes(userRole)) {
      return next(
        createApiError.forbidden(
          `Access denied. Required roles: ${allowedRoles.join(', ')}`
        )
      );
    }

    next();
  };
};

/**
 * Optional authentication middleware
 * Verifies token if present but doesn't require it
 * Useful for endpoints that work for both authenticated and anonymous users
 */
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  // If no auth header, proceed without authentication
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  // If auth header exists, verify it
  verifySupabaseJWT(req, res, next);
};

/**
 * Middleware to extract user ID from authenticated request
 * Throws error if user is not authenticated
 */
export const getUserId = (req: Request): string => {
  if (!req.user?.id) {
    throw createApiError.unauthorized('User authentication required');
  }
  return req.user.id;
};

/**
 * Middleware to check if user is authenticated
 * Returns boolean instead of throwing error
 */
export const isAuthenticated = (req: Request): boolean => {
  return !!req.user?.id;
};
