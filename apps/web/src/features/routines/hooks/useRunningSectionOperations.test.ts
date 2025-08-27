import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useState } from 'react';
import { useRunningSectionOperations } from './useRunningSectionOperations';
import { RunningWorkout } from '../types';

describe('useRunningSectionOperations', () => {
  test('should add a new running section', () => {
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
        sections: [],
      },
    ];

    const { result } = renderHook(() => {
      const [workouts, setWorkouts] =
        useState<RunningWorkout[]>(initialWorkouts);
      const operations = useRunningSectionOperations(setWorkouts);
      return { workouts, operations };
    });

    act(() => {
      result.current.operations.addRunningSection('workout-1');
    });

    expect(result.current.workouts[0].sections).toHaveLength(1);
    expect(result.current.workouts[0].sections[0]).toMatchObject({
      name: 'New Section',
      type: 'basic',
      exercises: [],
      restAfter: '',
    });
    expect(result.current.workouts[0].sections[0].id).toMatch(/^section-\d+$/);
  });

  test('should remove a running section', () => {
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
      const operations = useRunningSectionOperations(setWorkouts);
      return { workouts, operations };
    });

    act(() => {
      result.current.operations.removeRunningSection('workout-1', 'section-1');
    });

    expect(result.current.workouts[0].sections).toHaveLength(0);
  });

  test('should update running section name', () => {
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
            name: 'Old Name',
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
      const operations = useRunningSectionOperations(setWorkouts);
      return { workouts, operations };
    });

    act(() => {
      result.current.operations.updateRunningSectionName(
        'workout-1',
        'section-1',
        'New Name'
      );
    });

    expect(result.current.workouts[0].sections[0].name).toBe('New Name');
  });

  test('should update running section type', () => {
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
      const operations = useRunningSectionOperations(setWorkouts);
      return { workouts, operations };
    });

    act(() => {
      result.current.operations.updateRunningSectionType(
        'workout-1',
        'section-1',
        'warmup'
      );
    });

    expect(result.current.workouts[0].sections[0].type).toBe('warmup');
  });

  test('should update running section rest after', () => {
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
      const operations = useRunningSectionOperations(setWorkouts);
      return { workouts, operations };
    });

    act(() => {
      result.current.operations.updateRunningSectionRestAfter(
        'workout-1',
        'section-1',
        '2:30'
      );
    });

    expect(result.current.workouts[0].sections[0].restAfter).toBe('2:30');
  });
});
