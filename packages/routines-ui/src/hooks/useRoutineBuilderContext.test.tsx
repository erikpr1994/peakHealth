import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import React from 'react';
import { useRoutineBuilderContext } from './useRoutineBuilderContext';
import { RoutineBuilderState } from '../context/routineBuilder/types';
// eslint-disable-next-line import/named
import { UserCreatedRoutine } from '@peakhealth/routines-types';
import { RoutineBuilderProvider } from '../context/routineBuilder';

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

describe('useRoutineBuilderContext', () => {
  test('throws an error when used outside of a RoutineBuilderProvider', () => {
    // Suppress console.error output for this expected error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useRoutineBuilderContext())).toThrow(
      'useRoutineBuilderContext must be used within a RoutineBuilderProvider'
    );
    spy.mockRestore();
  });

  test('returns the context value when used within a RoutineBuilderProvider', () => {
    const mockValue = {
      state: mockState,
      dispatch: vi.fn(),
    };

    function Wrapper({
      children,
    }: {
      children: React.ReactNode;
    }): React.ReactElement {
      return (
        <RoutineBuilderProvider value={mockValue}>
          {children}
        </RoutineBuilderProvider>
      );
    }

    const { result } = renderHook(() => useRoutineBuilderContext(), {
      wrapper: Wrapper,
    });

    expect(result.current.state).toEqual(mockState);
    expect(result.current.dispatch).toBeInstanceOf(Function);
  });
});
