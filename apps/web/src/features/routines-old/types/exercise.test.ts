import { describe, test, expect } from 'vitest';
import type {
  Exercise,
  ProgressionMethod,
  DatabaseSet,
  DatabaseExercise,
  ExerciseSelectionData,
  ExerciseVariantData,
} from './exercise';

describe('Exercise Types', () => {
  describe('ProgressionMethod', () => {
    test('should accept valid progression methods', () => {
      const methods: ProgressionMethod[] = [
        'linear',
        'dual',
        'inverse-pyramid',
        'myo-reps',
        'widowmaker',
        'amrap',
      ];

      expect(methods).toHaveLength(6);
      expect(methods).toContain('linear');
      expect(methods).toContain('amrap');
      expect(methods).toContain('myo-reps');
    });
  });

  describe('Exercise interface', () => {
    test('should have correct structure', () => {
      const exercise: Exercise = {
        id: 'exercise-1',
        name: 'Bench Press',
        category: 'strength',
        muscleGroups: ['chest', 'triceps'],
        equipment: ['barbell', 'bench'],
        exerciseId: 'ex-1',
        variantId: 'var-1',
        sets: [],
        restTimer: '90s',
        restAfter: '2 min',
        notes: 'Test exercise',
        progressionMethod: 'linear',
        hasApproachSets: false,
        emomReps: 10,
      };

      expect(exercise.id).toBe('exercise-1');
      expect(exercise.name).toBe('Bench Press');
      expect(exercise.category).toBe('strength');
      expect(exercise.muscleGroups).toEqual(['chest', 'triceps']);
      expect(exercise.equipment).toEqual(['barbell', 'bench']);
      expect(exercise.progressionMethod).toBe('linear');
      expect(exercise.hasApproachSets).toBe(false);
      expect(exercise.emomReps).toBe(10);
    });

    test('should handle optional properties', () => {
      const exercise: Exercise = {
        id: 'exercise-2',
        name: 'Squat',
        sets: [],
        restTimer: '60s',
        restAfter: '1 min',
        notes: 'Basic squat',
      };

      expect(exercise.id).toBe('exercise-2');
      expect(exercise.name).toBe('Squat');
      expect(exercise.category).toBeUndefined();
      expect(exercise.muscleGroups).toBeUndefined();
      expect(exercise.progressionMethod).toBeUndefined();
    });
  });

  describe('DatabaseSet interface', () => {
    test('should have correct structure', () => {
      const set: DatabaseSet = {
        id: 'set-1',
        setNumber: 1,
        setType: 'working',
        repType: 'reps',
        reps: 10,
        weight: 100,
        rpe: 8,
        notes: 'Felt good',
        rest_time: '90s',
        duration: 60,
      };

      expect(set.id).toBe('set-1');
      expect(set.setNumber).toBe(1);
      expect(set.setType).toBe('working');
      expect(set.reps).toBe(10);
      expect(set.weight).toBe(100);
      expect(set.rpe).toBe(8);
      expect(set.rest_time).toBe('90s');
      expect(set.duration).toBe(60);
    });

    test('should handle null values', () => {
      const set: DatabaseSet = {
        id: 'set-2',
        setNumber: 2,
        setType: 'warmup',
        reps: null,
        weight: null,
        rpe: null,
        notes: 'Warmup set',
      };

      expect(set.reps).toBeNull();
      expect(set.weight).toBeNull();
      expect(set.rpe).toBeNull();
    });
  });

  describe('DatabaseExercise interface', () => {
    test('should have correct structure', () => {
      const exercise: DatabaseExercise = {
        id: 'db-exercise-1',
        name: 'Deadlift',
        category: 'strength',
        muscle_groups: ['back', 'legs'],
        notes: 'Database exercise',
        sets: [],
        exerciseLibraryId: 'lib-1',
        rest_timer: '120s',
        rest_after: '3 min',
        progression_method: 'linear',
        has_approach_sets: true,
        emom_reps: 5,
      };

      expect(exercise.id).toBe('db-exercise-1');
      expect(exercise.name).toBe('Deadlift');
      expect(exercise.category).toBe('strength');
      expect(exercise.muscle_groups).toEqual(['back', 'legs']);
      expect(exercise.exerciseLibraryId).toBe('lib-1');
      expect(exercise.progression_method).toBe('linear');
      expect(exercise.has_approach_sets).toBe(true);
      expect(exercise.emom_reps).toBe(5);
    });

    test('should handle optional properties', () => {
      const exercise: DatabaseExercise = {
        id: 'db-exercise-2',
        name: 'Push-up',
      };

      expect(exercise.id).toBe('db-exercise-2');
      expect(exercise.name).toBe('Push-up');
      expect(exercise.category).toBeUndefined();
      expect(exercise.muscle_groups).toBeUndefined();
      expect(exercise.sets).toBeUndefined();
    });
  });

  describe('ExerciseSelectionData interface', () => {
    test('should have correct structure', () => {
      const selectionData: ExerciseSelectionData = {
        id: 'selection-1',
        name: 'Pull-up',
        category: 'bodyweight',
        muscleGroups: ['back', 'biceps'],
      };

      expect(selectionData.id).toBe('selection-1');
      expect(selectionData.name).toBe('Pull-up');
      expect(selectionData.category).toBe('bodyweight');
      expect(selectionData.muscleGroups).toEqual(['back', 'biceps']);
    });

    test('should handle optional properties', () => {
      const selectionData: ExerciseSelectionData = {
        id: 'selection-2',
        name: 'Plank',
      };

      expect(selectionData.id).toBe('selection-2');
      expect(selectionData.name).toBe('Plank');
      expect(selectionData.category).toBeUndefined();
      expect(selectionData.muscleGroups).toBeUndefined();
    });
  });

  describe('ExerciseVariantData interface', () => {
    test('should have correct structure', () => {
      const variantData: ExerciseVariantData = {
        id: 'variant-1',
        name: 'Diamond Push-up',
        muscleGroups: ['chest', 'triceps'],
        difficulty: 'intermediate',
        equipment: ['none'],
        instructions: ['Start in push-up position', 'Form diamond with hands'],
      };

      expect(variantData.id).toBe('variant-1');
      expect(variantData.name).toBe('Diamond Push-up');
      expect(variantData.muscleGroups).toEqual(['chest', 'triceps']);
      expect(variantData.difficulty).toBe('intermediate');
      expect(variantData.equipment).toEqual(['none']);
      expect(variantData.instructions).toEqual([
        'Start in push-up position',
        'Form diamond with hands',
      ]);
    });

    test('should handle multiple instructions', () => {
      const variantData: ExerciseVariantData = {
        id: 'variant-2',
        name: 'Advanced Squat',
        muscleGroups: ['legs'],
        difficulty: 'advanced',
        equipment: ['barbell', 'rack'],
        instructions: [
          'Set up barbell on rack',
          'Position under bar',
          'Unrack and step back',
          'Perform squat',
        ],
      };

      expect(variantData.instructions).toHaveLength(4);
      expect(variantData.instructions).toContain('Set up barbell on rack');
      expect(variantData.instructions).toContain('Perform squat');
    });
  });
});
