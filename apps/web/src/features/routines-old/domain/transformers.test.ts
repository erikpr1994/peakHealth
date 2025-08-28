import { describe, test, expect } from 'vitest';
import {
  // Type guard functions
  isValidWorkoutType,
  isValidSectionType,
  isValidDifficulty,
  isValidGoal,
  isValidProgressionMethod,
  isValidSetType,
  isValidRepType,
  // Transformation functions
  transformDatabaseSet,
  transformDatabaseExercise,
  transformDatabaseSection,
  transformDatabaseWorkout,
  transformDatabaseRoutineToRoutineData,
  transformDatabaseRoutineToRoutine,
} from './transformers';
import {
  DatabaseRoutineRPCResponse,
  DatabaseRoutineWithWorkouts,
} from '../types/database';
import type { RunningWorkout } from '../types';

describe('Data Transformers - Type Guards', () => {
  describe('isValidWorkoutType', () => {
    test('should return true for valid workout types', () => {
      expect(isValidWorkoutType('strength')).toBe(true);
      expect(isValidWorkoutType('running')).toBe(true);
    });

    test('should return false for invalid workout types', () => {
      expect(isValidWorkoutType('cardio')).toBe(false);
      expect(isValidWorkoutType('yoga')).toBe(false);
      expect(isValidWorkoutType('')).toBe(false);
    });
  });

  describe('isValidSectionType', () => {
    test('should return true for valid section types', () => {
      expect(isValidSectionType('warmup')).toBe(true);
      expect(isValidSectionType('basic')).toBe(true);
      expect(isValidSectionType('cooldown')).toBe(true);
      expect(isValidSectionType('emom')).toBe(true);
      expect(isValidSectionType('tabata')).toBe(true);
      expect(isValidSectionType('amrap')).toBe(true);
    });

    test('should return false for invalid section types', () => {
      expect(isValidSectionType('invalid')).toBe(false);
      expect(isValidSectionType('strength')).toBe(false);
      expect(isValidSectionType('')).toBe(false);
    });
  });

  describe('isValidDifficulty', () => {
    test('should return true for valid difficulties', () => {
      expect(isValidDifficulty('Beginner')).toBe(true);
      expect(isValidDifficulty('Intermediate')).toBe(true);
      expect(isValidDifficulty('Advanced')).toBe(true);
    });

    test('should return false for invalid difficulties', () => {
      expect(isValidDifficulty('Easy')).toBe(false);
      expect(isValidDifficulty('Hard')).toBe(false);
      expect(isValidDifficulty('')).toBe(false);
    });
  });

  describe('isValidGoal', () => {
    test('should return true for valid goals', () => {
      expect(isValidGoal('Strength')).toBe(true);
      expect(isValidGoal('Hypertrophy')).toBe(true);
      expect(isValidGoal('Endurance')).toBe(true);
      expect(isValidGoal('Weight Loss')).toBe(true);
    });

    test('should return false for invalid goals', () => {
      expect(isValidGoal('Flexibility')).toBe(false);
      expect(isValidGoal('Balance')).toBe(false);
      expect(isValidGoal('')).toBe(false);
    });
  });

  describe('isValidProgressionMethod', () => {
    test('should return true for valid progression methods', () => {
      expect(isValidProgressionMethod('linear')).toBe(true);
      expect(isValidProgressionMethod('dual')).toBe(true);
      expect(isValidProgressionMethod('inverse-pyramid')).toBe(true);
      expect(isValidProgressionMethod('myo-reps')).toBe(true);
      expect(isValidProgressionMethod('widowmaker')).toBe(true);
      expect(isValidProgressionMethod('amrap')).toBe(true);
    });

    test('should return false for invalid progression methods', () => {
      expect(isValidProgressionMethod('invalid')).toBe(false);
      expect(isValidProgressionMethod('')).toBe(false);
    });
  });

  describe('isValidSetType', () => {
    test('should return true for valid set types', () => {
      expect(isValidSetType('warmup')).toBe(true);
      expect(isValidSetType('normal')).toBe(true);
      expect(isValidSetType('failure')).toBe(true);
      expect(isValidSetType('dropset')).toBe(true);
    });

    test('should return false for invalid set types', () => {
      expect(isValidSetType('invalid')).toBe(false);
      expect(isValidSetType('')).toBe(false);
    });
  });

  describe('isValidRepType', () => {
    test('should return true for valid rep types', () => {
      expect(isValidRepType('fixed')).toBe(true);
      expect(isValidRepType('range')).toBe(true);
    });

    test('should return false for invalid rep types', () => {
      expect(isValidRepType('invalid')).toBe(false);
      expect(isValidRepType('')).toBe(false);
    });
  });
});

