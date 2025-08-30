import mongoose from 'mongoose';
import { routineAssignmentService } from './routine-assignment.service';
import { RoutineAssignmentModel } from '../domain/models';
import UserCreatedRoutineModel from '../domain/models/user-created-routine';
import { ApiError } from '../utils/error-handler';

// Mock the mongoose models
jest.mock('../domain/models', () => ({
  RoutineAssignmentModel: {
    findOne: jest.fn(),
    find: jest.fn(),
    prototype: {
      save: jest.fn(),
    },
  },
}));

jest.mock('../domain/models/user-created-routine', () => ({
  findOne: jest.fn(),
}));

describe('RoutineAssignmentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('assignRoutine', () => {
    const userId = 'user123';
    const routineId = '60d21b4667d0d8992e610c85';
    const mockRoutine = {
      _id: new mongoose.Types.ObjectId(routineId),
      name: 'Test Routine',
      workouts: [{ name: 'Workout 1' }, { name: 'Workout 2' }],
    };
    const mockAssignment = {
      _id: new mongoose.Types.ObjectId(),
      routineVersionId: new mongoose.Types.ObjectId(routineId),
      parentRoutineId: new mongoose.Types.ObjectId(routineId),
      userId,
      status: 'active',
      save: jest.fn().mockResolvedValue(true),
    };

    it('should assign a routine to a user', async () => {
      // Mock the findOne method to return a routine
      (UserCreatedRoutineModel.findOne as jest.Mock).mockResolvedValue(
        mockRoutine
      );

      // Mock no existing active assignment
      (RoutineAssignmentModel.findOne as jest.Mock).mockResolvedValue(null);

      // Mock the constructor and save method
      (RoutineAssignmentModel as any).mockImplementation(() => mockAssignment);

      const result = await routineAssignmentService.assignRoutine(
        userId,
        routineId
      );

      // Verify the routine was checked
      expect(UserCreatedRoutineModel.findOne).toHaveBeenCalledWith({
        _id: expect.any(mongoose.Types.ObjectId),
      });

      // Verify existing assignments were checked
      expect(RoutineAssignmentModel.findOne).toHaveBeenCalledWith({
        userId,
        status: 'active',
      });

      // Verify the assignment was saved
      expect(mockAssignment.save).toHaveBeenCalled();

      // Verify the result
      expect(result).toEqual(mockAssignment);
    });

    it('should mark existing active assignments as completed', async () => {
      // Mock the findOne method to return a routine
      (UserCreatedRoutineModel.findOne as jest.Mock).mockResolvedValue(
        mockRoutine
      );

      // Mock an existing active assignment
      const existingAssignment = {
        _id: new mongoose.Types.ObjectId(),
        status: 'active',
        save: jest.fn().mockResolvedValue(true),
      };
      (RoutineAssignmentModel.findOne as jest.Mock).mockResolvedValue(
        existingAssignment
      );

      // Mock the constructor and save method
      (RoutineAssignmentModel as any).mockImplementation(() => mockAssignment);

      const result = await routineAssignmentService.assignRoutine(
        userId,
        routineId
      );

      // Verify the existing assignment was updated
      expect(existingAssignment.status).toBe('completed');
      expect(existingAssignment.save).toHaveBeenCalled();

      // Verify the new assignment was saved
      expect(mockAssignment.save).toHaveBeenCalled();

      // Verify the result
      expect(result).toEqual(mockAssignment);
    });

    it('should throw an error if the routine is not found', async () => {
      // Mock the findOne method to return null (routine not found)
      (UserCreatedRoutineModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        routineAssignmentService.assignRoutine(userId, routineId)
      ).rejects.toThrow(new ApiError('Routine not found', 404));
    });

    it('should handle validation errors', async () => {
      // Mock the findOne method to return a routine
      (UserCreatedRoutineModel.findOne as jest.Mock).mockResolvedValue(
        mockRoutine
      );

      // Mock no existing active assignment
      (RoutineAssignmentModel.findOne as jest.Mock).mockResolvedValue(null);

      // Mock a validation error
      const validationError = new Error('Validation failed');
      validationError.name = 'ValidationError';
      (validationError as any).errors = {
        status: { message: 'Invalid status' },
      };

      // Mock the save method to throw a validation error
      mockAssignment.save.mockRejectedValue(validationError);
      (RoutineAssignmentModel as any).mockImplementation(() => mockAssignment);

      await expect(
        routineAssignmentService.assignRoutine(userId, routineId)
      ).rejects.toThrow(
        new ApiError('Validation failed', 422, [
          { field: 'status', message: 'Invalid status' },
        ])
      );
    });

    it('should handle invalid ObjectId errors', async () => {
      // Mock a CastError (invalid ObjectId)
      const castError = new Error('Invalid ObjectId');
      castError.name = 'CastError';
      (UserCreatedRoutineModel.findOne as jest.Mock).mockRejectedValue(
        castError
      );

      await expect(
        routineAssignmentService.assignRoutine(userId, 'invalid-id')
      ).rejects.toThrow(new ApiError('Invalid routine ID format', 400));
    });
  });
});
