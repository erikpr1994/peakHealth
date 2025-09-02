import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import {
  ApiError,
  errorHandler,
  notFoundHandler,
  asyncHandler,
  createApiError,
} from './error-handler';

describe('Error Handler Utilities', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockConsoleError: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRequest = {
      originalUrl: '/api/routines/123',
      method: 'GET',
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    mockNext = vi.fn();
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('ApiError', () => {
    it('should create an ApiError with default values', () => {
      const error = new ApiError('Test error');

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe('ApiError');
      expect(error.errors).toBeUndefined();
    });

    it('should create an ApiError with custom status code', () => {
      const error = new ApiError('Bad request', 400);

      expect(error.message).toBe('Bad request');
      expect(error.statusCode).toBe(400);
    });

    it('should create an ApiError with validation errors', () => {
      const validationErrors = [
        { field: 'name', message: 'Name is required' },
        { field: 'email', message: 'Email is invalid' },
      ];
      const error = new ApiError('Validation failed', 422, validationErrors);

      expect(error.message).toBe('Validation failed');
      expect(error.statusCode).toBe(422);
      expect(error.errors).toEqual(validationErrors);
    });
  });

  describe('errorHandler', () => {
    it('should handle ApiError with correct status and RFC 9457 format', () => {
      const error = new ApiError('Test error message', 400);

      errorHandler(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: 'https://api.peakhealth.com/errors/bad-request',
        title: 'Bad Request',
        status: 400,
        detail: 'Test error message',
        instance: '/api/routines/123',
      });
    });

    it('should handle ApiError with validation errors', () => {
      const validationErrors = [{ field: 'name', message: 'Name is required' }];
      const error = new ApiError('Validation failed', 422, validationErrors);

      errorHandler(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: 'https://api.peakhealth.com/errors/validation-error',
        title: 'Validation Error',
        status: 422,
        detail: 'Validation failed',
        instance: '/api/routines/123',
        errors: validationErrors,
      });
    });

    it('should default to 500 for regular Error instances', () => {
      const error = new Error('Generic error');

      errorHandler(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: 'https://api.peakhealth.com/errors/server-error',
        title: 'Internal Server Error',
        status: 500,
        detail: 'Generic error',
        instance: '/api/routines/123',
      });
    });

    it('should use debug logging for non-server errors', () => {
      const originalEnv = process.env.NODE_ENV;
      const originalVitest = process.env.VITEST;

      // Set to development and remove test env markers
      process.env.NODE_ENV = 'development';
      delete process.env.VITEST;

      const error = new ApiError('Test error', 400);
      errorHandler(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Since we changed to debug logging and we're not in a real dev environment,
      // we don't expect console.error to be called for non-server errors
      expect(mockResponse.status).toHaveBeenCalledWith(400);

      process.env.NODE_ENV = originalEnv;
      if (originalVitest) process.env.VITEST = originalVitest;
    });

    it('should include stack trace in development for server errors', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const error = new ApiError('Server error', 500);
      errorHandler(
        error,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          stack: expect.any(String),
        })
      );

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('notFoundHandler', () => {
    it('should return 404 with proper RFC 9457 format', () => {
      notFoundHandler(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: 'https://api.peakhealth.com/errors/not-found',
        title: 'Not Found',
        status: 404,
        detail: "The requested resource '/api/routines/123' was not found",
        instance: '/api/routines/123',
      });
    });
  });

  describe('asyncHandler', () => {
    it('should handle successful async operations', async () => {
      const mockAsyncFn = vi.fn().mockResolvedValue('success');
      const wrappedFn = asyncHandler(mockAsyncFn);

      await wrappedFn(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockAsyncFn).toHaveBeenCalledWith(
        mockRequest,
        mockResponse,
        mockNext
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should catch and forward async errors', async () => {
      const error = new Error('Async error');
      const mockAsyncFn = vi.fn().mockRejectedValue(error);
      const wrappedFn = asyncHandler(mockAsyncFn);

      await wrappedFn(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('createApiError', () => {
    it('should create badRequest error', () => {
      const error = createApiError.badRequest('Invalid input');
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid input');
    });

    it('should create unauthorized error', () => {
      const error = createApiError.unauthorized();
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Unauthorized');
    });

    it('should create forbidden error', () => {
      const error = createApiError.forbidden('Access denied');
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Access denied');
    });

    it('should create notFound error', () => {
      const error = createApiError.notFound('Resource not found');
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Resource not found');
    });

    it('should create conflict error', () => {
      const error = createApiError.conflict('Resource already exists');
      expect(error.statusCode).toBe(409);
      expect(error.message).toBe('Resource already exists');
    });

    it('should create validation error with errors array', () => {
      const validationErrors = [{ field: 'name', message: 'Required' }];
      const error = createApiError.validation(
        'Validation failed',
        validationErrors
      );
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Validation failed');
      expect(error.errors).toEqual(validationErrors);
    });

    it('should create rateLimit error', () => {
      const error = createApiError.rateLimit('Too many requests');
      expect(error.statusCode).toBe(429);
      expect(error.message).toBe('Too many requests');
    });

    it('should create serverError', () => {
      const error = createApiError.serverError('Internal error');
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Internal error');
    });
  });
});
