import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useState } from 'react';
import { useRunningExerciseOperations } from './useRunningExerciseOperations';
import type { RunningWorkout, Exercise, WorkoutSet } from '../types';

describe('useRunningExerciseOperations', () => {
  test('should add a new running exercise', () => {
    const initialWorkouts: RunningWorkout[] = [
      {
        id: 'workout-1',
        name: 'Test Workout',
        type: 'running',
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

    const { result } = renderHook(() => {
      const [workouts, setWorkouts] =
        useState<RunningWorkout[]>(initialWorkouts);
      const operations = useRunningExerciseOperations(setWorkouts);
      return { workouts, operations };
    });

    const exerciseData = {
      name: 'Sprint Intervals',
      category: 'cardio',
      muscleGroups: ['legs', 'cardiovascular'],
      equipment: ['none'],
    };

    act(() => {
      result.current.operations.addRunningExercise(
        'workout-1',
        'section-1',
        exerciseData
      );
    });

    expect(result.current.workouts[0].sections[0].exercises).toHaveLength(1);
    expect(result.current.workouts[0].sections[0].exercises[0]).toMatchObject({
      name: 'Sprint Intervals',
      category: 'cardio',
      muscleGroups: ['legs', 'cardiovascular'],
      equipment: ['none'],
      sets: [],
      restTimer: '',
      restAfter: '',
      notes: '',
      hasApproachSets: false,
    });
    expect(result.current.workouts[0].sections[0].exercises[0].id).toMatch(
      /^exercise-\d+$/
    );
  });

  test('should remove a running exercise', () => {
    const initialWorkouts: RunningWorkout[] = [
      {
        id: 'workout-1',
        name: 'Test Workout',
        type: 'running',
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
                name: 'Sprint Intervals',
                category: 'cardio',
                muscleGroups: ['legs', 'cardiovascular'],
                equipment: ['none'],
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

    const { result } = renderHook(() => {
      const [workouts, setWorkouts] =
        useState<RunningWorkout[]>(initialWorkouts);
      const operations = useRunningExerciseOperations(setWorkouts);
      return { workouts, operations };
    });

    act(() => {
      result.current.operations.removeRunningExercise(
        'workout-1',
        'section-1',
        'exercise-1'
      );
    });

    expect(result.current.workouts[0].sections[0].exercises).toHaveLength(0);
  });

  test('should update running exercise name', () => {
    const initialWorkouts: RunningWorkout[] = [
      {
        id: 'workout-1',
        name: 'Test Workout',
        type: 'running',
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
                category: 'cardio',
                muscleGroups: ['legs', 'cardiovascular'],
                equipment: ['none'],
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

    const { result } = renderHook(() => {
      const [workouts, setWorkouts] =
        useState<RunningWorkout[]>(initialWorkouts);
      const operations = useRunningExerciseOperations(setWorkouts);
      return { workouts, operations };
    });

    act(() => {
      result.current.operations.updateRunningExerciseName(
        'workout-1',
        'section-1',
        'exercise-1',
        'New Name'
      );
    });

    expect(result.current.workouts[0].sections[0].exercises[0].name).toBe(
      'New Name'
    );
  });

  test('should update running exercise sets', () => {
    const initialWorkouts: RunningWorkout[] = [
      {
        id: 'workout-1',
        name: 'Test Workout',
        type: 'running',
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
                name: 'Sprint Intervals',
                category: 'cardio',
                muscleGroups: ['legs', 'cardiovascular'],
                equipment: ['none'],
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

    const { result } = renderHook(() => {
      const [workouts, setWorkouts] =
        useState<RunningWorkout[]>(initialWorkouts);
      const operations = useRunningExerciseOperations(setWorkouts);
      return { workouts, operations };
    });

    const newSets: WorkoutSet[] = [
      {
        id: 'set-1',
        setNumber: 1,
        setType: 'normal',
        repType: 'fixed',
        reps: 10,
        weight: 0,
        rpe: null,
        notes: '',
      },
    ];

    act(() => {
      result.current.operations.updateRunningExerciseSets(
        'workout-1',
        'section-1',
        'exercise-1',
        newSets
      );
    });

    expect(result.current.workouts[0].sections[0].exercises[0].sets).toEqual(
      newSets
    );
  });

  test('should update running exercise rest timer', () => {
    const initialWorkouts: RunningWorkout[] = [
      {
        id: 'workout-1',
        name: 'Test Workout',
        type: 'running',
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
                name: 'Sprint Intervals',
                category: 'cardio',
                muscleGroups: ['legs', 'cardiovascular'],
                equipment: ['none'],
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

    const { result } = renderHook(() => {
      const [workouts, setWorkouts] =
        useState<RunningWorkout[]>(initialWorkouts);
      const operations = useRunningExerciseOperations(setWorkouts);
      return { workouts, operations };
    });

    act(() => {
      result.current.operations.updateRunningRestTimer(
        'workout-1',
        'section-1',
        'exercise-1',
        '2 min'
      );
    });

    expect(result.current.workouts[0].sections[0].exercises[0].restTimer).toBe(
      '2 min'
    );
  });

  test('should update running exercise rest after', () => {
    const initialWorkouts: RunningWorkout[] = [
      {
        id: 'workout-1',
        name: 'Test Workout',
        type: 'running',
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
                name: 'Sprint Intervals',
                category: 'cardio',
                muscleGroups: ['legs', 'cardiovascular'],
                equipment: ['none'],
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

    const { result } = renderHook(() => {
      const [workouts, setWorkouts] =
        useState<RunningWorkout[]>(initialWorkouts);
      const operations = useRunningExerciseOperations(setWorkouts);
      return { workouts, operations };
    });

    act(() => {
      result.current.operations.updateRunningExerciseRestAfter(
        'workout-1',
        'section-1',
        'exercise-1',
        '3 min'
      );
    });

    expect(result.current.workouts[0].sections[0].exercises[0].restAfter).toBe(
      '3 min'
    );
  });

  test('should update running exercise emom reps', () => {
    const initialWorkouts: RunningWorkout[] = [
      {
        id: 'workout-1',
        name: 'Test Workout',
        type: 'running',
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
                name: 'Sprint Intervals',
                category: 'cardio',
                muscleGroups: ['legs', 'cardiovascular'],
                equipment: ['none'],
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

    const { result } = renderHook(() => {
      const [workouts, setWorkouts] =
        useState<RunningWorkout[]>(initialWorkouts);
      const operations = useRunningExerciseOperations(setWorkouts);
      return { workouts, operations };
    });

    act(() => {
      result.current.operations.updateRunningExerciseEmomReps(
        'workout-1',
        'section-1',
        'exercise-1',
        8
      );
    });

    expect(result.current.workouts[0].sections[0].exercises[0].emomReps).toBe(
      8
    );
  });

  test('should handle non-existent exercise IDs gracefully', () => {
    const initialWorkouts: RunningWorkout[] = [
      {
        id: 'workout-1',
        name: 'Test Workout',
        type: 'running',
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
                name: 'Sprint Intervals',
                category: 'cardio',
                muscleGroups: ['legs', 'cardiovascular'],
                equipment: ['none'],
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

    const { result } = renderHook(() => {
      const [workouts, setWorkouts] =
        useState<RunningWorkout[]>(initialWorkouts);
      const operations = useRunningExerciseOperations(setWorkouts);
      return { workouts, operations };
    });

    // Should not throw when trying to update non-existent exercise
    expect(() => {
      act(() => {
        result.current.operations.updateRunningExerciseName(
          'workout-1',
          'section-1',
          'non-existent',
          'New Name'
        );
      });
    }).not.toThrow();

    // Original exercise should remain unchanged
    expect(result.current.workouts[0].sections[0].exercises[0].name).toBe(
      'Sprint Intervals'
    );
  });
});
