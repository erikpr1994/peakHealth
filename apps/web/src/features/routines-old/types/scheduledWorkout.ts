export interface ScheduledWorkout {
  id: string;
  userId: string;
  routineId: string;
  workoutId: string;
  scheduledDate: string; // ISO date string
  scheduledTime: string; // HH:MM format
  status: 'scheduled' | 'completed' | 'missed' | 'cancelled';
  completedAt?: string; // ISO timestamp
  durationMinutes?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseScheduledWorkout {
  id: string;
  user_id: string;
  routine_id: string;
  workout_id: string;
  scheduled_date: string;
  scheduled_time: string;
  status: 'scheduled' | 'completed' | 'missed' | 'cancelled';
  completed_at?: string;
  duration_minutes?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateScheduledWorkoutData {
  routineId: string;
  startDate?: string; // ISO date string, defaults to today
  weeksAhead?: number; // defaults to 4
}

export interface UpdateScheduledWorkoutData {
  status?: 'scheduled' | 'completed' | 'missed' | 'cancelled';
  completedAt?: string;
  durationMinutes?: number;
  notes?: string;
}
