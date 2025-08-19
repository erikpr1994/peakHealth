import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WorkoutPreparation from './WorkoutPreparation';

// Mock dependencies
const mockGoToRoutines = vi.fn();
const mockOnStartWorkout = vi.fn();

vi.mock('./hooks/useWorkoutNavigation', (): { useWorkoutNavigation: () => { goToRoutines: () => void } } => ({
  useWorkoutNavigation: (): { goToRoutines: () => void } => ({
    goToRoutines: mockGoToRoutines,
  }),
}));

describe('WorkoutPreparation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render routine details', () => {
    render(
      <WorkoutPreparation
        routineId="test-routine"
        onStartWorkout={mockOnStartWorkout}
      />
    );

    expect(screen.getByText('Full Body Split')).toBeInTheDocument();
    expect(
      screen.getByText(/comprehensive full-body workout/)
    ).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Strength & Hypertrophy')).toBeInTheDocument();
  });

  it('should display routine statistics', () => {
    render(
      <WorkoutPreparation
        routineId="test-routine"
        onStartWorkout={mockOnStartWorkout}
      />
    );

    expect(screen.getByText('45-60 minutes')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument(); // total exercises
    expect(screen.getByText('24')).toBeInTheDocument(); // total sets
  });

  it('should display muscle groups', () => {
    render(
      <WorkoutPreparation
        routineId="test-routine"
        onStartWorkout={mockOnStartWorkout}
      />
    );

    expect(screen.getByText('Chest')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Shoulders')).toBeInTheDocument();
    expect(screen.getByText('Arms')).toBeInTheDocument();
    expect(screen.getByText('Legs')).toBeInTheDocument();
    expect(screen.getByText('Core')).toBeInTheDocument();
  });

  it('should display equipment', () => {
    render(
      <WorkoutPreparation
        routineId="test-routine"
        onStartWorkout={mockOnStartWorkout}
      />
    );

    expect(screen.getByText('Barbell')).toBeInTheDocument();
    expect(screen.getByText('Dumbbells')).toBeInTheDocument();
    expect(screen.getByText('Bench')).toBeInTheDocument();
    expect(screen.getByText('Pull-up Bar')).toBeInTheDocument();
  });

  it('should call onStartWorkout when start button is clicked', async () => {
    render(
      <WorkoutPreparation
        routineId="test-routine"
        onStartWorkout={mockOnStartWorkout}
      />
    );

    const startButton = screen.getByText('Start Workout');
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(mockOnStartWorkout).toHaveBeenCalled();
    });
  });

  it('should call goToRoutines when back button is clicked', () => {
    render(
      <WorkoutPreparation
        routineId="test-routine"
        onStartWorkout={mockOnStartWorkout}
      />
    );

    const backButton = screen.getByText('Back to Routines');
    fireEvent.click(backButton);

    expect(mockGoToRoutines).toHaveBeenCalled();
  });

  it('should call goToRoutines when cancel button is clicked', () => {
    render(
      <WorkoutPreparation
        routineId="test-routine"
        onStartWorkout={mockOnStartWorkout}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockGoToRoutines).toHaveBeenCalled();
  });

  it('should show loading state when start button is clicked', async () => {
    render(
      <WorkoutPreparation
        routineId="test-routine"
        onStartWorkout={mockOnStartWorkout}
      />
    );

    const startButton = screen.getByText('Start Workout');
    fireEvent.click(startButton);

    expect(screen.getByText('Starting...')).toBeInTheDocument();
  });
});
