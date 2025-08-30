import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSet } from './useSet';
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

describe('useSet', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should return set data', () => {
    const { result } = renderHook(
      () => useSet('workout-1', 'section-1', 'exercise-1', 'set-1'),
      { wrapper }
    );

    expect(result.current.set).toBeDefined();
    expect(result.current.set?._id).toBe('set-1');
    expect(result.current.set?.setNumber).toBe(1);
    expect(result.current.set?.reps).toBe(8);
    expect(result.current.set?.weight).toBe(135);
  });

  it('should provide set management functions', () => {
    const { result } = renderHook(
      () => useSet('workout-1', 'section-1', 'exercise-1', 'set-1'),
      { wrapper }
    );

    expect(typeof result.current.updateSet).toBe('function');
    expect(typeof result.current.removeSet).toBe('function');
  });
});
