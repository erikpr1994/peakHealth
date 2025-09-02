import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './utils/error-handler';
import { verifySupabaseJWT } from './middleware/auth';
import { globalLimiter, authLimiter } from './middleware/rate-limit';
import { logger } from './utils/logger';
import apiRoutes from './routes';

// Load environment variables (suppress output in tests)
dotenv.config({
  debug: process.env.NODE_ENV === 'development' && !process.env.VITEST,
});

const app: Express = express();
const port = process.env.PORT || 3002;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply global rate limiting to all requests
app.use(globalLimiter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'routines-v2',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Test protected endpoint with auth rate limiting
app.get(
  '/api/v1/test-auth',
  authLimiter,
  verifySupabaseJWT,
  (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Authentication successful',
      user: {
        id: req.user?.id,
        email: req.user?.email,
        role: req.user?.role,
      },
      timestamp: new Date().toISOString(),
    });
  }
);

// API routes
app.use('/api/v1', apiRoutes);

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  logger.info(`🚀 Routines V2 service is running on port ${port}`);
  logger.info(`📋 Health check available at: http://localhost:${port}/health`);
});

export default app;
