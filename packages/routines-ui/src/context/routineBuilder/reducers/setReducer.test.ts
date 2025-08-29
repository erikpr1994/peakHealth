import { describe, it, expect } from 'vitest';
import { addSet, removeSet, updateSet, reorderSets } from './setReducer';
import { RoutineBuilderState } from '../types';
import {
  WorkoutSet,
  Exercise,
  BasicSection,
  Workout,
  StrengthExercise,
} from '@peakhealth/routines-types';

describe('setReducer', () => {
  it('should export all required functions', () => {
    expect(typeof addSet).toBe('function');
    expect(typeof removeSet).toBe('function');
    expect(typeof updateSet).toBe('function');
    expect(typeof reorderSets).toBe('function');
  });

  describe('reorderSets', () => {
    // Helper function to get exercise with proper typing
    const getExercise = (result: RoutineBuilderState): StrengthExercise => {
      return result.workouts[0].sections[0].exercises[0] as StrengthExercise;
    };

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

    it('should reorder sets correctly', () => {
      const initialState = createMockState();
      const newOrder = ['set-3', 'set-1', 'set-2'];

      const result = reorderSets(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setIds: newOrder,
      });

      const exercise = getExercise(result);
      const sets = exercise.sets;
      expect(sets[0]._id).toBe('set-3');
      expect(sets[0].setNumber).toBe(1);
      expect(sets[1]._id).toBe('set-1');
      expect(sets[1].setNumber).toBe(2);
      expect(sets[2]._id).toBe('set-2');
      expect(sets[2].setNumber).toBe(3);
    });

    it('should handle reordering with non-existent IDs without creating gaps', () => {
      const initialState = createMockState();
      const newOrder = ['set-1', 'non-existent-id', 'set-3'];

      const result = reorderSets(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setIds: newOrder,
      });

      const sets = result.workouts[0].sections[0].exercises[0].sets;

      // Should only have 2 sets (non-existent one filtered out)
      expect(sets).toHaveLength(2);

      // Should have consecutive setNumber values
      expect(sets[0]._id).toBe('set-1');
      expect(sets[0].setNumber).toBe(1);
      expect(sets[1]._id).toBe('set-3');
      expect(sets[1].setNumber).toBe(2);
    });

    it('should handle multiple non-existent IDs', () => {
      const initialState = createMockState();
      const newOrder = ['non-existent-1', 'set-2', 'non-existent-2', 'set-1'];

      const result = reorderSets(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setIds: newOrder,
      });

      const sets = result.workouts[0].sections[0].exercises[0].sets;

      // Should only have 2 sets
      expect(sets).toHaveLength(2);

      // Should have consecutive setNumber values
      expect(sets[0]._id).toBe('set-2');
      expect(sets[0].setNumber).toBe(1);
      expect(sets[1]._id).toBe('set-1');
      expect(sets[1].setNumber).toBe(2);
    });

    it('should handle empty setIds array', () => {
      const initialState = createMockState();

      const result = reorderSets(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setIds: [],
      });

      const sets = result.workouts[0].sections[0].exercises[0].sets;
      expect(sets).toHaveLength(0);
    });

    it('should handle all non-existent IDs', () => {
      const initialState = createMockState();
      const newOrder = ['non-existent-1', 'non-existent-2', 'non-existent-3'];

      const result = reorderSets(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setIds: newOrder,
      });

      const sets = result.workouts[0].sections[0].exercises[0].sets;
      expect(sets).toHaveLength(0);
    });

    it('should not modify other exercises', () => {
      const initialState = createMockState();
      // Add another exercise
      initialState.workouts[0].sections[0].exercises.push({
        _id: 'exercise-2',
        exerciseId: 'exercise-2',
        exerciseVariantId: 'variant-2',
        type: 'strength',
        orderIndex: 1,
        sets: [
          {
            _id: 'set-4',
            setNumber: 1,
            setType: 'working',
            repType: 'fixed',
            reps: 10,
            weight: 100,
          } as WorkoutSet,
        ],
      } as Exercise);

      const result = reorderSets(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setIds: ['set-3', 'set-1'],
      });

      // exercise-2 should remain unchanged
      const exercise2 = result.workouts[0].sections[0].exercises.find(
        e => e._id === 'exercise-2'
      );
      expect(exercise2?.sets[0].setNumber).toBe(1);
    });
  });
});
