import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateRoutineCreate, validateRoutineUpdate } from './validation';

describe('Validation Middleware', () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock request object
    mockRequest = {
      body: {},
      originalUrl: '/api/routines',
    };

    // Mock response object
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    // Mock next function
    mockNext = vi.fn();
  });

  describe('validateRoutineCreate', () => {
    it('should call next() for valid routine data', () => {
      mockRequest.body = {
        name: 'Test Routine',
        category: 'strength',
        difficulty: 'intermediate',
      };

      validateRoutineCreate(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should return 422 for missing name', () => {
      mockRequest.body = {
        category: 'strength',
        difficulty: 'intermediate',
      };

      validateRoutineCreate(mockRequest, mockResponse, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 422,
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'name',
              message: 'Routine name is required',
            }),
          ]),
        })
      );
    });

    it('should return 422 for missing category', () => {
      mockRequest.body = {
        name: 'Test Routine',
        difficulty: 'intermediate',
      };

      validateRoutineCreate(mockRequest, mockResponse, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 422,
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'category',
              message: 'Routine category is required',
            }),
          ]),
        })
      );
    });

    it('should return 422 for invalid category', () => {
      mockRequest.body = {
        name: 'Test Routine',
        category: 'invalid-category',
        difficulty: 'intermediate',
      };

      validateRoutineCreate(mockRequest, mockResponse, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 422,
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'category',
              message:
                'Category must be one of: strength, running, cycling, swimming, other',
            }),
          ]),
        })
      );
    });

    it('should return 422 for missing difficulty', () => {
      mockRequest.body = {
        name: 'Test Routine',
        category: 'strength',
      };

      validateRoutineCreate(mockRequest, mockResponse, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 422,
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'difficulty',
              message: 'Routine difficulty is required',
            }),
          ]),
        })
      );
    });

    it('should return 422 for invalid difficulty', () => {
      mockRequest.body = {
        name: 'Test Routine',
        category: 'strength',
        difficulty: 'invalid-difficulty',
      };

      validateRoutineCreate(mockRequest, mockResponse, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 422,
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'difficulty',
              message:
                'Difficulty must be one of: beginner, intermediate, advanced',
            }),
          ]),
        })
      );
    });

    it('should return 422 with multiple validation errors', () => {
      mockRequest.body = {
        // All fields missing
      };

      validateRoutineCreate(mockRequest, mockResponse, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 422,
          errors: expect.arrayContaining([
            expect.objectContaining({ field: 'name' }),
            expect.objectContaining({ field: 'category' }),
            expect.objectContaining({ field: 'difficulty' }),
          ]),
        })
      );
    });
  });

  describe('validateRoutineUpdate', () => {
    it('should call next() for valid update data', () => {
      mockRequest.body = {
        name: 'Updated Routine',
        difficulty: 'advanced',
      };

      validateRoutineUpdate(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should call next() for empty update data', () => {
      mockRequest.body = {};

      validateRoutineUpdate(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should return 422 for invalid category', () => {
      mockRequest.body = {
        category: 'invalid-category',
      };

      validateRoutineUpdate(mockRequest, mockResponse, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 422,
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'category',
              message:
                'Category must be one of: strength, running, cycling, swimming, other',
            }),
          ]),
        })
      );
    });

    it('should return 422 for invalid difficulty', () => {
      mockRequest.body = {
        difficulty: 'invalid-difficulty',
      };

      validateRoutineUpdate(mockRequest, mockResponse, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 422,
          errors: expect.arrayContaining([
            expect.objectContaining({
              field: 'difficulty',
              message:
                'Difficulty must be one of: beginner, intermediate, advanced',
            }),
          ]),
        })
      );
    });

    it('should return 422 with multiple validation errors', () => {
      mockRequest.body = {
        category: 'invalid-category',
        difficulty: 'invalid-difficulty',
      };

      validateRoutineUpdate(mockRequest, mockResponse, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 422,
          errors: expect.arrayContaining([
            expect.objectContaining({ field: 'category' }),
            expect.objectContaining({ field: 'difficulty' }),
          ]),
        })
      );
    });
  });
});
