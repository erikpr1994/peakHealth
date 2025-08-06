import { describe, it, expect } from 'vitest';

import { exerciseValidators } from '../validators';

describe('ExerciseValidators', () => {
  describe('validateExerciseData', () => {
    it('should validate valid exercise data', () => {
      const validExercise = {
        id: '1',
        name: 'Push-up',
        category: 'strength',
        description: 'A basic push-up exercise',
      };

      const result = exerciseValidators.validateExerciseData(validExercise);

      expect(result).toBe(true);
    });

    it('should reject null data', () => {
      const result = exerciseValidators.validateExerciseData(null);

      expect(result).toBe(false);
    });

    it('should reject undefined data', () => {
      const result = exerciseValidators.validateExerciseData(undefined);

      expect(result).toBe(false);
    });

    it('should reject non-object data', () => {
      const result = exerciseValidators.validateExerciseData('not an object');

      expect(result).toBe(false);
    });

    it('should reject exercise without required fields', () => {
      const invalidExercise = {
        id: '1',
        name: 'Push-up',
        // missing category and description
      };

      const result = exerciseValidators.validateExerciseData(invalidExercise);

      expect(result).toBe(false);
    });

    it('should reject exercise with wrong field types', () => {
      const invalidExercise = {
        id: 123, // should be string
        name: 'Push-up',
        category: 'strength',
        description: 'A basic push-up exercise',
      };

      const result = exerciseValidators.validateExerciseData(invalidExercise);

      expect(result).toBe(false);
    });
  });

  describe('validateExerciseArray', () => {
    it('should validate array of valid exercises', () => {
      const validExercises = [
        {
          id: '1',
          name: 'Push-up',
          category: 'strength',
          description: 'A basic push-up exercise',
        },
        {
          id: '2',
          name: 'Squat',
          category: 'strength',
          description: 'A basic squat exercise',
        },
      ];

      const result = exerciseValidators.validateExerciseArray(validExercises);

      expect(result).toBe(true);
    });

    it('should reject non-array data', () => {
      const result = exerciseValidators.validateExerciseArray('not an array');

      expect(result).toBe(false);
    });

    it('should reject array with invalid exercises', () => {
      const invalidExercises = [
        {
          id: '1',
          name: 'Push-up',
          category: 'strength',
          description: 'A basic push-up exercise',
        },
        {
          id: '2',
          name: 'Squat',
          // missing required fields
        },
      ];

      const result = exerciseValidators.validateExerciseArray(invalidExercises);

      expect(result).toBe(false);
    });

    it('should validate empty array', () => {
      const result = exerciseValidators.validateExerciseArray([]);

      expect(result).toBe(true);
    });
  });

  describe('validateFavoriteData', () => {
    it('should validate valid favorite data', () => {
      const validFavorite = {
        exercise_id: '1',
        exercises: {
          id: '1',
          name: 'Push-up',
          exercise_variants: [],
        },
      };

      const result = exerciseValidators.validateFavoriteData(validFavorite);

      expect(result).toBe(true);
    });

    it('should reject null data', () => {
      const result = exerciseValidators.validateFavoriteData(null);

      expect(result).toBe(false);
    });

    it('should reject data without exercise_id', () => {
      const invalidFavorite = {
        exercises: {
          id: '1',
          name: 'Push-up',
        },
      };

      const result = exerciseValidators.validateFavoriteData(invalidFavorite);

      expect(result).toBe(false);
    });

    it('should reject data with non-string exercise_id', () => {
      const invalidFavorite = {
        exercise_id: 123,
        exercises: {
          id: '1',
          name: 'Push-up',
        },
      };

      const result = exerciseValidators.validateFavoriteData(invalidFavorite);

      expect(result).toBe(false);
    });

    it('should reject data without exercises object', () => {
      const invalidFavorite = {
        exercise_id: '1',
        exercises: null,
      };

      const result = exerciseValidators.validateFavoriteData(invalidFavorite);

      expect(result).toBe(false);
    });

    it('should reject data with exercises as array', () => {
      const invalidFavorite = {
        exercise_id: '1',
        exercises: [{ id: '1', name: 'Push-up' }],
      };

      const result = exerciseValidators.validateFavoriteData(invalidFavorite);

      expect(result).toBe(false);
    });
  });

  describe('validateSearchParams', () => {
    it('should validate search params with all fields', () => {
      const searchParams = {
        searchTerm: 'push',
        category: 'strength',
        difficulties: ['beginner'],
        equipment: ['bodyweight'],
        muscleGroups: ['chest'],
      };

      const result = exerciseValidators.validateSearchParams(searchParams);

      expect(result).toBe(true);
    });

    it('should validate search params with no fields', () => {
      const searchParams = {};

      const result = exerciseValidators.validateSearchParams(searchParams);

      expect(result).toBe(true);
    });

    it('should validate search params with partial fields', () => {
      const searchParams = {
        searchTerm: 'push',
        category: 'strength',
      };

      const result = exerciseValidators.validateSearchParams(searchParams);

      expect(result).toBe(true);
    });
  });

  describe('validateUserId', () => {
    it('should validate valid user ID', () => {
      const validUserId = 'user-123';

      const result = exerciseValidators.validateUserId(validUserId);

      expect(result).toBe(true);
    });

    it('should reject empty string', () => {
      const result = exerciseValidators.validateUserId('');

      expect(result).toBe(false);
    });

    it('should reject non-string user ID', () => {
      const result = exerciseValidators.validateUserId(123 as any);

      expect(result).toBe(false);
    });

    it('should reject null user ID', () => {
      const result = exerciseValidators.validateUserId(null as any);

      expect(result).toBe(false);
    });

    it('should reject undefined user ID', () => {
      const result = exerciseValidators.validateUserId(undefined as any);

      expect(result).toBe(false);
    });
  });

  describe('validateExerciseId', () => {
    it('should validate valid exercise ID', () => {
      const validExerciseId = 'exercise-123';

      const result = exerciseValidators.validateExerciseId(validExerciseId);

      expect(result).toBe(true);
    });

    it('should reject empty string', () => {
      const result = exerciseValidators.validateExerciseId('');

      expect(result).toBe(false);
    });

    it('should reject non-string exercise ID', () => {
      const result = exerciseValidators.validateExerciseId(123 as any);

      expect(result).toBe(false);
    });

    it('should reject null exercise ID', () => {
      const result = exerciseValidators.validateExerciseId(null as any);

      expect(result).toBe(false);
    });

    it('should reject undefined exercise ID', () => {
      const result = exerciseValidators.validateExerciseId(undefined as any);

      expect(result).toBe(false);
    });
  });
});
