import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import assignmentsRouter from './assignments';
import { RoutineAssignmentService } from '../services/RoutineAssignmentService';

// Mock the service
vi.mock('../services/RoutineAssignmentService', () => ({
  RoutineAssignmentService: {
    createAssignment: vi.fn(),
    getAssignmentById: vi.fn(),
    getAssignments: vi.fn(),
    updateProgress: vi.fn(),
    completeAssignment: vi.fn(),
    pauseAssignment: vi.fn(),
    resumeAssignment: vi.fn(),
    deleteAssignment: vi.fn(),
    getTrainerAssignments: vi.fn(),
    getUserActiveAssignments: vi.fn(),
    getOverdueAssignments: vi.fn(),
  },
}));

// Mock auth middleware
vi.mock('../middleware/auth', () => ({
  verifySupabaseJWT: (req: any, res: any, next: any) => {
    req.user = { id: 'test-user', role: 'user' };
    next();
  },
  requireRole: () => (req: any, res: any, next: any) => next(),
}));

// Mock rate limiting
vi.mock('../middleware/rate-limit', () => ({
  apiLimiter: (req: any, res: any, next: any) => next(),
  resourceLimiter: (req: any, res: any, next: any) => next(),
}));

describe('Assignments Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/assignments', assignmentsRouter);
    vi.clearAllMocks();
  });

  describe('GET /', () => {
    it('should handle assignment retrieval', async () => {
      vi.mocked(RoutineAssignmentService.getAssignments).mockResolvedValue({
        assignments: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 },
      });

      const response = await request(app).get('/assignments').expect(200);

      expect(response.body.success).toBe(true);
      expect(RoutineAssignmentService.getAssignments).toHaveBeenCalled();
    });
  });

  describe('POST /', () => {
    it('should handle assignment creation', async () => {
      const assignmentData = {
        routineVersionId: '507f1f77bcf86cd799439011',
        userId: '507f1f77bcf86cd799439012',
      };

      vi.mocked(RoutineAssignmentService.createAssignment).mockResolvedValue({
        _id: '507f1f77bcf86cd799439013',
        ...assignmentData,
      } as any);

      const response = await request(app)
        .post('/assignments')
        .send(assignmentData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(RoutineAssignmentService.createAssignment).toHaveBeenCalledWith({
        ...assignmentData,
        trainerId: 'test-user',
      });
    });
  });

  describe('Error handling', () => {
    it('should handle service errors', async () => {
      vi.mocked(RoutineAssignmentService.getAssignments).mockRejectedValue(
        new Error('Service error')
      );

      await request(app).get('/assignments').expect(500);
    });
  });
});
