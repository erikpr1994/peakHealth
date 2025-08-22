import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useStrengthWorkoutOperations } from './useStrengthWorkoutOperations';
import type { StrengthWorkout, Exercise, WorkoutSet } from '../types';

describe('useStrengthExerciseOperations', () => {
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
    );

    const exerciseData = {
      name: 'Bench Press',
      category: 'strength',
      muscleGroups: ['chest', 'triceps'],
      equipment: ['barbell', 'bench'],
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
      muscleGroups: ['chest', 'triceps'],
      equipment: ['barbell', 'bench'],
      sets: [],
      restTimer: '',
      restAfter: '',
      notes: '',
      hasApproachSets: false,
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
                muscleGroups: ['chest', 'triceps'],
                equipment: ['barbell', 'bench'],
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
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
                muscleGroups: ['chest', 'triceps'],
                equipment: ['barbell', 'bench'],
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
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
                muscleGroups: ['chest', 'triceps'],
                equipment: ['barbell', 'bench'],
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
    );

    const newSets: WorkoutSet[] = [
      {
        id: 'set-1',
        setNumber: 1,
        setType: 'normal',
        repType: 'fixed',
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
                muscleGroups: ['chest', 'triceps'],
                equipment: ['barbell', 'bench'],
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
    );

    act(() => {
      result.current.updateStrengthRestTimer(
        'workout-1',
        'section-1',
        'exercise-1',
        '2 min'
      );
    });

    expect(
      result.current.strengthWorkouts[0].sections[0].exercises[0].restTimer
    ).toBe('2 min');
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
                muscleGroups: ['chest', 'triceps'],
                equipment: ['barbell', 'bench'],
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
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
                muscleGroups: ['chest', 'triceps'],
                equipment: ['barbell', 'bench'],
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
    );

    act(() => {
      result.current.updateStrengthExerciseEmomReps(
        'workout-1',
        'section-1',
        'exercise-1',
        8
      );
    });

    expect(
      result.current.strengthWorkouts[0].sections[0].exercises[0].emomReps
    ).toBe(8);
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
                muscleGroups: ['chest', 'triceps'],
                equipment: ['barbell', 'bench'],
                sets: [],
                restTimer: '',
                restAfter: '',
                notes: '',
                progressionMethod: 'linear',
              },
            ],
            restAfter: '',
          },
        ],
      },
    ];

    const { result } = renderHook(() =>
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
    );

    act(() => {
      result.current.updateStrengthExerciseProgressionMethod(
        'workout-1',
        'section-1',
        'exercise-1',
        'inverse-pyramid'
      );
    });

    expect(
      result.current.strengthWorkouts[0].sections[0].exercises[0]
        .progressionMethod
    ).toBe('inverse-pyramid');
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
            exercises: [
              {
                id: 'exercise-1',
                name: 'Bench Press',
                category: 'strength',
                muscleGroups: ['chest', 'triceps'],
                equipment: ['barbell', 'bench'],
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
    );

    // Should not throw when trying to update non-existent exercise
    expect(() => {
      act(() => {
        result.current.updateStrengthExerciseName(
          'workout-1',
          'section-1',
          'non-existent',
          'New Name'
        );
      });
    }).not.toThrow();

    // Original exercise should remain unchanged
    expect(
      result.current.strengthWorkouts[0].sections[0].exercises[0].name
    ).toBe('Bench Press');
  });
});
