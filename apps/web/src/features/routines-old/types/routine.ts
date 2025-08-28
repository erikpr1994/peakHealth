// Routine-related type definitions
// Extracted from types/index.ts to improve organization and maintainability

export interface Routine {
  id: string;
  name: string;
  description: string;
  // daysPerWeek is calculated dynamically from workout days
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  isActive: boolean;
  isFavorite: boolean;
  // Schedule is calculated dynamically from workout days
  progress: {
    current: number;
    total: number;
  };
  lastUsed?: string;
  objectives?: string[];
  totalWorkouts?: number;
  completedWorkouts?: number;
  estimatedDuration?: string;
  workoutDays?: WorkoutDay[];
}

export interface RoutineData {
  id: string;
  name: string;
  description: string;
  duration: number; // weeks
  // daysPerWeek is calculated dynamically from workout days
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  isActive: boolean;
  isFavorite: boolean;
  objectives?: string[];
  progress: {
    currentWeek: number;
    totalWeeks: number;
    completedWorkouts: number;
    totalWorkouts: number;
  };
  // Schedule is calculated dynamically from workout days
  workoutDays: WorkoutDay[];
  createdDate: string;
  lastModified: string;
}

export interface WorkoutDay {
  id: string;
  name: string;
  exercises: ExerciseDetail[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  schedule?: {
    repeatPattern: string;
    repeatValue: string;
    selectedDays: string[];
    time: string;
  };
}

export interface ExerciseDetail {
  id: string;
  variantId: string;
  name: string;
  sets: Array<{
    reps?: string;
    weight?: string;
    duration?: string;
    restTime: string;
  }>;
  notes?: string;
  muscleGroups: string[];
}
