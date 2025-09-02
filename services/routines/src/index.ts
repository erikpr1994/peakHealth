import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { verifySupabaseJWT } from './middleware/auth';
import { globalLimiter, authLimiter } from './middleware/rateLimit';
import userRoutinesRoutes from './routes/v1/userRoutines';
import { errorHandler, notFoundHandler } from './utils/error-handler';
import { initializeHypertune, shutdownHypertune } from './config/hypertune';

// Load environment variables from .env file
// Required variables:
// - PORT: The port to run the server on
// - MONGO_URI: MongoDB connection string
// - SUPABASE_JWT_SECRET: JWT secret from Supabase for token verification
dotenv.config();

const app = express();
app.use(express.json());

// Apply global rate limiting to all requests
app.use(globalLimiter);

const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/routines';

mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Public health check endpoint (no authentication required)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

// Register API routes
app.use('/api/routines', userRoutinesRoutes);

// Example of a protected endpoint using the JWT verification middleware
app.get(
  '/api/user/profile',
  authLimiter, // Use stricter rate limiting for authentication endpoints
  verifySupabaseJWT,
  (req: Request, res: Response) => {
    // The middleware has already verified the token and attached the user to the request
    res.status(200).json({
      userId: req.user?.id,
      message: 'Protected endpoint accessed successfully',
    });
  }
);

// Temporary protected test route for authentication testing
app.get(
  '/api/v1/protected-test',
  authLimiter, // Use stricter rate limiting for authentication endpoints
  verifySupabaseJWT,
  (req: Request, res: Response) => {
    res.status(200).json({
      userId: req.user?.id,
      email: req.user?.email,
      role: req.user?.role,
      message: 'Authentication successful',
    });
  }
);

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res);
});

// Initialize Hypertune before starting the server
initializeHypertune()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Routines service is running on port ${port}`);
    });

    // Handle graceful shutdown
    const gracefulShutdown = async () => {
      console.log('Shutting down gracefully...');
      await shutdownHypertune();
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    // Listen for termination signals
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  })
  .catch(err => {
    console.error('Failed to start the server:', err);
    process.exit(1);
  });
