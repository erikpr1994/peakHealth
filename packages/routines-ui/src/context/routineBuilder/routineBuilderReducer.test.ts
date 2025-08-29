import { describe, expect, test } from 'vitest';
import { routineBuilderReducer } from './routineBuilderReducer';
import { RoutineBuilderState, UpdateRoutineNameAction } from './types';
import { UserCreatedRoutine } from '@peakhealth/routines-types';

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

describe('routineBuilderReducer', () => {
  test('should update routine name on UPDATE_ROUTINE_NAME action', () => {
    const action: UpdateRoutineNameAction = {
      type: 'UPDATE_ROUTINE_NAME',
      payload: { name: 'New Name' },
    };
    const newState = routineBuilderReducer(mockState, action);
    expect(newState.name).toBe('New Name');
  });

  test('should return current state for unknown actions', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    const newState = routineBuilderReducer(mockState, action);
    expect(newState).toBe(mockState);
  });
});
