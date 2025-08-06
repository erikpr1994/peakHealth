import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { CATEGORY } from '../../types/constants';
import { createExerciseId, createExerciseVariantId } from '../../types/ids';

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
  beforeEach(() => {
    vi.clearAllMocks();
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
        new Error('Service error')
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

      const request = new NextRequest('http://localhost:3000/api/exercises/1');
      const { GET } = await import('@/app/api/exercises/[exerciseId]/route');
      const response = await GET(request, {
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

      const request = new NextRequest(
        'http://localhost:3000/api/exercises/999'
      );
      const { GET } = await import('@/app/api/exercises/[exerciseId]/route');
      const response = await GET(request, {
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

      const requestBody = { userId: 'user-1', exerciseId: 'exercise-1' };
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const { POST } = await import('@/app/api/exercises/favorites/route');
      const response = await POST(request);

      expect(exerciseService.addToFavorites).toHaveBeenCalledWith(
        'user-1',
        'exercise-1'
      );
      expect(response.status).toBe(200);
    });

    it('should return 400 when userId is missing', async () => {
      const requestBody = { exerciseId: 'exercise-1' };
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const { POST } = await import('@/app/api/exercises/favorites/route');
      const response = await POST(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'User ID and Exercise ID are required' });
      expect(response.status).toBe(400);
    });

    it('should return 400 when exerciseId is missing', async () => {
      const requestBody = { userId: 'user-1' };
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
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

      const requestBody = { userId: 'user-1', exerciseId: 'exercise-1' };
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
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
      url.searchParams.set('userId', 'user-1');

      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/favorites/route');
      const response = await GET(request);
      const data = await response.json();

      expect(exerciseService.getUserFavoriteExercises).toHaveBeenCalledWith(
        'user-1'
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
      url.searchParams.set('userId', 'user-1');

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
      url.searchParams.set('userId', 'user-1');
      url.searchParams.set('exerciseId', 'exercise-1');

      const request = new NextRequest(url, { method: 'DELETE' });

      const { DELETE } = await import('@/app/api/exercises/favorites/route');
      const response = await DELETE(request);

      expect(exerciseService.removeFromFavorites).toHaveBeenCalledWith(
        'user-1',
        'exercise-1'
      );
      expect(response.status).toBe(200);
    });

    it('should return 400 when userId is missing', async () => {
      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('exerciseId', 'exercise-1');

      const request = new NextRequest(url, { method: 'DELETE' });

      const { DELETE } = await import('@/app/api/exercises/favorites/route');
      const response = await DELETE(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'User ID and Exercise ID are required' });
      expect(response.status).toBe(400);
    });

    it('should return 400 when exerciseId is missing', async () => {
      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('userId', 'user-1');

      const request = new NextRequest(url, { method: 'DELETE' });

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
      url.searchParams.set('userId', 'user-1');
      url.searchParams.set('exerciseId', 'exercise-1');

      const request = new NextRequest(url, { method: 'DELETE' });

      const { DELETE } = await import('@/app/api/exercises/favorites/route');
      const response = await DELETE(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Failed to remove from favorites' });
      expect(response.status).toBe(500);
    });
  });
});
