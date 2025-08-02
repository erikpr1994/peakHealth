import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useExerciseSelection } from '../../hooks/useExerciseSelection';
import type { Exercise, ExerciseVariant } from '../../types';

describe('useExerciseSelection', () => {
  const mockExercise: Exercise = {
    id: 'exercise-1',
    name: 'Push-up',
    category: 'Strength',
    description: 'A classic upper body exercise',
    variants: [
      {
        id: 'variant-1',
        name: 'Standard Push-up',
        difficulty: 'Beginner',
        equipment: ['Bodyweight'],
        muscleGroups: ['Chest', 'Triceps'],
        isUnilateral: false,
        instructions: 'Perform a standard push-up',
        steps: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'variant-2',
        name: 'Diamond Push-up',
        difficulty: 'Advanced',
        equipment: ['Bodyweight'],
        muscleGroups: ['Chest', 'Triceps'],
        isUnilateral: false,
        instructions: 'Perform a diamond push-up',
        steps: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    mainVariantId: 'variant-1',
    icon: 'push-up-icon',
    iconColor: '#ff0000',
    isFavorite: false,
    isPopular: true,
    isNew: false,
    summary: {
      difficultyRange: 'Beginner',
      equipmentOptions: ['Bodyweight'],
      primaryMuscleGroups: ['Chest', 'Triceps'],
    },
    tags: ['bodyweight', 'strength'],
    relatedExercises: [],
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockVariant: ExerciseVariant = {
    id: 'variant-1',
    name: 'Standard Push-up',
    difficulty: 'Beginner',
    equipment: ['Bodyweight'],
    muscleGroups: ['Chest', 'Triceps'],
    isUnilateral: false,
    instructions: 'Perform a standard push-up',
    steps: [],
    created_at: new Date(),
    updated_at: new Date(),
  };

  describe('initial state', () => {
    it('should start with no exercise and variant selected', () => {
      const { result } = renderHook(() => useExerciseSelection());

      expect(result.current.selectedExercise).toBeNull();
      expect(result.current.selectedVariant).toBeNull();
    });
  });

  describe('selectExercise', () => {
    it('should select an exercise and auto-select main variant', () => {
      const { result } = renderHook(() => useExerciseSelection());

      act(() => {
        result.current.selectExercise(mockExercise);
      });

      expect(result.current.selectedExercise).toBe(mockExercise);
      expect(result.current.selectedVariant).toBe(mockExercise.variants[0]);
    });

    it('should select an exercise without main variant and set variant to null', () => {
      const exerciseWithoutMainVariant = {
        ...mockExercise,
        mainVariantId: undefined,
      };

      const { result } = renderHook(() => useExerciseSelection());

      act(() => {
        result.current.selectExercise(exerciseWithoutMainVariant);
      });

      expect(result.current.selectedExercise).toBe(exerciseWithoutMainVariant);
      expect(result.current.selectedVariant).toBeNull();
    });

    it('should select an exercise with main variant that exists', () => {
      const exerciseWithMainVariant = {
        ...mockExercise,
        mainVariantId: 'variant-2',
      };

      const { result } = renderHook(() => useExerciseSelection());

      act(() => {
        result.current.selectExercise(exerciseWithMainVariant);
      });

      expect(result.current.selectedExercise).toBe(exerciseWithMainVariant);
      expect(result.current.selectedVariant).toBe(
        exerciseWithMainVariant.variants[1]
      );
    });

    it('should select an exercise with main variant that does not exist', () => {
      const exerciseWithInvalidMainVariant = {
        ...mockExercise,
        mainVariantId: 'non-existent-variant',
      };

      const { result } = renderHook(() => useExerciseSelection());

      act(() => {
        result.current.selectExercise(exerciseWithInvalidMainVariant);
      });

      expect(result.current.selectedExercise).toBe(
        exerciseWithInvalidMainVariant
      );
      expect(result.current.selectedVariant).toBeNull();
    });

    it('should select an exercise with no variants', () => {
      const exerciseWithoutVariants = {
        ...mockExercise,
        variants: [],
        mainVariantId: undefined,
      };

      const { result } = renderHook(() => useExerciseSelection());

      act(() => {
        result.current.selectExercise(exerciseWithoutVariants);
      });

      expect(result.current.selectedExercise).toBe(exerciseWithoutVariants);
      expect(result.current.selectedVariant).toBeNull();
    });
  });

  describe('selectVariant', () => {
    it('should select a specific variant', () => {
      const { result } = renderHook(() => useExerciseSelection());

      act(() => {
        result.current.selectVariant(mockVariant);
      });

      expect(result.current.selectedVariant).toBe(mockVariant);
      expect(result.current.selectedExercise).toBeNull();
    });

    it('should clear variant selection when null is passed', () => {
      const { result } = renderHook(() => useExerciseSelection());

      // First select a variant
      act(() => {
        result.current.selectVariant(mockVariant);
      });

      expect(result.current.selectedVariant).toBe(mockVariant);

      // Then clear it
      act(() => {
        result.current.selectVariant(null);
      });

      expect(result.current.selectedVariant).toBeNull();
    });

    it('should work independently of exercise selection', () => {
      const { result } = renderHook(() => useExerciseSelection());

      // Select an exercise first
      act(() => {
        result.current.selectExercise(mockExercise);
      });

      expect(result.current.selectedExercise).toBe(mockExercise);
      expect(result.current.selectedVariant).toBe(mockExercise.variants[0]);

      // Then select a different variant
      act(() => {
        result.current.selectVariant(mockExercise.variants[1]);
      });

      expect(result.current.selectedExercise).toBe(mockExercise);
      expect(result.current.selectedVariant).toBe(mockExercise.variants[1]);
    });
  });

  describe('clearSelection', () => {
    it('should clear both exercise and variant selection', () => {
      const { result } = renderHook(() => useExerciseSelection());

      // First select an exercise and variant
      act(() => {
        result.current.selectExercise(mockExercise);
      });

      expect(result.current.selectedExercise).toBe(mockExercise);
      expect(result.current.selectedVariant).toBe(mockExercise.variants[0]);

      // Then clear everything
      act(() => {
        result.current.clearSelection();
      });

      expect(result.current.selectedExercise).toBeNull();
      expect(result.current.selectedVariant).toBeNull();
    });

    it('should work when nothing is selected', () => {
      const { result } = renderHook(() => useExerciseSelection());

      act(() => {
        result.current.clearSelection();
      });

      expect(result.current.selectedExercise).toBeNull();
      expect(result.current.selectedVariant).toBeNull();
    });
  });

  describe('state persistence', () => {
    it('should maintain state across multiple operations', () => {
      const { result } = renderHook(() => useExerciseSelection());

      // Select exercise
      act(() => {
        result.current.selectExercise(mockExercise);
      });

      expect(result.current.selectedExercise).toBe(mockExercise);
      expect(result.current.selectedVariant).toBe(mockExercise.variants[0]);

      // Select different variant
      act(() => {
        result.current.selectVariant(mockExercise.variants[1]);
      });

      expect(result.current.selectedExercise).toBe(mockExercise);
      expect(result.current.selectedVariant).toBe(mockExercise.variants[1]);

      // Select different exercise
      const differentExercise = {
        ...mockExercise,
        id: 'exercise-2',
        name: 'Squat',
        mainVariantId: 'variant-1',
      };

      act(() => {
        result.current.selectExercise(differentExercise);
      });

      expect(result.current.selectedExercise).toBe(differentExercise);
      expect(result.current.selectedVariant).toBe(
        differentExercise.variants[0]
      );
    });
  });

  describe('edge cases', () => {
    it('should handle exercise with undefined variants', () => {
      const exerciseWithUndefinedVariants = {
        ...mockExercise,
        variants: undefined as any,
        mainVariantId: undefined,
      };

      const { result } = renderHook(() => useExerciseSelection());

      act(() => {
        result.current.selectExercise(exerciseWithUndefinedVariants);
      });

      expect(result.current.selectedExercise).toBe(
        exerciseWithUndefinedVariants
      );
      expect(result.current.selectedVariant).toBeNull();
    });

    it('should handle exercise with null variants', () => {
      const exerciseWithNullVariants = {
        ...mockExercise,
        variants: null as any,
        mainVariantId: undefined,
      };

      const { result } = renderHook(() => useExerciseSelection());

      act(() => {
        result.current.selectExercise(exerciseWithNullVariants);
      });

      expect(result.current.selectedExercise).toBe(exerciseWithNullVariants);
      expect(result.current.selectedVariant).toBeNull();
    });

    it('should handle selecting the same exercise multiple times', () => {
      const { result } = renderHook(() => useExerciseSelection());

      act(() => {
        result.current.selectExercise(mockExercise);
      });

      expect(result.current.selectedExercise).toBe(mockExercise);
      expect(result.current.selectedVariant).toBe(mockExercise.variants[0]);

      act(() => {
        result.current.selectExercise(mockExercise);
      });

      expect(result.current.selectedExercise).toBe(mockExercise);
      expect(result.current.selectedVariant).toBe(mockExercise.variants[0]);
    });

    it('should handle selecting the same variant multiple times', () => {
      const { result } = renderHook(() => useExerciseSelection());

      act(() => {
        result.current.selectVariant(mockVariant);
      });

      expect(result.current.selectedVariant).toBe(mockVariant);

      act(() => {
        result.current.selectVariant(mockVariant);
      });

      expect(result.current.selectedVariant).toBe(mockVariant);
    });
  });
});
