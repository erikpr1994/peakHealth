import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { Exercise, ExerciseVariant } from '../../types';
import { createExerciseId, createExerciseVariantId } from '../../types/ids';
import { useExerciseSelection } from '../useExerciseSelection';

const mockExercise: Exercise = {
  id: createExerciseId('1'),
  name: 'Push-up',
  category: 'Strength',
  description: 'A basic push-up exercise',
  icon: '💪',
  iconColor: '#3B82F6',
  isFavorite: false,
  mainVariantId: createExerciseVariantId('variant-1'),
  variants: [
    {
      id: createExerciseVariantId('variant-1'),
      name: 'Standard Push-up',
      description: 'Standard push-up form',
      focus: 'Upper body strength',
      difficulty: 'Beginner',
      equipment: ['Bodyweight'],
      muscleGroups: ['Chest', 'Shoulders'],
      instructions: [
        'Start in plank position',
        'Lower your body',
        'Push back up',
      ],
      steps: [
        { title: 'Start Position', description: 'Get into a plank position' },
        { title: 'Lower', description: 'Lower your body to the ground' },
        { title: 'Push Up', description: 'Push back up to starting position' },
      ],
    },
    {
      id: createExerciseVariantId('variant-2'),
      name: 'Diamond Push-up',
      description: 'Advanced push-up variation',
      focus: 'Tricep strength',
      difficulty: 'Intermediate',
      equipment: ['Bodyweight'],
      muscleGroups: ['Chest', 'Triceps'],
      instructions: ['Form diamond with hands', 'Perform push-up'],
      steps: [
        {
          title: 'Diamond Position',
          description: 'Form diamond shape with hands',
        },
        {
          title: 'Perform Push-up',
          description: 'Execute the push-up movement',
        },
      ],
    },
  ],
};

const mockVariant: ExerciseVariant = {
  id: createExerciseVariantId('variant-2'),
  name: 'Diamond Push-up',
  description: 'Advanced push-up variation',
  focus: 'Tricep strength',
  difficulty: 'Intermediate',
  equipment: ['Bodyweight'],
  muscleGroups: ['Chest', 'Triceps'],
  instructions: ['Form diamond with hands', 'Perform push-up'],
  steps: [
    { title: 'Diamond Position', description: 'Form diamond shape with hands' },
    { title: 'Perform Push-up', description: 'Execute the push-up movement' },
  ],
};

describe('useExerciseSelection', () => {
  it('should initialize with null selections', () => {
    const { result } = renderHook(() => useExerciseSelection());

    expect(result.current.selectedExercise).toBeNull();
    expect(result.current.selectedVariant).toBeNull();
  });

  it('should select an exercise and auto-select main variant', () => {
    const { result } = renderHook(() => useExerciseSelection());

    act(() => {
      result.current.selectExercise(mockExercise);
    });

    expect(result.current.selectedExercise).toBe(mockExercise);
    expect(result.current.selectedVariant).toBe(mockExercise.variants[0]);
  });

  it('should select an exercise without variants', () => {
    const exerciseWithoutVariants = { ...mockExercise, variants: [] };
    const { result } = renderHook(() => useExerciseSelection());

    act(() => {
      result.current.selectExercise(exerciseWithoutVariants);
    });

    expect(result.current.selectedExercise).toBe(exerciseWithoutVariants);
    expect(result.current.selectedVariant).toBeNull();
  });

  it('should select an exercise with variants but no main variant', () => {
    const exerciseWithoutMainVariant = {
      ...mockExercise,
      mainVariantId: createExerciseVariantId('non-existent'),
    };
    const { result } = renderHook(() => useExerciseSelection());

    act(() => {
      result.current.selectExercise(exerciseWithoutMainVariant);
    });

    expect(result.current.selectedExercise).toBe(exerciseWithoutMainVariant);
    expect(result.current.selectedVariant).toBeNull();
  });

  it('should select an exercise with main variant that does not exist', () => {
    const exerciseWithInvalidMainVariant = {
      ...mockExercise,
      mainVariantId: createExerciseVariantId('non-existent'),
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

  it('should select a specific variant', () => {
    const { result } = renderHook(() => useExerciseSelection());

    act(() => {
      result.current.selectExercise(mockExercise);
      result.current.selectVariant(mockVariant);
    });

    expect(result.current.selectedExercise).toBe(mockExercise);
    expect(result.current.selectedVariant).toBe(mockVariant);
  });

  it('should clear variant selection', () => {
    const { result } = renderHook(() => useExerciseSelection());

    act(() => {
      result.current.selectExercise(mockExercise);
      result.current.selectVariant(null);
    });

    expect(result.current.selectedExercise).toBe(mockExercise);
    expect(result.current.selectedVariant).toBeNull();
  });

  it('should clear all selections', () => {
    const { result } = renderHook(() => useExerciseSelection());

    act(() => {
      result.current.selectExercise(mockExercise);
      result.current.selectVariant(mockVariant);
    });

    expect(result.current.selectedExercise).toBe(mockExercise);
    expect(result.current.selectedVariant).toBe(mockVariant);

    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selectedExercise).toBeNull();
    expect(result.current.selectedVariant).toBeNull();
  });

  it('should maintain state between renders', () => {
    const { result, rerender } = renderHook(() => useExerciseSelection());

    act(() => {
      result.current.selectExercise(mockExercise);
    });

    rerender();

    expect(result.current.selectedExercise).toBe(mockExercise);
    expect(result.current.selectedVariant).toBe(mockExercise.variants[0]);
  });
});
