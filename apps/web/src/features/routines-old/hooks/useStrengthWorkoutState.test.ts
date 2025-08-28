import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useStrengthWorkoutState } from './useStrengthWorkoutState';
import type { StrengthWorkout } from '../types';

describe('useStrengthWorkoutState', () => {
  test('should initialize with empty strength workouts by default', () => {
    const { result } = renderHook(() => useStrengthWorkoutState());

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
      useStrengthWorkoutState({ initialStrengthWorkouts: initialWorkouts })
    );

    expect(result.current.strengthWorkouts).toEqual(initialWorkouts);
  });

  test('should add a new strength workout', () => {
    const { result } = renderHook(() => useStrengthWorkoutState());

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
      useStrengthWorkoutState({ initialStrengthWorkouts: initialWorkouts })
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
      useStrengthWorkoutState({ initialStrengthWorkouts: initialWorkouts })
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
      useStrengthWorkoutState({ initialStrengthWorkouts: initialWorkouts })
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
      useStrengthWorkoutState({ initialStrengthWorkouts: initialWorkouts })
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
      useStrengthWorkoutState({ initialStrengthWorkouts: initialWorkouts })
    );

    act(() => {
      result.current.updateStrengthWorkoutObjective(
        'workout-1',
        'New objective'
      );
    });

    expect(result.current.strengthWorkouts[0].objective).toBe('New objective');
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
      useStrengthWorkoutState({ initialStrengthWorkouts: initialWorkouts })
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

  test('should handle non-existent workout IDs gracefully', () => {
    const { result } = renderHook(() => useStrengthWorkoutState());

    act(() => {
      result.current.removeStrengthWorkout('non-existent');
    });

    expect(result.current.strengthWorkouts).toEqual([]);
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
      useStrengthWorkoutState({ initialStrengthWorkouts: initialWorkouts })
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
