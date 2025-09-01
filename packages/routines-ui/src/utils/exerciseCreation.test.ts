import { describe, it, expect, vi } from 'vitest';
import { createExercise, EXERCISE_DEFAULTS } from './exerciseCreation';
import type { ExerciseLibraryExercise } from '../components/ExerciseLibraryModal/ExerciseLibraryModal.types';

// Mock crypto.randomUUID
const mockUUID = 'test-uuid-123';
vi.stubGlobal('crypto', {
  randomUUID: () => mockUUID,
});

describe('exerciseCreation', () => {
  const mockExercise: ExerciseLibraryExercise = {
    id: 'exercise-1',
    name: 'Push-ups',
    description: 'A classic bodyweight exercise',
    category: 'Strength',
    muscleGroups: ['Chest', 'Triceps'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    icon: '🏋️',
    iconColor: 'bg-blue-100 text-blue-600',
  };

  describe('EXERCISE_DEFAULTS', () => {
    it('should have warmup defaults', () => {
      expect(EXERCISE_DEFAULTS.warmup).toEqual({
        restBetweenSets: '60s',
        notes: '',
      });
    });

    it('should have mainStrength defaults', () => {
      expect(EXERCISE_DEFAULTS.mainStrength).toEqual({
        restBetweenSets: '120s',
        notes: '',
        progressionMethod: 'linear',
      });
    });
  });

  describe('createExercise', () => {
    it('should create an exercise with correct structure', () => {
      const result = createExercise(mockExercise, EXERCISE_DEFAULTS.warmup, 0);

      expect(result).toEqual({
        _id: mockUUID,
        exerciseId: 'exercise-1',
        exerciseVariantId: 'exercise-1',
        orderIndex: 0,
        type: 'strength',
        sets: [],
        restBetweenSets: '60s',
        notes: '',
      });
    });

    it('should create an exercise with progression method when provided', () => {
      const result = createExercise(
        mockExercise,
        EXERCISE_DEFAULTS.mainStrength,
        1
      );

      expect(result).toEqual({
        _id: mockUUID,
        exerciseId: 'exercise-1',
        exerciseVariantId: 'exercise-1',
        orderIndex: 1,
        type: 'strength',
        sets: [],
        restBetweenSets: '120s',
        notes: '',
        progressionMethod: 'linear',
      });
    });

    it('should use provided orderIndex', () => {
      const result = createExercise(mockExercise, EXERCISE_DEFAULTS.warmup, 5);
      expect(result.orderIndex).toBe(5);
    });

    it('should generate unique ID for each call', () => {
      const result1 = createExercise(mockExercise, EXERCISE_DEFAULTS.warmup, 0);
      const result2 = createExercise(mockExercise, EXERCISE_DEFAULTS.warmup, 1);

      expect(result1._id).toBe(mockUUID);
      expect(result2._id).toBe(mockUUID);
    });
  });
});
