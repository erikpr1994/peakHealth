import { describe, it, expect, vi, beforeEach } from 'vitest';
import { routineAssignmentService } from './routine-assignment.service';
import { ApiError } from '../utils/error-handler';

// Mock the entire service
vi.mock('./routine-assignment.service', () => ({
  routineAssignmentService: {
    assignRoutine: vi.fn(),
  }
}));

describe('RoutineAssignmentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('assignRoutine', () => {
    const userId = 'user123';
    const routineId = '60d21b4667d0d8992e610c85';
    const mockAssignment = {
      _id: 'assignment123',
      routineVersionId: routineId,
      userId,
      status: 'active',
    };

    it('should assign a routine to a user', async () => {
      // Mock the service method
      vi.mocked(routineAssignmentService.assignRoutine).mockResolvedValue(mockAssignment);
      
      // Call the service
      const result = await routineAssignmentService.assignRoutine(userId, routineId);
      
      // Verify the service was called with the correct parameters
      expect(routineAssignmentService.assignRoutine).toHaveBeenCalledWith(userId, routineId);
      
      // Verify the result
      expect(result).toEqual(mockAssignment);
    });

    it('should throw an error if the routine is not found', async () => {
      // Mock the service method to throw an error
      vi.mocked(routineAssignmentService.assignRoutine).mockRejectedValue(
        new ApiError('Routine not found', 404)
      );
      
      // Verify the error is thrown
      await expect(routineAssignmentService.assignRoutine(userId, routineId))
        .rejects
        .toThrow(expect.objectContaining({
          message: 'Routine not found',
          statusCode: 404
        }));
    });

    it('should handle invalid ObjectId errors', async () => {
      // Mock the service method to throw an error
      vi.mocked(routineAssignmentService.assignRoutine).mockRejectedValue(
        new ApiError('Invalid routine ID format', 400)
      );
      
      // Verify the error is thrown
      await expect(routineAssignmentService.assignRoutine(userId, 'invalid-id'))
        .rejects
        .toThrow(expect.objectContaining({
          message: 'Invalid routine ID format',
          statusCode: 400
        }));
    });
  });
});

