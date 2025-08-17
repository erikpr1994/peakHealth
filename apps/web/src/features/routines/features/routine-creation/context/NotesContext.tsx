'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';

interface NotesContextData {
  type: 'exercise' | 'set';
  workoutId: string;
  sectionId: string;
  exerciseId: string;
  setId?: string;
  currentNotes: string;
}

interface NotesContextType {
  // State
  notesModalOpen: boolean;
  currentNotesContext: NotesContextData | null;

  // Actions
  openNotesModal: (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string,
    currentNotes?: string
  ) => void;
  closeNotesModal: () => void;
  handleNotesSave: (notes: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode;
  onNotesSave: (context: NotesContextData, notes: string) => void;
}

export const NotesProvider = ({
  children,
  onNotesSave,
}: NotesProviderProps): React.ReactElement => {
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [currentNotesContext, setCurrentNotesContext] =
    useState<NotesContextData | null>(null);

  const openNotesModal = (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string,
    currentNotes = ''
  ): void => {
    setCurrentNotesContext({
      type,
      workoutId,
      sectionId,
      exerciseId,
      setId,
      currentNotes,
    });
    setNotesModalOpen(true);
  };

  const closeNotesModal = (): void => {
    setNotesModalOpen(false);
    setCurrentNotesContext(null);
  };

  const handleNotesSave = (notes: string): void => {
    if (!currentNotesContext) return;

    onNotesSave(currentNotesContext, notes);
    closeNotesModal();
  };

  const value: NotesContextType = {
    notesModalOpen,
    currentNotesContext,
    openNotesModal,
    closeNotesModal,
    handleNotesSave,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export const useNotesContext = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
};
