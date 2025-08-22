import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useStrengthWorkoutOperations } from './useStrengthWorkoutOperations';
import type { StrengthWorkout, WorkoutSection } from '../types';

describe('useStrengthSectionOperations', () => {
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
    );

    act(() => {
      result.current.updateStrengthSectionType(
        'workout-1',
        'section-1',
        'warmup'
      );
    });

    expect(result.current.strengthWorkouts[0].sections[0].type).toBe('warmup');
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
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
      useStrengthWorkoutOperations({ initialStrengthWorkouts: initialWorkouts })
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
