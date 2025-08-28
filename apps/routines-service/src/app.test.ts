import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

// Mock the database connection
vi.mock('./config/db.js', () => ({
  connectToDatabase: vi.fn().mockResolvedValue({}),
}));

// Import app after mocking
import app from './app.js';

describe('Routines Service', () => {
  let server: any;

  beforeAll(() => {
    server = app.listen(0); // Use random port for testing
  });

  afterAll(() => {
    server.close();
  });

  describe('Health Check', () => {
    it('should return 200 OK for health check', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'OK',
        service: 'routines-service',
      });
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.uptime).toBeDefined();
    });
  });

  describe('Service Info', () => {
    it('should return service information', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        service: 'PeakHealth Routines Service',
        version: '1.0.0',
        status: 'operational',
      });
      expect(response.body.endpoints).toBeDefined();
    });
  });

  describe('API v1', () => {
    it('should return API version information', async () => {
      const response = await request(app).get('/api/v1');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        message: 'PeakHealth Routines API v1',
        status: 'operational',
      });
      expect(response.body.endpoints).toBeDefined();
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        error: 'Not Found',
        service: 'routines-service',
      });
    });
  });
});
