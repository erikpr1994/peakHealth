import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useWorkoutOperations } from './useWorkoutOperations';
import { StrengthWorkout, RunningWorkout } from '../types';

// Mock the specialized hooks
vi.mock('./useStrengthExerciseOperations', () => ({
  useStrengthExerciseOperations: vi.fn(() => ({
    addStrengthExercise: vi.fn(),
    removeStrengthExercise: vi.fn(),
    updateStrengthExerciseName: vi.fn(),
    updateStrengthExerciseSets: vi.fn(),
    updateStrengthRestTimer: vi.fn(),
    updateStrengthExerciseRestAfter: vi.fn(),
    updateStrengthExerciseEmomReps: vi.fn(),
    updateStrengthExerciseProgressionMethod: vi.fn(),
  })),
}));

vi.mock('./useRunningExerciseOperations', () => ({
  useRunningExerciseOperations: vi.fn(() => ({
    addRunningExercise: vi.fn(),
    removeRunningExercise: vi.fn(),
    updateRunningExerciseName: vi.fn(),
    updateRunningExerciseSets: vi.fn(),
    updateRunningRestTimer: vi.fn(),
    updateRunningExerciseRestAfter: vi.fn(),
    updateRunningExerciseEmomReps: vi.fn(),
  })),
}));

