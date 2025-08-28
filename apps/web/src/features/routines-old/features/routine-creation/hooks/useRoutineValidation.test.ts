import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRoutineValidation } from './useRoutineValidation';
import { StrengthWorkout, RunningWorkout } from '@/features/routines-old/types';
import { WorkoutSet } from '@/features/routines-old/components/SetManagement';

describe('useRoutineValidation', () => {
  const { result } = renderHook(() => useRoutineValidation());
  const { validateRoutineData } = result.current;

  const createMockStrengthWorkout = (overrides = {}): StrengthWorkout => ({
    id: 'workout-1',
    name: 'Test Workout',
    type: 'strength',
    objective: 'Test objective',
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
            name: 'Test Exercise',
            category: 'strength',
            muscleGroups: ['chest'],
            equipment: [],
            exerciseId: 'ex-1',
            variantId: 'var-1',
            sets: [
              {
                id: 'set-1',
                setNumber: 1,
                setType: 'normal',
                repType: 'fixed',
                reps: 10,
                weight: 100,
                rpe: 7,
                notes: '',
              } as WorkoutSet,
            ],
            restTimer: '90s',
            restAfter: '2 min',
            notes: '',
            progressionMethod: 'linear',
            hasApproachSets: false,
          },
        ],
        restAfter: '3 min',
        emomDuration: undefined,
      },
    ],
    ...overrides,
  });

  const createMockRunningWorkout = (overrides = {}): RunningWorkout => ({
    id: 'running-1',
    name: 'Test Running Workout',
    type: 'running',
    objective: 'Test running objective',
    schedule: {
      repeatPattern: '',
      repeatValue: '',
      selectedDays: [],
      time: '',
    },
    sections: [
      {
        id: 'section-1',
        name: 'Test Running Section',
        type: 'basic',
        exercises: [
          {
            id: 'exercise-1',
            name: 'Test Running Exercise',
            category: 'cardio',
            muscleGroups: ['legs'],
            equipment: [],
            exerciseId: 'ex-1',
            variantId: 'var-1',
            sets: [],
            restTimer: '30s',
            restAfter: '1 min',
            notes: '',
          },
        ],
        restAfter: '2 min',
        emomDuration: undefined,
      },
    ],
    trailRunningData: {
      id: 'trail-1',
      name: 'Test Trail Run',
      description: 'Test description',
      type: 'trail-running',
      difficulty: 'beginner',
      estimatedDuration: 30,
      targetDistance: 5,
      elevationGain: 100,
      sections: [],
    },
    ...overrides,
  });

  describe('validateRoutineData', () => {
    test('should return null for valid routine data', () => {
      const validData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [createMockStrengthWorkout()],
        runningWorkouts: [],
      };

      const result = validateRoutineData(validData);
      expect(result).toBeNull();
    });

    test('should return error for missing routine name', () => {
      const invalidData = {
        name: '',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [createMockStrengthWorkout()],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({ message: 'Routine name is required' });
    });

    test('should return error for missing difficulty', () => {
      const invalidData = {
        name: 'Test Routine',
        difficulty: '',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [createMockStrengthWorkout()],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({ message: 'Difficulty and goal are required' });
    });

    test('should return error for missing goal', () => {
      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: '',
        objectives: ['Build muscle'],
        strengthWorkouts: [createMockStrengthWorkout()],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({ message: 'Difficulty and goal are required' });
    });

    test('should return error for empty objectives', () => {
      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: [],
        strengthWorkouts: [createMockStrengthWorkout()],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({ message: 'At least one objective is required' });
    });

    test('should return error for no workouts', () => {
      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({
        message: 'At least one workout (strength or running) is required',
      });
    });

    test('should pass validation with only running workouts', () => {
      const validData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Endurance',
        objectives: ['Improve cardio'],
        strengthWorkouts: [],
        runningWorkouts: [createMockRunningWorkout()],
      };

      const result = validateRoutineData(validData);
      expect(result).toBeNull();
    });

    test('should return error for workout without name', () => {
      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [createMockStrengthWorkout({ name: '' })],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({ message: 'Workout "Unnamed" must have a name' });
    });

    test('should return error for workout without objective', () => {
      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [createMockStrengthWorkout({ objective: '' })],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({
        message: 'Workout "Test Workout" must have an objective',
      });
    });

    test('should return error for workout without sections', () => {
      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [createMockStrengthWorkout({ sections: [] })],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({
        message: 'Workout "Test Workout" must have at least one section',
      });
    });

    test('should return error for section without name', () => {
      const workoutWithUnnamedSection = createMockStrengthWorkout({
        sections: [
          {
            id: 'section-1',
            name: '',
            type: 'strength',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Test Exercise',
                category: 'strength',
                muscleGroups: ['chest'],
                equipment: [],
                exerciseId: 'ex-1',
                variantId: 'var-1',
                sets: [
                  {
                    id: 'set-1',
                    setNumber: 1,
                    reps: 10,
                    weight: 100,
                    notes: '',
                  },
                ],
                restTimer: '90s',
                restAfter: '2 min',
                notes: '',
                progressionMethod: 'linear',
                hasApproachSets: false,
              },
            ],
            restAfter: '3 min',
            emomDuration: undefined,
          },
        ],
      });

      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [workoutWithUnnamedSection],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({
        message: 'Section "Unnamed" in workout "Test Workout" must have a name',
      });
    });

    test('should return error for section without exercises', () => {
      const workoutWithEmptySection = createMockStrengthWorkout({
        sections: [
          {
            id: 'section-1',
            name: 'Test Section',
            type: 'strength',
            exercises: [],
            restAfter: '3 min',
            emomDuration: undefined,
          },
        ],
      });

      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [workoutWithEmptySection],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({
        message:
          'Section "Test Section" in workout "Test Workout" must have at least one exercise',
      });
    });

    test('should return error for exercise without variant or exercise ID', () => {
      const workoutWithInvalidExercise = createMockStrengthWorkout({
        sections: [
          {
            id: 'section-1',
            name: 'Test Section',
            type: 'strength',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Test Exercise',
                category: 'strength',
                muscleGroups: ['chest'],
                equipment: [],
                exerciseId: '',
                variantId: '',
                sets: [
                  {
                    id: 'set-1',
                    setNumber: 1,
                    reps: 10,
                    weight: 100,
                    notes: '',
                  },
                ],
                restTimer: '90s',
                restAfter: '2 min',
                notes: '',
                progressionMethod: 'linear',
                hasApproachSets: false,
              },
            ],
            restAfter: '3 min',
            emomDuration: undefined,
          },
        ],
      });

      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [workoutWithInvalidExercise],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({
        message:
          'Exercise "Test Exercise" in section "Test Section" must be selected from the exercise library',
      });
    });

    test('should return error for exercise without sets', () => {
      const workoutWithExerciseWithoutSets = createMockStrengthWorkout({
        sections: [
          {
            id: 'section-1',
            name: 'Test Section',
            type: 'strength',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Test Exercise',
                category: 'strength',
                muscleGroups: ['chest'],
                equipment: [],
                exerciseId: 'ex-1',
                variantId: 'var-1',
                sets: [],
                restTimer: '90s',
                restAfter: '2 min',
                notes: '',
                progressionMethod: 'linear',
                hasApproachSets: false,
              },
            ],
            restAfter: '3 min',
            emomDuration: undefined,
          },
        ],
      });

      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [workoutWithExerciseWithoutSets],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({
        message:
          'Exercise "Test Exercise" in section "Test Section" must have at least one set',
      });
    });

    test('should return error for set with invalid reps', () => {
      const workoutWithInvalidSet = createMockStrengthWorkout({
        sections: [
          {
            id: 'section-1',
            name: 'Test Section',
            type: 'strength',
            exercises: [
              {
                id: 'exercise-1',
                name: 'Test Exercise',
                category: 'strength',
                muscleGroups: ['chest'],
                equipment: [],
                exerciseId: 'ex-1',
                variantId: 'var-1',
                sets: [
                  {
                    id: 'set-1',
                    setNumber: 1,
                    reps: 0,
                    weight: 100,
                    notes: '',
                  },
                ],
                restTimer: '90s',
                restAfter: '2 min',
                notes: '',
                progressionMethod: 'linear',
                hasApproachSets: false,
              },
            ],
            restAfter: '3 min',
            emomDuration: undefined,
          },
        ],
      });

      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [workoutWithInvalidSet],
        runningWorkouts: [],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({
        message: 'Set 1 in exercise "Test Exercise" must have valid reps',
      });
    });

    test('should validate running workouts when present', () => {
      const invalidData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [createMockStrengthWorkout()],
        runningWorkouts: [createMockRunningWorkout({ name: '' })],
      };

      const result = validateRoutineData(invalidData);
      expect(result).toEqual({
        message: 'Running workout "Unnamed" must have a name',
      });
    });

    test('should pass validation with valid running workouts', () => {
      const validData = {
        name: 'Test Routine',
        difficulty: 'Beginner',
        goal: 'Strength',
        objectives: ['Build muscle'],
        strengthWorkouts: [createMockStrengthWorkout()],
        runningWorkouts: [createMockRunningWorkout()],
      };

      const result = validateRoutineData(validData);
      expect(result).toBeNull();
    });
  });
});
