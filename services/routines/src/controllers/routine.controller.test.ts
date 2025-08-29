import { Request, Response, NextFunction } from 'express';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { routineController } from './routine.controller';
import { routineService } from '../services/routine.service';
import { ApiError } from '../utils/error-handler';

// Mock the routine service
vi.mock('../services/routine.service', () => ({
  routineService: {
    getRoutinesByUser: vi.fn(),
  },
}));

describe('RoutineController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockRequest = {
      user: { id: 'user123' },
      query: {},
    };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    mockNext = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
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
        'user123',
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
        'user123',
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
        'user123',
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
});

