import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  vi,
} from 'vitest';
import request from 'supertest';
import { Types } from 'mongoose';
import app from '../../index';
import { db } from '../../utils/database';
import { RoutineModel, TemplateRoutineModel } from '../../models/routine';

// Mock authentication middleware for testing
vi.mock('../../middleware/auth', () => ({
  verifySupabaseJWT: (req: any, res: any, next: any) => {
    // Mock user data for tests
    req.user = {
      id: 'test-user-id',
      role: 'user',
      email: 'test@example.com',
    };
    next();
  },
  requireRole: (role: string) => (req: any, res: any, next: any) => {
    // For tests, allow all roles
    next();
  },
}));

describe('Routines API Integration Tests', () => {
  const testDatabaseUri =
    'mongodb://localhost:27017/routines-v2-integration-test';

  // Mock JWT tokens
  const mockUserToken = 'mock-user-jwt-token';
  const mockTrainerToken = 'mock-trainer-jwt-token';
  const mockAdminToken = 'mock-admin-jwt-token';

  beforeAll(async () => {
    // Connect to test database
    await db.connect({ uri: testDatabaseUri });
  });

  afterAll(async () => {
    // Clean up and disconnect
    await db.disconnect();
  });

  beforeEach(async () => {
    // Clean up test data before each test
    await RoutineModel.deleteMany({});
  });

  afterEach(async () => {
    // Clean up test data after each test
    await RoutineModel.deleteMany({});
  });

  describe('GET /api/v1/routines', () => {
    it('should return paginated routines', async () => {
      // Create test routines
      const routines = await Promise.all([
        TemplateRoutineModel.create({
          name: 'Beginner Strength Program',
          difficulty: 'beginner',
          goal: 'strength',
          duration: 12,
          objectives: ['Build foundation strength'],
          templateType: 'company',
          createdBy: new Types.ObjectId(),
          parentRoutineId: new Types.ObjectId(),
          version: 1,
          isPublic: true,
        }),
        TemplateRoutineModel.create({
          name: 'Advanced Powerlifting',
          difficulty: 'advanced',
          goal: 'strength',
          duration: 16,
          objectives: ['Increase max lifts'],
          templateType: 'trainer',
          createdBy: new Types.ObjectId(),
          parentRoutineId: new Types.ObjectId(),
          version: 1,
          isPublic: true,
        }),
      ]);

      const response = await request(app)
        .get('/api/v1/routines')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('routines');
      expect(response.body.data).toHaveProperty('pagination');
      expect(response.body.data.routines).toHaveLength(2);
      expect(response.body.data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        pages: 1,
      });
    });

    it('should filter routines by difficulty', async () => {
      // Create routines with different difficulties
      await Promise.all([
        TemplateRoutineModel.create({
          name: 'Beginner Program',
          difficulty: 'beginner',
          goal: 'strength',
          duration: 8,
          templateType: 'company',
          createdBy: new Types.ObjectId(),
          parentRoutineId: new Types.ObjectId(),
          version: 1,
          isPublic: true,
        }),
        TemplateRoutineModel.create({
          name: 'Advanced Program',
          difficulty: 'advanced',
          goal: 'strength',
          duration: 12,
          templateType: 'company',
          createdBy: new Types.ObjectId(),
          parentRoutineId: new Types.ObjectId(),
          version: 1,
          isPublic: true,
        }),
      ]);

      const response = await request(app)
        .get('/api/v1/routines')

        .query({ difficulty: 'beginner' })
        .expect(200);

      expect(response.body.data.routines).toHaveLength(1);
      expect(response.body.data.routines[0].difficulty).toBe('beginner');
    });

    it('should handle rate limiting', async () => {
      // Make multiple rapid requests to test rate limiting
      const requests = Array.from({ length: 6 }, () =>
        request(app).get('/api/v1/routines')
      );

      const responses = await Promise.all(requests);

      // Some requests should be rate limited (429)
      const rateLimitedResponses = responses.filter(res => res.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/v1/routines/:id', () => {
    it('should return a specific routine', async () => {
      const routine = await TemplateRoutineModel.create({
        name: 'Test Routine',
        difficulty: 'intermediate',
        goal: 'hypertrophy',
        duration: 10,
        objectives: ['Build muscle mass'],
        templateType: 'trainer',
        createdBy: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        version: 1,
        isPublic: true,
      });

      const response = await request(app)
        .get(`/api/v1/routines/${routine._id}`)

        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.routine.name).toBe('Test Routine');
      expect(response.body.data.routine.difficulty).toBe('intermediate');
    });

    it('should return 404 for non-existent routine', async () => {
      const nonExistentId = new Types.ObjectId();

      const response = await request(app)
        .get(`/api/v1/routines/${nonExistentId}`)

        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('Routine not found');
    });

    it('should return 400 for invalid ObjectId', async () => {
      await request(app)
        .get('/api/v1/routines/invalid-id')

        .expect(400);
    });
  });

  describe('POST /api/v1/routines', () => {
    const routineData = {
      name: 'New Strength Program',
      description: 'A comprehensive strength training program',
      difficulty: 'intermediate',
      goal: 'strength',
      duration: 12,
      objectives: ['Increase overall strength', 'Build muscle mass'],
      templateType: 'trainer',
      parentRoutineId: new Types.ObjectId().toString(),
      version: 1,
      isPublic: false,
      tags: ['strength', 'powerlifting'],
      targetAudience: ['intermediate lifters'],
    };

    it('should create a new routine as trainer', async () => {
      const response = await request(app)
        .post('/api/v1/routines')

        .send(routineData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.routine.name).toBe(routineData.name);
      expect(response.body.data.routine.templateType).toBe('trainer');
    });

    it('should return 403 for user without trainer role', async () => {
      await request(app)
        .post('/api/v1/routines')

        .send(routineData)
        .expect(403);
    });

    it('should validate required fields', async () => {
      const invalidData = { ...routineData };
      delete invalidData.name;

      const response = await request(app)
        .post('/api/v1/routines')

        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('name');
    });

    it('should validate enum values', async () => {
      const invalidData = {
        ...routineData,
        difficulty: 'invalid-difficulty',
      };

      const response = await request(app)
        .post('/api/v1/routines')

        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/routines/:id', () => {
    it('should update an existing routine', async () => {
      const routine = await TemplateRoutineModel.create({
        name: 'Original Name',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 8,
        templateType: 'trainer',
        createdBy: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        version: 1,
      });

      const updateData = {
        name: 'Updated Name',
        difficulty: 'intermediate',
        duration: 12,
      };

      const response = await request(app)
        .put(`/api/v1/routines/${routine._id}`)

        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.routine.name).toBe('Updated Name');
      expect(response.body.data.routine.difficulty).toBe('intermediate');
      expect(response.body.data.routine.duration).toBe(12);
    });

    it('should return 404 for non-existent routine', async () => {
      const nonExistentId = new Types.ObjectId();

      await request(app)
        .put(`/api/v1/routines/${nonExistentId}`)

        .send({ name: 'Updated Name' })
        .expect(404);
    });
  });

  describe('DELETE /api/v1/routines/:id', () => {
    it('should delete a routine as admin', async () => {
      const routine = await TemplateRoutineModel.create({
        name: 'Routine to Delete',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 8,
        templateType: 'trainer',
        createdBy: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        version: 1,
      });

      await request(app)
        .delete(`/api/v1/routines/${routine._id}`)

        .expect(204);

      // Verify routine is deleted
      const deletedRoutine = await RoutineModel.findById(routine._id);
      expect(deletedRoutine).toBeNull();
    });

    it('should return 403 for non-admin user', async () => {
      const routine = await TemplateRoutineModel.create({
        name: 'Routine to Delete',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 8,
        templateType: 'trainer',
        createdBy: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        version: 1,
      });

      await request(app)
        .delete(`/api/v1/routines/${routine._id}`)

        .expect(403);
    });
  });

  describe('Error Handling', () => {
    it('should handle server errors gracefully', async () => {
      // This test would need to mock a database error
      // For now, we'll test the error response format
      const response = await request(app)
        .get('/api/v1/routines/invalid-object-id')

        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message');
      expect(response.body.error).toHaveProperty('status');
    });
  });

  describe('Response Headers', () => {
    it('should include rate limit headers', async () => {
      const response = await request(app)
        .get('/api/v1/routines')

        .expect(200);

      expect(response.headers).toHaveProperty('x-ratelimit-limit');
      expect(response.headers).toHaveProperty('x-ratelimit-remaining');
      expect(response.headers).toHaveProperty('x-ratelimit-reset');
    });

    it('should include security headers', async () => {
      const response = await request(app)
        .get('/api/v1/routines')

        .expect(200);

      // These would be set by helmet middleware
      expect(response.headers).toHaveProperty('x-content-type-options');
    });
  });
});
