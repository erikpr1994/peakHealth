import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSection } from './useSection';
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
          exercises: [
            {
              _id: 'exercise-1',
              exerciseId: 'pushup',
              exerciseVariantId: 'pushup-standard',
              type: 'strength',
              orderIndex: 0,
              sets: [],
            },
            {
              _id: 'exercise-2',
              exerciseId: 'dip',
              exerciseVariantId: 'dip-standard',
              type: 'strength',
              orderIndex: 1,
              sets: [],
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

describe('useSection', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should return section data and exercise IDs', () => {
    const { result } = renderHook(() => useSection('workout-1', 'section-1'), { wrapper });

    expect(result.current.section).toBeDefined();
    expect(result.current.section?._id).toBe('section-1');
    expect(result.current.section?.name).toBe('Warmup');
    expect(result.current.exerciseIds).toEqual(['exercise-1', 'exercise-2']);
  });

  it('should provide section and exercise management functions', () => {
    const { result } = renderHook(() => useSection('workout-1', 'section-1'), { wrapper });

    expect(typeof result.current.updateSection).toBe('function');
    expect(typeof result.current.removeSection).toBe('function');
    expect(typeof result.current.addExercise).toBe('function');
    expect(typeof result.current.removeExercise).toBe('function');
    expect(typeof result.current.updateExercise).toBe('function');
    expect(typeof result.current.reorderExercises).toBe('function');
  });
});
