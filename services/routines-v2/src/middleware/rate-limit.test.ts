import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express, { Express } from 'express';
import {
  globalLimiter,
  authLimiter,
  apiLimiter,
  resourceLimiter,
  premiumLimiter,
  createCustomLimiter,
} from './rate-limit';

describe('Rate Limiting Middleware', () => {
  let app: Express;

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

    it('should allow requests within limit', async () => {
      // Make 10 requests (well within the 1000 limit)
      for (let i = 0; i < 10; i++) {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
        expect(response.headers).toHaveProperty('ratelimit');
      }
    });

    it('should skip rate limiting for health checks', async () => {
      // Health checks should not be rate limited
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });

    it('should include standard rate limit headers', async () => {
      const response = await request(app).get('/test');
      expect(response.status).toBe(200);
      expect(response.headers).toHaveProperty('ratelimit');
      // The header should contain limit info in draft-8 format: "1000-in-15min"
      expect(response.headers.ratelimit).toContain('1000-in-15min');
    });

    it('should return 429 when limit exceeded', async () => {
      // This test is challenging because we'd need to make 1000+ requests
      // Instead, we'll create a custom limiter with a very low limit for testing
      const testApp = express();
      const lowLimiter = createCustomLimiter({
        limit: 2,
        windowMs: 60000,
        message: 'Test limit exceeded',
      });

      testApp.use(lowLimiter);
      testApp.get('/test', (req, res) => res.json({ success: true }));

      // First two requests should succeed
      await request(testApp).get('/test').expect(200);
      await request(testApp).get('/test').expect(200);

      // Third request should be rate limited
      const response = await request(testApp).get('/test');
      expect(response.status).toBe(429);
      expect(response.body).toEqual({
        type: 'https://api.peakhealth.com/errors/rate-limit-exceeded',
        title: 'Rate Limit Exceeded',
        status: 429,
        detail: 'Test limit exceeded',
        instance: '/test',
        retryAfter: 60,
      });
    });
  });

  describe('authLimiter', () => {
    beforeEach(() => {
      app.use('/auth', authLimiter);
      app.post('/auth/login', (req, res) =>
        res.status(200).json({ message: 'login' })
      );
    });

    it('should apply auth-specific rate limiting', async () => {
      // Make several requests within the auth limit (100)
      for (let i = 0; i < 5; i++) {
        const response = await request(app).post('/auth/login');
        expect(response.status).toBe(200);
        expect(response.headers).toHaveProperty('ratelimit');
        expect(response.headers.ratelimit).toContain('100-in-15min');
      }
    });

    it('should have appropriate auth error message when exceeded', async () => {
      // Create a test app with very low auth limit
      const testApp = express();
      const lowAuthLimiter = createCustomLimiter({
        limit: 1,
        windowMs: 60000,
        message: 'Too many authentication attempts, please try again later.',
      });

      testApp.use('/auth', lowAuthLimiter);
      testApp.post('/auth/login', (req, res) => res.json({ success: true }));

      // First request succeeds
      await request(testApp).post('/auth/login').expect(200);

      // Second request should be rate limited with auth-specific message
      const response = await request(testApp).post('/auth/login');
      expect(response.status).toBe(429);
      expect(response.body.detail).toContain('authentication attempts');
    });
  });

  describe('apiLimiter', () => {
    beforeEach(() => {
      app.use('/api', apiLimiter);
      app.get('/api/data', (req, res) =>
        res.status(200).json({ data: 'test' })
      );
    });

    it('should apply moderate rate limiting for API endpoints', async () => {
      // Make several requests within the API limit (300)
      for (let i = 0; i < 5; i++) {
        const response = await request(app).get('/api/data');
        expect(response.status).toBe(200);
        expect(response.headers).toHaveProperty('ratelimit');
        expect(response.headers.ratelimit).toContain('300-in-15min');
      }
    });
  });

  describe('resourceLimiter', () => {
    beforeEach(() => {
      app.use('/resources', resourceLimiter);
      app.get('/resources/routines', (req, res) =>
        res.status(200).json({ routines: [] })
      );
    });

    it('should apply resource-specific rate limiting', async () => {
      // Make several requests within the resource limit (100)
      for (let i = 0; i < 5; i++) {
        const response = await request(app).get('/resources/routines');
        expect(response.status).toBe(200);
        expect(response.headers).toHaveProperty('ratelimit');
        expect(response.headers.ratelimit).toContain('100-in-15min');
      }
    });
  });

  describe('premiumLimiter', () => {
    it('should provide higher limits for premium users', async () => {
      const testApp = express();

      // Mock authentication middleware to set user
      testApp.use((req, res, next) => {
        req.user = { id: 'premium-user', role: 'premium' };
        next();
      });

      testApp.use(premiumLimiter);
      testApp.get('/premium-endpoint', (req, res) =>
        res.json({ success: true })
      );

      const response = await request(testApp).get('/premium-endpoint');
      expect(response.status).toBe(200);
      expect(response.headers).toHaveProperty('ratelimit');
      // Premium users should get 1000 requests limit
      expect(response.headers.ratelimit).toContain('1000-in-15min');
    });

    it('should provide standard limits for regular users', async () => {
      const testApp = express();

      // Mock authentication middleware to set regular user
      testApp.use((req, res, next) => {
        req.user = { id: 'regular-user', role: 'authenticated' };
        next();
      });

      testApp.use(premiumLimiter);
      testApp.get('/premium-endpoint', (req, res) =>
        res.json({ success: true })
      );

      const response = await request(testApp).get('/premium-endpoint');
      expect(response.status).toBe(200);
      expect(response.headers).toHaveProperty('ratelimit');
      // Regular users should get 500 requests limit
      expect(response.headers.ratelimit).toContain('500-in-15min');
    });

    it('should use user ID for rate limiting key when authenticated', async () => {
      const testApp = express();

      // Mock authentication middleware
      testApp.use((req, res, next) => {
        req.user = { id: 'user-123', role: 'authenticated' };
        next();
      });

      testApp.use(premiumLimiter);
      testApp.get('/test', (req, res) => res.json({ success: true }));

      // The rate limiting should be per user ID, not IP
      const response = await request(testApp).get('/test');
      expect(response.status).toBe(200);
    });
  });

  describe('createCustomLimiter', () => {
    it('should create limiter with custom configuration', async () => {
      const customLimiter = createCustomLimiter({
        limit: 5,
        windowMs: 60000,
        message: 'Custom limit exceeded',
      });

      const testApp = express();
      testApp.use(customLimiter);
      testApp.get('/custom', (req, res) => res.json({ success: true }));

      // Make requests up to the limit
      for (let i = 0; i < 5; i++) {
        const response = await request(testApp).get('/custom');
        expect(response.status).toBe(200);
        expect(response.headers.ratelimit).toContain('5-in-1min');
      }

      // Next request should be rate limited
      const response = await request(testApp).get('/custom');
      expect(response.status).toBe(429);
      expect(response.body.detail).toBe('Custom limit exceeded');
    });

    it('should use default window time when not specified', async () => {
      const customLimiter = createCustomLimiter({
        limit: 10,
        message: 'Default window test',
      });

      const testApp = express();
      testApp.use(customLimiter);
      testApp.get('/test', (req, res) => res.json({ success: true }));

      const response = await request(testApp).get('/test');
      expect(response.status).toBe(200);
      // Default window should be 15 minutes
      expect(response.headers.ratelimit).toContain('10-in-15min');
    });

    it('should handle skipSuccessfulRequests option', async () => {
      const customLimiter = createCustomLimiter({
        limit: 2,
        windowMs: 60000,
        skipSuccessfulRequests: true,
        message: 'Skip successful test',
      });

      const testApp = express();
      testApp.use(customLimiter);
      testApp.get('/success', (req, res) =>
        res.status(200).json({ success: true })
      );
      testApp.get('/error', (req, res) =>
        res.status(400).json({ error: true })
      );

      // Successful requests shouldn't count towards limit
      await request(testApp).get('/success').expect(200);
      await request(testApp).get('/success').expect(200);
      await request(testApp).get('/success').expect(200);

      // Failed requests should count
      await request(testApp).get('/error').expect(400);
      await request(testApp).get('/error').expect(400);

      // Third failed request should be rate limited
      const response = await request(testApp).get('/error');
      expect(response.status).toBe(429);
    });
  });

  describe('Rate limit headers format', () => {
    it('should return RFC-compliant rate limit headers', async () => {
      const testApp = express();
      testApp.use(globalLimiter);
      testApp.get('/test', (req, res) => res.json({ success: true }));

      const response = await request(testApp).get('/test');
      expect(response.status).toBe(200);

      // Should have the standard RateLimit header in draft-8 format
      expect(response.headers).toHaveProperty('ratelimit');

      // Should not have legacy headers
      expect(response.headers).not.toHaveProperty('x-ratelimit-limit');
      expect(response.headers).not.toHaveProperty('x-ratelimit-remaining');
      expect(response.headers).not.toHaveProperty('x-ratelimit-reset');
    });
  });
});
