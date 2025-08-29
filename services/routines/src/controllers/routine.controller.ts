import { Request, Response, NextFunction } from 'express';
import { routineService } from '../services/routine.service';
import { ApiError } from '../utils/error-handler';

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
   * Get all routines for the authenticated user
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

      // Get routines using the service
      const routines = await routineService.getRoutinesByUser(userId, type);

      // Return success response with the routines
      return res.status(200).json({ routines });
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
}

// Export a singleton instance
export const routineController = new RoutineController();

