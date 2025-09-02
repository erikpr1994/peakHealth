import { Types } from 'mongoose';
import {
  RoutineModel,
  UserCreatedRoutineModel,
  TemplateRoutineModel,
  RoutineDocument,
  isUserCreatedRoutine,
  isTemplateRoutine,
} from '../models/Routine';
import { createApiError } from '../utils/error-handler';
import { logger } from '../utils/logger';
import type {
  UserCreatedRoutine,
  TemplateRoutine,
  Routine,
  Difficulty,
  Goal,
} from '@peakhealth/routines-types';

/**
 * Interface for routine creation data
 */
export interface CreateUserRoutineData {
  name: string;
  description?: string;
  difficulty: Difficulty;
  goal: Goal;
  duration: number;
  objectives?: string[];
  workouts?: string[];
}

export interface CreateTemplateRoutineData extends CreateUserRoutineData {
  templateType: 'trainer' | 'company';
  allowCopy?: boolean;
  isPublic?: boolean;
  tags?: string[];
  targetAudience?: string[];
  parentRoutineId?: string;
  version?: number;
}

/**
 * Interface for routine update data
 */
export interface UpdateRoutineData {
  name?: string;
  description?: string;
  difficulty?: Difficulty;
  goal?: Goal;
  duration?: number;
  objectives?: string[];
  workouts?: string[];
  isActive?: boolean;
  isFavorite?: boolean;
  allowCopy?: boolean;
  isPublic?: boolean;
  tags?: string[];
  targetAudience?: string[];
}

/**
 * Interface for routine query filters
 */
export interface RoutineQueryFilters {
  userId?: string;
  difficulty?: Difficulty;
  goal?: Goal;
  isActive?: boolean;
  isFavorite?: boolean;
  isPublic?: boolean;
  templateType?: 'trainer' | 'company';
  tags?: string[];
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'difficulty' | 'duration';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Service class for handling routine business logic
 */
export class RoutineService {
  /**
   * Create a new user-created routine
   */
  static async createUserRoutine(
    userId: string,
    data: CreateUserRoutineData
  ): Promise<RoutineDocument> {
    try {
      logger.debug('Creating user routine', { userId, routineName: data.name });

      // Validate user ID
      if (!Types.ObjectId.isValid(userId)) {
        throw createApiError.badRequest('Invalid user ID format');
      }

      // Calculate total workouts from workout IDs
      const totalWorkouts = data.workouts ? data.workouts.length : 0;

      const routineData = {
        ...data,
        userId: new Types.ObjectId(userId),
        createdBy: new Types.ObjectId(userId),
        workouts: data.workouts?.map(id => new Types.ObjectId(id)) || [],
        totalWorkouts,
        completedWorkouts: 0,
        isActive: false,
        isFavorite: false,
      };

      const routine = new UserCreatedRoutineModel(routineData);
      await routine.save();

      logger.info('User routine created successfully', {
        routineId: routine._id,
        userId,
        name: routine.name,
      });

      return routine;
    } catch (error) {
      if (error instanceof Error && error.name === 'ValidationError') {
        throw createApiError.badRequest(
          `Invalid routine data: ${error.message}`
        );
      }
      logger.error('Failed to create user routine', { userId, error });
      throw error;
    }
  }

