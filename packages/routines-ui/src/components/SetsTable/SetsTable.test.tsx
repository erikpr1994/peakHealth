import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SetsTable } from './SetsTable';
import { RoutineBuilderProvider } from '../../context/routineBuilder/RoutineBuilderContext';
import type { RoutineBuilderState } from '../../context/routineBuilder/types';

vi.mock('../../hooks/useExercise', async () => {
  const actual = await vi.importActual<any>('../../hooks/useExercise');
  return {
    ...actual,
    useExercise: vi.fn(),
  };
});

const mockUseExercise = vi.mocked(
  (await import('../../hooks/useExercise')).useExercise
);

describe('SetsTable', () => {
  const workoutId = 'workout-1';
  const sectionId = 'section-1';
  const exerciseId = 'exercise-1';

  const mockState: RoutineBuilderState = {
    _id: 'routine-1',
    name: 'Routine',
    description: 'desc',
    difficulty: 'beginner',
    goal: 'strength',
    duration: 4,
    objectives: [],
    workouts: [],
    schemaVersion: '1.0.0',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    userId: 'user-1',
    createdBy: 'user-1',
    routineType: 'user-created',
    isActive: true,
    isFavorite: false,
    completedWorkouts: 0,
    totalWorkouts: 0,
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RoutineBuilderProvider value={{ state: mockState, dispatch: vi.fn() }}>
      {children}
    </RoutineBuilderProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders add buttons', () => {
    mockUseExercise.mockReturnValue({
      exercise: { _id: exerciseId, type: 'strength' },
      setIds: [],
      addSet: vi.fn(),
    } as any);

    render(
      <SetsTable
        workoutId={workoutId}
        sectionId={sectionId}
        exerciseId={exerciseId}
      />,
      { wrapper }
    );

    expect(screen.getByText('+ Add Warmup Set')).toBeDefined();
    expect(screen.getByText('+ Add Working Set')).toBeDefined();
  });

  it('calls addSet when clicking add buttons', () => {
    const addSet = vi.fn();
    mockUseExercise.mockReturnValue({
      exercise: { _id: exerciseId, type: 'strength' },
      setIds: [],
      addSet,
    } as any);

    render(
      <SetsTable
        workoutId={workoutId}
        sectionId={sectionId}
        exerciseId={exerciseId}
      />,
      { wrapper }
    );

    fireEvent.click(screen.getByText('+ Add Warmup Set'));
    fireEvent.click(screen.getByText('+ Add Working Set'));

    expect(addSet).toHaveBeenCalledTimes(2);
    expect(addSet.mock.calls[0][0].setType).toBe('warmup');
    expect(addSet.mock.calls[1][0].setType).toBe('working');
  });
});
