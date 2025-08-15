import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RoutineCreation from './RoutineCreation';

// Mock the auth context
vi.mock('@/features/auth/context/AuthContext', () => ({
  useAuth: (): { isAuthenticated: boolean; user: { id: string } } => ({
    isAuthenticated: true,
    user: { id: 'test-user-id' },
  }),
}));

// Mock the router
vi.mock('next/navigation', () => ({
  useRouter: (): { push: () => void } => ({
    push: vi.fn(),
  }),
}));

// Mock the routine service
vi.mock('../../services/routineService', () => ({
  routineService: {
    createRoutine: vi.fn(),
    getRoutineById: vi.fn(),
  },
}));

// Mock the workout operations hook
vi.mock('../../hooks/useWorkoutOperations', () => ({
  useWorkoutOperations: (): Record<string, unknown> => ({
    strengthWorkouts: [],
    runningWorkouts: [],
    setStrengthWorkouts: vi.fn(),
    setRunningWorkouts: vi.fn(),
    addStrengthWorkout: vi.fn(),
    removeStrengthWorkout: vi.fn(),
    moveStrengthWorkout: vi.fn(),
    updateStrengthWorkoutName: vi.fn(),
    updateStrengthWorkoutObjective: vi.fn(),
    updateStrengthWorkoutSchedule: vi.fn(),
    removeRunningWorkout: vi.fn(),
    moveRunningWorkout: vi.fn(),
    updateRunningWorkoutName: vi.fn(),
    updateRunningWorkoutObjective: vi.fn(),
    updateRunningWorkoutSchedule: vi.fn(),
    addStrengthSection: vi.fn(),
    addRunningSection: vi.fn(),
    removeStrengthSection: vi.fn(),
    removeRunningSection: vi.fn(),
    updateStrengthSectionName: vi.fn(),
    updateRunningSectionName: vi.fn(),
    updateStrengthSectionType: vi.fn(),
    updateRunningSectionType: vi.fn(),
    updateStrengthSectionRestAfter: vi.fn(),
    updateRunningSectionRestAfter: vi.fn(),
    updateStrengthSectionEmomDuration: vi.fn(),
    updateRunningSectionEmomDuration: vi.fn(),
    addStrengthExercise: vi.fn(),
    addRunningExercise: vi.fn(),
    removeStrengthExercise: vi.fn(),
    removeRunningExercise: vi.fn(),
    updateStrengthExerciseName: vi.fn(),
    updateRunningExerciseName: vi.fn(),
    updateStrengthExerciseSets: vi.fn(),
    updateRunningExerciseSets: vi.fn(),
    updateStrengthRestTimer: vi.fn(),
    updateRunningRestTimer: vi.fn(),
    updateStrengthExerciseRestAfter: vi.fn(),
    updateRunningExerciseRestAfter: vi.fn(),
    updateStrengthExerciseEmomReps: vi.fn(),
    updateRunningExerciseEmomReps: vi.fn(),
    updateStrengthExerciseProgressionMethod: vi.fn(),
  }),
}));

describe('RoutineCreation', () => {
  it('should render in create mode by default', () => {
    render(<RoutineCreation />);

    // Check that the form is rendered (this indicates the context provider is working)
    expect(screen.getByText('Routine Details')).toBeInTheDocument();
  });

  it('should render in edit mode when specified', () => {
    render(<RoutineCreation mode="edit" editRoutineId="test-id" />);

    // Check that the form is rendered
    expect(screen.getByText('Routine Details')).toBeInTheDocument();
  });

  it('should wrap content in RoutineDetailsProvider', () => {
    render(<RoutineCreation />);

    // If the context provider is working, the form should render without errors
    expect(screen.getByText('Routine Details')).toBeInTheDocument();
  });
});
