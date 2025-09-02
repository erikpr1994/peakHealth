export interface InversePyramidEditorProps {
  exerciseId: string;
  workoutId: string;
  sectionId: string;
}

export interface InversePyramidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateSets: (sets: Array<{ weight: number; reps: number }>) => void;
}
