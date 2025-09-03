import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectToDatabase, closeDatabase } from './config/database';
import { healthRouter } from './api/health';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

// Store server instance for graceful shutdown
let server: any;

// Graceful shutdown function
async function gracefulShutdown(signal: string) {
  console.log(`\n${signal} received, shutting down gracefully...`);

  if (server) {
    // Close the server first (stops accepting new connections)
    server.close((err: any) => {
      if (err) {
        console.error('Error during server close:', err);
        process.exit(1);
      }

      console.log('✅ HTTP server closed');

      // Close database connection after server is closed
      closeDatabase()
        .then(() => {
          console.log('✅ Graceful shutdown completed');
          process.exit(0);
        })
        .catch(error => {
          console.error('❌ Error during database close:', error);
          process.exit(1);
        });
    });

    // Force close after 30 seconds if graceful shutdown fails
    setTimeout(() => {
      console.error(
        '❌ Could not close connections in time, forcefully shutting down'
      );
      process.exit(1);
    }, 30000);
  } else {
    // If server hasn't started yet, just close database and exit
    await closeDatabase();
    process.exit(0);
  }
}

// Start server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    console.log('✅ Connected to MongoDB');

    // Start Express server and store the instance
    server = app.listen(PORT, () => {
      console.log(`🚀 Routines service running on port ${PORT}`);
      console.log(
        `📊 Health check available at http://localhost:${PORT}/api/health`
      );
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();
