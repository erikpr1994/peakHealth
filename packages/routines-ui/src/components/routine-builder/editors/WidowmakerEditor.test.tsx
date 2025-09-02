import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { WidowmakerEditor } from './WidowmakerEditor';
import { RoutineBuilderProvider } from '../../../context/routineBuilder/RoutineBuilderContext';
import type { RoutineBuilderState } from '../../../context/routineBuilder/types';

// Mock the useExercise hook
const mockUseExercise = vi.hoisted(() => vi.fn());

vi.mock('../../../hooks/useExercise', () => ({
  useExercise: mockUseExercise,
}));

describe('WidowmakerEditor', () => {
  const mockState: RoutineBuilderState = {
    _id: 'routine-1',
    name: 'Test Routine',
    description: 'Test routine description',
    difficulty: 'intermediate',
    goal: 'strength',
    duration: 4,
    objectives: ['Build strength', 'Improve form'],
    workouts: [
      {
        _id: 'workout-1',
        name: 'Test Workout',
        type: 'strength',
        orderIndex: 0,
        sections: [
          {
            _id: 'section-1',
            name: 'Test Section',
            orderIndex: 0,
            type: 'basic',
            exercises: [
              {
                _id: 'exercise-1',
                exerciseId: 'exercise-1',
                exerciseVariantId: 'variant-1',
                orderIndex: 0,
                type: 'strength',
                progressionMethod: 'widowmaker',
                unilateralMode: undefined,
                sets: [
                  {
                    _id: 'set-1',
                    setNumber: 1,
                    setType: 'working',
                    repType: 'fixed',
                    reps: 20,
                    notes: 'Widowmaker set',
                    restAfter: '0s',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    schemaVersion: '1.0.0',
    userId: 'user-1',
    createdBy: 'user-1',
    routineType: 'user-created',
    isActive: true,
    isFavorite: false,
    completedWorkouts: 0,
    totalWorkouts: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockContextValue = {
    state: mockState,
    dispatch: vi.fn(),
  };

  const defaultProps = {
    exerciseId: 'exercise-1',
    workoutId: 'workout-1',
    sectionId: 'section-1',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseExercise.mockReturnValue({
      exercise: mockState.workouts[0].sections[0].exercises[0],
      setIds: ['set-1'],
      addSet: vi.fn(),
      removeSet: vi.fn(),
    });
  });

  it('renders the component with default target reps', () => {
    render(
      <RoutineBuilderProvider value={mockContextValue}>
        <WidowmakerEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    expect(screen.getByText('Target Reps:')).toBeDefined();
    expect(screen.getByDisplayValue('20')).toBeDefined();
    expect(
      screen.getByText('Widowmaker: Single high-rep set targeting 20 reps')
    ).toBeDefined();
  });

  it('initializes target reps from existing sets', () => {
    const mockExercise = {
      ...mockState.workouts[0].sections[0].exercises[0],
      sets: [
        {
          _id: 'set-1',
          setNumber: 1,
          setType: 'working',
          repType: 'fixed',
          reps: 25,
          notes: 'Widowmaker set',
          restAfter: '0s',
        },
      ],
    };

    mockUseExercise.mockReturnValue({
      exercise: mockExercise,
      setIds: ['set-1'],
      addSet: vi.fn(),
      removeSet: vi.fn(),
    });

    render(
      <RoutineBuilderProvider value={mockContextValue}>
        <WidowmakerEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    expect(screen.getByDisplayValue('25')).toBeDefined();
  });

  it('allows temporary invalid input without immediate validation', () => {
    render(
      <RoutineBuilderProvider value={mockContextValue}>
        <WidowmakerEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    const input = screen.getByDisplayValue('20') as HTMLInputElement;

    // Allow invalid input temporarily
    fireEvent.change(input, { target: { value: '0' } });
    expect(input.value).toBe('0');

    fireEvent.change(input, { target: { value: '-5' } });
    expect(input.value).toBe('-5');

    // HTML number inputs don't allow non-numeric characters, so test with empty string
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');

    // Test with another invalid number
    fireEvent.change(input, { target: { value: '0' } });
    expect(input.value).toBe('0');
  });

  it('updates input value when typing valid numbers', () => {
    render(
      <RoutineBuilderProvider value={mockContextValue}>
        <WidowmakerEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    const input = screen.getByDisplayValue('20') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '30' } });
    expect(input.value).toBe('30');

    fireEvent.change(input, { target: { value: '15' } });
    expect(input.value).toBe('15');
  });

  it('validates input on blur and creates set with valid values', () => {
    const mockAddSet = vi.fn();
    const mockRemoveSet = vi.fn();

    mockUseExercise.mockReturnValue({
      exercise: mockState.workouts[0].sections[0].exercises[0],
      setIds: ['set-1'],
      addSet: mockAddSet,
      removeSet: mockRemoveSet,
    });

    render(
      <RoutineBuilderProvider value={mockContextValue}>
        <WidowmakerEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    const input = screen.getByDisplayValue('20');

    // Change to valid value and blur
    fireEvent.change(input, { target: { value: '30' } });
    fireEvent.blur(input);

    expect(mockRemoveSet).toHaveBeenCalledWith('set-1');
    expect(mockAddSet).toHaveBeenCalledWith(
      expect.objectContaining({
        setNumber: 1,
        setType: 'working',
        repType: 'fixed',
        reps: 30,
        notes: 'Widowmaker set',
        restAfter: '0s',
      })
    );
  });

  it('resets invalid input to last valid value on blur', () => {
    render(
      <RoutineBuilderProvider value={mockContextValue}>
        <WidowmakerEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    const input = screen.getByDisplayValue('20') as HTMLInputElement;

    // Set invalid input
    fireEvent.change(input, { target: { value: '0' } });
    expect(input.value).toBe('0');

    // Blur should reset to last valid value
    fireEvent.blur(input);
    expect(input.value).toBe('20');
  });

  it('does not create set when input is invalid on blur', () => {
    const mockAddSet = vi.fn();
    const mockRemoveSet = vi.fn();

    mockUseExercise.mockReturnValue({
      exercise: mockState.workouts[0].sections[0].exercises[0],
      setIds: ['set-1'],
      addSet: mockAddSet,
      removeSet: mockRemoveSet,
    });

    render(
      <RoutineBuilderProvider value={mockContextValue}>
        <WidowmakerEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    const input = screen.getByDisplayValue('20');

    // Set invalid input and blur
    fireEvent.change(input, { target: { value: '-5' } });
    fireEvent.blur(input);

    // Should not call addSet or removeSet with invalid input
    expect(mockRemoveSet).not.toHaveBeenCalled();
    expect(mockAddSet).not.toHaveBeenCalled();
  });

  it('handles empty setIds gracefully', () => {
    mockUseExercise.mockReturnValue({
      exercise: mockState.workouts[0].sections[0].exercises[0],
      setIds: [],
      addSet: vi.fn(),
      removeSet: vi.fn(),
    });

    render(
      <RoutineBuilderProvider value={mockContextValue}>
        <WidowmakerEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    const input = screen.getByDisplayValue('20');

    // Change to valid value and blur
    fireEvent.change(input, { target: { value: '25' } });
    fireEvent.blur(input);

    // Should not call removeSet when there are no sets
    expect(
      screen.getByText('Widowmaker: Single high-rep set targeting 25 reps')
    ).toBeDefined();
  });

  it('synchronizes input value and targetReps state correctly', () => {
    render(
      <RoutineBuilderProvider value={mockContextValue}>
        <WidowmakerEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    const input = screen.getByDisplayValue('20') as HTMLInputElement;

    // Change input value
    fireEvent.change(input, { target: { value: '35' } });
    expect(input.value).toBe('35');

    // Blur to validate and update state
    fireEvent.blur(input);

    // The display should now show the updated target reps
    expect(
      screen.getByText('Widowmaker: Single high-rep set targeting 35 reps')
    ).toBeDefined();
  });
});
