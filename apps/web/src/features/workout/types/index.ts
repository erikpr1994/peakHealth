export interface WorkoutPreparationProps {
  routineId: string;
  onStartWorkout: () => void;
}

export interface RoutineDetails {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: string;
  estimatedDuration: string;
  totalExercises: number;
  totalSets: number;
  muscleGroups: string[];
  equipment: string[];
}

export interface WorkoutTrackerContainerProps {
  routineId: string;
}

export type WorkoutFlowState = 'preparation' | 'active' | 'completed';
