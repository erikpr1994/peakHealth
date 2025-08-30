import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRoutineWorkouts } from './useRoutineWorkouts';
import { RoutineBuilderProvider } from '../context/routineBuilder/RoutineBuilderContext';
import { RoutineBuilderState } from '../context/routineBuilder/types';

// Mock data for testing
const mockState: RoutineBuilderState = {
  _id: 'routine-1',
  name: 'Test Routine',
  description: 'A test routine',
  difficulty: 'beginner',
  goal: 'strength',
  duration: 4,
  objectives: ['Build strength', 'Improve form'],
  workouts: [
    {
      _id: 'workout-1',
      name: 'Upper Body',
      type: 'strength',
      orderIndex: 0,
      sections: [],
    },
    {
      _id: 'workout-2',
      name: 'Lower Body',
      type: 'strength',
      orderIndex: 1,
      sections: [],
    },
  ],
  userId: 'user-1',
  createdBy: 'user-1',
  routineType: 'user-created',
  isActive: true,
  isFavorite: false,
  completedWorkouts: 0,
  totalWorkouts: 2,
  schemaVersion: '1.0.0',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
};

const mockDispatch = vi.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RoutineBuilderProvider
    value={{
      state: mockState,
      dispatch: mockDispatch,
    }}
  >
    {children}
  </RoutineBuilderProvider>
);

describe('useRoutineWorkouts', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should return workout IDs and workout data', () => {
    const { result } = renderHook(() => useRoutineWorkouts(), { wrapper });

    expect(result.current.workoutIds).toEqual(['workout-1', 'workout-2']);
    expect(result.current.workouts).toHaveLength(2);
    expect(result.current.workouts[0].name).toBe('Upper Body');
    expect(result.current.workouts[1].name).toBe('Lower Body');
  });

  it('should provide workout management functions', () => {
    const { result } = renderHook(() => useRoutineWorkouts(), { wrapper });

    expect(typeof result.current.addWorkout).toBe('function');
    expect(typeof result.current.removeWorkout).toBe('function');
    expect(typeof result.current.updateWorkout).toBe('function');
  });

  it('should dispatch ADD_WORKOUT action when addWorkout is called', () => {
    const { result } = renderHook(() => useRoutineWorkouts(), { wrapper });
    const newWorkout = {
      _id: 'workout-3',
      name: 'Cardio',
      type: 'strength' as const,
      orderIndex: 2,
      sections: [],
    };

    act(() => {
      result.current.addWorkout(newWorkout);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_WORKOUT',
      payload: { workout: newWorkout },
    });
  });

  it('should dispatch REMOVE_WORKOUT action when removeWorkout is called', () => {
    const { result } = renderHook(() => useRoutineWorkouts(), { wrapper });

    act(() => {
      result.current.removeWorkout('workout-1');
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_WORKOUT',
      payload: { workoutId: 'workout-1' },
    });
  });

  it('should dispatch UPDATE_WORKOUT action when updateWorkout is called', () => {
    const { result } = renderHook(() => useRoutineWorkouts(), { wrapper });

    act(() => {
      result.current.updateWorkout('workout-1', { name: 'Updated Upper Body' });
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_WORKOUT',
      payload: { workoutId: 'workout-1', updates: { name: 'Updated Upper Body' } },
    });
  });
});
