import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import routinesRouter from './routines';
import { RoutineService } from '../services/RoutineService';

// Mock the service
vi.mock('../services/RoutineService', () => ({
  RoutineService: {
    getRoutines: vi.fn(),
    getRoutineById: vi.fn(),
    createUserRoutine: vi.fn(),
    createTemplateRoutine: vi.fn(),
    updateRoutine: vi.fn(),
    deleteRoutine: vi.fn(),
    copyTemplateRoutine: vi.fn(),
    getUserActiveRoutines: vi.fn(),
    getUserFavoriteRoutines: vi.fn(),
    updateRoutineProgress: vi.fn(),
  },
}));

// Mock middleware
vi.mock('../middleware/auth', () => ({
  verifySupabaseJWT: (req: any, res: any, next: any) => {
    req.user = { id: 'test-user-id', email: 'test@example.com', role: 'user' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next(),
}));

vi.mock('../middleware/rate-limit', () => ({
  apiLimiter: (req: any, res: any, next: any) => next(),
  resourceLimiter: (req: any, res: any, next: any) => next(),
}));

describe('Routines Routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/v1/routines', routinesRouter);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/v1/routines', () => {
    it('should return routines with pagination', async () => {
      const mockResult = {
        routines: [
          { _id: '1', name: 'Test Routine 1' },
          { _id: '2', name: 'Test Routine 2' },
        ],
        total: 2,
        page: 1,
        pageSize: 20,
        totalPages: 1,
      };

      vi.mocked(RoutineService.getRoutines).mockResolvedValue(mockResult);

      const response = await request(app).get('/api/v1/routines').expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockResult.routines,
        pagination: {
          page: mockResult.page,
          pageSize: mockResult.pageSize,
          total: mockResult.total,
          totalPages: mockResult.totalPages,
        },
      });

      expect(RoutineService.getRoutines).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 20,
          offset: 0,
          sortBy: 'createdAt',
          sortOrder: 'desc',
          userId: 'test-user-id',
        })
      );
    });

    it('should handle query parameters correctly', async () => {
      const mockResult = {
        routines: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0,
      };

      vi.mocked(RoutineService.getRoutines).mockResolvedValue(mockResult);

      await request(app)
        .get('/api/v1/routines')
        .query({
          page: '2',
          limit: '10',
          search: 'strength',
          difficulty: 'beginner',
          tags: 'muscle,strength',
        })
        .expect(200);

      expect(RoutineService.getRoutines).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 10,
          offset: 10,
          search: 'strength',
          difficulty: 'beginner',
          tags: ['muscle', 'strength'],
          userId: 'test-user-id',
        })
      );
    });
  });

  describe('GET /api/v1/routines/:id', () => {
    it('should return a specific routine', async () => {
      const mockRoutine = {
        _id: '1',
        name: 'Test Routine',
        routineType: 'user-created',
      };

      vi.mocked(RoutineService.getRoutineById).mockResolvedValue(
        mockRoutine as any
      );

      const response = await request(app).get('/api/v1/routines/1').expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockRoutine,
      });

      expect(RoutineService.getRoutineById).toHaveBeenCalledWith(
        '1',
        'test-user-id'
      );
    });
  });

  describe('POST /api/v1/routines', () => {
    it('should create a new user routine', async () => {
      const routineData = {
        name: 'New Routine',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
      };

      const mockRoutine = { _id: '1', ...routineData };

      vi.mocked(RoutineService.createUserRoutine).mockResolvedValue(
        mockRoutine as any
      );

      const response = await request(app)
        .post('/api/v1/routines')
        .send(routineData)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        data: mockRoutine,
        message: 'Routine created successfully',
      });

      expect(RoutineService.createUserRoutine).toHaveBeenCalledWith(
        'test-user-id',
        routineData
      );
    });
  });

  describe('PUT /api/v1/routines/:id', () => {
    it('should update a routine', async () => {
      const updateData = { name: 'Updated Routine' };
      const mockRoutine = { _id: '1', name: 'Updated Routine' };

      vi.mocked(RoutineService.updateRoutine).mockResolvedValue(
        mockRoutine as any
      );

      const response = await request(app)
        .put('/api/v1/routines/1')
        .send(updateData)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockRoutine,
        message: 'Routine updated successfully',
      });

      expect(RoutineService.updateRoutine).toHaveBeenCalledWith(
        '1',
        'test-user-id',
        updateData
      );
    });
  });

  describe('DELETE /api/v1/routines/:id', () => {
    it('should delete a routine', async () => {
      vi.mocked(RoutineService.deleteRoutine).mockResolvedValue();

      const response = await request(app)
        .delete('/api/v1/routines/1')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Routine deleted successfully',
      });

      expect(RoutineService.deleteRoutine).toHaveBeenCalledWith(
        '1',
        'test-user-id'
      );
    });
  });

  describe('POST /api/v1/routines/:id/copy', () => {
    it('should copy a template routine', async () => {
      const customizations = { name: 'My Custom Routine' };
      const mockRoutine = { _id: '2', name: 'My Custom Routine' };

      vi.mocked(RoutineService.copyTemplateRoutine).mockResolvedValue(
        mockRoutine as any
      );

      const response = await request(app)
        .post('/api/v1/routines/1/copy')
        .send(customizations)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        data: mockRoutine,
        message: 'Template routine copied successfully',
      });

      expect(RoutineService.copyTemplateRoutine).toHaveBeenCalledWith(
        '1',
        'test-user-id',
        customizations
      );
    });
  });

  describe('PATCH /api/v1/routines/:id/progress', () => {
    it('should update routine progress', async () => {
      const progressData = { completedWorkouts: 5 };
      const mockRoutine = { _id: '1', completedWorkouts: 5 };

      vi.mocked(RoutineService.updateRoutineProgress).mockResolvedValue(
        mockRoutine as any
      );

      const response = await request(app)
        .patch('/api/v1/routines/1/progress')
        .send(progressData)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockRoutine,
        message: 'Routine progress updated successfully',
      });

      expect(RoutineService.updateRoutineProgress).toHaveBeenCalledWith(
        '1',
        'test-user-id',
        5
      );
    });

    it('should validate completedWorkouts is a number', async () => {
      const response = await request(app)
        .patch('/api/v1/routines/1/progress')
        .send({ completedWorkouts: 'invalid' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.detail).toContain(
        'completedWorkouts must be a number'
      );
    });
  });

  describe('GET /api/v1/routines/user/active', () => {
    it('should return user active routines', async () => {
      const mockRoutines = [
        { _id: '1', name: 'Active Routine 1', isActive: true },
        { _id: '2', name: 'Active Routine 2', isActive: true },
      ];

      vi.mocked(RoutineService.getUserActiveRoutines).mockResolvedValue(
        mockRoutines as any
      );

      const response = await request(app)
        .get('/api/v1/routines/user/active')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockRoutines,
      });

      expect(RoutineService.getUserActiveRoutines).toHaveBeenCalledWith(
        'test-user-id'
      );
    });
  });

  describe('GET /api/v1/routines/user/favorites', () => {
    it('should return user favorite routines', async () => {
      const mockRoutines = [
        { _id: '1', name: 'Favorite Routine 1', isFavorite: true },
        { _id: '2', name: 'Favorite Routine 2', isFavorite: true },
      ];

      vi.mocked(RoutineService.getUserFavoriteRoutines).mockResolvedValue(
        mockRoutines as any
      );

      const response = await request(app)
        .get('/api/v1/routines/user/favorites')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockRoutines,
      });

      expect(RoutineService.getUserFavoriteRoutines).toHaveBeenCalledWith(
        'test-user-id'
      );
    });
  });
});
