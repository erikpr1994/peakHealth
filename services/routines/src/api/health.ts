import { Router, Request, Response } from 'express';
import { getDatabase } from '../config/database';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Check database connection
    const db = getDatabase();
    await db.command({ ping: 1 });

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'routines-service',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: 'connected',
      uptime: process.uptime(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'routines-service',
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export { router as healthRouter };
