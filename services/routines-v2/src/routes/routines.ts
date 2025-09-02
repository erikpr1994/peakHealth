import { Router, Request, Response } from 'express';
import { RoutineService } from '../services/RoutineService';
import { verifySupabaseJWT, requireRole } from '../middleware/auth';
import { apiLimiter, resourceLimiter } from '../middleware/rate-limit';
import { asyncHandler } from '../utils/error-handler';
import { logger } from '../utils/logger';

const router: Router = Router();

/**
 * @route   GET /api/v1/routines
 * @desc    Get routines with filtering and pagination
 * @access  Protected
 */
router.get(
  '/',
  apiLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const {
      page = '1',
      limit = '20',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      difficulty,
      goal,
      isActive,
      isFavorite,
      isPublic,
      templateType,
      tags,
      userId,
    } = req.query;

    // Parse pagination
    const pageNum = Math.max(1, parseInt(page as string));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string)));
    const offset = (pageNum - 1) * limitNum;

    // Build filters
    const filters: any = {
      limit: limitNum,
      offset,
      sortBy: sortBy as string,
      sortOrder: sortOrder as 'asc' | 'desc',
    };

    if (search) filters.search = search as string;
    if (difficulty) filters.difficulty = difficulty as string;
    if (goal) filters.goal = goal as string;
    if (isActive !== undefined) filters.isActive = isActive === 'true';
    if (isFavorite !== undefined) filters.isFavorite = isFavorite === 'true';
    if (isPublic !== undefined) filters.isPublic = isPublic === 'true';
    if (templateType) filters.templateType = templateType as string;
    if (tags) {
      filters.tags = Array.isArray(tags)
        ? (tags as string[])
        : (tags as string).split(',');
    }

    // Non-admin users can only see their own routines by default
    if (req.user?.role !== 'admin' && !userId) {
      filters.userId = req.user?.id;
    } else if (userId && req.user?.role === 'admin') {
      filters.userId = userId as string;
    }

    const result = await RoutineService.getRoutines(filters);

    logger.debug('Routines fetched successfully', {
      userId: req.user?.id,
      filters,
      count: result.routines.length,
    });

    res.json({
      success: true,
      data: result.routines,
      pagination: {
        page: result.page,
        pageSize: result.pageSize,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  })
);

/**
 * @route   GET /api/v1/routines/:id
 * @desc    Get routine by ID
 * @access  Protected
 */
router.get(
  '/:id',
  apiLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;

    const routine = await RoutineService.getRoutineById(id, userId);

    logger.debug('Routine fetched successfully', {
      routineId: id,
      userId,
      routineType: routine.routineType,
    });

    res.json({
      success: true,
      data: routine,
    });
  })
);

/**
 * @route   POST /api/v1/routines
 * @desc    Create a new user routine
 * @access  Protected
 */
router.post(
  '/',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const routineData = req.body;

    const routine = await RoutineService.createUserRoutine(userId, routineData);

    logger.info('User routine created successfully', {
      routineId: routine._id,
      userId,
      name: routine.name,
    });

    res.status(201).json({
      success: true,
      data: routine,
      message: 'Routine created successfully',
    });
  })
);

/**
 * @route   POST /api/v1/routines/templates
 * @desc    Create a new template routine
 * @access  Protected (Trainer or Admin)
 */
router.post(
  '/templates',
  resourceLimiter,
  verifySupabaseJWT,
  requireRole(['trainer', 'admin']),
  asyncHandler(async (req: Request, res: Response) => {
    const createdBy = req.user!.id;
    const templateData = req.body;

    const routine = await RoutineService.createTemplateRoutine(
      createdBy,
      templateData
    );

    logger.info('Template routine created successfully', {
      routineId: routine._id,
      createdBy,
      name: routine.name,
      version: (routine as any).version,
    });

    res.status(201).json({
      success: true,
      data: routine,
      message: 'Template routine created successfully',
    });
  })
);

/**
 * @route   PUT /api/v1/routines/:id
 * @desc    Update routine
 * @access  Protected
 */
router.put(
  '/:id',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const updateData = req.body;

    const routine = await RoutineService.updateRoutine(id, userId, updateData);

    logger.info('Routine updated successfully', {
      routineId: id,
      userId,
      updatedFields: Object.keys(updateData),
    });

    res.json({
      success: true,
      data: routine,
      message: 'Routine updated successfully',
    });
  })
);

/**
 * @route   DELETE /api/v1/routines/:id
 * @desc    Delete routine
 * @access  Protected
 */
router.delete(
  '/:id',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    await RoutineService.deleteRoutine(id, userId);

    logger.info('Routine deleted successfully', {
      routineId: id,
      userId,
    });

    res.json({
      success: true,
      message: 'Routine deleted successfully',
    });
  })
);

/**
 * @route   POST /api/v1/routines/:id/copy
 * @desc    Copy a template routine to create a user routine
 * @access  Protected
 */
router.post(
  '/:id/copy',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const customizations = req.body;

    const routine = await RoutineService.copyTemplateRoutine(
      id,
      userId,
      customizations
    );

    logger.info('Template routine copied successfully', {
      templateId: id,
      newRoutineId: routine._id,
      userId,
    });

    res.status(201).json({
      success: true,
      data: routine,
      message: 'Template routine copied successfully',
    });
  })
);

/**
 * @route   GET /api/v1/routines/user/active
 * @desc    Get user's active routines
 * @access  Protected
 */
router.get(
  '/user/active',
  apiLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const routines = await RoutineService.getUserActiveRoutines(userId);

    logger.debug('User active routines fetched', {
      userId,
      count: routines.length,
    });

    res.json({
      success: true,
      data: routines,
    });
  })
);

/**
 * @route   GET /api/v1/routines/user/favorites
 * @desc    Get user's favorite routines
 * @access  Protected
 */
router.get(
  '/user/favorites',
  apiLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const routines = await RoutineService.getUserFavoriteRoutines(userId);

    logger.debug('User favorite routines fetched', {
      userId,
      count: routines.length,
    });

    res.json({
      success: true,
      data: routines,
    });
  })
);

/**
 * @route   PATCH /api/v1/routines/:id/progress
 * @desc    Update routine progress
 * @access  Protected
 */
router.patch(
  '/:id/progress',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const { completedWorkouts } = req.body;

    if (typeof completedWorkouts !== 'number') {
      return res.status(400).json({
        success: false,
        error: {
          type: 'https://httpstatuses.com/400',
          title: 'Bad Request',
          status: 400,
          detail: 'completedWorkouts must be a number',
          instance: req.originalUrl,
        },
      });
    }

    const routine = await RoutineService.updateRoutineProgress(
      id,
      userId,
      completedWorkouts
    );

    logger.info('Routine progress updated successfully', {
      routineId: id,
      userId,
      completedWorkouts,
    });

    res.json({
      success: true,
      data: routine,
      message: 'Routine progress updated successfully',
    });
  })
);

export default router;
