import { Page } from '@/types/app';

export interface WorkoutPreparationProps {
  routineId: string;
  onStartWorkout: () => void;
  onNavigate: (page: Page) => void;
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
  onNavigate: (page: Page) => void;
}

export type WorkoutFlowState = 'preparation' | 'active' | 'completed';
