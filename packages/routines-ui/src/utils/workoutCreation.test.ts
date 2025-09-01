import { describe, it, expect, beforeEach } from 'vitest';
import {
  createWorkout,
  createDefaultStrengthWorkout,
  createDefaultRunningWorkout,
  createDefaultTrailRunningWorkout,
  type WorkoutType,
} from './workoutCreation';

// Mock the idGenerator
vi.mock('./idGenerator', () => ({
  generateId: () => 'test-id-123',
}));

describe('workoutCreation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createWorkout', () => {
    it('creates a strength workout with correct properties', () => {
      const options = {
        name: 'Upper Body Strength',
        type: 'strength' as WorkoutType,
        objective: 'Build upper body strength',
        notes: 'Focus on compound movements',
        orderIndex: 0,
      };

      const workout = createWorkout(options);

      expect(workout).toMatchObject({
        _id: 'test-id-123',
        name: 'Upper Body Strength',
        type: 'strength',
        objective: 'Build upper body strength',
        notes: 'Focus on compound movements',
        orderIndex: 0,
        sections: [],
      });
    });

    it('creates a running workout with correct properties', () => {
      const options = {
        name: 'Easy Run',
        type: 'running' as WorkoutType,
        objective: 'Build endurance',
        orderIndex: 1,
      };

      const workout = createWorkout(options);

      expect(workout).toMatchObject({
        _id: 'test-id-123',
        name: 'Easy Run',
        type: 'running',
        objective: 'Build endurance',
        orderIndex: 1,
        sections: [],
      });
    });

    it('creates a trail running workout with correct properties', () => {
      const options = {
        name: 'Trail Run',
        type: 'trail-running' as WorkoutType,
        objective: 'Improve trail skills',
        notes: 'Technical terrain focus',
        orderIndex: 2,
      };

      const workout = createWorkout(options);

      expect(workout).toMatchObject({
        _id: 'test-id-123',
        name: 'Trail Run',
        type: 'trail-running',
        objective: 'Improve trail skills',
        notes: 'Technical terrain focus',
        orderIndex: 2,
        sections: [],
      });
    });

    it('uses default values when optional properties are not provided', () => {
      const options = {
        name: 'Basic Workout',
        type: 'strength' as WorkoutType,
      };

      const workout = createWorkout(options);

      expect(workout).toMatchObject({
        _id: 'test-id-123',
        name: 'Basic Workout',
        type: 'strength',
        objective: undefined,
        notes: undefined,
        orderIndex: 0,
        sections: [],
      });
    });

    it('throws error for invalid workout type', () => {
      const options = {
        name: 'Invalid Workout',
        type: 'invalid' as any,
      };

      expect(() => createWorkout(options)).toThrow(
        'Invalid workout type: invalid'
      );
    });
  });

  describe('createDefaultStrengthWorkout', () => {
    it('creates a strength workout with default values', () => {
      const workout = createDefaultStrengthWorkout('Push Day', 0);

      expect(workout).toMatchObject({
        _id: 'test-id-123',
        name: 'Push Day',
        type: 'strength',
        objective: 'Build strength and muscle',
        orderIndex: 0,
        sections: [],
      });
    });

    it('uses provided orderIndex', () => {
      const workout = createDefaultStrengthWorkout('Pull Day', 5);

      expect(workout.orderIndex).toBe(5);
    });
  });

  describe('createDefaultRunningWorkout', () => {
    it('creates a running workout with default values', () => {
      const workout = createDefaultRunningWorkout('Morning Run', 1);

      expect(workout).toMatchObject({
        _id: 'test-id-123',
        name: 'Morning Run',
        type: 'running',
        objective: 'Improve cardiovascular fitness',
        orderIndex: 1,
        sections: [],
      });
    });
  });

  describe('createDefaultTrailRunningWorkout', () => {
    it('creates a trail running workout with default values', () => {
      const workout = createDefaultTrailRunningWorkout('Mountain Trail', 2);

      expect(workout).toMatchObject({
        _id: 'test-id-123',
        name: 'Mountain Trail',
        type: 'trail-running',
        objective: 'Build trail running endurance and skills',
        orderIndex: 2,
        sections: [],
      });
    });
  });

  describe('workout type safety', () => {
    it('ensures strength workout has correct type', () => {
      const workout = createDefaultStrengthWorkout('Strength Workout');

      expect(workout.type).toBe('strength');
      // TypeScript should ensure this is a StrengthWorkout
      expect(workout.sections).toEqual([]);
    });

    it('ensures running workout has correct type', () => {
      const workout = createDefaultRunningWorkout('Running Workout');

      expect(workout.type).toBe('running');
      // TypeScript should ensure this is a RunningWorkout
      expect(workout.sections).toEqual([]);
    });

    it('ensures trail running workout has correct type', () => {
      const workout = createDefaultTrailRunningWorkout('Trail Workout');

      expect(workout.type).toBe('trail-running');
      // TypeScript should ensure this is a TrailRunningWorkout
      expect(workout.sections).toEqual([]);
    });
  });
});
