import { renderHook, act } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useRoutineBuilder } from './useRoutineBuilder';
import { RoutineBuilderState } from '../context/routineBuilder';
import { UserCreatedRoutine } from '@peakhealth/routines-types';

const mockState: RoutineBuilderState = {
  _id: 'routine1',
  name: 'Initial Routine',
  workouts: [],
  userId: 'user1',
  createdBy: 'user1',
  routineType: 'user-created',
  isActive: false,
  isFavorite: false,
  completedWorkouts: 0,
  totalWorkouts: 0,
  schemaVersion: '1.0',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  difficulty: 'beginner',
  duration: 4,
  goal: 'strength',
  objectives: [],
} as UserCreatedRoutine;

describe('useRoutineBuilder', () => {
  test('should initialize with the provided initial state', () => {
    const { result } = renderHook(() => useRoutineBuilder(mockState));
    expect(result.current.state).toEqual(mockState);
  });

  test('should update state when an action is dispatched', () => {
    const { result } = renderHook(() => useRoutineBuilder(mockState));

    act(() => {
      result.current.dispatch({
        type: 'UPDATE_ROUTINE_NAME',
        payload: { name: 'Updated Name' },
      });
    });

    expect(result.current.state.name).toBe('Updated Name');
  });
});
