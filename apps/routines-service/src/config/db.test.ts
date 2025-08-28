import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MongoClient } from 'mongodb';
import {
  connectToDatabase,
  disconnectFromDatabase,
  getDatabase,
} from './db.js';

// Mock MongoDB
vi.mock('mongodb', () => ({
  MongoClient: vi.fn(),
}));

describe('Database Configuration', () => {
  const mockDb = {
    admin: vi.fn().mockReturnValue({
      ping: vi.fn().mockResolvedValue({}),
    }),
  };

  const mockClient = {
    connect: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined),
    db: vi.fn().mockReturnValue(mockDb),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (MongoClient as any).mockImplementation(() => mockClient);
  });

  afterEach(async () => {
    await disconnectFromDatabase();
  });

  describe('connectToDatabase', () => {
    it('should connect to MongoDB successfully', async () => {
      const db = await connectToDatabase();

      expect(MongoClient).toHaveBeenCalledWith(
        'mongodb://localhost:27017/peakhealth'
      );
      expect(mockClient.connect).toHaveBeenCalled();
      expect(mockClient.db).toHaveBeenCalled();
      expect(mockDb.admin().ping).toHaveBeenCalled();
      expect(db).toBe(mockDb);
    });

    it('should use environment variable for MongoDB URI', async () => {
      const originalEnv = process.env.MONGODB_URI;
      process.env.MONGODB_URI = 'mongodb://test:27017/testdb';

      await connectToDatabase();

      expect(MongoClient).toHaveBeenCalledWith('mongodb://test:27017/testdb');

      process.env.MONGODB_URI = originalEnv;
    });

    it('should return existing connection if already connected', async () => {
      const db1 = await connectToDatabase();
      const db2 = await connectToDatabase();

      expect(db1).toBe(db2);
      expect(MongoClient).toHaveBeenCalledTimes(1);
    });
  });

  describe('disconnectFromDatabase', () => {
    it('should close the database connection', async () => {
      await connectToDatabase();
      await disconnectFromDatabase();

      expect(mockClient.close).toHaveBeenCalled();
    });

    it('should handle disconnection when not connected', async () => {
      await expect(disconnectFromDatabase()).resolves.not.toThrow();
    });
  });

  describe('getDatabase', () => {
    it('should return database instance when connected', async () => {
      await connectToDatabase();
      const db = getDatabase();

      expect(db).toBe(mockDb);
    });

    it('should throw error when not connected', () => {
      expect(() => getDatabase()).toThrow('Database not connected');
    });
  });
});
