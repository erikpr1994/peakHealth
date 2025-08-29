import { describe, it, expect, vi, beforeEach } from 'vitest';
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

  // Mock request, response, and next function
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Setup request mock
    req = {
      user: { id: userId },
      body: {},
      params: {},
      query: {},
    };

    // Setup response mock
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      send: vi.fn(),
    };

    // Setup next function mock
    next = vi.fn();
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

      req.body = routineData;
      (routineService.createRoutine as any).mockResolvedValue(createdRoutine);

      // Execute
      await routineController.createRoutine(req, res, next);

      // Assert
      expect(routineService.createRoutine).toHaveBeenCalledWith(
        userId,
        routineData
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdRoutine);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle empty request body', async () => {
      // Setup
      req.body = {};

      // Execute
      await routineController.createRoutine(req, res, next);

      // Assert
      expect(routineService.createRoutine).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    });

    it('should handle missing user ID', async () => {
      // Setup
      req.user = {};
      req.body = { name: 'Test' };

      // Execute
      await routineController.createRoutine(req, res, next);

      // Assert
      expect(routineService.createRoutine).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    });

    it('should handle service errors', async () => {
      // Setup
      const error = new Error('Service error');
      req.body = { name: 'Test' };
      (routineService.createRoutine as any).mockRejectedValue(error);

      // Execute
      await routineController.createRoutine(req, res, next);

      // Assert
      expect(routineService.createRoutine).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getRoutines', () => {
    it('should get all routines for a user', async () => {
      // Setup
      const mockRoutines = [
        { _id: 'routine1', name: 'Routine 1', userId },
        { _id: 'routine2', name: 'Routine 2', userId },
      ];
      (routineService.getRoutinesByUser as any).mockResolvedValue(mockRoutines);

      // Execute
      await routineController.getRoutines(req, res, next);

      // Assert
      expect(routineService.getRoutinesByUser).toHaveBeenCalledWith(
        userId,
        undefined
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ routines: mockRoutines });
      expect(next).not.toHaveBeenCalled();
    });

    it('should filter routines by type', async () => {
      // Setup
      const mockRoutines = [{ _id: 'routine1', name: 'Routine 1', userId }];
      req.query.type = 'user';
      (routineService.getRoutinesByUser as any).mockResolvedValue(mockRoutines);

      // Execute
      await routineController.getRoutines(req, res, next);

      // Assert
      expect(routineService.getRoutinesByUser).toHaveBeenCalledWith(
        userId,
        'user'
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ routines: mockRoutines });
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle missing user ID', async () => {
      // Setup
      req.user = {};

      // Execute
      await routineController.getRoutines(req, res, next);

      // Assert
      expect(routineService.getRoutinesByUser).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
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
      req.params.id = routineId;
      (routineService.getRoutineById as any).mockResolvedValue(mockRoutine);

      // Execute
      await routineController.getRoutineById(req, res, next);

      // Assert
      expect(routineService.getRoutineById).toHaveBeenCalledWith(
        routineId,
        userId
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockRoutine);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle missing routine ID', async () => {
      // Setup
      req.params = {};

      // Execute
      await routineController.getRoutineById(req, res, next);

      // Assert
      expect(routineService.getRoutineById).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    });

    it('should handle missing user ID', async () => {
      // Setup
      req.user = {};
      req.params.id = routineId;

      // Execute
      await routineController.getRoutineById(req, res, next);

      // Assert
      expect(routineService.getRoutineById).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
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
      req.params.id = routineId;
      req.body = updateData;
      (routineService.updateRoutine as any).mockResolvedValue(updatedRoutine);

      // Execute
      await routineController.updateRoutine(req, res, next);

      // Assert
      expect(routineService.updateRoutine).toHaveBeenCalledWith(
        routineId,
        userId,
        updateData
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedRoutine);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle missing routine ID', async () => {
      // Setup
      req.params = {};
      req.body = { name: 'Updated' };

      // Execute
      await routineController.updateRoutine(req, res, next);

      // Assert
      expect(routineService.updateRoutine).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    });

    it('should handle missing user ID', async () => {
      // Setup
      req.user = {};
      req.params.id = routineId;
      req.body = { name: 'Updated' };

      // Execute
      await routineController.updateRoutine(req, res, next);

      // Assert
      expect(routineService.updateRoutine).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    });
  });

  describe('deleteRoutine', () => {
    it('should delete a routine successfully', async () => {
      // Setup
      req.params.id = routineId;
      (routineService.deleteRoutine as any).mockResolvedValue(true);

      // Execute
      await routineController.deleteRoutine(req, res, next);

      // Assert
      expect(routineService.deleteRoutine).toHaveBeenCalledWith(
        routineId,
        userId
      );
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle missing routine ID', async () => {
      // Setup
      req.params = {};

      // Execute
      await routineController.deleteRoutine(req, res, next);

      // Assert
      expect(routineService.deleteRoutine).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    });

    it('should handle missing user ID', async () => {
      // Setup
      req.user = {};
      req.params.id = routineId;

      // Execute
      await routineController.deleteRoutine(req, res, next);

      // Assert
      expect(routineService.deleteRoutine).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    });
  });
});

