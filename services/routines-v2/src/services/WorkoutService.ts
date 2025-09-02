import { Types } from 'mongoose';
import {
  WorkoutModel,
  StrengthWorkoutModel,
  isStrengthWorkout,
  WorkoutDocument,
  StrengthWorkoutDocument,
} from '../models/workout';
import { createApiError } from '../utils/error-handler';
import { logger } from '../utils/logger';

/**
 * WorkoutService
 *
 * Handles business logic for workout management, including:
 * - Creating workouts
 * - Retrieving workouts
 * - Updating workouts
 * - Deleting workouts
 * - Versioning workout templates
 */
export class WorkoutService {
  /**
   * Create a new strength workout
   */
  static async createStrengthWorkout(
    createdBy: string,
    workoutData: Partial<StrengthWorkoutDocument>
  ): Promise<StrengthWorkoutDocument> {
    logger.info('Creating new strength workout', {
      createdBy,
      workoutName: workoutData.name,
    });

    try {
      // Validate required fields
      if (
        !workoutData.name ||
        !workoutData.orderIndex ||
        !workoutData.sections
      ) {
        throw createApiError.badRequest(
          'Name, orderIndex, and sections are required'
        );
      }

      // Validate sections
      if (
        !Array.isArray(workoutData.sections) ||
        workoutData.sections.length === 0
      ) {
        throw createApiError.badRequest(
          'Workout must have at least one section'
        );
      }

      // Create the workout
      const workout = new StrengthWorkoutModel({
        ...workoutData,
        type: 'strength',
        createdBy: new Types.ObjectId(createdBy),
        schemaVersion: '1.0.0',
      });

      const savedWorkout = await workout.save();

      logger.info('Strength workout created successfully', {
        workoutId: savedWorkout._id.toString(),
        createdBy,
        sectionCount: savedWorkout.sections.length,
      });

      return savedWorkout;
    } catch (error) {
      logger.error('Failed to create strength workout', {
        error: error instanceof Error ? error.message : 'Unknown error',
        createdBy,
        workoutName: workoutData.name,
      });

      if (error instanceof Error && error.name === 'ValidationError') {
        throw createApiError.badRequest(`Validation failed: ${error.message}`);
      }

      throw error;
    }
  }

  /**
   * Get a workout by ID
   */
  static async getWorkoutById(
    workoutId: string,
    userId?: string
  ): Promise<WorkoutDocument> {
    logger.info('Retrieving workout by ID', { workoutId, userId });

    try {
      if (!Types.ObjectId.isValid(workoutId)) {
        throw createApiError.badRequest('Invalid workout ID format');
      }

      const workout = await WorkoutModel.findById(workoutId);

      if (!workout) {
        throw createApiError.notFound('Workout not found');
      }

      // Check access permissions
      if (workout.createdBy && userId) {
        const hasAccess =
          workout.createdBy.toString() === userId || workout.isPublic === true;

        if (!hasAccess) {
          throw createApiError.forbidden(
            'You do not have permission to access this workout'
          );
        }
      }

      logger.info('Workout retrieved successfully', {
        workoutId,
        workoutType: workout.type,
        sectionCount: workout.sections.length,
      });

      return workout;
    } catch (error) {
      logger.error('Failed to retrieve workout', {
        error: error instanceof Error ? error.message : 'Unknown error',
        workoutId,
        userId,
      });

      throw error;
    }
  }

