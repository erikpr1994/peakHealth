import useSWR from 'swr';

import type { Exercise } from '../types';
import type {
  Category,
  Difficulty,
  Equipment,
  MuscleGroup,
} from '../types/constants';

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

// Hook to get all exercises
export function useExercises() {
  const { data, error, isLoading, mutate } = useSWR<{ exercises: Exercise[] }>(
    '/api/exercises',
    fetcher
  );

  return {
    exercises: data?.exercises || [],
    isLoading,
    error,
    mutate,
  };
}

// Hook to get a single exercise by ID
export function useExercise(exerciseId: string) {
  const { data, error, isLoading, mutate } = useSWR<{ exercise: Exercise }>(
    exerciseId ? `/api/exercises/${exerciseId}` : null,
    fetcher
  );

  return {
    exercise: data?.exercise,
    isLoading,
    error,
    mutate,
  };
}

// Hook to search exercises with filters
export function useExerciseSearch(params: {
  searchTerm?: string;
  category?: Category;
  difficulties?: Difficulty[];
  equipment?: Equipment[];
  muscleGroups?: MuscleGroup[];
}) {
  const searchParams = new URLSearchParams();

  if (params.searchTerm) searchParams.append('searchTerm', params.searchTerm);
  if (params.category) searchParams.append('category', params.category);

  // Handle multiple values for each filter type
  if (params.difficulties) {
    params.difficulties.forEach(difficulty => {
      searchParams.append('difficulty', difficulty);
    });
  }
  if (params.equipment) {
    params.equipment.forEach(eq => {
      searchParams.append('equipment', eq);
    });
  }
  if (params.muscleGroups) {
    params.muscleGroups.forEach(mg => {
      searchParams.append('muscleGroup', mg);
    });
  }

  const { data, error, isLoading, mutate } = useSWR<{ exercises: Exercise[] }>(
    searchParams.toString()
      ? `/api/exercises/search?${searchParams.toString()}`
      : null,
    fetcher
  );

  return {
    exercises: data?.exercises || [],
    isLoading,
    error,
    mutate,
  };
}

// Hook to get user's favorite exercises
export function useUserFavorites(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR<{ exercises: Exercise[] }>(
    userId ? `/api/exercises/favorites?userId=${userId}` : null,
    fetcher
  );

  return {
    favorites: data?.exercises || [],
    isLoading,
    error,
    mutate,
  };
}

// Hook to manage favorites (add/remove)
export function useFavoriteManagement() {
  const addToFavorites = async (userId: string, exerciseId: string) => {
    const response = await fetch('/api/exercises/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, exerciseId }),
    });

    if (!response.ok) {
      throw new Error('Failed to add to favorites');
    }

    return response.json();
  };

  const removeFromFavorites = async (userId: string, exerciseId: string) => {
    const response = await fetch(
      `/api/exercises/favorites?userId=${userId}&exerciseId=${exerciseId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to remove from favorites');
    }

    return response.json();
  };

  return {
    addToFavorites,
    removeFromFavorites,
  };
}
