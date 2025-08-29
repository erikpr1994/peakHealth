import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { verifySupabaseJWT } from './middleware/auth';
import rateLimit from 'express-rate-limit';
import userRoutinesRoutes from './routes/v1/userRoutines';
import { errorHandler, notFoundHandler } from './utils/error-handler';

// Load environment variables from .env file
// Required variables:
// - PORT: The port to run the server on
// - MONGO_URI: MongoDB connection string
// - SUPABASE_JWT_SECRET: JWT secret from Supabase for token verification
dotenv.config();

const app = express();
app.use(express.json());

// Define a rate limiter: 100 requests per 15 min per IP for sensitive/protected routes
const profileLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

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
  profileLimiter,
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
  profileLimiter, // Add rate limiting to protect against brute force attacks
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

app.listen(port, () => {
  console.log(`Routines service is running on port ${port}`);
});
