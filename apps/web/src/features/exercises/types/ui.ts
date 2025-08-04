/**
 * UI-specific types for exercise components
 */

import type { Difficulty, Equipment, MuscleGroup } from './constants';
import type { Exercise, ExerciseVariant } from './exercise';

// Filter state for exercise lists
export interface FilterState {
  difficulties: Difficulty[];
  muscleGroups: MuscleGroup[];
  equipment: Equipment[];
}

// Exercise selection modal props
export interface ExerciseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExercise: (exercise: Exercise, variant?: ExerciseVariant) => void;
}

// Exercise card props
export interface ExerciseCardProps {
  exercise: Exercise;
  variant?: ExerciseVariant;
  onSelect?: (exercise: Exercise, variant?: ExerciseVariant) => void;
  onFavorite?: (exerciseId: string) => void;
  showVariantSelector?: boolean;
}

// Exercise list props
export interface ExerciseListProps {
  exercises: Exercise[];
  onExerciseSelect: (exercise: Exercise, variant?: ExerciseVariant) => void;
  filters?: FilterState;
  loading?: boolean;
}

// Search and filter props
export interface SearchAndFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
  filters: FilterState;
  searchQuery: string;
}
