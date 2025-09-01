import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WorkoutBuilder } from './WorkoutBuilder';
import type { Workout } from '@peakhealth/routines-types';

// Mock the dependencies
vi.mock('../../hooks/useRoutineWorkouts', () => ({
  useRoutineWorkouts: vi.fn(),
}));

vi.mock('../WorkoutAccordion', () => ({
  WorkoutAccordion: ({ workoutId }: { workoutId: string }) => (
    <div data-testid={`workout-accordion-${workoutId}`}>
      Workout Accordion {workoutId}
    </div>
  ),
}));

vi.mock('../../utils/workoutCreation', () => ({
  createDefaultStrengthWorkout: vi.fn(),
}));

vi.mock('@peakhealth/ui', () => ({
  Button: ({ children, onClick, disabled, className, variant, size }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </button>
  ),
}));

// Import the mocked functions
import { useRoutineWorkouts } from '../../hooks/useRoutineWorkouts';
import { createDefaultStrengthWorkout } from '../../utils/workoutCreation';

describe('WorkoutBuilder', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementations
    vi.mocked(useRoutineWorkouts).mockReturnValue({
      workoutIds: [],
      workouts: [],
      addWorkout: vi.fn(),
      removeWorkout: vi.fn(),
      updateWorkout: vi.fn(),
    });

    vi.mocked(createDefaultStrengthWorkout).mockReturnValue({
      _id: 'new-workout',
      name: 'New Workout',
      type: 'strength' as const,
      sections: [],
      orderIndex: 0,
    });
  });

  it('renders the component with title and add workout button', () => {
    render(<WorkoutBuilder />);

    expect(screen.getByText('Workouts')).toBeDefined();
    expect(screen.getByText('+ Add Workout')).toBeDefined();
  });

  it('shows empty state when no workouts exist', () => {
    render(<WorkoutBuilder />);

    expect(screen.getByText('No workouts yet')).toBeDefined();
    expect(
      screen.getByText(
        'Start building your routine by adding your first workout.'
      )
    ).toBeDefined();
    expect(screen.getByText('Add Your First Workout')).toBeDefined();
    expect(screen.getByText('🏋️')).toBeDefined();
  });

  it('shows workouts list when workouts exist', () => {
    vi.mocked(useRoutineWorkouts).mockReturnValue({
      workoutIds: ['workout-1', 'workout-2'],
      workouts: [],
      addWorkout: vi.fn(),
      removeWorkout: vi.fn(),
      updateWorkout: vi.fn(),
    });

    render(<WorkoutBuilder />);

    expect(screen.getByTestId('workout-accordion-workout-1')).toBeDefined();
    expect(screen.getByTestId('workout-accordion-workout-2')).toBeDefined();
    expect(screen.queryByText('No workouts yet')).toBeNull();
  });

  it('calls addWorkout when add workout button is clicked', async () => {
    const mockAddWorkout = vi.fn();
    const mockWorkout: Workout = {
      _id: 'new-workout',
      name: 'New Workout',
      type: 'strength',
      sections: [],
      orderIndex: 0,
    };

    vi.mocked(useRoutineWorkouts).mockReturnValue({
      workoutIds: [],
      workouts: [],
      addWorkout: mockAddWorkout,
      removeWorkout: vi.fn(),
      updateWorkout: vi.fn(),
    });

    vi.mocked(createDefaultStrengthWorkout).mockReturnValue(mockWorkout as any);

    render(<WorkoutBuilder />);

    const addButton = screen.getByText('+ Add Workout');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(createDefaultStrengthWorkout).toHaveBeenCalledWith('Workout 1', 0);
      expect(mockAddWorkout).toHaveBeenCalledWith(mockWorkout);
    });
  });

  it('calls addWorkout when empty state add button is clicked', async () => {
    const mockAddWorkout = vi.fn();
    const mockWorkout: Workout = {
      _id: 'new-workout',
      name: 'New Workout',
      type: 'strength',
      sections: [],
      orderIndex: 0,
    };

    vi.mocked(useRoutineWorkouts).mockReturnValue({
      workoutIds: [],
      workouts: [],
      addWorkout: mockAddWorkout,
      removeWorkout: vi.fn(),
      updateWorkout: vi.fn(),
    });

    vi.mocked(createDefaultStrengthWorkout).mockReturnValue(mockWorkout as any);

    render(<WorkoutBuilder />);

    const emptyStateButton = screen.getByText('Add Your First Workout');
    fireEvent.click(emptyStateButton);

    await waitFor(() => {
      expect(createDefaultStrengthWorkout).toHaveBeenCalledWith('Workout 1', 0);
      expect(mockAddWorkout).toHaveBeenCalledWith(mockWorkout);
    });
  });

  it('increments workout number for subsequent workouts', async () => {
    const mockAddWorkout = vi.fn();

    vi.mocked(useRoutineWorkouts).mockReturnValue({
      workoutIds: ['workout-1', 'workout-2'],
      workouts: [],
      addWorkout: mockAddWorkout,
      removeWorkout: vi.fn(),
      updateWorkout: vi.fn(),
    });

    render(<WorkoutBuilder />);

    const addButton = screen.getByText('+ Add Workout');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(createDefaultStrengthWorkout).toHaveBeenCalledWith('Workout 3', 2);
    });
  });

  it('applies custom className when provided', () => {
    render(<WorkoutBuilder className="custom-class" />);

    const container = screen.getByText('Workouts').closest('.workout-builder');
    expect(container?.className).toContain('custom-class');
  });

  it('handles multiple workout additions correctly', async () => {
    const mockAddWorkout = vi.fn();

    vi.mocked(useRoutineWorkouts).mockReturnValue({
      workoutIds: ['workout-1'],
      workouts: [],
      addWorkout: mockAddWorkout,
      removeWorkout: vi.fn(),
      updateWorkout: vi.fn(),
    });

    render(<WorkoutBuilder />);

    const addButton = screen.getByText('+ Add Workout');

    // Add first workout
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(createDefaultStrengthWorkout).toHaveBeenCalledWith('Workout 2', 1);
    });

    // Add second workout
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(createDefaultStrengthWorkout).toHaveBeenCalledWith('Workout 2', 1);
    });

    expect(mockAddWorkout).toHaveBeenCalledTimes(2);
  });
});
