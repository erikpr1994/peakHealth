import useSWR from 'swr';

// Types for the exercise library
export interface ExerciseLibraryExercise {
  id: string;
  name: string;
  description: string;
  category: 'Strength' | 'Cardio' | 'Flexibility' | 'Balance';
  muscleGroups: string[];
  equipment: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
  iconColor: string;
}

// Filter parameters for the hook
export interface ExerciseFilters {
  searchTerm?: string;
  category?: ExerciseLibraryExercise['category'] | 'All';
  muscleGroup?: string | 'All';
  difficulty?: ExerciseLibraryExercise['difficulty'] | 'All';
}

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await globalThis.fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to parse URL from ${url}`);
  }
  return response.json();
};

// Hook to get all exercises with optional filtering
export function useExercises(filters?: ExerciseFilters) {
  // Build query parameters
  const searchParams = new URLSearchParams();

  if (filters?.searchTerm) {
    searchParams.append('searchTerm', filters.searchTerm);
  }
  if (filters?.category && filters.category !== 'All') {
    searchParams.append('category', filters.category);
  }
  if (filters?.muscleGroup && filters.muscleGroup !== 'All') {
    searchParams.append('muscleGroup', filters.muscleGroup);
  }
  if (filters?.difficulty && filters.difficulty !== 'All') {
    searchParams.append('difficulty', filters.difficulty);
  }

  const queryString = searchParams.toString();
  const url = queryString ? `/api/exercises?${queryString}` : '/api/exercises';

  const { data, error, isLoading, mutate } = useSWR<{
    exercises: ExerciseLibraryExercise[];
  }>(url, fetcher);

  return {
    exercises: data?.exercises || [],
    isLoading,
    error,
    mutate,
  };
}

// Hook to get a single exercise by ID
export function useExercise(exerciseId: string) {
  const { data, error, isLoading, mutate } = useSWR<{
    exercise: ExerciseLibraryExercise;
  }>(exerciseId ? `/api/exercises/${exerciseId}` : null, fetcher);

  return {
    exercise: data?.exercise,
    isLoading,
    error,
    mutate,
  };
}
