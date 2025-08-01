export interface WorkoutEvent {
  id: string;
  name: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  type: "Strength" | "Cardio" | "HIIT" | "Flexibility" | "Recovery";
  status: "scheduled" | "completed" | "missed" | "active";
  date: Date;
  time: string;
  exercises: number;
  estimatedCalories?: number;
  actualCalories?: number;
}

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  workouts: WorkoutEvent[];
}

export interface WorkoutTypeConfig {
  name: string;
  color: string;
  textColor: string;
  bgColor: string;
}

export interface StatusConfig {
  color: string;
  text: string;
  textColor: string;
}

export interface TimeOfDayConfig {
  period: string;
  color: string;
  bgColor: string;
}

export type ViewMode = "Month" | "Week" | "Day";

export interface CalendarStats {
  completedThisMonth: number;
  scheduledThisMonth: number;
  totalCaloriesBurned: number;
  avgDuration: number;
  daysWithMultipleSessions: number;
}
