import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useWorkout } from './useWorkout';
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
          name: 'Warmup',
          type: 'warmup',
          orderIndex: 0,
          targetMuscleGroups: ['chest', 'shoulders'],
          duration: 10,
          intensity: 'light',
          exercises: [],
        },
        {
          _id: 'section-2',
          name: 'Main Strength',
          type: 'basic',
          orderIndex: 1,
          exercises: [],
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

describe('useWorkout', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should return workout data and section IDs', () => {
    const { result } = renderHook(() => useWorkout('workout-1'), { wrapper });

    expect(result.current.workout).toBeDefined();
    expect(result.current.workout?._id).toBe('workout-1');
    expect(result.current.workout?.name).toBe('Upper Body');
    expect(result.current.sectionIds).toEqual(['section-1', 'section-2']);
  });

  it('should provide workout and section management functions', () => {
    const { result } = renderHook(() => useWorkout('workout-1'), { wrapper });

    expect(typeof result.current.updateWorkout).toBe('function');
    expect(typeof result.current.removeWorkout).toBe('function');
    expect(typeof result.current.addSection).toBe('function');
    expect(typeof result.current.removeSection).toBe('function');
    expect(typeof result.current.updateSection).toBe('function');
    expect(typeof result.current.reorderSections).toBe('function');
  });
});
