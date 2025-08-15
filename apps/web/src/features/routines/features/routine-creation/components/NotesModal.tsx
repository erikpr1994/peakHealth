'use client';

import NotesModal from '@/components/shared/NotesModal';
import { useNotesContext } from '../context/NotesContext';

const RoutineNotesModal = (): React.ReactElement => {
  const {
    notesModalOpen,
    closeNotesModal,
    handleNotesSave,
    currentNotesContext,
  } = useNotesContext();

  return (
    <NotesModal
      isOpen={notesModalOpen}
      onClose={closeNotesModal}
      onSave={handleNotesSave}
      initialNotes={currentNotesContext?.currentNotes || ''}
    />
  );
};

export default RoutineNotesModal;
