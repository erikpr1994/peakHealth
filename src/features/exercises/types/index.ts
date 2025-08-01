export interface ExerciseVariant {
  id: string;
  name: string;
  description: string;
  focus: string;
  image?: string;
  muscleGroups?: string[];
  equipment?: string[];
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  instructions?: string[];
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  category: 'Strength' | 'Cardio' | 'Flexibility' | 'Balance';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment?: string[];
  isFavorite: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  rating?: number;
  variants?: ExerciseVariant[];
  mainVariantId?: string; // ID of the main/default variant
  icon: string;
  iconColor: string;
  description?: string;
  instructions?: string[];
  videoUrl?: string;
  videoDuration?: string;
}

export interface ExerciseData extends Exercise {
  totalRatings: number;
  type: string;
  mechanics: string;
  primaryMuscles: string[];
  steps: Array<{
    title: string;
    description: string;
  }>;
  proTips: string[];
  commonMistakes: string[];
}

export interface Routine {
  id: string;
  name: string;
  schedule: string;
  exercises: number;
  isSelected: boolean;
}

export interface FilterState {
  difficulties: string[];
  muscleGroups: string[];
  equipment: string[];
}

export interface ExerciseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExercise: (exercise: Exercise, variant?: ExerciseVariant) => void;
}
