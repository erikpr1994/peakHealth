import { describe, it, expect } from 'vitest';
import {
  EXERCISE_CATEGORIES,
  EXERCISE_MUSCLE_GROUPS,
  EXERCISE_DIFFICULTIES,
  toApiCategoryFilter,
  toApiDifficultyFilter,
  toApiMuscleGroupFilter,
  ExerciseCategory,
  ExerciseDifficulty,
  ExerciseMuscleGroup,
} from './ExerciseLibraryModal.utils';

describe('ExerciseLibraryModal.utils', () => {
  describe('Constants', () => {
    it('should export EXERCISE_CATEGORIES with correct values', () => {
      expect(EXERCISE_CATEGORIES).toEqual([
        'All',
        'Strength',
        'Cardio',
        'Flexibility',
        'Balance',
      ]);
    });

    it('should export EXERCISE_MUSCLE_GROUPS with correct values', () => {
      expect(EXERCISE_MUSCLE_GROUPS).toEqual([
        'All',
        'Chest',
        'Back',
        'Legs',
        'Arms',
        'Shoulders',
        'Core',
        'Glutes',
        'Full Body',
      ]);
    });

    it('should export EXERCISE_DIFFICULTIES with correct values', () => {
      expect(EXERCISE_DIFFICULTIES).toEqual([
        'All',
        'Beginner',
        'Intermediate',
        'Advanced',
      ]);
    });
  });

  describe('Type definitions', () => {
    it('should have correct ExerciseCategory type', () => {
      const validCategories: ExerciseCategory[] = [
        'All',
        'Strength',
        'Cardio',
        'Flexibility',
        'Balance',
      ];
      expect(validCategories).toBeDefined();
    });

    it('should have correct ExerciseDifficulty type', () => {
      const validDifficulties: ExerciseDifficulty[] = [
        'All',
        'Beginner',
        'Intermediate',
        'Advanced',
      ];
      expect(validDifficulties).toBeDefined();
    });

    it('should have correct ExerciseMuscleGroup type', () => {
      const validMuscleGroups: ExerciseMuscleGroup[] = [
        'All',
        'Chest',
        'Back',
        'Legs',
        'Arms',
        'Shoulders',
        'Core',
        'Glutes',
        'Full Body',
      ];
      expect(validMuscleGroups).toBeDefined();
    });
  });

  describe('toApiCategoryFilter', () => {
    it('should return undefined for "All" value', () => {
      expect(toApiCategoryFilter('All')).toBeUndefined();
    });

    it('should return the category value for non-"All" values', () => {
      expect(toApiCategoryFilter('Strength')).toBe('Strength');
      expect(toApiCategoryFilter('Cardio')).toBe('Cardio');
      expect(toApiCategoryFilter('Flexibility')).toBe('Flexibility');
      expect(toApiCategoryFilter('Balance')).toBe('Balance');
    });
  });

  describe('toApiDifficultyFilter', () => {
    it('should return undefined for "All" value', () => {
      expect(toApiDifficultyFilter('All')).toBeUndefined();
    });

    it('should return the difficulty value for non-"All" values', () => {
      expect(toApiDifficultyFilter('Beginner')).toBe('Beginner');
      expect(toApiDifficultyFilter('Intermediate')).toBe('Intermediate');
      expect(toApiDifficultyFilter('Advanced')).toBe('Advanced');
    });
  });

  describe('toApiMuscleGroupFilter', () => {
    it('should return undefined for "All" value', () => {
      expect(toApiMuscleGroupFilter('All')).toBeUndefined();
    });

    it('should return the muscle group value for non-"All" values', () => {
      expect(toApiMuscleGroupFilter('Chest')).toBe('Chest');
      expect(toApiMuscleGroupFilter('Back')).toBe('Back');
      expect(toApiMuscleGroupFilter('Legs')).toBe('Legs');
      expect(toApiMuscleGroupFilter('Arms')).toBe('Arms');
      expect(toApiMuscleGroupFilter('Shoulders')).toBe('Shoulders');
      expect(toApiMuscleGroupFilter('Core')).toBe('Core');
      expect(toApiMuscleGroupFilter('Glutes')).toBe('Glutes');
      expect(toApiMuscleGroupFilter('Full Body')).toBe('Full Body');
    });
  });
});
