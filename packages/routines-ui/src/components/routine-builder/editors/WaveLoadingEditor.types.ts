export interface WaveLoadingEditorProps {
  exerciseId: string;
  workoutId: string;
  sectionId: string;
}

export interface WaveLoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateSets: (sets: Array<{ weight: number; reps: number }>) => void;
}
