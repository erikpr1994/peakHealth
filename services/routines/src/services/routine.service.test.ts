import { describe, it, expect, vi, beforeEach } from 'vitest';
import { routineService } from './routine.service';
import UserCreatedRoutineModel from '../domain/models/user-created-routine';
import { Types } from 'mongoose';
import { ApiError } from '../utils/error-handler';

// Mock the mongoose model
vi.mock('../domain/models/user-created-routine', () => {
  const mockModel = vi.fn() as any;
  mockModel.find = vi.fn();
  mockModel.findOne = vi.fn();
  mockModel.deleteOne = vi.fn();
  return {
    default: mockModel,
  };
});

describe('RoutineService', () => {
  const userId = 'user123';
  const routineId = '507f1f77bcf86cd799439011';
  const mockObjectId = new Types.ObjectId(routineId);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createRoutine', () => {
    it('should create a routine successfully', async () => {
      const routineData = {
        name: 'Test Routine',
        category: 'strength',
        difficulty: 'intermediate',
      };

      const mockSave = vi.fn().mockResolvedValue(true);
      const mockRoutine = {
        ...routineData,
        userId,
        save: mockSave,
      };

      // Mock the UserCreatedRoutineModel constructor
      (UserCreatedRoutineModel as any).mockImplementation(() => ({
        ...mockRoutine,
        save: mockSave,
      }));

      const result = await routineService.createRoutine(userId, routineData);

      expect(result).toEqual({
        ...mockRoutine,
        save: mockSave,
      });
      expect(mockSave).toHaveBeenCalled();
    });

    it('should handle validation errors', async () => {
      const routineData = {
        // Missing required fields
      };

      const validationError = new Error('Validation failed');
      validationError.name = 'ValidationError';
      (validationError as any).errors = {
        name: { message: 'Name is required' },
        category: { message: 'Category is required' },
      };

      // Mock the UserCreatedRoutineModel constructor to throw validation error
      (UserCreatedRoutineModel as any).mockImplementation(() => ({
        save: vi.fn().mockRejectedValue(validationError),
      }));

      await expect(
        routineService.createRoutine(userId, routineData)
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getRoutines', () => {
    it('should get all routines for a user', async () => {
      const mockRoutines = [
        { _id: 'routine1', name: 'Routine 1', userId },
        { _id: 'routine2', name: 'Routine 2', userId },
      ];

      (UserCreatedRoutineModel.find as any).mockResolvedValue(mockRoutines);

      const result = await routineService.getRoutines(userId);

      expect(result).toEqual(mockRoutines);
      expect(UserCreatedRoutineModel.find).toHaveBeenCalledWith({ userId });
    });

    it('should filter routines by type', async () => {
      const mockRoutines = [{ _id: 'routine1', name: 'Routine 1', userId }];

      (UserCreatedRoutineModel.find as any).mockResolvedValue(mockRoutines);

      const result = await routineService.getRoutines(userId, 'user');

      expect(result).toEqual(mockRoutines);
      expect(UserCreatedRoutineModel.find).toHaveBeenCalledWith({ userId });
    });
  });

  describe('getRoutineById', () => {
    it('should get a routine by ID', async () => {
      const mockRoutine = {
        _id: mockObjectId,
        name: 'Test Routine',
        userId,
      };

      (UserCreatedRoutineModel.findOne as any).mockResolvedValue(mockRoutine);

      const result = await routineService.getRoutineById(routineId, userId);

      expect(result).toEqual(mockRoutine);
      expect(UserCreatedRoutineModel.findOne).toHaveBeenCalledWith({
        _id: expect.any(Types.ObjectId),
      });
    });

    it('should throw an error if routine not found', async () => {
      (UserCreatedRoutineModel.findOne as any).mockResolvedValue(null);

      await expect(
        routineService.getRoutineById(routineId, userId)
      ).rejects.toThrow(new ApiError('Routine not found', 404));
    });

    it('should throw an error if user is not authorized', async () => {
      const mockRoutine = {
        _id: mockObjectId,
        name: 'Test Routine',
        userId: 'different-user',
      };

      (UserCreatedRoutineModel.findOne as any).mockResolvedValue(mockRoutine);

      await expect(
        routineService.getRoutineById(routineId, userId)
      ).rejects.toThrow(new ApiError('Unauthorized access to routine', 403));
    });

    it('should handle invalid ID format', async () => {
      // Mock Types.ObjectId to throw an error for invalid ID
      const originalObjectId = Types.ObjectId;
      const castError = new Error('Cast error');
      castError.name = 'CastError';

      Types.ObjectId = vi.fn().mockImplementation(() => {
        throw castError;
      }) as any;

      await expect(
        routineService.getRoutineById('invalid-id', userId)
      ).rejects.toThrow(ApiError);

      // Restore original ObjectId
      Types.ObjectId = originalObjectId;
    });
  });

  describe('updateRoutine', () => {
    it('should update a routine successfully', async () => {
      const updateData = {
        name: 'Updated Routine',
        difficulty: 'advanced',
      };

      const mockSave = vi.fn().mockResolvedValue(true);
      const mockRoutine = {
        _id: mockObjectId,
        name: 'Test Routine',
        userId,
        save: mockSave,
      };

      (UserCreatedRoutineModel.findOne as any).mockResolvedValue(mockRoutine);

      const result = await routineService.updateRoutine(
        routineId,
        userId,
        updateData
      );

      expect(result).toEqual({
        ...mockRoutine,
        name: 'Updated Routine',
        difficulty: 'advanced',
        updatedAt: expect.any(Date),
      });
      expect(mockSave).toHaveBeenCalled();
    });

    it('should throw an error if routine not found', async () => {
      (UserCreatedRoutineModel.findOne as any).mockResolvedValue(null);

      await expect(
        routineService.updateRoutine(routineId, userId, {})
      ).rejects.toThrow(new ApiError('Routine not found', 404));
    });

    it('should throw an error if user is not authorized', async () => {
      const mockRoutine = {
        _id: mockObjectId,
        name: 'Test Routine',
        userId: 'different-user',
      };

      (UserCreatedRoutineModel.findOne as any).mockResolvedValue(mockRoutine);

      await expect(
        routineService.updateRoutine(routineId, userId, {})
      ).rejects.toThrow(new ApiError('Unauthorized access to routine', 403));
    });
  });

  describe('deleteRoutine', () => {
    it('should delete a routine successfully', async () => {
      const mockRoutine = {
        _id: mockObjectId,
        name: 'Test Routine',
        userId,
      };

      (UserCreatedRoutineModel.findOne as any).mockResolvedValue(mockRoutine);
      (UserCreatedRoutineModel.deleteOne as any).mockResolvedValue({
        deletedCount: 1,
      });

      const result = await routineService.deleteRoutine(routineId, userId);

      expect(result).toBe(true);
      expect(UserCreatedRoutineModel.deleteOne).toHaveBeenCalledWith({
        _id: expect.any(Types.ObjectId),
      });
    });

    it('should throw an error if routine not found', async () => {
      (UserCreatedRoutineModel.findOne as any).mockResolvedValue(null);

      await expect(
        routineService.deleteRoutine(routineId, userId)
      ).rejects.toThrow(new ApiError('Routine not found', 404));
      expect(UserCreatedRoutineModel.deleteOne).not.toHaveBeenCalled();
    });

    it('should throw an error if user is not authorized', async () => {
      const mockRoutine = {
        _id: mockObjectId,
        name: 'Test Routine',
        userId: 'different-user',
      };

      (UserCreatedRoutineModel.findOne as any).mockResolvedValue(mockRoutine);

      await expect(
        routineService.deleteRoutine(routineId, userId)
      ).rejects.toThrow(new ApiError('Unauthorized access to routine', 403));
      expect(UserCreatedRoutineModel.deleteOne).not.toHaveBeenCalled();
    });
  });
});
