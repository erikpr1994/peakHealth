import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WorkoutTracker from './WorkoutTracker';

// Mock dependencies
const mockGoToRoutines = vi.fn();
const mockGoToDashboard = vi.fn();
const mockOnComplete = vi.fn();
const mockOnExit = vi.fn();

vi.mock(
  './hooks/useWorkoutNavigation',
  (): {
    useWorkoutNavigation: () => {
      goToRoutines: () => void;
      goToDashboard: () => void;
    };
  } => ({
    useWorkoutNavigation: (): {
      goToRoutines: () => void;
      goToDashboard: () => void;
    } => ({
      goToRoutines: mockGoToRoutines,
      goToDashboard: mockGoToDashboard,
    }),
  })
);

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

    expect(screen.getByText('Full Body Split')).toBeInTheDocument();
    expect(screen.getByText('End Workout')).toBeInTheDocument();
    expect(screen.getByText('Pause')).toBeInTheDocument();
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

    expect(screen.getByText('End Workout')).toBeInTheDocument();
    expect(screen.getByText('Pause')).toBeInTheDocument();
  });

  it('should open exit dialog when End Workout button is clicked', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    const endButton = screen.getByText('End Workout');
    fireEvent.click(endButton);

    expect(screen.getByText('End Workout?')).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to end this workout/)
    ).toBeInTheDocument();
  });

  it('should display workout progress information', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getAllByText('Duration')).toHaveLength(2); // There are 2 Duration elements
    expect(screen.getByText('0/9')).toBeInTheDocument();
    expect(screen.getByText('0:00')).toBeInTheDocument();
  });

  it('should display workout progress bar', () => {
    render(
      <WorkoutTracker
        routineId="test-routine"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(screen.getByText('0% Complete')).toBeInTheDocument();
    expect(screen.getByText(/Upper Body Workout/)).toBeInTheDocument();
    expect(screen.getByText(/Warm-up/)).toBeInTheDocument();
  });

  it('should render trail running placeholder for trail running routines', () => {
    render(
      <WorkoutTracker
        routineId="trail-running-workout"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(screen.getByText('Trail Running Tracker')).toBeInTheDocument();
    expect(
      screen.getByText(/Advanced trail running workout tracking/)
    ).toBeInTheDocument();
  });

  it('should display trail running controls', () => {
    render(
      <WorkoutTracker
        routineId="trail-running-workout"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(screen.getByText('Back to Routines')).toBeInTheDocument();
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
  });

  it('should call goToRoutines when Back to Routines button is clicked in trail running mode', () => {
    render(
      <WorkoutTracker
        routineId="trail-running-workout"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    const backButton = screen.getByText('Back to Routines');
    fireEvent.click(backButton);

    expect(mockGoToRoutines).toHaveBeenCalled();
  });

  it('should call goToDashboard when Go to Dashboard button is clicked in trail running mode', () => {
    render(
      <WorkoutTracker
        routineId="trail-running-workout"
        sessionId="test-session"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    const dashboardButton = screen.getByText('Go to Dashboard');
    fireEvent.click(dashboardButton);

    expect(mockGoToDashboard).toHaveBeenCalled();
  });
});
