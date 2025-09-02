import { Router, Request, Response } from 'express';
import { RoutineAssignmentService } from '../services/RoutineAssignmentService';
import { verifySupabaseJWT, requireRole } from '../middleware/auth';
import { apiLimiter, resourceLimiter } from '../middleware/rate-limit';
import { asyncHandler } from '../utils/error-handler';
import { logger } from '../utils/logger';

const router: Router = Router();

/**
 * @route   GET /api/v1/assignments
 * @desc    Get assignments with filtering and pagination
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
      sortBy = 'assignedAt',
      sortOrder = 'desc',
      userId,
      trainerId,
      status,
      parentRoutineId,
      startDate,
      endDate,
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

    if (userId) filters.userId = userId as string;
    if (trainerId) filters.trainerId = trainerId as string;
    if (status) filters.status = status as string;
    if (parentRoutineId) filters.parentRoutineId = parentRoutineId as string;
    if (startDate) filters.startDate = new Date(startDate as string);
    if (endDate) filters.endDate = new Date(endDate as string);

    const result = await RoutineAssignmentService.getAssignments(
      filters,
      req.user!.id,
      req.user?.role
    );

    logger.debug('Assignments fetched successfully', {
      userId: req.user?.id,
      filters,
      count: result.assignments.length,
    });

    res.json({
      success: true,
      data: result.assignments,
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
 * @route   GET /api/v1/assignments/:id
 * @desc    Get assignment by ID
 * @access  Protected
 */
router.get(
  '/:id',
  apiLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const assignment = await RoutineAssignmentService.getAssignmentById(
      id,
      req.user!.id,
      req.user?.role
    );

    logger.debug('Assignment fetched successfully', {
      assignmentId: id,
      requestorId: req.user?.id,
    });

    res.json({
      success: true,
      data: assignment,
    });
  })
);

/**
 * @route   POST /api/v1/assignments
 * @desc    Create a new routine assignment
 * @access  Protected (Trainer or Admin)
 */
router.post(
  '/',
  resourceLimiter,
  verifySupabaseJWT,
  requireRole(['trainer', 'admin']),
  asyncHandler(async (req: Request, res: Response) => {
    const assignmentData = {
      ...req.body,
      trainerId: req.user!.id, // Set the trainer as the creator
    };

    const assignment =
      await RoutineAssignmentService.createAssignment(assignmentData);

    logger.info('Assignment created successfully', {
      assignmentId: assignment._id,
      trainerId: req.user!.id,
      userId: assignment.userId,
    });

    res.status(201).json({
      success: true,
      data: assignment,
      message: 'Assignment created successfully',
    });
  })
);

/**
 * @route   PUT /api/v1/assignments/:id
 * @desc    Update assignment
 * @access  Protected (Trainer or Admin)
 */
router.put(
  '/:id',
  resourceLimiter,
  verifySupabaseJWT,
  requireRole(['trainer', 'admin']),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const assignment = await RoutineAssignmentService.updateAssignment(
      id,
      req.user!.id,
      updateData,
      req.user?.role
    );

    logger.info('Assignment updated successfully', {
      assignmentId: id,
      requestorId: req.user!.id,
      updatedFields: Object.keys(updateData),
    });

    res.json({
      success: true,
      data: assignment,
      message: 'Assignment updated successfully',
    });
  })
);

/**
 * @route   DELETE /api/v1/assignments/:id
 * @desc    Delete assignment
 * @access  Protected (Trainer or Admin)
 */
router.delete(
  '/:id',
  resourceLimiter,
  verifySupabaseJWT,
  requireRole(['trainer', 'admin']),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await RoutineAssignmentService.deleteAssignment(
      id,
      req.user!.id,
      req.user?.role
    );

    logger.info('Assignment deleted successfully', {
      assignmentId: id,
      requestorId: req.user!.id,
    });

    res.json({
      success: true,
      message: 'Assignment deleted successfully',
    });
  })
);

/**
 * @route   PATCH /api/v1/assignments/:id/progress
 * @desc    Update assignment progress
 * @access  Protected
 */
