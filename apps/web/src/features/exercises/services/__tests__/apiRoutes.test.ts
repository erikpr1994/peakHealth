import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { CATEGORY } from '../../types/constants';
import { createExerciseId, createExerciseVariantId } from '../../types/ids';

// Mock the Supabase client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

// Mock the data access utilities
vi.mock('@/lib/data-access', () => ({
  canAccessOwnWorkouts: vi.fn(),
  DATA_ACCESS_LEVELS: {
    OWN: 'own',
    GROUP: 'group',
    ALL: 'all',
  },
}));

// Mock Exercise type for testing
const createMockExercise = (id: string, name: string) => ({
  id: createExerciseId(id),
  name,
  category: CATEGORY.STRENGTH,
  description: 'A basic exercise',
  variants: [],
  mainVariantId: createExerciseVariantId('variant-1'),
  icon: 'dumbbell',
  iconColor: 'blue',
  isFavorite: false,
  isPopular: false,
  isNew: false,
  rating: 4.5,
  tags: [],
  relatedExercises: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

// Mock the exercise service
vi.mock('@/features/exercises/services/exerciseService', () => ({
  exerciseService: {
    getAllExercises: vi.fn(),
    getExerciseById: vi.fn(),
    searchExercises: vi.fn(),
    getUserFavoriteExercises: vi.fn(),
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn(),
  },
}));

describe('Exercise API Routes', () => {
  let mockSupabase: any;
  let mockAuth: any;
  let mockDataAccess: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock Supabase client
    const { createClient } = await import('@/lib/supabase/server');
    mockSupabase = {
      auth: {
        getUser: vi.fn(),
      },
    };
    vi.mocked(createClient).mockResolvedValue(mockSupabase);

    // Mock authentication
    mockAuth = {
      data: {
        user: {
          id: 'test-user-id',
          app_metadata: {
            user_types: ['basic'],
            subscription_tiers: ['free'],
            user_groups: ['default'],
            data_access_rules: {
              exercises: 'own',
              workouts: 'own',
              profiles: 'own',
            },
          },
        },
      },
      error: null,
    };
    mockSupabase.auth.getUser.mockResolvedValue(mockAuth);

    // Mock data access
    const { canAccessOwnWorkouts } = await import('@/lib/data-access');
    mockDataAccess = vi.mocked(canAccessOwnWorkouts);
    mockDataAccess.mockReturnValue(true);
  });

  describe('GET /api/exercises', () => {
    it('should return all exercises when no search parameters are provided', async () => {
      const mockExercises = [createMockExercise('1', 'Push-up')] as any;
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.getAllExercises).mockResolvedValue(
        mockExercises
      );

      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET();
      const data = await response.json();

      expect(exerciseService.getAllExercises).toHaveBeenCalled();
      expect(data).toEqual({ exercises: mockExercises });
      expect(response.status).toBe(200);
    });

    it('should handle service errors gracefully', async () => {
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.getAllExercises).mockRejectedValue(
        new Error('Service error')
      );

      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET();
      const data = await response.json();

      expect(data).toEqual({ error: 'Failed to fetch exercises' });
      expect(response.status).toBe(500);
    });

    it('should return 401 when not authenticated', async () => {
      mockAuth.error = new Error('Not authenticated');
      mockAuth.data.user = null;

      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET();
      const data = await response.json();

      expect(data).toEqual({ error: 'Not authenticated' });
      expect(response.status).toBe(401);
    });

    it('should return 403 when user lacks workout access', async () => {
      mockDataAccess.mockReturnValue(false);

      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET();
      const data = await response.json();

      expect(data).toEqual({
        error: 'Insufficient permissions to access exercise data',
      });
      expect(response.status).toBe(403);
    });
  });

  describe('GET /api/exercises/search', () => {
    it('should perform search when search parameters are provided', async () => {
      const mockSearchResults = [createMockExercise('1', 'Push-up')] as any;
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.searchExercises).mockResolvedValue(
        mockSearchResults
      );

      // Create a mock request with search parameters
      const url = new URL('http://localhost:3000/api/exercises/search');
      url.searchParams.set('q', 'push');
      url.searchParams.set('category', 'strength');
      url.searchParams.set('difficulty', 'beginner');
      url.searchParams.set('equipment', 'bodyweight');
      url.searchParams.set('muscleGroup', 'chest');

      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/search/route');
      const response = await GET(request);
      const data = await response.json();

      expect(exerciseService.searchExercises).toHaveBeenCalledWith({
        searchTerm: 'push',
        category: 'strength',
        difficulties: ['beginner'],
        equipment: ['bodyweight'],
        muscleGroups: ['chest'],
      });
      expect(data).toEqual({ exercises: mockSearchResults });
      expect(response.status).toBe(200);
    });

    it('should handle partial search parameters', async () => {
      const mockSearchResults = [createMockExercise('1', 'Push-up')] as any;
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.searchExercises).mockResolvedValue(
        mockSearchResults
      );

      // Create a mock request with only some search parameters
      const url = new URL('http://localhost:3000/api/exercises/search');
      url.searchParams.set('q', 'push');
      url.searchParams.set('category', 'strength');

      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/search/route');
      const response = await GET(request);
      const data = await response.json();

      expect(exerciseService.searchExercises).toHaveBeenCalledWith({
        searchTerm: 'push',
        category: 'strength',
        difficulties: undefined,
        equipment: undefined,
        muscleGroups: undefined,
      });
      expect(data).toEqual({ exercises: mockSearchResults });
      expect(response.status).toBe(200);
    });

    it('should handle search service errors gracefully', async () => {
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.searchExercises).mockRejectedValue(
        new Error('Search service error')
      );

      const url = new URL('http://localhost:3000/api/exercises/search');
      url.searchParams.set('q', 'push');
      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/search/route');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Failed to search exercises' });
      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/exercises/[exerciseId]', () => {
    it('should return exercise when found', async () => {
      const mockExercise = createMockExercise('1', 'Push-up') as any;
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.getExerciseById).mockResolvedValue(
        mockExercise
      );

      const { GET } = await import('@/app/api/exercises/[exerciseId]/route');
      const response = await GET({} as NextRequest, {
        params: Promise.resolve({ exerciseId: '1' }),
      });
      const data = await response.json();

      expect(exerciseService.getExerciseById).toHaveBeenCalledWith('1');
      expect(data).toEqual({ exercise: mockExercise });
      expect(response.status).toBe(200);
    });

    it('should return 404 when exercise not found', async () => {
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.getExerciseById).mockResolvedValue(null);

      const { GET } = await import('@/app/api/exercises/[exerciseId]/route');
      const response = await GET({} as NextRequest, {
        params: Promise.resolve({ exerciseId: '999' }),
      });
      const data = await response.json();

      expect(data).toEqual({ error: 'Exercise not found' });
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/exercises/favorites', () => {
    it('should add exercise to favorites successfully', async () => {
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.addToFavorites).mockResolvedValue();

      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
          body: JSON.stringify({
            userId: 'test-user-id', // Use the same user ID as in the mock
            exerciseId: 'exercise-1',
          }),
        }
      );

      const { POST } = await import('@/app/api/exercises/favorites/route');
      const response = await POST(request);

      expect(exerciseService.addToFavorites).toHaveBeenCalledWith(
        'test-user-id',
        'exercise-1'
      );
      expect(response.status).toBe(200);
    });

    it('should return 400 when userId is missing', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
          body: JSON.stringify({
            exerciseId: 'exercise-1',
          }),
        }
      );

      const { POST } = await import('@/app/api/exercises/favorites/route');
      const response = await POST(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'User ID and Exercise ID are required' });
      expect(response.status).toBe(400);
    });

    it('should return 400 when exerciseId is missing', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
          body: JSON.stringify({
            userId: 'test-user-id',
          }),
        }
      );

      const { POST } = await import('@/app/api/exercises/favorites/route');
      const response = await POST(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'User ID and Exercise ID are required' });
      expect(response.status).toBe(400);
    });

    it('should handle service errors gracefully', async () => {
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.addToFavorites).mockRejectedValue(
        new Error('Service error')
      );

      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
          body: JSON.stringify({
            userId: 'test-user-id',
            exerciseId: 'exercise-1',
          }),
        }
      );

      const { POST } = await import('@/app/api/exercises/favorites/route');
      const response = await POST(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Failed to add to favorites' });
      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/exercises/favorites', () => {
    it('should return user favorites successfully', async () => {
      const mockFavorites = [createMockExercise('1', 'Push-up')] as any;
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.getUserFavoriteExercises).mockResolvedValue(
        mockFavorites
      );

      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('userId', 'test-user-id'); // Use the same user ID as in the mock
      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/favorites/route');
      const response = await GET(request);
      const data = await response.json();

      expect(exerciseService.getUserFavoriteExercises).toHaveBeenCalledWith(
        'test-user-id'
      );
      expect(data).toEqual({ exercises: mockFavorites });
      expect(response.status).toBe(200);
    });

    it('should return 400 when userId is missing', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites'
      );

      const { GET } = await import('@/app/api/exercises/favorites/route');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'User ID is required' });
      expect(response.status).toBe(400);
    });

    it('should handle service errors gracefully', async () => {
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.getUserFavoriteExercises).mockRejectedValue(
        new Error('Service error')
      );

      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('userId', 'test-user-id');
      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/favorites/route');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Failed to fetch user favorites' });
      expect(response.status).toBe(500);
    });
  });

  describe('DELETE /api/exercises/favorites', () => {
    it('should remove exercise from favorites successfully', async () => {
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.removeFromFavorites).mockResolvedValue();

      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('userId', 'test-user-id'); // Use the same user ID as in the mock
      url.searchParams.set('exerciseId', 'exercise-1');
      const request = new NextRequest(url);

      const { DELETE } = await import('@/app/api/exercises/favorites/route');
      const response = await DELETE(request);

      expect(exerciseService.removeFromFavorites).toHaveBeenCalledWith(
        'test-user-id',
        'exercise-1'
      );
      expect(response.status).toBe(200);
    });

    it('should return 400 when userId is missing', async () => {
      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('exerciseId', 'exercise-1');
      const request = new NextRequest(url);

      const { DELETE } = await import('@/app/api/exercises/favorites/route');
      const response = await DELETE(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'User ID and Exercise ID are required' });
      expect(response.status).toBe(400);
    });

    it('should return 400 when exerciseId is missing', async () => {
      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('userId', 'test-user-id');
      const request = new NextRequest(url);

      const { DELETE } = await import('@/app/api/exercises/favorites/route');
      const response = await DELETE(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'User ID and Exercise ID are required' });
      expect(response.status).toBe(400);
    });

    it('should handle service errors gracefully', async () => {
      const { exerciseService } = await import(
        '@/features/exercises/services/exerciseService'
      );
      vi.mocked(exerciseService.removeFromFavorites).mockRejectedValue(
        new Error('Service error')
      );

      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('userId', 'test-user-id');
      url.searchParams.set('exerciseId', 'exercise-1');
      const request = new NextRequest(url);

      const { DELETE } = await import('@/app/api/exercises/favorites/route');
      const response = await DELETE(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Failed to remove from favorites' });
      expect(response.status).toBe(500);
    });
  });
});
