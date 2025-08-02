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
  difficulty?: Difficulty;
  equipment?: Equipment;
  muscleGroup?: MuscleGroup;
}) {
  const searchParams = new URLSearchParams();

  if (params.searchTerm) searchParams.append('search', params.searchTerm);
  if (params.category) searchParams.append('category', params.category);
  if (params.difficulty) searchParams.append('difficulty', params.difficulty);
  if (params.equipment) searchParams.append('equipment', params.equipment);
  if (params.muscleGroup)
    searchParams.append('muscleGroup', params.muscleGroup);

  searchParams.append('action', 'search');

  const { data, error, isLoading, mutate } = useSWR<{ exercises: Exercise[] }>(
    searchParams.toString()
      ? `/api/exercises?${searchParams.toString()}`
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
    userId ? `/api/exercises?action=favorites&userId=${userId}` : null,
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
