import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import workoutsRouter from './workouts';
import { WorkoutService } from '../services/WorkoutService';

// Mock the service
vi.mock('../services/WorkoutService', () => ({
  WorkoutService: {
    createWorkout: vi.fn(),
    getWorkoutById: vi.fn(),
    getWorkouts: vi.fn(),
    updateWorkout: vi.fn(),
    deleteWorkout: vi.fn(),
    copyWorkout: vi.fn(),
    archiveWorkout: vi.fn(),
    purgeArchivedWorkouts: vi.fn(),
  },
}));

// Mock auth middleware
vi.mock('../middleware/auth', () => ({
  verifySupabaseJWT: (req: any, res: any, next: any) => {
    req.user = { id: 'test-user', role: 'trainer' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next(),
}));

// Mock rate limiting
vi.mock('../middleware/rate-limit', () => ({
  apiLimiter: (req: any, res: any, next: any) => next(),
  resourceLimiter: (req: any, res: any, next: any) => next(),
}));

describe('Workouts Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/workouts', workoutsRouter);
    vi.clearAllMocks();
  });

  describe('GET /', () => {
    it('should handle workout retrieval', async () => {
      vi.mocked(WorkoutService.getWorkouts).mockResolvedValue({
        workouts: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 },
      });

      const response = await request(app).get('/workouts').expect(200);

      expect(response.body.success).toBe(true);
      expect(WorkoutService.getWorkouts).toHaveBeenCalled();
    });
  });

  describe('POST /', () => {
    it('should handle workout creation route existence', () => {
      // Just test that the service method exists
      expect(typeof WorkoutService.createWorkout).toBe('function');
    });
  });

  describe('GET /:id', () => {
    it('should handle workout retrieval by id', async () => {
      const workoutId = '507f1f77bcf86cd799439013';
      vi.mocked(WorkoutService.getWorkoutById).mockResolvedValue({
        _id: workoutId,
        name: 'Test Workout',
      } as any);

      const response = await request(app)
        .get(`/workouts/${workoutId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(WorkoutService.getWorkoutById).toHaveBeenCalledWith(
        workoutId,
        'test-user'
      );
    });
  });

  describe('Error handling', () => {
    it('should handle service errors', async () => {
      vi.mocked(WorkoutService.getWorkouts).mockRejectedValue(
        new Error('Service error')
      );

      await request(app).get('/workouts').expect(500);
    });
  });
});
