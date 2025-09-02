import { Types } from 'mongoose';
import {
  RoutineAssignmentModel,
  RoutineAssignmentDocument,
} from '../models/routine-assignment';
import { TemplateRoutineModel } from '../models/routine';
import { createApiError } from '../utils/error-handler';
import { logger } from '../utils/logger';

/**
 * Interface for creating routine assignments
 */
export interface CreateRoutineAssignmentData {
  routineVersionId: string;
  userId: string;
  trainerId?: string;
  startDate?: Date;
  endDate?: Date;
  notesForUser?: string;
}

/**
 * Interface for updating routine assignments
 */
export interface UpdateRoutineAssignmentData {
  startDate?: Date;
  endDate?: Date;
  status?: 'active' | 'completed' | 'paused' | 'cancelled';
  notesForUser?: string;
}

/**
 * Interface for assignment query filters
 */
export interface AssignmentQueryFilters {
  userId?: string;
  trainerId?: string;
  status?: 'active' | 'completed' | 'paused' | 'cancelled';
  parentRoutineId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: 'assignedAt' | 'startDate' | 'endDate' | 'status';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Interface for progress update
 */
export interface ProgressUpdateData {
  completedWorkouts: number;
  totalWorkouts?: number;
  feedback?: string;
}

/**
 * Service class for handling routine assignment business logic
 */
export class RoutineAssignmentService {
  /**
   * Create a new routine assignment
   */
  static async createAssignment(
    data: CreateRoutineAssignmentData
  ): Promise<RoutineAssignmentDocument> {
    try {
      logger.debug('Creating routine assignment', {
        routineVersionId: data.routineVersionId,
        userId: data.userId,
        trainerId: data.trainerId,
      });

      // Validate ObjectIds
      if (!Types.ObjectId.isValid(data.routineVersionId)) {
        throw createApiError.badRequest('Invalid routine version ID format');
      }
      if (!Types.ObjectId.isValid(data.userId)) {
        throw createApiError.badRequest('Invalid user ID format');
      }
      if (data.trainerId && !Types.ObjectId.isValid(data.trainerId)) {
        throw createApiError.badRequest('Invalid trainer ID format');
      }

      // Verify the routine version exists and is a template
      const routineVersion = await TemplateRoutineModel.findById(
        data.routineVersionId
      );
      if (!routineVersion) {
        throw createApiError.notFound('Routine version not found');
      }

      // Check if user already has an active assignment for this routine
      const existingAssignment = await RoutineAssignmentModel.findOne({
        userId: new Types.ObjectId(data.userId),
        parentRoutineId: routineVersion.parentRoutineId,
        status: 'active',
      });

      if (existingAssignment) {
        throw createApiError.conflict(
          'User already has an active assignment for this routine'
        );
      }

      // Calculate total workouts from the routine
      const totalWorkouts = routineVersion.workouts.length;

      const assignmentData = {
        routineVersionId: new Types.ObjectId(data.routineVersionId),
        parentRoutineId: routineVersion.parentRoutineId,
        userId: new Types.ObjectId(data.userId),
        trainerId: data.trainerId
          ? new Types.ObjectId(data.trainerId)
          : undefined,
        startDate: data.startDate,
        endDate: data.endDate,
        notesForUser: data.notesForUser,
        progress: {
          completedWorkouts: 0,
          totalWorkouts,
        },
      };

      const assignment = new RoutineAssignmentModel(assignmentData);
      await assignment.save();

      logger.info('Routine assignment created successfully', {
        assignmentId: assignment._id,
        routineVersionId: data.routineVersionId,
        userId: data.userId,
        trainerId: data.trainerId,
      });

      return assignment;
    } catch (error) {
      if (error instanceof Error && error.name === 'ValidationError') {
        throw createApiError.badRequest(
          `Invalid assignment data: ${error.message}`
        );
      }
      logger.error('Failed to create routine assignment', { data, error });
      throw error;
    }
  }

