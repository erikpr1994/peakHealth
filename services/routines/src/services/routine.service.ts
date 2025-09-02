import { Types } from 'mongoose';
import UserCreatedRoutineModel from '../domain/models/user-created-routine';
import { ApiError } from '../utils/error-handler';
import {
  getMaxRoutinesPerUser,
  isAdvancedFilteringEnabled,
} from '../features/feature-flags';

export class RoutineService {
  /**
   * Create a new user-created routine
   * @param userId The ID of the user creating the routine
   * @param routineData The routine data to create
   * @returns The created routine
   */
  async createRoutine(userId: string, routineData: any) {
    try {
      // Check if the user has reached their routine limit
      const maxRoutines = getMaxRoutinesPerUser({ userId });
      const userRoutineCount = await UserCreatedRoutineModel.countDocuments({
        userId,
      });

      if (userRoutineCount >= maxRoutines) {
        throw new ApiError(
          `You have reached the maximum limit of ${maxRoutines} routines. Please delete some routines before creating new ones.`,
          403
        );
      }

      // Ensure the userId is set to the authenticated user
      const routineWithUserId = {
        ...routineData,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const routine = new UserCreatedRoutineModel(routineWithUserId);
      await routine.save();
      return routine;
    } catch (error: any) {
      // Handle MongoDB validation errors
      if (error.name === 'ValidationError') {
        const errors = Object.keys(error.errors).map(field => ({
          field,
          message: error.errors[field].message,
        }));
        throw new ApiError('Validation failed', 422, errors);
      }
      throw error;
    }
  }

  /**
   * Get all routines for a user with pagination
   * @param userId The ID of the user
   * @param type Optional filter for routine type
   * @param page Page number (1-based)
   * @param limit Number of items per page
   * @returns Object containing routines array and pagination metadata
   */
  async getRoutinesByUser(
    userId: string,
    type?: 'active' | 'user' | 'assigned',
    page: number = 1,
    limit: number = 20,
    filters?: Record<string, any>
  ) {
    try {
      let query: any = { userId };

      // Apply type-specific filters if provided
      if (type === 'user') {
        // Only user-created routines
        // No additional filter needed as userId already filters for user-created routines
      } else if (type === 'assigned') {
        // Only assigned routines (implementation would depend on how assignments are tracked)
        // This is a placeholder for future implementation
      } else if (type === 'active') {
        // Only active routine (implementation would depend on how active status is tracked)
        // This is a placeholder for future implementation
      }

      // Check if advanced filtering is enabled and apply additional filters
      const advancedFilteringEnabled = isAdvancedFilteringEnabled({ userId });

      if (advancedFilteringEnabled && filters) {
        console.log(
          'Advanced filtering is enabled, applying additional filters'
        );

        // Apply additional filters if they exist
        if (filters.name) {
          query.name = { $regex: filters.name, $options: 'i' }; // Case-insensitive search
        }

        if (filters.difficulty) {
          query.difficulty = filters.difficulty;
        }

        if (
          filters.tags &&
          Array.isArray(filters.tags) &&
          filters.tags.length > 0
        ) {
          query.tags = { $in: filters.tags };
        }

        if (filters.createdAfter) {
          query.createdAt = { $gte: new Date(filters.createdAfter) };
        }

        if (filters.createdBefore) {
          query.createdAt = {
            ...query.createdAt,
            $lte: new Date(filters.createdBefore),
          };
        }
      }

      // Calculate skip value for pagination
      const skip = (page - 1) * limit;

      // Get total count for pagination metadata
      const totalItems = await UserCreatedRoutineModel.countDocuments(query);

      // Get paginated routines
      const routines = await UserCreatedRoutineModel.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ updatedAt: -1 }); // Sort by most recently updated

      return {
        routines,
        totalItems,
        page,
        limit,
        advancedFilteringEnabled, // Include flag status in response
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a single routine by ID
   * @param routineId The ID of the routine to retrieve
   * @param userId The ID of the user (for authorization)
   * @returns The routine if found
   */
  async getRoutineById(routineId: string, userId: string) {
    try {
      // First, try to find the routine by ID and userId to ensure ownership
      const routine = await UserCreatedRoutineModel.findOne({
        _id: new Types.ObjectId(routineId),
        userId: userId, // Ensure the userId matches the authenticated user
      });

      // If no routine is found, check if it's because it doesn't exist or because of unauthorized access
      if (!routine) {
        // Check if the routine exists at all (regardless of owner)
        const routineExists = await UserCreatedRoutineModel.exists({
          _id: new Types.ObjectId(routineId),
        });

        if (!routineExists) {
          throw new ApiError('Routine not found', 404);
        } else {
          // Routine exists but doesn't belong to the user
          throw new ApiError('Unauthorized access to routine', 403);
        }
      }

      return routine;
    } catch (error: any) {
      // Handle MongoDB cast errors (invalid ObjectId)
      if (error.name === 'CastError') {
        throw new ApiError('Invalid routine ID format', 400);
      }
      throw error;
    }
  }

  /**
   * Update a routine
   * @param routineId The ID of the routine to update
   * @param userId The ID of the user (for authorization)
   * @param updateData The data to update
   * @returns The updated routine
   */
  async updateRoutine(routineId: string, userId: string, updateData: any) {
    try {
      const routine = await UserCreatedRoutineModel.findOne({
        _id: new Types.ObjectId(routineId),
      });

      if (!routine) {
        throw new ApiError('Routine not found', 404);
      }

      // Check if the user is authorized to update this routine
      if (routine.userId !== userId) {
        throw new ApiError('Unauthorized access to routine', 403);
      }

      // Update the routine
      Object.assign(routine, {
        ...updateData,
        updatedAt: new Date(),
      });

      await routine.save();
      return routine;
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
   * Delete a routine
   * @param routineId The ID of the routine to delete
   * @param userId The ID of the user (for authorization)
   * @returns True if deleted successfully
   */
  async deleteRoutine(routineId: string, userId: string) {
    try {
      const routine = await UserCreatedRoutineModel.findOne({
        _id: new Types.ObjectId(routineId),
      });

      if (!routine) {
        throw new ApiError('Routine not found', 404);
      }

      // Check if the user is authorized to delete this routine
      if (routine.userId !== userId) {
        throw new ApiError('Unauthorized access to routine', 403);
      }

      await UserCreatedRoutineModel.deleteOne({
        _id: new Types.ObjectId(routineId),
      });
      return true;
    } catch (error: any) {
      // Handle MongoDB cast errors (invalid ObjectId)
      if (error.name === 'CastError') {
        throw new ApiError('Invalid routine ID format', 400);
      }
      throw error;
    }
  }
}

// Export a singleton instance
export const routineService = new RoutineService();
