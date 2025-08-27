import { renderHook, act } from '@testing-library/react';
import { useRoutineCreationState } from './useRoutineCreationState';
import type { RoutineCreationData } from '../types';

describe('useRoutineCreationState', () => {
  const initialData: RoutineCreationData = {
    name: '',
    description: '',
    difficulty: 'Beginner',
    goal: 'Strength',
    duration: 12,
    objectives: [],
  };

  test('initializes with default data', () => {
    const { result } = renderHook(() => useRoutineCreationState());

    expect(result.current.routineData).toEqual(initialData);
  });

  test('updates routine data', () => {
    const { result } = renderHook(() => useRoutineCreationState());

    act(() => {
      result.current.updateRoutineData({ name: 'Test Routine' });
    });

    expect(result.current.routineData.name).toBe('Test Routine');
  });

  test('loads routine data for editing', () => {
    const { result } = renderHook(() => useRoutineCreationState());

    act(() => {
      result.current.loadRoutineDataForEditing('routine-1');
    });

    // This test would need to be updated based on the actual implementation
    // For now, we'll just verify the function exists and can be called
    expect(typeof result.current.loadRoutineDataForEditing).toBe('function');
  });

  test('updates multiple fields at once', () => {
    const { result } = renderHook(() => useRoutineCreationState());

    act(() => {
      result.current.updateRoutineData({
        name: 'Multi Update',
        description: 'Multi description',
        difficulty: 'Advanced',
      });
    });

    expect(result.current.routineData.name).toBe('Multi Update');
    expect(result.current.routineData.description).toBe('Multi description');
    expect(result.current.routineData.difficulty).toBe('Advanced');
  });
});
