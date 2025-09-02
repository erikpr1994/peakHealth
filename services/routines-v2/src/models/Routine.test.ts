import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest';
import { Types } from 'mongoose';
import { db } from '../utils/database';
import {
  RoutineModel,
  UserCreatedRoutineModel,
  TemplateRoutineModel,
  RoutineDocument,
  isUserCreatedRoutine,
  isTemplateRoutine,
} from './Routine';

describe('Routine Models', () => {
  beforeAll(async () => {
    await db.connect({
      uri: 'mongodb://localhost:27017/routines-v2-test',
    });
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    // Clean up test data
    await RoutineModel.deleteMany({});
  });

  afterEach(async () => {
    // Clean up after each test
    await RoutineModel.deleteMany({});
  });

  describe('Base Routine Model', () => {
    it('should create a basic routine with required fields', async () => {
      const routineData = {
        name: 'Test Routine',
        difficulty: 'beginner' as const,
        goal: 'strength' as const,
        duration: 12,
        objectives: ['Build muscle', 'Increase strength'],
        routineType: 'user-created' as const,
        userId: new Types.ObjectId(),
        createdBy: new Types.ObjectId(),
      };

      const routine = new RoutineModel(routineData);
      await routine.save();

      expect(routine.name).toBe(routineData.name);
      expect(routine.difficulty).toBe(routineData.difficulty);
      expect(routine.goal).toBe(routineData.goal);
      expect(routine.duration).toBe(routineData.duration);
      expect(routine.objectives).toEqual(routineData.objectives);
      expect(routine.schemaVersion).toBe('1.0.0');
      expect(routine.createdAt).toBeInstanceOf(Date);
      expect(routine.updatedAt).toBeInstanceOf(Date);
    });

    it('should validate required fields', async () => {
      const routine = new RoutineModel({});

      let error: any;
      try {
        await routine.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.name).toBeDefined();
      expect(error.errors.difficulty).toBeDefined();
      expect(error.errors.goal).toBeDefined();
      expect(error.errors.duration).toBeDefined();
      expect(error.errors.routineType).toBeDefined();
    });

    it('should validate enum values', async () => {
      const routine = new RoutineModel({
        name: 'Test',
        difficulty: 'invalid' as any,
        goal: 'invalid' as any,
        duration: 12,
        routineType: 'user-created',
        userId: new Types.ObjectId(),
        createdBy: new Types.ObjectId(),
      });

      let error: any;
      try {
        await routine.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.difficulty.message).toContain('Difficulty must be');
      expect(error.errors.goal.message).toContain('Invalid goal');
    });

    it('should validate duration range', async () => {
      const routineData = {
        name: 'Test',
        difficulty: 'beginner' as const,
        goal: 'strength' as const,
        duration: 100, // Invalid - too high
        routineType: 'user-created' as const,
        userId: new Types.ObjectId(),
        createdBy: new Types.ObjectId(),
      };

      const routine = new RoutineModel(routineData);

      let error: any;
      try {
        await routine.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.duration.message).toContain('cannot exceed 52 weeks');
    });

    it('should validate objectives limit', async () => {
      const objectives = Array.from(
        { length: 15 },
        (_, i) => `Objective ${i + 1}`
      );

      const routine = new RoutineModel({
        name: 'Test',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        objectives,
        routineType: 'user-created',
        userId: new Types.ObjectId(),
        createdBy: new Types.ObjectId(),
      });

      let error: any;
      try {
        await routine.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.objectives.message).toContain(
        'Cannot have more than 10 objectives'
      );
    });

    it('should calculate workout count virtual', async () => {
      const workoutIds = [
        new Types.ObjectId(),
        new Types.ObjectId(),
        new Types.ObjectId(),
      ];

      const routine = new RoutineModel({
        name: 'Test',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        workouts: workoutIds,
        routineType: 'user-created',
        userId: new Types.ObjectId(),
        createdBy: new Types.ObjectId(),
      });

      await routine.save();

      expect(routine.workoutCount).toBe(3);
    });

    it('should transform to JSON correctly', async () => {
      const routine = new RoutineModel({
        name: 'Test',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        routineType: 'user-created',
        userId: new Types.ObjectId(),
        createdBy: new Types.ObjectId(),
      });

      await routine.save();
      const json = routine.toJSON();

      expect(typeof json._id).toBe('string');
      expect(typeof json.createdAt).toBe('string');
      expect(typeof json.updatedAt).toBe('string');
      expect(json.workoutCount).toBe(0);
    });
  });

  describe('User Created Routine Model', () => {
    it('should create a user-created routine with all fields', async () => {
      const userId = new Types.ObjectId();
      const createdBy = new Types.ObjectId();

      const routine = new UserCreatedRoutineModel({
        name: 'My Custom Routine',
        difficulty: 'intermediate',
        goal: 'hypertrophy',
        duration: 8,
        objectives: ['Build bigger chest', 'Improve bench press'],
        userId,
        createdBy,
        isActive: true,
        isFavorite: true,
        completedWorkouts: 5,
        totalWorkouts: 24,
        lastUsed: new Date(),
      });

      await routine.save();

      expect(routine.routineType).toBe('user-created');
      expect(routine.userId?.toString()).toBe(userId.toString());
      expect(routine.createdBy?.toString()).toBe(createdBy.toString());
      expect(routine.isActive).toBe(true);
      expect(routine.isFavorite).toBe(true);
      expect(routine.completedWorkouts).toBe(5);
      expect(routine.totalWorkouts).toBe(24);
      expect(routine.lastUsed).toBeInstanceOf(Date);
    });

    it('should require userId for user-created routines', async () => {
      const routine = new UserCreatedRoutineModel({
        name: 'Test',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        createdBy: new Types.ObjectId(),
      });

      let error: any;
      try {
        await routine.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.userId).toBeDefined();
    });

    it('should have default values for optional fields', async () => {
      const routine = new UserCreatedRoutineModel({
        name: 'Test',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        userId: new Types.ObjectId(),
        createdBy: new Types.ObjectId(),
      });

      await routine.save();

      expect(routine.isActive).toBe(false);
      expect(routine.isFavorite).toBe(false);
      expect(routine.completedWorkouts).toBe(0);
      expect(routine.totalWorkouts).toBe(0);
    });

    it('should validate progress values', async () => {
      const routine = new UserCreatedRoutineModel({
        name: 'Test',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        userId: new Types.ObjectId(),
        createdBy: new Types.ObjectId(),
        completedWorkouts: -1, // Invalid
      });

      let error: any;
      try {
        await routine.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.completedWorkouts.message).toContain(
        'cannot be negative'
      );
    });
  });

  describe('Template Routine Model', () => {
    it('should create a template routine with all fields', async () => {
      const createdBy = new Types.ObjectId();
      const parentRoutineId = new Types.ObjectId();

      const routine = new TemplateRoutineModel({
        name: 'Professional Strength Program',
        difficulty: 'advanced',
        goal: 'strength',
        duration: 16,
        objectives: ['Increase max lifts', 'Perfect technique'],
        templateType: 'trainer',
        createdBy,
        allowCopy: true,
        isPublic: true,
        tags: ['powerlifting', 'strength', 'advanced'],
        targetAudience: ['experienced lifters', 'powerlifters'],
        parentRoutineId,
        version: 1,
        isLatest: true,
      });

      await routine.save();

      expect(routine.routineType).toBe('template');
      expect(routine.templateType).toBe('trainer');
      expect(routine.createdBy?.toString()).toBe(createdBy.toString());
      expect(routine.allowCopy).toBe(true);
      expect(routine.isPublic).toBe(true);
      expect(routine.tags).toEqual(['powerlifting', 'strength', 'advanced']);
      expect(routine.targetAudience).toEqual([
        'experienced lifters',
        'powerlifters',
      ]);
      expect(routine.parentRoutineId?.toString()).toBe(
        parentRoutineId.toString()
      );
      expect(routine.version).toBe(1);
      expect(routine.isLatest).toBe(true);
    });

    it('should require template-specific fields', async () => {
      const routine = new TemplateRoutineModel({
        name: 'Test',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        createdBy: new Types.ObjectId(),
      });

      let error: any;
      try {
        await routine.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.templateType).toBeDefined();
      expect(error.errors.parentRoutineId).toBeDefined();
      expect(error.errors.version).toBeDefined();
    });

    it('should validate templateType enum', async () => {
      const routine = new TemplateRoutineModel({
        name: 'Test',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        templateType: 'invalid' as any,
        createdBy: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        version: 1,
      });

      let error: any;
      try {
        await routine.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.templateType.message).toContain(
        'must be trainer or company'
      );
    });

    it('should validate tags limit', async () => {
      const tags = Array.from({ length: 25 }, (_, i) => `tag${i + 1}`);

      const routine = new TemplateRoutineModel({
        name: 'Test',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        templateType: 'trainer',
        createdBy: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        version: 1,
        tags,
      });

      let error: any;
      try {
        await routine.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.tags.message).toContain(
        'Cannot have more than 20 tags'
      );
    });

    it('should enforce unique version per parent routine', async () => {
      const parentRoutineId = new Types.ObjectId();
      const createdBy = new Types.ObjectId();

      const routine1 = new TemplateRoutineModel({
        name: 'Test Routine v1',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        templateType: 'trainer',
        createdBy,
        parentRoutineId,
        version: 1,
      });

      await routine1.save();

      const routine2 = new TemplateRoutineModel({
        name: 'Test Routine v1 Duplicate',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        templateType: 'trainer',
        createdBy,
        parentRoutineId,
        version: 1, // Same version as routine1
      });

      let error: any;
      try {
        await routine2.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.code).toBe(11000); // Duplicate key error
    });

    it('should update isLatest flag when new version is marked latest', async () => {
      const parentRoutineId = new Types.ObjectId();
      const createdBy = new Types.ObjectId();

      // Create first version
      const routine1 = new TemplateRoutineModel({
        name: 'Test Routine v1',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        templateType: 'trainer',
        createdBy,
        parentRoutineId,
        version: 1,
        isLatest: true,
      });

      await routine1.save();

      // Create second version and mark as latest
      const routine2 = new TemplateRoutineModel({
        name: 'Test Routine v2',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        templateType: 'trainer',
        createdBy,
        parentRoutineId,
        version: 2,
        isLatest: true,
      });

      await routine2.save();

      // Refresh routine1 from database
      const refreshedRoutine1 = await TemplateRoutineModel.findById(
        routine1._id
      );
      expect(refreshedRoutine1).toBeDefined();

      expect(refreshedRoutine1!.isLatest).toBe(false);
      expect(routine2.isLatest).toBe(true);
    });
  });

  describe('Type Guards', () => {
    it('should correctly identify user-created routines', async () => {
      const routine = new UserCreatedRoutineModel({
        name: 'Test',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        userId: new Types.ObjectId(),
        createdBy: new Types.ObjectId(),
      });

      await routine.save();

      expect(isUserCreatedRoutine(routine)).toBe(true);
      expect(isTemplateRoutine(routine)).toBe(false);
    });

    it('should correctly identify template routines', async () => {
      const routine = new TemplateRoutineModel({
        name: 'Test',
        difficulty: 'beginner',
        goal: 'strength',
        duration: 12,
        templateType: 'trainer',
        createdBy: new Types.ObjectId(),
        parentRoutineId: new Types.ObjectId(),
        version: 1,
      });

      await routine.save();

      expect(isTemplateRoutine(routine)).toBe(true);
      expect(isUserCreatedRoutine(routine)).toBe(false);
    });
  });
});
