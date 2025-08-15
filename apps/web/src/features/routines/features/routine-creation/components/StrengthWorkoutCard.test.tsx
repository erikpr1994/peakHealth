import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StrengthWorkoutCard from './StrengthWorkoutCard';
import { StrengthWorkoutProvider } from '../context/StrengthWorkoutContext';
import { StrengthWorkout } from '../../../types';

// Mock the workout management components
vi.mock(
  '@/features/routines/features/workout-management/components/WorkoutHeader',
  (): Record<string, unknown> => ({
    default: ({
      workout,
      isCollapsed,
      onToggleCollapse,
      onMoveUp,
      onMoveDown,
      onRemove,
      onUpdateName,
    }: {
      workout: StrengthWorkout;
      isCollapsed: boolean;
      onToggleCollapse: () => void;
      onMoveUp: () => void;
      onMoveDown: () => void;
      onRemove: () => void;
      onUpdateName: (name: string) => void;
    }): React.ReactElement => (
      <div data-testid="workout-header">
        <span data-testid="workout-name">{workout.name}</span>
        <span data-testid="is-collapsed">{isCollapsed.toString()}</span>
        <button onClick={onToggleCollapse} data-testid="toggle-collapse">
          Toggle
        </button>
        <button onClick={onMoveUp} data-testid="move-up">
          Up
        </button>
        <button onClick={onMoveDown} data-testid="move-down">
          Down
        </button>
        <button onClick={onRemove} data-testid="remove">
          Remove
        </button>
        <button
          onClick={() => onUpdateName('New Name')}
          data-testid="update-name"
        >
          Update Name
        </button>
      </div>
    ),
  })
);

vi.mock(
  '@/features/routines/features/workout-management/components/WorkoutDetails',
  (): Record<string, unknown> => ({
    default: ({
      objective,
      onUpdateObjective,
      onUpdateSchedule,
    }: {
      objective: string;
      onUpdateObjective: (objective: string) => void;
      onUpdateSchedule: (field: string, value: string | string[]) => void;
    }): React.ReactElement => (
      <div data-testid="workout-details">
        <span data-testid="objective">{objective}</span>
        <button
          onClick={() => onUpdateObjective('New Objective')}
          data-testid="update-objective"
        >
          Update Objective
        </button>
        <button
          onClick={() => onUpdateSchedule('time', '10:00')}
          data-testid="update-schedule"
        >
          Update Schedule
        </button>
      </div>
    ),
  })
);

vi.mock(
  '@/features/routines/features/workout-management/components/WorkoutSection',
  (): Record<string, unknown> => ({
    default: ({
      section,
      onAddExercise,
      onRemove,
    }: {
      section: { id: string; name: string };
      onAddExercise: () => void;
      onRemove: () => void;
    }): React.ReactElement => (
      <div data-testid="workout-section">
        <span data-testid="section-name">{section.name}</span>
        <button onClick={onAddExercise} data-testid="add-exercise">
          Add Exercise
        </button>
        <button onClick={onRemove} data-testid="remove-section">
          Remove Section
        </button>
      </div>
    ),
  })
);

// Mock the utility function
vi.mock(
  '@/features/routines/utils/workoutCalculations',
  (): Record<string, unknown> => ({
    calculateWorkoutDuration: (): number => 45,
  })
);

