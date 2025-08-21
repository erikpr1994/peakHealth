import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useStrengthWorkoutOperations } from './useStrengthWorkoutOperations';
import type {
  StrengthWorkout,
  WorkoutSection,
  Exercise,
  ProgressionMethod,
} from '../types';

describe('useStrengthWorkoutOperations', () => {
  test('should initialize with empty strength workouts by default', () => {
    const { result } = renderHook(() => useStrengthWorkoutOperations());

    expect(result.current.strengthWorkouts).toEqual([]);
  });

  test('should initialize with provided strength workouts', () => {
    const initialWorkouts: StrengthWorkout[] = [
      {
        id: 'workout-1',
        name: 'Test Workout',
        type: 'strength',
        objective: 'Test objective',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['monday'],
          time: 'morning',
        },
        sections: [],
      },
    ];

    const { result } = renderHook(() =>
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
    );

    expect(result.current.strengthWorkouts).toEqual(initialWorkouts);
  });

  describe('Strength Workout Operations', () => {
    test('should add a new strength workout', () => {
      const { result } = renderHook(() => useStrengthWorkoutOperations());

      act(() => {
        result.current.addStrengthWorkout();
      });

      expect(result.current.strengthWorkouts).toHaveLength(1);
      expect(result.current.strengthWorkouts[0]).toMatchObject({
        name: 'New Strength Workout',
        type: 'strength',
        objective: '',
        sections: [],
      });
      expect(result.current.strengthWorkouts[0].id).toMatch(/^strength-\d+$/);
    });

    test('should remove a strength workout', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: 'Test objective',
          schedule: {
            repeatPattern: 'weekly',
            repeatValue: '1',
            selectedDays: ['monday'],
            time: 'morning',
          },
          sections: [],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.removeStrengthWorkout('workout-1');
      });

      expect(result.current.strengthWorkouts).toHaveLength(0);
    });

    test('should move strength workout up', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'First Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [],
        },
        {
          id: 'workout-2',
          name: 'Second Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.moveStrengthWorkout('workout-2', 'up');
      });

      expect(result.current.strengthWorkouts[0].id).toBe('workout-2');
      expect(result.current.strengthWorkouts[1].id).toBe('workout-1');
    });

    test('should move strength workout down', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'First Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [],
        },
        {
          id: 'workout-2',
          name: 'Second Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.moveStrengthWorkout('workout-1', 'down');
      });

      expect(result.current.strengthWorkouts[0].id).toBe('workout-2');
      expect(result.current.strengthWorkouts[1].id).toBe('workout-1');
    });

    test('should update strength workout name', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Old Name',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthWorkoutName('workout-1', 'New Name');
      });

      expect(result.current.strengthWorkouts[0].name).toBe('New Name');
    });

    test('should update strength workout objective', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: 'Old objective',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthWorkoutObjective(
          'workout-1',
          'New objective'
        );
      });

      expect(result.current.strengthWorkouts[0].objective).toBe(
        'New objective'
      );
    });

    test('should update strength workout schedule', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthWorkoutSchedule(
          'workout-1',
          'repeatPattern',
          'weekly'
        );
      });

      expect(result.current.strengthWorkouts[0].schedule.repeatPattern).toBe(
        'weekly'
      );
    });
  });

  describe('Strength Section Operations', () => {
    test('should add a new strength section', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.addStrengthSection('workout-1');
      });

      expect(result.current.strengthWorkouts[0].sections).toHaveLength(1);
      expect(result.current.strengthWorkouts[0].sections[0]).toMatchObject({
        name: 'New Section',
        type: 'basic',
        exercises: [],
        restAfter: '',
      });
      expect(result.current.strengthWorkouts[0].sections[0].id).toMatch(
        /^section-\d+$/
      );
    });

    test('should remove a strength section', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.removeStrengthSection('workout-1', 'section-1');
      });

      expect(result.current.strengthWorkouts[0].sections).toHaveLength(0);
    });

    test('should update strength section name', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Old Name',
              type: 'basic',
              exercises: [],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthSectionName(
          'workout-1',
          'section-1',
          'New Name'
        );
      });

      expect(result.current.strengthWorkouts[0].sections[0].name).toBe(
        'New Name'
      );
    });

    test('should update strength section type', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthSectionType(
          'workout-1',
          'section-1',
          'warmup'
        );
      });

      expect(result.current.strengthWorkouts[0].sections[0].type).toBe(
        'warmup'
      );
    });

    test('should update strength section rest after', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthSectionRestAfter(
          'workout-1',
          'section-1',
          '3 min'
        );
      });

      expect(result.current.strengthWorkouts[0].sections[0].restAfter).toBe(
        '3 min'
      );
    });

    test('should update strength section emom duration', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthSectionEmomDuration(
          'workout-1',
          'section-1',
          10
        );
      });

      expect(result.current.strengthWorkouts[0].sections[0].emomDuration).toBe(
        10
      );
    });
  });

  describe('Strength Exercise Operations', () => {
    test('should add a new strength exercise', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      const exerciseData: Partial<Exercise> = {
        name: 'Bench Press',
        category: 'strength',
        muscleGroups: ['chest'],
      };

      act(() => {
        result.current.addStrengthExercise(
          'workout-1',
          'section-1',
          exerciseData
        );
      });

      expect(
        result.current.strengthWorkouts[0].sections[0].exercises
      ).toHaveLength(1);
      expect(
        result.current.strengthWorkouts[0].sections[0].exercises[0]
      ).toMatchObject({
        name: 'Bench Press',
        category: 'strength',
        muscleGroups: ['chest'],
      });
      expect(
        result.current.strengthWorkouts[0].sections[0].exercises[0].id
      ).toMatch(/^exercise-\d+$/);
    });

    test('should remove a strength exercise', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  exerciseId: 'ex-1',
                  variantId: 'var-1',
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.removeStrengthExercise(
          'workout-1',
          'section-1',
          'exercise-1'
        );
      });

      expect(
        result.current.strengthWorkouts[0].sections[0].exercises
      ).toHaveLength(0);
    });

    test('should update strength exercise name', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Old Name',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  exerciseId: 'ex-1',
                  variantId: 'var-1',
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthExerciseName(
          'workout-1',
          'section-1',
          'exercise-1',
          'New Name'
        );
      });

      expect(
        result.current.strengthWorkouts[0].sections[0].exercises[0].name
      ).toBe('New Name');
    });

    test('should update strength exercise sets', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  exerciseId: 'ex-1',
                  variantId: 'var-1',
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      const newSets = [
        {
          id: 'set-1',
          setNumber: 1,
          setType: 'normal' as const,
          repType: 'fixed' as const,
          reps: 10,
          weight: 100,
          rpe: null,
          notes: '',
        },
      ];

      act(() => {
        result.current.updateStrengthExerciseSets(
          'workout-1',
          'section-1',
          'exercise-1',
          newSets
        );
      });

      expect(
        result.current.strengthWorkouts[0].sections[0].exercises[0].sets
      ).toEqual(newSets);
    });

    test('should update strength exercise rest timer', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  exerciseId: 'ex-1',
                  variantId: 'var-1',
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthRestTimer(
          'workout-1',
          'section-1',
          'exercise-1',
          '90s'
        );
      });

      expect(
        result.current.strengthWorkouts[0].sections[0].exercises[0].restTimer
      ).toBe('90s');
    });

    test('should update strength exercise rest after', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  exerciseId: 'ex-1',
                  variantId: 'var-1',
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthExerciseRestAfter(
          'workout-1',
          'section-1',
          'exercise-1',
          '3 min'
        );
      });

      expect(
        result.current.strengthWorkouts[0].sections[0].exercises[0].restAfter
      ).toBe('3 min');
    });

    test('should update strength exercise emom reps', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  exerciseId: 'ex-1',
                  variantId: 'var-1',
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthExerciseEmomReps(
          'workout-1',
          'section-1',
          'exercise-1',
          15
        );
      });

      expect(
        result.current.strengthWorkouts[0].sections[0].exercises[0].emomReps
      ).toBe(15);
    });

    test('should update strength exercise progression method', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  exerciseId: 'ex-1',
                  variantId: 'var-1',
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateStrengthExerciseProgressionMethod(
          'workout-1',
          'section-1',
          'exercise-1',
          'linear'
        );
      });

      expect(
        result.current.strengthWorkouts[0].sections[0].exercises[0]
          .progressionMethod
      ).toBe('linear');
    });
  });

  describe('Edge Cases', () => {
    test('should handle non-existent workout IDs gracefully', () => {
      const { result } = renderHook(() => useStrengthWorkoutOperations());

      act(() => {
        result.current.removeStrengthWorkout('non-existent');
      });

      expect(result.current.strengthWorkouts).toEqual([]);
    });

    test('should handle non-existent section IDs gracefully', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.removeStrengthSection('workout-1', 'non-existent');
      });

      expect(result.current.strengthWorkouts[0].sections).toEqual([]);
    });

    test('should handle non-existent exercise IDs gracefully', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'basic',
              exercises: [],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.removeStrengthExercise(
          'workout-1',
          'section-1',
          'non-existent'
        );
      });

      expect(result.current.strengthWorkouts[0].sections[0].exercises).toEqual(
        []
      );
    });

    test('should handle move operations on first/last items gracefully', () => {
      const initialWorkouts: StrengthWorkout[] = [
        {
          id: 'workout-1',
          name: 'First Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [],
        },
        {
          id: 'workout-2',
          name: 'Second Workout',
          type: 'strength',
          objective: '',
          schedule: {
            repeatPattern: '',
            repeatValue: '',
            selectedDays: [],
            time: '',
          },
          sections: [],
        },
      ];

      const { result } = renderHook(() =>
        useStrengthWorkoutOperations({
          initialStrengthWorkouts: initialWorkouts,
        })
      );

      // Try to move first item up (should not change order)
      act(() => {
        result.current.moveStrengthWorkout('workout-1', 'up');
      });

      expect(result.current.strengthWorkouts[0].id).toBe('workout-1');
      expect(result.current.strengthWorkouts[1].id).toBe('workout-2');

      // Try to move last item down (should not change order)
      act(() => {
        result.current.moveStrengthWorkout('workout-2', 'down');
      });

      expect(result.current.strengthWorkouts[0].id).toBe('workout-1');
      expect(result.current.strengthWorkouts[1].id).toBe('workout-2');
    });
  });
});
