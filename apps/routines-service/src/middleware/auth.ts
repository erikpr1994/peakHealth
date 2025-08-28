import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface JWTPayload {
  sub: string;
  email: string;
  role?: string;
  aud: string;
  exp: number;
  iat: number;
}

export async function verifySupabaseJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header',
        service: 'routines-service',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the JWT token
    const decoded = jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET || ''
    ) as JWTPayload;

    // Check if token is expired
    if (decoded.exp < Date.now() / 1000) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Token has expired',
        service: 'routines-service',
      });
      return;
    }

    // Attach user information to request
    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role || 'user',
    };

    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('JWT verification failed:', error);
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token',
      service: 'routines-service',
    });
  }
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required',
      service: 'routines-service',
    });
    return;
  }
  next();
}

export function requireRole(role: string) {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required',
        service: 'routines-service',
      });
      return;
    }

    if (req.user.role !== role && req.user.role !== 'admin') {
      res.status(403).json({
        error: 'Forbidden',
        message: `Role '${role}' required`,
        service: 'routines-service',
      });
      return;
    }

    next();
  };
}
