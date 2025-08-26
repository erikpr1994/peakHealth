import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import StrengthWorkoutsSection from './StrengthWorkoutsSection';
import { StrengthWorkout } from '@/features/routines/types';

// Mock the WorkoutSection component
vi.mock(
  '@/features/routines/features/workout-management/components/WorkoutSection',
  () => ({
    default: ({
      section,
    }: {
      section: { id: string; name: string };
    }): React.ReactElement => (
      <div data-testid={`workout-section-${section.id}`}>{section.name}</div>
    ),
  })
);

// Mock the WorkoutHeader component
vi.mock(
  '@/features/routines/features/workout-management/components/WorkoutHeader',
  () => ({
    default: ({
      workout,
    }: {
      workout: { id: string; name: string };
    }): React.ReactElement => (
      <div data-testid={`workout-header-${workout.id}`}>{workout.name}</div>
    ),
  })
);

// Mock the WorkoutDetails component
vi.mock(
  '@/features/routines/features/workout-management/components/WorkoutDetails',
  () => ({
    default: (): React.ReactElement => (
      <div data-testid="workout-details">Workout Details</div>
    ),
  })
);

// Mock the calculateWorkoutDuration function
vi.mock('@/features/routines/utils/workoutCalculations', () => ({
  calculateWorkoutDuration: (): number => 45,
}));

describe('StrengthWorkoutsSection', () => {
  const mockStrengthWorkouts: StrengthWorkout[] = [
    {
      id: 'workout-1',
      name: 'Test Strength Workout',
      type: 'strength',
      objective: 'Build muscle',
      schedule: {
        repeatPattern: '',
        repeatValue: '',
        selectedDays: [],
        time: '',
      },
      sections: [
        {
          id: 'section-1',
          name: 'Warm-up',
          type: 'warmup',
          exercises: [],
          restAfter: '2 min',
          emomDuration: undefined,
        },
      ],
    },
  ];

  const defaultProps = {
    strengthWorkouts: mockStrengthWorkouts,
    collapsedStrengthWorkouts: new Set<string>(),
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render strength workouts section with title', () => {
    render(<StrengthWorkoutsSection {...defaultProps} />);

    expect(screen.getByText('Strength Workouts (1)')).toBeInTheDocument();
  });

  it('should render "Add Strength Workout" button', () => {
    render(<StrengthWorkoutsSection {...defaultProps} />);

    expect(screen.getByText('Add Strength Workout')).toBeInTheDocument();
  });

  it('should render workout when not collapsed', () => {
    render(<StrengthWorkoutsSection {...defaultProps} />);

    expect(screen.getByTestId('workout-header-workout-1')).toBeInTheDocument();
    expect(screen.getByTestId('workout-details')).toBeInTheDocument();
  });

  it('should not render workout content when collapsed', () => {
    const collapsedProps = {
      ...defaultProps,
      collapsedStrengthWorkouts: new Set(['workout-1']),
    };

    render(<StrengthWorkoutsSection {...collapsedProps} />);

    expect(screen.getByTestId('workout-header-workout-1')).toBeInTheDocument();
    expect(screen.queryByTestId('workout-details')).not.toBeInTheDocument();
  });

  it('should render empty state when no workouts', () => {
    const emptyProps = {
      ...defaultProps,
      strengthWorkouts: [],
    };

    render(<StrengthWorkoutsSection {...emptyProps} />);

    expect(
      screen.getByText('No strength workouts added yet')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Add Your First Strength Workout')
    ).toBeInTheDocument();
  });

  it('should call onAddStrengthWorkout when "Add Strength Workout" button is clicked', () => {
    render(<StrengthWorkoutsSection {...defaultProps} />);

    screen.getByText('Add Strength Workout').click();

    expect(defaultProps.onAddStrengthWorkout).toHaveBeenCalledTimes(1);
  });
});