  /**
   * Get assignment by ID
   */
  static async getAssignmentById(
    assignmentId: string,
    requestorId: string,
    requestorRole?: string
  ): Promise<RoutineAssignmentDocument> {
    try {
      logger.debug('Fetching assignment by ID', { assignmentId, requestorId });

      if (!Types.ObjectId.isValid(assignmentId)) {
        throw createApiError.badRequest('Invalid assignment ID format');
      }

      const assignment = await RoutineAssignmentModel.findById(assignmentId)
        .populate('routineVersionId')
        .populate('userId', 'name email')
        .populate('trainerId', 'name email');

      if (!assignment) {
        throw createApiError.notFound('Assignment not found');
      }

      // Check access permissions
      const canAccess =
        assignment.userId.toString() === requestorId || // User can see their own assignments
        assignment.trainerId?.toString() === requestorId || // Trainer can see their assignments
        requestorRole === 'admin'; // Admin can see all

      if (!canAccess) {
        throw createApiError.forbidden('Access denied to this assignment');
      }

      logger.debug('Assignment fetched successfully', {
        assignmentId: assignment._id,
        userId: assignment.userId,
        trainerId: assignment.trainerId,
      });

      return assignment;
    } catch (error) {
      if (error instanceof Error && error.name === 'CastError') {
        throw createApiError.badRequest('Invalid assignment ID format');
      }
      logger.error('Failed to fetch assignment', { assignmentId, error });
      throw error;
    }
  }

