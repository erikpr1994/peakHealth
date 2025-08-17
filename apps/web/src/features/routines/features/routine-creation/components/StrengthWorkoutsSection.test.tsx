import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StrengthWorkoutsSection from './StrengthWorkoutsSection';
import { StrengthWorkout } from '../../../types';

// Mock the StrengthWorkoutCard component
vi.mock('./StrengthWorkoutCard', () => ({
  default: ({
    workout,
    index,
    totalCount,
    isCollapsed,
  }: {
    workout: StrengthWorkout;
    index: number;
    totalCount: number;
    isCollapsed: boolean;
  }): React.ReactElement => (
    <div data-testid="strength-workout-card">
      <span data-testid="workout-name">{workout.name}</span>
      <span data-testid="workout-index">{index}</span>
      <span data-testid="total-count">{totalCount}</span>
      <span data-testid="is-collapsed">{isCollapsed.toString()}</span>
    </div>
  ),
}));

describe('StrengthWorkoutsSection', (): void => {
  let mockOperations: {
    onAddStrengthWorkout: ReturnType<typeof vi.fn>;
    onToggleCollapse: ReturnType<typeof vi.fn>;
    onMoveUp: ReturnType<typeof vi.fn>;
    onMoveDown: ReturnType<typeof vi.fn>;
    onRemove: ReturnType<typeof vi.fn>;
    onUpdateName: ReturnType<typeof vi.fn>;
    onUpdateObjective: ReturnType<typeof vi.fn>;
    onUpdateSchedule: ReturnType<typeof vi.fn>;
    onAddSection: ReturnType<typeof vi.fn>;
    onUpdateSectionName: ReturnType<typeof vi.fn>;
    onUpdateSectionType: ReturnType<typeof vi.fn>;
    onUpdateSectionRestAfter: ReturnType<typeof vi.fn>;
    onUpdateSectionEmomDuration: ReturnType<typeof vi.fn>;
    onRemoveSection: ReturnType<typeof vi.fn>;
    onAddExercise: ReturnType<typeof vi.fn>;
    onUpdateExerciseEmomReps: ReturnType<typeof vi.fn>;
    onUpdateExerciseSets: ReturnType<typeof vi.fn>;
    onUpdateExerciseName: ReturnType<typeof vi.fn>;
    onUpdateRestTimer: ReturnType<typeof vi.fn>;
    onUpdateExerciseRestAfter: ReturnType<typeof vi.fn>;
    onRemoveExercise: ReturnType<typeof vi.fn>;
    onAddApproachSets: ReturnType<typeof vi.fn>;
    onUpdateProgressionMethod: ReturnType<typeof vi.fn>;
    onNotesClick: ReturnType<typeof vi.fn>;
  };

  beforeEach((): void => {
    mockOperations = {
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
  });

  const mockWorkouts: StrengthWorkout[] = [
    {
      id: 'workout-1',
      name: 'Test Workout 1',
      type: 'strength',
      objective: 'Build strength',
      schedule: {
        repeatPattern: 'weekly',
        repeatValue: '1',
        selectedDays: ['monday'],
        time: '09:00',
      },
      sections: [],
    },
    {
      id: 'workout-2',
      name: 'Test Workout 2',
      type: 'strength',
      objective: 'Build muscle',
      schedule: {
        repeatPattern: 'weekly',
        repeatValue: '2',
        selectedDays: ['tuesday', 'thursday'],
        time: '10:00',
      },
      sections: [],
    },
  ];

  const mockCollapsedWorkouts = new Set(['workout-1']);

  it('should render the section header with correct workout count', (): void => {
    render(
      <StrengthWorkoutsSection
        strengthWorkouts={mockWorkouts}
        collapsedStrengthWorkouts={mockCollapsedWorkouts}
        operations={mockOperations}
      />
    );

    expect(screen.getByText('Strength Workouts (2)')).toBeInTheDocument();
  });

  it('should render the add workout button', (): void => {
    render(
      <StrengthWorkoutsSection
        strengthWorkouts={mockWorkouts}
        collapsedStrengthWorkouts={mockCollapsedWorkouts}
        operations={mockOperations}
      />
    );

    expect(screen.getByText('Add Strength Workout')).toBeInTheDocument();
  });

  it('should call onAddStrengthWorkout when add button is clicked', (): void => {
    render(
      <StrengthWorkoutsSection
        strengthWorkouts={mockWorkouts}
        collapsedStrengthWorkouts={mockCollapsedWorkouts}
        operations={mockOperations}
      />
    );

    screen.getByText('Add Strength Workout').click();
    expect(mockOperations.onAddStrengthWorkout).toHaveBeenCalledTimes(1);
  });

  it('should render StrengthWorkoutCard for each workout', (): void => {
    render(
      <StrengthWorkoutsSection
        strengthWorkouts={mockWorkouts}
        collapsedStrengthWorkouts={mockCollapsedWorkouts}
        operations={mockOperations}
      />
    );

    const workoutCards = screen.getAllByTestId('strength-workout-card');
    expect(workoutCards).toHaveLength(2);
  });

  it('should pass correct props to StrengthWorkoutCard components', (): void => {
    render(
      <StrengthWorkoutsSection
        strengthWorkouts={mockWorkouts}
        collapsedStrengthWorkouts={mockCollapsedWorkouts}
        operations={mockOperations}
      />
    );

    const workoutNames = screen.getAllByTestId('workout-name');
    expect(workoutNames[0]).toHaveTextContent('Test Workout 1');
    expect(workoutNames[1]).toHaveTextContent('Test Workout 2');

    const workoutIndices = screen.getAllByTestId('workout-index');
    expect(workoutIndices[0]).toHaveTextContent('0');
    expect(workoutIndices[1]).toHaveTextContent('1');

    const totalCounts = screen.getAllByTestId('total-count');
    expect(totalCounts[0]).toHaveTextContent('2');
    expect(totalCounts[1]).toHaveTextContent('2');

    const collapsedStates = screen.getAllByTestId('is-collapsed');
    expect(collapsedStates[0]).toHaveTextContent('true'); // workout-1 is collapsed
    expect(collapsedStates[1]).toHaveTextContent('false'); // workout-2 is not collapsed
  });

  it('should render empty state when no workouts exist', (): void => {
    render(
      <StrengthWorkoutsSection
        strengthWorkouts={[]}
        collapsedStrengthWorkouts={new Set()}
        operations={mockOperations}
      />
    );

    expect(
      screen.getByText('No strength workouts added yet')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Add Your First Strength Workout')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('strength-workout-card')
    ).not.toBeInTheDocument();
  });

  it('should call onAddStrengthWorkout when empty state add button is clicked', (): void => {
    render(
      <StrengthWorkoutsSection
        strengthWorkouts={[]}
        collapsedStrengthWorkouts={new Set()}
        operations={mockOperations}
      />
    );

    screen.getByText('Add Your First Strength Workout').click();
    expect(mockOperations.onAddStrengthWorkout).toHaveBeenCalledTimes(1);
  });
});
