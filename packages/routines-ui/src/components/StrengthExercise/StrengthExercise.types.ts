export interface StrengthExerciseProps {
  workoutId: string;
  sectionId: string;
  exerciseId: string;
  showApproachSetsToggle?: boolean; // Controlled by parent section
  showProgressionMethods?: boolean; // Controlled by parent section
}
