import { describe, it, expect } from 'vitest';
import type {
  ScheduledWorkout,
  DatabaseScheduledWorkout,
  CreateScheduledWorkoutData,
  UpdateScheduledWorkoutData,
} from './scheduledWorkout';

describe('ScheduledWorkout types', () => {
  describe('ScheduledWorkout interface', () => {
    it('should have all required properties', () => {
      const workout: ScheduledWorkout = {
        id: 'test-id',
        userId: 'user-id',
        routineId: 'routine-id',
        workoutId: 'workout-id',
        scheduledDate: '2024-01-01',
        scheduledTime: '09:00',
        status: 'scheduled',
        completedAt: undefined,
        durationMinutes: undefined,
        notes: undefined,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      expect(workout.id).toBe('test-id');
      expect(workout.userId).toBe('user-id');
      expect(workout.routineId).toBe('routine-id');
      expect(workout.workoutId).toBe('workout-id');
      expect(workout.scheduledDate).toBe('2024-01-01');
      expect(workout.scheduledTime).toBe('09:00');
      expect(workout.status).toBe('scheduled');
    });

    it('should allow all status values', () => {
      const statuses: ScheduledWorkout['status'][] = [
        'scheduled',
        'completed',
        'missed',
        'cancelled',
      ];

      statuses.forEach(status => {
        const workout: ScheduledWorkout = {
          id: 'test-id',
          userId: 'user-id',
          routineId: 'routine-id',
          workoutId: 'workout-id',
          scheduledDate: '2024-01-01',
          scheduledTime: '09:00',
          status,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        };

        expect(workout.status).toBe(status);
      });
    });
  });

  describe('DatabaseScheduledWorkout interface', () => {
    it('should have snake_case properties', () => {
      const dbWorkout: DatabaseScheduledWorkout = {
        id: 'test-id',
        user_id: 'user-id',
        routine_id: 'routine-id',
        workout_id: 'workout-id',
        scheduled_date: '2024-01-01',
        scheduled_time: '09:00',
        status: 'scheduled',
        completed_at: undefined,
        duration_minutes: undefined,
        notes: undefined,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(dbWorkout.user_id).toBe('user-id');
      expect(dbWorkout.routine_id).toBe('routine-id');
      expect(dbWorkout.workout_id).toBe('workout-id');
      expect(dbWorkout.scheduled_date).toBe('2024-01-01');
      expect(dbWorkout.scheduled_time).toBe('09:00');
    });
  });

  describe('CreateScheduledWorkoutData interface', () => {
    it('should have required properties for creation', () => {
      const createData: CreateScheduledWorkoutData = {
        routineId: 'routine-id',
        startDate: '2024-01-01',
        weeksAhead: 4,
      };

      expect(createData.routineId).toBe('routine-id');
      expect(createData.startDate).toBe('2024-01-01');
      expect(createData.weeksAhead).toBe(4);
    });

    it('should allow optional properties', () => {
      const createData: CreateScheduledWorkoutData = {
        routineId: 'routine-id',
      };

      expect(createData.routineId).toBe('routine-id');
      expect(createData.startDate).toBeUndefined();
      expect(createData.weeksAhead).toBeUndefined();
    });
  });

  describe('UpdateScheduledWorkoutData interface', () => {
    it('should have optional properties for updates', () => {
      const updateData: UpdateScheduledWorkoutData = {
        status: 'completed',
        completedAt: '2024-01-01T10:00:00Z',
        durationMinutes: 75,
        notes: 'Updated notes',
      };

      expect(updateData.status).toBe('completed');
      expect(updateData.completedAt).toBe('2024-01-01T10:00:00Z');
      expect(updateData.durationMinutes).toBe(75);
      expect(updateData.notes).toBe('Updated notes');
    });

    it('should allow partial updates', () => {
      const partialUpdate: UpdateScheduledWorkoutData = {
        status: 'completed',
      };

      expect(partialUpdate.status).toBe('completed');
      expect(partialUpdate.completedAt).toBeUndefined();
      expect(partialUpdate.durationMinutes).toBeUndefined();
      expect(partialUpdate.notes).toBeUndefined();
    });
  });
});
