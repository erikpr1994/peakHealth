import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import userRoutinesRoutes from './userRoutines';
import { routineController } from '../../controllers/routine.controller';
import { verifySupabaseJWT } from '../../middleware/auth';
import {
  validateRoutineCreate,
  validateRoutineUpdate,
} from '../../middleware/validation';

// Mock dependencies
vi.mock('../../controllers/routine.controller', () => ({
  routineController: {
    createRoutine: vi.fn((req, res) =>
      res.status(201).json({ message: 'Routine created' })
    ),
    getRoutines: vi.fn((req, res) => res.status(200).json({ routines: [] })),
    getRoutineById: vi.fn((req, res) =>
      res.status(200).json({ id: 'routine123' })
    ),
    updateRoutine: vi.fn((req, res) =>
      res.status(200).json({ message: 'Routine updated' })
    ),
    deleteRoutine: vi.fn((req, res) => res.status(204).send()),
  },
}));

vi.mock('../../middleware/auth', () => ({
  verifySupabaseJWT: vi.fn((req, res, next) => {
    req.user = { id: 'user123' };
    next();
  }),
}));

vi.mock('../../middleware/validation', () => ({
  validateRoutineCreate: vi.fn((req, res, next) => next()),
  validateRoutineUpdate: vi.fn((req, res, next) => next()),
}));

vi.mock('express-rate-limit', () => ({
  default: () => (req: any, res: any, next: any) => next(),
}));

describe('User Routines Routes', () => {
  let app: any;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use('/api/routines', userRoutinesRoutes);
  });

  describe('POST /', () => {
    it('should call createRoutine controller', async () => {
      const response = await request(app)
        .post('/api/routines')
        .send({ name: 'Test Routine' });

      expect(response.status).toBe(201);
      expect(verifySupabaseJWT).toHaveBeenCalled();
      expect(validateRoutineCreate).toHaveBeenCalled();
      expect(routineController.createRoutine).toHaveBeenCalled();
    });
  });

  describe('GET /', () => {
    it('should call getRoutines controller', async () => {
      const response = await request(app).get('/api/routines');

      expect(response.status).toBe(200);
      expect(verifySupabaseJWT).toHaveBeenCalled();
      expect(routineController.getRoutines).toHaveBeenCalled();
    });
  });

  describe('GET /:id', () => {
    it('should call getRoutineById controller', async () => {
      const response = await request(app).get('/api/routines/routine123');

      expect(response.status).toBe(200);
      expect(verifySupabaseJWT).toHaveBeenCalled();
      expect(routineController.getRoutineById).toHaveBeenCalled();
    });
  });

  describe('PUT /:id', () => {
    it('should call updateRoutine controller', async () => {
      const response = await request(app)
        .put('/api/routines/routine123')
        .send({ name: 'Updated Routine' });

      expect(response.status).toBe(200);
      expect(verifySupabaseJWT).toHaveBeenCalled();
      expect(validateRoutineUpdate).toHaveBeenCalled();
      expect(routineController.updateRoutine).toHaveBeenCalled();
    });
  });

  describe('DELETE /:id', () => {
    it('should call deleteRoutine controller', async () => {
      const response = await request(app).delete('/api/routines/routine123');

      expect(response.status).toBe(204);
      expect(verifySupabaseJWT).toHaveBeenCalled();
      expect(routineController.deleteRoutine).toHaveBeenCalled();
    });
  });
});
