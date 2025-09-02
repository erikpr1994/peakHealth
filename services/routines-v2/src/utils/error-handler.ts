import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

/**
 * Custom API Error class with status code and optional validation errors
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Array<{ field: string; message: string }>;

  constructor(
    message: string,
    statusCode: number = 500,
    errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'ApiError';

    // Ensure the stack trace points to this error
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * RFC 9457 compliant error types mapping
 */
const ERROR_TYPES: Record<number, string> = {
  400: 'https://api.peakhealth.com/errors/bad-request',
  401: 'https://api.peakhealth.com/errors/unauthorized',
  403: 'https://api.peakhealth.com/errors/forbidden',
  404: 'https://api.peakhealth.com/errors/not-found',
  409: 'https://api.peakhealth.com/errors/conflict',
  422: 'https://api.peakhealth.com/errors/validation-error',
  429: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
  500: 'https://api.peakhealth.com/errors/server-error',
  502: 'https://api.peakhealth.com/errors/bad-gateway',
  503: 'https://api.peakhealth.com/errors/service-unavailable',
};

/**
 * Error titles mapping
 */
const ERROR_TITLES: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Validation Error',
  429: 'Rate Limit Exceeded',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

/**
 * Global error handler middleware
 * Handles all errors and returns RFC 9457 compliant error responses
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Use logger for error logging
  const statusCode = (err as ApiError).statusCode || 500;
  if (statusCode >= 500) {
    logger.error('Server error:', {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      statusCode,
    });
  } else {
    logger.debug('Error:', {
      message: err.message,
      url: req.originalUrl,
      method: req.method,
      statusCode,
    });
  }

  // Create RFC 9457 compliant error response
  const errorResponse: any = {
    type: ERROR_TYPES[statusCode] || ERROR_TYPES[500],
    title: ERROR_TITLES[statusCode] || ERROR_TITLES[500],
    status: statusCode,
    detail: err.message || 'An unexpected error occurred',
    instance: req.originalUrl,
  };

  // Add validation errors if present
  if ((err as ApiError).errors) {
    errorResponse.errors = (err as ApiError).errors;
  }

  // Add additional debugging info in development
  if (process.env.NODE_ENV === 'development' && statusCode >= 500) {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

/**
 * 404 Not Found handler middleware
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  const errorResponse = {
    type: ERROR_TYPES[404],
    title: ERROR_TITLES[404],
    status: 404,
    detail: `The requested resource '${req.originalUrl}' was not found`,
    instance: req.originalUrl,
  };

  res.status(404).json(errorResponse);
};

/**
 * Async route handler wrapper to catch errors
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Create common API errors
 */
export const createApiError = {
  badRequest: (message: string = 'Bad Request') => new ApiError(message, 400),
  unauthorized: (message: string = 'Unauthorized') =>
    new ApiError(message, 401),
  forbidden: (message: string = 'Forbidden') => new ApiError(message, 403),
  notFound: (message: string = 'Not Found') => new ApiError(message, 404),
  conflict: (message: string = 'Conflict') => new ApiError(message, 409),
  validation: (
    message: string = 'Validation Error',
    errors?: Array<{ field: string; message: string }>
  ) => new ApiError(message, 422, errors),
  rateLimit: (message: string = 'Rate Limit Exceeded') =>
    new ApiError(message, 429),
  serverError: (message: string = 'Internal Server Error') =>
    new ApiError(message, 500),
};
