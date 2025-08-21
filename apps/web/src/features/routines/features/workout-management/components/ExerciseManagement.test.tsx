import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ExerciseManagement from './ExerciseManagement';
import type { Exercise } from '@/features/routines/types';
import type { WorkoutSet } from '@/features/routines/components/SetManagement';

// Mock the SetManagement component
vi.mock('@/features/routines/components/SetManagement', () => ({
  default: ({
    sets,
    onSetsChange,
  }: {
    sets: WorkoutSet[];
    onSetsChange: (sets: WorkoutSet[]) => void;
  }) => (
    <div data-testid="set-management">
      <button
        onClick={() =>
          onSetsChange([
            ...sets,
            {
              id: 'new-set',
              setNumber: 1,
              setType: 'normal',
              repType: 'fixed',
              reps: 10,
              weight: 0,
              rpe: null,
              notes: '',
            },
          ])
        }
      >
        Add Set
      </button>
    </div>
  ),
  WorkoutSet: vi.fn(),
}));

describe('ExerciseManagement', () => {
  it('renders exercise management component', () => {
    const mockExercise: Exercise = {
      id: '1',
      name: 'Test Exercise',
      sets: [],
      restTimer: '',
      restAfter: '',
      notes: '',
      emomReps: 0,
      progressionMethod: 'linear',
    };

    const mockOnUpdateSets = vi.fn();
    const mockOnUpdateName = vi.fn();
    const mockOnUpdateRestTimer = vi.fn();
    const mockOnUpdateRestAfter = vi.fn();
    const mockOnRemove = vi.fn();
    const mockOnAddApproachSets = vi.fn();
    const mockOnUpdateProgressionMethod = vi.fn();
    const mockOnNotesClick = vi.fn();
    const mockOnUpdateEmomReps = vi.fn();

    render(
      <ExerciseManagement
        exercise={mockExercise}
        workoutId="workout-1"
        sectionId="section-1"
        index={0}
        isLastExercise={true}
        onUpdateSets={mockOnUpdateSets}
        onUpdateName={mockOnUpdateName}
        onUpdateRestTimer={mockOnUpdateRestTimer}
        onUpdateRestAfter={mockOnUpdateRestAfter}
        onRemove={mockOnRemove}
        onAddApproachSets={mockOnAddApproachSets}
        onUpdateProgressionMethod={mockOnUpdateProgressionMethod}
        onNotesClick={mockOnNotesClick}
        onUpdateEmomReps={mockOnUpdateEmomReps}
      />
    );

    expect(screen.getByText('Test Exercise')).toBeInTheDocument();
  });
});
