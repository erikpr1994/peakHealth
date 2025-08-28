'use client';

import { createContext, Dispatch, ReactNode, useContext } from 'react';
import { RoutineBuilderAction, RoutineBuilderState } from './types';

export type RoutineBuilderContextType = {
  state: RoutineBuilderState;
  dispatch: Dispatch<RoutineBuilderAction>;
};

export const RoutineBuilderContext = createContext<
  RoutineBuilderContextType | undefined
>(undefined);

type RoutineBuilderProviderProps = {
  children: ReactNode;
  value: RoutineBuilderContextType;
};

export const RoutineBuilderProvider = ({
  children,
  value,
}: RoutineBuilderProviderProps): ReactNode => {
  return (
    <RoutineBuilderContext.Provider value={value}>
      {children}
    </RoutineBuilderContext.Provider>
  );
};
