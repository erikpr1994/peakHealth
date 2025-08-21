import { describe, test, expect } from 'vitest';
import type {
  WorkoutType,
  WorkoutSection,
  Exercise,
  ProgressionMethod,
  StrengthWorkout,
  RunningWorkout,
  IntervalType,
  TrailRunningInterval,
  TrailRunningWorkoutData,
  IntensityTarget,
  TrailRunningSection,
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

  describe('ProgressionMethod', () => {
    test('should accept valid progression methods', () => {
      const methods: ProgressionMethod[] = [
        'linear',
        'dual',
        'inverse-pyramid',
        'myo-reps',
        'widowmaker',
        'amrap',
      ];

      expect(methods).toHaveLength(6);
      expect(methods).toContain('linear');
      expect(methods).toContain('amrap');
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

  describe('Exercise interface', () => {
    test('should have correct structure', () => {
      const exercise: Exercise = {
        id: 'exercise-1',
        name: 'Bench Press',
        category: 'strength',
        muscleGroups: ['chest', 'triceps'],
        equipment: ['barbell', 'bench'],
        exerciseId: 'ex-1',
        variantId: 'var-1',
        sets: [],
        restTimer: '90s',
        restAfter: '2 min',
        notes: 'Test exercise',
        progressionMethod: 'linear',
        hasApproachSets: false,
        emomReps: 10,
      };

      expect(exercise.id).toBe('exercise-1');
      expect(exercise.name).toBe('Bench Press');
      expect(exercise.category).toBe('strength');
      expect(exercise.muscleGroups).toEqual(['chest', 'triceps']);
      expect(exercise.equipment).toEqual(['barbell', 'bench']);
      expect(exercise.progressionMethod).toBe('linear');
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

  describe('Trail Running Types', () => {
    test('IntervalType should accept valid interval types', () => {
      const intervalTypes: IntervalType[] = [
        'run',
        'uphill',
        'downhill',
        'sprint',
        'recovery',
        'rest',
        'walk',
      ];

      expect(intervalTypes).toHaveLength(7);
      expect(intervalTypes).toContain('run');
      expect(intervalTypes).toContain('uphill');
    });

    test('TrailRunningInterval should have correct structure', () => {
      const interval: TrailRunningInterval = {
        id: 'interval-1',
        name: 'Sprint Interval',
        type: 'sprint',
        distance: 100,
        duration: 30,
        elevationChange: 10,
      };

      expect(interval.id).toBe('interval-1');
      expect(interval.name).toBe('Sprint Interval');
      expect(interval.type).toBe('sprint');
      expect(interval.distance).toBe(100);
      expect(interval.duration).toBe(30);
    });

    test('IntensityTarget should have correct structure', () => {
      const target: IntensityTarget = {
        type: 'heart-rate',
        minValue: 140,
        maxValue: 160,
        unit: 'bpm',
      };

      expect(target.type).toBe('heart-rate');
      expect(target.minValue).toBe(140);
      expect(target.maxValue).toBe(160);
      expect(target.unit).toBe('bpm');
    });

    test('TrailRunningSection should have correct structure', () => {
      const section: TrailRunningSection = {
        id: 'section-1',
        name: 'Warm Up',
        type: 'warm-up',
        distance: 2,
        duration: 15,
        elevationChange: 50,
        isRepeated: false,
      };

      expect(section.id).toBe('section-1');
      expect(section.name).toBe('Warm Up');
      expect(section.type).toBe('warm-up');
      expect(section.distance).toBe(2);
      expect(section.duration).toBe(15);
    });

    test('TrailRunningWorkoutData should have correct structure', () => {
      const workoutData: TrailRunningWorkoutData = {
        id: 'trail-1',
        name: 'Mountain Trail Run',
        description: 'Challenging mountain trail run',
        type: 'trail-running',
        difficulty: 'advanced',
        estimatedDuration: 90,
        targetDistance: 15,
        elevationGain: 800,
        sections: [],
      };

      expect(workoutData.id).toBe('trail-1');
      expect(workoutData.name).toBe('Mountain Trail Run');
      expect(workoutData.type).toBe('trail-running');
      expect(workoutData.difficulty).toBe('advanced');
      expect(workoutData.estimatedDuration).toBe(90);
      expect(workoutData.targetDistance).toBe(15);
      expect(workoutData.elevationGain).toBe(800);
    });
  });
});
