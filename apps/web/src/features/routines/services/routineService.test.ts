import { routineService } from './routineService';
import { createClient } from '@supabase/supabase-js';
import { vi } from 'vitest';

// Mock Supabase
vi.mock('@supabase/supabase-js');

const mockSupabase = {
  from: vi.fn(),
  rpc: vi.fn(),
  auth: {
    getUser: vi.fn(),
  },
};

(createClient as ReturnType<typeof vi.fn>).mockReturnValue(
  mockSupabase as unknown as ReturnType<typeof createClient>
);

describe('routineService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock authentication
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user-1', email: 'test@example.com' } },
      error: null,
    });

          // Mock the service's supabase client directly
      (routineService as unknown as { supabase: typeof mockSupabase }).supabase = mockSupabase;
  });

  describe('getUserRoutines', () => {
    it('should fetch user routines successfully', async () => {
      const mockRoutines = [
        {
          id: 'routine-1',
          name: 'Test Routine',
          description: 'Test Description',
          difficulty: 'Intermediate',
          goal: 'Strength',
          is_active: true,
          is_favorite: false,
          objectives: ['Build strength'],
          duration: 12,
          estimated_duration: '45-60 min',
          created_at: '2024-01-01',
          updated_at: '2024-01-01',
          last_used: null,
        },
      ];

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({
              data: mockRoutines,
              error: null,
            }),
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      const result = await routineService.getUserRoutines();

      expect(result).toBeDefined();
      expect(mockSupabase.from).toHaveBeenCalledWith('routines');
    });

    it('should handle error when fetching routines', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database error' },
            }),
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      await expect(routineService.getUserRoutines()).rejects.toThrow(
        'Database error'
      );
    });
  });

  describe('getRoutineById', () => {
    it('should fetch routine by id successfully', async () => {
      const mockRoutineData = {
        routine: {
          id: 'routine-1',
          name: 'Test Routine',
          isActive: true,
          isFavorite: false,
        },
        workouts: [],
      };

      // Mock the routine check
      mockSupabase.from.mockReturnValueOnce({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: 'routine-1', user_id: 'user-1' },
                error: null,
              }),
            }),
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      // Mock the RPC call
      mockSupabase.rpc.mockResolvedValue({
        data: mockRoutineData,
        error: null,
      });

      const result = await routineService.getRoutineById('routine-1');

      expect(result).toEqual(mockRoutineData);
      expect(mockSupabase.rpc).toHaveBeenCalledWith('get_complete_routine', {
        routine_id_param: 'routine-1',
      });
    });

    it('should handle error when fetching routine by id', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: null,
                error: { message: 'Routine not found' },
              }),
            }),
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      await expect(routineService.getRoutineById('invalid-id')).rejects.toThrow(
        'Routine not found'
      );
    });
  });

  describe('toggleRoutineFavorite', () => {
    it('should toggle routine favorite status successfully', async () => {
      // Mock the select call
      mockSupabase.from.mockReturnValueOnce({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { is_favorite: false },
                error: null,
              }),
            }),
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      // Mock the update call
      mockSupabase.from.mockReturnValueOnce({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: null,
              error: null,
            }),
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      await routineService.toggleRoutineFavorite('routine-1');

      expect(mockSupabase.from).toHaveBeenCalledWith('routines');
    });

    it('should handle error when toggling favorite status', async () => {
      // Mock the select call
      mockSupabase.from.mockReturnValueOnce({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { is_favorite: false },
                error: null,
              }),
            }),
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      // Mock the update call with error
      mockSupabase.from.mockReturnValueOnce({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'Update failed' },
            }),
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      await expect(
        routineService.toggleRoutineFavorite('routine-1')
      ).rejects.toThrow('Update failed');
    });
  });

  describe('setActiveRoutine', () => {
    it('should set active routine successfully', async () => {
      // Mock the deactivate call
      mockSupabase.from.mockReturnValueOnce({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            data: null,
            error: null,
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      // Mock the activate call
      mockSupabase.from.mockReturnValueOnce({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: null,
              error: null,
            }),
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      await routineService.setActiveRoutine('routine-1');

      expect(mockSupabase.from).toHaveBeenCalledWith('routines');
    });

    it('should handle error when setting active routine', async () => {
      // Mock the deactivate call
      mockSupabase.from.mockReturnValueOnce({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({
            data: null,
            error: null,
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      // Mock the activate call with error
      mockSupabase.from.mockReturnValueOnce({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'Activation failed' },
            }),
          }),
        }),
      } as unknown as ReturnType<typeof mockSupabase.from>);

      await expect(
        routineService.setActiveRoutine('routine-1')
      ).rejects.toThrow('Activation failed');
    });
  });
});
