// Database response types to avoid using 'any'
export interface DatabaseRoutine {
  id: string;
  user_id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  // days_per_week is calculated dynamically from workout days
  duration: number;
  is_active: boolean;
  is_favorite: boolean;
  // Schedule is calculated dynamically from workout days
  objectives: string[];
  total_workouts: number;
  completed_workouts: number;
  estimated_duration: string;
  created_at: string;
  updated_at: string;
  last_used: string | null;
}

// Import exercise types from dedicated file
import type { DatabaseSet, DatabaseExercise } from './exercise';
export type { DatabaseSet, DatabaseExercise };

export interface DatabaseSection {
  id: string;
  name: string;
  type: string;
  exercises?: DatabaseExercise[];
  rest_after?: string;
  emom_duration?: number;
}

export interface DatabaseWorkout {
  id: string;
  name: string;
  type: string;
  objective: string | null;
  order_index: number;
  schedule?: {
    repeatPattern?: string;
    repeatValue?: string;
    selectedDays?: string[];
    time?: string;
  };
  sections?: DatabaseSection[];
  trail_running_data?: Record<string, unknown>; // TODO: Define proper type for trail running data
}

export interface DatabaseRoutineResponse {
  routine: DatabaseRoutine;
  workouts: DatabaseWorkout[];
}

// Interface for RPC function response (camelCase fields)
export interface DatabaseRoutineRPCResponse {
  routine: {
    id: string;
    name: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
    duration: number;
    isActive: boolean;
    isFavorite: boolean;
    objectives: string[];
    totalWorkouts: number;
    completedWorkouts: number;
    estimatedDuration: string;
    createdAt: string;
    updatedAt: string;
    lastUsed: string | null;
  };
  workouts: DatabaseWorkout[];
}

export interface DatabaseRoutineWithWorkouts extends DatabaseRoutine {
  workouts?: Array<{
    id: string;
    name: string;
    type: string;
    objective: string | null;
    order_index: number;
    schedule?: {
      repeatPattern?: string;
      repeatValue?: string;
      selectedDays?: string[];
      time?: string;
    };
  }>;
}
