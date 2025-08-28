import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import WorkoutSection from './WorkoutSection';
import type { WorkoutSection as WorkoutSectionType } from '@/features/routines-old/types';

// Mock the ExerciseManagement component
vi.mock('./ExerciseManagement', () => ({
  default: ({ exercise }: { exercise: any }) => (
    <div data-testid="exercise-management">{exercise.name}</div>
  ),
}));

describe('WorkoutSection', () => {
  it('renders workout section with exercises', () => {
    const mockSection: WorkoutSectionType = {
      id: 'section-1',
      name: 'Test Section',
      type: 'basic',
      exercises: [
        {
          id: '1',
          name: 'Push-ups',
          sets: [],
          restTimer: '',
          restAfter: '',
          notes: '',
          emomReps: 0,
          progressionMethod: 'linear',
        },
        {
          id: '2',
          name: 'Squats',
          sets: [],
          restTimer: '',
          restAfter: '',
          notes: '',
          emomReps: 0,
          progressionMethod: 'linear',
        },
      ],
      restAfter: '',
      emomDuration: 0,
    };

    const mockOnUpdateName = vi.fn();
    const mockOnUpdateType = vi.fn();
    const mockOnUpdateRestAfter = vi.fn();
    const mockOnUpdateEmomDuration = vi.fn();
    const mockOnRemove = vi.fn();
    const mockOnAddExercise = vi.fn();
    const mockOnUpdateExerciseEmomReps = vi.fn();
    const mockOnUpdateExerciseSets = vi.fn();
    const mockOnUpdateExerciseName = vi.fn();
    const mockOnUpdateRestTimer = vi.fn();
    const mockOnUpdateExerciseRestAfter = vi.fn();
    const mockOnRemoveExercise = vi.fn();
    const mockOnAddApproachSets = vi.fn();
    const mockOnUpdateProgressionMethod = vi.fn();
    const mockOnNotesClick = vi.fn();

    render(
      <WorkoutSection
        section={mockSection}
        workoutId="workout-1"
        isLastSection={true}
        onUpdateName={mockOnUpdateName}
        onUpdateType={mockOnUpdateType}
        onUpdateRestAfter={mockOnUpdateRestAfter}
        onUpdateEmomDuration={mockOnUpdateEmomDuration}
        onRemove={mockOnRemove}
        onAddExercise={mockOnAddExercise}
        onUpdateExerciseEmomReps={mockOnUpdateExerciseEmomReps}
        onUpdateExerciseSets={mockOnUpdateExerciseSets}
        onUpdateExerciseName={mockOnUpdateExerciseName}
        onUpdateRestTimer={mockOnUpdateRestTimer}
        onUpdateExerciseRestAfter={mockOnUpdateExerciseRestAfter}
        onRemoveExercise={mockOnRemoveExercise}
        onAddApproachSets={mockOnAddApproachSets}
        onUpdateProgressionMethod={mockOnUpdateProgressionMethod}
        onNotesClick={mockOnNotesClick}
      />
    );

    expect(screen.getByDisplayValue('Test Section')).toBeInTheDocument();
  });
});
