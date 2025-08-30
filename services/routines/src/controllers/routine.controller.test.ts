import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/error-handler';

// Mock the services
vi.mock('../services/routine.service', () => ({
  routineService: {
    createRoutine: vi.fn(),
    getRoutines: vi.fn(),
    getRoutineById: vi.fn(),
    updateRoutine: vi.fn(),
    deleteRoutine: vi.fn(),
  }
}));

vi.mock('../services/routine-assignment.service', () => ({
  routineAssignmentService: {
    assignRoutine: vi.fn(),
  }
}));

// Import after mocking
import { routineController } from './routine.controller';
import { routineService } from '../services/routine.service';
import { routineAssignmentService } from '../services/routine-assignment.service';

describe('RoutineController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockRequest = {
      user: { id: 'user123' },
      params: {},
      query: {},
      body: {},
    };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      send: vi.fn(),
    };
    mockNext = vi.fn();
    vi.clearAllMocks();
  });

  describe('assignRoutine', () => {
    const routineId = 'routine123';
    const mockAssignment = {
      _id: 'assignment123',
      routineVersionId: routineId,
      userId: 'user123',
      status: 'active',
    };

    it('should assign a routine to the authenticated user', async () => {
      // Set up the request
      mockRequest.params = { id: routineId };
      
      // Mock the service method
      vi.mocked(routineAssignmentService.assignRoutine).mockResolvedValue(mockAssignment);

      // Call the controller method
      await routineController.assignRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Verify the service was called with the correct parameters
      expect(routineAssignmentService.assignRoutine).toHaveBeenCalledWith(
        'user123',
        routineId
      );

      // Verify the response
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        assignment: mockAssignment,
        message: 'Routine assigned successfully',
      });
    });

    it('should return 401 if user is not authenticated', async () => {
      // Set up the request without a user
      mockRequest.user = undefined;
      mockRequest.params = { id: routineId };

      // Call the controller method
      await routineController.assignRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Verify the next function was called with an error
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Authentication required',
          statusCode: 401,
        })
      );
    });

    it('should return 400 if routine ID is missing', async () => {
      // Set up the request without a routine ID
      mockRequest.params = {};

      // Call the controller method
      await routineController.assignRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Verify the next function was called with an error
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Routine ID is required',
          statusCode: 400,
        })
      );
    });

    it('should handle service errors', async () => {
      // Set up the request
      mockRequest.params = { id: routineId };
      
      // Mock the service method to throw an error
      const error = new ApiError('Routine not found', 404);
      vi.mocked(routineAssignmentService.assignRoutine).mockRejectedValue(error);

      // Call the controller method
      await routineController.assignRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Verify the next function was called with the error
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});