  /**
   * Create a new template routine
   */
  static async createTemplateRoutine(
    createdBy: string,
    data: CreateTemplateRoutineData
  ): Promise<RoutineDocument> {
    try {
      logger.debug('Creating template routine', {
        createdBy,
        routineName: data.name,
      });

      // Validate creator ID
      if (!Types.ObjectId.isValid(createdBy)) {
        throw createApiError.badRequest('Invalid creator ID format');
      }

      // Generate parent routine ID if not provided
      const parentRoutineId = data.parentRoutineId
        ? new Types.ObjectId(data.parentRoutineId)
        : new Types.ObjectId();

      // Determine version number
      let version = data.version || 1;
      if (!data.version) {
        // Find the highest version for this parent routine
        const latestVersion = await TemplateRoutineModel.findOne({
          parentRoutineId,
        })
          .sort({ version: -1 })
          .select('version');

        if (latestVersion && latestVersion.version) {
          version = latestVersion.version + 1;
        }
      }

      const routineData = {
        ...data,
        createdBy: new Types.ObjectId(createdBy),
        parentRoutineId,
        version,
        workouts: data.workouts?.map(id => new Types.ObjectId(id)) || [],
        isLatest: true, // New versions are latest by default
        allowCopy: data.allowCopy ?? true,
        isPublic: data.isPublic ?? false,
        tags: data.tags || [],
        targetAudience: data.targetAudience || [],
      };

      const routine = new TemplateRoutineModel(routineData);
      await routine.save(); // Pre-save middleware will handle isLatest flag

      logger.info('Template routine created successfully', {
        routineId: routine._id,
        parentRoutineId: routine.parentRoutineId,
        version: routine.version,
        createdBy,
        name: routine.name,
      });

      return routine;
    } catch (error) {
      if (error instanceof Error && error.name === 'ValidationError') {
        throw createApiError.badRequest(
          `Invalid routine data: ${error.message}`
        );
      }
      logger.error('Failed to create template routine', { createdBy, error });
      throw error;
    }
  }

  /**
   * Get routine by ID
   */
  static async getRoutineById(
    routineId: string,
    userId?: string
  ): Promise<RoutineDocument> {
    try {
      logger.debug('Fetching routine by ID', { routineId, userId });

      if (!Types.ObjectId.isValid(routineId)) {
        throw createApiError.badRequest('Invalid routine ID format');
      }

      const routine =
        await RoutineModel.findById(routineId).populate('workouts');

      if (!routine) {
        throw createApiError.notFound('Routine not found');
      }

      // Check access permissions
      if (isUserCreatedRoutine(routine)) {
        // User can only access their own routines
        if (userId && routine.userId.toString() !== userId) {
          throw createApiError.forbidden('Access denied to this routine');
        }
      } else if (isTemplateRoutine(routine)) {
        // Template routines must be public or owned by the user
        if (
          !routine.isPublic &&
          userId &&
          routine.createdBy.toString() !== userId
        ) {
          throw createApiError.forbidden('Access denied to this routine');
        }
      }

      logger.debug('Routine fetched successfully', {
        routineId: routine._id,
        type: routine.routineType,
      });

      return routine;
    } catch (error) {
      if (error instanceof Error && error.name === 'CastError') {
        throw createApiError.badRequest('Invalid routine ID format');
      }
      logger.error('Failed to fetch routine', { routineId, error });
      throw error;
    }
  }

  /**
   * Get routines with filters and pagination
   */
  static async getRoutines(filters: RoutineQueryFilters = {}): Promise<{
    routines: RoutineDocument[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    try {
      logger.debug('Fetching routines with filters', filters);

      const {
        limit = 20,
        offset = 0,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        search,
        ...queryFilters
      } = filters;

      // Build query
      const query: any = {};

      // Add user filter
      if (queryFilters.userId) {
        if (!Types.ObjectId.isValid(queryFilters.userId)) {
          throw createApiError.badRequest('Invalid user ID format');
        }
        query.userId = new Types.ObjectId(queryFilters.userId);
      }

      // Add other filters
      if (queryFilters.difficulty) query.difficulty = queryFilters.difficulty;
      if (queryFilters.goal) query.goal = queryFilters.goal;
      if (queryFilters.isActive !== undefined)
        query.isActive = queryFilters.isActive;
      if (queryFilters.isFavorite !== undefined)
        query.isFavorite = queryFilters.isFavorite;
      if (queryFilters.isPublic !== undefined)
        query.isPublic = queryFilters.isPublic;
      if (queryFilters.templateType)
        query.templateType = queryFilters.templateType;

      // Add tags filter
      if (queryFilters.tags && queryFilters.tags.length > 0) {
        query.tags = { $in: queryFilters.tags };
      }

      // Add search filter
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { objectives: { $elemMatch: { $regex: search, $options: 'i' } } },
        ];
      }

      // Build sort object
      const sortObj: any = {};
      sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;

      // Execute query with pagination
      const [routines, total] = await Promise.all([
        RoutineModel.find(query)
          .populate('workouts')
          .sort(sortObj)
          .skip(offset)
          .limit(Math.min(limit, 100)) // Cap at 100
          .exec(),
        RoutineModel.countDocuments(query),
      ]);

      const page = Math.floor(offset / limit) + 1;
      const totalPages = Math.ceil(total / limit);

      logger.debug('Routines fetched successfully', {
        count: routines.length,
        total,
        page,
        totalPages,
      });

      return {
        routines,
        total,
        page,
        pageSize: limit,
        totalPages,
      };
    } catch (error) {
      logger.error('Failed to fetch routines', { filters, error });
      throw error;
    }
  }

