'use client';

import ExerciseSelectionModal from '@/features/exercises/ExerciseSelectionModal';
import { useExerciseSelectionContext } from '../context/ExerciseSelectionContext';

const RoutineExerciseSelectionModal = (): React.ReactElement => {
  const { exerciseModalOpen, closeExerciseModal, handleExerciseSelect } =
    useExerciseSelectionContext();

  return (
    <ExerciseSelectionModal
      isOpen={exerciseModalOpen}
      onClose={closeExerciseModal}
      onSelectExercise={handleExerciseSelect}
    />
  );
};

export default RoutineExerciseSelectionModal;
