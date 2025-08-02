import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { exerciseService } from '../exerciseService';

// Mock the exercise service
vi.mock('../exerciseService');

const mockExerciseService = vi.mocked(exerciseService);

describe('Exercise API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/exercises', () => {
    it('should return all exercises when no search parameters are provided', async () => {
      const mockExercises = [
        { id: '1', name: 'Push-up' },
        { id: '2', name: 'Squat' },
      ] as any;

      mockExerciseService.getAllExercises.mockResolvedValue(mockExercises);

      // Create a mock request without search parameters
      const request = new NextRequest('http://localhost:3000/api/exercises');

      // Import the handler dynamically to avoid module loading issues
      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET(request);
      const data = await response.json();

      expect(mockExerciseService.getAllExercises).toHaveBeenCalledOnce();
      expect(mockExerciseService.searchExercises).not.toHaveBeenCalled();
      expect(data).toEqual({ exercises: mockExercises });
      expect(response.status).toBe(200);
    });

    it('should perform search when search parameters are provided', async () => {
      const mockSearchResults = [{ id: '1', name: 'Push-up' }] as any;
      const searchParams = {
        searchTerm: 'push',
        category: 'strength' as const,
        difficulty: 'beginner' as const,
        equipment: 'bodyweight' as const,
        muscleGroup: 'chest' as const,
      };

      mockExerciseService.searchExercises.mockResolvedValue(mockSearchResults);

      // Create a mock request with search parameters
      const url = new URL('http://localhost:3000/api/exercises');
      url.searchParams.set('search', 'push');
      url.searchParams.set('category', 'strength');
      url.searchParams.set('difficulty', 'beginner');
      url.searchParams.set('equipment', 'bodyweight');
      url.searchParams.set('muscleGroup', 'chest');

      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET(request);
      const data = await response.json();

      expect(mockExerciseService.searchExercises).toHaveBeenCalledWith(
        searchParams
      );
      expect(mockExerciseService.getAllExercises).not.toHaveBeenCalled();
      expect(data).toEqual({ exercises: mockSearchResults });
      expect(response.status).toBe(200);
    });

    it('should handle partial search parameters', async () => {
      const mockSearchResults = [{ id: '1', name: 'Push-up' }] as any;
      mockExerciseService.searchExercises.mockResolvedValue(mockSearchResults);

      // Create a mock request with only some search parameters
      const url = new URL('http://localhost:3000/api/exercises');
      url.searchParams.set('search', 'push');
      url.searchParams.set('category', 'strength');

      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET(request);
      const data = await response.json();

      expect(mockExerciseService.searchExercises).toHaveBeenCalledWith({
        searchTerm: 'push',
        category: 'strength',
        difficulty: undefined,
        equipment: undefined,
        muscleGroup: undefined,
      });
      expect(data).toEqual({ exercises: mockSearchResults });
    });

    it('should handle service errors gracefully', async () => {
      mockExerciseService.getAllExercises.mockRejectedValue(
        new Error('Database error')
      );

      const request = new NextRequest('http://localhost:3000/api/exercises');

      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Failed to fetch exercises' });
      expect(response.status).toBe(500);
    });

    it('should handle search service errors gracefully', async () => {
      mockExerciseService.searchExercises.mockRejectedValue(
        new Error('Search error')
      );

      const url = new URL('http://localhost:3000/api/exercises');
      url.searchParams.set('search', 'push');

      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Failed to fetch exercises' });
      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/exercises/favorites', () => {
    it('should add exercise to favorites successfully', async () => {
      mockExerciseService.addToFavorites.mockResolvedValue();

      const requestBody = { userId: 'user-1', exerciseId: 'exercise-1' };
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
        }
      );

      const { POST } = await import('@/app/api/exercises/favorites/route');
      const response = await POST(request);
      const data = await response.json();

      expect(mockExerciseService.addToFavorites).toHaveBeenCalledWith(
        'user-1',
        'exercise-1'
      );
      expect(data).toEqual({ success: true });
      expect(response.status).toBe(200);
    });

    it('should return 400 when userId is missing', async () => {
      const requestBody = { exerciseId: 'exercise-1' };
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
        }
      );

      const { POST } = await import('@/app/api/exercises/favorites/route');
      const response = await POST(request);
      const data = await response.json();

      expect(mockExerciseService.addToFavorites).not.toHaveBeenCalled();
      expect(data).toEqual({ error: 'User ID and Exercise ID are required' });
      expect(response.status).toBe(400);
    });

    it('should return 400 when exerciseId is missing', async () => {
      const requestBody = { userId: 'user-1' };
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
        }
      );

      const { POST } = await import('@/app/api/exercises/favorites/route');
      const response = await POST(request);
      const data = await response.json();

      expect(mockExerciseService.addToFavorites).not.toHaveBeenCalled();
      expect(data).toEqual({ error: 'User ID and Exercise ID are required' });
      expect(response.status).toBe(400);
    });

    it('should handle service errors gracefully', async () => {
      mockExerciseService.addToFavorites.mockRejectedValue(
        new Error('Database error')
      );

      const requestBody = { userId: 'user-1', exerciseId: 'exercise-1' };
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        {
          method: 'POST',
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
      const mockFavorites = [
        { id: '1', name: 'Push-up' },
        { id: '2', name: 'Squat' },
      ] as any;

      mockExerciseService.getUserFavoriteExercises.mockResolvedValue(
        mockFavorites
      );

      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('userId', 'user-1');

      const request = new NextRequest(url, { method: 'GET' });

      const { GET } = await import('@/app/api/exercises/favorites/route');
      const response = await GET(request);
      const data = await response.json();

      expect(mockExerciseService.getUserFavoriteExercises).toHaveBeenCalledWith(
        'user-1'
      );
      expect(data).toEqual({ exercises: mockFavorites });
      expect(response.status).toBe(200);
    });

    it('should return 400 when userId is missing', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/exercises/favorites',
        { method: 'GET' }
      );

      const { GET } = await import('@/app/api/exercises/favorites/route');
      const response = await GET(request);
      const data = await response.json();

      expect(
        mockExerciseService.getUserFavoriteExercises
      ).not.toHaveBeenCalled();
      expect(data).toEqual({ error: 'User ID is required' });
      expect(response.status).toBe(400);
    });

    it('should handle service errors gracefully', async () => {
      mockExerciseService.getUserFavoriteExercises.mockRejectedValue(
        new Error('Database error')
      );

      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('userId', 'user-1');

      const request = new NextRequest(url, { method: 'GET' });

      const { GET } = await import('@/app/api/exercises/favorites/route');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Failed to fetch user favorites' });
      expect(response.status).toBe(500);
    });
  });

  describe('DELETE /api/exercises/favorites', () => {
    it('should remove exercise from favorites successfully', async () => {
      mockExerciseService.removeFromFavorites.mockResolvedValue();

      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('userId', 'user-1');
      url.searchParams.set('exerciseId', 'exercise-1');

      const request = new NextRequest(url, { method: 'DELETE' });

      const { DELETE } = await import('@/app/api/exercises/favorites/route');
      const response = await DELETE(request);
      const data = await response.json();

      expect(mockExerciseService.removeFromFavorites).toHaveBeenCalledWith(
        'user-1',
        'exercise-1'
      );
      expect(data).toEqual({ success: true });
      expect(response.status).toBe(200);
    });

    it('should return 400 when userId is missing', async () => {
      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('exerciseId', 'exercise-1');

      const request = new NextRequest(url, { method: 'DELETE' });

      const { DELETE } = await import('@/app/api/exercises/favorites/route');
      const response = await DELETE(request);
      const data = await response.json();

      expect(mockExerciseService.removeFromFavorites).not.toHaveBeenCalled();
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

      expect(mockExerciseService.removeFromFavorites).not.toHaveBeenCalled();
      expect(data).toEqual({ error: 'User ID and Exercise ID are required' });
      expect(response.status).toBe(400);
    });

    it('should handle service errors gracefully', async () => {
      mockExerciseService.removeFromFavorites.mockRejectedValue(
        new Error('Database error')
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
