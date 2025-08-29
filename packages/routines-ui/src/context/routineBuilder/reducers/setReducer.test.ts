import { describe, it, expect } from 'vitest';
import { addSet, removeSet, updateSet, reorderSets } from './setReducer';
import { RoutineBuilderState } from '../types';
import {
  WorkoutSet,
  StrengthExercise,
  BasicSection,
  Workout,
} from '@peakhealth/routines-types';

describe('setReducer', () => {
  it('should export all required functions', () => {
    expect(typeof addSet).toBe('function');
    expect(typeof removeSet).toBe('function');
    expect(typeof updateSet).toBe('function');
    expect(typeof reorderSets).toBe('function');
  });

  describe('reorderSets', () => {
    const createMockState = (): RoutineBuilderState => ({
      _id: 'routine-1',
      name: 'Test Routine',
      description: 'Test description',
      workouts: [
        {
          _id: 'workout-1',
          name: 'Workout 1',
          type: 'strength',
          orderIndex: 0,
          sections: [
            {
              _id: 'section-1',
              name: 'Section 1',
              type: 'basic',
              orderIndex: 0,
              exercises: [
                {
                  _id: 'exercise-1',
                  exerciseId: 'exercise-1',
                  exerciseVariantId: 'variant-1',
                  type: 'strength',
                  orderIndex: 0,
                  sets: [
                    {
                      _id: 'set-1',
                      setNumber: 1,
                      setType: 'working',
                      repType: 'fixed',
                      reps: 10,
                      weight: 100,
                    } as WorkoutSet,
                    {
                      _id: 'set-2',
                      setNumber: 2,
                      setType: 'working',
                      repType: 'fixed',
                      reps: 10,
                      weight: 100,
                    } as WorkoutSet,
                  ],
                } as StrengthExercise,
              ],
            } as BasicSection,
          ],
        } as Workout,
      ],
      userId: 'user-1',
      createdBy: 'user-1',
      routineType: 'user-created',
      isActive: false,
      isFavorite: false,
      completedWorkouts: 0,
      totalWorkouts: 1,
      schemaVersion: '1.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      difficulty: 'beginner',
      duration: 4,
      goal: 'strength',
      objectives: [],
    });

    it('should reorder sets correctly', () => {
      const initialState = createMockState();
      const newOrder = ['set-2', 'set-1'];

      const result = reorderSets(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setIds: newOrder,
      });

      const exercise = result.workouts[0].sections[0]
        .exercises[0] as StrengthExercise;
      const sets = exercise.sets;

      expect(sets[0]._id).toBe('set-2');
      expect(sets[0].setNumber).toBe(1);
      expect(sets[1]._id).toBe('set-1');
      expect(sets[1].setNumber).toBe(2);
    });

    it('should handle reordering with non-existent IDs without creating gaps', () => {
      const initialState = createMockState();
      const newOrder = ['set-1', 'non-existent-id'];

      const result = reorderSets(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setIds: newOrder,
      });

      const exercise = result.workouts[0].sections[0]
        .exercises[0] as StrengthExercise;
      const sets = exercise.sets;

      // Should only have 1 set (non-existent one filtered out)
      expect(sets).toHaveLength(1);

      // Should have consecutive setNumber values
      expect(sets[0]._id).toBe('set-1');
      expect(sets[0].setNumber).toBe(1);
    });

    it('should handle empty setIds array', () => {
      const initialState = createMockState();

      const result = reorderSets(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setIds: [],
      });

      const exercise = result.workouts[0].sections[0]
        .exercises[0] as StrengthExercise;
      const sets = exercise.sets;
      expect(sets).toHaveLength(0);
    });

    it('should handle all non-existent IDs', () => {
      const initialState = createMockState();
      const newOrder = ['non-existent-1', 'non-existent-2'];

      const result = reorderSets(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setIds: newOrder,
      });

      const exercise = result.workouts[0].sections[0]
        .exercises[0] as StrengthExercise;
      const sets = exercise.sets;
      expect(sets).toHaveLength(0);
    });
  });

  describe('addSet', () => {
    const createMockState = (): RoutineBuilderState => ({
      _id: 'routine-1',
      name: 'Test Routine',
      description: 'Test description',
      workouts: [
        {
          _id: 'workout-1',
          name: 'Workout 1',
          type: 'strength',
          orderIndex: 0,
          sections: [
            {
              _id: 'section-1',
              name: 'Section 1',
              type: 'basic',
              orderIndex: 0,
              exercises: [
                {
                  _id: 'exercise-1',
                  exerciseId: 'exercise-1',
                  exerciseVariantId: 'variant-1',
                  type: 'strength',
                  orderIndex: 0,
                  sets: [
                    {
                      _id: 'set-1',
                      setNumber: 1,
                      setType: 'working',
                      repType: 'fixed',
                      reps: 10,
                      weight: 100,
                    } as WorkoutSet,
                  ],
                } as StrengthExercise,
              ],
            } as BasicSection,
          ],
        } as Workout,
      ],
      userId: 'user-1',
      createdBy: 'user-1',
      routineType: 'user-created',
      isActive: false,
      isFavorite: false,
      completedWorkouts: 0,
      totalWorkouts: 1,
      schemaVersion: '1.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      difficulty: 'beginner',
      duration: 4,
      goal: 'strength',
      objectives: [],
    });

    it('should add a set with correct setNumber', () => {
      const initialState = createMockState();
      const newSet: WorkoutSet = {
        _id: 'set-2',
        setNumber: 0, // This should be overridden
        setType: 'working',
        repType: 'fixed',
        reps: 12,
        weight: 150,
      } as WorkoutSet;

      const result = addSet(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        set: newSet,
      });

      const exercise = result.workouts[0].sections[0]
        .exercises[0] as StrengthExercise;
      const sets = exercise.sets;

      expect(sets).toHaveLength(2);
      expect(sets[1]._id).toBe('set-2');
      expect(sets[1].setNumber).toBe(2); // Should be set to the next number
      expect(sets[1].reps).toBe(12);
      expect(sets[1].weight).toBe(150);
    });
  });

  describe('removeSet', () => {
    const createMockState = (): RoutineBuilderState => ({
      _id: 'routine-1',
      name: 'Test Routine',
      description: 'Test description',
      workouts: [
        {
          _id: 'workout-1',
          name: 'Workout 1',
          type: 'strength',
          orderIndex: 0,
          sections: [
            {
              _id: 'section-1',
              name: 'Section 1',
              type: 'basic',
              orderIndex: 0,
              exercises: [
                {
                  _id: 'exercise-1',
                  exerciseId: 'exercise-1',
                  exerciseVariantId: 'variant-1',
                  type: 'strength',
                  orderIndex: 0,
                  sets: [
                    {
                      _id: 'set-1',
                      setNumber: 1,
                      setType: 'working',
                      repType: 'fixed',
                      reps: 10,
                      weight: 100,
                    } as WorkoutSet,
                    {
                      _id: 'set-2',
                      setNumber: 2,
                      setType: 'working',
                      repType: 'fixed',
                      reps: 10,
                      weight: 100,
                    } as WorkoutSet,
                    {
                      _id: 'set-3',
                      setNumber: 3,
                      setType: 'working',
                      repType: 'fixed',
                      reps: 10,
                      weight: 100,
                    } as WorkoutSet,
                  ],
                } as StrengthExercise,
              ],
            } as BasicSection,
          ],
        } as Workout,
      ],
      userId: 'user-1',
      createdBy: 'user-1',
      routineType: 'user-created',
      isActive: false,
      isFavorite: false,
      completedWorkouts: 0,
      totalWorkouts: 1,
      schemaVersion: '1.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      difficulty: 'beginner',
      duration: 4,
      goal: 'strength',
      objectives: [],
    });

    it('should remove a set and reorder remaining sets', () => {
      const initialState = createMockState();

      const result = removeSet(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setId: 'set-2',
      });

      const exercise = result.workouts[0].sections[0]
        .exercises[0] as StrengthExercise;
      const sets = exercise.sets;

      expect(sets).toHaveLength(2);
      expect(sets[0]._id).toBe('set-1');
      expect(sets[0].setNumber).toBe(1);
      expect(sets[1]._id).toBe('set-3');
      expect(sets[1].setNumber).toBe(2); // Should be reordered
    });
  });

  describe('updateSet', () => {
    const createMockState = (): RoutineBuilderState => ({
      _id: 'routine-1',
      name: 'Test Routine',
      description: 'Test description',
      workouts: [
        {
          _id: 'workout-1',
          name: 'Workout 1',
          type: 'strength',
          orderIndex: 0,
          sections: [
            {
              _id: 'section-1',
              name: 'Section 1',
              type: 'basic',
              orderIndex: 0,
              exercises: [
                {
                  _id: 'exercise-1',
                  exerciseId: 'exercise-1',
                  exerciseVariantId: 'variant-1',
                  type: 'strength',
                  orderIndex: 0,
                  sets: [
                    {
                      _id: 'set-1',
                      setNumber: 1,
                      setType: 'working',
                      repType: 'fixed',
                      reps: 10,
                      weight: 100,
                    } as WorkoutSet,
                    {
                      _id: 'set-2',
                      setNumber: 2,
                      setType: 'working',
                      repType: 'fixed',
                      reps: 10,
                      weight: 100,
                    } as WorkoutSet,
                  ],
                } as StrengthExercise,
              ],
            } as BasicSection,
          ],
        } as Workout,
      ],
      userId: 'user-1',
      createdBy: 'user-1',
      routineType: 'user-created',
      isActive: false,
      isFavorite: false,
      completedWorkouts: 0,
      totalWorkouts: 1,
      schemaVersion: '1.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      difficulty: 'beginner',
      duration: 4,
      goal: 'strength',
      objectives: [],
    });

    it('should update a set with new values', () => {
      const initialState = createMockState();

      const result = updateSet(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setId: 'set-1',
        updates: {
          reps: 15,
        },
      });

      const exercise = result.workouts[0].sections[0]
        .exercises[0] as StrengthExercise;
      const sets = exercise.sets;

      expect(sets[0]._id).toBe('set-1');
      expect(sets[0].reps).toBe(15);
      expect(sets[0].weight).toBe(100); // Should remain unchanged
      expect(sets[0].setNumber).toBe(1); // Should remain unchanged
      expect(sets[1]._id).toBe('set-2'); // Should remain unchanged
      expect(sets[1].reps).toBe(10);
    });
  });
});
