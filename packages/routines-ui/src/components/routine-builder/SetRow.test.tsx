import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SetRow } from './SetRow';
import { useSet } from '../../hooks/useSet';
import { StrengthExercise, StrengthSet } from '@peakhealth/routines-types';

// Mock the useSet hook
vi.mock('../../hooks/useSet', () => ({
  useSet: vi.fn(),
}));

describe('SetRow', () => {
  // Mock data
  const mockSet: StrengthSet = {
    _id: 'set-1',
    setNumber: 1,
    setType: 'working',
    repType: 'fixed',
    reps: 10,
    weight: 100,
    rpe: 8,
  };

  const mockExercise: StrengthExercise = {
    _id: 'exercise-1',
    exerciseId: 'db-exercise-1',
    exerciseVariantId: 'variant-1',
    orderIndex: 0,
    type: 'strength',
    sets: [mockSet],
  };

  const mockUpdateSet = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useSet as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      set: mockSet,
      updateSet: mockUpdateSet,
    });
  });

  it('renders standard set row correctly', () => {
    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    // Check if set number is displayed
    expect(screen.getByText('Set 1')).toBeInTheDocument();
    
    // Check if set type dropdown is displayed with correct value
    expect(screen.getByRole('combobox')).toHaveValue('working');
    
    // Check if reps input is displayed with correct value
    expect(screen.getByLabelText('Reps')).toHaveValue(10);
    
    // Check if weight input is displayed with correct value
    expect(screen.getByLabelText('Weight')).toHaveValue(100);
    
    // Check if RPE input is displayed with correct value
    expect(screen.getByLabelText('RPE')).toHaveValue(8);
  });

  it('renders dual progression inputs when exercise has dual-linear progression method', () => {
    const dualProgressionExercise = {
      ...mockExercise,
      progressionMethod: 'dual-linear',
    };
    
    const dualProgressionSet = {
      ...mockSet,
      repsMin: 8,
      repsMax: 12,
    };
    
    (useSet as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      set: dualProgressionSet,
      updateSet: mockUpdateSet,
    });

    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={dualProgressionExercise as StrengthExercise}
      />
    );

    // Check if min reps input is displayed with correct value
    expect(screen.getByLabelText('Min')).toHaveValue(8);
    
    // Check if max reps input is displayed with correct value
    expect(screen.getByLabelText('Max')).toHaveValue(12);
  });

  it('renders time input for timed sets', () => {
    const timedSet = {
      ...mockSet,
      repType: 'time',
      duration: 60,
      reps: undefined,
    };
    
    (useSet as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      set: timedSet,
      updateSet: mockUpdateSet,
    });

    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    // Check if time input is displayed with correct value
    expect(screen.getByLabelText('Time (sec)')).toHaveValue(60);
    
    // Check that reps input is not displayed
    expect(screen.queryByLabelText('Reps')).not.toBeInTheDocument();
  });

  it('hides reps input for failure sets', () => {
    const failureSet = {
      ...mockSet,
      setType: 'failure',
      reps: undefined,
    };
    
    (useSet as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      set: failureSet,
      updateSet: mockUpdateSet,
    });

    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );
    
    // Check that reps input is not displayed
    expect(screen.queryByLabelText('Reps')).not.toBeInTheDocument();
  });

  it('displays side label for unilateral exercises in sequential mode', () => {
    const unilateralExercise = {
      ...mockExercise,
      unilateralMode: 'sequential',
    };

    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={unilateralExercise as StrengthExercise}
        side="left"
      />
    );

    // Check if side label is displayed
    expect(screen.getByText('(Left)')).toBeInTheDocument();
  });

  it('updates set type when dropdown changes', () => {
    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    // Change set type to failure
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'failure' } });
    
    // Check if updateSet was called with correct value
    expect(mockUpdateSet).toHaveBeenCalledWith({ setType: 'failure' });
    expect(mockUpdateSet).toHaveBeenCalledWith({ 
      reps: undefined, 
      repsMin: undefined, 
      repsMax: undefined 
    });
  });

  it('updates set values on blur', () => {
    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    // Change reps input value
    const repsInput = screen.getByLabelText('Reps');
    fireEvent.change(repsInput, { target: { value: '12' } });
    fireEvent.blur(repsInput);
    
    // Check if updateSet was called with correct value
    expect(mockUpdateSet).toHaveBeenCalledWith({ reps: 12 });
  });

  it('renders error message when set is not found', () => {
    (useSet as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      set: undefined,
      updateSet: mockUpdateSet,
    });

    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    // Check if error message is displayed
    expect(screen.getByText('Set not found')).toBeInTheDocument();
  });
});

