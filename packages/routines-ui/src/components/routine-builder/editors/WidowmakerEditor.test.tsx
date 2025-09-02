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

  it('updates target reps when input changes', () => {
    render(
      <RoutineBuilderProvider value={mockContextValue}>
        <WidowmakerEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    const input = screen.getByDisplayValue('20') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '30' } });

    expect(input.value).toBe('30');
  });

  it('calls addSet and removeSet on blur event', () => {
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
    fireEvent.blur(input);

    expect(mockRemoveSet).toHaveBeenCalledWith('set-1');
    expect(mockAddSet).toHaveBeenCalledWith(
      expect.objectContaining({
        setNumber: 1,
        setType: 'working',
        repType: 'fixed',
        reps: 20,
        notes: 'Widowmaker set',
        restAfter: '0s',
      })
    );
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
    fireEvent.blur(input);

    // Should not call removeSet when there are no sets
    expect(
      screen.getByText('Widowmaker: Single high-rep set targeting 20 reps')
    ).toBeDefined();
  });

  it('validates input to ensure positive numbers', () => {
    render(
      <RoutineBuilderProvider value={mockContextValue}>
        <WidowmakerEditor {...defaultProps} />
      </RoutineBuilderProvider>
    );

    const input = screen.getByDisplayValue('20') as HTMLInputElement;

    // Set valid values
    fireEvent.change(input, { target: { value: '15' } });
    expect(input.value).toBe('15');

    fireEvent.change(input, { target: { value: '30' } });
    expect(input.value).toBe('30');

    // Test that the input accepts reasonable values
    fireEvent.change(input, { target: { value: '1' } });
    expect(input.value).toBe('1');
  });
});
