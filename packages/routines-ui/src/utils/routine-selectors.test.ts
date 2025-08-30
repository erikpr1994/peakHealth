import { describe, it, expect } from 'vitest';
import {
  findWorkoutById,
  findSectionById,
  findExerciseById,
  findSetById,
  getWorkoutIds,
  getSectionIds,
  getExerciseIds,
  getSetIds,
} from './routine-selectors';
import { RoutineBuilderState } from '../context/routineBuilder/types';

// Mock data for testing
const mockState: RoutineBuilderState = {
  _id: 'routine-1',
  name: 'Test Routine',
  description: 'A test routine',
  difficulty: 'beginner',
  goal: 'strength',
  duration: 4,
  objectives: ['Build strength', 'Improve form'],
  workouts: [
    {
      _id: 'workout-1',
      name: 'Upper Body',
      type: 'strength',
      orderIndex: 0,
      sections: [
        {
          _id: 'section-1',
          name: 'Warmup',
          type: 'warmup',
          orderIndex: 0,
          targetMuscleGroups: ['chest', 'shoulders'],
          duration: 10,
          intensity: 'light',
          exercises: [
            {
              _id: 'exercise-1',
              exerciseId: 'pushup',
              exerciseVariantId: 'pushup-standard',
              type: 'strength',
              orderIndex: 0,
              sets: [
                {
                  _id: 'set-1',
                  setNumber: 1,
                  setType: 'warmup',
                  repType: 'fixed',
                  reps: 10,
                },
                {
                  _id: 'set-2',
                  setNumber: 2,
                  setType: 'warmup',
                  repType: 'fixed',
                  reps: 10,
                },
              ],
            },
          ],
        },
        {
          _id: 'section-2',
          name: 'Main Strength',
          type: 'basic',
          orderIndex: 1,
          exercises: [
            {
              _id: 'exercise-2',
              exerciseId: 'bench-press',
              exerciseVariantId: 'bench-press-barbell',
              type: 'strength',
              orderIndex: 0,
              sets: [
                {
                  _id: 'set-3',
                  setNumber: 1,
                  setType: 'working',
                  repType: 'fixed',
                  reps: 8,
                  weight: 135,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      _id: 'workout-2',
      name: 'Lower Body',
      type: 'strength',
      orderIndex: 1,
      sections: [
        {
          _id: 'section-3',
          name: 'Warmup',
          type: 'warmup',
          orderIndex: 0,
          targetMuscleGroups: ['legs'],
          duration: 8,
          intensity: 'light',
          exercises: [],
        },
      ],
    },
  ],
  userId: 'user-1',
  createdBy: 'user-1',
  routineType: 'user-created',
  isActive: true,
  isFavorite: false,
  completedWorkouts: 0,
  totalWorkouts: 2,
  schemaVersion: '1.0.0',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
};

describe('routine-selectors', () => {
  describe('findWorkoutById', () => {
    it('should find a workout by ID', () => {
      const workout = findWorkoutById(mockState, 'workout-1');
      expect(workout).toBeDefined();
      expect(workout?._id).toBe('workout-1');
      expect(workout?.name).toBe('Upper Body');
    });

    it('should return undefined for non-existent workout ID', () => {
      const workout = findWorkoutById(mockState, 'non-existent');
      expect(workout).toBeUndefined();
    });
  });

  describe('findSectionById', () => {
    it('should find a section by ID', () => {
      const section = findSectionById(mockState, 'workout-1', 'section-1');
      expect(section).toBeDefined();
      expect(section?._id).toBe('section-1');
      expect(section?.name).toBe('Warmup');
    });

    it('should return undefined for non-existent section ID', () => {
      const section = findSectionById(mockState, 'workout-1', 'non-existent');
      expect(section).toBeUndefined();
    });

    it('should return undefined for non-existent workout ID', () => {
      const section = findSectionById(mockState, 'non-existent', 'section-1');
      expect(section).toBeUndefined();
    });
  });

  describe('findExerciseById', () => {
    it('should find an exercise by ID', () => {
      const exercise = findExerciseById(
        mockState,
        'workout-1',
        'section-1',
        'exercise-1'
      );
      expect(exercise).toBeDefined();
      expect(exercise?._id).toBe('exercise-1');
      expect(exercise?.exerciseId).toBe('pushup');
    });

    it('should return undefined for non-existent exercise ID', () => {
      const exercise = findExerciseById(
        mockState,
        'workout-1',
        'section-1',
        'non-existent'
      );
      expect(exercise).toBeUndefined();
    });

    it('should return undefined for non-existent section ID', () => {
      const exercise = findExerciseById(
        mockState,
        'workout-1',
        'non-existent',
        'exercise-1'
      );
      expect(exercise).toBeUndefined();
    });
  });

  describe('findSetById', () => {
    it('should find a set by ID', () => {
      const set = findSetById(
        mockState,
        'workout-1',
        'section-1',
        'exercise-1',
        'set-1'
      );
      expect(set).toBeDefined();
      expect(set?._id).toBe('set-1');
      expect(set?.setNumber).toBe(1);
    });

    it('should return undefined for non-existent set ID', () => {
      const set = findSetById(
        mockState,
        'workout-1',
        'section-1',
        'exercise-1',
        'non-existent'
      );
      expect(set).toBeUndefined();
    });

    it('should return undefined for non-existent exercise ID', () => {
      const set = findSetById(
        mockState,
        'workout-1',
        'section-1',
        'non-existent',
        'set-1'
      );
      expect(set).toBeUndefined();
    });
  });

  describe('getWorkoutIds', () => {
    it('should return all workout IDs', () => {
      const workoutIds = getWorkoutIds(mockState);
      expect(workoutIds).toEqual(['workout-1', 'workout-2']);
    });

    it('should return empty array for empty workouts', () => {
      const emptyState = { ...mockState, workouts: [] };
      const workoutIds = getWorkoutIds(emptyState);
      expect(workoutIds).toEqual([]);
    });
  });

  describe('getSectionIds', () => {
    it('should return all section IDs for a workout', () => {
      const sectionIds = getSectionIds(mockState, 'workout-1');
      expect(sectionIds).toEqual(['section-1', 'section-2']);
    });

    it('should return empty array for non-existent workout', () => {
      const sectionIds = getSectionIds(mockState, 'non-existent');
      expect(sectionIds).toEqual([]);
    });
  });

  describe('getExerciseIds', () => {
    it('should return all exercise IDs for a section', () => {
      const exerciseIds = getExerciseIds(mockState, 'workout-1', 'section-1');
      expect(exerciseIds).toEqual(['exercise-1']);
    });

    it('should return empty array for non-existent section', () => {
      const exerciseIds = getExerciseIds(
        mockState,
        'workout-1',
        'non-existent'
      );
      expect(exerciseIds).toEqual([]);
    });
  });

  describe('getSetIds', () => {
    it('should return all set IDs for an exercise', () => {
      const setIds = getSetIds(
        mockState,
        'workout-1',
        'section-1',
        'exercise-1'
      );
      expect(setIds).toEqual(['set-1', 'set-2']);
    });

    it('should return empty array for non-existent exercise', () => {
      const setIds = getSetIds(
        mockState,
        'workout-1',
        'section-1',
        'non-existent'
      );
      expect(setIds).toEqual([]);
    });

    it('should return empty array for exercise without sets', () => {
      const setIds = getSetIds(
        mockState,
        'workout-2',
        'section-3',
        'non-existent'
      );
      expect(setIds).toEqual([]);
    });
  });
});
