import { describe, it, expect, afterEach, vi } from 'vitest';
import { routineService } from './routine.service';
import UserCreatedRoutineModel from '../domain/models/user-created-routine';
import { ApiError } from '../utils/error-handler';

// Mock the UserCreatedRoutineModel
vi.mock('../domain/models/user-created-routine', () => {
  return {
    default: {
      find: vi.fn(),
      findOne: vi.fn(),
      countDocuments: vi.fn(),
      deleteOne: vi.fn(),
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
});

