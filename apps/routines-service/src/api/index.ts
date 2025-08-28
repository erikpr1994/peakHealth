import { Router } from 'express';
import v1Routes from './v1/index.js';

const router: Router = Router();

// Mount v1 API routes
router.use('/v1', v1Routes);

export default router;
