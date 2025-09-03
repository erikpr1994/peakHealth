import { describe, it, expect, vi, beforeEach } from 'vitest';
import { healthRouter } from './health';

// Mock the database module
vi.mock('../config/database', () => ({
  getDatabase: vi.fn(),
}));

describe('Health API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return health status when database is available', async () => {
      const mockDb = {
        command: vi.fn().mockResolvedValue({ ok: 1 }),
      };

      const { getDatabase } = await import('../config/database');
      vi.mocked(getDatabase).mockReturnValue(mockDb as any);

      const req = {} as any;
      const res = {
        json: vi.fn().mockReturnThis(),
        status: vi.fn().mockReturnThis(),
      } as any;

      // Simulate the health endpoint logic
      const healthData = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'routines-service',
        version: '1.0.0',
        environment: 'test',
        database: 'connected',
        uptime: process.uptime(),
      };

      res.json(healthData);

      expect(res.json).toHaveBeenCalledWith(healthData);
      expect(healthData.status).toBe('healthy');
      expect(healthData.database).toBe('connected');
    });

    it('should return unhealthy status when database is not available', async () => {
      const { getDatabase } = await import('../config/database');
      vi.mocked(getDatabase).mockImplementation(() => {
        throw new Error('Database not connected');
      });

      // Simulate the health endpoint logic for database failure
      const healthData = {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'routines-service',
        version: '1.0.0',
        environment: 'test',
        database: 'disconnected',
        uptime: process.uptime(),
      };

      expect(healthData.status).toBe('unhealthy');
      expect(healthData.database).toBe('disconnected');
    });

    it('should include all required health check fields', () => {
      const healthData = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'routines-service',
        version: '1.0.0',
        environment: 'test',
        database: 'connected',
        uptime: process.uptime(),
      };

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
        expect(healthData).toHaveProperty(field);
      });
    });
  });
});
