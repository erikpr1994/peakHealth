import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SetRow } from './SetRow';
import { useSet } from '../../hooks/useSet';
import type { StrengthSet, StrengthExercise } from '@peakhealth/routines-types';

// Mock the useSet hook
vi.mock('../../hooks/useSet', () => ({
  useSet: vi.fn(),
}));

describe('SetRow Component', () => {
  const mockUpdateSet = vi.fn();
  const mockSet: StrengthSet = {
    _id: 'set-1',
    setNumber: 1,
    setType: 'working',
    repType: 'count',
    reps: 10,
    weight: 100,
    rpe: 8,
    restAfter: 60,
  };

  const mockExercise: StrengthExercise = {
    _id: 'exercise-1',
    name: 'Bench Press',
    type: 'strength',
    unilateralMode: 'simultaneous',
    progressionMethod: 'linear',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useSet as any).mockReturnValue({
      set: mockSet,
      updateSet: mockUpdateSet,
    });
  });

  it('renders the set number correctly', () => {
    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    expect(screen.getByText(/Set 1/i)).toBeInTheDocument();
  });

  it('renders the set type dropdown correctly', () => {
    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveValue('working');
  });

  it('calls updateSet when set type is changed', () => {
    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'warmup' } });

    expect(mockUpdateSet).toHaveBeenCalledWith({ setType: 'warmup' });
  });

  it('renders reps input for standard sets', () => {
    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    const repsInput = screen.getByLabelText(/Reps/i);
    expect(repsInput).toBeInTheDocument();
    expect(repsInput).toHaveValue(10);
  });

  it('renders weight input for strength sets', () => {
    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    const weightInput = screen.getByLabelText(/Weight/i);
    expect(weightInput).toBeInTheDocument();
    expect(weightInput).toHaveValue(100);
  });

  it('renders RPE input for strength sets', () => {
    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    const rpeInput = screen.getByLabelText(/RPE/i);
    expect(rpeInput).toBeInTheDocument();
    expect(rpeInput).toHaveValue(8);
  });

  it('updates local state on input change', () => {
    render(
      <SetRow
        workoutId="workout-1"
        sectionId="section-1"
        exerciseId="exercise-1"
        setId="set-1"
        exercise={mockExercise}
      />
    );

    const repsInput = screen.getByLabelText(/Reps/i);
    fireEvent.change(repsInput, { target: { value: '12' } });
    fireEvent.blur(repsInput);

    expect(mockUpdateSet).toHaveBeenCalledWith({ reps: 12 });
  });
});

