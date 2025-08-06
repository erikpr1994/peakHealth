import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the Supabase client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('Exercise API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/exercises', () => {
    it('should return all exercises when no search parameters are provided', async () => {
      const mockExercises = [{ id: '1', name: 'Push-up' }];
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockExercises, error: null }),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

      const request = new NextRequest('http://localhost:3000/api/exercises');

      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET(request);
      const data = await response.json();

      expect(mockSupabase.from).toHaveBeenCalledWith('exercises');
      expect(data).toEqual({ exercises: mockExercises });
      expect(response.status).toBe(200);
    });

    it('should handle service errors gracefully', async () => {
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({
          data: null,
          error: new Error('Database error'),
        }),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

      const request = new NextRequest('http://localhost:3000/api/exercises');

      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Failed to fetch exercises' });
      expect(response.status).toBe(500);
    });

    it('should handle missing database connection', async () => {
      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(null);

      const request = new NextRequest('http://localhost:3000/api/exercises');

      const { GET } = await import('@/app/api/exercises/route');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Database connection not available' });
      expect(response.status).toBe(503);
    });
  });

  describe('GET /api/exercises/search', () => {
    it('should perform search when search parameters are provided', async () => {
      const mockSearchResults = [{ id: '1', name: 'Push-up' }];
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        ilike: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        contains: vi
          .fn()
          .mockResolvedValue({ data: mockSearchResults, error: null }),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

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

      expect(mockSupabase.from).toHaveBeenCalledWith('exercises');
      expect(data).toEqual({ exercises: mockSearchResults });
      expect(response.status).toBe(200);
    });

    it('should handle partial search parameters', async () => {
      const mockSearchResults = [{ id: '1', name: 'Push-up' }];
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        ilike: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ data: mockSearchResults, error: null }),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

      // Create a mock request with only some search parameters
      const url = new URL('http://localhost:3000/api/exercises/search');
      url.searchParams.set('q', 'push');
      url.searchParams.set('category', 'strength');

      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/search/route');
      const response = await GET(request);
      const data = await response.json();

      expect(mockSupabase.from).toHaveBeenCalledWith('exercises');
      expect(data).toEqual({ exercises: mockSearchResults });
      expect(response.status).toBe(200);
    });

    it('should handle search service errors gracefully', async () => {
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        ilike: vi.fn().mockResolvedValue({
          data: null,
          error: new Error('Database error'),
        }),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

      const url = new URL('http://localhost:3000/api/exercises/search');
      url.searchParams.set('q', 'push');

      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/search/route');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Failed to search exercises' });
      expect(response.status).toBe(500);
    });

    it('should handle missing database connection', async () => {
      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(null);

      const url = new URL('http://localhost:3000/api/exercises/search');
      url.searchParams.set('q', 'push');

      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/search/route');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toEqual({ error: 'Database connection not available' });
      expect(response.status).toBe(503);
    });
  });

  describe('POST /api/exercises/favorites', () => {
    it('should add exercise to favorites successfully', async () => {
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

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

      expect(mockSupabase.from).toHaveBeenCalledWith('favorites');
      expect(mockSupabase.insert).toHaveBeenCalledWith({
        user_id: 'user-1',
        exercise_id: 'exercise-1',
      });
      expect(response.status).toBe(200);
    });

    it('should return 400 when userId is missing', async () => {
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

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
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

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
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

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
      const mockFavorites = [{ id: '1', name: 'Push-up' }];
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockFavorites, error: null }),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('userId', 'user-1');

      const request = new NextRequest(url);

      const { GET } = await import('@/app/api/exercises/favorites/route');
      const response = await GET(request);
      const data = await response.json();

      expect(mockSupabase.from).toHaveBeenCalledWith('favorites');
      expect(mockSupabase.select).toHaveBeenCalledWith('*');
      expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', 'user-1');
      expect(data).toEqual({ exercises: mockFavorites });
      expect(response.status).toBe(200);
    });

    it('should return 400 when userId is missing', async () => {
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

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
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

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
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

      const url = new URL('http://localhost:3000/api/exercises/favorites');
      url.searchParams.set('userId', 'user-1');
      url.searchParams.set('exerciseId', 'exercise-1');

      const request = new NextRequest(url, { method: 'DELETE' });

      const { DELETE } = await import('@/app/api/exercises/favorites/route');
      const response = await DELETE(request);

      expect(mockSupabase.from).toHaveBeenCalledWith('favorites');
      expect(mockSupabase.delete).toHaveBeenCalledWith();
      expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', 'user-1');
      expect(mockSupabase.eq).toHaveBeenCalledWith('exercise_id', 'exercise-1');
      expect(response.status).toBe(200);
    });

    it('should return 400 when userId is missing', async () => {
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

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
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

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
      const mockSupabase = {
        from: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      };

      const { createClient } = await import('@/lib/supabase/server');
      vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

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
