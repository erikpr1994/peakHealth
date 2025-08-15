import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RoutineExerciseSelectionModal from './ExerciseSelectionModal';
import { ExerciseSelectionProvider } from '../context/ExerciseSelectionContext';

// Mock the ExerciseSelectionModal component
vi.mock('@/features/exercises/ExerciseSelectionModal', () => ({
  default: ({
    isOpen,
    onClose,
    onSelectExercise,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onSelectExercise: (exercise: Record<string, unknown>) => void;
  }): React.ReactElement => (
    <div data-testid="exercise-selection-modal">
      <span data-testid="modal-open">{isOpen.toString()}</span>
      <button onClick={onClose}>Close</button>
      <button
        onClick={() => onSelectExercise({ id: '1', name: 'Test Exercise' })}
      >
        Select
      </button>
    </div>
  ),
}));

describe('RoutineExerciseSelectionModal', () => {
  it('should render the exercise selection modal', () => {
    const mockAddStrengthExercise = vi.fn();
    const mockAddRunningExercise = vi.fn();

    render(
      <ExerciseSelectionProvider
        strengthWorkouts={[]}
        runningWorkouts={[]}
        addStrengthExercise={mockAddStrengthExercise}
        addRunningExercise={mockAddRunningExercise}
      >
        <RoutineExerciseSelectionModal />
      </ExerciseSelectionProvider>
    );

    expect(screen.getByTestId('exercise-selection-modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-open')).toHaveTextContent('false');
  });

  it('should handle modal state correctly', () => {
    const mockAddStrengthExercise = vi.fn();
    const mockAddRunningExercise = vi.fn();

    render(
      <ExerciseSelectionProvider
        strengthWorkouts={[]}
        runningWorkouts={[]}
        addStrengthExercise={mockAddStrengthExercise}
        addRunningExercise={mockAddRunningExercise}
      >
        <RoutineExerciseSelectionModal />
      </ExerciseSelectionProvider>
    );

    // Modal should be closed by default
    expect(screen.getByTestId('modal-open')).toHaveTextContent('false');
  });
});
