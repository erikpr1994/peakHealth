import { describe, it, expect, afterEach, vi } from 'vitest';
import { routineService } from './routine.service';
import UserCreatedRoutineModel from '../domain/models/user-created-routine';
import { ApiError } from '../utils/error-handler';
import { Types } from 'mongoose';

// Mock the mongoose model
vi.mock('../domain/models/user-created-routine', () => {
  return {
    default: {
      find: vi.fn(),
      findOne: vi.fn(),
      countDocuments: vi.fn(),
      deleteOne: vi.fn(),
      exists: vi.fn(),
    },
  };
});

describe('RoutineService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getRoutinesByUser', () => {
    it('should return paginated routines for a user', async () => {
      // Mock data
      const userId = 'user123';
      const mockRoutines = [
        { id: 'routine1', name: 'Routine 1' },
        { id: 'routine2', name: 'Routine 2' },
      ];
      const mockTotalItems = 10;

      // Setup mocks
      (UserCreatedRoutineModel.countDocuments as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockTotalItems
      );
      (UserCreatedRoutineModel.find as ReturnType<typeof vi.fn>).mockReturnValue({
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        sort: vi.fn().mockResolvedValue(mockRoutines),
      });

      // Call the service method
      const result = await routineService.getRoutinesByUser(userId);

      // Assertions
      expect(UserCreatedRoutineModel.countDocuments).toHaveBeenCalledWith({
        userId,
      });
      expect(UserCreatedRoutineModel.find).toHaveBeenCalledWith({ userId });
      expect(result).toEqual({
        routines: mockRoutines,
        totalItems: mockTotalItems,
        page: 1,
        limit: 20,
      });
    });

    it('should apply pagination parameters', async () => {
      // Mock data
      const userId = 'user123';
      const page = 2;
      const limit = 5;
      const mockRoutines = [
        { id: 'routine3', name: 'Routine 3' },
        { id: 'routine4', name: 'Routine 4' },
      ];
      const mockTotalItems = 15;

      // Setup mocks
      (UserCreatedRoutineModel.countDocuments as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockTotalItems
      );
      (UserCreatedRoutineModel.find as ReturnType<typeof vi.fn>).mockReturnValue({
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        sort: vi.fn().mockResolvedValue(mockRoutines),
      });

      // Call the service method
      const result = await routineService.getRoutinesByUser(
        userId,
        undefined,
        page,
        limit
      );

      // Assertions
      expect(UserCreatedRoutineModel.find).toHaveBeenCalledWith({ userId });
      expect(result).toEqual({
        routines: mockRoutines,
        totalItems: mockTotalItems,
        page,
        limit,
      });
    });

    it('should apply type filter', async () => {
      // Mock data
      const userId = 'user123';
      const type = 'user';
      const mockRoutines = [{ id: 'routine1', name: 'User Routine' }];
      const mockTotalItems = 1;

      // Setup mocks
      (UserCreatedRoutineModel.countDocuments as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockTotalItems
      );
      (UserCreatedRoutineModel.find as ReturnType<typeof vi.fn>).mockReturnValue({
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        sort: vi.fn().mockResolvedValue(mockRoutines),
      });

      // Call the service method
      const result = await routineService.getRoutinesByUser(userId, type);

      // Assertions
      expect(UserCreatedRoutineModel.find).toHaveBeenCalledWith({ userId });
      expect(result).toEqual({
        routines: mockRoutines,
        totalItems: mockTotalItems,
        page: 1,
        limit: 20,
      });
    });

    it('should handle errors', async () => {
      // Setup mock to throw error
      const error = new Error('Database error');
      (UserCreatedRoutineModel.countDocuments as ReturnType<typeof vi.fn>).mockRejectedValue(
        error
      );

      // Call the service method and expect it to throw
      await expect(routineService.getRoutinesByUser('user123')).rejects.toThrow(
        error
      );
    });
  });

  describe('getRoutineById', () => {
    const routineId = '60d21b4667d0d8992e610c85';
    const userId = 'user123';
    const mockObjectId = { toString: () => routineId } as unknown as Types.ObjectId;

    it('should return a routine if found and user is authorized', async () => {
      const mockRoutine = {
        _id: mockObjectId,
        name: 'Test Routine',
        userId,
      };

      (UserCreatedRoutineModel.findOne as ReturnType<typeof vi.fn>).mockResolvedValue(mockRoutine);

      const result = await routineService.getRoutineById(routineId, userId);

      expect(result).toEqual(mockRoutine);
      expect(UserCreatedRoutineModel.findOne).toHaveBeenCalledWith({
        _id: expect.any(Object),
        userId,
      });
    });

    it('should throw an error if routine not found', async () => {
      // Mock findOne to return null (not found)
      (UserCreatedRoutineModel.findOne as ReturnType<typeof vi.fn>).mockResolvedValue(null);

      // Mock exists to return null (routine doesn't exist at all)
      (UserCreatedRoutineModel.exists as ReturnType<typeof vi.fn>).mockResolvedValue(null);

      await expect(
        routineService.getRoutineById(routineId, userId)
      ).rejects.toThrow(new ApiError('Routine not found', 404));

      expect(UserCreatedRoutineModel.findOne).toHaveBeenCalledWith({
        _id: expect.any(Object),
        userId,
      });
      expect(UserCreatedRoutineModel.exists).toHaveBeenCalledWith({
        _id: expect.any(Object),
      });
    });
  });
});

