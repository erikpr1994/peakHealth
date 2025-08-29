import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiError, errorHandler, notFoundHandler } from './error-handler';

describe('Error Handler Utilities', () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockConsoleError: any;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock request object
    mockRequest = {
      originalUrl: '/api/routines/123',
    };

    // Mock response object
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    // Mock console.error
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('ApiError', () => {
    it('should create an ApiError with the correct properties', () => {
      const error = new ApiError('Test error message', 400);

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Test error message');
      expect(error.statusCode).toBe(400);
      expect(error.name).toBe('ApiError');
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
    it('should handle ApiError correctly', () => {
      const error = new ApiError('Test error message', 400);
      errorHandler(error, mockRequest, mockResponse);

      expect(mockConsoleError).toHaveBeenCalledWith('Error:', error);
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
      const validationErrors = [
        { field: 'name', message: 'Name is required' },
        { field: 'email', message: 'Email is invalid' },
      ];
      const error = new ApiError('Validation failed', 422, validationErrors);
      errorHandler(error, mockRequest, mockResponse);

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

    it('should default to 500 for non-ApiError errors', () => {
      const error = new Error('Generic error');
      errorHandler(error, mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: 'https://api.peakhealth.com/errors/server-error',
        title: 'Server Error',
        status: 500,
        detail: 'Generic error',
        instance: '/api/routines/123',
      });
    });
  });

  describe('notFoundHandler', () => {
    it('should return a 404 response', () => {
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: 'https://api.peakhealth.com/errors/not-found',
        title: 'Not Found',
        status: 404,
        detail: 'The requested resource was not found',
        instance: '/api/routines/123',
      });
    });
  });
});