describe('useWorkoutOperations', () => {
  const mockStrengthWorkout: StrengthWorkout = {
    id: 'strength-1',
    name: 'Test Strength Workout',
    type: 'strength',
    objective: 'Build muscle',
    schedule: {
      repeatPattern: 'weekly',
      repeatValue: '1',
      selectedDays: ['monday', 'wednesday'],
      time: 'morning',
    },
    sections: [
      {
        id: 'section-1',
        name: 'Warm Up',
        type: 'basic',
        exercises: [],
        restAfter: '',
        emomDuration: 0,
      },
    ],
  };

  const mockRunningWorkout: RunningWorkout = {
    id: 'running-1',
    name: 'Test Running Workout',
    type: 'running',
    objective: 'Improve endurance',
    schedule: {
      repeatPattern: 'weekly',
      repeatValue: '1',
      selectedDays: ['tuesday', 'thursday'],
      time: 'afternoon',
    },
    sections: [
      {
        id: 'section-1',
        name: 'Warm Up',
        type: 'basic',
        exercises: [],
        restAfter: '',
        emomDuration: 0,
      },
    ],
  };

  describe('initialization', () => {
    it('should initialize with empty arrays by default', () => {
      const { result } = renderHook(() => useWorkoutOperations());

      expect(result.current.strengthWorkouts).toEqual([]);
      expect(result.current.runningWorkouts).toEqual([]);
    });

    it('should initialize with provided workouts', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      expect(result.current.strengthWorkouts).toEqual([mockStrengthWorkout]);
      expect(result.current.runningWorkouts).toEqual([mockRunningWorkout]);
    });
  });

  describe('strength workout operations', () => {
    it('should add a new strength workout', () => {
      const { result } = renderHook(() => useWorkoutOperations());

      act(() => {
        result.current.addStrengthWorkout();
      });

      expect(result.current.strengthWorkouts).toHaveLength(1);
      expect(result.current.strengthWorkouts[0]).toMatchObject({
        name: 'New Strength Workout',
        type: 'strength',
        objective: '',
        schedule: {
          repeatPattern: '',
          repeatValue: '',
          selectedDays: [],
          time: '',
        },
        sections: [],
      });
      expect(result.current.strengthWorkouts[0].id).toMatch(/^strength-\d+$/);
    });

    it('should remove a strength workout', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
        })
      );

      act(() => {
        result.current.removeStrengthWorkout('strength-1');
      });

      expect(result.current.strengthWorkouts).toHaveLength(0);
    });

    it('should update strength workout name', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
        })
      );

      act(() => {
        result.current.updateStrengthWorkoutName('strength-1', 'Updated Name');
      });

      expect(result.current.strengthWorkouts[0].name).toBe('Updated Name');
    });

    it('should update strength workout objective', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
        })
      );

      act(() => {
        result.current.updateStrengthWorkoutObjective(
          'strength-1',
          'New Objective'
        );
      });

      expect(result.current.strengthWorkouts[0].objective).toBe(
        'New Objective'
      );
    });

    it('should update strength workout schedule days', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
        })
      );

      act(() => {
        result.current.updateStrengthWorkoutSchedule(
          'strength-1',
          'selectedDays',
          ['friday']
        );
      });

      expect(result.current.strengthWorkouts[0].schedule.selectedDays).toEqual([
        'friday',
      ]);
    });

    it('should update strength workout schedule time', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
        })
      );

      act(() => {
        result.current.updateStrengthWorkoutSchedule(
          'strength-1',
          'time',
          'evening'
        );
      });

      expect(result.current.strengthWorkouts[0].schedule.time).toBe('evening');
    });

    it('should move strength workout up', () => {
      const workout1 = {
        ...mockStrengthWorkout,
        id: 'strength-1',
        name: 'First',
      };
      const workout2 = {
        ...mockStrengthWorkout,
        id: 'strength-2',
        name: 'Second',
      };

      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [workout1, workout2],
        })
      );

      act(() => {
        result.current.moveStrengthWorkout('strength-2', 'up');
      });

      expect(result.current.strengthWorkouts[0].name).toBe('Second');
      expect(result.current.strengthWorkouts[1].name).toBe('First');
    });

    it('should move strength workout down', () => {
      const workout1 = {
        ...mockStrengthWorkout,
        id: 'strength-1',
        name: 'First',
      };
      const workout2 = {
        ...mockStrengthWorkout,
        id: 'strength-2',
        name: 'Second',
      };

      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [workout1, workout2],
        })
      );

      act(() => {
        result.current.moveStrengthWorkout('strength-1', 'down');
      });

      expect(result.current.strengthWorkouts[0].name).toBe('Second');
      expect(result.current.strengthWorkouts[1].name).toBe('First');
    });
  });

  describe('running workout operations', () => {
    it('should add a new running workout', () => {
      const { result } = renderHook(() => useWorkoutOperations());

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

    it('should remove a running workout', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.removeRunningWorkout('running-1');
      });

      expect(result.current.runningWorkouts).toHaveLength(0);
    });

    it('should update running workout name', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.updateRunningWorkoutName('running-1', 'Updated Name');
      });

      expect(result.current.runningWorkouts[0].name).toBe('Updated Name');
    });

    it('should update running workout objective', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
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

    it('should update running workout schedule days', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.updateRunningWorkoutSchedule(
          'running-1',
          'selectedDays',
          ['saturday']
        );
      });

      expect(result.current.runningWorkouts[0].schedule.selectedDays).toEqual([
        'saturday',
      ]);
    });

    it('should update running workout schedule time', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.updateRunningWorkoutSchedule(
          'running-1',
          'time',
          'evening'
        );
      });

      expect(result.current.runningWorkouts[0].schedule.time).toBe('evening');
    });

    it('should move running workout up', () => {
      const workout1 = {
        ...mockRunningWorkout,
        id: 'running-1',
        name: 'First',
      };
      const workout2 = {
        ...mockRunningWorkout,
        id: 'running-2',
        name: 'Second',
      };

      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialRunningWorkouts: [workout1, workout2],
        })
      );

      act(() => {
        result.current.moveRunningWorkout('running-2', 'up');
      });

      expect(result.current.runningWorkouts[0].name).toBe('Second');
      expect(result.current.runningWorkouts[1].name).toBe('First');
    });

    it('should move running workout down', () => {
      const workout1 = {
        ...mockRunningWorkout,
        id: 'running-1',
        name: 'First',
      };
      const workout2 = {
        ...mockRunningWorkout,
        id: 'running-2',
        name: 'Second',
      };

      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialRunningWorkouts: [workout1, workout2],
        })
      );

      act(() => {
        result.current.moveRunningWorkout('running-1', 'down');
      });

      expect(result.current.runningWorkouts[0].name).toBe('Second');
      expect(result.current.runningWorkouts[1].name).toBe('First');
    });
  });

  describe('section operations', () => {
    it('should add strength section', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
        })
      );

      act(() => {
        result.current.addStrengthSection('strength-1');
      });

      expect(result.current.strengthWorkouts[0].sections).toHaveLength(2);
      expect(result.current.strengthWorkouts[0].sections[1]).toMatchObject({
        name: 'New Section',
        type: 'basic',
        exercises: [],
        restAfter: '',
      });
      expect(result.current.strengthWorkouts[0].sections[1].id).toMatch(
        /^section-\d+$/
      );
    });

    it('should add running section', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.addRunningSection('running-1');
      });

      expect(result.current.runningWorkouts[0].sections).toHaveLength(2);
      expect(result.current.runningWorkouts[0].sections[1]).toMatchObject({
        name: 'New Section',
        type: 'basic',
        exercises: [],
        restAfter: '',
      });
      expect(result.current.runningWorkouts[0].sections[1].id).toMatch(
        /^section-\d+$/
      );
    });

    it('should remove strength section', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
        })
      );

      act(() => {
        result.current.removeStrengthSection('strength-1', 'section-1');
      });

      expect(result.current.strengthWorkouts[0].sections).toHaveLength(0);
    });

    it('should remove running section', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.removeRunningSection('running-1', 'section-1');
      });

      expect(result.current.runningWorkouts[0].sections).toHaveLength(0);
    });

    it('should update strength section name', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
        })
      );

      act(() => {
        result.current.updateStrengthSectionName(
          'strength-1',
          'section-1',
          'Updated Section'
        );
      });

      expect(result.current.strengthWorkouts[0].sections[0].name).toBe(
        'Updated Section'
      );
    });

    it('should update running section name', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.updateRunningSectionName(
          'running-1',
          'section-1',
          'Updated Section'
        );
      });

      expect(result.current.runningWorkouts[0].sections[0].name).toBe(
        'Updated Section'
      );
    });

    it('should update strength section type', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
        })
      );

      act(() => {
        result.current.updateStrengthSectionType(
          'strength-1',
          'section-1',
          'emom'
        );
      });

      expect(result.current.strengthWorkouts[0].sections[0].type).toBe('emom');
    });

    it('should update running section type', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.updateRunningSectionType(
          'running-1',
          'section-1',
          'emom'
        );
      });

      expect(result.current.runningWorkouts[0].sections[0].type).toBe('emom');
    });

    it('should update strength section rest after', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
        })
      );

      act(() => {
        result.current.updateStrengthSectionRestAfter(
          'strength-1',
          'section-1',
          '2 minutes'
        );
      });

      expect(result.current.strengthWorkouts[0].sections[0].restAfter).toBe(
        '2 minutes'
      );
    });

    it('should update running section rest after', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialRunningWorkouts: [mockRunningWorkout],
        })
      );

      act(() => {
        result.current.updateRunningSectionRestAfter(
          'running-1',
          'section-1',
          '2:30'
        );
      });

      expect(result.current.runningWorkouts[0].sections[0].restAfter).toBe(
        '2:30'
      );
    });
  });

  describe('exercise operations delegation', () => {
    it('should delegate strength exercise operations to specialized hook', () => {
      const { result } = renderHook(() => useWorkoutOperations());

      // These operations should be available and delegate to the specialized hook
      expect(typeof result.current.addStrengthExercise).toBe('function');
      expect(typeof result.current.removeStrengthExercise).toBe('function');
      expect(typeof result.current.updateStrengthExerciseName).toBe('function');
      expect(typeof result.current.updateStrengthExerciseSets).toBe('function');
      expect(typeof result.current.updateStrengthRestTimer).toBe('function');
      expect(typeof result.current.updateStrengthExerciseRestAfter).toBe(
        'function'
      );
      expect(typeof result.current.updateStrengthExerciseEmomReps).toBe(
        'function'
      );
      expect(
        typeof result.current.updateStrengthExerciseProgressionMethod
      ).toBe('function');
    });

    it('should delegate running exercise operations to specialized hook', () => {
      const { result } = renderHook(() => useWorkoutOperations());

      // These operations should be available and delegate to the specialized hook
      expect(typeof result.current.addRunningExercise).toBe('function');
      expect(typeof result.current.removeRunningExercise).toBe('function');
      expect(typeof result.current.updateRunningExerciseName).toBe('function');
      expect(typeof result.current.updateRunningExerciseSets).toBe('function');
      expect(typeof result.current.updateRunningRestTimer).toBe('function');
      expect(typeof result.current.updateRunningExerciseRestAfter).toBe(
        'function'
      );
      expect(typeof result.current.updateRunningExerciseEmomReps).toBe(
        'function'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle moving workout when it is already at the top', () => {
      const workout1 = {
        ...mockStrengthWorkout,
        id: 'strength-1',
        name: 'First',
      };
      const workout2 = {
        ...mockStrengthWorkout,
        id: 'strength-2',
        name: 'Second',
      };

      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [workout1, workout2],
        })
      );

      act(() => {
        result.current.moveStrengthWorkout('strength-1', 'up');
      });

      // Should remain unchanged
      expect(result.current.strengthWorkouts[0].name).toBe('First');
      expect(result.current.strengthWorkouts[1].name).toBe('Second');
    });

    it('should handle moving workout when it is already at the bottom', () => {
      const workout1 = {
        ...mockStrengthWorkout,
        id: 'strength-1',
        name: 'First',
      };
      const workout2 = {
        ...mockStrengthWorkout,
        id: 'strength-2',
        name: 'Second',
      };

      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [workout1, workout2],
        })
      );

      act(() => {
        result.current.moveStrengthWorkout('strength-2', 'down');
      });

      // Should remain unchanged
      expect(result.current.strengthWorkouts[0].name).toBe('First');
      expect(result.current.strengthWorkouts[1].name).toBe('Second');
    });

    it('should handle updating non-existent workout', () => {
      const { result } = renderHook(() => useWorkoutOperations());

      // Should not throw error
      expect(() => {
        act(() => {
          result.current.updateStrengthWorkoutName('non-existent', 'New Name');
        });
      }).not.toThrow();
    });

    it('should handle updating non-existent section', () => {
      const { result } = renderHook(() =>
        useWorkoutOperations({
          initialStrengthWorkouts: [mockStrengthWorkout],
        })
      );

      // Should not throw error
      expect(() => {
        act(() => {
          result.current.updateStrengthSectionName(
            'strength-1',
            'non-existent',
            'New Name'
          );
        });
      }).not.toThrow();
    });
  });
});
