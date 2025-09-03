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
import { WorkoutModel, StrengthWorkoutModel } from '../../models/workout';

describe('Workouts API Integration Tests', () => {
  const testDatabaseUri =
    'mongodb://localhost:27017/routines-v2-integration-test';

  // Mock JWT tokens
  const mockUserToken = 'mock-user-jwt-token';
  const mockTrainerToken = 'mock-trainer-jwt-token';
  const mockAdminToken = 'mock-admin-jwt-token';

  let testCreatorId: Types.ObjectId;

  beforeAll(async () => {
    // Connect to test database
    await db.connect({ uri: testDatabaseUri });
    testCreatorId = new Types.ObjectId();
  });

  afterAll(async () => {
    // Clean up and disconnect
    await db.disconnect();
  });

  beforeEach(async () => {
    // Clean up test data before each test
    await WorkoutModel.deleteMany({});
  });

  afterEach(async () => {
    // Clean up test data after each test
    await WorkoutModel.deleteMany({});
  });

  describe('GET /api/v1/workouts', () => {
    it('should return paginated workouts', async () => {
      // Create test workouts
      const workouts = await Promise.all([
        StrengthWorkoutModel.create({
          name: 'Upper Body Strength',
          type: 'strength',
          orderIndex: 1,
          objective: 'Build upper body strength',
          sections: [
            {
              name: 'Warmup',
              type: 'warmup',
              orderIndex: 0,
              duration: 10,
              intensity: 'light',
              targetMuscleGroups: ['shoulders', 'arms'],
              exercises: [],
            },
          ],
          createdBy: testCreatorId,
          isPublic: true,
        }),
        StrengthWorkoutModel.create({
          name: 'Lower Body Power',
          type: 'strength',
          orderIndex: 2,
          objective: 'Develop explosive power',
          sections: [
            {
              name: 'Main Set',
              type: 'basic',
              orderIndex: 0,
              exercises: [],
            },
          ],
          createdBy: testCreatorId,
          isPublic: true,
        }),
      ]);

      const response = await request(app)
        .get('/api/v1/workouts')
        .set('Authorization', `Bearer ${mockUserToken}`)
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('workouts');
      expect(response.body.data).toHaveProperty('pagination');
      expect(response.body.data.workouts).toHaveLength(2);
      expect(response.body.data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        pages: 1,
      });
    });

    it('should filter workouts by type', async () => {
      await StrengthWorkoutModel.create({
        name: 'Strength Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Main',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
        createdBy: testCreatorId,
        isPublic: true,
      });

      const response = await request(app)
        .get('/api/v1/workouts')
        .set('Authorization', `Bearer ${mockUserToken}`)
        .query({ type: 'strength' })
        .expect(200);

      expect(response.body.data.workouts).toHaveLength(1);
      expect(response.body.data.workouts[0].type).toBe('strength');
    });

    it('should return 401 without authentication', async () => {
      await request(app).get('/api/v1/workouts').expect(401);
    });
  });

  describe('GET /api/v1/workouts/:id', () => {
    it('should return a specific workout', async () => {
      const workout = await StrengthWorkoutModel.create({
        name: 'Test Workout',
        type: 'strength',
        orderIndex: 1,
        objective: 'Test objective',
        sections: [
          {
            name: 'EMOM Section',
            type: 'emom',
            orderIndex: 0,
            emomDuration: 12,
            rounds: 4,
            restBetweenRounds: '2m',
            exercises: [],
          },
        ],
        createdBy: testCreatorId,
        isPublic: true,
      });

      const response = await request(app)
        .get(`/api/v1/workouts/${workout._id}`)
        .set('Authorization', `Bearer ${mockUserToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.workout.name).toBe('Test Workout');
      expect(response.body.data.workout.sections).toHaveLength(1);
      expect(response.body.data.workout.sections[0].type).toBe('emom');
    });

    it('should return 404 for non-existent workout', async () => {
      const nonExistentId = new Types.ObjectId();

      const response = await request(app)
        .get(`/api/v1/workouts/${nonExistentId}`)
        .set('Authorization', `Bearer ${mockUserToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('Workout not found');
    });

    it('should return 400 for invalid ObjectId', async () => {
      await request(app)
        .get('/api/v1/workouts/invalid-id')
        .set('Authorization', `Bearer ${mockUserToken}`)
        .expect(400);
    });
  });

  describe('POST /api/v1/workouts', () => {
    const workoutData = {
      name: 'New Strength Workout',
      type: 'strength',
      orderIndex: 1,
      objective: 'Build overall strength',
      notes: 'Focus on proper form',
      sections: [
        {
          name: 'Warmup',
          type: 'warmup',
          orderIndex: 0,
          duration: 10,
          intensity: 'light',
          targetMuscleGroups: ['shoulders', 'arms'],
          exercises: [],
        },
        {
          name: 'Main Strength Block',
          type: 'basic',
          orderIndex: 1,
          exercises: [
            {
              exerciseId: 'squat',
              exerciseVariantId: 'back-squat',
              type: 'strength',
              orderIndex: 0,
              progressionMethod: 'linear',
              sets: [
                {
                  setNumber: 1,
                  setType: 'working',
                  repType: 'fixed',
                  reps: 5,
                  weight: 135,
                  rpe: 7,
                },
              ],
            },
          ],
        },
        {
          name: 'Cooldown',
          type: 'cooldown',
          orderIndex: 2,
          duration: 5,
          stretchingFocus: ['legs', 'hips'],
          exercises: [],
        },
      ],
      isPublic: false,
      tags: ['strength', 'compound'],
    };

    it('should create a new workout as trainer', async () => {
      const response = await request(app)
        .post('/api/v1/workouts')
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(workoutData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.workout.name).toBe(workoutData.name);
      expect(response.body.data.workout.type).toBe('strength');
      expect(response.body.data.workout.sections).toHaveLength(3);
      expect(response.body.data.workout.sectionCount).toBe(3);
    });

    it('should return 403 for user without trainer role', async () => {
      await request(app)
        .post('/api/v1/workouts')
        .set('Authorization', `Bearer ${mockUserToken}`)
        .send(workoutData)
        .expect(403);
    });

    it('should validate required fields', async () => {
      const invalidData = { ...workoutData };
      delete invalidData.name;

      const response = await request(app)
        .post('/api/v1/workouts')
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('name');
    });

    it('should validate section structure', async () => {
      const invalidData = {
        ...workoutData,
        sections: [], // Invalid - must have at least one section
      };

      const response = await request(app)
        .post('/api/v1/workouts')
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('at least one section');
    });

    it('should validate exercise structure within sections', async () => {
      const invalidData = {
        ...workoutData,
        sections: [
          {
            name: 'Invalid Section',
            type: 'basic',
            orderIndex: 0,
            exercises: [
              {
                // Missing required fields
                orderIndex: 0,
              },
            ],
          },
        ],
      };

      const response = await request(app)
        .post('/api/v1/workouts')
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/workouts/:id', () => {
    it('should update an existing workout', async () => {
      const workout = await StrengthWorkoutModel.create({
        name: 'Original Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Basic Section',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
        createdBy: testCreatorId,
      });

      const updateData = {
        name: 'Updated Workout',
        objective: 'Updated objective',
        notes: 'Updated notes',
      };

      const response = await request(app)
        .put(`/api/v1/workouts/${workout._id}`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.workout.name).toBe('Updated Workout');
      expect(response.body.data.workout.objective).toBe('Updated objective');
      expect(response.body.data.workout.notes).toBe('Updated notes');
    });

    it('should return 404 for non-existent workout', async () => {
      const nonExistentId = new Types.ObjectId();

      await request(app)
        .put(`/api/v1/workouts/${nonExistentId}`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send({ name: 'Updated Name' })
        .expect(404);
    });
  });

  describe('POST /api/v1/workouts/:id/copy', () => {
    it('should copy an existing workout', async () => {
      const originalWorkout = await StrengthWorkoutModel.create({
        name: 'Original Workout',
        type: 'strength',
        orderIndex: 1,
        objective: 'Original objective',
        sections: [
          {
            name: 'Tabata Section',
            type: 'tabata',
            orderIndex: 0,
            workInterval: '20s',
            restInterval: '10s',
            rounds: 8,
            exercises: [],
          },
        ],
        createdBy: testCreatorId,
        isPublic: true,
      });

      const copyData = {
        name: 'Copied Workout',
        modifications: {
          objective: 'Modified objective',
        },
      };

      const response = await request(app)
        .post(`/api/v1/workouts/${originalWorkout._id}/copy`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(copyData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.workout.name).toBe('Copied Workout');
      expect(response.body.data.workout.objective).toBe('Modified objective');
      expect(response.body.data.workout.sections).toHaveLength(1);
      expect(response.body.data.workout._id).not.toBe(
        originalWorkout._id.toString()
      );
    });

    it('should return 404 for non-existent workout', async () => {
      const nonExistentId = new Types.ObjectId();

      await request(app)
        .post(`/api/v1/workouts/${nonExistentId}/copy`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send({ name: 'Copy Name' })
        .expect(404);
    });
  });

  describe('PUT /api/v1/workouts/:id/archive', () => {
    it('should archive a workout', async () => {
      const workout = await StrengthWorkoutModel.create({
        name: 'Workout to Archive',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Basic Section',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
        createdBy: testCreatorId,
      });

      const response = await request(app)
        .put(`/api/v1/workouts/${workout._id}/archive`)
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.workout.isArchived).toBe(true);
      expect(response.body.data.workout).toHaveProperty('purgeAt');
    });
  });

  describe('DELETE /api/v1/workouts/:id', () => {
    it('should delete a workout as admin', async () => {
      const workout = await StrengthWorkoutModel.create({
        name: 'Workout to Delete',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Circuit Section',
            type: 'circuit',
            orderIndex: 0,
            rounds: 3,
            restBetweenRounds: '90s',
            restBetweenExercises: '15s',
            exercises: [],
          },
        ],
        createdBy: testCreatorId,
      });

      await request(app)
        .delete(`/api/v1/workouts/${workout._id}`)
        .set('Authorization', `Bearer ${mockAdminToken}`)
        .expect(204);

      // Verify workout is deleted
      const deletedWorkout = await WorkoutModel.findById(workout._id);
      expect(deletedWorkout).toBeNull();
    });

    it('should return 403 for non-admin user', async () => {
      const workout = await StrengthWorkoutModel.create({
        name: 'Workout to Delete',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Basic Section',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
        createdBy: testCreatorId,
      });

      await request(app)
        .delete(`/api/v1/workouts/${workout._id}`)
        .set('Authorization', `Bearer ${mockUserToken}`)
        .expect(403);
    });
  });

  describe('DELETE /api/v1/workouts/purge', () => {
    it('should purge archived workouts as admin', async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      // Create archived workouts
      await Promise.all([
        StrengthWorkoutModel.create({
          name: 'Archived Workout 1',
          type: 'strength',
          orderIndex: 1,
          sections: [
            { name: 'Section', type: 'basic', orderIndex: 0, exercises: [] },
          ],
          createdBy: testCreatorId,
          isArchived: true,
          purgeAt: pastDate, // Should be purged
        }),
        StrengthWorkoutModel.create({
          name: 'Archived Workout 2',
          type: 'strength',
          orderIndex: 2,
          sections: [
            { name: 'Section', type: 'basic', orderIndex: 0, exercises: [] },
          ],
          createdBy: testCreatorId,
          isArchived: true,
          purgeAt: new Date(Date.now() + 86400000), // Should not be purged (future date)
        }),
        StrengthWorkoutModel.create({
          name: 'Active Workout',
          type: 'strength',
          orderIndex: 3,
          sections: [
            { name: 'Section', type: 'basic', orderIndex: 0, exercises: [] },
          ],
          createdBy: testCreatorId,
          isArchived: false, // Should not be purged
        }),
      ]);

      const response = await request(app)
        .delete('/api/v1/workouts/purge')
        .set('Authorization', `Bearer ${mockAdminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.purgedCount).toBe(1);

      // Verify only the correct workout was purged
      const remainingWorkouts = await WorkoutModel.find({});
      expect(remainingWorkouts).toHaveLength(2);
    });

    it('should return 403 for non-admin user', async () => {
      await request(app)
        .delete('/api/v1/workouts/purge')
        .set('Authorization', `Bearer ${mockUserToken}`)
        .expect(403);
    });
  });

  describe('Workout Section Types', () => {
    it('should handle all section types correctly', async () => {
      const workoutData = {
        name: 'Complete Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Warmup',
            type: 'warmup',
            orderIndex: 0,
            duration: 10,
            intensity: 'moderate',
            targetMuscleGroups: ['legs'],
            exercises: [],
          },
          {
            name: 'EMOM Block',
            type: 'emom',
            orderIndex: 1,
            emomDuration: 15,
            rounds: 5,
            restBetweenRounds: '2m',
            exercises: [],
          },
          {
            name: 'Tabata',
            type: 'tabata',
            orderIndex: 2,
            workInterval: '20s',
            restInterval: '10s',
            rounds: 8,
            exercises: [],
          },
          {
            name: 'Circuit',
            type: 'circuit',
            orderIndex: 3,
            rounds: 3,
            restBetweenRounds: '90s',
            restBetweenExercises: '15s',
            exercises: [],
          },
          {
            name: 'Cooldown',
            type: 'cooldown',
            orderIndex: 4,
            duration: 5,
            stretchingFocus: ['full-body'],
            exercises: [],
          },
        ],
      };

      const response = await request(app)
        .post('/api/v1/workouts')
        .set('Authorization', `Bearer ${mockTrainerToken}`)
        .send(workoutData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.workout.sections).toHaveLength(5);

      const sections = response.body.data.workout.sections;
      expect(sections[0].type).toBe('warmup');
      expect(sections[1].type).toBe('emom');
      expect(sections[2].type).toBe('tabata');
      expect(sections[3].type).toBe('circuit');
      expect(sections[4].type).toBe('cooldown');
    });
  });
});
