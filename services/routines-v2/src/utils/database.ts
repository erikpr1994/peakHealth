import mongoose from 'mongoose';
import { createApiError } from './error-handler';
import { logger } from './logger';

/**
 * Database connection configuration
 */
interface DatabaseConfig {
  uri: string;
  options?: mongoose.ConnectOptions;
}

/**
 * MongoDB connection utility class
 */
export class Database {
  private static instance: Database;
  private connection: typeof mongoose | null = null;
  private isConnecting = false;

  private constructor() {}

  /**
   * Get singleton instance of Database
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * Connect to MongoDB
   */
  public async connect(config?: DatabaseConfig): Promise<typeof mongoose> {
    if (this.connection?.connection.readyState === 1) {
      logger.debug('✅ MongoDB already connected');
      return this.connection;
    }

    if (this.isConnecting) {
      logger.debug('⏳ MongoDB connection in progress...');
      // Wait for the connection to complete
      while (this.isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      if (this.connection) {
        return this.connection;
      }
    }

    this.isConnecting = true;

    try {
      const uri =
        config?.uri ||
        process.env.MONGODB_URI ||
        'mongodb://localhost:27017/routines-v2';

      const defaultOptions: mongoose.ConnectOptions = {
        // Connection options
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
        // Database options
        bufferCommands: false, // Disable mongoose buffering
      };

      const options = { ...defaultOptions, ...config?.options };

      logger.info(
        `🔌 Connecting to MongoDB at ${uri.replace(/\/\/.*@/, '//***:***@')}`
      );

      this.connection = await mongoose.connect(uri, options);

      logger.info('✅ MongoDB connected successfully');

      // Handle connection events
      this.connection.connection.on('error', error => {
        logger.error('❌ MongoDB connection error:', error);
      });

      this.connection.connection.on('disconnected', () => {
        logger.warn('⚠️ MongoDB disconnected');
        this.connection = null;
      });

      this.connection.connection.on('reconnected', () => {
        logger.info('🔄 MongoDB reconnected');
      });

      return this.connection;
    } catch (error) {
      logger.error('❌ Failed to connect to MongoDB:', error);
      throw createApiError.serverError(
        `Database connection failed: ${error instanceof Error ? error.message : 'Unknown database error'}`
      );
    } finally {
      this.isConnecting = false;
    }
  }

  /**
   * Disconnect from MongoDB
   */
  public async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.disconnect();
      this.connection = null;
      logger.info('🔌 MongoDB disconnected');
    }
  }

  /**
   * Get current connection status
   */
  public getConnectionStatus(): {
    isConnected: boolean;
    readyState: number;
    host?: string;
    database?: string;
  } {
    const connection = this.connection?.connection;
    return {
      isConnected: connection?.readyState === 1,
      readyState: connection?.readyState || 0,
      host: connection?.host,
      database: connection?.db?.databaseName,
    };
  }

  /**
   * Check if database is healthy
   */
  public async healthCheck(): Promise<{
    status: 'healthy' | 'unhealthy';
    details: {
      isConnected: boolean;
      readyState: number;
      responseTime?: number;
      error?: string;
    };
  }> {
    const startTime = Date.now();

    try {
      if (!this.connection || this.connection.connection.readyState !== 1) {
        return {
          status: 'unhealthy',
          details: {
            isConnected: false,
            readyState: this.connection?.connection.readyState || 0,
            error: 'Not connected to database',
          },
        };
      }

      // Perform a simple ping to check database responsiveness
      await this.connection.connection.db?.admin().ping();

      const responseTime = Date.now() - startTime;

      return {
        status: 'healthy',
        details: {
          isConnected: true,
          readyState: 1,
          responseTime,
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        details: {
          isConnected: false,
          readyState: this.connection?.connection.readyState || 0,
          responseTime: Date.now() - startTime,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  /**
   * Drop database (use with caution - mainly for testing)
   */
  public async dropDatabase(): Promise<void> {
    if (!this.connection) {
      throw createApiError.serverError('No database connection available');
    }

    if (process.env.NODE_ENV === 'production') {
      throw createApiError.badRequest(
        'Cannot drop database in production environment'
      );
    }

    await this.connection.connection.db?.dropDatabase();
    logger.info('🗑️ Database dropped');
  }
}

/**
 * Get database instance
 */
export const db = Database.getInstance();

/**
 * Connection helper for easy import
 */
export const connectToDatabase = (config?: DatabaseConfig) =>
  db.connect(config);

/**
 * MongoDB connection states
 */
export const ConnectionStates = {
  DISCONNECTED: 0,
  CONNECTED: 1,
  CONNECTING: 2,
  DISCONNECTING: 3,
} as const;

/**
 * Type for connection state values
 */
export type ConnectionState =
  (typeof ConnectionStates)[keyof typeof ConnectionStates];
