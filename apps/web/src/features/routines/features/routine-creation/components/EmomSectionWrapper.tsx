'use client';

import React from 'react';
import { WorkoutSection } from '@/features/routines/types';
import { useEmomSectionOperations } from '@/features/routines/hooks/useEmomSectionOperations';
import EmomSection from './EmomSection';

interface EmomSectionWrapperProps {
  section: WorkoutSection;
  workoutId: string;
  isLastSection: boolean;
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
  onNotesClick: (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string
  ) => void;
}

const EmomSectionWrapper = React.memo(
  ({
    section,
    workoutId,
    isLastSection,
    onUpdateSectionName,
    onUpdateSectionEmomDuration,
    onUpdateSectionRestAfter,
    onRemoveSection,
    onAddExercise,
    onUpdateExerciseEmomReps,
    onUpdateExerciseName,
    onUpdateExerciseRestAfter,
    onRemoveExercise,
    onNotesClick,
  }: EmomSectionWrapperProps): React.ReactElement => {
    const emomOperations = useEmomSectionOperations({
      workoutId,
      sectionId: section.id,
      onUpdateSectionName,
      onUpdateSectionEmomDuration,
      onUpdateSectionRestAfter,
      onRemoveSection,
      onAddExercise,
      onUpdateExerciseEmomReps,
      onUpdateExerciseName,
      onUpdateExerciseRestAfter,
      onRemoveExercise,
    });

    const handleNotesClick = React.useCallback(
      (type: 'exercise' | 'set', exerciseId: string, setId?: string) => {
        onNotesClick(type, workoutId, section.id, exerciseId, setId);
      },
      [onNotesClick, workoutId, section.id]
    );

    return (
      <EmomSection
        section={section}
        workoutId={workoutId}
        isLastSection={isLastSection}
        onUpdateName={emomOperations.handleUpdateName}
        onUpdateDuration={emomOperations.handleUpdateDuration}
        onUpdateRestAfter={emomOperations.handleUpdateRestAfter}
        onRemove={emomOperations.handleRemove}
        onAddExercise={emomOperations.handleAddExercise}
        onUpdateExerciseEmomReps={emomOperations.handleUpdateExerciseEmomReps}
        onUpdateExerciseName={emomOperations.handleUpdateExerciseName}
        onUpdateExerciseRestAfter={emomOperations.handleUpdateExerciseRestAfter}
        onRemoveExercise={emomOperations.handleRemoveExercise}
        onNotesClick={handleNotesClick}
      />
    );
  }
);

EmomSectionWrapper.displayName = 'EmomSectionWrapper';

export default EmomSectionWrapper;
