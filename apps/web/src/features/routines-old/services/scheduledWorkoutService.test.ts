import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScheduledWorkoutService } from './scheduledWorkoutService';

// Mock the Supabase client
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      eq: vi.fn(),
      gte: vi.fn(),
      lte: vi.fn(),
      order: vi.fn(),
      single: vi.fn(),
    })),
    rpc: vi.fn(),
  })),
}));

describe('ScheduledWorkoutService', () => {
  let service: ScheduledWorkoutService;
  let mockSupabase: ReturnType<typeof vi.fn> & {
    auth: { getUser: ReturnType<typeof vi.fn> };
    rpc: ReturnType<typeof vi.fn>;
    from: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ScheduledWorkoutService();
    mockSupabase = (service as unknown as { supabase: typeof mockSupabase })
      .supabase;
  });

  describe('generateScheduledWorkouts', () => {
    it('should generate scheduled workouts successfully', async () => {
      // Mock authentication
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });

      // Mock RPC call
      mockSupabase.rpc.mockResolvedValue({
        data: 12,
        error: null,
      });

      const result = await service.generateScheduledWorkouts({
        routineId: 'routine-123',
        startDate: '2024-01-01',
        weeksAhead: 4,
      });

      expect(result.success).toBe(true);
      expect(result.count).toBe(12);
      expect(result.message).toBe('Generated 12 scheduled workouts');
      expect(mockSupabase.rpc).toHaveBeenCalledWith(
        'generate_scheduled_workouts',
        {
          routine_id_param: 'routine-123',
          start_date_param: '2024-01-01',
          weeks_ahead_param: 4,
        }
      );
    });

    it('should handle authentication errors', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Not authenticated' },
      });

      await expect(
        service.generateScheduledWorkouts({
          routineId: 'routine-123',
        })
      ).rejects.toThrow('Not authenticated');
    });

    it('should handle RPC errors', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });

      mockSupabase.rpc.mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      });

      const result = await service.generateScheduledWorkouts({
        routineId: 'routine-123',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Failed to generate scheduled workouts');
    });
  });

  describe('clearScheduledWorkouts', () => {
    it('should clear scheduled workouts successfully', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });

      mockSupabase.rpc.mockResolvedValue({
        data: 5,
        error: null,
      });

      const result = await service.clearScheduledWorkouts('routine-123');

      expect(result.success).toBe(true);
      expect(result.count).toBe(5);
      expect(result.message).toBe('Cleared 5 scheduled workouts');
      expect(mockSupabase.rpc).toHaveBeenCalledWith(
        'clear_scheduled_workouts',
        {
          routine_id_param: 'routine-123',
        }
      );
    });
  });

  describe('hasActiveRoutine', () => {
    it('should return true when user has an active routine', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });

      const mockFrom = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: 'routine-123', name: 'Active Routine' },
                error: null,
              }),
            }),
          }),
        }),
      });

      mockSupabase.from = mockFrom;

      const result = await service.hasActiveRoutine();

      expect(result.hasActive).toBe(true);
      expect(result.activeRoutineId).toBe('routine-123');
      expect(result.activeRoutineName).toBe('Active Routine');
    });

    it('should return false when user has no active routine', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });

      const mockFrom = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: null,
                error: { code: 'PGRST116' },
              }),
            }),
          }),
        }),
      });

      mockSupabase.from = mockFrom;

      const result = await service.hasActiveRoutine();

      expect(result.hasActive).toBe(false);
      expect(result.activeRoutineId).toBeUndefined();
      expect(result.activeRoutineName).toBeUndefined();
    });
  });

  describe('getScheduledWorkouts', () => {
    it('should get scheduled workouts with filters', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });

      const mockData = [
        {
          id: 'sw-1',
          user_id: 'user-123',
          routine_id: 'routine-123',
          workout_id: 'workout-123',
          scheduled_date: '2024-01-01',
          scheduled_time: '09:00',
          status: 'scheduled',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      const mockFrom = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            order: vi.fn().mockReturnValue({
              order: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                  gte: vi.fn().mockReturnValue({
                    lte: vi.fn().mockReturnValue({
                      eq: vi.fn().mockResolvedValue({
                        data: mockData,
                        error: null,
                      }),
                    }),
                  }),
                }),
              }),
            }),
          }),
        }),
      });

      mockSupabase.from = mockFrom;

      const result = await service.getScheduledWorkouts({
        routineId: 'routine-123',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        status: 'scheduled',
      });

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('sw-1');
      expect(result[0].routineId).toBe('routine-123');
      expect(result[0].workoutId).toBe('workout-123');
    });
  });

  describe('updateScheduledWorkout', () => {
    it('should update scheduled workout successfully', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null,
      });

      const mockData = {
        id: 'sw-1',
        user_id: 'user-123',
        routine_id: 'routine-123',
        workout_id: 'workout-123',
        scheduled_date: '2024-01-01',
        scheduled_time: '09:00',
        status: 'completed',
        completed_at: '2024-01-01T10:00:00Z',
        duration_minutes: 60,
        notes: 'Great workout!',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T10:00:00Z',
      };

      const mockFrom = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: 'sw-1' },
                error: null,
              }),
            }),
          }),
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: mockData,
                error: null,
              }),
            }),
          }),
        }),
      });

      mockSupabase.from = mockFrom;

      const result = await service.updateScheduledWorkout('sw-1', {
        status: 'completed',
        completedAt: '2024-01-01T10:00:00Z',
        durationMinutes: 60,
        notes: 'Great workout!',
      });

      expect(result.id).toBe('sw-1');
      expect(result.status).toBe('completed');
      expect(result.completedAt).toBe('2024-01-01T10:00:00Z');
      expect(result.durationMinutes).toBe(60);
      expect(result.notes).toBe('Great workout!');
    });
  });
});
