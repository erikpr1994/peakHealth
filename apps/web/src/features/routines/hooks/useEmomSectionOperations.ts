import { useCallback } from 'react';

interface UseEmomSectionOperationsProps {
  workoutId: string;
  sectionId: string;
  onUpdateSectionName: (
    workoutId: string,
    sectionId: string,
    name: string
  ) => void;
  onUpdateSectionEmomDuration: (
    workoutId: string,
    sectionId: string,
    duration: number
  ) => void;
  onUpdateSectionRestAfter: (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ) => void;
  onRemoveSection: (workoutId: string, sectionId: string) => void;
  onAddExercise: (workoutId: string, sectionId: string) => void;
  onUpdateExerciseEmomReps: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ) => void;
  onUpdateExerciseName: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ) => void;
  onUpdateExerciseRestAfter: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ) => void;
  onRemoveExercise: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
}

export const useEmomSectionOperations = ({
  workoutId,
  sectionId,
  onUpdateSectionName,
  onUpdateSectionEmomDuration,
  onUpdateSectionRestAfter,
  onRemoveSection,
  onAddExercise,
  onUpdateExerciseEmomReps,
  onUpdateExerciseName,
  onUpdateExerciseRestAfter,
  onRemoveExercise,
}: UseEmomSectionOperationsProps): {
  handleUpdateName: (name: string) => void;
  handleUpdateDuration: (duration: number) => void;
  handleUpdateRestAfter: (restAfter: string) => void;
  handleRemove: () => void;
  handleAddExercise: () => void;
  handleUpdateExerciseEmomReps: (exerciseId: string, reps: number) => void;
  handleUpdateExerciseName: (exerciseId: string, name: string) => void;
  handleUpdateExerciseRestAfter: (
    exerciseId: string,
    restAfter: string
  ) => void;
  handleRemoveExercise: (exerciseId: string) => void;
} => {
  const handleUpdateName = useCallback(
    (name: string) => {
      onUpdateSectionName(workoutId, sectionId, name);
    },
    [workoutId, sectionId, onUpdateSectionName]
  );

  const handleUpdateDuration = useCallback(
    (duration: number) => {
      onUpdateSectionEmomDuration(workoutId, sectionId, duration);
    },
    [workoutId, sectionId, onUpdateSectionEmomDuration]
  );

  const handleUpdateRestAfter = useCallback(
    (restAfter: string) => {
      onUpdateSectionRestAfter(workoutId, sectionId, restAfter);
    },
    [workoutId, sectionId, onUpdateSectionRestAfter]
  );

  const handleRemove = useCallback(() => {
    onRemoveSection(workoutId, sectionId);
  }, [workoutId, sectionId, onRemoveSection]);

  const handleAddExercise = useCallback(() => {
    onAddExercise(workoutId, sectionId);
  }, [workoutId, sectionId, onAddExercise]);

  const handleUpdateExerciseEmomReps = useCallback(
    (exerciseId: string, reps: number) => {
      onUpdateExerciseEmomReps(workoutId, sectionId, exerciseId, reps);
    },
    [workoutId, sectionId, onUpdateExerciseEmomReps]
  );

  const handleUpdateExerciseName = useCallback(
    (exerciseId: string, name: string) => {
      onUpdateExerciseName(workoutId, sectionId, exerciseId, name);
    },
    [workoutId, sectionId, onUpdateExerciseName]
  );

  const handleUpdateExerciseRestAfter = useCallback(
    (exerciseId: string, restAfter: string) => {
      onUpdateExerciseRestAfter(workoutId, sectionId, exerciseId, restAfter);
    },
    [workoutId, sectionId, onUpdateExerciseRestAfter]
  );

  const handleRemoveExercise = useCallback(
    (exerciseId: string) => {
      onRemoveExercise(workoutId, sectionId, exerciseId);
    },
    [workoutId, sectionId, onRemoveExercise]
  );

  return {
    handleUpdateName,
    handleUpdateDuration,
    handleUpdateRestAfter,
    handleRemove,
    handleAddExercise,
    handleUpdateExerciseEmomReps,
    handleUpdateExerciseName,
    handleUpdateExerciseRestAfter,
    handleRemoveExercise,
  };
};
