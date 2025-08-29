import request from 'supertest';
import express from 'express';
import {
  globalLimiter,
  authLimiter,
  apiLimiter,
  resourceLimiter,
} from './rateLimit';

describe('Rate Limiting Middleware', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  describe('globalLimiter', () => {
    beforeEach(() => {
      app.use(globalLimiter);
      app.get('/test', (req, res) =>
        res.status(200).json({ message: 'success' })
      );
      app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
    });

    test('should allow requests within limit', async () => {
      // Make 10 requests (well within the 1000 limit)
      for (let i = 0; i < 10; i++) {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
      }
    });

    test('should skip rate limiting for health checks', async () => {
      // Health checks should not be rate limited
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('authLimiter', () => {
    beforeEach(() => {
      app.use('/auth', authLimiter);
      app.get('/auth/login', (req, res) =>
        res.status(200).json({ message: 'login' })
      );
    });

    test('should apply stricter rate limiting for auth endpoints', async () => {
      // Make requests up to the limit (100)
      for (let i = 0; i < 100; i++) {
        const response = await request(app).get('/auth/login');
        expect(response.status).toBe(200);
      }

      // The 101st request should be rate limited
      const response = await request(app).get('/auth/login');
      expect(response.status).toBe(429);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('apiLimiter', () => {
    beforeEach(() => {
      app.use('/api', apiLimiter);
      app.get('/api/data', (req, res) =>
        res.status(200).json({ data: 'test' })
      );
    });

    test('should apply moderate rate limiting for API endpoints', async () => {
      // Make requests up to the limit (300)
      for (let i = 0; i < 300; i++) {
        const response = await request(app).get('/api/data');
        expect(response.status).toBe(200);
      }

      // The 301st request should be rate limited
      const response = await request(app).get('/api/data');
      expect(response.status).toBe(429);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('resourceLimiter', () => {
    beforeEach(() => {
      app.use('/resources', resourceLimiter);
      app.get('/resources/routines', (req, res) =>
        res.status(200).json({ routines: [] })
      );
    });

    test('should apply rate limiting for resource endpoints', async () => {
      // Make requests up to the limit (100)
      for (let i = 0; i < 100; i++) {
        const response = await request(app).get('/resources/routines');
        expect(response.status).toBe(200);
      }

      // The 101st request should be rate limited
      const response = await request(app).get('/resources/routines');
      expect(response.status).toBe(429);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Rate limit headers', () => {
    beforeEach(() => {
      app.use(globalLimiter);
      app.get('/test', (req, res) =>
        res.status(200).json({ message: 'success' })
      );
    });

    test('should include rate limit headers', async () => {
      const response = await request(app).get('/test');
      expect(response.status).toBe(200);
      expect(response.headers).toHaveProperty('ratelimit-limit');
      expect(response.headers).toHaveProperty('ratelimit-remaining');
      expect(response.headers).toHaveProperty('ratelimit-reset');
    });
  });
});
