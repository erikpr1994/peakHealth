export interface NotesContext {
  type: 'exercise' | 'set';
  workoutId: string;
  sectionId: string;
  exerciseId: string;
  setId?: string;
  currentNotes: string;
}

export interface ExerciseSelectionData {
  id: string;
  name: string;
  category?: string;
  muscleGroups?: string[];
}

export interface ExerciseVariantData {
  id: string;
  name: string;
  muscleGroups: string[];
  difficulty: string;
  equipment: string[];
  instructions: string[];
}

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
