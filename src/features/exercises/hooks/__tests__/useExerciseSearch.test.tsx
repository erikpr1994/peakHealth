import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ExerciseProvider } from '../../context/ExerciseContext';
import { useExerciseSearch } from '../useExerciseSearch';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ExerciseProvider>{children}</ExerciseProvider>
);

describe('useExerciseSearch', () => {
  it('should return initial search state', () => {
    const { result } = renderHook(() => useExerciseSearch(), {
      wrapper: TestWrapper,
    });

    expect(result.current.searchTerm).toBe('');
  });

  it('should update search term', () => {
    const { result } = renderHook(() => useExerciseSearch(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleSearchChange('push-up');
    });

    expect(result.current.searchTerm).toBe('push-up');
  });

  it('should clear search term', () => {
    const { result } = renderHook(() => useExerciseSearch(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleSearchChange('push-up');
      result.current.clearSearch();
    });

    expect(result.current.searchTerm).toBe('');
  });

  it('should handle empty search term', () => {
    const { result } = renderHook(() => useExerciseSearch(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleSearchChange('');
    });

    expect(result.current.searchTerm).toBe('');
  });

  it('should maintain search state between renders', () => {
    const { result, rerender } = renderHook(() => useExerciseSearch(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleSearchChange('squat');
    });

    rerender();

    expect(result.current.searchTerm).toBe('squat');
  });

  it('should handle multiple search changes', () => {
    const { result } = renderHook(() => useExerciseSearch(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleSearchChange('push');
    });

    expect(result.current.searchTerm).toBe('push');

    act(() => {
      result.current.handleSearchChange('push-up');
    });

    expect(result.current.searchTerm).toBe('push-up');
  });
});