describe('Data Transformers - Individual Entity Transformations', () => {
  describe('transformDatabaseSet', () => {
    test('should transform valid database set correctly', () => {
      const mockDatabaseSet = {
        id: 'set-1',
        setNumber: 1,
        setType: 'normal',
        repType: 'fixed',
        reps: 10,
        weight: 100,
        rpe: 8,
        notes: 'Test notes',
      };

      const result = transformDatabaseSet(mockDatabaseSet);

      expect(result).toEqual({
        id: 'set-1',
        setNumber: 1,
        setType: 'normal',
        repType: 'fixed',
        reps: 10,
        weight: 100,
        rpe: 8,
        notes: 'Test notes',
      });
    });

    test('should handle invalid set type with default', () => {
      const mockDatabaseSet = {
        id: 'set-1',
        setNumber: 1,
        setType: 'invalid',
        repType: 'fixed',
        reps: 10,
        weight: 100,
        rpe: null,
        notes: '',
      };

      const result = transformDatabaseSet(mockDatabaseSet);

      expect(result.setType).toBe('normal');
      expect(result.notes).toBe('');
    });

    test('should handle missing repType with default', () => {
      const mockDatabaseSet = {
        id: 'set-1',
        setNumber: 1,
        setType: 'normal',
        repType: undefined,
        reps: 10,
        weight: 100,
        rpe: null,
        notes: '',
      };

      const result = transformDatabaseSet(mockDatabaseSet);

      expect(result.repType).toBe('fixed');
      expect(result.notes).toBe('');
    });
  });

  describe('transformDatabaseExercise', () => {
    test('should transform valid database exercise correctly', () => {
      const mockDatabaseExercise = {
        id: 'exercise-1',
        name: 'Bench Press',
        category: 'strength',
        muscle_groups: ['chest', 'triceps'],
        exerciseLibraryId: 'ex-1',
        sets: [
          {
            id: 'set-1',
            setNumber: 1,
            setType: 'normal',
            repType: 'fixed',
            reps: 10,
            weight: 100,
            rpe: null,
            notes: '',
          },
        ],
        progression_method: 'linear',
        rest_timer: '90s',
        rest_after: '2 min',
        notes: 'Test exercise',
        has_approach_sets: true,
        emom_reps: 5,
      };

      const result = transformDatabaseExercise(mockDatabaseExercise);

      expect(result.id).toBe('exercise-1');
      expect(result.name).toBe('Bench Press');
      expect(result.category).toBe('strength');
      expect(result.muscleGroups).toEqual(['chest', 'triceps']);
      expect(result.exerciseId).toBe('ex-1');
      expect(result.variantId).toBe('ex-1');
      expect(result.sets).toHaveLength(1);
      expect(result.restTimer).toBe('90s');
      expect(result.restAfter).toBe('2 min');
      expect(result.notes).toBe('Test exercise');
      expect(result.progressionMethod).toBe('linear');
      expect(result.hasApproachSets).toBe(true);
      expect(result.emomReps).toBe(5);
    });

    test('should handle missing optional fields', () => {
      const mockDatabaseExercise = {
        id: 'exercise-1',
        name: 'Bench Press',
        category: null,
        muscle_groups: undefined,
        exerciseLibraryId: 'ex-1',
        sets: undefined,
        progression_method: undefined,
        rest_timer: undefined,
        rest_after: undefined,
        notes: undefined,
        has_approach_sets: undefined,
        emom_reps: undefined,
      };

      const result = transformDatabaseExercise(mockDatabaseExercise);

      expect(result.category).toBeUndefined();
      expect(result.muscleGroups).toEqual([]);
      expect(result.sets).toEqual([]);
      expect(result.restTimer).toBe('90s');
      expect(result.restAfter).toBe('2 min');
      expect(result.notes).toBe('');
      expect(result.progressionMethod).toBeUndefined();
      expect(result.hasApproachSets).toBe(false);
      expect(result.emomReps).toBeUndefined();
    });
  });

  describe('transformDatabaseSection', () => {
    test('should transform valid database section correctly', () => {
      const mockDatabaseSection = {
        id: 'section-1',
        name: 'Push',
        type: 'basic',
        exercises: [
          {
            id: 'exercise-1',
            name: 'Bench Press',
            category: 'strength',
            muscle_groups: ['chest'],
            exerciseLibraryId: 'ex-1',
            sets: [],
            progression_method: undefined,
            rest_timer: undefined,
            rest_after: undefined,
            notes: undefined,
            has_approach_sets: undefined,
            emom_reps: undefined,
          },
        ],
        rest_after: '3 min',
        emom_duration: 10,
      };

      const result = transformDatabaseSection(mockDatabaseSection);

      expect(result.id).toBe('section-1');
      expect(result.name).toBe('Push');
      expect(result.type).toBe('basic');
      expect(result.exercises).toHaveLength(1);
      expect(result.restAfter).toBe('3 min');
      expect(result.emomDuration).toBe(10);
    });

    test('should handle invalid section type with default', () => {
      const mockDatabaseSection = {
        id: 'section-1',
        name: 'Push',
        type: 'invalid',
        exercises: undefined,
        rest_after: undefined,
        emom_duration: undefined,
      };

      const result = transformDatabaseSection(mockDatabaseSection);

      expect(result.type).toBe('basic');
      expect(result.exercises).toEqual([]);
      expect(result.restAfter).toBe('2 min');
      expect(result.emomDuration).toBeUndefined();
    });
  });

  describe('transformDatabaseWorkout', () => {
    test('should transform strength workout correctly', () => {
      const mockDatabaseWorkout = {
        id: 'workout-1',
        name: 'Push Day',
        type: 'strength',
        objective: 'Build strength',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['monday', 'wednesday'],
          time: '09:00',
        },
        sections: [],
        order_index: 1,
        trail_running_data: undefined,
      };

      const result = transformDatabaseWorkout(mockDatabaseWorkout);

      expect(result).not.toBeNull();
      expect(result?.id).toBe('workout-1');
      expect(result?.name).toBe('Push Day');
      expect(result?.type).toBe('strength');
      expect(result?.objective).toBe('Build strength');
      expect(result?.schedule.selectedDays).toEqual(['monday', 'wednesday']);
    });

    test('should transform running workout correctly', () => {
      const mockDatabaseWorkout = {
        id: 'workout-1',
        name: 'Trail Run',
        type: 'running',
        objective: 'Endurance',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['tuesday', 'thursday'],
          time: '06:00',
        },
        sections: [],
        order_index: 1,
        trail_running_data: { distance: 5, elevation: 100 },
      };

      const result = transformDatabaseWorkout(mockDatabaseWorkout);

      expect(result).not.toBeNull();
      expect(result?.id).toBe('workout-1');
      expect(result?.name).toBe('Trail Run');
      expect(result?.type).toBe('running');
      expect((result as RunningWorkout)?.trailRunningData).toEqual({
        distance: 5,
        elevation: 100,
      });
    });

    test('should return null for invalid workout type', () => {
      const mockDatabaseWorkout = {
        id: 'workout-1',
        name: 'Invalid Workout',
        type: 'invalid',
        objective: 'Test',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['monday'],
          time: '09:00',
        },
        sections: [],
        order_index: 1,
        trail_running_data: undefined,
      };

      const result = transformDatabaseWorkout(mockDatabaseWorkout);

      expect(result).toBeNull();
    });
  });
});