router.patch(
  '/:id/progress',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const progressData = req.body;

    // Validate required fields
    if (typeof progressData.completedWorkouts !== 'number') {
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

    const assignment = await RoutineAssignmentService.updateProgress(
      id,
      userId,
      progressData
    );

    logger.info('Assignment progress updated successfully', {
      assignmentId: id,
      userId,
      completedWorkouts: progressData.completedWorkouts,
    });

    res.json({
      success: true,
      data: assignment,
      message: 'Assignment progress updated successfully',
    });
  })
);

/**
 * @route   PATCH /api/v1/assignments/:id/complete
 * @desc    Complete assignment
 * @access  Protected
 */
router.patch(
  '/:id/complete',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const { feedback } = req.body;

    const assignment = await RoutineAssignmentService.completeAssignment(
      id,
      userId,
      feedback
    );

    logger.info('Assignment completed successfully', {
      assignmentId: id,
      userId,
      hasFeedback: !!feedback,
    });

    res.json({
      success: true,
      data: assignment,
      message: 'Assignment completed successfully',
    });
  })
);

/**
 * @route   PATCH /api/v1/assignments/:id/pause
 * @desc    Pause assignment
 * @access  Protected
 */
router.patch(
  '/:id/pause',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const assignment = await RoutineAssignmentService.pauseAssignment(
      id,
      req.user!.id,
      req.user?.role
    );

    logger.info('Assignment paused successfully', {
      assignmentId: id,
      requestorId: req.user!.id,
    });

    res.json({
      success: true,
      data: assignment,
      message: 'Assignment paused successfully',
    });
  })
);

/**
 * @route   PATCH /api/v1/assignments/:id/resume
 * @desc    Resume assignment
 * @access  Protected
 */
router.patch(
  '/:id/resume',
  resourceLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const assignment = await RoutineAssignmentService.resumeAssignment(
      id,
      req.user!.id,
      req.user?.role
    );

    logger.info('Assignment resumed successfully', {
      assignmentId: id,
      requestorId: req.user!.id,
    });

    res.json({
      success: true,
      data: assignment,
      message: 'Assignment resumed successfully',
    });
  })
);

/**
 * @route   GET /api/v1/assignments/user/active
 * @desc    Get user's active assignments
 * @access  Protected
 */
router.get(
  '/user/active',
  apiLimiter,
  verifySupabaseJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const assignments =
      await RoutineAssignmentService.getUserActiveAssignments(userId);

    logger.debug('User active assignments fetched', {
      userId,
      count: assignments.length,
    });

    res.json({
      success: true,
      data: assignments,
    });
  })
);

/**
 * @route   GET /api/v1/assignments/trainer/:trainerId
 * @desc    Get trainer's assignments
 * @access  Protected (Trainer or Admin)
 */
router.get(
  '/trainer/:trainerId',
  apiLimiter,
  verifySupabaseJWT,
  requireRole(['trainer', 'admin']),
  asyncHandler(async (req: Request, res: Response) => {
    const { trainerId } = req.params;
    const { status } = req.query;

    // Non-admin users can only see their own assignments
    const actualTrainerId =
      req.user?.role === 'admin' ? trainerId : req.user!.id;

    const assignments = await RoutineAssignmentService.getTrainerAssignments(
      actualTrainerId,
      status as string
    );

    logger.debug('Trainer assignments fetched', {
      trainerId: actualTrainerId,
      requestorId: req.user!.id,
      status,
      count: assignments.length,
    });

    res.json({
      success: true,
      data: assignments,
    });
  })
);

/**
 * @route   GET /api/v1/assignments/overdue
 * @desc    Get overdue assignments
 * @access  Protected (Admin only)
 */
router.get(
  '/overdue',
  apiLimiter,
  verifySupabaseJWT,
  requireRole(['admin']),
  asyncHandler(async (req: Request, res: Response) => {
    const assignments = await RoutineAssignmentService.getOverdueAssignments();

    logger.debug('Overdue assignments fetched', {
      requestorId: req.user!.id,
      count: assignments.length,
    });

    res.json({
      success: true,
      data: assignments,
    });
  })
);

export default router;
