import { describe, test, expect } from 'vitest';
import {
  calculateWorkoutDuration,
  parseRestTime,
  generateSetsForProgression,
  addApproachSets,
} from './calculations';
import type { StrengthWorkout, RunningWorkout } from '../types';
import type { WorkoutSet } from '../components/SetManagement';

describe('Workout Calculations', () => {
  describe('calculateWorkoutDuration', () => {
    test('should calculate duration for strength workout with basic sections', () => {
      const workout: StrengthWorkout = {
        id: 'test-workout',
        name: 'Test Workout',
        type: 'strength',
        objective: 'Test objective',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['monday'],
          time: 'morning',
        },
        sections: [
          {
            id: 'section-1',
            name: 'Push',
            type: 'basic',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Bench Press',
                sets: [
                  {
                    id: '1',
                    setNumber: 1,
                    setType: 'normal',
                    repType: 'fixed',
                    reps: 10,
                    weight: 0,
                    rpe: null,
                    notes: '',
                  },
                  {
                    id: '2',
                    setNumber: 2,
                    setType: 'normal',
                    repType: 'fixed',
                    reps: 10,
                    weight: 0,
                    rpe: null,
                    notes: '',
                  },
                ],
                restTimer: '2 min',
                restAfter: '3 min',
                notes: '',
              },
            ],
            restAfter: '5 min',
          },
        ],
      };

      const duration = calculateWorkoutDuration(workout);
      expect(duration).toBe('19 min'); // 5 (base) + 4 (sets) + 2 (rest between) + 3 (rest after) + 5 (section rest)
    });

    test('should calculate duration for EMOM section', () => {
      const workout: StrengthWorkout = {
        id: 'test-workout',
        name: 'Test Workout',
        type: 'strength',
        objective: 'Test objective',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['monday'],
          time: 'morning',
        },
        sections: [
          {
            id: 'section-1',
            name: 'EMOM',
            type: 'emom',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Burpees',
                sets: [],
                restTimer: '',
                restAfter: '',
                notes: '',
                emomReps: 10,
              },
            ],
            restAfter: '',
          },
        ],
      };

      const duration = calculateWorkoutDuration(workout);
      expect(duration).toBe('15 min'); // 5 (base) + 10 (emom reps)
    });

    test('should calculate duration for TABATA section', () => {
      const workout: StrengthWorkout = {
        id: 'test-workout',
        name: 'Test Workout',
        type: 'strength',
        objective: 'Test objective',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['monday'],
          time: 'morning',
        },
        sections: [
          {
            id: 'section-1',
            name: 'TABATA',
            type: 'tabata',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Squats',
                sets: [],
                restTimer: '',
                restAfter: '',
                notes: '',
              },
            ],
            restAfter: '',
          },
        ],
      };

      const duration = calculateWorkoutDuration(workout);
      expect(duration).toBe('9 min'); // 5 (base) + 4 (tabata)
    });

    test('should format duration in hours and minutes for long workouts', () => {
      const workout: StrengthWorkout = {
        id: 'test-workout',
        name: 'Long Workout',
        type: 'strength',
        objective: 'Test objective',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['monday'],
          time: 'morning',
        },
        sections: [
          {
            id: 'section-1',
            name: 'Long Section',
            type: 'basic',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Long Exercise',
                sets: Array.from({ length: 20 }, (_, i) => ({
                  id: `${i + 1}`,
                  setNumber: i + 1,
                  setType: 'normal' as const,
                  repType: 'fixed' as const,
                  reps: 10,
                  weight: 0,
                  rpe: null,
                  notes: '',
                })),
                restTimer: '5 min',
                restAfter: '10 min',
                notes: '',
              },
            ],
            restAfter: '15 min',
          },
        ],
      };

      const duration = calculateWorkoutDuration(workout);
      expect(duration).toBe('2h 45m'); // 5 (base) + 40 (sets) + 95 (rest between) + 10 (rest after) + 15 (section rest) = 165 min
    });

    test('should format duration in hours only when no extra minutes', () => {
      const workout: StrengthWorkout = {
        id: 'test-workout',
        name: 'Hour Workout',
        type: 'strength',
        objective: 'Test objective',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['monday'],
          time: 'morning',
        },
        sections: [
          {
            id: 'section-1',
            name: 'Hour Section',
            type: 'basic',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Hour Exercise',
                sets: Array.from({ length: 30 }, (_, i) => ({
                  id: `${i + 1}`,
                  setNumber: i + 1,
                  setType: 'normal' as const,
                  repType: 'fixed' as const,
                  reps: 10,
                  weight: 0,
                  rpe: null,
                  notes: '',
                })),
                restTimer: '',
                restAfter: '',
                notes: '',
              },
            ],
            restAfter: '',
          },
        ],
      };

      const duration = calculateWorkoutDuration(workout);
      expect(duration).toBe('1h 5m'); // 5 (base) + 60 (sets) = 65 min
    });
  });

  describe('parseRestTime', () => {
    test('should parse minutes with "min" suffix', () => {
      expect(parseRestTime('5 min')).toBe(5);
      expect(parseRestTime('10 min')).toBe(10);
    });

    test('should parse minutes with "m" suffix', () => {
      expect(parseRestTime('5m')).toBe(5);
      expect(parseRestTime('10m')).toBe(10);
    });

    test('should parse seconds with "sec" suffix', () => {
      expect(parseRestTime('30 sec')).toBe(1); // 30 seconds = 1 minute (rounded up)
      expect(parseRestTime('90 sec')).toBe(2); // 90 seconds = 2 minutes (rounded up)
    });

    test('should parse seconds with "s" suffix', () => {
      expect(parseRestTime('30s')).toBe(1);
      expect(parseRestTime('90s')).toBe(2);
    });

    test('should parse numbers without units as minutes', () => {
      expect(parseRestTime('5')).toBe(5);
      expect(parseRestTime('10')).toBe(10);
    });

    test('should handle case insensitive parsing', () => {
      expect(parseRestTime('5 MIN')).toBe(5);
      expect(parseRestTime('30 SEC')).toBe(1);
    });

    test('should handle whitespace', () => {
      expect(parseRestTime(' 5 min ')).toBe(5);
      expect(parseRestTime('  10m  ')).toBe(10);
    });

    test('should return 0 for invalid input', () => {
      expect(parseRestTime('invalid')).toBe(0);
      expect(parseRestTime('')).toBe(0);
    });
  });

  describe('generateSetsForProgression', () => {
    test('should generate linear progression sets', () => {
      const sets = generateSetsForProgression('linear');

      expect(sets).toHaveLength(4);
      expect(sets[0].reps).toBe(12);
      expect(sets[1].reps).toBe(10);
      expect(sets[2].reps).toBe(8);
      expect(sets[3].reps).toBe(6);
    });

    test('should generate dual progression sets', () => {
      const sets = generateSetsForProgression('dual');

      expect(sets).toHaveLength(4);
      sets.forEach(set => {
        expect(set.repType).toBe('range');
        expect(set.repsMin).toBe(6);
        expect(set.repsMax).toBe(8);
      });
    });

    test('should generate inverse pyramid sets', () => {
      const sets = generateSetsForProgression('inverse-pyramid');

      expect(sets).toHaveLength(4);
      expect(sets[0].reps).toBe(6);
      expect(sets[1].reps).toBe(8);
      expect(sets[2].reps).toBe(10);
      expect(sets[3].reps).toBe(12);
    });

    test('should generate myo-reps sets', () => {
      const sets = generateSetsForProgression('myo-reps');

      expect(sets).toHaveLength(5);
      expect(sets[0].reps).toBe(15);
      expect(sets[0].notes).toBe('Activation set');
      expect(sets[1].reps).toBe(5);
      expect(sets[1].notes).toBe('Myo-rep 1');
    });

    test('should generate widowmaker sets', () => {
      const sets = generateSetsForProgression('widowmaker');

      expect(sets).toHaveLength(2);
      expect(sets[0].setType).toBe('warmup');
      expect(sets[0].reps).toBe(8);
      expect(sets[1].setType).toBe('failure');
      expect(sets[1].reps).toBe(20);
    });

    test('should generate AMRAP sets', () => {
      const sets = generateSetsForProgression('amrap');

      expect(sets).toHaveLength(3);
      expect(sets[0].setType).toBe('normal');
      expect(sets[0].reps).toBe(8);
      expect(sets[2].setType).toBe('failure');
      expect(sets[2].reps).toBeNull();
      expect(sets[2].notes).toBe('AMRAP - As many reps as possible');
    });

    test('should generate default sets for unknown progression', () => {
      const sets = generateSetsForProgression('unknown' as any);

      expect(sets).toHaveLength(3);
      sets.forEach(set => {
        expect(set.reps).toBe(10);
        expect(set.setType).toBe('normal');
      });
    });
  });

  describe('addApproachSets', () => {
    test('should add approach sets when base weight is available', () => {
      const originalSets: WorkoutSet[] = [
        {
          id: '1',
          setNumber: 1,
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: 100,
          rpe: null,
          notes: '',
        },
      ];

      const result = addApproachSets(originalSets);

      expect(result).toHaveLength(4);
      expect(result[0].setType).toBe('warmup');
      expect(result[0].weight).toBe(40); // 40% of 100
      expect(result[1].weight).toBe(60); // 60% of 100
      expect(result[2].weight).toBe(80); // 80% of 100
      expect(result[3]).toEqual(originalSets[0]); // Original set
    });

    test('should add approach sets with zero weight when no base weight', () => {
      const originalSets: WorkoutSet[] = [
        {
          id: '1',
          setNumber: 1,
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: 0,
          rpe: null,
          notes: '',
        },
      ];

      const result = addApproachSets(originalSets);

      expect(result).toHaveLength(4);
      expect(result[0].weight).toBe(0);
      expect(result[1].weight).toBe(0);
      expect(result[2].weight).toBe(0);
    });

    test('should find weight from first valid set type', () => {
      const originalSets: WorkoutSet[] = [
        {
          id: '1',
          setNumber: 1,
          setType: 'warmup',
          repType: 'fixed',
          reps: 10,
          weight: 50,
          rpe: null,
          notes: '',
        },
        {
          id: '2',
          setNumber: 2,
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: 100,
          rpe: null,
          notes: '',
        },
      ];

      const result = addApproachSets(originalSets);

      expect(result[0].weight).toBe(40); // 40% of 100 (from normal set)
      expect(result[1].weight).toBe(60); // 60% of 100
      expect(result[2].weight).toBe(80); // 80% of 100
    });

    test('should handle empty sets array', () => {
      const result = addApproachSets([]);

      expect(result).toHaveLength(3);
      expect(result[0].weight).toBe(0);
      expect(result[1].weight).toBe(0);
      expect(result[2].weight).toBe(0);
    });

    test('should preserve original set numbers', () => {
      const originalSets: WorkoutSet[] = [
        {
          id: '1',
          setNumber: 1,
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: 100,
          rpe: null,
          notes: '',
        },
      ];

      const result = addApproachSets(originalSets);

      expect(result[0].setNumber).toBe(1);
      expect(result[1].setNumber).toBe(2);
      expect(result[2].setNumber).toBe(3);
      expect(result[3].setNumber).toBe(1); // Original set number preserved
    });
  });
});