  /**
   * Get assignments with filters and pagination
   */
  static async getAssignments(
    filters: AssignmentQueryFilters = {},
    requestorId: string,
    requestorRole?: string
  ): Promise<{
    assignments: RoutineAssignmentDocument[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    try {
      logger.debug('Fetching assignments with filters', {
        filters,
        requestorId,
      });

      const {
        limit = 20,
        offset = 0,
        sortBy = 'assignedAt',
        sortOrder = 'desc',
        ...queryFilters
      } = filters;

      // Build query
      const query: any = {};

      // Apply access control
      if (requestorRole !== 'admin') {
        // Non-admin users can only see their own assignments
        query.$or = [
          { userId: new Types.ObjectId(requestorId) },
          { trainerId: new Types.ObjectId(requestorId) },
        ];
      }

      // Add filters
      if (queryFilters.userId) {
        if (!Types.ObjectId.isValid(queryFilters.userId)) {
          throw createApiError.badRequest('Invalid user ID format');
        }
        query.userId = new Types.ObjectId(queryFilters.userId);
      }

      if (queryFilters.trainerId) {
        if (!Types.ObjectId.isValid(queryFilters.trainerId)) {
          throw createApiError.badRequest('Invalid trainer ID format');
        }
        query.trainerId = new Types.ObjectId(queryFilters.trainerId);
      }

      if (queryFilters.status) query.status = queryFilters.status;

      if (queryFilters.parentRoutineId) {
        if (!Types.ObjectId.isValid(queryFilters.parentRoutineId)) {
          throw createApiError.badRequest('Invalid parent routine ID format');
        }
        query.parentRoutineId = new Types.ObjectId(
          queryFilters.parentRoutineId
        );
      }

      // Date range filters
      if (queryFilters.startDate || queryFilters.endDate) {
        query.assignedAt = {};
        if (queryFilters.startDate) {
          query.assignedAt.$gte = queryFilters.startDate;
        }
        if (queryFilters.endDate) {
          query.assignedAt.$lte = queryFilters.endDate;
        }
      }

      // Build sort object
      const sortObj: any = {};
      sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;

      // Execute query with pagination
      const [assignments, total] = await Promise.all([
        RoutineAssignmentModel.find(query)
          .populate('routineVersionId', 'name version')
          .populate('userId', 'name email')
          .populate('trainerId', 'name email')
          .sort(sortObj)
          .skip(offset)
          .limit(Math.min(limit, 100)) // Cap at 100
          .exec(),
        RoutineAssignmentModel.countDocuments(query),
      ]);

      const page = Math.floor(offset / limit) + 1;
      const totalPages = Math.ceil(total / limit);

      logger.debug('Assignments fetched successfully', {
        count: assignments.length,
        total,
        page,
        totalPages,
      });

      return {
        assignments,
        total,
        page,
        pageSize: limit,
        totalPages,
      };
    } catch (error) {
      logger.error('Failed to fetch assignments', { filters, error });
      throw error;
    }
  }

  /**
   * Update assignment
   */
  static async updateAssignment(
    assignmentId: string,
    requestorId: string,
    data: UpdateRoutineAssignmentData,
    requestorRole?: string
  ): Promise<RoutineAssignmentDocument> {
    try {
      logger.debug('Updating assignment', { assignmentId, requestorId });

      if (!Types.ObjectId.isValid(assignmentId)) {
        throw createApiError.badRequest('Invalid assignment ID format');
      }

      const assignment = await RoutineAssignmentModel.findById(assignmentId);

      if (!assignment) {
        throw createApiError.notFound('Assignment not found');
      }

      // Check permissions - only trainers and admins can update assignments
      const canUpdate =
        assignment.trainerId?.toString() === requestorId ||
        requestorRole === 'admin';

      if (!canUpdate) {
        throw createApiError.forbidden(
          'Only trainers and admins can update assignments'
        );
      }

      // Update fields
      Object.keys(data).forEach(key => {
        if (data[key as keyof UpdateRoutineAssignmentData] !== undefined) {
          (assignment as any)[key] =
            data[key as keyof UpdateRoutineAssignmentData];
        }
      });

      await assignment.save();

      logger.info('Assignment updated successfully', {
        assignmentId: assignment._id,
        requestorId,
        updatedFields: Object.keys(data),
      });

      return assignment;
    } catch (error) {
      if (error instanceof Error && error.name === 'ValidationError') {
        throw createApiError.badRequest(
          `Invalid update data: ${error.message}`
        );
      }
      logger.error('Failed to update assignment', {
        assignmentId,
        requestorId,
        error,
      });
      throw error;
    }
  }

  /**
   * Update assignment progress
   */
  static async updateProgress(
    assignmentId: string,
    userId: string,
    data: ProgressUpdateData
  ): Promise<RoutineAssignmentDocument> {
    try {
      logger.debug('Updating assignment progress', {
        assignmentId,
        userId,
        data,
      });

      if (!Types.ObjectId.isValid(assignmentId)) {
        throw createApiError.badRequest('Invalid assignment ID format');
      }

      if (!Types.ObjectId.isValid(userId)) {
        throw createApiError.badRequest('Invalid user ID format');
      }

      const assignment = await RoutineAssignmentModel.findOne({
        _id: new Types.ObjectId(assignmentId),
        userId: new Types.ObjectId(userId),
      });

      if (!assignment) {
        throw createApiError.notFound('Assignment not found for this user');
      }

      if (assignment.status !== 'active') {
        throw createApiError.badRequest(
          'Can only update progress for active assignments'
        );
      }

      // Use the instance method to update progress
      await assignment.updateProgress(
        data.completedWorkouts,
        data.totalWorkouts,
        data.feedback
      );

      logger.info('Assignment progress updated successfully', {
        assignmentId,
        userId,
        completedWorkouts: data.completedWorkouts,
        totalWorkouts: assignment.progress.totalWorkouts,
      });

      return assignment;
    } catch (error) {
      logger.error('Failed to update assignment progress', {
        assignmentId,
        userId,
        error,
      });
      throw error;
    }
  }

  /**
   * Complete assignment
   */
  static async completeAssignment(
    assignmentId: string,
    userId: string,
    feedback?: string
  ): Promise<RoutineAssignmentDocument> {
    try {
      logger.debug('Completing assignment', { assignmentId, userId });

      if (!Types.ObjectId.isValid(assignmentId)) {
        throw createApiError.badRequest('Invalid assignment ID format');
      }

      if (!Types.ObjectId.isValid(userId)) {
        throw createApiError.badRequest('Invalid user ID format');
      }

      const assignment = await RoutineAssignmentModel.findOne({
        _id: new Types.ObjectId(assignmentId),
        userId: new Types.ObjectId(userId),
      });

      if (!assignment) {
        throw createApiError.notFound('Assignment not found for this user');
      }

      if (assignment.status === 'completed') {
        throw createApiError.badRequest('Assignment is already completed');
      }

      // Use the instance method to mark complete
      await assignment.markComplete(feedback);

      logger.info('Assignment completed successfully', {
        assignmentId,
        userId,
        completedWorkouts: assignment.progress.completedWorkouts,
        totalWorkouts: assignment.progress.totalWorkouts,
      });

      return assignment;
    } catch (error) {
      logger.error('Failed to complete assignment', {
        assignmentId,
        userId,
        error,
      });
      throw error;
    }
  }

  /**
   * Pause assignment
   */
  static async pauseAssignment(
    assignmentId: string,
    requestorId: string,
    requestorRole?: string
  ): Promise<RoutineAssignmentDocument> {
    try {
      logger.debug('Pausing assignment', { assignmentId, requestorId });

      if (!Types.ObjectId.isValid(assignmentId)) {
        throw createApiError.badRequest('Invalid assignment ID format');
      }

      const assignment = await RoutineAssignmentModel.findById(assignmentId);

      if (!assignment) {
        throw createApiError.notFound('Assignment not found');
      }

      // Check permissions - user or trainer can pause
      const canPause =
        assignment.userId.toString() === requestorId ||
        assignment.trainerId?.toString() === requestorId ||
        requestorRole === 'admin';

      if (!canPause) {
        throw createApiError.forbidden(
          'Access denied to pause this assignment'
        );
      }

      await assignment.pause();

      logger.info('Assignment paused successfully', {
        assignmentId,
        requestorId,
      });

      return assignment;
    } catch (error) {
      logger.error('Failed to pause assignment', {
        assignmentId,
        requestorId,
        error,
      });
      throw error;
    }
  }

  /**
   * Resume assignment
   */
  static async resumeAssignment(
    assignmentId: string,
    requestorId: string,
    requestorRole?: string
  ): Promise<RoutineAssignmentDocument> {
    try {
      logger.debug('Resuming assignment', { assignmentId, requestorId });

      if (!Types.ObjectId.isValid(assignmentId)) {
        throw createApiError.badRequest('Invalid assignment ID format');
      }

      const assignment = await RoutineAssignmentModel.findById(assignmentId);

      if (!assignment) {
        throw createApiError.notFound('Assignment not found');
      }

      // Check permissions - user or trainer can resume
      const canResume =
        assignment.userId.toString() === requestorId ||
        assignment.trainerId?.toString() === requestorId ||
        requestorRole === 'admin';

      if (!canResume) {
        throw createApiError.forbidden(
          'Access denied to resume this assignment'
        );
      }

      await assignment.resume();

      logger.info('Assignment resumed successfully', {
        assignmentId,
        requestorId,
      });

      return assignment;
    } catch (error) {
      logger.error('Failed to resume assignment', {
        assignmentId,
        requestorId,
        error,
      });
      throw error;
    }
  }

  /**
   * Get user's active assignments
   */
  static async getUserActiveAssignments(
    userId: string
  ): Promise<RoutineAssignmentDocument[]> {
    try {
      logger.debug('Fetching user active assignments', { userId });

      if (!Types.ObjectId.isValid(userId)) {
        throw createApiError.badRequest('Invalid user ID format');
      }

      const assignments = await RoutineAssignmentModel.findActiveByUser(userId)
        .populate('routineVersionId', 'name version difficulty goal')
        .populate('trainerId', 'name email');

      logger.debug('User active assignments fetched', {
        userId,
        count: assignments.length,
      });

      return assignments;
    } catch (error) {
      logger.error('Failed to fetch user active assignments', {
        userId,
        error,
      });
      throw error;
    }
  }

  /**
   * Get trainer's assignments
   */
  static async getTrainerAssignments(
    trainerId: string,
    status?: string
  ): Promise<RoutineAssignmentDocument[]> {
    try {
      logger.debug('Fetching trainer assignments', { trainerId, status });

      if (!Types.ObjectId.isValid(trainerId)) {
        throw createApiError.badRequest('Invalid trainer ID format');
      }

      const assignments = await RoutineAssignmentModel.findByTrainer(
        trainerId,
        status
      )
        .populate('routineVersionId', 'name version difficulty goal')
        .populate('userId', 'name email');

      logger.debug('Trainer assignments fetched', {
        trainerId,
        status,
        count: assignments.length,
      });

      return assignments;
    } catch (error) {
      logger.error('Failed to fetch trainer assignments', { trainerId, error });
      throw error;
    }
  }

  /**
   * Get overdue assignments
   */
  static async getOverdueAssignments(): Promise<RoutineAssignmentDocument[]> {
    try {
      logger.debug('Fetching overdue assignments');

      const assignments = await RoutineAssignmentModel.findOverdue()
        .populate('routineVersionId', 'name version')
        .populate('userId', 'name email')
        .populate('trainerId', 'name email');

      logger.debug('Overdue assignments fetched', {
        count: assignments.length,
      });

      return assignments;
    } catch (error) {
      logger.error('Failed to fetch overdue assignments', { error });
      throw error;
    }
  }

  /**
   * Delete assignment
   */
  static async deleteAssignment(
    assignmentId: string,
    requestorId: string,
    requestorRole?: string
  ): Promise<void> {
    try {
      logger.debug('Deleting assignment', { assignmentId, requestorId });

      if (!Types.ObjectId.isValid(assignmentId)) {
        throw createApiError.badRequest('Invalid assignment ID format');
      }

      const assignment = await RoutineAssignmentModel.findById(assignmentId);

      if (!assignment) {
        throw createApiError.notFound('Assignment not found');
      }

      // Check permissions - only trainers and admins can delete assignments
      const canDelete =
        assignment.trainerId?.toString() === requestorId ||
        requestorRole === 'admin';

      if (!canDelete) {
        throw createApiError.forbidden(
          'Only trainers and admins can delete assignments'
        );
      }

      await RoutineAssignmentModel.findByIdAndDelete(assignmentId);

      logger.info('Assignment deleted successfully', {
        assignmentId,
        requestorId,
      });
    } catch (error) {
      logger.error('Failed to delete assignment', {
        assignmentId,
        requestorId,
        error,
      });
      throw error;
    }
  }
}
