'use client';

import { useReducer } from 'react';
import {
  routineBuilderReducer,
  RoutineBuilderState,
} from '../../context/routineBuilder';

type UseRoutineBuilderReturn = {
  state: RoutineBuilderState;
  dispatch: React.Dispatch<any>; // Using any for now as actions will grow
};

export const useRoutineBuilder = (
  initialState: RoutineBuilderState
): UseRoutineBuilderReturn => {
  const [state, dispatch] = useReducer(routineBuilderReducer, initialState);

  return { state, dispatch };
};
