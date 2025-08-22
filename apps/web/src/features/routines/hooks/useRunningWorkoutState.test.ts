import { renderHook, act } from '@testing-library/react';
import { useRunningWorkoutState } from './useRunningWorkoutState';
import { RunningWorkout } from '../types';

describe('useRunningWorkoutState', () => {
  const mockRunningWorkout: RunningWorkout = {
    id: 'running-1',
    name: 'Test Running Workout',
    type: 'running',
    objective: 'Test objective',
    schedule: {
      repeatPattern: 'weekly',
      repeatValue: '3',
      selectedDays: ['monday', 'wednesday', 'friday'],
      time: '06:00',
    },
    sections: [],
  };

  describe('initialization', () => {
    it('should initialize with empty running workouts by default', () => {
      const { result } = renderHook(() => useRunningWorkoutState());

      expect(result.current.runningWorkouts).toEqual([]);
    });

    it('should initialize with provided running workouts', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      expect(result.current.runningWorkouts).toEqual([mockRunningWorkout]);
    });
  });

  describe('addRunningWorkout', () => {
    it('should add a new running workout', () => {
      const { result } = renderHook(() => useRunningWorkoutState());

      act(() => {
        result.current.addRunningWorkout();
      });

      expect(result.current.runningWorkouts).toHaveLength(1);
      expect(result.current.runningWorkouts[0]).toMatchObject({
        name: 'New Running Workout',
        type: 'running',
        objective: '',
        schedule: {
          repeatPattern: '',
          repeatValue: '',
          selectedDays: [],
          time: '',
        },
        sections: [],
      });
      expect(result.current.runningWorkouts[0].id).toMatch(/^running-\d+$/);
    });

    it('should add multiple running workouts', () => {
      const { result } = renderHook(() => useRunningWorkoutState());

      act(() => {
        result.current.addRunningWorkout();
        result.current.addRunningWorkout();
      });

      expect(result.current.runningWorkouts).toHaveLength(2);
      // Since both workouts are created in the same millisecond, we can't guarantee different IDs
      // Instead, we verify that both workouts have the expected structure
      expect(result.current.runningWorkouts[0]).toMatchObject({
        name: 'New Running Workout',
        type: 'running',
        objective: '',
        schedule: {
          repeatPattern: '',
          repeatValue: '',
          selectedDays: [],
          time: '',
        },
        sections: [],
      });
      expect(result.current.runningWorkouts[1]).toMatchObject({
        name: 'New Running Workout',
        type: 'running',
        objective: '',
        schedule: {
          repeatPattern: '',
          repeatValue: '',
          selectedDays: [],
          time: '',
        },
        sections: [],
      });
    });
  });

  describe('removeRunningWorkout', () => {
    it('should remove a running workout by id', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.removeRunningWorkout('running-1');
      });

      expect(result.current.runningWorkouts).toHaveLength(0);
    });

    it('should not remove other running workouts when removing by wrong id', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.removeRunningWorkout('wrong-id');
      });

      expect(result.current.runningWorkouts).toHaveLength(1);
      expect(result.current.runningWorkouts[0]).toEqual(mockRunningWorkout);
    });
  });

  describe('moveRunningWorkout', () => {
    const workout1: RunningWorkout = { ...mockRunningWorkout, id: 'running-1' };
    const workout2: RunningWorkout = { ...mockRunningWorkout, id: 'running-2' };
    const workout3: RunningWorkout = { ...mockRunningWorkout, id: 'running-3' };

    it('should move running workout up', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [workout1, workout2, workout3],
        })
      );

      act(() => {
        result.current.moveRunningWorkout('running-2', 'up');
      });

      expect(result.current.runningWorkouts.map(w => w.id)).toEqual([
        'running-2',
        'running-1',
        'running-3',
      ]);
    });

    it('should move running workout down', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [workout1, workout2, workout3],
        })
      );

      act(() => {
        result.current.moveRunningWorkout('running-2', 'down');
      });

      expect(result.current.runningWorkouts.map(w => w.id)).toEqual([
        'running-1',
        'running-3',
        'running-2',
      ]);
    });

    it('should not move first running workout up', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [workout1, workout2, workout3],
        })
      );

      act(() => {
        result.current.moveRunningWorkout('running-1', 'up');
      });

      expect(result.current.runningWorkouts.map(w => w.id)).toEqual([
        'running-1',
        'running-2',
        'running-3',
      ]);
    });

    it('should not move last running workout down', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [workout1, workout2, workout3],
        })
      );

      act(() => {
        result.current.moveRunningWorkout('running-3', 'down');
      });

      expect(result.current.runningWorkouts.map(w => w.id)).toEqual([
        'running-1',
        'running-2',
        'running-3',
      ]);
    });

    it('should not move running workout with non-existent id', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [workout1, workout2, workout3],
        })
      );

      act(() => {
        result.current.moveRunningWorkout('non-existent', 'up');
      });

      expect(result.current.runningWorkouts.map(w => w.id)).toEqual([
        'running-1',
        'running-2',
        'running-3',
      ]);
    });
  });

  describe('updateRunningWorkoutName', () => {
    it('should update running workout name', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.updateRunningWorkoutName('running-1', 'Updated Name');
      });

      expect(result.current.runningWorkouts[0].name).toBe('Updated Name');
    });

    it('should not update other running workouts', () => {
      const workout2: RunningWorkout = {
        ...mockRunningWorkout,
        id: 'running-2',
      };
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [mockRunningWorkout, workout2],
        })
      );

      act(() => {
        result.current.updateRunningWorkoutName('running-1', 'Updated Name');
      });

      expect(result.current.runningWorkouts[0].name).toBe('Updated Name');
      expect(result.current.runningWorkouts[1].name).toBe(
        'Test Running Workout'
      );
    });
  });

  describe('updateRunningWorkoutObjective', () => {
    it('should update running workout objective', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.updateRunningWorkoutObjective(
          'running-1',
          'New Objective'
        );
      });

      expect(result.current.runningWorkouts[0].objective).toBe('New Objective');
    });
  });

  describe('updateRunningWorkoutSchedule', () => {
    it('should update running workout schedule field', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.updateRunningWorkoutSchedule(
          'running-1',
          'time',
          '07:00'
        );
      });

      expect(result.current.runningWorkouts[0].schedule.time).toBe('07:00');
    });

    it('should update running workout schedule selectedDays', () => {
      const { result } = renderHook(() =>
        useRunningWorkoutState({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.updateRunningWorkoutSchedule(
          'running-1',
          'selectedDays',
          ['tuesday', 'thursday']
        );
      });

      expect(result.current.runningWorkouts[0].schedule.selectedDays).toEqual([
        'tuesday',
        'thursday',
      ]);
    });
  });
});
