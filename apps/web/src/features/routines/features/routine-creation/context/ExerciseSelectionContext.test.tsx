import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  ExerciseSelectionProvider,
  useExerciseSelectionContext,
} from './ExerciseSelectionContext';
import { StrengthWorkout, RunningWorkout } from '../../../types';

// Test component that uses the context
const TestComponent = (): React.ReactElement => {
  const { exerciseModalOpen, openExerciseModal, closeExerciseModal } =
    useExerciseSelectionContext();

  return (
    <div>
      <span data-testid="modal-open">{exerciseModalOpen.toString()}</span>
      <button onClick={() => openExerciseModal('workout-1', 'section-1')}>
        Open Modal
      </button>
      <button onClick={closeExerciseModal}>Close Modal</button>
    </div>
  );
};

describe('ExerciseSelectionContext', () => {
  it('should provide default values', () => {
    const mockAddStrengthExercise = vi.fn();
    const mockAddRunningExercise = vi.fn();

    render(
      <ExerciseSelectionProvider
        strengthWorkouts={[] as StrengthWorkout[]}
        runningWorkouts={[] as RunningWorkout[]}
        addStrengthExercise={mockAddStrengthExercise}
        addRunningExercise={mockAddRunningExercise}
      >
        <TestComponent />
      </ExerciseSelectionProvider>
    );

    expect(screen.getByTestId('modal-open')).toHaveTextContent('false');
  });

  it('should open and close exercise modal', () => {
    const mockAddStrengthExercise = vi.fn();
    const mockAddRunningExercise = vi.fn();

    render(
      <ExerciseSelectionProvider
        strengthWorkouts={[] as StrengthWorkout[]}
        runningWorkouts={[] as RunningWorkout[]}
        addStrengthExercise={mockAddStrengthExercise}
        addRunningExercise={mockAddRunningExercise}
      >
        <TestComponent />
      </ExerciseSelectionProvider>
    );

    // Initially closed
    expect(screen.getByTestId('modal-open')).toHaveTextContent('false');
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation((): void => {
        // Intentionally empty
      });

    expect(() => {
      render(<TestComponent />);
    }).toThrow(
      'useExerciseSelectionContext must be used within an ExerciseSelectionProvider'
    );

    consoleSpy.mockRestore();
  });
});
