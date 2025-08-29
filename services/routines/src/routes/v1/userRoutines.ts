import express from 'express';
import { routineController } from '../../controllers/routine.controller';
import { verifySupabaseJWT } from '../../middleware/auth';
import {
  validateRoutineCreate,
  validateRoutineUpdate,
} from '../../middleware/validation';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Define a rate limiter for routine endpoints
const routineLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply authentication middleware to all routes
router.use(verifySupabaseJWT);

// Apply rate limiting to all routes
router.use(routineLimiter);

// Route definitions
router.post('/', validateRoutineCreate, routineController.createRoutine);
router.get('/', routineController.getRoutines);
router.get('/:id', routineController.getRoutineById);
router.put('/:id', validateRoutineUpdate, routineController.updateRoutine);
router.delete('/:id', routineController.deleteRoutine);

export default router;
