import { RoutineCreation } from '@/features/routinesV2/features/routine-creation/RoutineCreation';

const EditRoutinePage = (): React.ReactElement => {
  // TODO: get the routine id from the url
  return <RoutineCreation mode="edit" editRoutineId="1" />;
};

export default EditRoutinePage;
