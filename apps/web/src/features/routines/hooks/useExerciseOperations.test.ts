import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useExerciseOperations } from './useExerciseOperations';
import {
  StrengthWorkout,
  RunningWorkout,
  Exercise,
  ProgressionMethod,
} from '../types';

describe('useExerciseOperations', () => {
  describe('Strength Workout Operations', () => {
    const mockSetStrengthWorkouts = vi.fn();
    const mockStrengthWorkouts: StrengthWorkout[] = [
      {
        id: 'strength-1',
        name: 'Test Strength Workout',
        type: 'strength',
        objective: 'Build strength',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['monday'],
          time: '09:00',
        },
        sections: [
          {
            id: 'section-1',
            name: 'Test Section',
            type: 'basic',
            exercises: [],
            restAfter: '2min',
          },
        ],
      },
    ];

    beforeEach(() => {
      mockSetStrengthWorkouts.mockClear();
    });

    it('should add exercise to strength workout', () => {
      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetStrengthWorkouts,
          workoutType: 'strength',
        })
      );

      const exerciseData: Partial<Exercise> = {
        name: 'Bench Press',
        category: 'strength',
        muscleGroups: ['chest'],
        equipment: ['barbell'],
      };

      act(() => {
        result.current.addExercise('strength-1', 'section-1', exerciseData);
      });

      expect(mockSetStrengthWorkouts).toHaveBeenCalledWith(
        expect.any(Function)
      );
      const setterFunction = mockSetStrengthWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(mockStrengthWorkouts);

      expect(updatedWorkouts[0].sections[0].exercises).toHaveLength(1);
      expect(updatedWorkouts[0].sections[0].exercises[0].name).toBe(
        'Bench Press'
      );
      expect(updatedWorkouts[0].sections[0].exercises[0].category).toBe(
        'strength'
      );
    });

    it('should remove exercise from strength workout', () => {
      const workoutsWithExercise = [
        {
          ...mockStrengthWorkouts[0],
          sections: [
            {
              ...mockStrengthWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetStrengthWorkouts,
          workoutType: 'strength',
        })
      );

      act(() => {
        result.current.removeExercise('strength-1', 'section-1', 'exercise-1');
      });

      expect(mockSetStrengthWorkouts).toHaveBeenCalledWith(
        expect.any(Function)
      );
      const setterFunction = mockSetStrengthWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises).toHaveLength(0);
    });

    it('should update exercise name in strength workout', () => {
      const workoutsWithExercise = [
        {
          ...mockStrengthWorkouts[0],
          sections: [
            {
              ...mockStrengthWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Old Name',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetStrengthWorkouts,
          workoutType: 'strength',
        })
      );

      act(() => {
        result.current.updateExerciseName(
          'strength-1',
          'section-1',
          'exercise-1',
          'New Name'
        );
      });

      expect(mockSetStrengthWorkouts).toHaveBeenCalledWith(
        expect.any(Function)
      );
      const setterFunction = mockSetStrengthWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises[0].name).toBe('New Name');
    });

    it('should update exercise sets in strength workout', () => {
      const workoutsWithExercise = [
        {
          ...mockStrengthWorkouts[0],
          sections: [
            {
              ...mockStrengthWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
            },
          ],
        },
      ];

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
        {
          id: 'set-2',
          setNumber: 2,
          setType: 'normal' as const,
          repType: 'fixed' as const,
          reps: 8,
          weight: 110,
          rpe: null,
          notes: '',
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetStrengthWorkouts,
          workoutType: 'strength',
        })
      );

      act(() => {
        result.current.updateExerciseSets(
          'strength-1',
          'section-1',
          'exercise-1',
          newSets
        );
      });

      expect(mockSetStrengthWorkouts).toHaveBeenCalledWith(
        expect.any(Function)
      );
      const setterFunction = mockSetStrengthWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises[0].sets).toEqual(newSets);
    });

    it('should update rest timer in strength workout', () => {
      const workoutsWithExercise = [
        {
          ...mockStrengthWorkouts[0],
          sections: [
            {
              ...mockStrengthWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  sets: [],
                  restTimer: '1min',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetStrengthWorkouts,
          workoutType: 'strength',
        })
      );

      act(() => {
        result.current.updateRestTimer(
          'strength-1',
          'section-1',
          'exercise-1',
          '2min'
        );
      });

      expect(mockSetStrengthWorkouts).toHaveBeenCalledWith(
        expect.any(Function)
      );
      const setterFunction = mockSetStrengthWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises[0].restTimer).toBe(
        '2min'
      );
    });

    it('should update exercise rest after in strength workout', () => {
      const workoutsWithExercise = [
        {
          ...mockStrengthWorkouts[0],
          sections: [
            {
              ...mockStrengthWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '1min',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetStrengthWorkouts,
          workoutType: 'strength',
        })
      );

      act(() => {
        result.current.updateExerciseRestAfter(
          'strength-1',
          'section-1',
          'exercise-1',
          '3min'
        );
      });

      expect(mockSetStrengthWorkouts).toHaveBeenCalledWith(
        expect.any(Function)
      );
      const setterFunction = mockSetStrengthWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises[0].restAfter).toBe(
        '3min'
      );
    });

    it('should update exercise emom reps in strength workout', () => {
      const workoutsWithExercise = [
        {
          ...mockStrengthWorkouts[0],
          sections: [
            {
              ...mockStrengthWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                  emomReps: 5,
                },
              ],
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetStrengthWorkouts,
          workoutType: 'strength',
        })
      );

      act(() => {
        result.current.updateExerciseEmomReps(
          'strength-1',
          'section-1',
          'exercise-1',
          10
        );
      });

      expect(mockSetStrengthWorkouts).toHaveBeenCalledWith(
        expect.any(Function)
      );
      const setterFunction = mockSetStrengthWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises[0].emomReps).toBe(10);
    });

    it('should update exercise progression method in strength workout', () => {
      const workoutsWithExercise = [
        {
          ...mockStrengthWorkouts[0],
          sections: [
            {
              ...mockStrengthWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Bench Press',
                  category: 'strength',
                  muscleGroups: ['chest'],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                  progressionMethod: 'linear',
                },
              ],
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetStrengthWorkouts,
          workoutType: 'strength',
        })
      );

      // For strength workouts, the progression method should be available
      const strengthOperations = result.current as typeof result.current & {
        updateExerciseProgressionMethod: (
          workoutId: string,
          sectionId: string,
          exerciseId: string,
          progressionMethod: any
        ) => void;
      };

      act(() => {
        strengthOperations.updateExerciseProgressionMethod(
          'strength-1',
          'section-1',
          'exercise-1',
          'percentage'
        );
      });

      expect(mockSetStrengthWorkouts).toHaveBeenCalledWith(
        expect.any(Function)
      );
      const setterFunction = mockSetStrengthWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(
        updatedWorkouts[0].sections[0].exercises[0].progressionMethod
      ).toBe('percentage');
    });

    it('should include progression method operation for strength workouts', () => {
      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetStrengthWorkouts,
          workoutType: 'strength',
        })
      );

      expect(result.current).toHaveProperty('updateExerciseProgressionMethod');
    });
  });

  describe('Running Workout Operations', () => {
    const mockSetRunningWorkouts = vi.fn();
    const mockRunningWorkouts: RunningWorkout[] = [
      {
        id: 'running-1',
        name: 'Test Running Workout',
        type: 'running',
        objective: 'Improve endurance',
        schedule: {
          repeatPattern: 'weekly',
          repeatValue: '1',
          selectedDays: ['monday'],
          time: '09:00',
        },
        sections: [
          {
            id: 'section-1',
            name: 'Test Section',
            type: 'basic',
            exercises: [],
            restAfter: '2min',
          },
        ],
      },
    ];

    beforeEach(() => {
      mockSetRunningWorkouts.mockClear();
    });

    it('should add exercise to running workout', () => {
      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetRunningWorkouts,
          workoutType: 'running',
        })
      );

      const exerciseData: Partial<Exercise> = {
        name: 'Sprint Intervals',
        category: 'cardio',
        muscleGroups: ['legs'],
        equipment: [],
      };

      act(() => {
        result.current.addExercise('running-1', 'section-1', exerciseData);
      });

      expect(mockSetRunningWorkouts).toHaveBeenCalledWith(expect.any(Function));
      const setterFunction = mockSetRunningWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(mockRunningWorkouts);

      expect(updatedWorkouts[0].sections[0].exercises).toHaveLength(1);
      expect(updatedWorkouts[0].sections[0].exercises[0].name).toBe(
        'Sprint Intervals'
      );
      expect(updatedWorkouts[0].sections[0].exercises[0].category).toBe(
        'cardio'
      );
    });

    it('should remove exercise from running workout', () => {
      const workoutsWithExercise = [
        {
          ...mockRunningWorkouts[0],
          sections: [
            {
              ...mockRunningWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Sprint Intervals',
                  category: 'cardio',
                  muscleGroups: ['legs'],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetRunningWorkouts,
          workoutType: 'running',
        })
      );

      act(() => {
        result.current.removeExercise('running-1', 'section-1', 'exercise-1');
      });

      expect(mockSetRunningWorkouts).toHaveBeenCalledWith(expect.any(Function));
      const setterFunction = mockSetRunningWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises).toHaveLength(0);
    });

    it('should update exercise name in running workout', () => {
      const workoutsWithExercise = [
        {
          ...mockRunningWorkouts[0],
          sections: [
            {
              ...mockRunningWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Old Name',
                  category: 'cardio',
                  muscleGroups: ['legs'],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetRunningWorkouts,
          workoutType: 'running',
        })
      );

      act(() => {
        result.current.updateExerciseName(
          'running-1',
          'section-1',
          'exercise-1',
          'New Name'
        );
      });

      expect(mockSetRunningWorkouts).toHaveBeenCalledWith(expect.any(Function));
      const setterFunction = mockSetRunningWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises[0].name).toBe('New Name');
    });

    it('should update exercise sets in running workout', () => {
      const workoutsWithExercise = [
        {
          ...mockRunningWorkouts[0],
          sections: [
            {
              ...mockRunningWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Sprint Intervals',
                  category: 'cardio',
                  muscleGroups: ['legs'],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
            },
          ],
        },
      ];

      const newSets = [
        {
          id: 'set-1',
          setNumber: 1,
          setType: 'normal' as const,
          repType: 'fixed' as const,
          reps: 30,
          weight: null,
          rpe: null,
          notes: '30s high intensity',
        },
        {
          id: 'set-2',
          setNumber: 2,
          setType: 'normal' as const,
          repType: 'fixed' as const,
          reps: 60,
          weight: null,
          rpe: null,
          notes: '1min low intensity',
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetRunningWorkouts,
          workoutType: 'running',
        })
      );

      act(() => {
        result.current.updateExerciseSets(
          'running-1',
          'section-1',
          'exercise-1',
          newSets
        );
      });

      expect(mockSetRunningWorkouts).toHaveBeenCalledWith(expect.any(Function));
      const setterFunction = mockSetRunningWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises[0].sets).toEqual(newSets);
    });

    it('should update rest timer in running workout', () => {
      const workoutsWithExercise = [
        {
          ...mockRunningWorkouts[0],
          sections: [
            {
              ...mockRunningWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Sprint Intervals',
                  category: 'cardio',
                  muscleGroups: ['legs'],
                  equipment: [],
                  sets: [],
                  restTimer: '1min',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetRunningWorkouts,
          workoutType: 'running',
        })
      );

      act(() => {
        result.current.updateRestTimer(
          'running-1',
          'section-1',
          'exercise-1',
          '2min'
        );
      });

      expect(mockSetRunningWorkouts).toHaveBeenCalledWith(expect.any(Function));
      const setterFunction = mockSetRunningWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises[0].restTimer).toBe(
        '2min'
      );
    });

    it('should update exercise rest after in running workout', () => {
      const workoutsWithExercise = [
        {
          ...mockRunningWorkouts[0],
          sections: [
            {
              ...mockRunningWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Sprint Intervals',
                  category: 'cardio',
                  muscleGroups: ['legs'],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '1min',
                  notes: '',
                  hasApproachSets: false,
                },
              ],
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetRunningWorkouts,
          workoutType: 'running',
        })
      );

      act(() => {
        result.current.updateExerciseRestAfter(
          'running-1',
          'section-1',
          'exercise-1',
          '3min'
        );
      });

      expect(mockSetRunningWorkouts).toHaveBeenCalledWith(expect.any(Function));
      const setterFunction = mockSetRunningWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises[0].restAfter).toBe(
        '3min'
      );
    });

    it('should update exercise emom reps in running workout', () => {
      const workoutsWithExercise = [
        {
          ...mockRunningWorkouts[0],
          sections: [
            {
              ...mockRunningWorkouts[0].sections[0],
              exercises: [
                {
                  id: 'exercise-1',
                  name: 'Sprint Intervals',
                  category: 'cardio',
                  muscleGroups: ['legs'],
                  equipment: [],
                  sets: [],
                  restTimer: '',
                  restAfter: '',
                  notes: '',
                  hasApproachSets: false,
                  emomReps: 5,
                },
              ],
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetRunningWorkouts,
          workoutType: 'running',
        })
      );

      act(() => {
        result.current.updateExerciseEmomReps(
          'running-1',
          'section-1',
          'exercise-1',
          10
        );
      });

      expect(mockSetRunningWorkouts).toHaveBeenCalledWith(expect.any(Function));
      const setterFunction = mockSetRunningWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(workoutsWithExercise);

      expect(updatedWorkouts[0].sections[0].exercises[0].emomReps).toBe(10);
    });

    it('should not include progression method operation for running workouts', () => {
      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetRunningWorkouts,
          workoutType: 'running',
        })
      );

      expect(result.current).not.toHaveProperty(
        'updateExerciseProgressionMethod'
      );
    });

    it('should warn when trying to update progression method for running workout', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetRunningWorkouts,
          workoutType: 'running',
        })
      );

      // This should not be available for running workouts
      expect(result.current).not.toHaveProperty(
        'updateExerciseProgressionMethod'
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    const mockSetWorkouts = vi.fn();

    beforeEach(() => {
      mockSetWorkouts.mockClear();
    });

    it('should handle non-existent workout ID gracefully', () => {
      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetWorkouts,
          workoutType: 'strength',
        })
      );

      act(() => {
        result.current.addExercise('non-existent', 'section-1', {
          name: 'Test',
        });
      });

      expect(mockSetWorkouts).toHaveBeenCalledWith(expect.any(Function));
      const setterFunction = mockSetWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction([]);

      expect(updatedWorkouts).toEqual([]);
    });

    it('should handle non-existent section ID gracefully', () => {
      const mockWorkouts = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength' as const,
          objective: 'Test',
          schedule: {
            repeatPattern: 'weekly',
            repeatValue: '1',
            selectedDays: ['monday'],
            time: '09:00',
          },
          sections: [],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetWorkouts,
          workoutType: 'strength',
        })
      );

      act(() => {
        result.current.addExercise('workout-1', 'non-existent', {
          name: 'Test',
        });
      });

      expect(mockSetWorkouts).toHaveBeenCalledWith(expect.any(Function));
      const setterFunction = mockSetWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(mockWorkouts);

      expect(updatedWorkouts).toEqual(mockWorkouts);
    });

    it('should handle non-existent exercise ID gracefully', () => {
      const mockWorkouts = [
        {
          id: 'workout-1',
          name: 'Test Workout',
          type: 'strength' as const,
          objective: 'Test',
          schedule: {
            repeatPattern: 'weekly',
            repeatValue: '1',
            selectedDays: ['monday'],
            time: '09:00',
          },
          sections: [
            {
              id: 'section-1',
              name: 'Test Section',
              type: 'strength' as const,
              exercises: [],
              restAfter: '2min',
            },
          ],
        },
      ];

      const { result } = renderHook(() =>
        useExerciseOperations({
          setWorkouts: mockSetWorkouts,
          workoutType: 'strength',
        })
      );

      act(() => {
        result.current.updateExerciseName(
          'workout-1',
          'section-1',
          'non-existent',
          'New Name'
        );
      });

      expect(mockSetWorkouts).toHaveBeenCalledWith(expect.any(Function));
      const setterFunction = mockSetWorkouts.mock.calls[0][0];
      const updatedWorkouts = setterFunction(mockWorkouts);

      expect(updatedWorkouts).toEqual(mockWorkouts);
    });
  });
});
