import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { Exercise, ExerciseVariant } from '../../types';
import { useExerciseSelection } from '../useExerciseSelection';

const mockExercise: Exercise = {
  id: '1',
  name: 'Push-up',
  category: 'strength',
  mainVariantId: 'variant-1',
  variants: [
    {
      id: 'variant-1',
      name: 'Standard Push-up',
      difficulty: 'beginner',
    } as ExerciseVariant,
    {
      id: 'variant-2',
      name: 'Diamond Push-up',
      difficulty: 'intermediate',
    } as ExerciseVariant,
  ],
} as Exercise;

const mockVariant: ExerciseVariant = {
  id: 'variant-2',
  name: 'Diamond Push-up',
  difficulty: 'intermediate',
} as ExerciseVariant;

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
      mainVariantId: undefined,
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
      mainVariantId: 'non-existent',
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
