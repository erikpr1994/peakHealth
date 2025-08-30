import { Types } from 'mongoose';
import { RoutineAssignmentModel } from '../domain/models';
import UserCreatedRoutineModel from '../domain/models/user-created-routine';
import { ApiError } from '../utils/error-handler';

export class RoutineAssignmentService {
  /**
   * Assign a routine to a user
   * This creates a new routine assignment and marks any existing active assignments as inactive
   *
   * @param userId The ID of the user to assign the routine to
   * @param routineId The ID of the routine to assign
   * @returns The created routine assignment
   */
  async assignRoutine(userId: string, routineId: string) {
    try {
      // First, check if the routine exists and is accessible to the user
      const routine = await UserCreatedRoutineModel.findOne({
        _id: new Types.ObjectId(routineId),
      });

      if (!routine) {
        throw new ApiError('Routine not found', 404);
      }

      // Check if the user already has an active routine assignment
      const existingActiveAssignment = await RoutineAssignmentModel.findOne({
        userId,
        status: 'active',
      });

      // If there's an existing active assignment, mark it as inactive
      if (existingActiveAssignment) {
        existingActiveAssignment.status = 'completed';
        await existingActiveAssignment.save();
      }

      // Create a new routine assignment
      const routineAssignment = new RoutineAssignmentModel({
        routineVersionId: new Types.ObjectId(routineId),
        parentRoutineId: new Types.ObjectId(routineId), // For user-created routines, these are the same
        userId,
        assignedAt: new Date(),
        startDate: new Date(),
        status: 'active',
        progress: {
          completedWorkouts: 0,
          totalWorkouts: routine.workouts?.length || 0,
        },
      });

      await routineAssignment.save();
      return routineAssignment;
    } catch (error: any) {
      // Handle MongoDB validation errors
      if (error.name === 'ValidationError') {
        const errors = Object.keys(error.errors).map(field => ({
          field,
          message: error.errors[field].message,
        }));
        throw new ApiError('Validation failed', 422, errors);
      }
      // Handle MongoDB cast errors (invalid ObjectId)
      if (error.name === 'CastError') {
        throw new ApiError('Invalid routine ID format', 400);
      }
      throw error;
    }
  }

  /**
   * Get all routine assignments for a user
   *
   * @param userId The ID of the user
   * @param status Optional filter for assignment status
   * @returns Array of routine assignments
   */
  async getRoutineAssignmentsByUser(
    userId: string,
    status?: 'active' | 'completed' | 'paused' | 'cancelled'
  ) {
    try {
      const query: any = { userId };

      if (status) {
        query.status = status;
      }

      const assignments = await RoutineAssignmentModel.find(query).sort({
        assignedAt: -1,
      });

      return assignments;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a single routine assignment by ID
   *
   * @param assignmentId The ID of the assignment to retrieve
   * @param userId The ID of the user (for authorization)
   * @returns The routine assignment if found
   */
  async getRoutineAssignmentById(assignmentId: string, userId: string) {
    try {
      const assignment = await RoutineAssignmentModel.findOne({
        _id: new Types.ObjectId(assignmentId),
        userId,
      });

      if (!assignment) {
        throw new ApiError('Routine assignment not found', 404);
      }

      return assignment;
    } catch (error: any) {
      // Handle MongoDB cast errors (invalid ObjectId)
      if (error.name === 'CastError') {
        throw new ApiError('Invalid assignment ID format', 400);
      }
      throw error;
    }
  }

  /**
   * Update a routine assignment's status
   *
   * @param assignmentId The ID of the assignment to update
   * @param userId The ID of the user (for authorization)
   * @param status The new status for the assignment
   * @returns The updated routine assignment
   */
  async updateRoutineAssignmentStatus(
    assignmentId: string,
    userId: string,
    status: 'active' | 'completed' | 'paused' | 'cancelled'
  ) {
    try {
      const assignment = await RoutineAssignmentModel.findOne({
        _id: new Types.ObjectId(assignmentId),
        userId,
      });

      if (!assignment) {
        throw new ApiError('Routine assignment not found', 404);
      }

      // If setting to active, check if there's another active assignment
      if (status === 'active' && assignment.status !== 'active') {
        const existingActiveAssignment = await RoutineAssignmentModel.findOne({
          userId,
          status: 'active',
          _id: { $ne: new Types.ObjectId(assignmentId) },
        });

        // If there's an existing active assignment, mark it as inactive
        if (existingActiveAssignment) {
          existingActiveAssignment.status = 'completed';
          await existingActiveAssignment.save();
        }
      }

      // Update the assignment status
      assignment.status = status;
      await assignment.save();

      return assignment;
    } catch (error: any) {
      // Handle MongoDB cast errors (invalid ObjectId)
      if (error.name === 'CastError') {
        throw new ApiError('Invalid assignment ID format', 400);
      }
      throw error;
    }
  }
}

// Export a singleton instance
export const routineAssignmentService = new RoutineAssignmentService();
