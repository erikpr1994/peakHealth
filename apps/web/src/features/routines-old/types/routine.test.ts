import { describe, test, expect } from 'vitest';
import type {
  Routine,
  RoutineData,
  WorkoutDay,
  ExerciseDetail,
} from './routine';

describe('Routine Types', () => {
  describe('Routine interface', () => {
    test('should have correct structure', () => {
      const routine: Routine = {
        id: 'routine-1',
        name: 'Test Routine',
        description: 'Test Description',
        difficulty: 'Intermediate',
        goal: 'Strength',
        isActive: true,
        isFavorite: false,
        progress: {
          current: 1,
          total: 12,
        },
        objectives: ['Build strength'],
        totalWorkouts: 24,
        completedWorkouts: 0,
        estimatedDuration: '45-60 min',
        workoutDays: [],
      };

      expect(routine.id).toBe('routine-1');
      expect(routine.name).toBe('Test Routine');
      expect(routine.difficulty).toBe('Intermediate');
      expect(routine.goal).toBe('Strength');
      expect(routine.isActive).toBe(true);
      expect(routine.isFavorite).toBe(false);
      expect(routine.progress.current).toBe(1);
      expect(routine.progress.total).toBe(12);
    });

    test('should accept valid difficulty values', () => {
      const difficulties: Routine['difficulty'][] = [
        'Beginner',
        'Intermediate',
        'Advanced',
      ];

      difficulties.forEach(difficulty => {
        expect(difficulty).toMatch(/^(Beginner|Intermediate|Advanced)$/);
      });
    });

    test('should accept valid goal values', () => {
      const goals: Routine['goal'][] = [
        'Strength',
        'Hypertrophy',
        'Endurance',
        'Weight Loss',
      ];

      goals.forEach(goal => {
        expect(goal).toMatch(/^(Strength|Hypertrophy|Endurance|Weight Loss)$/);
      });
    });
  });

  describe('RoutineData interface', () => {
    test('should have correct structure', () => {
      const routineData: RoutineData = {
        id: 'routine-1',
        name: 'Test Routine',
        description: 'Test Description',
        duration: 12,
        difficulty: 'Intermediate',
        goal: 'Strength',
        isActive: true,
        isFavorite: false,
        objectives: ['Build strength'],
        progress: {
          currentWeek: 1,
          totalWeeks: 12,
          completedWorkouts: 0,
          totalWorkouts: 24,
        },
        workoutDays: [],
        createdDate: '2024-01-01',
        lastModified: '2024-01-01',
      };

      expect(routineData.id).toBe('routine-1');
      expect(routineData.duration).toBe(12);
      expect(routineData.progress.currentWeek).toBe(1);
      expect(routineData.progress.totalWeeks).toBe(12);
      expect(routineData.createdDate).toBe('2024-01-01');
      expect(routineData.lastModified).toBe('2024-01-01');
    });
  });

  describe('WorkoutDay interface', () => {
    test('should have correct structure', () => {
      const workoutDay: WorkoutDay = {
        id: 'workout-day-1',
        name: 'Monday Workout',
        exercises: [],
        estimatedTime: '45 min',
        difficulty: 'Intermediate',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['monday'],
          time: '09:00',
        },
      };

      expect(workoutDay.id).toBe('workout-day-1');
      expect(workoutDay.name).toBe('Monday Workout');
      expect(workoutDay.estimatedTime).toBe('45 min');
      expect(workoutDay.difficulty).toBe('Intermediate');
      expect(workoutDay.schedule?.selectedDays).toEqual(['monday']);
    });
  });

  describe('ExerciseDetail interface', () => {
    test('should have correct structure', () => {
      const exerciseDetail: ExerciseDetail = {
        id: 'exercise-1',
        variantId: 'variant-1',
        name: 'Bench Press',
        sets: [
          {
            reps: '10',
            weight: '135',
            restTime: '90s',
          },
        ],
        notes: 'Focus on form',
        muscleGroups: ['chest', 'triceps'],
      };

      expect(exerciseDetail.id).toBe('exercise-1');
      expect(exerciseDetail.variantId).toBe('variant-1');
      expect(exerciseDetail.name).toBe('Bench Press');
      expect(exerciseDetail.sets).toHaveLength(1);
      expect(exerciseDetail.sets[0].reps).toBe('10');
      expect(exerciseDetail.sets[0].weight).toBe('135');
      expect(exerciseDetail.notes).toBe('Focus on form');
      expect(exerciseDetail.muscleGroups).toEqual(['chest', 'triceps']);
    });
  });
});
