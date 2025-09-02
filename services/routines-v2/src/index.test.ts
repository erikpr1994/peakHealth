import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './index';

describe('Basic Server', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'ok',
        service: 'routines-v2',
        timestamp: expect.any(String),
        version: '1.0.0',
      });
    });

    it('should return valid timestamp', async () => {
      const response = await request(app).get('/health');

      const timestamp = new Date(response.body.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).not.toBeNaN();
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown routes with RFC 9457 format', async () => {
      const response = await request(app).get('/unknown-route');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        type: 'https://api.peakhealth.com/errors/not-found',
        title: 'Not Found',
        status: 404,
        detail: "The requested resource '/unknown-route' was not found",
        instance: '/unknown-route',
      });
    });
  });
});
