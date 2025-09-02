import { Request, Response, NextFunction } from 'express';
import { routineService } from '../services/routine.service';
import { routineAssignmentService } from '../services/routine-assignment.service';
import { ApiError } from '../utils/error-handler';
import {
  parsePaginationParams,
  createPaginationMetadata,
} from '../utils/pagination';

/**
 * Controller for handling routine-related API endpoints
 */
export class RoutineController {
  /**
   * Create a new user routine
   * POST /api/routines
   */
  async createRoutine(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate input
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(
          'Request body is empty or missing required fields',
          400
        );
      }

      // Get user ID from the authenticated request
      const userId = req.user?.id;
      if (!userId) {
        throw new ApiError('Authentication required', 401);
      }

      // Create the routine using the service
      const routine = await routineService.createRoutine(userId, req.body);

      // Return success response with the created routine
      return res.status(201).json(routine);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all routines for the authenticated user with pagination
   * GET /api/routines
   */
  async getRoutines(req: Request, res: Response, next: NextFunction) {
    try {
      // Get user ID from the authenticated request
      const userId = req.user?.id;
      if (!userId) {
        throw new ApiError('Authentication required', 401);
      }

      // Get type filter from query params if provided
      const type = req.query.type as 'active' | 'user' | 'assigned' | undefined;

      // Parse pagination parameters
      const { page, limit } = parsePaginationParams(req.query);

      // Extract filter parameters from query
      const filters: Record<string, any> = {};

      // Add filters if they exist in the query
      if (req.query.name) filters.name = req.query.name;
      if (req.query.difficulty) filters.difficulty = req.query.difficulty;
      if (req.query.tags) {
        // Handle tags as comma-separated string
        filters.tags = (req.query.tags as string)
          .split(',')
          .map(tag => tag.trim());
      }
      if (req.query.createdAfter) filters.createdAfter = req.query.createdAfter;
      if (req.query.createdBefore)
        filters.createdBefore = req.query.createdBefore;

      // Get routines using the service with pagination and filters
      const { routines, totalItems, advancedFilteringEnabled } =
        await routineService.getRoutinesByUser(
          userId,
          type,
          page,
          limit,
          Object.keys(filters).length > 0 ? filters : undefined
        );

      // Create pagination metadata
      const paginationMetadata = createPaginationMetadata(
        page,
        limit,
        totalItems
      );

      // Return success response with the routines, pagination metadata, and feature flag status
      return res.status(200).json({
        data: routines,
        pagination: paginationMetadata,
        features: {
          advancedFiltering: {
            enabled: advancedFilteringEnabled,
            appliedFilters: Object.keys(filters).length > 0 ? filters : null,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a single routine by ID
   * GET /api/routines/:id
   */
  async getRoutineById(req: Request, res: Response, next: NextFunction) {
    try {
      // Get user ID from the authenticated request
      const userId = req.user?.id;
      if (!userId) {
        throw new ApiError('Authentication required', 401);
      }

      // Get routine ID from request parameters
      const routineId = req.params.id;
      if (!routineId) {
        throw new ApiError('Routine ID is required', 400);
      }

      // Get the routine using the service
      const routine = await routineService.getRoutineById(routineId, userId);

      // Return success response with the routine
      return res.status(200).json(routine);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a routine
   * PUT /api/routines/:id
   */
  async updateRoutine(req: Request, res: Response, next: NextFunction) {
    try {
      // Get user ID from the authenticated request
      const userId = req.user?.id;
      if (!userId) {
        throw new ApiError('Authentication required', 401);
      }

      // Get routine ID from request parameters
      const routineId = req.params.id;
      if (!routineId) {
        throw new ApiError('Routine ID is required', 400);
      }

      // Update the routine using the service
      const updatedRoutine = await routineService.updateRoutine(
        routineId,
        userId,
        req.body
      );

      // Return success response with the updated routine
      return res.status(200).json(updatedRoutine);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a routine
   * DELETE /api/routines/:id
   */
  async deleteRoutine(req: Request, res: Response, next: NextFunction) {
    try {
      // Get user ID from the authenticated request
      const userId = req.user?.id;
      if (!userId) {
        throw new ApiError('Authentication required', 401);
      }

      // Get routine ID from request parameters
      const routineId = req.params.id;
      if (!routineId) {
        throw new ApiError('Routine ID is required', 400);
      }

      // Delete the routine using the service
      await routineService.deleteRoutine(routineId, userId);

      // Return success response with no content
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Assign a routine to the authenticated user
   * POST /api/routines/:id/assign
   */
  async assignRoutine(req: Request, res: Response, next: NextFunction) {
    try {
      // Get user ID from the authenticated request
      const userId = req.user?.id;
      if (!userId) {
        throw new ApiError('Authentication required', 401);
      }

      // Get routine ID from request parameters
      const routineId = req.params.id;
      if (!routineId) {
        throw new ApiError('Routine ID is required', 400);
      }

      // Assign the routine using the service
      const assignment = await routineAssignmentService.assignRoutine(
        userId,
        routineId
      );

      // Return success response with the created assignment
      return res.status(201).json({
        success: true,
        assignment,
        message: 'Routine assigned successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

// Export a singleton instance
export const routineController = new RoutineController();
