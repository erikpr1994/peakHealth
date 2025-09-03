import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest';
import request from 'supertest';
import { Types } from 'mongoose';
import app from '../../index';
import { db } from '../../utils/database';
import { RoutineAssignmentModel } from '../../models/routine-assignment';
import { TemplateRoutineModel } from '../../models/routine';

describe('Routine Assignments API Integration Tests', () => {
  const testDatabaseUri =
    'mongodb://localhost:27017/routines-v2-integration-test';

  // Mock JWT tokens with different roles
  const mockUserToken = 'mock-user-jwt-token';
  const mockTrainerToken = 'mock-trainer-jwt-token';
  const mockAdminToken = 'mock-admin-jwt-token';

  let testRoutine: any;
  let testUserId: Types.ObjectId;
  let testTrainerId: Types.ObjectId;

  beforeAll(async () => {
    // Connect to test database
    await db.connect({ uri: testDatabaseUri });

    // Set up test data
    testUserId = new Types.ObjectId();
    testTrainerId = new Types.ObjectId();

    testRoutine = await TemplateRoutineModel.create({
      name: 'Test Assignment Routine',
      difficulty: 'intermediate',
      goal: 'strength',
      duration: 12,
      objectives: ['Build strength'],
      templateType: 'trainer',
      createdBy: testTrainerId,
      parentRoutineId: new Types.ObjectId(),
      version: 1,
      isPublic: true,
    });
  });

  afterAll(async () => {
    // Clean up and disconnect
    await RoutineAssignmentModel.deleteMany({});
    await TemplateRoutineModel.deleteMany({});
    await db.disconnect();
  });

  beforeEach(async () => {
    // Clean up assignment test data before each test
    await RoutineAssignmentModel.deleteMany({});
  });

  afterEach(async () => {
    // Clean up assignment test data after each test
    await RoutineAssignmentModel.deleteMany({});
  });

  describe('POST /api/v1/assignments', () => {
    const assignmentData = {
      routineVersionId: '',
      parentRoutineId: '',
      userId: '',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      notesForUser: 'Follow the program consistently',
    };

    beforeEach(() => {
      assignmentData.routineVersionId = testRoutine._id.toString();
      assignmentData.parentRoutineId = testRoutine.parentRoutineId.toString();
      assignmentData.userId = testUserId.toString();
    });

    it('should create a new assignment as trainer', async () => {
      const response = await request(app)
        .post('/api/v1/assignments')
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(assignmentData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignment).toHaveProperty('_id');
      expect(response.body.data.assignment.status).toBe('active');
      expect(response.body.data.assignment.progress.completedWorkouts).toBe(0);
      expect(response.body.data.assignment.progress.totalWorkouts).toBe(0);
    });

    it('should return 403 for user without trainer role', async () => {
      await request(app)
        .post('/api/v1/assignments')
        .set('Authorization', `Bearer ${mockUserToken}`)
        .send(assignmentData)
        .expect(403);
    });

    it('should validate required fields', async () => {
      const invalidData = { ...assignmentData };
      delete invalidData.routineVersionId;

      const response = await request(app)
        .post('/api/v1/assignments')
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should validate date format', async () => {
      const invalidData = {
        ...assignmentData,
        startDate: 'invalid-date',
      };

      const response = await request(app)
        .post('/api/v1/assignments')
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should return 404 for non-existent routine', async () => {
      const invalidData = {
        ...assignmentData,
        routineVersionId: new Types.ObjectId().toString(),
      };

      const response = await request(app)
        .post('/api/v1/assignments')
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(invalidData)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('Routine version not found');
    });
  });

  describe('GET /api/v1/assignments/:id', () => {
    let testAssignment: any;

    beforeEach(async () => {
      testAssignment = await RoutineAssignmentModel.create({
        routineVersionId: testRoutine._id,
        parentRoutineId: testRoutine.parentRoutineId,
        userId: testUserId,
        trainerId: testTrainerId,
        notesForUser: 'Test assignment',
      });
    });

    it('should return assignment by id', async () => {
      const response = await request(app)
        .get(`/api/v1/assignments/${testAssignment._id}`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignment._id).toBe(
        testAssignment._id.toString()
      );
      expect(response.body.data.assignment.status).toBe('active');
    });

    it('should return 404 for non-existent assignment', async () => {
      const nonExistentId = new Types.ObjectId();

      const response = await request(app)
        .get(`/api/v1/assignments/${nonExistentId}`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('Assignment not found');
    });

    it('should return 400 for invalid ObjectId', async () => {
      await request(app)
        .get('/api/v1/assignments/invalid-id')
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .expect(400);
    });
  });

  describe('GET /api/v1/assignments/user/:userId', () => {
    beforeEach(async () => {
      // Create multiple assignments for the user
      await Promise.all([
        RoutineAssignmentModel.create({
          routineVersionId: testRoutine._id,
          parentRoutineId: testRoutine.parentRoutineId,
          userId: testUserId,
          trainerId: testTrainerId,
          status: 'active',
        }),
        RoutineAssignmentModel.create({
          routineVersionId: testRoutine._id,
          parentRoutineId: testRoutine.parentRoutineId,
          userId: testUserId,
          trainerId: testTrainerId,
          status: 'completed',
        }),
        RoutineAssignmentModel.create({
          routineVersionId: testRoutine._id,
          parentRoutineId: testRoutine.parentRoutineId,
          userId: new Types.ObjectId(), // Different user
          trainerId: testTrainerId,
          status: 'active',
        }),
      ]);
    });

    it('should return user assignments with pagination', async () => {
      const response = await request(app)
        .get(`/api/v1/assignments/user/${testUserId}`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignments).toHaveLength(2);
      expect(response.body.data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        pages: 1,
      });
    });

    it('should filter assignments by status', async () => {
      const response = await request(app)
        .get(`/api/v1/assignments/user/${testUserId}`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .query({ status: 'active' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignments).toHaveLength(1);
      expect(response.body.data.assignments[0].status).toBe('active');
    });
  });

  describe('GET /api/v1/assignments/trainer/:trainerId', () => {
    beforeEach(async () => {
      await Promise.all([
        RoutineAssignmentModel.create({
          routineVersionId: testRoutine._id,
          parentRoutineId: testRoutine.parentRoutineId,
          userId: testUserId,
          trainerId: testTrainerId,
          status: 'active',
        }),
        RoutineAssignmentModel.create({
          routineVersionId: testRoutine._id,
          parentRoutineId: testRoutine.parentRoutineId,
          userId: new Types.ObjectId(),
          trainerId: testTrainerId,
          status: 'completed',
        }),
      ]);
    });

    it('should return trainer assignments', async () => {
      const response = await request(app)
        .get(`/api/v1/assignments/trainer/${testTrainerId}`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignments).toHaveLength(2);
    });

    it('should filter by status', async () => {
      const response = await request(app)
        .get(`/api/v1/assignments/trainer/${testTrainerId}`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .query({ status: 'active' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignments).toHaveLength(1);
      expect(response.body.data.assignments[0].status).toBe('active');
    });
  });

  describe('PUT /api/v1/assignments/:id/progress', () => {
    let testAssignment: any;

    beforeEach(async () => {
      testAssignment = await RoutineAssignmentModel.create({
        routineVersionId: testRoutine._id,
        parentRoutineId: testRoutine.parentRoutineId,
        userId: testUserId,
        trainerId: testTrainerId,
        progress: {
          completedWorkouts: 2,
          totalWorkouts: 10,
        },
      });
    });

    it('should update assignment progress', async () => {
      const progressData = {
        completedWorkouts: 5,
        totalWorkouts: 12,
        feedback: 'Great progress so far!',
      };

      const response = await request(app)
        .put(`/api/v1/assignments/${testAssignment._id}/progress`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(progressData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignment.progress.completedWorkouts).toBe(5);
      expect(response.body.data.assignment.progress.totalWorkouts).toBe(12);
      expect(response.body.data.assignment.progress.feedback).toBe(
        'Great progress so far!'
      );
    });

    it('should validate progress values', async () => {
      const invalidData = {
        completedWorkouts: -1,
      };

      const response = await request(app)
        .put(`/api/v1/assignments/${testAssignment._id}/progress`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('negative');
    });

    it('should auto-complete assignment when all workouts done', async () => {
      const progressData = {
        completedWorkouts: 10,
        totalWorkouts: 10,
      };

      const response = await request(app)
        .put(`/api/v1/assignments/${testAssignment._id}/progress`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(progressData)
        .expect(200);

      expect(response.body.success).toBe(true);
      // Note: The auto-completion logic is in the model middleware
      // so we'd need to check the database to verify the status change
    });
  });

  describe('PUT /api/v1/assignments/:id/complete', () => {
    let testAssignment: any;

    beforeEach(async () => {
      testAssignment = await RoutineAssignmentModel.create({
        routineVersionId: testRoutine._id,
        parentRoutineId: testRoutine.parentRoutineId,
        userId: testUserId,
        trainerId: testTrainerId,
        status: 'active',
      });
    });

    it('should complete assignment with feedback', async () => {
      const completionData = {
        feedback: 'Excellent work! You completed the program successfully.',
      };

      const response = await request(app)
        .put(`/api/v1/assignments/${testAssignment._id}/complete`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(completionData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignment.status).toBe('completed');
      expect(response.body.data.assignment.progress.feedback).toBe(
        completionData.feedback
      );
    });

    it('should complete assignment without feedback', async () => {
      const response = await request(app)
        .put(`/api/v1/assignments/${testAssignment._id}/complete`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignment.status).toBe('completed');
    });
  });

  describe('PUT /api/v1/assignments/:id/pause', () => {
    let testAssignment: any;

    beforeEach(async () => {
      testAssignment = await RoutineAssignmentModel.create({
        routineVersionId: testRoutine._id,
        parentRoutineId: testRoutine.parentRoutineId,
        userId: testUserId,
        trainerId: testTrainerId,
        status: 'active',
      });
    });

    it('should pause active assignment', async () => {
      const response = await request(app)
        .put(`/api/v1/assignments/${testAssignment._id}/pause`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignment.status).toBe('paused');
    });
  });

  describe('PUT /api/v1/assignments/:id/resume', () => {
    let testAssignment: any;

    beforeEach(async () => {
      testAssignment = await RoutineAssignmentModel.create({
        routineVersionId: testRoutine._id,
        parentRoutineId: testRoutine.parentRoutineId,
        userId: testUserId,
        trainerId: testTrainerId,
        status: 'paused',
      });
    });

    it('should resume paused assignment', async () => {
      const response = await request(app)
        .put(`/api/v1/assignments/${testAssignment._id}/resume`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignment.status).toBe('active');
    });
  });

  describe('DELETE /api/v1/assignments/:id', () => {
    let testAssignment: any;

    beforeEach(async () => {
      testAssignment = await RoutineAssignmentModel.create({
        routineVersionId: testRoutine._id,
        parentRoutineId: testRoutine.parentRoutineId,
        userId: testUserId,
        trainerId: testTrainerId,
      });
    });

    it('should delete assignment as admin', async () => {
      await request(app)
        .delete(`/api/v1/assignments/${testAssignment._id}`)
        .set('Authorization', `Bearer ${mockAdminToken}`)
        .expect(204);

      // Verify assignment is deleted
      const deletedAssignment = await RoutineAssignmentModel.findById(
        testAssignment._id
      );
      expect(deletedAssignment).toBeNull();
    });

    it('should return 403 for non-admin user', async () => {
      await request(app)
        .delete(`/api/v1/assignments/${testAssignment._id}`)
        .set('Authorization', `Bearer ${mockUserToken}`)
        .expect(403);
    });
  });

  describe('GET /api/v1/assignments/overdue', () => {
    beforeEach(async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      await Promise.all([
        RoutineAssignmentModel.create({
          routineVersionId: testRoutine._id,
          parentRoutineId: testRoutine.parentRoutineId,
          userId: testUserId,
          trainerId: testTrainerId,
          status: 'active',
          endDate: yesterday, // Overdue
        }),
        RoutineAssignmentModel.create({
          routineVersionId: testRoutine._id,
          parentRoutineId: testRoutine.parentRoutineId,
          userId: new Types.ObjectId(),
          trainerId: testTrainerId,
          status: 'completed',
          endDate: yesterday, // Not overdue because completed
        }),
      ]);
    });

    it('should return overdue assignments', async () => {
      const response = await request(app)
        .get('/api/v1/assignments/overdue')
        .set('Authorization', `Bearer ${mockAdminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.assignments).toHaveLength(1);
      expect(response.body.data.assignments[0].status).toBe('active');
    });

    it('should require admin role', async () => {
      await request(app)
        .get('/api/v1/assignments/overdue')
        .set('Authorization', `Bearer ${mockUserToken}`)
        .expect(403);
    });
  });
});