describe('StrengthWorkoutCard', (): void => {
  const mockOperations = {
    onAddStrengthWorkout: vi.fn(),
    onToggleCollapse: vi.fn(),
    onMoveUp: vi.fn(),
    onMoveDown: vi.fn(),
    onRemove: vi.fn(),
    onUpdateName: vi.fn(),
    onUpdateObjective: vi.fn(),
    onUpdateSchedule: vi.fn(),
    onAddSection: vi.fn(),
    onUpdateSectionName: vi.fn(),
    onUpdateSectionType: vi.fn(),
    onUpdateSectionRestAfter: vi.fn(),
    onUpdateSectionEmomDuration: vi.fn(),
    onRemoveSection: vi.fn(),
    onAddExercise: vi.fn(),
    onUpdateExerciseEmomReps: vi.fn(),
    onUpdateExerciseSets: vi.fn(),
    onUpdateExerciseName: vi.fn(),
    onUpdateRestTimer: vi.fn(),
    onUpdateExerciseRestAfter: vi.fn(),
    onRemoveExercise: vi.fn(),
    onAddApproachSets: vi.fn(),
    onUpdateProgressionMethod: vi.fn(),
    onNotesClick: vi.fn(),
  };

  const mockWorkout: StrengthWorkout = {
    id: 'workout-1',
    name: 'Test Strength Workout',
    type: 'strength',
    objective: 'Build strength',
    schedule: {
      repeatPattern: 'weekly',
      repeatValue: '1',
      selectedDays: ['monday'],
      time: '09:00',
    },
    sections: [
      {
        id: 'section-1',
        name: 'Test Section',
        type: 'basic',
        restAfter: '60s',
        exercises: [],
      },
    ],
  };

  const renderWithProvider = (props: {
    workout: StrengthWorkout;
    index: number;
    totalCount: number;
    isCollapsed: boolean;
  }): ReturnType<typeof render> => {
    return render(
      <StrengthWorkoutProvider operations={mockOperations}>
        <StrengthWorkoutCard {...props} />
      </StrengthWorkoutProvider>
    );
  };

  it('should render workout header with correct data', (): void => {
    renderWithProvider({
      workout: mockWorkout,
      index: 0,
      totalCount: 1,
      isCollapsed: false,
    });

    expect(screen.getByTestId('workout-name')).toHaveTextContent(
      'Test Strength Workout'
    );
    expect(screen.getByTestId('is-collapsed')).toHaveTextContent('false');
  });

  it('should render workout details when not collapsed', (): void => {
    renderWithProvider({
      workout: mockWorkout,
      index: 0,
      totalCount: 1,
      isCollapsed: false,
    });

    expect(screen.getByTestId('workout-details')).toBeInTheDocument();
    expect(screen.getByTestId('objective')).toHaveTextContent('Build strength');
  });

  it('should not render workout details when collapsed', (): void => {
    renderWithProvider({
      workout: mockWorkout,
      index: 0,
      totalCount: 1,
      isCollapsed: true,
    });

    expect(screen.queryByTestId('workout-details')).not.toBeInTheDocument();
  });

  it('should call operations when header buttons are clicked', (): void => {
    renderWithProvider({
      workout: mockWorkout,
      index: 0,
      totalCount: 1,
      isCollapsed: false,
    });

    screen.getByTestId('toggle-collapse').click();
    expect(mockOperations.onToggleCollapse).toHaveBeenCalledWith('workout-1');

    screen.getByTestId('move-up').click();
    expect(mockOperations.onMoveUp).toHaveBeenCalledWith('workout-1');

    screen.getByTestId('move-down').click();
    expect(mockOperations.onMoveDown).toHaveBeenCalledWith('workout-1');

    screen.getByTestId('remove').click();
    expect(mockOperations.onRemove).toHaveBeenCalledWith('workout-1');

    screen.getByTestId('update-name').click();
    expect(mockOperations.onUpdateName).toHaveBeenCalledWith(
      'workout-1',
      'New Name'
    );
  });

  it('should call operations when details buttons are clicked', (): void => {
    renderWithProvider({
      workout: mockWorkout,
      index: 0,
      totalCount: 1,
      isCollapsed: false,
    });

    screen.getByTestId('update-objective').click();
    expect(mockOperations.onUpdateObjective).toHaveBeenCalledWith(
      'workout-1',
      'New Objective'
    );

    screen.getByTestId('update-schedule').click();
    expect(mockOperations.onUpdateSchedule).toHaveBeenCalledWith(
      'workout-1',
      'time',
      '10:00'
    );
  });

  it('should render sections when workout has sections', (): void => {
    renderWithProvider({
      workout: mockWorkout,
      index: 0,
      totalCount: 1,
      isCollapsed: false,
    });

    expect(screen.getByTestId('workout-section')).toBeInTheDocument();
    expect(screen.getByTestId('section-name')).toHaveTextContent(
      'Test Section'
    );
  });

  it('should show empty state when workout has no sections', (): void => {
    const workoutWithoutSections = {
      ...mockWorkout,
      sections: [],
    };

    renderWithProvider({
      workout: workoutWithoutSections,
      index: 0,
      totalCount: 1,
      isCollapsed: false,
    });

    expect(screen.getByText('No sections added yet')).toBeInTheDocument();
    expect(screen.getByText('Add Your First Section')).toBeInTheDocument();
  });
});
