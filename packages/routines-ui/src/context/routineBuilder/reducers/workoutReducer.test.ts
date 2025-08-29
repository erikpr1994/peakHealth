import { describe, expect, test } from 'vitest';
import { addWorkout, removeWorkout, updateWorkout } from './workoutReducer';
import { RoutineBuilderState } from '../types';
import { UserCreatedRoutine, Workout } from '@peakhealth/routines-types';

const mockState: RoutineBuilderState = {
  _id: 'routine1',
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

const mockWorkout: Workout = {
  _id: 'workout1',
  name: 'Test Workout',
  type: 'strength',
  orderIndex: 0,
  sections: [],
} as Workout;

describe('workoutReducer', () => {
  test('addWorkout should add a workout to the routine', () => {
    const updatedState = addWorkout(mockState, { workout: mockWorkout });
    
    expect(updatedState.workouts).toHaveLength(1);
    expect(updatedState.workouts[0]).toEqual({
      ...mockWorkout,
      orderIndex: 0,
    });
    expect(updatedState.totalWorkouts).toBe(1);
    expect(updatedState).not.toBe(mockState); // Ensure immutability
  });

  test('addWorkout should increment orderIndex for subsequent workouts', () => {
    const firstWorkout = { ...mockWorkout, _id: 'workout1' };
    const secondWorkout = { ...mockWorkout, _id: 'workout2' };
    
    let state = addWorkout(mockState, { workout: firstWorkout });
    state = addWorkout(state, { workout: secondWorkout });
    
    expect(state.workouts).toHaveLength(2);
    expect(state.workouts[0].orderIndex).toBe(0);
    expect(state.workouts[1].orderIndex).toBe(1);
    expect(state.totalWorkouts).toBe(2);
  });

  test('addWorkout should preserve existing workouts', () => {
    const existingWorkout = { ...mockWorkout, _id: 'existing1', orderIndex: 0 };
    const stateWithExisting = {
      ...mockState,
      workouts: [existingWorkout],
      totalWorkouts: 1,
    };
    
    const newWorkout = { ...mockWorkout, _id: 'new1' };
    const updatedState = addWorkout(stateWithExisting, { workout: newWorkout });
    
    expect(updatedState.workouts).toHaveLength(2);
    expect(updatedState.workouts[0]).toEqual(existingWorkout);
    expect(updatedState.workouts[1]).toEqual({
      ...newWorkout,
      orderIndex: 1,
    });
    expect(updatedState.totalWorkouts).toBe(2);
  });

  test('removeWorkout should remove a workout and reorder remaining', () => {
    const workout1 = { ...mockWorkout, _id: 'workout1', orderIndex: 0 };
    const workout2 = { ...mockWorkout, _id: 'workout2', orderIndex: 1 };
    const workout3 = { ...mockWorkout, _id: 'workout3', orderIndex: 2 };
    
    const stateWithWorkouts = {
      ...mockState,
      workouts: [workout1, workout2, workout3],
      totalWorkouts: 3,
    };
    
    const updatedState = removeWorkout(stateWithWorkouts, { workoutId: 'workout2' });
    
    expect(updatedState.workouts).toHaveLength(2);
    expect(updatedState.workouts[0]._id).toBe('workout1');
    expect(updatedState.workouts[0].orderIndex).toBe(0);
    expect(updatedState.workouts[1]._id).toBe('workout3');
    expect(updatedState.workouts[1].orderIndex).toBe(1);
    expect(updatedState.totalWorkouts).toBe(2);
  });

  test('removeWorkout should handle removing non-existent workout', () => {
    const workout1 = { ...mockWorkout, _id: 'workout1', orderIndex: 0 };
    const stateWithWorkout = {
      ...mockState,
      workouts: [workout1],
      totalWorkouts: 1,
    };
    
    const updatedState = removeWorkout(stateWithWorkout, { workoutId: 'non-existent' });
    
    expect(updatedState.workouts).toHaveLength(1);
    expect(updatedState.workouts[0]).toEqual(workout1);
    expect(updatedState.totalWorkouts).toBe(1);
  });

  test('updateWorkout should update workout properties', () => {
    const workout1 = { ...mockWorkout, _id: 'workout1', name: 'Original Name' };
    const stateWithWorkout = {
      ...mockState,
      workouts: [workout1],
      totalWorkouts: 1,
    };
    
    const updatedState = updateWorkout(stateWithWorkout, {
      workoutId: 'workout1',
      updates: { name: 'Updated Name', notes: 'New notes' },
    });
    
    expect(updatedState.workouts).toHaveLength(1);
    expect(updatedState.workouts[0].name).toBe('Updated Name');
    expect(updatedState.workouts[0].notes).toBe('New notes');
    expect(updatedState.workouts[0]._id).toBe('workout1'); // Should preserve _id
    expect(updatedState.workouts[0].orderIndex).toBe(0); // Should preserve orderIndex
  });

  test('updateWorkout should handle updating non-existent workout', () => {
    const workout1 = { ...mockWorkout, _id: 'workout1', name: 'Original Name' };
    const stateWithWorkout = {
      ...mockState,
      workouts: [workout1],
      totalWorkouts: 1,
    };
    
    const updatedState = updateWorkout(stateWithWorkout, {
      workoutId: 'non-existent',
      updates: { name: 'Updated Name' },
    });
    
    expect(updatedState.workouts).toHaveLength(1);
    expect(updatedState.workouts[0]).toEqual(workout1); // Should remain unchanged
  });
});
