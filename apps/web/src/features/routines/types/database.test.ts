import { describe, it, expect } from 'vitest';
import { DatabaseRoutine, DatabaseRoutineRPCResponse } from './database';

describe('Database Types', () => {
  describe('DatabaseRoutine', () => {
    it('should have correct structure for snake_case fields', () => {
      const routine: DatabaseRoutine = {
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
      };

      expect(routine.is_active).toBe(true);
      expect(routine.is_favorite).toBe(false);
      expect(routine.total_workouts).toBe(24);
      expect(routine.completed_workouts).toBe(8);
      expect(routine.estimated_duration).toBe('45-60 min');
      expect(routine.created_at).toBe('2024-01-01T00:00:00Z');
      expect(routine.updated_at).toBe('2024-01-01T00:00:00Z');
      expect(routine.last_used).toBe('2024-01-01T00:00:00Z');
    });
  });

  describe('DatabaseRoutineRPCResponse', () => {
    it('should have correct structure for camelCase fields', () => {
      const rpcResponse: DatabaseRoutineRPCResponse = {
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
        workouts: [],
      };

      expect(rpcResponse.routine.isActive).toBe(true);
      expect(rpcResponse.routine.isFavorite).toBe(false);
      expect(rpcResponse.routine.totalWorkouts).toBe(24);
      expect(rpcResponse.routine.completedWorkouts).toBe(8);
      expect(rpcResponse.routine.estimatedDuration).toBe('45-60 min');
      expect(rpcResponse.routine.createdAt).toBe('2024-01-01T00:00:00Z');
      expect(rpcResponse.routine.updatedAt).toBe('2024-01-01T00:00:00Z');
      expect(rpcResponse.routine.lastUsed).toBe('2024-01-01T00:00:00Z');
    });
  });

  describe('Type compatibility', () => {
    it('should distinguish between snake_case and camelCase field names', () => {
      // This test ensures that the types are properly differentiated
      const snakeCaseRoutine: DatabaseRoutine = {
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
      };

      const camelCaseRoutine: DatabaseRoutineRPCResponse['routine'] = {
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
      };

      // These should be different field names
      expect(snakeCaseRoutine.is_active).toBeDefined();
      expect(camelCaseRoutine.isActive).toBeDefined();
    });
  });
});
