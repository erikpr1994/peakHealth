/**
 * Routes Index
 *
 * Centralized export for all API routes used in the routines service.
 */

import { Router } from 'express';
import routinesRouter from './routines';
import assignmentsRouter from './assignments';

const router: Router = Router();

// Mount route modules
router.use('/routines', routinesRouter);
router.use('/assignments', assignmentsRouter);

export default router;
