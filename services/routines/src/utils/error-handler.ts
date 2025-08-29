import { Request, Response } from 'express';

/**
 * Custom error class with status code
 */
export class ApiError extends Error {
  statusCode: number;
  errors?: Array<{ field: string; message: string }>;

  constructor(
    message: string,
    statusCode: number,
    errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'ApiError';
  }
}

/**
 * Error types mapping
 */
const errorTypes: Record<number, string> = {
  400: 'https://api.peakhealth.com/errors/bad-request',
  401: 'https://api.peakhealth.com/errors/unauthorized',
  403: 'https://api.peakhealth.com/errors/forbidden',
  404: 'https://api.peakhealth.com/errors/not-found',
  422: 'https://api.peakhealth.com/errors/validation-error',
  429: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
  500: 'https://api.peakhealth.com/errors/server-error',
};

/**
 * Error titles mapping
 */
const errorTitles: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  422: 'Validation Error',
  429: 'Rate Limit Exceeded',
  500: 'Server Error',
};

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response
) => {
  console.error('Error:', err);

  // Default to 500 if no status code is provided
  const statusCode = (err as ApiError).statusCode || 500;

  // Create RFC 9457-compliant error response
  const errorResponse = {
    type: errorTypes[statusCode] || errorTypes[500],
    title: errorTitles[statusCode] || errorTitles[500],
    status: statusCode,
    detail: err.message || 'An unexpected error occurred',
    instance: req.originalUrl,
  };

  // Add validation errors if present
  if ((err as ApiError).errors) {
    Object.assign(errorResponse, { errors: (err as ApiError).errors });
  }

  return res.status(statusCode).json(errorResponse);
};

/**
 * Not found handler middleware
 */
export const notFoundHandler = (req: Request, res: Response) => {
  return res.status(404).json({
    type: errorTypes[404],
    title: errorTitles[404],
    status: 404,
    detail: 'The requested resource was not found',
    instance: req.originalUrl,
  });
};
