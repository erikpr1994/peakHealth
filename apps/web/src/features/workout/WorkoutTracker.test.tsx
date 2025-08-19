import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WorkoutTracker from './WorkoutTracker';

// Mock dependencies
const mockGoToRoutines = vi.fn();
const mockGoToDashboard = vi.fn();
const mockOnComplete = vi.fn();
const mockOnExit = vi.fn();

vi.mock('./hooks/useWorkoutNavigation', (): { useWorkoutNavigation: () => { goToRoutines: () => void; goToDashboard: () => void } } => ({
  useWorkoutNavigation: (): { goToRoutines: () => void; goToDashboard: () => void } => ({
    goToRoutines: mockGoToRoutines,
    goToDashboard: mockGoToDashboard,
  }),
}));

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('WorkoutTracker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render workout tracker with routine ID', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(screen.getByText(/Trail Running Workout/)).toBeInTheDocument();
    expect(
      screen.getByText(/This is a placeholder for trail running workouts/)
    ).toBeInTheDocument();
  });

  it('should display workout controls', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(screen.getByText('Back to Routines')).toBeInTheDocument();
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
  });

  it('should call goToRoutines when Back to Routines button is clicked', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    const backButton = screen.getByText('Back to Routines');
    fireEvent.click(backButton);

    expect(mockGoToRoutines).toHaveBeenCalled();
  });

  it('should call goToDashboard when Go to Dashboard button is clicked', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    const dashboardButton = screen.getByText('Go to Dashboard');
    fireEvent.click(dashboardButton);

    expect(mockGoToDashboard).toHaveBeenCalled();
  });

  it('should render workout session information', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(screen.getByText(/Session ID: test-session/)).toBeInTheDocument();
    expect(screen.getByText(/Routine ID: test-routine/)).toBeInTheDocument();
  });

  it('should display placeholder message for trail running', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(
      screen.getByText(/This is a placeholder for trail running workouts/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/In a real implementation, this would show:/)
    ).toBeInTheDocument();
  });

  it('should list expected features for trail running', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(
      screen.getByText(/• GPS tracking and route mapping/)
    ).toBeInTheDocument();
    expect(screen.getByText(/• Pace and speed monitoring/)).toBeInTheDocument();
    expect(screen.getByText(/• Elevation tracking/)).toBeInTheDocument();
    expect(screen.getByText(/• Heart rate monitoring/)).toBeInTheDocument();
    expect(screen.getByText(/• Split times and intervals/)).toBeInTheDocument();
    expect(screen.getByText(/• Weather conditions/)).toBeInTheDocument();
    expect(screen.getByText(/• Terrain difficulty/)).toBeInTheDocument();
  });

  it('should handle session ID prop correctly', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        sessionId="custom-session-id"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(
      screen.getByText(/Session ID: custom-session-id/)
    ).toBeInTheDocument();
  });

  it('should handle missing session ID', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(screen.getByText(/Session ID: null/)).toBeInTheDocument();
  });
});
