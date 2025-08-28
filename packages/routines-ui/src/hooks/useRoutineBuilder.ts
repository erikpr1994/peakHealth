'use client';

import { useReducer } from 'react';
import {
  routineBuilderReducer,
  RoutineBuilderState,
} from '../../context/routineBuilder/routineBuilderReducer';
import { RoutineBuilderAction } from '../../context/routineBuilder/types';

type UseRoutineBuilderReturn = {
  state: RoutineBuilderState;
  dispatch: React.Dispatch<RoutineBuilderAction>;
};

export const useRoutineBuilder = (
  initialState: RoutineBuilderState
): UseRoutineBuilderReturn => {
  const [state, dispatch] = useReducer(routineBuilderReducer, initialState);

  return { state, dispatch };
};
