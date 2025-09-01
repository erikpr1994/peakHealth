// Exercise types for the modal
export interface ExerciseLibraryExercise {
  id: string;
  name: string;
  description: string;
  category: 'Strength' | 'Cardio' | 'Flexibility' | 'Balance';
  muscleGroups: string[];
  equipment: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
  iconColor: string;
}

export interface ExerciseLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedExercises: ExerciseLibraryExercise[]) => void;
  initialFilter?: {
    category?: ExerciseLibraryExercise['category'];
    muscleGroup?: string;
    difficulty?: ExerciseLibraryExercise['difficulty'];
  };
}
