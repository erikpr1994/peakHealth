import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db.js';

// Load environment variables
dotenv.config();

const app: express.Application = express();
const PORT = process.env.PORT || 3002; // Different port for routines service

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
    ],
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'routines-service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Service info endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'PeakHealth Routines Service',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      health: '/health',
      api: '/api/v1',
    },
  });
});

// API routes (will be implemented in future tickets)
app.use('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'PeakHealth Routines API v1',
    status: 'operational',
    endpoints: {
      routines: '/api/v1/routines',
      library: '/api/v1/library',
    },
  });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    service: 'routines-service',
  });
});

// Global error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // eslint-disable-next-line no-console
    console.error('Unhandled error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        process.env.NODE_ENV === 'production'
          ? 'Something went wrong'
          : err.message,
      service: 'routines-service',
    });
  }
);

// Initialize database connection and start server
async function startServer(): Promise<void> {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Start server
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 PeakHealth Routines Service running on port ${PORT}`);
      // eslint-disable-next-line no-console
      console.log(
        `📊 Health check available at http://localhost:${PORT}/health`
      );
      // eslint-disable-next-line no-console
      console.log(`🔗 Service info available at http://localhost:${PORT}/`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Only start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export default app;
