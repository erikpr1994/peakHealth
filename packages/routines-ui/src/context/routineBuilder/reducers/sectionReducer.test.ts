import { describe, it, expect } from 'vitest';
import {
  addSection,
  removeSection,
  updateSection,
  reorderSections,
} from './sectionReducer';
import { RoutineBuilderState } from '../types';

describe('sectionReducer', () => {
  const mockInitialState: RoutineBuilderState = {
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

  it('should export all required functions', () => {
    expect(typeof addSection).toBe('function');
    expect(typeof removeSection).toBe('function');
    expect(typeof updateSection).toBe('function');
    expect(typeof reorderSections).toBe('function');
  });

  it('should handle addSection with empty workouts array', () => {
    const result = addSection(mockInitialState, {
      workoutId: 'non-existent',
      section: {
        _id: 'section-1',
        name: 'Test Section',
        type: 'basic',
        orderIndex: 0,
        exercises: [],
      } as any,
    });

    expect(result).toBeDefined();
    expect(result.workouts).toHaveLength(0);
  });

  it('should add section to existing workout', () => {
    const stateWithWorkout: RoutineBuilderState = {
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
        } as any,
      ],
      totalWorkouts: 1,
    };

    const newSection = {
      _id: 'section-1',
      name: 'Warm Up',
      type: 'basic',
      orderIndex: 0,
      exercises: [],
    } as any;

    const result = addSection(stateWithWorkout, {
      workoutId: 'workout-1',
      section: newSection,
    });

    expect(result.workouts[0].sections).toHaveLength(1);
    expect(result.workouts[0].sections[0]._id).toBe('section-1');
    expect(result.workouts[0].sections[0].name).toBe('Warm Up');
    expect(result.workouts[0].sections[0].orderIndex).toBe(0);
  });

  it('should not modify other workouts when adding section', () => {
    const stateWithMultipleWorkouts: RoutineBuilderState = {
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
        } as any,
        {
          _id: 'workout-2',
          name: 'Workout 2',
          type: 'strength',
          orderIndex: 1,
          sections: [],
          objective: 'Build strength',
          notes: 'Test workout 2',
        } as any,
      ],
      totalWorkouts: 2,
    };

    const newSection = {
      _id: 'section-1',
      name: 'Warm Up',
      type: 'basic',
      orderIndex: 0,
      exercises: [],
    } as any;

    const result = addSection(stateWithMultipleWorkouts, {
      workoutId: 'workout-1',
      section: newSection,
    });

    expect(result.workouts[0].sections).toHaveLength(1);
    expect(result.workouts[1].sections).toHaveLength(0);
  });

  it('should remove section from workout', () => {
    const stateWithSection: RoutineBuilderState = {
      ...mockInitialState,
      workouts: [
        {
          _id: 'workout-1',
          name: 'Workout 1',
          type: 'strength',
          orderIndex: 0,
          sections: [
            {
              _id: 'section-1',
              name: 'Warm Up',
              type: 'basic',
              orderIndex: 0,
              exercises: [],
            } as any,
          ],
          objective: 'Build strength',
          notes: 'Test workout',
        } as any,
      ],
      totalWorkouts: 1,
    };

    const result = removeSection(stateWithSection, {
      workoutId: 'workout-1',
      sectionId: 'section-1',
    });

    expect(result.workouts[0].sections).toHaveLength(0);
  });

  it('should reorder remaining sections after removal', () => {
    const stateWithSections: RoutineBuilderState = {
      ...mockInitialState,
      workouts: [
        {
          _id: 'workout-1',
          name: 'Workout 1',
          type: 'strength',
          orderIndex: 0,
          sections: [
            {
              _id: 'section-1',
              name: 'Warm Up',
              type: 'basic',
              orderIndex: 0,
              exercises: [],
            } as any,
            {
              _id: 'section-2',
              name: 'Main Workout',
              type: 'basic',
              orderIndex: 1,
              exercises: [],
            } as any,
            {
              _id: 'section-3',
              name: 'Cool Down',
              type: 'basic',
              orderIndex: 2,
              exercises: [],
            } as any,
          ],
          objective: 'Build strength',
          notes: 'Test workout',
        } as any,
      ],
      totalWorkouts: 1,
    };

    const result = removeSection(stateWithSections, {
      workoutId: 'workout-1',
      sectionId: 'section-1',
    });

    expect(result.workouts[0].sections).toHaveLength(2);
    expect(result.workouts[0].sections[0].orderIndex).toBe(0);
    expect(result.workouts[0].sections[1].orderIndex).toBe(1);
  });
});
