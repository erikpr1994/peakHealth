import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useExercise } from './useExercise';
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
      sections: [
        {
          _id: 'section-1',
          name: 'Main Strength',
          type: 'basic',
          orderIndex: 0,
          exercises: [
            {
              _id: 'exercise-1',
              exerciseId: 'bench-press',
              exerciseVariantId: 'bench-press-barbell',
              type: 'strength',
              orderIndex: 0,
              sets: [
                {
                  _id: 'set-1',
                  setNumber: 1,
                  setType: 'working',
                  repType: 'fixed',
                  reps: 8,
                  weight: 135,
                },
                {
                  _id: 'set-2',
                  setNumber: 2,
                  setType: 'working',
                  repType: 'fixed',
                  reps: 8,
                  weight: 135,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  userId: 'user-1',
  createdBy: 'user-1',
  routineType: 'user-created',
  isActive: true,
  isFavorite: false,
  completedWorkouts: 0,
  totalWorkouts: 1,
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

describe('useExercise', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should return exercise data and set IDs', () => {
    const { result } = renderHook(
      () => useExercise('workout-1', 'section-1', 'exercise-1'),
      { wrapper }
    );

    expect(result.current.exercise).toBeDefined();
    expect(result.current.exercise?._id).toBe('exercise-1');
    expect(result.current.exercise?.exerciseId).toBe('bench-press');
    expect(result.current.setIds).toEqual(['set-1', 'set-2']);
  });

  it('should provide exercise and set management functions', () => {
    const { result } = renderHook(
      () => useExercise('workout-1', 'section-1', 'exercise-1'),
      { wrapper }
    );

    expect(typeof result.current.updateExercise).toBe('function');
    expect(typeof result.current.removeExercise).toBe('function');
    expect(typeof result.current.addSet).toBe('function');
    expect(typeof result.current.removeSet).toBe('function');
    expect(typeof result.current.updateSet).toBe('function');
    expect(typeof result.current.reorderSets).toBe('function');
  });
});
