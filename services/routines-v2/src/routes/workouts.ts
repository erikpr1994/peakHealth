import { Router, Request, Response } from 'express';
import { WorkoutService } from '../services/WorkoutService';
import { verifySupabaseJWT, requireRole } from '../middleware/auth';
import { apiLimiter, resourceLimiter } from '../middleware/rate-limit';
import { asyncHandler } from '../utils/error-handler';
import { logger } from '../utils/logger';

const router: Router = Router();

/**
 * GET /api/v1/workouts
 * Get workouts with filtering and pagination
 */
router.get(
  '/',
  apiLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { type, isPublic, tags, createdBy, page, limit } = req.query;
    const userId = req.user?.id;

    const parsedTags = tags
      ? Array.isArray(tags)
        ? (tags as string[])
        : (tags as string).split(',')
      : undefined;
    const parsedPage = page ? parseInt(page as string, 10) : 1;
    const parsedLimit = Math.min(parseInt(limit as string, 10) || 20, 100);

    const result = await WorkoutService.getWorkouts({
      userId,
      type: type as 'strength',
      isPublic: isPublic ? isPublic === 'true' : undefined,
      tags: parsedTags,
      createdBy: createdBy as string,
      page: parsedPage,
      limit: parsedLimit,
    });

    logger.info('Workouts retrieved successfully', {
      userId,
      count: result.workouts.length,
      totalCount: result.totalCount,
      page: result.page,
    });

    res.json({
      success: true,
      data: result.workouts,
      pagination: {
        currentPage: result.page,
        pageSize: parsedLimit,
        totalItems: result.totalCount,
        totalPages: result.totalPages,
        hasNextPage: result.page < result.totalPages,
        hasPrevPage: result.page > 1,
      },
    });
  })
);

/**
 * GET /api/v1/workouts/:id
 * Get a specific workout by ID
 */
router.get(
  '/:id',
  apiLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;

    const workout = await WorkoutService.getWorkoutById(id, userId);

    logger.info('Workout retrieved successfully', {
      workoutId: id,
      userId,
      workoutType: workout.type,
    });

    res.json({
      success: true,
      data: workout,
    });
  })
);

/**
 * POST /api/v1/workouts/strength
 * Create a new strength workout
 */
router.post(
  '/strength',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const workoutData = req.body;

    const workout = await WorkoutService.createStrengthWorkout(
      userId,
      workoutData
    );

    logger.info('Strength workout created successfully', {
      workoutId: workout._id.toString(),
      userId,
      workoutName: workout.name,
    });

    res.status(201).json({
      success: true,
      data: workout,
    });
  })
);

/**
 * PUT /api/v1/workouts/:id
 * Update a workout
 */
router.put(
  '/:id',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const updateData = req.body;

    const workout = await WorkoutService.updateWorkout(id, userId, updateData);

    logger.info('Workout updated successfully', {
      workoutId: id,
      userId,
      workoutName: workout.name,
    });

    res.json({
      success: true,
      data: workout,
    });
  })
);

/**
 * DELETE /api/v1/workouts/:id
 * Delete a workout
 */
router.delete(
  '/:id',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    await WorkoutService.deleteWorkout(id, userId);

    logger.info('Workout deleted successfully', {
      workoutId: id,
      userId,
    });

    res.status(204).send();
  })
);

/**
 * POST /api/v1/workouts/:id/version
 * Create a new version of a workout template
 */
router.post(
  '/:id/version',
  resourceLimiter,
  verifySupabaseJWT,
  requireRole(['trainer', 'admin']),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const updateData = req.body;

    const newVersion = await WorkoutService.createWorkoutVersion(
      id,
      userId,
      updateData
    );

    logger.info('Workout version created successfully', {
      originalWorkoutId: id,
      newWorkoutId: newVersion._id.toString(),
      version: newVersion.version,
      userId,
    });

    res.status(201).json({
      success: true,
      data: newVersion,
    });
  })
);

/**
 * GET /api/v1/workouts/:parentId/latest
 * Get the latest version of a workout template
 */
router.get(
  '/:parentId/latest',
  apiLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { parentId } = req.params;

    const latestVersion =
      await WorkoutService.getLatestWorkoutVersion(parentId);

    if (!latestVersion) {
      return res.status(404).json({
        success: false,
        error: {
          type: 'https://api.peakhealth.com/errors/not-found',
          title: 'Latest Version Not Found',
          status: 404,
          detail: 'No latest version found for the specified workout template.',
          instance: req.path,
        },
      });
    }

    logger.info('Latest workout version retrieved successfully', {
      parentWorkoutId: parentId,
      latestWorkoutId: latestVersion._id.toString(),
      version: latestVersion.version,
    });

    res.json({
      success: true,
      data: latestVersion,
    });
  })
);

/**
 * PUT /api/v1/workouts/:id/publish
 * Publish a workout template (make it public)
 */
router.put(
  '/:id/publish',
  resourceLimiter,
  verifySupabaseJWT,
  requireRole(['trainer', 'admin']),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const workout = await WorkoutService.updateWorkout(id, userId, {
      isPublic: true,
    });

    logger.info('Workout published successfully', {
      workoutId: id,
      userId,
      workoutName: workout.name,
    });

    res.json({
      success: true,
      data: workout,
    });
  })
);

/**
 * PUT /api/v1/workouts/:id/unpublish
 * Unpublish a workout template (make it private)
 */
router.put(
  '/:id/unpublish',
  resourceLimiter,
  verifySupabaseJWT,
  requireRole(['trainer', 'admin']),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const workout = await WorkoutService.updateWorkout(id, userId, {
      isPublic: false,
    });

    logger.info('Workout unpublished successfully', {
      workoutId: id,
      userId,
      workoutName: workout.name,
    });

    res.json({
      success: true,
      data: workout,
    });
  })
);

export default router;
