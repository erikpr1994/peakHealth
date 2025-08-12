// Database response types to avoid using 'any'
export interface DatabaseRoutine {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  goal: string;
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

export interface DatabaseWorkout {
  id: string;
  name: string;
  type: string;
  objective: string;
  order_index: number;
  schedule?: {
    selectedDays?: string[];
  };
  sections?: Array<{
    id: string;
    name: string;
    exercises?: Array<{
      id: string;
      name: string;
      sets?: Array<{
        id: string;
        setNumber: number;
        setType: string;
        reps: number | null;
        weight: number | null;
        rpe: number | null;
        notes: string;
      }>;
    }>;
  }>;
}

export interface DatabaseRoutineResponse {
  routine: DatabaseRoutine;
  workouts: DatabaseWorkout[];
}
