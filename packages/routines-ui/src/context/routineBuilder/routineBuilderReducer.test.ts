import { describe, expect, test } from 'vitest';
import { routineBuilderReducer } from './routineBuilderReducer';
import {
  RoutineBuilderState,
  UpdateRoutineNameAction,
  AddWorkoutAction,
  RemoveWorkoutAction,
  UpdateWorkoutAction,
} from './types';
import { UserCreatedRoutine, Workout } from '@peakhealth/routines-types';

const mockState: RoutineBuilderState = {
  _id: 'routine1',
  name: 'Initial Routine',
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

const mockWorkout: Workout = {
  _id: 'workout1',
  name: 'Test Workout',
  type: 'strength',
  orderIndex: 0,
  sections: [],
} as Workout;

describe('routineBuilderReducer', () => {
  test('should update routine name on UPDATE_ROUTINE_NAME action', () => {
    const action: UpdateRoutineNameAction = {
      type: 'UPDATE_ROUTINE_NAME',
      payload: { name: 'New Name' },
    };
    const newState = routineBuilderReducer(mockState, action);
    expect(newState.name).toBe('New Name');
  });

  test('should add workout on ADD_WORKOUT action', () => {
    const action: AddWorkoutAction = {
      type: 'ADD_WORKOUT',
      payload: { workout: mockWorkout },
    };
    const newState = routineBuilderReducer(mockState, action);
    expect(newState.workouts).toHaveLength(1);
    expect(newState.workouts[0]).toEqual({
      ...mockWorkout,
      orderIndex: 0,
    });
    expect(newState.totalWorkouts).toBe(1);
  });

  test('should remove workout on REMOVE_WORKOUT action', () => {
    const stateWithWorkout = {
      ...mockState,
      workouts: [mockWorkout],
      totalWorkouts: 1,
    };

    const action: RemoveWorkoutAction = {
      type: 'REMOVE_WORKOUT',
      payload: { workoutId: 'workout1' },
    };
    const newState = routineBuilderReducer(stateWithWorkout, action);
    expect(newState.workouts).toHaveLength(0);
    expect(newState.totalWorkouts).toBe(0);
  });

  test('should update workout on UPDATE_WORKOUT action', () => {
    const stateWithWorkout = {
      ...mockState,
      workouts: [mockWorkout],
      totalWorkouts: 1,
    };

    const action: UpdateWorkoutAction = {
      type: 'UPDATE_WORKOUT',
      payload: {
        workoutId: 'workout1',
        updates: { name: 'Updated Workout Name' },
      },
    };
    const newState = routineBuilderReducer(stateWithWorkout, action);
    expect(newState.workouts).toHaveLength(1);
    expect(newState.workouts[0].name).toBe('Updated Workout Name');
    expect(newState.workouts[0]._id).toBe('workout1'); // Should preserve _id
  });

  test('should return current state for unknown actions', () => {
    const action = { type: 'UNKNOWN_ACTION' } as never;
    const newState = routineBuilderReducer(mockState, action);
    expect(newState).toBe(mockState);
  });
});
