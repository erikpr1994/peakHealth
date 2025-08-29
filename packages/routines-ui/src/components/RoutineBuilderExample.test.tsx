import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RoutineBuilderExample } from './RoutineBuilderExample';
import { RoutineBuilderProvider } from '../context/routineBuilder/RoutineBuilderContext';
import { useRoutineBuilder } from '../hooks/useRoutineBuilder';
import { UserCreatedRoutine } from '@peakhealth/routines-types';

// Mock wrapper component to provide context
const MockProvider: React.FC<{ 
  initialState: UserCreatedRoutine;
  children: React.ReactNode;
}> = ({
  initialState,
  children,
}) => {
  const { state, dispatch } = useRoutineBuilder(initialState);

  return (
    <RoutineBuilderProvider value={{ state, dispatch }}>
      {children}
    </RoutineBuilderProvider>
  );
};

describe('RoutineBuilderExample', () => {
  const mockInitialState: UserCreatedRoutine = {
    _id: 'routine-1',
    name: 'Test Routine',
    description: 'A test routine',
    difficulty: 'beginner',
    workouts: [],
    totalWorkouts: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user-1',
    createdBy: 'user-1',
    routineType: 'user-created',
    isActive: false,
    isFavorite: false,
    completedWorkouts: 0,
    schemaVersion: '1.0',
    duration: 4,
    goal: 'strength',
    objectives: [],
  };

  it('renders the routine builder with initial state', () => {
    render(
      <MockProvider initialState={mockInitialState}>
        <RoutineBuilderExample />
      </MockProvider>
    );

    expect(screen.getByText('Routine: Test Routine')).toBeDefined();
    expect(screen.getByDisplayValue('Test Routine')).toBeDefined();
  });

  it('allows updating routine name', () => {
    render(
      <MockProvider initialState={mockInitialState}>
        <RoutineBuilderExample />
      </MockProvider>
    );

    const nameInput = screen.getByDisplayValue('Test Routine');
    expect(nameInput).toBeDefined();

    fireEvent.change(nameInput, { target: { value: 'Updated Routine' } });

    expect(screen.getByDisplayValue('Updated Routine')).toBeDefined();
  });

  it('allows adding a workout', () => {
    render(
      <MockProvider initialState={mockInitialState}>
        <RoutineBuilderExample />
      </MockProvider>
    );

    expect(screen.getByText('Add Workout')).toBeDefined();
    expect(screen.getByText('Total Workouts: 0')).toBeDefined();

    const addWorkoutButton = screen.getByText('Add Workout');
    fireEvent.click(addWorkoutButton);

    expect(
      screen.getByText('Workout 1')
    ).toBeDefined();

    expect(screen.getByText('Total Workouts: 1')).toBeDefined();
    expect(screen.getByDisplayValue('Workout 1')).toBeDefined();
  });

  it('allows updating workout name', () => {
    const initialStateWithWorkout: UserCreatedRoutine = {
      ...mockInitialState,
      workouts: [
        {
          _id: 'workout-1',
          name: 'Workout 1',
          type: 'strength',
          orderIndex: 0,
          sections: [],
          objective: 'Build strength',
          notes: 'Test workout',
        },
      ],
      totalWorkouts: 1,
    };

    render(
      <MockProvider initialState={initialStateWithWorkout}>
        <RoutineBuilderExample />
      </MockProvider>
    );

    const workoutNameInput = screen.getByDisplayValue('Workout 1');
    fireEvent.change(workoutNameInput, { target: { value: 'Updated Workout' } });

    expect(screen.getByDisplayValue('Updated Workout')).toBeDefined();
  });

  it('displays workout details correctly', () => {
    const initialStateWithWorkout: UserCreatedRoutine = {
      ...mockInitialState,
      workouts: [
        {
          _id: 'workout-1',
          name: 'Workout 1',
          type: 'strength',
          orderIndex: 0,
          sections: [],
          objective: 'Build strength',
          notes: 'Test workout',
        },
      ],
      totalWorkouts: 1,
    };

    render(
      <MockProvider initialState={initialStateWithWorkout}>
        <RoutineBuilderExample />
      </MockProvider>
    );

    expect(screen.getByText('Type: strength')).toBeDefined();
    expect(screen.getByText('Objective: Build strength')).toBeDefined();
    expect(screen.getByText('Notes: Test workout')).toBeDefined();
  });

  it('allows removing a workout', () => {
    const initialStateWithWorkout: UserCreatedRoutine = {
      ...mockInitialState,
      workouts: [
        {
          _id: 'workout-1',
          name: 'Workout 1',
          type: 'strength',
          orderIndex: 0,
          sections: [],
          objective: 'Build strength',
          notes: 'Test workout',
        },
      ],
      totalWorkouts: 1,
    };

    render(
      <MockProvider initialState={initialStateWithWorkout}>
        <RoutineBuilderExample />
      </MockProvider>
    );

    expect(screen.getByText('Remove')).toBeDefined();

    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    expect(screen.getByText('Total Workouts: 0')).toBeDefined();
  });
});
