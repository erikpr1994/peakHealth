import { rateLimit } from 'express-rate-limit';
import { Request } from 'express';
import { createApiError } from '../utils/error-handler';

// Helper to check if we're in test environment
const isTestEnvironment = () => {
  return process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';
};

/**
 * Global rate limiter for all requests
 * Applied to protect against general abuse
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000, // Limit each IP to 1000 requests per windowMs
  standardHeaders: 'draft-8', // Use draft-8 standard headers
  legacyHeaders: false, // Disable legacy X-RateLimit-* headers
  // Disable validation warnings in tests
  validate: isTestEnvironment() ? false : true,
  message: {
    type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
    title: 'Rate Limit Exceeded',
    status: 429,
    detail: 'Too many requests from this IP, please try again later.',
  },
  handler: (req, res, next, options) => {
    const errorResponse = {
      type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
      title: 'Rate Limit Exceeded',
      status: 429,
      detail: 'Too many requests from this IP, please try again later.',
      instance: req.originalUrl,
      retryAfter: Math.round(options.windowMs / 1000),
    };
    res.status(429).json(errorResponse);
  },
  skip: req => {
    // Skip rate limiting for health checks
    return req.path === '/health';
  },
});

/**
 * Strict rate limiter for authentication and sensitive endpoints
 * Applied to prevent brute force attacks
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  validate: isTestEnvironment() ? false : true,
  message: {
    type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
    title: 'Authentication Rate Limit Exceeded',
    status: 429,
    detail: 'Too many authentication attempts, please try again later.',
  },
  handler: (req, res, next, options) => {
    const errorResponse = {
      type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
      title: 'Authentication Rate Limit Exceeded',
      status: 429,
      detail: 'Too many authentication attempts, please try again later.',
      instance: req.originalUrl,
      retryAfter: Math.round(options.windowMs / 1000),
    };
    res.status(429).json(errorResponse);
  },
});

/**
 * API rate limiter for general API endpoints
 * Moderate protection for standard API usage
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  validate: isTestEnvironment() ? false : true,
  message: {
    type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
    title: 'API Rate Limit Exceeded',
    status: 429,
    detail: 'Too many API requests from this IP, please try again later.',
  },
  handler: (req, res, next, options) => {
    const errorResponse = {
      type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
      title: 'API Rate Limit Exceeded',
      status: 429,
      detail: 'Too many API requests from this IP, please try again later.',
      instance: req.originalUrl,
      retryAfter: Math.round(options.windowMs / 1000),
    };
    res.status(429).json(errorResponse);
  },
});

/**
 * Resource-specific rate limiter for CRUD operations
 * Applied to resource endpoints like routines, workouts, etc.
 */
export const resourceLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  validate: isTestEnvironment() ? false : true,
  message: {
    type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
    title: 'Resource Rate Limit Exceeded',
    status: 429,
    detail: 'Too many requests for this resource, please try again later.',
  },
  handler: (req, res, next, options) => {
    const errorResponse = {
      type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
      title: 'Resource Rate Limit Exceeded',
      status: 429,
      detail: 'Too many requests for this resource, please try again later.',
      instance: req.originalUrl,
      retryAfter: Math.round(options.windowMs / 1000),
    };
    res.status(429).json(errorResponse);
  },
});

/**
 * Premium rate limiter with higher limits for authenticated premium users
 * Can be used conditionally based on user subscription status
 */
export const premiumLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  validate: isTestEnvironment() ? false : true,
  limit: async req => {
    // Dynamic limit based on user status
    // Check if user is premium (this would need to be implemented based on user data)
    const isPremium =
      req.user?.role === 'premium' || req.user?.role === 'admin';
    return isPremium ? 1000 : 500;
  },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: async (req: Request) => {
    const isPremium =
      req.user?.role === 'premium' || req.user?.role === 'admin';
    const limit = isPremium ? 1000 : 500;
    return {
      type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
      title: 'Rate Limit Exceeded',
      status: 429,
      detail: `You have exceeded your ${limit} requests per 15 minutes limit.`,
    };
  },
  handler: async (req: Request, res: any, next: any, options: any) => {
    const isPremium =
      req.user?.role === 'premium' || req.user?.role === 'admin';
    const limit = isPremium ? 1000 : 500;

    const errorResponse = {
      type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
      title: 'Rate Limit Exceeded',
      status: 429,
      detail: `You have exceeded your ${limit} requests per 15 minutes limit.`,
      instance: req.originalUrl,
      retryAfter: Math.round(options.windowMs / 1000),
    };
    res.status(429).json(errorResponse);
  },
  keyGenerator: (req: Request) => {
    // Use user ID if authenticated, otherwise fall back to IP with IPv6 handling
    if (req.user?.id) {
      return req.user.id;
    }
    // Handle IPv6 addresses properly by removing port if present
    return req.ip?.replace(/:\d+[^:]*$/, '') || req.ip || 'unknown';
  },
});

/**
 * Create a custom rate limiter with specific configuration
 * Useful for specific endpoints that need custom limits
 */
export const createCustomLimiter = (options: {
  windowMs?: number;
  limit: number;
  message?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000,
    limit: options.limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    validate: isTestEnvironment() ? false : true,
    skipSuccessfulRequests: options.skipSuccessfulRequests || false,
    skipFailedRequests: options.skipFailedRequests || false,
    message: {
      type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
      title: 'Rate Limit Exceeded',
      status: 429,
      detail: options.message || 'Too many requests, please try again later.',
    },
    handler: (req, res, next, rateLimitOptions) => {
      const errorResponse = {
        type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
        title: 'Rate Limit Exceeded',
        status: 429,
        detail: options.message || 'Too many requests, please try again later.',
        instance: req.originalUrl,
        retryAfter: Math.round(rateLimitOptions.windowMs / 1000),
      };
      res.status(429).json(errorResponse);
    },
  });
};