  /**
   * Update routine
   */
  static async updateRoutine(
    routineId: string,
    userId: string,
    data: UpdateRoutineData
  ): Promise<RoutineDocument> {
    try {
      logger.debug('Updating routine', { routineId, userId });

      if (!Types.ObjectId.isValid(routineId)) {
        throw createApiError.badRequest('Invalid routine ID format');
      }

      if (!Types.ObjectId.isValid(userId)) {
        throw createApiError.badRequest('Invalid user ID format');
      }

      const routine = await RoutineModel.findById(routineId);

      if (!routine) {
        throw createApiError.notFound('Routine not found');
      }

      // Check permissions
      if (isUserCreatedRoutine(routine)) {
        if (routine.userId.toString() !== userId) {
          throw createApiError.forbidden(
            "Cannot update another user's routine"
          );
        }
      } else if (isTemplateRoutine(routine)) {
        if (routine.createdBy.toString() !== userId) {
          throw createApiError.forbidden(
            "Cannot update another user's template"
          );
        }
      }

      // Update fields
      Object.keys(data).forEach(key => {
        if (data[key as keyof UpdateRoutineData] !== undefined) {
          (routine as any)[key] = data[key as keyof UpdateRoutineData];
        }
      });

      // Update workouts if provided
      if (data.workouts) {
        routine.workouts = data.workouts.map(id => new Types.ObjectId(id));
        if (isUserCreatedRoutine(routine)) {
          routine.totalWorkouts = data.workouts.length;
        }
      }

      await routine.save();

      logger.info('Routine updated successfully', {
        routineId: routine._id,
        userId,
        updatedFields: Object.keys(data),
      });

      return routine;
    } catch (error) {
      if (error instanceof Error && error.name === 'ValidationError') {
        throw createApiError.badRequest(
          `Invalid update data: ${error.message}`
        );
      }
      logger.error('Failed to update routine', { routineId, userId, error });
      throw error;
    }
  }

  /**
   * Delete routine
   */
  static async deleteRoutine(routineId: string, userId: string): Promise<void> {
    try {
      logger.debug('Deleting routine', { routineId, userId });

      if (!Types.ObjectId.isValid(routineId)) {
        throw createApiError.badRequest('Invalid routine ID format');
      }

      if (!Types.ObjectId.isValid(userId)) {
        throw createApiError.badRequest('Invalid user ID format');
      }

      const routine = await RoutineModel.findById(routineId);

      if (!routine) {
        throw createApiError.notFound('Routine not found');
      }

      // Check permissions
      if (isUserCreatedRoutine(routine)) {
        if (routine.userId.toString() !== userId) {
          throw createApiError.forbidden(
            "Cannot delete another user's routine"
          );
        }
      } else if (isTemplateRoutine(routine)) {
        if (routine.createdBy.toString() !== userId) {
          throw createApiError.forbidden(
            "Cannot delete another user's template"
          );
        }
      }

      await RoutineModel.findByIdAndDelete(routineId);

      logger.info('Routine deleted successfully', {
        routineId,
        userId,
        routineType: routine.routineType,
      });
    } catch (error) {
      logger.error('Failed to delete routine', { routineId, userId, error });
      throw error;
    }
  }

