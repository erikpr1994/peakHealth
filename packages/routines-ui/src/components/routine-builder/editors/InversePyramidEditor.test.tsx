// Mock the useExercise hook
const mockUseExercise = vi.hoisted(() => vi.fn());
vi.mock('../../../hooks/useExercise', () => ({
  useExercise: mockUseExercise,
}));

// Mock the SetsTable component
vi.mock('../../SetsTable', () => ({
  SetsTable: ({ workoutId, sectionId, exerciseId }: any) => (
    <div data-testid="sets-table">
      SetsTable: {workoutId}/{sectionId}/{exerciseId}
    </div>
  ),
}));

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InversePyramidEditor } from './InversePyramidEditor';
import { RoutineBuilderProvider } from '../../../context/routineBuilder/RoutineBuilderContext';
import type { RoutineBuilderState } from '../../../context/routineBuilder/types';

describe('InversePyramidEditor', () => {
  const mockState: RoutineBuilderState = {
    _id: 'routine-1',
    name: 'Test Routine',
    description: 'Test routine description',
    difficulty: 'intermediate',
    goal: 'strength',
    duration: 4,
    objectives: ['Build strength', 'Improve form'],
    workouts: [
      {
        _id: 'workout-1',
        name: 'Test Workout',
        type: 'strength',
        orderIndex: 0,
        sections: [
          {
            _id: 'section-1',
            name: 'Test Section',
            orderIndex: 0,
            type: 'basic',
            exercises: [
              {
                _id: 'exercise-1',
                exerciseId: 'exercise-1',
                exerciseVariantId: 'variant-1',
                orderIndex: 0,
                type: 'strength',
                progressionMethod: 'inverse-pyramid',
                sets: [],
              },
            ],
          },
        ],
      },
    ],
    schemaVersion: '1.0.0',
    userId: 'user-1',
    createdBy: 'user-1',
    routineType: 'user-created',
    isActive: true,
    isFavorite: false,
    completedWorkouts: 0,
    totalWorkouts: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockContextValue = {
    state: mockState,
    dispatch: vi.fn(),
  };

  const defaultProps = {
    exerciseId: 'exercise-1',
    workoutId: 'workout-1',
    sectionId: 'section-1',
  };

  const mockExercise = {
    _id: 'exercise-1',
    exerciseId: 'bench-press',
    exerciseVariantId: 'variant-1',
    orderIndex: 0,
    type: 'strength' as const,
    sets: [],
  };

  const mockSetIds = ['set-1', 'set-2'];

  beforeEach(() => {
    mockUseExercise.mockReturnValue({
      exercise: mockExercise,
      setIds: mockSetIds,
      addSet: vi.fn(),
      removeSet: vi.fn(),
    });
  });

  const renderWithProvider = (props = defaultProps) => {
    return render(
      <RoutineBuilderProvider value={mockContextValue}>
        <InversePyramidEditor {...props} />
      </RoutineBuilderProvider>
    );
  };

  it('renders SetsTable component', () => {
    renderWithProvider();
    expect(screen.getByTestId('sets-table')).toBeDefined();
  });

  it('renders Configure Pyramid button', () => {
    renderWithProvider();
    expect(screen.getByText('Configure Pyramid')).toBeDefined();
  });

  it('opens modal when Configure Pyramid button is clicked', () => {
    renderWithProvider();

    const configureButton = screen.getByText('Configure Pyramid');
    fireEvent.click(configureButton);

    expect(screen.getByText('Configure Inverse Pyramid')).toBeDefined();
  });

  it('renders modal with form inputs', () => {
    renderWithProvider();

    const configureButton = screen.getByText('Configure Pyramid');
    fireEvent.click(configureButton);

    expect(screen.getByLabelText('Number of Sets')).toBeDefined();
    expect(screen.getByLabelText('Start Weight (lbs)')).toBeDefined();
    expect(screen.getByLabelText('End Weight (lbs)')).toBeDefined();
    expect(screen.getByLabelText('Start Reps')).toBeDefined();
    expect(screen.getByLabelText('End Reps')).toBeDefined();
  });

  it('renders Generate Sets and Cancel buttons in modal', () => {
    renderWithProvider();

    const configureButton = screen.getByText('Configure Pyramid');
    fireEvent.click(configureButton);

    expect(screen.getByText('Generate Sets')).toBeDefined();
    expect(screen.getByText('Cancel')).toBeDefined();
  });

  it('closes modal when Cancel button is clicked', () => {
    renderWithProvider();

    const configureButton = screen.getByText('Configure Pyramid');
    fireEvent.click(configureButton);

    expect(screen.getByText('Configure Inverse Pyramid')).toBeDefined();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(screen.queryByText('Configure Inverse Pyramid')).toBeNull();
  });

  it('handles missing exercise gracefully', () => {
    mockUseExercise.mockReturnValue({
      exercise: null,
      setIds: [],
      addSet: vi.fn(),
      removeSet: vi.fn(),
    });

    const { container } = renderWithProvider();
    expect(container.firstChild).toBeNull();
  });
});