  /**
   * Get workouts with filtering and pagination
   */
  static async getWorkouts(
    options: {
      userId?: string;
      type?: 'strength';
      isPublic?: boolean;
      tags?: string[];
      createdBy?: string;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<{
    workouts: WorkoutDocument[];
    totalCount: number;
    page: number;
    totalPages: number;
  }> {
    const {
      userId,
      type = 'strength',
      isPublic,
      tags,
      createdBy,
      page = 1,
      limit = 20,
    } = options;

    logger.info('Retrieving workouts with filters', {
      userId,
      type,
      isPublic,
      tags,
      createdBy,
      page,
      limit,
    });

    try {
      // Build query
      const query: any = { type };

      // Access control
      if (userId) {
        if (isPublic !== undefined) {
          if (isPublic) {
            query.isPublic = true;
          } else {
            query.$or = [
              { createdBy: new Types.ObjectId(userId) },
              { isPublic: true },
            ];
          }
        } else {
          query.$or = [
            { createdBy: new Types.ObjectId(userId) },
            { isPublic: true },
          ];
        }
      } else {
        query.isPublic = true;
      }

      // Additional filters
      if (tags && tags.length > 0) {
        query.tags = { $in: tags };
      }

      if (createdBy) {
        query.createdBy = new Types.ObjectId(createdBy);
      }

      // Exclude archived workouts
      query.isArchived = { $ne: true };

      // Pagination
      const skip = (page - 1) * limit;

      const [workouts, totalCount] = await Promise.all([
        WorkoutModel.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),
        WorkoutModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      logger.info('Workouts retrieved successfully', {
        count: workouts.length,
        totalCount,
        page,
        totalPages,
      });

      return {
        workouts,
        totalCount,
        page,
        totalPages,
      };
    } catch (error) {
      logger.error('Failed to retrieve workouts', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId,
        type,
      });

      throw error;
    }
  }

  /**
   * Update a workout
   */
  static async updateWorkout(
    workoutId: string,
    userId: string,
    updateData: Partial<WorkoutDocument>
  ): Promise<WorkoutDocument> {
    logger.info('Updating workout', { workoutId, userId });

    try {
      if (!Types.ObjectId.isValid(workoutId)) {
        throw createApiError.badRequest('Invalid workout ID format');
      }

      const workout = await WorkoutModel.findById(workoutId);

      if (!workout) {
        throw createApiError.notFound('Workout not found');
      }

      // Check ownership
      if (!workout.createdBy || workout.createdBy.toString() !== userId) {
        throw createApiError.forbidden(
          'You can only update workouts you created'
        );
      }

      // Validate sections if provided
      if (updateData.sections) {
        if (
          !Array.isArray(updateData.sections) ||
          updateData.sections.length === 0
        ) {
          throw createApiError.badRequest(
            'Workout must have at least one section'
          );
        }
      }

      // Update the workout
      Object.assign(workout, updateData);
      const updatedWorkout = await workout.save();

      logger.info('Workout updated successfully', {
        workoutId,
        userId,
        sectionCount: updatedWorkout.sections.length,
      });

      return updatedWorkout;
    } catch (error) {
      logger.error('Failed to update workout', {
        error: error instanceof Error ? error.message : 'Unknown error',
        workoutId,
        userId,
      });

      if (error instanceof Error && error.name === 'ValidationError') {
        throw createApiError.badRequest(`Validation failed: ${error.message}`);
      }

      throw error;
    }
  }

  /**
   * Delete a workout
   */
  static async deleteWorkout(workoutId: string, userId: string): Promise<void> {
    logger.info('Deleting workout', { workoutId, userId });

    try {
      if (!Types.ObjectId.isValid(workoutId)) {
        throw createApiError.badRequest('Invalid workout ID format');
      }

      const workout = await WorkoutModel.findById(workoutId);

      if (!workout) {
        throw createApiError.notFound('Workout not found');
      }

      // Check ownership
      if (!workout.createdBy || workout.createdBy.toString() !== userId) {
        throw createApiError.forbidden(
          'You can only delete workouts you created'
        );
      }

      await WorkoutModel.findByIdAndDelete(workoutId);

      logger.info('Workout deleted successfully', {
        workoutId,
        userId,
      });
    } catch (error) {
      logger.error('Failed to delete workout', {
        error: error instanceof Error ? error.message : 'Unknown error',
        workoutId,
        userId,
      });

      throw error;
    }
  }

  /**
   * Create a new version of a workout template
   */
  static async createWorkoutVersion(
    originalWorkoutId: string,
    userId: string,
    updateData: Partial<WorkoutDocument>
  ): Promise<WorkoutDocument> {
    logger.info('Creating new workout version', { originalWorkoutId, userId });

    try {
      if (!Types.ObjectId.isValid(originalWorkoutId)) {
        throw createApiError.badRequest('Invalid workout ID format');
      }

      const originalWorkout = await WorkoutModel.findById(originalWorkoutId);

      if (!originalWorkout) {
        throw createApiError.notFound('Original workout not found');
      }

      // Check ownership
      if (
        !originalWorkout.createdBy ||
        originalWorkout.createdBy.toString() !== userId
      ) {
        throw createApiError.forbidden(
          'You can only version workouts you created'
        );
      }

      // Determine parent and version
      const parentWorkoutId =
        originalWorkout.parentWorkoutId || originalWorkout._id;
      const currentVersion = originalWorkout.version || 1;
      const newVersion = currentVersion + 1;

      // Create new version
      const newVersionData = {
        ...originalWorkout.toObject(),
        ...updateData,
        _id: new Types.ObjectId(),
        parentWorkoutId,
        version: newVersion,
        isLatest: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      delete (newVersionData as any).__v;

      const newWorkout = new WorkoutModel(newVersionData);
      const savedWorkout = await newWorkout.save();

      logger.info('Workout version created successfully', {
        originalWorkoutId,
        newWorkoutId: savedWorkout._id.toString(),
        version: newVersion,
        userId,
      });

      return savedWorkout;
    } catch (error) {
      logger.error('Failed to create workout version', {
        error: error instanceof Error ? error.message : 'Unknown error',
        originalWorkoutId,
        userId,
      });

      if (error instanceof Error && error.name === 'ValidationError') {
        throw createApiError.badRequest(`Validation failed: ${error.message}`);
      }

      throw error;
    }
  }

  /**
   * Get the latest version of a workout template
   */
  static async getLatestWorkoutVersion(
    parentWorkoutId: string
  ): Promise<WorkoutDocument | null> {
    logger.info('Getting latest workout version', { parentWorkoutId });

    try {
      if (!Types.ObjectId.isValid(parentWorkoutId)) {
        throw createApiError.badRequest('Invalid parent workout ID format');
      }

      const latestVersion = await WorkoutModel.findOne({
        parentWorkoutId: new Types.ObjectId(parentWorkoutId),
        isLatest: true,
      });

      logger.info('Latest workout version retrieved', {
        parentWorkoutId,
        found: !!latestVersion,
        version: latestVersion?.version,
      });

      return latestVersion;
    } catch (error) {
      logger.error('Failed to get latest workout version', {
        error: error instanceof Error ? error.message : 'Unknown error',
        parentWorkoutId,
      });

      throw error;
    }
  }
}