  /**
   * Copy a template routine to create a user routine
   */
  static async copyTemplateRoutine(
    templateId: string,
    userId: string,
    customizations?: Partial<CreateUserRoutineData>
  ): Promise<RoutineDocument> {
    try {
      logger.debug('Copying template routine', { templateId, userId });

      if (!Types.ObjectId.isValid(templateId)) {
        throw createApiError.badRequest('Invalid template ID format');
      }

      if (!Types.ObjectId.isValid(userId)) {
        throw createApiError.badRequest('Invalid user ID format');
      }

      const template = await TemplateRoutineModel.findById(templateId);

      if (!template) {
        throw createApiError.notFound('Template routine not found');
      }

      // Check if template allows copying
      if (!template.allowCopy) {
        throw createApiError.forbidden('This template cannot be copied');
      }

      // Check if template is public or user has access
      if (
        !template.isPublic &&
        template.createdBy &&
        template.createdBy.toString() !== userId
      ) {
        throw createApiError.forbidden('Access denied to this template');
      }

      // Create user routine from template
      const routineData: CreateUserRoutineData = {
        name: customizations?.name || `${template.name} (Copy)`,
        description: customizations?.description || template.description,
        difficulty: customizations?.difficulty || template.difficulty,
        goal: customizations?.goal || template.goal,
        duration: customizations?.duration || template.duration,
        objectives: customizations?.objectives || template.objectives,
        workouts:
          customizations?.workouts ||
          template.workouts.map(id => id.toString()),
      };

      const userRoutine = await this.createUserRoutine(userId, routineData);

      logger.info('Template routine copied successfully', {
        templateId,
        newRoutineId: userRoutine._id,
        userId,
      });

      return userRoutine;
    } catch (error) {
      logger.error('Failed to copy template routine', {
        templateId,
        userId,
        error,
      });
      throw error;
    }
  }

  /**
   * Get user's active routines
   */
  static async getUserActiveRoutines(
    userId: string
  ): Promise<RoutineDocument[]> {
    try {
      logger.debug('Fetching user active routines', { userId });

      if (!Types.ObjectId.isValid(userId)) {
        throw createApiError.badRequest('Invalid user ID format');
      }

      const routines = await UserCreatedRoutineModel.find({
        userId: new Types.ObjectId(userId),
        isActive: true,
      })
        .populate('workouts')
        .sort({ lastUsed: -1, updatedAt: -1 });

      logger.debug('User active routines fetched', {
        userId,
        count: routines.length,
      });

      return routines;
    } catch (error) {
      logger.error('Failed to fetch user active routines', { userId, error });
      throw error;
    }
  }

  /**
   * Get user's favorite routines
   */
  static async getUserFavoriteRoutines(
    userId: string
  ): Promise<RoutineDocument[]> {
    try {
      logger.debug('Fetching user favorite routines', { userId });

      if (!Types.ObjectId.isValid(userId)) {
        throw createApiError.badRequest('Invalid user ID format');
      }

      const routines = await UserCreatedRoutineModel.find({
        userId: new Types.ObjectId(userId),
        isFavorite: true,
      })
        .populate('workouts')
        .sort({ name: 1 });

      logger.debug('User favorite routines fetched', {
        userId,
        count: routines.length,
      });

      return routines;
    } catch (error) {
      logger.error('Failed to fetch user favorite routines', { userId, error });
      throw error;
    }
  }

  /**
   * Update routine progress
   */
  static async updateRoutineProgress(
    routineId: string,
    userId: string,
    completedWorkouts: number
  ): Promise<RoutineDocument> {
    try {
      logger.debug('Updating routine progress', {
        routineId,
        userId,
        completedWorkouts,
      });

      if (!Types.ObjectId.isValid(routineId)) {
        throw createApiError.badRequest('Invalid routine ID format');
      }

      if (!Types.ObjectId.isValid(userId)) {
        throw createApiError.badRequest('Invalid user ID format');
      }

      const routine = await UserCreatedRoutineModel.findOne({
        _id: new Types.ObjectId(routineId),
        userId: new Types.ObjectId(userId),
      });

      if (!routine) {
        throw createApiError.notFound('User routine not found');
      }

      if (completedWorkouts < 0) {
        throw createApiError.badRequest(
          'Completed workouts cannot be negative'
        );
      }

      if (routine.totalWorkouts && completedWorkouts > routine.totalWorkouts) {
        throw createApiError.badRequest(
          'Completed workouts cannot exceed total workouts'
        );
      }

      routine.completedWorkouts = completedWorkouts;
      routine.lastUsed = new Date();

      await routine.save();

      logger.info('Routine progress updated successfully', {
        routineId,
        userId,
        completedWorkouts,
        totalWorkouts: routine.totalWorkouts,
      });

      return routine;
    } catch (error) {
      logger.error('Failed to update routine progress', {
        routineId,
        userId,
        error,
      });
      throw error;
    }
  }
}
