// Database response types to avoid using 'any'
export interface DatabaseRoutine {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  days_per_week: number;
  duration: number;
  is_active: boolean;
  is_favorite: boolean;
  schedule: boolean[];
  objectives: string[];
  total_workouts: number;
  completed_workouts: number;
  estimated_duration: string;
  created_at: string;
  updated_at: string;
  last_used: string | null;
}

export interface DatabaseSet {
  id: string;
  setNumber: number;
  setType: string;
  reps: number | null;
  weight: number | null;
  rpe: number | null;
  notes: string;
  rest_time?: string;
  duration?: number;
}

export interface DatabaseExercise {
  id: string;
  name: string;
  muscle_groups?: string[];
  notes?: string;
  sets?: DatabaseSet[];
}

export interface DatabaseSection {
  id: string;
  name: string;
  exercises?: DatabaseExercise[];
}

export interface DatabaseWorkout {
  id: string;
  name: string;
  type: string;
  objective: string;
  order_index: number;
  schedule?: {
    selectedDays?: string[];
  };
  sections?: DatabaseSection[];
}

export interface DatabaseRoutineResponse {
  routine: DatabaseRoutine;
  workouts: DatabaseWorkout[];
}
