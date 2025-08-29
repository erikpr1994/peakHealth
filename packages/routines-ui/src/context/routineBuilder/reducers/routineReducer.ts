import { RoutineBuilderState } from '../types';

type UpdateRoutineNamePayload = {
  name: string;
};

export const updateRoutineName = (
  state: RoutineBuilderState,
  payload: UpdateRoutineNamePayload
): RoutineBuilderState => {
  return {
    ...state,
    name: payload.name,
  };
};
