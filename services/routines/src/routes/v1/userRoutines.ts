import express, { Router } from 'express';
import { routineController } from '../../controllers/routine.controller';
import { verifySupabaseJWT } from '../../middleware/auth';
import {
  validateRoutineCreate,
  validateRoutineUpdate,
} from '../../middleware/validation';
import { resourceLimiter } from '../../middleware/rateLimit';

const router = express.Router() as Router;

// Apply authentication middleware to all routes
router.use(verifySupabaseJWT);

// Apply rate limiting to all routes
router.use(resourceLimiter);

// Route definitions
router.post('/', validateRoutineCreate, routineController.createRoutine);
router.get('/', routineController.getRoutines);
router.get('/:id', routineController.getRoutineById);
router.put('/:id', validateRoutineUpdate, routineController.updateRoutine);
router.delete('/:id', routineController.deleteRoutine);

export default router;
