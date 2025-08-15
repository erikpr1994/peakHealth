'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';
import {
  ProgressionMethod,
  StrengthWorkout,
  RunningWorkout,
} from '../../../types';

interface ExerciseSelectionData {
  id: string;
  name: string;
  category?: string;
  muscleGroups?: string[];
}

interface ExerciseVariantData {
  id: string;
  name: string;
  muscleGroups: string[];
  difficulty: string;
  equipment: string[];
  instructions: string[];
}

interface ExerciseContextData {
  workoutId: string;
  sectionId: string;
}

interface ExerciseSelectionContextType {
  // State
  exerciseModalOpen: boolean;
  currentAddExerciseContext: ExerciseContextData | null;

  // Setters
  setExerciseModalOpen: (open: boolean) => void;
  setCurrentAddExerciseContext: (context: ExerciseContextData | null) => void;

  // Actions
  openExerciseModal: (workoutId: string, sectionId: string) => void;
  closeExerciseModal: () => void;
  handleExerciseSelect: (
    selectedExercise: ExerciseSelectionData,
    selectedVariant?: ExerciseVariantData
  ) => void;
}

const ExerciseSelectionContext = createContext<
  ExerciseSelectionContextType | undefined
>(undefined);

interface ExerciseSelectionProviderProps {
  children: ReactNode;
  strengthWorkouts: StrengthWorkout[];
  runningWorkouts: RunningWorkout[];
  addStrengthExercise: (
    workoutId: string,
    sectionId: string,
    exercise: Record<string, unknown>
  ) => void;
  addRunningExercise: (
    workoutId: string,
    sectionId: string,
    exercise: Record<string, unknown>
  ) => void;
}

export const ExerciseSelectionProvider = ({
  children,
  strengthWorkouts,
  runningWorkouts,
  addStrengthExercise,
  addRunningExercise,
}: ExerciseSelectionProviderProps): React.ReactElement => {
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [currentAddExerciseContext, setCurrentAddExerciseContext] =
    useState<ExerciseContextData | null>(null);

  const openExerciseModal = (workoutId: string, sectionId: string): void => {
    setCurrentAddExerciseContext({ workoutId, sectionId });
    setExerciseModalOpen(true);
  };

  const closeExerciseModal = (): void => {
    setExerciseModalOpen(false);
    setCurrentAddExerciseContext(null);
  };

  const handleExerciseSelect = (
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
  ): void => {
    if (!currentAddExerciseContext) return;

    const { workoutId, sectionId } = currentAddExerciseContext;
    const isStrength = strengthWorkouts.some(w => w.id === workoutId);

    // Use variant data if available, otherwise fall back to exercise data
    const exerciseData = selectedVariant || selectedExercise;

    const newExercise = {
      id: `exercise-${Date.now()}`,
      name: exerciseData.name,
      category: selectedExercise.category,
      muscleGroups: exerciseData.muscleGroups,
      equipment: selectedVariant?.equipment || [],
      exerciseId: selectedExercise.id,
      variantId: selectedVariant?.id,
      sets: [],
      restTimer: '90s',
      restAfter: '2 min',
      notes: '',
      progressionMethod: isStrength
        ? ('linear' as ProgressionMethod)
        : undefined,
      hasApproachSets: false,
    };

    if (isStrength) {
      addStrengthExercise(workoutId, sectionId, newExercise);
    } else {
      addRunningExercise(workoutId, sectionId, newExercise);
    }

    closeExerciseModal();
  };

  const value: ExerciseSelectionContextType = {
    exerciseModalOpen,
    currentAddExerciseContext,
    setExerciseModalOpen,
    setCurrentAddExerciseContext,
    openExerciseModal,
    closeExerciseModal,
    handleExerciseSelect,
  };

  return (
    <ExerciseSelectionContext.Provider value={value}>
      {children}
    </ExerciseSelectionContext.Provider>
  );
};

export const useExerciseSelectionContext = (): ExerciseSelectionContextType => {
  const context = useContext(ExerciseSelectionContext);
  if (context === undefined) {
    throw new Error(
      'useExerciseSelectionContext must be used within an ExerciseSelectionProvider'
    );
  }
  return context;
};
