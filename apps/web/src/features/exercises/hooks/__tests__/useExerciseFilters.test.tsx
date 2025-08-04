import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ExerciseProvider } from '../../context/ExerciseContext';
import { useExerciseFilters } from '../useExerciseFilters';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ExerciseProvider>{children}</ExerciseProvider>
);

describe('useExerciseFilters', () => {
  it('should return initial filter state', () => {
    const { result } = renderHook(() => useExerciseFilters(), {
      wrapper: TestWrapper,
    });

    expect(result.current.filters).toEqual({
      difficulties: [],
      muscleGroups: [],
      equipment: [],
    });
    expect(result.current.getActiveFilterCount()).toBe(0);
  });

  it('should add filter when not present', () => {
    const { result } = renderHook(() => useExerciseFilters(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleFilterChange('difficulties', 'beginner');
    });

    expect(result.current.filters.difficulties).toContain('beginner');
    expect(result.current.getActiveFilterCount()).toBe(1);
  });

  it('should remove filter when already present', () => {
    const { result } = renderHook(() => useExerciseFilters(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleFilterChange('difficulties', 'beginner');
      result.current.handleFilterChange('difficulties', 'beginner');
    });

    expect(result.current.filters.difficulties).not.toContain('beginner');
    expect(result.current.getActiveFilterCount()).toBe(0);
  });

  it('should handle multiple filters of different types', () => {
    const { result } = renderHook(() => useExerciseFilters(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleFilterChange('difficulties', 'beginner');
      result.current.handleFilterChange('muscleGroups', 'chest');
      result.current.handleFilterChange('equipment', 'dumbbell');
    });

    expect(result.current.filters.difficulties).toContain('beginner');
    expect(result.current.filters.muscleGroups).toContain('chest');
    expect(result.current.filters.equipment).toContain('dumbbell');
    expect(result.current.getActiveFilterCount()).toBe(3);
  });

  it('should handle multiple filters of the same type', () => {
    const { result } = renderHook(() => useExerciseFilters(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleFilterChange('difficulties', 'beginner');
      result.current.handleFilterChange('difficulties', 'intermediate');
    });

    expect(result.current.filters.difficulties).toContain('beginner');
    expect(result.current.filters.difficulties).toContain('intermediate');
    expect(result.current.getActiveFilterCount()).toBe(2);
  });

  it('should clear all filters', () => {
    const { result } = renderHook(() => useExerciseFilters(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleFilterChange('difficulties', 'beginner');
      result.current.handleFilterChange('muscleGroups', 'chest');
      result.current.clearFilters();
    });

    expect(result.current.filters.difficulties).toEqual([]);
    expect(result.current.filters.muscleGroups).toEqual([]);
    expect(result.current.filters.equipment).toEqual([]);
    expect(result.current.getActiveFilterCount()).toBe(0);
  });

  it('should maintain filter state between renders', () => {
    const { result, rerender } = renderHook(() => useExerciseFilters(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleFilterChange('difficulties', 'beginner');
    });

    rerender();

    expect(result.current.filters.difficulties).toContain('beginner');
    expect(result.current.getActiveFilterCount()).toBe(1);
  });
});
