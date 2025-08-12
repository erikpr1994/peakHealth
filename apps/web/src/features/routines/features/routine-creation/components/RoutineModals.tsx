'use client';

import ExerciseSelectionModal from '@/features/exercises/ExerciseSelectionModal';
import NotesModal from '@/components/shared/NotesModal';

interface RoutineModalsProps {
  exerciseModalOpen: boolean;
  notesModalOpen: boolean;
  currentNotesContext: {
    type: 'exercise' | 'set';
    workoutId: string;
    sectionId: string;
    exerciseId: string;
    setId?: string;
    currentNotes: string;
  } | null;
  onExerciseModalClose: () => void;
  onNotesModalClose: () => void;
  onExerciseSelect: (
    selectedExercise: {
      id: string;
      name: string;
      category?: string;
      muscleGroups?: string[];
    },
    selectedVariant?: {
      id: string;
      name: string;
      muscleGroups: string[];
      difficulty: string;
      equipment: string[];
      instructions: string[];
    }
  ) => void;
  onNotesSave: (notes: string) => void;
}

const RoutineModals = ({
  exerciseModalOpen,
  notesModalOpen,
  currentNotesContext,
  onExerciseModalClose,
  onNotesModalClose,
  onExerciseSelect,
  onNotesSave,
}: RoutineModalsProps): React.ReactElement => {
  return (
    <>
      <ExerciseSelectionModal
        isOpen={exerciseModalOpen}
        onClose={onExerciseModalClose}
        onSelectExercise={onExerciseSelect}
      />

      <NotesModal
        isOpen={notesModalOpen}
        onClose={onNotesModalClose}
        onSave={onNotesSave}
        initialNotes={currentNotesContext?.currentNotes || ''}
      />
    </>
  );
};

export default RoutineModals;
