export interface NotesContext {
  type: 'exercise' | 'set';
  workoutId: string;
  sectionId: string;
  exerciseId: string;
  setId?: string;
  currentNotes: string;
}

// Import exercise types from dedicated file
import type {
  ExerciseSelectionData,
  ExerciseVariantData,
} from '../../../types/exercise';
export type { ExerciseSelectionData, ExerciseVariantData };

export interface ExerciseModalContext {
  workoutId: string;
  sectionId: string;
}

export type ModalType = 'exercise' | 'notes';

export type ModalContext = {
  exercise: ExerciseModalContext;
  notes: NotesContext;
};

export interface ModalState {
  modal: ModalType | null;
  context: ModalContext[keyof ModalContext] | null;
}
