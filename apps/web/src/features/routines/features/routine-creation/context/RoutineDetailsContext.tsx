'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useRoutineDetails } from '../hooks/useRoutineDetails';

interface RoutineDetails {
  name: string;
  difficulty: string;
  goal: string;
  description: string;
  objectives: string[];
  duration: number;
}

interface RoutineDetailsContextType {
  // State
  name: string;
  difficulty: string;
  goal: string;
  description: string;
  objectives: string[];
  duration: number;

  // Setters
  setName: (name: string) => void;
  setDifficulty: (difficulty: string) => void;
  setGoal: (goal: string) => void;
  setDescription: (description: string) => void;
  setObjectives: (objectives: string[]) => void;
  setDuration: (duration: number) => void;

  // Utilities
  updateRoutineDetails: (updates: Partial<RoutineDetails>) => void;
  resetRoutineDetails: () => void;
  getRoutineDetails: () => RoutineDetails;
}

const RoutineDetailsContext = createContext<
  RoutineDetailsContextType | undefined
>(undefined);

interface RoutineDetailsProviderProps {
  children: ReactNode;
  initialData?: Partial<RoutineDetails>;
}

export const RoutineDetailsProvider = ({
  children,
  initialData,
}: RoutineDetailsProviderProps): React.ReactElement => {
  const routineDetails = useRoutineDetails(initialData);

  return (
    <RoutineDetailsContext.Provider value={routineDetails}>
      {children}
    </RoutineDetailsContext.Provider>
  );
};

export const useRoutineDetailsContext = (): RoutineDetailsContextType => {
  const context = useContext(RoutineDetailsContext);
  if (context === undefined) {
    throw new Error(
      'useRoutineDetailsContext must be used within a RoutineDetailsProvider'
    );
  }
  return context;
};
