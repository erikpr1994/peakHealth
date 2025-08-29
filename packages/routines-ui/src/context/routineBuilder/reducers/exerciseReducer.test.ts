import { describe, it, expect } from 'vitest';
import {
  addExercise,
  removeExercise,
  updateExercise,
  reorderExercises,
} from './exerciseReducer';
import { RoutineBuilderState } from '../types';
import {
  Exercise,
  StrengthWorkoutSection,
  Workout,
} from '@peakhealth/routines-types';

describe('exerciseReducer', () => {
  it('should export all required functions', () => {
    expect(typeof addExercise).toBe('function');
    expect(typeof removeExercise).toBe('function');
    expect(typeof updateExercise).toBe('function');
    expect(typeof reorderExercises).toBe('function');
  });

  describe('reorderExercises', () => {
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
                  sets: [],
                } as Exercise,
                {
                  _id: 'exercise-2',
                  exerciseId: 'exercise-2',
                  exerciseVariantId: 'variant-2',
                  type: 'strength',
                  orderIndex: 1,
                  sets: [],
                } as Exercise,
                {
                  _id: 'exercise-3',
                  exerciseId: 'exercise-3',
                  exerciseVariantId: 'variant-3',
                  type: 'strength',
                  orderIndex: 2,
                  sets: [],
                } as Exercise,
              ],
            } as StrengthWorkoutSection,
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

    it('should reorder exercises correctly', () => {
      const initialState = createMockState();
      const newOrder = ['exercise-3', 'exercise-1', 'exercise-2'];

      const result = reorderExercises(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseIds: newOrder,
      });

      const exercises = result.workouts[0].sections[0].exercises;
      expect(exercises[0]._id).toBe('exercise-3');
      expect(exercises[0].orderIndex).toBe(0);
      expect(exercises[1]._id).toBe('exercise-1');
      expect(exercises[1].orderIndex).toBe(1);
      expect(exercises[2]._id).toBe('exercise-2');
      expect(exercises[2].orderIndex).toBe(2);
    });

    it('should handle reordering with non-existent IDs without creating gaps', () => {
      const initialState = createMockState();
      const newOrder = ['exercise-1', 'non-existent-id', 'exercise-3'];

      const result = reorderExercises(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseIds: newOrder,
      });

      const exercises = result.workouts[0].sections[0].exercises;

      // Should only have 2 exercises (non-existent one filtered out)
      expect(exercises).toHaveLength(2);

      // Should have consecutive orderIndex values
      expect(exercises[0]._id).toBe('exercise-1');
      expect(exercises[0].orderIndex).toBe(0);
      expect(exercises[1]._id).toBe('exercise-3');
      expect(exercises[1].orderIndex).toBe(1);
    });

    it('should handle multiple non-existent IDs', () => {
      const initialState = createMockState();
      const newOrder = [
        'non-existent-1',
        'exercise-2',
        'non-existent-2',
        'exercise-1',
      ];

      const result = reorderExercises(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseIds: newOrder,
      });

      const exercises = result.workouts[0].sections[0].exercises;

      // Should only have 2 exercises
      expect(exercises).toHaveLength(2);

      // Should have consecutive orderIndex values
      expect(exercises[0]._id).toBe('exercise-2');
      expect(exercises[0].orderIndex).toBe(0);
      expect(exercises[1]._id).toBe('exercise-1');
      expect(exercises[1].orderIndex).toBe(1);
    });

    it('should handle empty exerciseIds array', () => {
      const initialState = createMockState();

      const result = reorderExercises(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseIds: [],
      });

      const exercises = result.workouts[0].sections[0].exercises;
      expect(exercises).toHaveLength(0);
    });

    it('should handle all non-existent IDs', () => {
      const initialState = createMockState();
      const newOrder = ['non-existent-1', 'non-existent-2', 'non-existent-3'];

      const result = reorderExercises(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseIds: newOrder,
      });

      const exercises = result.workouts[0].sections[0].exercises;
      expect(exercises).toHaveLength(0);
    });

    it('should not modify other sections', () => {
      const initialState = createMockState();
      // Add another section
      initialState.workouts[0].sections.push({
        _id: 'section-2',
        name: 'Section 2',
        type: 'basic',
        orderIndex: 1,
        exercises: [
          {
            _id: 'exercise-4',
            exerciseId: 'exercise-4',
            exerciseVariantId: 'variant-4',
            type: 'strength',
            orderIndex: 0,
            sets: [],
          } as Exercise,
        ],
      } as StrengthWorkoutSection);

      const result = reorderExercises(initialState, {
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseIds: ['exercise-3', 'exercise-1'],
      });

      // section-2 should remain unchanged
      const section2 = result.workouts[0].sections.find(
        s => s._id === 'section-2'
      );
      expect(section2?.exercises[0].orderIndex).toBe(0);
    });
  });
});
