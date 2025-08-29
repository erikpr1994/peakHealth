import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RoutineBuilderExample } from './RoutineBuilderExample';
import { RoutineBuilderProvider } from '../context/routineBuilder/RoutineBuilderContext';
import { useRoutineBuilder } from '../hooks/useRoutineBuilder';
import { UserCreatedRoutine } from '@peakhealth/routines-types';

// Mock wrapper component to provide context
const MockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: UserCreatedRoutine = {
    _id: 'test-routine',
    name: 'Test Routine',
    description: 'A test routine',
    workouts: [],
    userId: 'user1',
    createdBy: 'user1',
    routineType: 'user-created',
    isActive: false,
    isFavorite: false,
    completedWorkouts: 0,
    totalWorkouts: 0,
    schemaVersion: '1.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    difficulty: 'beginner',
    duration: 4,
    goal: 'strength',
    objectives: [],
  } as UserCreatedRoutine;

  const { state, dispatch } = useRoutineBuilder(initialState);

  return (
    <RoutineBuilderProvider value={{ state, dispatch }}>
      {children}
    </RoutineBuilderProvider>
  );
};

describe('RoutineBuilderExample', () => {
  test('should render routine name and allow editing', () => {
    render(
      <MockProvider>
        <RoutineBuilderExample />
      </MockProvider>
    );

    expect(screen.getByText('Routine: Test Routine')).toBeInTheDocument();
    
    const nameInput = screen.getByDisplayValue('Test Routine');
    expect(nameInput).toBeInTheDocument();
  });

  test('should show add workout button and total count', () => {
    render(
      <MockProvider>
        <RoutineBuilderExample />
      </MockProvider>
    );

    expect(screen.getByText('Add Workout')).toBeInTheDocument();
    expect(screen.getByText('Total Workouts: 0')).toBeInTheDocument();
  });

  test('should show message when no workouts exist', () => {
    render(
      <MockProvider>
        <RoutineBuilderExample />
      </MockProvider>
    );

    expect(screen.getByText('No workouts yet. Click "Add Workout" to get started!')).toBeInTheDocument();
  });

  test('should add workout when button is clicked', () => {
    render(
      <MockProvider>
        <RoutineBuilderExample />
      </MockProvider>
    );

    const addButton = screen.getByText('Add Workout');
    fireEvent.click(addButton);

    expect(screen.getByText('Total Workouts: 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Workout 1')).toBeInTheDocument();
  });

  test('should allow editing workout name', () => {
    render(
      <MockProvider>
        <RoutineBuilderExample />
      </MockProvider>
    );

    // Add a workout first
    const addButton = screen.getByText('Add Workout');
    fireEvent.click(addButton);

    // Find and edit the workout name
    const workoutNameInput = screen.getByDisplayValue('Workout 1');
    fireEvent.change(workoutNameInput, { target: { value: 'Updated Workout Name' } });

    expect(screen.getByDisplayValue('Updated Workout Name')).toBeInTheDocument();
  });

  test('should show workout type', () => {
    render(
      <MockProvider>
        <RoutineBuilderExample />
      </MockProvider>
    );

    // Add a workout first
    const addButton = screen.getByText('Add Workout');
    fireEvent.click(addButton);

    expect(screen.getByText('Type: strength')).toBeInTheDocument();
  });

  test('should show remove button for each workout', () => {
    render(
      <MockProvider>
        <RoutineBuilderExample />
      </MockProvider>
    );

    // Add a workout first
    const addButton = screen.getByText('Add Workout');
    fireEvent.click(addButton);

    expect(screen.getByText('Remove')).toBeInTheDocument();
  });
});
