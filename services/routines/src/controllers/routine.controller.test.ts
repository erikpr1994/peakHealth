import { Request, Response, NextFunction } from 'express';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { routineController } from './routine.controller';
import { routineService } from '../services/routine.service';
import { ApiError } from '../utils/error-handler';

// Mock the routine service
vi.mock('../services/routine.service', () => ({
  routineService: {
    createRoutine: vi.fn(),
    getRoutinesByUser: vi.fn(),
    getRoutineById: vi.fn(),
    updateRoutine: vi.fn(),
    deleteRoutine: vi.fn(),
  },
}));

describe('RoutineController', () => {
  const userId = 'user123';
  const routineId = '507f1f77bcf86cd799439011';

  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockRequest = {
      user: { id: userId },
      body: {},
      params: {},
      query: {},
    };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      send: vi.fn(),
    };
    mockNext = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('createRoutine', () => {
    it('should create a routine successfully', async () => {
      // Setup
      const routineData = {
        name: 'Test Routine',
        category: 'strength',
        difficulty: 'intermediate',
      };
      const createdRoutine = { ...routineData, _id: 'new-id', userId };

      mockRequest.body = routineData;
      (routineService.createRoutine as ReturnType<typeof vi.fn>).mockResolvedValue(createdRoutine);

      // Execute
      await routineController.createRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.createRoutine).toHaveBeenCalledWith(
        userId,
        routineData
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdRoutine);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle empty request body', async () => {
      // Setup
      mockRequest.body = {};

      // Execute
      await routineController.createRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.createRoutine).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    });

    it('should handle missing user ID', async () => {
      // Setup
      mockRequest.user = {};
      mockRequest.body = { name: 'Test' };

      // Execute
      await routineController.createRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.createRoutine).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    });

    it('should handle service errors', async () => {
      // Setup
      const error = new Error('Service error');
      mockRequest.body = { name: 'Test' };
      (routineService.createRoutine as ReturnType<typeof vi.fn>).mockRejectedValue(error);

      // Execute
      await routineController.createRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.createRoutine).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getRoutines', () => {
    it('should return paginated routines for authenticated user', async () => {
      // Mock data
      const mockRoutines = [
        { id: 'routine1', name: 'Routine 1' },
        { id: 'routine2', name: 'Routine 2' },
      ];
      const mockTotalItems = 10;

      // Setup mock return value
      (routineService.getRoutinesByUser as ReturnType<typeof vi.fn>).mockResolvedValue({
        routines: mockRoutines,
        totalItems: mockTotalItems,
        page: 1,
        limit: 20,
      });

      // Call the controller method
      await routineController.getRoutines(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assertions
      expect(routineService.getRoutinesByUser).toHaveBeenCalledWith(
        userId,
        undefined,
        1,
        20
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockRoutines,
        pagination: {
          currentPage: 1,
          pageSize: 20,
          totalItems: mockTotalItems,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      });
    });

    it('should handle pagination parameters', async () => {
      // Setup request with pagination params
      mockRequest.query = { page: '2', limit: '10' };

      // Mock data
      const mockRoutines = [
        { id: 'routine3', name: 'Routine 3' },
        { id: 'routine4', name: 'Routine 4' },
      ];
      const mockTotalItems = 25;

      // Setup mock return value
      (routineService.getRoutinesByUser as ReturnType<typeof vi.fn>).mockResolvedValue({
        routines: mockRoutines,
        totalItems: mockTotalItems,
        page: 2,
        limit: 10,
      });

      // Call the controller method
      await routineController.getRoutines(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assertions
      expect(routineService.getRoutinesByUser).toHaveBeenCalledWith(
        userId,
        undefined,
        2,
        10
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockRoutines,
        pagination: {
          currentPage: 2,
          pageSize: 10,
          totalItems: mockTotalItems,
          totalPages: 3,
          hasNextPage: true,
          hasPrevPage: true,
        },
      });
    });

    it('should handle type filter parameter', async () => {
      // Setup request with type filter
      mockRequest.query = { type: 'user' };

      // Mock data
      const mockRoutines = [{ id: 'routine1', name: 'User Routine' }];
      const mockTotalItems = 1;

      // Setup mock return value
      (routineService.getRoutinesByUser as ReturnType<typeof vi.fn>).mockResolvedValue({
        routines: mockRoutines,
        totalItems: mockTotalItems,
        page: 1,
        limit: 20,
      });

      // Call the controller method
      await routineController.getRoutines(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assertions
      expect(routineService.getRoutinesByUser).toHaveBeenCalledWith(
        userId,
        'user',
        1,
        20
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockRoutines,
        pagination: {
          currentPage: 1,
          pageSize: 20,
          totalItems: mockTotalItems,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      });
    });

    it('should handle unauthenticated request', async () => {
      // Setup request without user
      mockRequest.user = undefined;

      // Call the controller method
      await routineController.getRoutines(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assertions
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Authentication required',
          statusCode: 401,
        })
      );
    });

    it('should handle service errors', async () => {
      // Setup service to throw error
      const error = new Error('Service error');
      (routineService.getRoutinesByUser as ReturnType<typeof vi.fn>).mockRejectedValue(error);

      // Call the controller method
      await routineController.getRoutines(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assertions
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getRoutineById', () => {
    it('should get a routine by ID', async () => {
      // Setup
      const mockRoutine = {
        _id: routineId,
        name: 'Test Routine',
        userId,
      };
      mockRequest.params = { id: routineId };
      (routineService.getRoutineById as ReturnType<typeof vi.fn>).mockResolvedValue(mockRoutine);

      // Execute
      await routineController.getRoutineById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.getRoutineById).toHaveBeenCalledWith(
        routineId,
        userId
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRoutine);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle missing routine ID', async () => {
      // Setup
      mockRequest.params = {};

      // Execute
      await routineController.getRoutineById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.getRoutineById).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    });

    it('should handle missing user ID', async () => {
      // Setup
      mockRequest.user = {};
      mockRequest.params = { id: routineId };

      // Execute
      await routineController.getRoutineById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.getRoutineById).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    });
  });

  describe('updateRoutine', () => {
    it('should update a routine successfully', async () => {
      // Setup
      const updateData = {
        name: 'Updated Routine',
        difficulty: 'advanced',
      };
      const updatedRoutine = {
        _id: routineId,
        ...updateData,
        userId,
      };
      mockRequest.params = { id: routineId };
      mockRequest.body = updateData;
      (routineService.updateRoutine as ReturnType<typeof vi.fn>).mockResolvedValue(updatedRoutine);

      // Execute
      await routineController.updateRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.updateRoutine).toHaveBeenCalledWith(
        routineId,
        userId,
        updateData
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedRoutine);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle missing routine ID', async () => {
      // Setup
      mockRequest.params = {};
      mockRequest.body = { name: 'Updated' };

      // Execute
      await routineController.updateRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.updateRoutine).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    });

    it('should handle missing user ID', async () => {
      // Setup
      mockRequest.user = {};
      mockRequest.params = { id: routineId };
      mockRequest.body = { name: 'Updated' };

      // Execute
      await routineController.updateRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.updateRoutine).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    });
  });

  describe('deleteRoutine', () => {
    it('should delete a routine successfully', async () => {
      // Setup
      mockRequest.params = { id: routineId };
      (routineService.deleteRoutine as ReturnType<typeof vi.fn>).mockResolvedValue(true);

      // Execute
      await routineController.deleteRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.deleteRoutine).toHaveBeenCalledWith(
        routineId,
        userId
      );
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle missing routine ID', async () => {
      // Setup
      mockRequest.params = {};

      // Execute
      await routineController.deleteRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.deleteRoutine).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    });

    it('should handle missing user ID', async () => {
      // Setup
      mockRequest.user = {};
      mockRequest.params = { id: routineId };

      // Execute
      await routineController.deleteRoutine(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(routineService.deleteRoutine).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    });
  });
});

