import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RunningWorkoutsSection from './RunningWorkoutsSection';
import { RunningWorkout } from '@/features/routines/types';

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

// Mock the TrailRunningWorkout component
vi.mock(
  '@/features/routines/features/trail-running/TrailRunningWorkout',
  () => ({
    default: (): React.ReactElement => (
      <div data-testid="trail-running-workout">Trail Running Workout</div>
    ),
  })
);

// Mock the calculateWorkoutDuration function
vi.mock('@/features/routines/utils/workoutCalculations', () => ({
  calculateWorkoutDuration: (): number => 30,
}));

describe('RunningWorkoutsSection', () => {
  const mockRunningWorkouts: RunningWorkout[] = [
    {
      id: 'running-1',
      name: 'Test Running Workout',
      type: 'running',
      objective: 'Improve cardio',
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
      trailRunningData: {
        id: 'trail-1',
        name: 'Test Trail Run',
        description: 'Test description',
        type: 'trail-running',
        difficulty: 'beginner',
        estimatedDuration: 30,
        targetDistance: 5,
        elevationGain: 100,
        sections: [],
      },
    },
  ];

  const defaultProps = {
    runningWorkouts: mockRunningWorkouts,
    collapsedRunningWorkouts: new Set<string>(),
    creatingRunning: false,
    editingRunning: null,
    onAddRunningWorkout: vi.fn(),
    onRunningSave: vi.fn(),
    onRunningCancel: vi.fn(),
    onEditRunning: vi.fn(),
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
    onNotesClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render running workouts section with title', () => {
    render(<RunningWorkoutsSection {...defaultProps} />);

    expect(screen.getByText('Running Workouts (1)')).toBeInTheDocument();
  });

  it('should render "Add Running Workout" button', () => {
    render(<RunningWorkoutsSection {...defaultProps} />);

    expect(screen.getByText('Add Running Workout')).toBeInTheDocument();
  });

  it('should render workout when not collapsed', () => {
    render(<RunningWorkoutsSection {...defaultProps} />);

    expect(screen.getByTestId('workout-header-running-1')).toBeInTheDocument();
    expect(screen.getByTestId('workout-details')).toBeInTheDocument();
  });

  it('should not render workout content when collapsed', () => {
    const collapsedProps = {
      ...defaultProps,
      collapsedRunningWorkouts: new Set(['running-1']),
    };

    render(<RunningWorkoutsSection {...collapsedProps} />);

    expect(screen.getByTestId('workout-header-running-1')).toBeInTheDocument();
    expect(screen.queryByTestId('workout-details')).not.toBeInTheDocument();
  });

  it('should render empty state when no workouts', () => {
    const emptyProps = {
      ...defaultProps,
      runningWorkouts: [],
    };

    render(<RunningWorkoutsSection {...emptyProps} />);

    expect(
      screen.getByText('No running workouts added yet')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Add Your First Running Workout')
    ).toBeInTheDocument();
  });

  it('should call onAddRunningWorkout when "Add Running Workout" button is clicked', () => {
    render(<RunningWorkoutsSection {...defaultProps} />);

    screen.getByText('Add Running Workout').click();

    expect(defaultProps.onAddRunningWorkout).toHaveBeenCalledTimes(1);
  });

  it('should render trail running workout when creating', () => {
    const creatingProps = {
      ...defaultProps,
      creatingRunning: true,
    };

    render(<RunningWorkoutsSection {...creatingProps} />);

    expect(screen.getByTestId('trail-running-workout')).toBeInTheDocument();
  });

  it('should render trail running workout when editing', () => {
    const trailRunningData = mockRunningWorkouts[0].trailRunningData;
    if (!trailRunningData) {
      throw new Error('trailRunningData is required for this test');
    }

    const editingProps = {
      ...defaultProps,
      editingRunning: {
        workoutId: 'running-1',
        data: trailRunningData,
      },
    };

    render(<RunningWorkoutsSection {...editingProps} />);

    expect(screen.getByTestId('trail-running-workout')).toBeInTheDocument();
  });
});
