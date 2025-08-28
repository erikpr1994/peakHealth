import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        role?: string;
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
 */
export const verifySupabaseJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract Bearer token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No valid token provided',
        code: 'auth/missing-token',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the JWT using Supabase secret
    if (!process.env.SUPABASE_JWT_SECRET) {
      console.error('SUPABASE_JWT_SECRET environment variable is not set');
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Authentication configuration error',
        code: 'auth/config-error',
      });
    }

    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET) as any;

    // Extract user information from verified token
    req.user = {
      id: decoded.sub, // Supabase user_id
      email: decoded.email,
      role: decoded.role || 'user',
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired token',
        code: 'auth/invalid-token',
      });
    }

    console.error('JWT verification error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Authentication processing error',
      code: 'auth/processing-error',
    });
  }
};
