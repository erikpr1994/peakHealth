import { renderHook, act } from '@testing-library/react';
import { useRoutineCreationState } from './useRoutineCreationState';

describe('useRoutineCreationState', () => {
  beforeEach(() => {
    // Reset hook state before each test
    const { result } = renderHook(() => useRoutineCreationState());
    act(() => {
      result.current.resetState();
    });
  });

  describe('initial state', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      expect(result.current.name).toBe('');
      expect(result.current.difficulty).toBe('Beginner');
      expect(result.current.goal).toBe('Strength');
      expect(result.current.description).toBe('');
      expect(result.current.objectives).toEqual([]);
      expect(result.current.duration).toBe(12);
      expect(result.current.creatingRunning).toBe(false);
      expect(result.current.editingRunning).toBe(null);
      expect(result.current.collapsedStrengthWorkouts).toEqual(new Set());
      expect(result.current.collapsedRunningWorkouts).toEqual(new Set());
    });
  });

  describe('routine metadata state', () => {
    it('should update name', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      act(() => {
        result.current.setName('Test Routine');
      });

      expect(result.current.name).toBe('Test Routine');
    });

    it('should update difficulty', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      act(() => {
        result.current.setDifficulty('Advanced');
      });

      expect(result.current.difficulty).toBe('Advanced');
    });

    it('should update goal', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      act(() => {
        result.current.setGoal('Endurance');
      });

      expect(result.current.goal).toBe('Endurance');
    });

    it('should update description', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      act(() => {
        result.current.setDescription('Test description');
      });

      expect(result.current.description).toBe('Test description');
    });

    it('should update objectives', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      act(() => {
        result.current.setObjectives(['Objective 1', 'Objective 2']);
      });

      expect(result.current.objectives).toEqual(['Objective 1', 'Objective 2']);
    });

    it('should update duration', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      act(() => {
        result.current.setDuration(8);
      });

      expect(result.current.duration).toBe(8);
    });
  });

  describe('running workout states', () => {
    it('should handle creating running workout', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      act(() => {
        result.current.handleAddRunningWorkout();
      });

      expect(result.current.creatingRunning).toBe(true);
    });

    it('should handle running cancel', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      // Set up editing state
      act(() => {
        result.current.setEditingRunning({
          workoutId: 'test-id',
          data: {
            id: 'test-data',
            name: 'Test',
            description: 'Test',
            type: 'trail-running' as const,
            difficulty: 'beginner',
            estimatedDuration: 30,
            targetDistance: 5,
            elevationGain: 100,
            sections: [],
          },
        });
        result.current.setCreatingRunning(true);
      });

      act(() => {
        result.current.handleRunningCancel();
      });

      expect(result.current.creatingRunning).toBe(false);
      expect(result.current.editingRunning).toBe(null);
    });

    it('should handle edit running workout', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      const mockWorkouts = [
        {
          id: 'workout-1',
          trailRunningData: {
            id: 'test-data',
            name: 'Test Workout',
            description: 'Test',
            type: 'trail-running' as const,
            difficulty: 'beginner' as const,
            estimatedDuration: 30,
            targetDistance: 5,
            elevationGain: 100,
            sections: [],
          },
        },
      ];

      act(() => {
        result.current.handleEditRunning('workout-1', mockWorkouts);
      });

      expect(result.current.editingRunning).toEqual({
        workoutId: 'workout-1',
        data: {
          id: 'test-data',
          name: 'Test Workout',
          description: 'Test',
          type: 'trail-running',
          difficulty: 'beginner',
          estimatedDuration: 30,
          targetDistance: 5,
          elevationGain: 100,
          sections: [],
        },
      });
    });

    it('should not set editing state for non-existent workout', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      const mockWorkouts = [
        {
          id: 'workout-1',
          trailRunningData: {
            id: 'test-data',
            name: 'Test Workout',
            description: 'Test',
            type: 'trail-running' as const,
            difficulty: 'beginner' as const,
            estimatedDuration: 30,
            targetDistance: 5,
            elevationGain: 100,
            sections: [],
          },
        },
      ];

      act(() => {
        result.current.handleEditRunning('non-existent', mockWorkouts);
      });

      expect(result.current.editingRunning).toBe(null);
    });
  });

  describe('collapse states', () => {
    it('should toggle strength workout collapse', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      act(() => {
        result.current.toggleStrengthWorkoutCollapse('workout-1');
      });

      expect(result.current.collapsedStrengthWorkouts.has('workout-1')).toBe(
        true
      );

      act(() => {
        result.current.toggleStrengthWorkoutCollapse('workout-1');
      });

      expect(result.current.collapsedStrengthWorkouts.has('workout-1')).toBe(
        false
      );
    });

    it('should toggle running workout collapse', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      act(() => {
        result.current.toggleRunningWorkoutCollapse('workout-1');
      });

      expect(result.current.collapsedRunningWorkouts.has('workout-1')).toBe(
        true
      );

      act(() => {
        result.current.toggleRunningWorkoutCollapse('workout-1');
      });

      expect(result.current.collapsedRunningWorkouts.has('workout-1')).toBe(
        false
      );
    });

    it('should handle multiple collapsed workouts', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      act(() => {
        result.current.toggleStrengthWorkoutCollapse('workout-1');
        result.current.toggleStrengthWorkoutCollapse('workout-2');
      });

      expect(result.current.collapsedStrengthWorkouts.has('workout-1')).toBe(
        true
      );
      expect(result.current.collapsedStrengthWorkouts.has('workout-2')).toBe(
        true
      );
      expect(result.current.collapsedStrengthWorkouts.size).toBe(2);
    });
  });

  describe('state management', () => {
    it('should reset state to initial values', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      // Modify state
      act(() => {
        result.current.setName('Test');
        result.current.setDifficulty('Advanced');
        result.current.setGoal('Endurance');
        result.current.setDescription('Test description');
        result.current.setObjectives(['Test objective']);
        result.current.setDuration(8);
        result.current.setCreatingRunning(true);
        result.current.setEditingRunning({
          workoutId: 'test',
          data: {
            id: 'test-data',
            name: 'Test',
            description: 'Test',
            type: 'trail-running' as const,
            difficulty: 'beginner',
            estimatedDuration: 30,
            targetDistance: 5,
            elevationGain: 100,
            sections: [],
          },
        });
        result.current.toggleStrengthWorkoutCollapse('workout-1');
        result.current.toggleRunningWorkoutCollapse('workout-1');
      });

      // Reset state
      act(() => {
        result.current.resetState();
      });

      // Verify reset
      expect(result.current.name).toBe('');
      expect(result.current.difficulty).toBe('Beginner');
      expect(result.current.goal).toBe('Strength');
      expect(result.current.description).toBe('');
      expect(result.current.objectives).toEqual([]);
      expect(result.current.duration).toBe(12);
      expect(result.current.creatingRunning).toBe(false);
      expect(result.current.editingRunning).toBe(null);
      expect(result.current.collapsedStrengthWorkouts).toEqual(new Set());
      expect(result.current.collapsedRunningWorkouts).toEqual(new Set());
    });

    it('should load state for editing', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      const routineData = {
        name: 'Edit Routine',
        difficulty: 'Intermediate',
        goal: 'Hypertrophy',
        description: 'Edit description',
        objectives: ['Edit objective 1', 'Edit objective 2'],
        duration: 6,
      };

      act(() => {
        result.current.loadStateForEditing(routineData);
      });

      expect(result.current.name).toBe('Edit Routine');
      expect(result.current.difficulty).toBe('Intermediate');
      expect(result.current.goal).toBe('Hypertrophy');
      expect(result.current.description).toBe('Edit description');
      expect(result.current.objectives).toEqual([
        'Edit objective 1',
        'Edit objective 2',
      ]);
      expect(result.current.duration).toBe(6);
    });

    it('should handle loading state with optional fields', () => {
      const { result } = renderHook(() => useRoutineCreationState());

      const routineData = {
        name: 'Edit Routine',
        difficulty: 'Intermediate',
        goal: 'Hypertrophy',
        description: 'Edit description',
        // objectives and duration are optional
      };

      act(() => {
        result.current.loadStateForEditing(routineData);
      });

      expect(result.current.objectives).toEqual([]);
      expect(result.current.duration).toBe(12);
    });
  });

  describe('state isolation', () => {
    it('should maintain separate state between hook instances', () => {
      const { result: result1 } = renderHook(() => useRoutineCreationState());
      const { result: result2 } = renderHook(() => useRoutineCreationState());

      act(() => {
        result1.current.setName('Hook 1');
        result2.current.setName('Hook 2');
      });

      expect(result1.current.name).toBe('Hook 1');
      expect(result2.current.name).toBe('Hook 2');
    });
  });
});
