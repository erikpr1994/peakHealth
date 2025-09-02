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
  WorkoutModel,
  isStrengthWorkout,
  isRunningWorkout,
  isTrailRunningWorkout,
  WorkoutDocument,
} from './Workout';

describe('Workout Models', () => {
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
    await WorkoutModel.deleteMany({});
  });

  afterEach(async () => {
    // Clean up after each test
    await WorkoutModel.deleteMany({});
  });

  describe('Base Workout Model', () => {
    it('should create a basic workout with required fields', async () => {
      const workoutData = {
        name: 'Upper Body Strength',
        type: 'strength' as const,
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
      };

      const workout = new WorkoutModel(workoutData);
      await workout.save();

      expect(workout.name).toBe(workoutData.name);
      expect(workout.type).toBe(workoutData.type);
      expect(workout.orderIndex).toBe(workoutData.orderIndex);
      expect(workout.objective).toBe(workoutData.objective);
      expect(workout.sections).toHaveLength(1);
      expect(workout.sections[0].name).toBe('Warmup');
      expect(workout.schemaVersion).toBe('1.0.0');
      expect(workout.createdAt).toBeInstanceOf(Date);
      expect(workout.updatedAt).toBeInstanceOf(Date);
    });

    it('should validate required fields', async () => {
      const workout = new WorkoutModel({});

      let error: any;
      try {
        await workout.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.name).toBeDefined();
      expect(error.errors.type).toBeDefined();
      expect(error.errors.orderIndex).toBeDefined();
      expect(error.errors.sections).toBeDefined();
    });

    it('should validate workout type enum', async () => {
      const workout = new WorkoutModel({
        name: 'Test Workout',
        type: 'invalid' as any,
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
      });

      let error: any;
      try {
        await workout.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.type.message).toContain(
        'Workout type must be strength, running, or trail-running'
      );
    });

    it('should require at least one section', async () => {
      const workout = new WorkoutModel({
        name: 'Test Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [],
      });

      let error: any;
      try {
        await workout.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.sections.message).toContain(
        'Workout must have at least one section'
      );
    });

    it('should calculate section count virtual', async () => {
      const workout = new WorkoutModel({
        name: 'Test Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Warmup',
            type: 'warmup',
            orderIndex: 0,
            exercises: [],
          },
          {
            name: 'Main',
            type: 'basic',
            orderIndex: 1,
            exercises: [],
          },
          {
            name: 'Cooldown',
            type: 'cooldown',
            orderIndex: 2,
            exercises: [],
          },
        ],
      });

      await workout.save();

      expect(workout.sectionCount).toBe(3);
    });

    it('should transform to JSON correctly', async () => {
      const workout = new WorkoutModel({
        name: 'Test Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
      });

      await workout.save();
      const json = workout.toJSON();

      expect(typeof json._id).toBe('string');
      expect(typeof json.createdAt).toBe('string');
      expect(typeof json.updatedAt).toBe('string');
      expect(json.sectionCount).toBe(1);
    });
  });

  describe('Strength Workout Sections', () => {
    it('should create a strength workout with EMOM section', async () => {
      const workout = new WorkoutModel({
        name: 'EMOM Strength Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'EMOM Block',
            type: 'emom',
            orderIndex: 0,
            emomDuration: 12,
            rounds: 4,
            restBetweenRounds: '2m',
            exercises: [],
          },
        ],
      });

      await workout.save();

      expect(workout.sections[0].type).toBe('emom');
      expect(workout.sections[0].emomDuration).toBe(12);
      expect(workout.sections[0].rounds).toBe(4);
      expect(workout.sections[0].restBetweenRounds).toBe('2m');
    });

    it('should create a strength workout with tabata section', async () => {
      const workout = new WorkoutModel({
        name: 'Tabata Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Tabata Block',
            type: 'tabata',
            orderIndex: 0,
            workInterval: '20s',
            restInterval: '10s',
            rounds: 8,
            exercises: [],
          },
        ],
      });

      await workout.save();

      expect(workout.sections[0].type).toBe('tabata');
      expect(workout.sections[0].workInterval).toBe('20s');
      expect(workout.sections[0].restInterval).toBe('10s');
      expect(workout.sections[0].rounds).toBe(8);
    });

    it('should create a strength workout with circuit section', async () => {
      const workout = new WorkoutModel({
        name: 'Circuit Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Circuit Block',
            type: 'circuit',
            orderIndex: 0,
            rounds: 3,
            restBetweenRounds: '90s',
            restBetweenExercises: '15s',
            exercises: [],
          },
        ],
      });

      await workout.save();

      expect(workout.sections[0].type).toBe('circuit');
      expect(workout.sections[0].rounds).toBe(3);
      expect(workout.sections[0].restBetweenRounds).toBe('90s');
      expect(workout.sections[0].restBetweenExercises).toBe('15s');
    });
  });

  describe('Running Workout Sections', () => {
    it('should create a running workout with intervals section', async () => {
      const workout = new WorkoutModel({
        name: 'Interval Run',
        type: 'running',
        orderIndex: 1,
        sections: [
          {
            name: 'Speed Intervals',
            type: 'intervals',
            orderIndex: 0,
            rounds: 6,
            workDuration: '2m',
            restDuration: '90s',
            intensity: 'vo2max',
            exercises: [],
          },
        ],
      });

      await workout.save();

      expect(workout.sections[0].type).toBe('intervals');
      expect(workout.sections[0].rounds).toBe(6);
      expect(workout.sections[0].workDuration).toBe('2m');
      expect(workout.sections[0].intensity).toBe('vo2max');
    });

    it('should create a running workout with tempo section', async () => {
      const workout = new WorkoutModel({
        name: 'Tempo Run',
        type: 'running',
        orderIndex: 1,
        sections: [
          {
            name: 'Tempo Block',
            type: 'tempo',
            orderIndex: 0,
            distance: 5,
            duration: '25m',
            targetPace: '7:30/mile',
            exercises: [],
          },
        ],
      });

      await workout.save();

      expect(workout.sections[0].type).toBe('tempo');
      expect(workout.sections[0].distance).toBe(5);
      expect(workout.sections[0].targetPace).toBe('7:30/mile');
    });

    it('should create a trail running workout with hill repeats', async () => {
      const workout = new WorkoutModel({
        name: 'Hill Repeat Session',
        type: 'trail-running',
        orderIndex: 1,
        sections: [
          {
            name: 'Hill Repeats',
            type: 'hill_repeats',
            orderIndex: 0,
            repeats: 8,
            hillLength: 200,
            restType: 'jog_down',
            exercises: [],
          },
        ],
      });

      await workout.save();

      expect(workout.sections[0].type).toBe('hill_repeats');
      expect(workout.sections[0].repeats).toBe(8);
      expect(workout.sections[0].hillLength).toBe(200);
      expect(workout.sections[0].restType).toBe('jog_down');
    });
  });

  describe('Section Validation', () => {
    it('should validate section type enum', async () => {
      const workout = new WorkoutModel({
        name: 'Test Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Invalid Section',
            type: 'invalid' as any,
            orderIndex: 0,
            exercises: [],
          },
        ],
      });

      let error: any;
      try {
        await workout.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors['sections.0.type'].message).toContain(
        'Invalid section type'
      );
    });

    it('should validate rest duration format', async () => {
      const workout = new WorkoutModel({
        name: 'Test Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section',
            type: 'basic',
            orderIndex: 0,
            restAfter: 'invalid-format',
            exercises: [],
          },
        ],
      });

      let error: any;
      try {
        await workout.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors['sections.0.restAfter'].message).toContain(
        'Rest after must be a valid duration string'
      );
    });

    it('should accept valid rest duration formats', async () => {
      const workout = new WorkoutModel({
        name: 'Test Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section',
            type: 'basic',
            orderIndex: 0,
            restAfter: '60s',
            exercises: [],
          },
        ],
      });

      await workout.save();
      expect(workout.sections[0].restAfter).toBe('60s');
    });
  });

  describe('Versioning', () => {
    it('should create versioned workout templates', async () => {
      const parentWorkoutId = new Types.ObjectId();
      const createdBy = new Types.ObjectId();

      const workout1 = new WorkoutModel({
        name: 'Test Workout v1',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
        createdBy,
        parentWorkoutId,
        version: 1,
        isLatest: true,
      });

      await workout1.save();

      expect(workout1.parentWorkoutId?.toString()).toBe(
        parentWorkoutId.toString()
      );
      expect(workout1.version).toBe(1);
      expect(workout1.isLatest).toBe(true);
    });

    it('should enforce unique version per parent workout', async () => {
      const parentWorkoutId = new Types.ObjectId();
      const createdBy = new Types.ObjectId();

      const workout1 = new WorkoutModel({
        name: 'Test Workout v1',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
        createdBy,
        parentWorkoutId,
        version: 1,
      });

      await workout1.save();

      const workout2 = new WorkoutModel({
        name: 'Test Workout v1 Duplicate',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
        createdBy,
        parentWorkoutId,
        version: 1, // Same version as workout1
      });

      let error: any;
      try {
        await workout2.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.code).toBe(11000); // Duplicate key error
    });

    it('should update isLatest flag when new version is marked latest', async () => {
      const parentWorkoutId = new Types.ObjectId();
      const createdBy = new Types.ObjectId();

      // Create first version
      const workout1 = new WorkoutModel({
        name: 'Test Workout v1',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
        createdBy,
        parentWorkoutId,
        version: 1,
        isLatest: true,
      });

      await workout1.save();

      // Create second version and mark as latest
      const workout2 = new WorkoutModel({
        name: 'Test Workout v2',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section v2',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
        createdBy,
        parentWorkoutId,
        version: 2,
        isLatest: true,
      });

      await workout2.save();

      // Refresh workout1 from database
      const refreshedWorkout1 = await WorkoutModel.findById(workout1._id);
      expect(refreshedWorkout1).toBeDefined();

      expect(refreshedWorkout1!.isLatest).toBe(false);
      expect(workout2.isLatest).toBe(true);
    });
  });

  describe('Type Guards', () => {
    it('should correctly identify strength workouts', async () => {
      const workout = new WorkoutModel({
        name: 'Test Strength Workout',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          },
        ],
      });

      await workout.save();

      expect(isStrengthWorkout(workout)).toBe(true);
      expect(isRunningWorkout(workout)).toBe(false);
      expect(isTrailRunningWorkout(workout)).toBe(false);
    });

    it('should correctly identify running workouts', async () => {
      const workout = new WorkoutModel({
        name: 'Test Running Workout',
        type: 'running',
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section',
            type: 'intervals',
            orderIndex: 0,
            rounds: 4,
            workDuration: '2m',
            restDuration: '90s',
            intensity: 'aerobic',
            exercises: [],
          },
        ],
      });

      await workout.save();

      expect(isRunningWorkout(workout)).toBe(true);
      expect(isStrengthWorkout(workout)).toBe(false);
      expect(isTrailRunningWorkout(workout)).toBe(false);
    });

    it('should correctly identify trail running workouts', async () => {
      const workout = new WorkoutModel({
        name: 'Test Trail Running Workout',
        type: 'trail-running',
        orderIndex: 1,
        sections: [
          {
            name: 'Test Section',
            type: 'hill_repeats',
            orderIndex: 0,
            repeats: 6,
            restType: 'jog_down',
            exercises: [],
          },
        ],
      });

      await workout.save();

      expect(isTrailRunningWorkout(workout)).toBe(true);
      expect(isStrengthWorkout(workout)).toBe(false);
      expect(isRunningWorkout(workout)).toBe(false);
    });
  });
});
