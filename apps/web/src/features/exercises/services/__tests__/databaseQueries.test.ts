import { describe, it, expect, vi, beforeEach } from 'vitest';

import { exerciseDatabaseQueries } from '../databaseQueries';

// Mock Supabase client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

import { createClient } from '@/lib/supabase/server';

const mockCreateClient = vi.mocked(createClient);

describe('ExerciseDatabaseQueries', () => {
  let mockSupabase: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockSupabase = {
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
    };

    mockCreateClient.mockResolvedValue(mockSupabase);
  });

  describe('fetchExercisesWithRelatedData', () => {
    it('should fetch all exercises with related data successfully', async () => {
      const mockExercises = [{ id: '1', name: 'Push-up' }];
      const mockVariants = [
        { id: '1', exercise_id: '1', name: 'Standard Push-up' },
      ];
      const mockSteps = [{ id: '1', exercise_variant_id: '1', step_order: 1 }];
      const mockTips = [
        { id: '1', exercise_variant_id: '1', tip: 'Keep your core tight' },
      ];
      const mockMedia = [
        { id: '1', exercise_variant_id: '1', url: 'video.mp4' },
      ];

      mockSupabase.from
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            order: vi
              .fn()
              .mockResolvedValue({ data: mockExercises, error: null }),
          }),
        })
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            in: vi.fn().mockReturnValue({
              order: vi
                .fn()
                .mockResolvedValue({ data: mockVariants, error: null }),
            }),
          }),
        })
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            in: vi.fn().mockReturnValue({
              order: vi
                .fn()
                .mockResolvedValue({ data: mockSteps, error: null }),
            }),
          }),
        })
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            in: vi.fn().mockResolvedValue({ data: mockTips, error: null }),
          }),
        })
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            in: vi.fn().mockResolvedValue({ data: mockMedia, error: null }),
          }),
        });

      const result =
        await exerciseDatabaseQueries.fetchExercisesWithRelatedData();

      expect(result).toEqual({
        exercises: mockExercises,
        variants: mockVariants,
        steps: mockSteps,
        tips: mockTips,
        media: mockMedia,
      });
    });

    it('should handle empty exercises array', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
      });

      const result =
        await exerciseDatabaseQueries.fetchExercisesWithRelatedData();

      expect(result).toEqual({
        exercises: [],
        variants: [],
        steps: [],
        tips: [],
        media: [],
      });
    });

    it('should throw error when exercises query fails', async () => {
      const error = new Error('Database error');
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: null, error }),
        }),
      });

      await expect(
        exerciseDatabaseQueries.fetchExercisesWithRelatedData()
      ).rejects.toThrow('Database error');
    });
  });

  describe('fetchExerciseWithRelatedData', () => {
    it('should fetch single exercise with related data successfully', async () => {
      const exerciseId = '1';
      const mockExercise = { id: '1', name: 'Push-up' };
      const mockVariants = [
        { id: '1', exercise_id: '1', name: 'Standard Push-up' },
      ];
      const mockSteps = [{ id: '1', exercise_variant_id: '1', step_order: 1 }];
      const mockTips = [
        { id: '1', exercise_variant_id: '1', tip: 'Keep your core tight' },
      ];
      const mockMedia = [
        { id: '1', exercise_variant_id: '1', url: 'video.mp4' },
      ];

      mockSupabase.from
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi
                .fn()
                .mockResolvedValue({ data: mockExercise, error: null }),
            }),
          }),
        })
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              order: vi
                .fn()
                .mockResolvedValue({ data: mockVariants, error: null }),
            }),
          }),
        })
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            in: vi.fn().mockReturnValue({
              order: vi
                .fn()
                .mockResolvedValue({ data: mockSteps, error: null }),
            }),
          }),
        })
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            in: vi.fn().mockResolvedValue({ data: mockTips, error: null }),
          }),
        })
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            in: vi.fn().mockResolvedValue({ data: mockMedia, error: null }),
          }),
        });

      const result =
        await exerciseDatabaseQueries.fetchExerciseWithRelatedData(exerciseId);

      expect(result).toEqual({
        exercise: mockExercise,
        variants: mockVariants,
        steps: mockSteps,
        tips: mockTips,
        media: mockMedia,
      });
    });

    it('should handle exercise not found', async () => {
      const exerciseId = '1';
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: null }),
          }),
        }),
      });

      const result =
        await exerciseDatabaseQueries.fetchExerciseWithRelatedData(exerciseId);

      expect(result).toEqual({
        exercise: null,
        variants: [],
        steps: [],
        tips: [],
        media: [],
      });
    });
  });

  describe('searchExercisesWithJoins', () => {
    it('should search exercises with joins successfully', async () => {
      const searchTerm = 'push';
      const category = 'strength';
      const mockExercises = [
        { id: '1', name: 'Push-up', exercise_variants: [] },
      ];

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          or: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ data: mockExercises, error: null }),
          }),
        }),
      });

      const result = await exerciseDatabaseQueries.searchExercisesWithJoins(
        searchTerm,
        category
      );

      expect(result).toEqual(mockExercises);
    });

    it('should search without filters', async () => {
      const mockExercises = [
        { id: '1', name: 'Push-up', exercise_variants: [] },
      ];

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: mockExercises, error: null }),
      });

      const result = await exerciseDatabaseQueries.searchExercisesWithJoins();

      expect(result).toEqual(mockExercises);
    });
  });

  describe('fetchUserFavorites', () => {
    it('should fetch user favorites successfully', async () => {
      const userId = 'user-1';
      const mockFavorites = [
        { exercise_id: '1', exercises: { id: '1', name: 'Push-up' } },
      ];

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            order: vi
              .fn()
              .mockResolvedValue({ data: mockFavorites, error: null }),
          }),
        }),
      });

      const result = await exerciseDatabaseQueries.fetchUserFavorites(userId);

      expect(result).toEqual(mockFavorites);
    });
  });

  describe('addToFavorites', () => {
    it('should add exercise to favorites successfully', async () => {
      const userId = 'user-1';
      const exerciseId = '1';

      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ error: null }),
      });

      await expect(
        exerciseDatabaseQueries.addToFavorites(userId, exerciseId)
      ).resolves.toBeUndefined();
    });

    it('should throw error when insert fails', async () => {
      const userId = 'user-1';
      const exerciseId = '1';
      const error = new Error('Insert failed');

      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ error }),
      });

      await expect(
        exerciseDatabaseQueries.addToFavorites(userId, exerciseId)
      ).rejects.toThrow('Insert failed');
    });
  });

  describe('removeFromFavorites', () => {
    it('should remove exercise from favorites successfully', async () => {
      const userId = 'user-1';
      const exerciseId = '1';

      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
          }),
        }),
      });

      await expect(
        exerciseDatabaseQueries.removeFromFavorites(userId, exerciseId)
      ).resolves.toBeUndefined();
    });

    it('should throw error when delete fails', async () => {
      const userId = 'user-1';
      const exerciseId = '1';
      const error = new Error('Delete failed');

      mockSupabase.from.mockReturnValue({
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error }),
          }),
        }),
      });

      await expect(
        exerciseDatabaseQueries.removeFromFavorites(userId, exerciseId)
      ).rejects.toThrow('Delete failed');
    });
  });
});
