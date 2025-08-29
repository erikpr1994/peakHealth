import { routineService } from './routine.service';
import UserCreatedRoutineModel from '../domain/models/user-created-routine';
import { ApiError } from '../utils/error-handler';

// Mock the UserCreatedRoutineModel
jest.mock('../domain/models/user-created-routine', () => {
  return {
    __esModule: true,
    default: {
      find: jest.fn(),
      findOne: jest.fn(),
      countDocuments: jest.fn(),
      deleteOne: jest.fn(),
    },
  };
});

describe('RoutineService', () => {
  afterEach(() => {
    jest.clearAllMocks();
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
      (UserCreatedRoutineModel.countDocuments as jest.Mock).mockResolvedValue(
        mockTotalItems
      );
      (UserCreatedRoutineModel.find as jest.Mock).mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockRoutines),
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
      (UserCreatedRoutineModel.countDocuments as jest.Mock).mockResolvedValue(
        mockTotalItems
      );
      (UserCreatedRoutineModel.find as jest.Mock).mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockRoutines),
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
      (UserCreatedRoutineModel.countDocuments as jest.Mock).mockResolvedValue(
        mockTotalItems
      );
      (UserCreatedRoutineModel.find as jest.Mock).mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockRoutines),
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
      (UserCreatedRoutineModel.countDocuments as jest.Mock).mockRejectedValue(
        error
      );

      // Call the service method and expect it to throw
      await expect(routineService.getRoutinesByUser('user123')).rejects.toThrow(
        error
      );
    });
  });
});
