import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { healthRouter } from './health';

// Mock the database module
vi.mock('../config/database', () => ({
  getDatabase: vi.fn(),
}));

describe('Health API', () => {
  let app: express.Application;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a fresh Express app for each test
    app = express();
    app.use('/health', healthRouter);
  });

  describe('GET /health', () => {
    it('should return health status when database is available', async () => {
      const mockDb = {
        command: vi.fn().mockResolvedValue({ ok: 1 }),
      };

      const { getDatabase } = await import('../config/database');
      vi.mocked(getDatabase).mockReturnValue(mockDb as any);

      const response = await request(app).get('/health').expect(200);

      expect(response.body).toMatchObject({
        status: 'healthy',
        service: 'routines-service',
        database: 'connected',
      });

      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('uptime');

      // Verify database was actually called
      expect(getDatabase).toHaveBeenCalled();
      expect(mockDb.command).toHaveBeenCalledWith({ ping: 1 });
    });

    it('should return unhealthy status when database is not available', async () => {
      const { getDatabase } = await import('../config/database');
      vi.mocked(getDatabase).mockImplementation(() => {
        throw new Error('Database not connected');
      });

      const response = await request(app).get('/health').expect(503);

      expect(response.body).toMatchObject({
        status: 'unhealthy',
        service: 'routines-service',
        error: 'Database connection failed',
        details: 'Database not connected',
      });

      expect(response.body).toHaveProperty('timestamp');

      // Verify database was actually called
      expect(getDatabase).toHaveBeenCalled();
    });

    it('should return unhealthy status when database ping fails', async () => {
      const mockDb = {
        command: vi.fn().mockRejectedValue(new Error('Connection timeout')),
      };

      const { getDatabase } = await import('../config/database');
      vi.mocked(getDatabase).mockReturnValue(mockDb as any);

      const response = await request(app).get('/health').expect(503);

      expect(response.body).toMatchObject({
        status: 'unhealthy',
        service: 'routines-service',
        error: 'Database connection failed',
        details: 'Connection timeout',
      });

      expect(response.body).toHaveProperty('timestamp');

      // Verify database was actually called
      expect(getDatabase).toHaveBeenCalled();
      expect(mockDb.command).toHaveBeenCalledWith({ ping: 1 });
    });

    it('should include all required health check fields when healthy', async () => {
      const mockDb = {
        command: vi.fn().mockResolvedValue({ ok: 1 }),
      };

      const { getDatabase } = await import('../config/database');
      vi.mocked(getDatabase).mockReturnValue(mockDb as any);

      const response = await request(app).get('/health').expect(200);

      const requiredFields = [
        'status',
        'timestamp',
        'service',
        'version',
        'environment',
        'database',
        'uptime',
      ];

      requiredFields.forEach(field => {
        expect(response.body).toHaveProperty(field);
      });
    });
  });
});
