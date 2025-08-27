export interface RoutineCreationData {
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  description: string;
  objectives: string[];
  duration: number; // in weeks
}
