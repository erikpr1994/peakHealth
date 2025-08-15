'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';
import { StrengthWorkout, RunningWorkout } from '../../../types';

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

  // Setters
  setNotesModalOpen: (open: boolean) => void;
  setCurrentNotesContext: (context: NotesContextData | null) => void;

  // Actions
  openNotesModal: (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string
  ) => void;
  closeNotesModal: () => void;
  handleNotesSave: (notes: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode;
  strengthWorkouts: StrengthWorkout[];
  runningWorkouts: RunningWorkout[];
  setStrengthWorkouts: React.Dispatch<React.SetStateAction<StrengthWorkout[]>>;
  setRunningWorkouts: React.Dispatch<React.SetStateAction<RunningWorkout[]>>;
}

export const NotesProvider = ({
  children,
  strengthWorkouts,
  runningWorkouts,
  setStrengthWorkouts,
  setRunningWorkouts,
}: NotesProviderProps): React.ReactElement => {
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [currentNotesContext, setCurrentNotesContext] =
    useState<NotesContextData | null>(null);

  const openNotesModal = (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string
  ): void => {
    const isStrength = strengthWorkouts.some(w => w.id === workoutId);
    const workouts = isStrength ? strengthWorkouts : runningWorkouts;
    const workout = workouts.find(
      (w: StrengthWorkout | RunningWorkout) => w.id === workoutId
    );
    const section = workout?.sections.find(s => s.id === sectionId);
    const exercise = section?.exercises.find(e => e.id === exerciseId);

    if (!exercise) return;

    let currentNotes = '';
    if (type === 'exercise') {
      currentNotes = exercise.notes;
    } else if (type === 'set' && setId) {
      const set = exercise.sets.find(s => s.id === setId);
      currentNotes = set?.notes || '';
    }

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

    const { type, workoutId, sectionId, exerciseId, setId } =
      currentNotesContext;
    const isStrength = strengthWorkouts.some(w => w.id === workoutId);

    if (type === 'exercise') {
      if (isStrength) {
        setStrengthWorkouts(prev =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prev.map((workout: any) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  sections: workout.sections.map((section: any) =>
                    section.id === sectionId
                      ? {
                          ...section,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          exercises: section.exercises.map((exercise: any) =>
                            exercise.id === exerciseId
                              ? { ...exercise, notes }
                              : exercise
                          ),
                        }
                      : section
                  ),
                }
              : workout
          )
        );
      } else {
        setRunningWorkouts(prev =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prev.map((workout: any) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  sections: workout.sections.map((section: any) =>
                    section.id === sectionId
                      ? {
                          ...section,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          exercises: section.exercises.map((exercise: any) =>
                            exercise.id === exerciseId
                              ? { ...exercise, notes }
                              : exercise
                          ),
                        }
                      : section
                  ),
                }
              : workout
          )
        );
      }
    } else if (type === 'set' && setId) {
      if (isStrength) {
        setStrengthWorkouts(prev =>
          prev.map((workout: StrengthWorkout) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  sections: workout.sections.map(section =>
                    section.id === sectionId
                      ? {
                          ...section,
                          exercises: section.exercises.map(exercise =>
                            exercise.id === exerciseId
                              ? {
                                  ...exercise,
                                  sets: exercise.sets.map(set =>
                                    set.id === setId ? { ...set, notes } : set
                                  ),
                                }
                              : exercise
                          ),
                        }
                      : section
                  ),
                }
              : workout
          )
        );
      } else {
        setRunningWorkouts(prev =>
          prev.map((workout: RunningWorkout) =>
            workout.id === workoutId
              ? {
                  ...workout,
                  sections: workout.sections.map(section =>
                    section.id === sectionId
                      ? {
                          ...section,
                          exercises: section.exercises.map(exercise =>
                            exercise.id === exerciseId
                              ? {
                                  ...exercise,
                                  sets: exercise.sets.map(set =>
                                    set.id === setId ? { ...set, notes } : set
                                  ),
                                }
                              : exercise
                          ),
                        }
                      : section
                  ),
                }
              : workout
          )
        );
      }
    }

    closeNotesModal();
  };

  const value: NotesContextType = {
    notesModalOpen,
    currentNotesContext,
    setNotesModalOpen,
    setCurrentNotesContext,
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
