import {
  transformDatabaseRoutineToRoutineData,
  transformDatabaseRoutineToRoutine,
  transformDatabaseWorkout,
} from './dataTransformers';
import {
  DatabaseRoutineRPCResponse,
  DatabaseRoutineWithWorkouts,
} from '../types/database';

describe('dataTransformers', () => {
  describe('transformDatabaseRoutineToRoutineData', () => {
    it('should transform RPC response to RoutineData correctly', () => {
      const mockRpcResponse: DatabaseRoutineRPCResponse = {
        routine: {
          id: 'routine-1',
          name: 'Test Routine',
          description: 'Test Description',
          difficulty: 'Beginner',
          goal: 'Strength',
          duration: 12,
          isActive: true,
          isFavorite: false,
          objectives: ['Build strength'],
          totalWorkouts: 24,
          completedWorkouts: 8,
          estimatedDuration: '45-60 min',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          lastUsed: '2024-01-01T00:00:00Z',
        },
        workouts: [
          {
            id: 'workout-1',
            name: 'Workout 1',
            type: 'strength',
            objective: 'Build strength',
            order_index: 1,
            schedule: {
              repeatPattern: 'weekly',
              repeatValue: '1',
              selectedDays: ['monday', 'wednesday', 'friday'],
              time: '09:00',
            },
            sections: [],
            trail_running_data: undefined,
          },
          {
            id: 'workout-2',
            name: 'Workout 2',
            type: 'strength',
            objective: 'Build strength',
            order_index: 2,
            schedule: {
              repeatPattern: 'weekly',
              repeatValue: '1',
              selectedDays: ['tuesday', 'thursday'],
              time: '09:00',
            },
            sections: [],
            trail_running_data: undefined,
          },
        ],
      };

      const result = transformDatabaseRoutineToRoutineData(mockRpcResponse);

      expect(result.id).toBe('routine-1');
      expect(result.name).toBe('Test Routine');
      expect(result.description).toBe('Test Description');
      expect(result.difficulty).toBe('Beginner');
      expect(result.goal).toBe('Strength');
      expect(result.isActive).toBe(true);
      expect(result.isFavorite).toBe(false);
      expect(result.objectives).toEqual(['Build strength']);
      expect(result.progress.currentWeek).toBe(2);
      expect(result.progress.totalWeeks).toBe(12);
      expect(result.progress.completedWorkouts).toBe(8);
      expect(result.progress.totalWorkouts).toBe(60);
      expect(result.strengthWorkouts).toHaveLength(2);
      expect(result.strengthWorkouts[0].id).toBe('workout-1');
      expect(result.strengthWorkouts[1].id).toBe('workout-2');
      expect(result.runningWorkouts).toEqual([]);
    });

    it('should handle missing optional fields', () => {
      const mockRpcResponse: DatabaseRoutineRPCResponse = {
        routine: {
          id: 'routine-1',
          name: 'Test Routine',
          description: 'Test Description',
          difficulty: 'Beginner',
          goal: 'Strength',
          duration: 12,
          isActive: true,
          isFavorite: false,
          objectives: [],
          totalWorkouts: 0,
          completedWorkouts: 0,
          estimatedDuration: '',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          lastUsed: null,
        },
        workouts: [],
      };

      const result = transformDatabaseRoutineToRoutineData(mockRpcResponse);

      expect(result.objectives).toEqual([]);
      expect(result.progress.completedWorkouts).toBe(0);
      expect(result.progress.totalWorkouts).toBe(0);
    });
  });

  describe('transformDatabaseRoutineToRoutine', () => {
    it('should transform database routine to Routine correctly', () => {
      const mockDatabaseRoutine: DatabaseRoutineWithWorkouts = {
        id: 'routine-1',
        user_id: 'user-1',
        name: 'Test Routine',
        description: 'Test Description',
        difficulty: 'Beginner',
        goal: 'Strength',
        duration: 12,
        is_active: true,
        is_favorite: false,
        objectives: ['Build strength'],
        total_workouts: 24,
        completed_workouts: 8,
        estimated_duration: '45-60 min',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        last_used: '2024-01-01T00:00:00Z',
        workouts: [],
      };

      const result = transformDatabaseRoutineToRoutine(mockDatabaseRoutine);

      expect(result.id).toBe('routine-1');
      expect(result.name).toBe('Test Routine');
      expect(result.description).toBe('Test Description');
      expect(result.difficulty).toBe('Beginner');
      expect(result.goal).toBe('Strength');
      expect(result.isActive).toBe(true);
      expect(result.isFavorite).toBe(false);
      expect(result.objectives).toEqual(['Build strength']);
      expect(result.progress.current).toBe(8);
      expect(result.progress.total).toBe(24);
      expect(result.totalWorkouts).toBe(24);
      expect(result.completedWorkouts).toBe(8);
      expect(result.estimatedDuration).toBe('45-60 min');
      expect(result.workoutDays).toEqual([]);
    });

    it('should handle missing optional fields', () => {
      const mockDatabaseRoutine: DatabaseRoutineWithWorkouts = {
        id: 'routine-1',
        user_id: 'user-1',
        name: 'Test Routine',
        description: '',
        difficulty: 'Beginner',
        goal: 'Strength',
        duration: 12,
        is_active: false,
        is_favorite: false,
        objectives: [],
        total_workouts: 0,
        completed_workouts: 0,
        estimated_duration: '',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        last_used: null,
        workouts: [],
      };

      const result = transformDatabaseRoutineToRoutine(mockDatabaseRoutine);

      expect(result.name).toBe('Test Routine');
      expect(result.description).toBe('');
      expect(result.isActive).toBe(false);
      expect(result.isFavorite).toBe(false);
      expect(result.objectives).toEqual([]);
      expect(result.progress.current).toBe(0);
      expect(result.progress.total).toBe(0);
      expect(result.totalWorkouts).toBe(0);
      expect(result.completedWorkouts).toBe(0);
      expect(result.estimatedDuration).toBe('45-60 min');
    });
  });

  describe('transformDatabaseWorkout', () => {
    it('should transform database workout correctly', () => {
      const mockDatabaseWorkout = {
        id: 'workout-1',
        name: 'Test Workout',
        type: 'strength',
        objective: 'Test Objective',
        schedule: {
          repeatPattern: 'weekdays',
          repeatValue: '',
          selectedDays: ['Monday', 'Wednesday'],
          time: 'Morning',
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
                muscle_groups: ['chest'],
                exerciseLibraryId: 'ex-1',
                sets: [
                  {
                    id: 'set-1',
                    setNumber: 1,
                    setType: 'normal',
                    repType: 'fixed',
                    reps: 10,
                    weight: 100,
                    rest_time: '90s',
                    rpe: null,
                    notes: '',
                  },
                ],
                progression_method: 'linear',
                rest_after: '120s',
              },
            ],
            rest_after: '180s',
          },
        ],
        order_index: 0,
      };

      const result = transformDatabaseWorkout(mockDatabaseWorkout);

      expect(result).not.toBeNull();
      expect(result?.id).toBe('workout-1');
      expect(result?.name).toBe('Test Workout');
      expect(result?.objective).toBe('Test Objective');
      expect(result?.schedule.selectedDays).toEqual(['Monday', 'Wednesday']);
      expect(result?.schedule.time).toBe('Morning');
      expect(result?.sections).toHaveLength(1);
      expect(result?.sections[0].name).toBe('Test Section');
      expect(result?.sections[0].type).toBe('basic');
    });
  });
});
