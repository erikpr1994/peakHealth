'use client';

import React, { useReducer } from 'react';
import { routineBuilderReducer } from '../context/routineBuilder/routineBuilderReducer';
import {
  RoutineBuilderAction,
  RoutineBuilderState,
} from '../context/routineBuilder/types';

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
