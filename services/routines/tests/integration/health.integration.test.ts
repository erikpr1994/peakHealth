import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import { healthRouter } from '../../src/api/health';
import { connectToDatabase, closeDatabase } from '../../src/config/database';

// Create a minimal Express app for testing
const app = express();
app.use('/api/health', healthRouter);

describe('Health Endpoint Integration Tests', () => {
  let isDatabaseAvailable = false;

  beforeAll(async () => {
    // Check if database is available
    if (process.env.MONGODB_AVAILABLE === 'false') {
      console.log('⚠️  MongoDB not available, skipping integration tests');
      isDatabaseAvailable = false;
      return;
    }

    try {
      await connectToDatabase();
      isDatabaseAvailable = true;
    } catch {
      console.log('⚠️  Database not available for integration tests, skipping');
      isDatabaseAvailable = false;
    }
  });

  afterAll(async () => {
    // Close database connection if it was established
    if (isDatabaseAvailable) {
      try {
        await closeDatabase();
      } catch (error) {
        console.error('Error closing database connection:', error);
      }
    }
  });

  describe('GET /api/health', () => {
    it('should return healthy status when database is connected', async () => {
      if (!isDatabaseAvailable) {
        console.log('⚠️  Skipping test - database not available');
        return;
      }
      const response = await request(app).get('/api/health').expect(200);

      expect(response.body).toMatchObject({
        status: 'healthy',
        service: 'routines-service',
        environment: 'test',
        database: 'connected',
      });

      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('version');
    });

    it('should return proper content type', async () => {
      if (!isDatabaseAvailable) {
        console.log('⚠️  Skipping test - database not available');
        return;
      }
      const response = await request(app).get('/api/health').expect(200);

      expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    it('should include all required health check fields', async () => {
      if (!isDatabaseAvailable) {
        console.log('⚠️  Skipping test - database not available');
        return;
      }
      const response = await request(app).get('/api/health').expect(200);

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

    it('should return valid timestamp format', async () => {
      if (!isDatabaseAvailable) {
        console.log('⚠️  Skipping test - database not available');
        return;
      }
      const response = await request(app).get('/api/health').expect(200);

      const timestamp = response.body.timestamp;
      expect(new Date(timestamp).getTime()).not.toBeNaN();
      expect(new Date(timestamp)).toBeInstanceOf(Date);
    });

    it('should return valid uptime', async () => {
      if (!isDatabaseAvailable) {
        console.log('⚠️  Skipping test - database not available');
        return;
      }
      const response = await request(app).get('/api/health').expect(200);

      expect(response.body.uptime).toBeGreaterThan(0);
      expect(typeof response.body.uptime).toBe('number');
    });
  });
});
