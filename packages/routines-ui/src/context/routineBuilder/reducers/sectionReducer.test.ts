import { describe, it, expect } from 'vitest';
import {
  addSection,
  removeSection,
  updateSection,
  reorderSections,
} from './sectionReducer';
import { RoutineBuilderState } from '../types';
import { BasicSection, Workout } from '@peakhealth/routines-types';

describe('sectionReducer', () => {
  it('should export all required functions', () => {
    expect(typeof addSection).toBe('function');
    expect(typeof removeSection).toBe('function');
    expect(typeof updateSection).toBe('function');
    expect(typeof reorderSections).toBe('function');
  });

  describe('reorderSections', () => {
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
              exercises: [],
            } as BasicSection,
            {
              _id: 'section-2',
              name: 'Section 2',
              type: 'basic',
              orderIndex: 1,
              exercises: [],
            } as BasicSection,
            {
              _id: 'section-3',
              name: 'Section 3',
              type: 'basic',
              orderIndex: 2,
              exercises: [],
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

    it('should reorder sections correctly', () => {
      const initialState = createMockState();
      const newOrder = ['section-3', 'section-1', 'section-2'];

      const result = reorderSections(initialState, {
        workoutId: 'workout-1',
        sectionIds: newOrder,
      });

      const sections = result.workouts[0].sections;
      expect(sections[0]._id).toBe('section-3');
      expect(sections[0].orderIndex).toBe(0);
      expect(sections[1]._id).toBe('section-1');
      expect(sections[1].orderIndex).toBe(1);
      expect(sections[2]._id).toBe('section-2');
      expect(sections[2].orderIndex).toBe(2);
    });

    it('should handle reordering with non-existent IDs without creating gaps', () => {
      const initialState = createMockState();
      const newOrder = ['section-1', 'non-existent-id', 'section-3'];

      const result = reorderSections(initialState, {
        workoutId: 'workout-1',
        sectionIds: newOrder,
      });

      const sections = result.workouts[0].sections;

      // Should only have 2 sections (non-existent one filtered out)
      expect(sections).toHaveLength(2);

      // Should have consecutive orderIndex values
      expect(sections[0]._id).toBe('section-1');
      expect(sections[0].orderIndex).toBe(0);
      expect(sections[1]._id).toBe('section-3');
      expect(sections[1].orderIndex).toBe(1);
    });

    it('should handle multiple non-existent IDs', () => {
      const initialState = createMockState();
      const newOrder = [
        'non-existent-1',
        'section-2',
        'non-existent-2',
        'section-1',
      ];

      const result = reorderSections(initialState, {
        workoutId: 'workout-1',
        sectionIds: newOrder,
      });

      const sections = result.workouts[0].sections;

      // Should only have 2 sections
      expect(sections).toHaveLength(2);

      // Should have consecutive orderIndex values
      expect(sections[0]._id).toBe('section-2');
      expect(sections[0].orderIndex).toBe(0);
      expect(sections[1]._id).toBe('section-1');
      expect(sections[1].orderIndex).toBe(1);
    });

    it('should handle empty sectionIds array', () => {
      const initialState = createMockState();

      const result = reorderSections(initialState, {
        workoutId: 'workout-1',
        sectionIds: [],
      });

      const sections = result.workouts[0].sections;
      expect(sections).toHaveLength(0);
    });

    it('should handle all non-existent IDs', () => {
      const initialState = createMockState();
      const newOrder = ['non-existent-1', 'non-existent-2', 'non-existent-3'];

      const result = reorderSections(initialState, {
        workoutId: 'workout-1',
        sectionIds: newOrder,
      });

      const sections = result.workouts[0].sections;
      expect(sections).toHaveLength(0);
    });

    it('should not modify other workouts', () => {
      const initialState = createMockState();
      // Add another workout
      initialState.workouts.push({
        _id: 'workout-2',
        name: 'Workout 2',
        type: 'strength',
        orderIndex: 1,
        sections: [
          {
            _id: 'section-4',
            name: 'Section 4',
            type: 'basic',
            orderIndex: 0,
            exercises: [],
          } as BasicSection,
        ],
      } as Workout);

      const result = reorderSections(initialState, {
        workoutId: 'workout-1',
        sectionIds: ['section-3', 'section-1'],
      });

      // workout-2 should remain unchanged
      const workout2 = result.workouts.find(w => w._id === 'workout-2');
      expect(workout2?.sections[0].orderIndex).toBe(0);
    });
  });
});
