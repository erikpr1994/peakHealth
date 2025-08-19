import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WorkoutSummary from './WorkoutSummary';

// Mock dependencies
const mockGoToRoutines = vi.fn();
const mockGoToCalendar = vi.fn();
const mockOnComplete = vi.fn();

vi.mock(
  './hooks/useWorkoutNavigation',
  (): {
    useWorkoutNavigation: () => {
      goToRoutines: () => void;
      goToCalendar: () => void;
    };
  } => ({
    useWorkoutNavigation: (): {
      goToRoutines: () => void;
      goToCalendar: () => void;
    } => ({
      goToRoutines: mockGoToRoutines,
      goToCalendar: mockGoToCalendar,
    }),
  })
);

const mockWorkoutSession = {
  routineId: 'routine-1',
  routineName: 'Test Workout',
  startTime: new Date('2024-01-01T10:00:00'),
  endTime: new Date('2024-01-01T11:00:00'),
  totalDuration: 3600,
  workouts: [
    {
      id: 'workout-1',
      name: 'Test Workout',
      sections: [
        {
          id: 'section-1',
          name: 'Warm Up',
          type: 'warmup' as const,
          exercises: [
            {
              id: 'exercise-1',
              name: 'Push-ups',
              instructions: 'Do push-ups',
              muscleGroups: ['Chest'],
              sets: [
                {
                  id: 'set-1',
                  type: 'reps' as const,
                  reps: '10',
                  restTime: '60',
                },
              ],
            },
          ],
          restTime: 60,
        },
      ],
    },
  ],
  currentWorkoutIndex: 0,
  currentSectionIndex: 0,
  currentExerciseIndex: 0,
  currentSetIndex: 0,
  setData: [
    {
      id: 'set-1',
      exerciseId: 'exercise-1',
      setNumber: 1,
      actualReps: 10,
      restTime: 60,
      completed: true,
    },
  ],
  workoutNotes: '',
  isPaused: false,
  totalPauseTime: 0,
};

describe('WorkoutSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render workout completion celebration', () => {
    render(
      <WorkoutSummary
        workoutSession={mockWorkoutSession}
        onComplete={mockOnComplete}
      />
    );

    expect(screen.getByText('Workout Complete!')).toBeInTheDocument();
    // The component shows different celebration messages randomly, so we check for any celebration message
    expect(
      screen.getByText(
        /You crushed it|Your dedication|Outstanding work|Another step closer/
      )
    ).toBeInTheDocument();
  });

  it('should display workout statistics', () => {
    render(
      <WorkoutSummary
        workoutSession={mockWorkoutSession}
        onComplete={mockOnComplete}
      />
    );

    expect(screen.getAllByText('1h 0m')).toHaveLength(2); // total duration appears twice
    expect(screen.getAllByText('1')).toHaveLength(2); // sets completed and exercises both show "1"
    expect(screen.getByText('10')).toBeInTheDocument(); // total reps
  });

  it('should display workout details', () => {
    render(
      <WorkoutSummary
        workoutSession={mockWorkoutSession}
        onComplete={mockOnComplete}
      />
    );

    expect(screen.getByText('Test Workout')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('should display exercise breakdown', () => {
    render(
      <WorkoutSummary
        workoutSession={mockWorkoutSession}
        onComplete={mockOnComplete}
      />
    );

    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('1 sets')).toBeInTheDocument();
    expect(screen.getByText('10 reps')).toBeInTheDocument();
  });

  it('should handle workout rating', () => {
    render(
      <WorkoutSummary
        workoutSession={mockWorkoutSession}
        onComplete={mockOnComplete}
      />
    );

    const stars = screen.getAllByText('⭐');
    expect(stars).toHaveLength(5);

    fireEvent.click(stars[4]); // Click 5th star
    expect(screen.getByText('Amazing session! 🔥')).toBeInTheDocument();
  });

  it('should handle workout notes input', () => {
    render(
      <WorkoutSummary
        workoutSession={mockWorkoutSession}
        onComplete={mockOnComplete}
      />
    );

    const notesTextarea = screen.getByPlaceholderText(
      /How did today's workout feel/
    );
    fireEvent.change(notesTextarea, { target: { value: 'Great workout!' } });

    expect(notesTextarea).toHaveValue('Great workout!');
  });

  it('should call goToCalendar when Open Calendar button is clicked', () => {
    render(
      <WorkoutSummary
        workoutSession={mockWorkoutSession}
        onComplete={mockOnComplete}
      />
    );

    const calendarButton = screen.getByText('Open Calendar');
    fireEvent.click(calendarButton);

    expect(mockGoToCalendar).toHaveBeenCalled();
  });

  it('should call goToRoutines when Back to Routines button is clicked', () => {
    render(
      <WorkoutSummary
        workoutSession={mockWorkoutSession}
        onComplete={mockOnComplete}
      />
    );

    const backButton = screen.getByText('Back to Routines');
    fireEvent.click(backButton);

    expect(mockGoToRoutines).toHaveBeenCalled();
  });

  it('should call onComplete when Save Workout button is clicked', () => {
    render(
      <WorkoutSummary
        workoutSession={mockWorkoutSession}
        onComplete={mockOnComplete}
      />
    );

    const saveButton = screen.getByText('Save Workout');
    fireEvent.click(saveButton);

    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('should display time information', () => {
    render(
      <WorkoutSummary
        workoutSession={mockWorkoutSession}
        onComplete={mockOnComplete}
      />
    );

    expect(screen.getByText(/10:00/)).toBeInTheDocument(); // start time
    expect(screen.getByText(/11:00/)).toBeInTheDocument(); // end time
    expect(screen.getAllByText('1h 0m')).toHaveLength(2); // active time appears twice
  });
});
