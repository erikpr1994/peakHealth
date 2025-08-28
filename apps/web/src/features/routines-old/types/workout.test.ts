import { describe, test, expect } from 'vitest';
import type {
  WorkoutType,
  WorkoutSection,
  StrengthWorkout,
  RunningWorkout,
  TrailRunningWorkoutData,
} from './workout';

describe('Workout Types', () => {
  describe('WorkoutType', () => {
    test('should accept valid workout types', () => {
      const types: WorkoutType[] = [
        'strength',
        'running',
        'trail-running',
        'swimming',
        'cycling',
      ];

      expect(types).toHaveLength(5);
      expect(types).toContain('strength');
      expect(types).toContain('running');
      expect(types).toContain('trail-running');
    });
  });

  describe('WorkoutSection interface', () => {
    test('should have correct structure', () => {
      const section: WorkoutSection = {
        id: 'section-1',
        name: 'Test Section',
        type: 'basic',
        exercises: [],
        restAfter: '2 min',
        emomDuration: 10,
      };

      expect(section.id).toBe('section-1');
      expect(section.name).toBe('Test Section');
      expect(section.type).toBe('basic');
      expect(section.exercises).toEqual([]);
      expect(section.restAfter).toBe('2 min');
      expect(section.emomDuration).toBe(10);
    });

    test('should accept all section types', () => {
      const sectionTypes = [
        'warmup',
        'basic',
        'cooldown',
        'emom',
        'tabata',
        'amrap',
      ] as const;

      sectionTypes.forEach(type => {
        const section: WorkoutSection = {
          id: 'test',
          name: 'Test',
          type,
          exercises: [],
          restAfter: '1 min',
        };

        expect(section.type).toBe(type);
      });
    });
  });

  describe('StrengthWorkout interface', () => {
    test('should have correct structure', () => {
      const workout: StrengthWorkout = {
        id: 'workout-1',
        name: 'Upper Body Strength',
        type: 'strength',
        objective: 'Build upper body strength',
        schedule: {
          repeatPattern: 'weekdays',
          repeatValue: '',
          selectedDays: ['monday', 'wednesday', 'friday'],
          time: '09:00',
        },
        sections: [],
      };

      expect(workout.id).toBe('workout-1');
      expect(workout.name).toBe('Upper Body Strength');
      expect(workout.type).toBe('strength');
      expect(workout.objective).toBe('Build upper body strength');
      expect(workout.schedule.selectedDays).toEqual([
        'monday',
        'wednesday',
        'friday',
      ]);
    });
  });

  describe('RunningWorkout interface', () => {
    test('should have correct structure', () => {
      const workout: RunningWorkout = {
        id: 'workout-1',
        name: 'Cardio Session',
        type: 'running',
        objective: 'Improve cardiovascular fitness',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '2',
          selectedDays: ['tuesday', 'thursday'],
          time: '07:00',
        },
        sections: [],
      };

      expect(workout.id).toBe('workout-1');
      expect(workout.name).toBe('Cardio Session');
      expect(workout.type).toBe('running');
      expect(workout.objective).toBe('Improve cardiovascular fitness');
      expect(workout.schedule.selectedDays).toEqual(['tuesday', 'thursday']);
    });

    test('should accept trail running type', () => {
      const trailWorkout: RunningWorkout = {
        id: 'trail-1',
        name: 'Trail Run',
        type: 'trail-running',
        objective: 'Trail running workout',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['saturday'],
          time: '08:00',
        },
        sections: [],
        trailRunningData: {
          id: 'trail-data-1',
          name: 'Mountain Trail',
          description: 'Challenging mountain trail',
          type: 'trail-running',
          difficulty: 'intermediate',
          estimatedDuration: 60,
          targetDistance: 10,
          elevationGain: 500,
          sections: [],
        },
      };

      expect(trailWorkout.type).toBe('trail-running');
      expect(trailWorkout.trailRunningData).toBeDefined();
    });
  });
});
