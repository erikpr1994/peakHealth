import { describe, it, expect, vi, beforeEach } from 'vitest';
import { routineController } from './routine.controller';
import { routineService } from '../services/routine.service';
import { ApiError } from '../utils/error-handler';

// Mock the routine service
vi.mock('../services/routine.service', () => ({
  routineService: {
    createRoutine: vi.fn(),
    getRoutines: vi.fn(),
    getRoutineById: vi.fn(),
    updateRoutine: vi.fn(),
    deleteRoutine: vi.fn(),
  },
}));

describe('RoutineController', () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock request object
    mockRequest = {
      user: { id: 'user123' },
      body: {
        name: 'Test Routine',
        category: 'strength',
        difficulty: 'intermediate',
      },
      params: { id: 'routine123' },
      query: {},
      originalUrl: '/api/routines',
    };

    // Mock response object
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      send: vi.fn(),
    };

    // Mock next function
    mockNext = vi.fn();
  });

  describe('createRoutine', () => {
    it('should create a routine successfully', async () => {
      const mockRoutine = {
        _id: 'routine123',
        ...mockRequest.body,
        userId: 'user123',
      };
      (routineService.createRoutine as any).mockResolvedValue(mockRoutine);

      await routineController.createRoutine(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(routineService.createRoutine).toHaveBeenCalledWith(
        'user123',
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRoutine);
    });

    it('should handle missing user ID', async () => {
      mockRequest.user = null;

      await routineController.createRoutine(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(routineService.createRoutine).not.toHaveBeenCalled();
    });

    it('should handle empty request body', async () => {
      mockRequest.body = {};

      await routineController.createRoutine(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(routineService.createRoutine).not.toHaveBeenCalled();
    });

    it('should handle service errors', async () => {
      const error = new Error('Service error');
      (routineService.createRoutine as any).mockRejectedValue(error);

      await routineController.createRoutine(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getRoutines', () => {
    it('should get all routines successfully', async () => {
      const mockRoutines = [
        { _id: 'routine1', name: 'Routine 1', userId: 'user123' },
        { _id: 'routine2', name: 'Routine 2', userId: 'user123' },
      ];
      (routineService.getRoutines as any).mockResolvedValue(mockRoutines);

      await routineController.getRoutines(mockRequest, mockResponse, mockNext);

      expect(routineService.getRoutines).toHaveBeenCalledWith(
        'user123',
        undefined
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        routines: mockRoutines,
      });
    });

    it('should handle type filter', async () => {
      mockRequest.query.type = 'user';
      const mockRoutines = [
        { _id: 'routine1', name: 'Routine 1', userId: 'user123' },
      ];
      (routineService.getRoutines as any).mockResolvedValue(mockRoutines);

      await routineController.getRoutines(mockRequest, mockResponse, mockNext);

      expect(routineService.getRoutines).toHaveBeenCalledWith(
        'user123',
        'user'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        routines: mockRoutines,
      });
    });

    it('should handle missing user ID', async () => {
      mockRequest.user = null;

      await routineController.getRoutines(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(routineService.getRoutines).not.toHaveBeenCalled();
    });
  });

  describe('getRoutineById', () => {
    it('should get a routine by ID successfully', async () => {
      const mockRoutine = {
        _id: 'routine123',
        name: 'Test Routine',
        userId: 'user123',
      };
      (routineService.getRoutineById as any).mockResolvedValue(mockRoutine);

      await routineController.getRoutineById(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(routineService.getRoutineById).toHaveBeenCalledWith(
        'routine123',
        'user123'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRoutine);
    });

    it('should handle missing routine ID', async () => {
      mockRequest.params = {};

      await routineController.getRoutineById(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(routineService.getRoutineById).not.toHaveBeenCalled();
    });

    it('should handle missing user ID', async () => {
      mockRequest.user = null;

      await routineController.getRoutineById(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(routineService.getRoutineById).not.toHaveBeenCalled();
    });
  });

  describe('updateRoutine', () => {
    it('should update a routine successfully', async () => {
      const mockRoutine = {
        _id: 'routine123',
        name: 'Updated Routine',
        userId: 'user123',
      };
      (routineService.updateRoutine as any).mockResolvedValue(mockRoutine);

      await routineController.updateRoutine(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(routineService.updateRoutine).toHaveBeenCalledWith(
        'routine123',
        'user123',
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRoutine);
    });

    it('should handle missing routine ID', async () => {
      mockRequest.params = {};

      await routineController.updateRoutine(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(routineService.updateRoutine).not.toHaveBeenCalled();
    });

    it('should handle empty request body', async () => {
      mockRequest.body = {};

      await routineController.updateRoutine(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(routineService.updateRoutine).not.toHaveBeenCalled();
    });

    it('should handle missing user ID', async () => {
      mockRequest.user = null;

      await routineController.updateRoutine(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(routineService.updateRoutine).not.toHaveBeenCalled();
    });
  });

  describe('deleteRoutine', () => {
    it('should delete a routine successfully', async () => {
      (routineService.deleteRoutine as any).mockResolvedValue(true);

      await routineController.deleteRoutine(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(routineService.deleteRoutine).toHaveBeenCalledWith(
        'routine123',
        'user123'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should handle missing routine ID', async () => {
      mockRequest.params = {};

      await routineController.deleteRoutine(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(routineService.deleteRoutine).not.toHaveBeenCalled();
    });

    it('should handle missing user ID', async () => {
      mockRequest.user = null;

      await routineController.deleteRoutine(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(routineService.deleteRoutine).not.toHaveBeenCalled();
    });
  });
});
