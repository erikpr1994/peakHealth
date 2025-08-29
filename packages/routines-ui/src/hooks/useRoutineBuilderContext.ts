'use client';

import { useContext } from 'react';
import {
  RoutineBuilderContext,
  RoutineBuilderContextType,
} from '../context/routineBuilder/RoutineBuilderContext';

export const useRoutineBuilderContext = (): RoutineBuilderContextType => {
  const context = useContext(RoutineBuilderContext);
  if (context === undefined) {
    throw new Error(
      'useRoutineBuilderContext must be used within a RoutineBuilderProvider'
    );
  }
  return context;
};