describe('Data Transformers - Complex Routine Transformations', () => {
  describe('transformDatabaseRoutineToRoutineData', () => {
    test('should transform RPC response to RoutineData correctly', () => {
      const mockRpcResponse: DatabaseRoutineRPCResponse = {
        routine: {
          id: 'routine-1',
          name: 'Test Routine',
          description: 'Test Description',
          difficulty: 'Beginner',
          goal: 'Strength',
          duration: 12,
          isActive: true,
          isFavorite: false,
          objectives: ['Build strength'],
          totalWorkouts: 24,
          completedWorkouts: 8,
          estimatedDuration: '45-60 min',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          lastUsed: '2024-01-01T00:00:00Z',
        },
        workouts: [
          {
            id: 'workout-1',
            name: 'Workout 1',
            type: 'strength',
            objective: 'Build strength',
            order_index: 1,
            schedule: {
              repeatPattern: 'weekly',
              repeatValue: '1',
              selectedDays: ['monday', 'wednesday', 'friday'],
              time: '09:00',
            },
            sections: [],
            trail_running_data: undefined,
          },
          {
            id: 'workout-2',
            name: 'Workout 2',
            type: 'strength',
            objective: 'Build strength',
            order_index: 2,
            schedule: {
              repeatPattern: 'weekly',
              repeatValue: '1',
              selectedDays: ['tuesday', 'thursday'],
              time: '09:00',
            },
            sections: [],
            trail_running_data: undefined,
          },
        ],
      };

      const result = transformDatabaseRoutineToRoutineData(mockRpcResponse);

      expect(result.id).toBe('routine-1');
      expect(result.name).toBe('Test Routine');
      expect(result.description).toBe('Test Description');
      expect(result.difficulty).toBe('Beginner');
      expect(result.goal).toBe('Strength');
      expect(result.isActive).toBe(true);
      expect(result.isFavorite).toBe(false);
      expect(result.objectives).toEqual(['Build strength']);
      expect(result.progress.currentWeek).toBe(2);
      expect(result.progress.totalWeeks).toBe(12);
      expect(result.progress.completedWorkouts).toBe(8);
      expect(result.progress.totalWorkouts).toBe(60);
      expect(result.strengthWorkouts).toHaveLength(2);
      expect(result.strengthWorkouts[0].id).toBe('workout-1');
      expect(result.strengthWorkouts[1].id).toBe('workout-2');
      expect(result.runningWorkouts).toEqual([]);
    });

    test('should handle missing optional fields', () => {
      const mockRpcResponse: DatabaseRoutineRPCResponse = {
        routine: {
          id: 'routine-1',
          name: 'Test Routine',
          description: 'Test Description',
          difficulty: 'Beginner',
          goal: 'Strength',
          duration: 12,
          isActive: true,
          isFavorite: false,
          objectives: [],
          totalWorkouts: 0,
          completedWorkouts: 0,
          estimatedDuration: '',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          lastUsed: null,
        },
        workouts: [],
      };

      const result = transformDatabaseRoutineToRoutineData(mockRpcResponse);

      expect(result.objectives).toEqual([]);
      expect(result.progress.completedWorkouts).toBe(0);
      expect(result.progress.totalWorkouts).toBe(0);
    });

    test('should throw error for invalid difficulty', () => {
      const mockRpcResponse: DatabaseRoutineRPCResponse = {
        routine: {
          id: 'routine-1',
          name: 'Test Routine',
          description: 'Test Description',
          difficulty: 'Invalid' as any,
          goal: 'Strength',
          duration: 12,
          isActive: true,
          isFavorite: false,
          objectives: [],
          totalWorkouts: 0,
          completedWorkouts: 0,
          estimatedDuration: '',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          lastUsed: null,
        },
        workouts: [],
      };

      expect(() =>
        transformDatabaseRoutineToRoutineData(mockRpcResponse)
      ).toThrow('Invalid difficulty: Invalid');
    });

    test('should throw error for invalid goal', () => {
      const mockRpcResponse: DatabaseRoutineRPCResponse = {
        routine: {
          id: 'routine-1',
          name: 'Test Routine',
          description: 'Test Description',
          difficulty: 'Beginner',
          goal: 'Invalid' as any,
          duration: 12,
          isActive: true,
          isFavorite: false,
          objectives: [],
          totalWorkouts: 0,
          completedWorkouts: 0,
          estimatedDuration: '',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          lastUsed: null,
        },
        workouts: [],
      };

      expect(() =>
        transformDatabaseRoutineToRoutineData(mockRpcResponse)
      ).toThrow('Invalid goal: Invalid');
    });
  });

  describe('transformDatabaseRoutineToRoutine', () => {
    test('should transform database routine to Routine correctly', () => {
      const mockDatabaseRoutine: DatabaseRoutineWithWorkouts = {
        id: 'routine-1',
        user_id: 'user-1',
        name: 'Test Routine',
        description: 'Test Description',
        difficulty: 'Beginner',
        goal: 'Strength',
        duration: 12,
        is_active: true,
        is_favorite: false,
        objectives: ['Build strength'],
        total_workouts: 24,
        completed_workouts: 8,
        estimated_duration: '45-60 min',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        last_used: '2024-01-01T00:00:00Z',
        workouts: [],
      };

      const result = transformDatabaseRoutineToRoutine(mockDatabaseRoutine);

      expect(result.id).toBe('routine-1');
      expect(result.name).toBe('Test Routine');
      expect(result.description).toBe('Test Description');
      expect(result.difficulty).toBe('Beginner');
      expect(result.goal).toBe('Strength');
      expect(result.isActive).toBe(true);
      expect(result.isFavorite).toBe(false);
      expect(result.objectives).toEqual(['Build strength']);
      expect(result.progress.current).toBe(8);
      expect(result.progress.total).toBe(24);
      expect(result.totalWorkouts).toBe(24);
      expect(result.completedWorkouts).toBe(8);
      expect(result.estimatedDuration).toBe('45-60 min');
      expect(result.workoutDays).toEqual([]);
    });

    test('should handle missing optional fields', () => {
      const mockDatabaseRoutine: DatabaseRoutineWithWorkouts = {
        id: 'routine-1',
        user_id: 'user-1',
        name: 'Test Routine',
        description: '',
        difficulty: 'Beginner',
        goal: 'Strength',
        duration: 12,
        is_active: false,
        is_favorite: false,
        objectives: [],
        total_workouts: 0,
        completed_workouts: 0,
        estimated_duration: '',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        last_used: null,
        workouts: [],
      };

      const result = transformDatabaseRoutineToRoutine(mockDatabaseRoutine);

      expect(result.name).toBe('Test Routine');
      expect(result.description).toBe('');
      expect(result.isActive).toBe(false);
      expect(result.isFavorite).toBe(false);
      expect(result.objectives).toEqual([]);
      expect(result.progress.current).toBe(0);
      expect(result.progress.total).toBe(0);
      expect(result.totalWorkouts).toBe(0);
      expect(result.completedWorkouts).toBe(0);
      expect(result.estimatedDuration).toBe('45-60 min');
    });

    test('should throw error for invalid difficulty', () => {
      const mockDatabaseRoutine: DatabaseRoutineWithWorkouts = {
        id: 'routine-1',
        user_id: 'user-1',
        name: 'Test Routine',
        description: 'Test Description',
        difficulty: 'Invalid' as any,
        goal: 'Strength',
        duration: 12,
        is_active: true,
        is_favorite: false,
        objectives: [],
        total_workouts: 0,
        completed_workouts: 0,
        estimated_duration: '',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        last_used: null,
        workouts: [],
      };

      expect(() =>
        transformDatabaseRoutineToRoutine(mockDatabaseRoutine)
      ).toThrow('Invalid difficulty: Invalid');
    });

    test('should throw error for invalid goal', () => {
      const mockDatabaseRoutine: DatabaseRoutineWithWorkouts = {
        id: 'routine-1',
        user_id: 'user-1',
        name: 'Test Routine',
        description: 'Test Description',
        difficulty: 'Beginner',
        goal: 'Invalid' as any,
        duration: 12,
        is_active: true,
        is_favorite: false,
        objectives: [],
        total_workouts: 0,
        completed_workouts: 0,
        estimated_duration: '',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        last_used: null,
        workouts: [],
      };

      expect(() =>
        transformDatabaseRoutineToRoutine(mockDatabaseRoutine)
      ).toThrow('Invalid goal: Invalid');
    });
  });
});
