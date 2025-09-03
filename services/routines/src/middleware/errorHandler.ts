import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export function errorHandler(
  error: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
): void {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  // Log error for debugging
  console.error(
    `[${new Date().toISOString()}] Error ${statusCode}: ${message}`
  );
  console.error('Stack:', error.stack);

  // Don't leak error details in production
  const errorResponse = {
    type: `https://api.peakhealth.com/errors/${statusCode}`,
    title: getErrorTitle(statusCode),
    status: statusCode,
    detail:
      process.env.NODE_ENV === 'production' ? 'An error occurred' : message,
    instance: req.path,
  };

  res.status(statusCode).json(errorResponse);
}

function getErrorTitle(statusCode: number): string {
  switch (statusCode) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not Found';
    case 422:
      return 'Validation Error';
    case 429:
      return 'Rate Limit Exceeded';
    case 500:
      return 'Internal Server Error';
    case 503:
      return 'Service Unavailable';
    default:
      return 'Error';
  }
}

export function createError(
  message: string,
  statusCode: number = 500
): AppError {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
}
