import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MongoClient } from 'mongodb';
import {
  connectToDatabase,
  getDatabase,
  getClient,
  closeDatabase,
} from './database';

// Mock MongoDB
vi.mock('mongodb', () => ({
  MongoClient: vi.fn(),
}));

describe('Database Configuration', () => {
  let mockClient: any;
  let mockDb: any;

  beforeEach(() => {
    // Reset environment variables
    delete process.env.MONGODB_URI;
    delete process.env.MONGODB_DATABASE;

    // Create mock client and database
    mockDb = {
      command: vi.fn().mockResolvedValue({ ok: 1 }),
    };

    mockClient = {
      connect: vi.fn().mockResolvedValue(undefined),
      db: vi.fn().mockReturnValue(mockDb),
      close: vi.fn().mockResolvedValue(undefined),
    };

    (MongoClient as any).mockImplementation(() => mockClient);
  });

  afterEach(async () => {
    vi.clearAllMocks();
  });

  describe('connectToDatabase', () => {
    it('should connect to MongoDB successfully', async () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
      process.env.MONGODB_DATABASE = 'test_db';

      await connectToDatabase();

      expect(MongoClient).toHaveBeenCalledWith(
        'mongodb://localhost:27017/test',
        {
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        }
      );
      expect(mockClient.connect).toHaveBeenCalled();
      expect(mockClient.db).toHaveBeenCalledWith('test_db');
      expect(mockDb.command).toHaveBeenCalledWith({ ping: 1 });
    });

    it('should throw error when MONGODB_URI is not set', async () => {
      process.env.MONGODB_DATABASE = 'test_db';

      await expect(connectToDatabase()).rejects.toThrow(
        'MONGODB_URI environment variable is not set'
      );
    });

    it('should throw error when MONGODB_DATABASE is not set', async () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

      await expect(connectToDatabase()).rejects.toThrow(
        'MONGODB_DATABASE environment variable is not set'
      );
    });

    it('should throw error when connection fails', async () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
      process.env.MONGODB_DATABASE = 'test_db';

      mockClient.connect.mockRejectedValue(new Error('Connection failed'));

      await expect(connectToDatabase()).rejects.toThrow('Connection failed');
    });

    it('should throw error when ping command fails', async () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
      process.env.MONGODB_DATABASE = 'test_db';

      mockDb.command.mockRejectedValue(new Error('Ping failed'));

      await expect(connectToDatabase()).rejects.toThrow('Ping failed');
    });
  });

  describe('getDatabase', () => {
    it('should return database when connected', async () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
      process.env.MONGODB_DATABASE = 'test_db';

      await connectToDatabase();
      const db = getDatabase();

      expect(db).toBe(mockDb);
    });

    it('should throw error when not connected', async () => {
      // Ensure database is disconnected
      await closeDatabase();
      expect(() => getDatabase()).toThrow(
        'Database not connected. Call connectToDatabase() first.'
      );
    });
  });

  describe('getClient', () => {
    it('should return client when connected', async () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
      process.env.MONGODB_DATABASE = 'test_db';

      await connectToDatabase();
      const client = getClient();

      expect(client).toBe(mockClient);
    });

    it('should throw error when not connected', async () => {
      // Ensure database is disconnected
      await closeDatabase();
      expect(() => getClient()).toThrow(
        'MongoDB client not connected. Call connectToDatabase() first.'
      );
    });
  });

  describe('closeDatabase', () => {
    it('should close database connection successfully', async () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
      process.env.MONGODB_DATABASE = 'test_db';

      await connectToDatabase();
      await closeDatabase();

      expect(mockClient.close).toHaveBeenCalled();
    });

    it('should handle close when not connected', async () => {
      await closeDatabase();

      expect(mockClient.close).not.toHaveBeenCalled();
    });
  });
});
