import { describe, expect, test } from 'vitest';
import { updateRoutineName } from './routineReducer';
import { RoutineBuilderState } from '../types';
import { UserCreatedRoutine } from '@peakhealth/routines-types';

const mockState: RoutineBuilderState = {
  _id: 'routine1',
  name: 'Initial Routine',
  description: 'A test routine',
  workouts: [],
  // Add other required properties from UserCreatedRoutine
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

describe('routineReducer', () => {
  test('updateRoutineName should update the routine name', () => {
    const newName = 'Updated Routine Name';
    const updatedState = updateRoutineName(mockState, { name: newName });
    expect(updatedState.name).toBe(newName);
    expect(updatedState).not.toBe(mockState); // Ensure immutability
  });
});
