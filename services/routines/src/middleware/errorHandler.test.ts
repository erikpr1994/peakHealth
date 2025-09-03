import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';
import { errorHandler, createError } from './errorHandler';

// Mock Express Request and Response
const createMockRequest = (): Partial<Request> => ({
  path: '/test-endpoint',
});

const createMockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('Error Handler Middleware', () => {
  describe('errorHandler', () => {
    it('should handle errors with status code', () => {
      const req = createMockRequest() as Request;
      const res = createMockResponse() as Response;
      const next = vi.fn();

      const error = createError('Test error', 400);

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        type: 'https://api.peakhealth.com/errors/400',
        title: 'Bad Request',
        status: 400,
        detail: 'Test error',
        instance: '/test-endpoint',
      });
    });

    it('should handle errors without status code', () => {
      const req = createMockRequest() as Request;
      const res = createMockResponse() as Response;
      const next = vi.fn();

      const error = new Error('Generic error');

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        type: 'https://api.peakhealth.com/errors/500',
        title: 'Internal Server Error',
        status: 500,
        detail: 'Generic error',
        instance: '/test-endpoint',
      });
    });

    it('should handle production environment errors', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const req = createMockRequest() as Request;
      const res = createMockResponse() as Response;
      const next = vi.fn();

      const error = createError('Sensitive error details', 500);

      errorHandler(error, req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        type: 'https://api.peakhealth.com/errors/500',
        title: 'Internal Server Error',
        status: 500,
        detail: 'An error occurred',
        instance: '/test-endpoint',
      });

      // Restore environment
      process.env.NODE_ENV = originalEnv;
    });

    it('should handle different error status codes correctly', () => {
      const req = createMockRequest() as Request;
      const res = createMockResponse() as Response;
      const next = vi.fn();

      const statusCodes = [400, 401, 403, 404, 422, 429, 500, 503];
      const expectedTitles = [
        'Bad Request',
        'Unauthorized',
        'Forbidden',
        'Not Found',
        'Validation Error',
        'Rate Limit Exceeded',
        'Internal Server Error',
        'Service Unavailable',
      ];

      statusCodes.forEach((statusCode, index) => {
        const error = createError(`Error ${statusCode}`, statusCode);

        // Reset mock
        vi.clearAllMocks();

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(statusCode);
        expect(res.json).toHaveBeenCalledWith({
          type: `https://api.peakhealth.com/errors/${statusCode}`,
          title: expectedTitles[index],
          status: statusCode,
          detail: `Error ${statusCode}`,
          instance: '/test-endpoint',
        });
      });
    });
  });

  describe('createError', () => {
    it('should create an error with default status code', () => {
      const error = createError('Test error');

      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
    });

    it('should create an error with custom status code', () => {
      const error = createError('Not found', 404);

      expect(error.message).toBe('Not found');
      expect(error.statusCode).toBe(404);
      expect(error.isOperational).toBe(true);
    });

    it('should create an AppError instance', () => {
      const error = createError('Test error', 400);

      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('statusCode', 400);
      expect(error).toHaveProperty('isOperational', true);
    });
  });
});
