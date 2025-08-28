import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useRunningWorkoutOperations } from './useRunningWorkoutOperations';
import type { RunningWorkout, Exercise, WorkoutSet } from '../types';

describe('useRunningWorkoutOperations', () => {
  test('should initialize with empty running workouts by default', () => {
    const { result } = renderHook(() => useRunningWorkoutOperations());

    expect(result.current.runningWorkouts).toEqual([]);
  });

  test('should initialize with provided running workouts', () => {
    const initialWorkouts: RunningWorkout[] = [
      {
        id: 'workout-1',
        name: 'Test Running Workout',
        type: 'running',
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
      useRunningWorkoutOperations({ initialRunningWorkouts: initialWorkouts })
    );

    expect(result.current.runningWorkouts).toEqual(initialWorkouts);
  });

  describe('Running Workout Operations', () => {
    test('should add a new running workout', () => {
      const { result } = renderHook(() => useRunningWorkoutOperations());

      act(() => {
        result.current.addRunningWorkout();
      });

      expect(result.current.runningWorkouts).toHaveLength(1);
      expect(result.current.runningWorkouts[0]).toMatchObject({
        name: 'New Running Workout',
        type: 'running',
        objective: '',
        sections: [],
      });
      expect(result.current.runningWorkouts[0].id).toMatch(/^running-\d+$/);
    });

    test('should remove a running workout', () => {
      const initialWorkouts: RunningWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Running Workout',
          type: 'running',
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
        useRunningWorkoutOperations({
          initialRunningWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.removeRunningWorkout('workout-1');
      });

      expect(result.current.runningWorkouts).toHaveLength(0);
    });

    test('should move running workout up', () => {
      const initialWorkouts: RunningWorkout[] = [
        {
          id: 'workout-1',
          name: 'First Running Workout',
          type: 'running',
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
          name: 'Second Running Workout',
          type: 'running',
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
        useRunningWorkoutOperations({
          initialRunningWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.moveRunningWorkout('workout-2', 'up');
      });

      expect(result.current.runningWorkouts[0].id).toBe('workout-2');
      expect(result.current.runningWorkouts[1].id).toBe('workout-1');
    });

    test('should update running workout name', () => {
      const initialWorkouts: RunningWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Running Workout',
          type: 'running',
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
        useRunningWorkoutOperations({
          initialRunningWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateRunningWorkoutName('workout-1', 'Updated Name');
      });

      expect(result.current.runningWorkouts[0].name).toBe('Updated Name');
    });

    test('should update running workout objective', () => {
      const initialWorkouts: RunningWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Running Workout',
          type: 'running',
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
        useRunningWorkoutOperations({
          initialRunningWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateRunningWorkoutObjective(
          'workout-1',
          'New Objective'
        );
      });

      expect(result.current.runningWorkouts[0].objective).toBe('New Objective');
    });

    test('should update running workout schedule', () => {
      const initialWorkouts: RunningWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Running Workout',
          type: 'running',
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
        useRunningWorkoutOperations({
          initialRunningWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.updateRunningWorkoutSchedule(
          'workout-1',
          'time',
          'evening'
        );
      });

      expect(result.current.runningWorkouts[0].schedule.time).toBe('evening');
    });
  });

  describe('Running Section Operations', () => {
    test('should add a new running section', () => {
      const initialWorkouts: RunningWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Running Workout',
          type: 'running',
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
        useRunningWorkoutOperations({
          initialRunningWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.addRunningSection('workout-1');
      });

      expect(result.current.runningWorkouts[0].sections).toHaveLength(1);
      expect(result.current.runningWorkouts[0].sections[0]).toMatchObject({
        name: 'New Section',
        type: 'basic',
        exercises: [],
        restAfter: '',
      });
      expect(result.current.runningWorkouts[0].sections[0].id).toMatch(
        /^section-\d+$/
      );
    });

    test('should remove a running section', () => {
      const initialWorkouts: RunningWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Running Workout',
          type: 'running',
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
              name: 'Test Section',
              type: 'basic',
              exercises: [],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useRunningWorkoutOperations({
          initialRunningWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.removeRunningSection('workout-1', 'section-1');
      });

      expect(result.current.runningWorkouts[0].sections).toHaveLength(0);
    });
  });

  describe('Running Exercise Operations', () => {
    test('should add a new running exercise', () => {
      const initialWorkouts: RunningWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Running Workout',
          type: 'running',
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
              name: 'Test Section',
              type: 'basic',
              exercises: [],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useRunningWorkoutOperations({
          initialRunningWorkouts: initialWorkouts,
        })
      );

      const exerciseData: Partial<Exercise> = {
        name: 'Test Exercise',
        category: 'cardio',
      };

      act(() => {
        result.current.addRunningExercise(
          'workout-1',
          'section-1',
          exerciseData
        );
      });

      expect(
        result.current.runningWorkouts[0].sections[0].exercises
      ).toHaveLength(1);
      expect(
        result.current.runningWorkouts[0].sections[0].exercises[0]
      ).toMatchObject({
        name: 'Test Exercise',
        category: 'cardio',
      });
      expect(
        result.current.runningWorkouts[0].sections[0].exercises[0].id
      ).toMatch(/^exercise-\d+$/);
    });

    test('should remove a running exercise', () => {
      const initialWorkouts: RunningWorkout[] = [
        {
          id: 'workout-1',
          name: 'Test Running Workout',
          type: 'running',
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
              name: 'Test Section',
              type: 'basic',
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Test Exercise',
                  category: 'cardio',
                  muscleGroups: [],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                },
              ],
              restAfter: '',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useRunningWorkoutOperations({
          initialRunningWorkouts: initialWorkouts,
        })
      );

      act(() => {
        result.current.removeRunningExercise(
          'workout-1',
          'section-1',
          'exercise-1'
        );
      });

      expect(
        result.current.runningWorkouts[0].sections[0].exercises
      ).toHaveLength(0);
    });
  });
});
