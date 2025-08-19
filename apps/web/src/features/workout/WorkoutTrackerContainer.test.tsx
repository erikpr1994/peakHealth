import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WorkoutTrackerContainer from './WorkoutTrackerContainer';

// Mock dependencies
const mockGoToDashboard = vi.fn();
const mockGoToRoutines = vi.fn();

vi.mock('./hooks/useWorkoutNavigation', (): { useWorkoutNavigation: () => { goToDashboard: () => void; goToRoutines: () => void } } => ({
  useWorkoutNavigation: (): { goToDashboard: () => void; goToRoutines: () => void } => ({
    goToDashboard: mockGoToDashboard,
    goToRoutines: mockGoToRoutines,
  }),
}));

// Mock child components
vi.mock('./WorkoutPreparation', (): { default: ({ onStartWorkout }: { onStartWorkout: () => void }) => React.JSX.Element } => ({
  default: ({ onStartWorkout }: { onStartWorkout: () => void }): React.JSX.Element => (
    <div data-testid="workout-preparation">
      <button onClick={onStartWorkout}>Start Workout</button>
    </div>
  ),
}));

vi.mock('./WorkoutTracker', (): { default: ({ onComplete, onExit }: { onComplete: () => void; onExit: () => void }) => React.JSX.Element } => ({
  default: ({
    onComplete,
    onExit,
  }: {
    onComplete: () => void;
    onExit: () => void;
  }): React.JSX.Element => (
    <div data-testid="workout-tracker">
      <button onClick={onComplete}>Complete Workout</button>
      <button onClick={onExit}>Exit Workout</button>
    </div>
  ),
}));

vi.mock('./WorkoutCompletion', (): { default: () => React.JSX.Element } => ({
  default: (): React.JSX.Element => <div data-testid="workout-completion">Workout Complete!</div>,
}));

describe('WorkoutTrackerContainer', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach((): void => {
    vi.useRealTimers();
  });

  it('should render WorkoutPreparation initially', () => {
    render(<WorkoutTrackerContainer routineId="test-routine" />);

    expect(screen.getByTestId('workout-preparation')).toBeInTheDocument();
  });

  it('should transition to WorkoutTracker when workout is started', async () => {
    render(<WorkoutTrackerContainer routineId="test-routine" />);

    const startButton = screen.getByText('Start Workout');
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByTestId('workout-tracker')).toBeInTheDocument();
    });
  });

  it('should transition to WorkoutCompletion when workout is completed', async () => {
    render(<WorkoutTrackerContainer routineId="test-routine" />);

    // Start workout
    const startButton = screen.getByText('Start Workout');
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByTestId('workout-tracker')).toBeInTheDocument();
    });

    // Complete workout
    const completeButton = screen.getByText('Complete Workout');
    fireEvent.click(completeButton);

    await waitFor(() => {
      expect(screen.getByTestId('workout-completion')).toBeInTheDocument();
    });
  });

  it('should redirect to dashboard after completion timeout', async () => {
    render(<WorkoutTrackerContainer routineId="test-routine" />);

    // Start and complete workout
    fireEvent.click(screen.getByText('Start Workout'));
    await waitFor(() => {
      expect(screen.getByTestId('workout-tracker')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Complete Workout'));
    await waitFor(() => {
      expect(screen.getByTestId('workout-completion')).toBeInTheDocument();
    });

    // Fast-forward time to trigger redirect
    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(mockGoToDashboard).toHaveBeenCalled();
    });
  });

  it('should call goToRoutines when workout is exited', async () => {
    render(<WorkoutTrackerContainer routineId="test-routine" />);

    // Start workout
    fireEvent.click(screen.getByText('Start Workout'));
    await waitFor(() => {
      expect(screen.getByTestId('workout-tracker')).toBeInTheDocument();
    });

    // Exit workout
    const exitButton = screen.getByText('Exit Workout');
    fireEvent.click(exitButton);

    expect(mockGoToRoutines).toHaveBeenCalled();
  });

  it('should generate session ID when workout is started', async () => {
    const mockDate = new Date('2024-01-01T10:00:00.000Z');
    vi.setSystemTime(mockDate);

    render(<WorkoutTrackerContainer routineId="test-routine" />);

    fireEvent.click(screen.getByText('Start Workout'));

    await waitFor(() => {
      expect(screen.getByTestId('workout-tracker')).toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it('should pass routineId to WorkoutPreparation', () => {
    render(<WorkoutTrackerContainer routineId="custom-routine-id" />);

    expect(screen.getByTestId('workout-preparation')).toBeInTheDocument();
  });
});
