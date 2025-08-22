'use client';

import { useEffect } from 'react';

import { StrengthWorkout, RunningWorkout } from '@/features/routines/types';
import { DatabaseWorkout } from '../../types/database';
import { transformDatabaseWorkout } from '../../utils/dataTransformers';
import { routineService } from '../../services/routineService';

// Import our new components and hooks
import RoutineHeader from './components/RoutineHeader';
import RoutineDetailsForm from './components/RoutineDetailsForm';
import StrengthWorkoutsSection from './components/StrengthWorkoutsSection';
import RunningWorkoutsSection from './components/RunningWorkoutsSection';
import { useWorkoutOperations } from '../../hooks/useWorkoutOperations';
import { useRoutineCreationState } from '../../hooks/useRoutineCreationState';
import { useRoutineCreationHandlers } from '../../hooks/useRoutineCreationHandlers';
import { useRoutineModals } from './hooks';
import ExerciseSelectionModal from '@/features/exercises/ExerciseSelectionModal';
import NotesModal from '@/components/shared/NotesModal';

interface RoutineCreationProps {
  editRoutineId?: string;
  mode?: 'create' | 'edit';
}

const RoutineCreation = ({
  editRoutineId,
  mode = 'create',
}: RoutineCreationProps): React.ReactElement => {
  // Modal state management
  const { isModalOpen, closeModal, getModalContext } = useRoutineModals();

  // Use our extracted state hook
  const {
    name,
    difficulty,
    goal,
    description,
    objectives,
    duration,
    creatingRunning,
    editingRunning,
    collapsedStrengthWorkouts,
    collapsedRunningWorkouts,
    setName,
    setDifficulty,
    setGoal,
    setDescription,
    setObjectives,
    setDuration,
    setCreatingRunning,
    setEditingRunning,
    toggleStrengthWorkoutCollapse,
    toggleRunningWorkoutCollapse,
    handleAddRunningWorkout,
    handleRunningCancel,
    handleEditRunning,
  } = useRoutineCreationState();

  // Use our new workout operations hook
  const {
    strengthWorkouts,
    setStrengthWorkouts,
    runningWorkouts,
    setRunningWorkouts,
    addStrengthWorkout,
    removeStrengthWorkout,
    moveStrengthWorkout,
    updateStrengthWorkoutName,
    updateStrengthWorkoutObjective,
    updateStrengthWorkoutSchedule,
    removeRunningWorkout,
    moveRunningWorkout,
    updateRunningWorkoutName,
    updateRunningWorkoutObjective,
    updateRunningWorkoutSchedule,
    addStrengthSection,
    addRunningSection,
    removeStrengthSection,
    removeRunningSection,
    updateStrengthSectionName,
    updateRunningSectionName,
    updateStrengthSectionType,
    updateRunningSectionType,
    updateStrengthSectionRestAfter,
    updateRunningSectionRestAfter,
    updateStrengthSectionEmomDuration,
    updateRunningSectionEmomDuration,
    addStrengthExercise,
    addRunningExercise,
    removeStrengthExercise,
    removeRunningExercise,
    updateStrengthExerciseName,
    updateRunningExerciseName,
    updateStrengthExerciseSets,
    updateRunningExerciseSets,
    updateStrengthRestTimer,
    updateRunningRestTimer,
    updateStrengthExerciseRestAfter,
    updateRunningExerciseRestAfter,
    updateStrengthExerciseEmomReps,
    updateRunningExerciseEmomReps,
    updateStrengthExerciseProgressionMethod,
  } = useWorkoutOperations();

  // Use our extracted handlers hook
  const {
    handleSaveRoutine,
    handleRunningSave,
    handleAddExerciseClick,
    handleExerciseSelect,
    handleNotesClick,
    handleNotesSave,
    handleAddApproachSets,
  } = useRoutineCreationHandlers(
    name,
    difficulty,
    goal,
    description,
    objectives,
    duration,
    creatingRunning,
    editingRunning,
    setCreatingRunning,
    setEditingRunning,
    strengthWorkouts,
    runningWorkouts,
    setStrengthWorkouts,
    setRunningWorkouts,
    addStrengthExercise,
    addRunningExercise,
    updateStrengthExerciseSets,
    updateRunningExerciseSets
  );

  // Load routine data if editing
  useEffect(() => {
    const loadRoutineForEditing = async (): Promise<void> => {
      if (editRoutineId && mode === 'edit') {
        try {
          const data = await routineService.getRoutineById(editRoutineId);

          // Set routine metadata
          setName(data.routine.name);
          setDifficulty(data.routine.difficulty);
          setGoal(data.routine.goal);
          setDescription(data.routine.description);
          setObjectives(data.routine.objectives || []);
          setDuration(data.routine.duration || 12);

          // Transform and load workouts data using safe transformation
          if (data.workouts) {
            const strengthWorkoutsData: StrengthWorkout[] = [];
            const runningWorkoutsData: RunningWorkout[] = [];

            data.workouts.forEach((workout: DatabaseWorkout) => {
              const transformedWorkout = transformDatabaseWorkout(workout);
              if (transformedWorkout) {
                if (transformedWorkout.type === 'strength') {
                  strengthWorkoutsData.push(transformedWorkout);
                } else if (transformedWorkout.type === 'running') {
                  runningWorkoutsData.push(transformedWorkout);
                }
              }
            });

            // Set the transformed workouts data
            setStrengthWorkouts(strengthWorkoutsData);
            setRunningWorkouts(runningWorkoutsData);
          }

          // Debug logging removed for production
        } catch {
          // Error handling without console.log
        }
      }
    };

    loadRoutineForEditing();
  }, [
    editRoutineId,
    mode,
    setStrengthWorkouts,
    setRunningWorkouts,
    setName,
    setDifficulty,
    setGoal,
    setDescription,
    setObjectives,
    setDuration,
  ]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <RoutineHeader mode={mode} onSave={handleSaveRoutine} />

      <RoutineDetailsForm
        name={name}
        difficulty={difficulty}
        goal={goal}
        description={description}
        objectives={objectives}
        duration={duration}
        onNameChange={setName}
        onDifficultyChange={setDifficulty}
        onGoalChange={setGoal}
        onDescriptionChange={setDescription}
        onObjectivesChange={setObjectives}
        onDurationChange={setDuration}
      />

      <StrengthWorkoutsSection
        strengthWorkouts={strengthWorkouts}
        collapsedStrengthWorkouts={collapsedStrengthWorkouts}
        onAddStrengthWorkout={addStrengthWorkout}
        onToggleCollapse={toggleStrengthWorkoutCollapse}
        onMoveUp={workoutId => moveStrengthWorkout(workoutId, 'up')}
        onMoveDown={workoutId => moveStrengthWorkout(workoutId, 'down')}
        onRemove={removeStrengthWorkout}
        onUpdateName={updateStrengthWorkoutName}
        onUpdateObjective={updateStrengthWorkoutObjective}
        onUpdateSchedule={updateStrengthWorkoutSchedule}
        onAddSection={addStrengthSection}
        onUpdateSectionName={updateStrengthSectionName}
        onUpdateSectionType={updateStrengthSectionType}
        onUpdateSectionRestAfter={updateStrengthSectionRestAfter}
        onUpdateSectionEmomDuration={updateStrengthSectionEmomDuration}
        onRemoveSection={removeStrengthSection}
        onAddExercise={handleAddExerciseClick}
        onUpdateExerciseEmomReps={updateStrengthExerciseEmomReps}
        onUpdateExerciseSets={updateStrengthExerciseSets}
        onUpdateExerciseName={updateStrengthExerciseName}
        onUpdateRestTimer={updateStrengthRestTimer}
        onUpdateExerciseRestAfter={updateStrengthExerciseRestAfter}
        onRemoveExercise={removeStrengthExercise}
        onAddApproachSets={handleAddApproachSets}
        onUpdateProgressionMethod={updateStrengthExerciseProgressionMethod}
        onNotesClick={handleNotesClick}
      />

      <RunningWorkoutsSection
        runningWorkouts={runningWorkouts}
        collapsedRunningWorkouts={collapsedRunningWorkouts}
        creatingRunning={creatingRunning}
        editingRunning={editingRunning}
        onAddRunningWorkout={handleAddRunningWorkout}
        onRunningSave={handleRunningSave}
        onRunningCancel={handleRunningCancel}
        onEditRunning={workoutId =>
          handleEditRunning(workoutId, runningWorkouts)
        }
        onToggleCollapse={toggleRunningWorkoutCollapse}
        onMoveUp={workoutId => moveRunningWorkout(workoutId, 'up')}
        onMoveDown={workoutId => moveRunningWorkout(workoutId, 'down')}
        onRemove={removeRunningWorkout}
        onUpdateName={updateRunningWorkoutName}
        onUpdateObjective={updateRunningWorkoutObjective}
        onUpdateSchedule={updateRunningWorkoutSchedule}
        onAddSection={addRunningSection}
        onUpdateSectionName={updateRunningSectionName}
        onUpdateSectionType={updateRunningSectionType}
        onUpdateSectionRestAfter={updateRunningSectionRestAfter}
        onUpdateSectionEmomDuration={updateRunningSectionEmomDuration}
        onRemoveSection={removeRunningSection}
        onAddExercise={handleAddExerciseClick}
        onUpdateExerciseEmomReps={updateRunningExerciseEmomReps}
        onUpdateExerciseSets={updateRunningExerciseSets}
        onUpdateExerciseName={updateRunningExerciseName}
        onUpdateRestTimer={updateRunningRestTimer}
        onUpdateExerciseRestAfter={updateRunningExerciseRestAfter}
        onRemoveExercise={removeRunningExercise}
        onAddApproachSets={handleAddApproachSets}
        onNotesClick={handleNotesClick}
      />

      {/* Modals */}
      <ExerciseSelectionModal
        isOpen={isModalOpen('exercise')}
        onClose={closeModal}
        onSelectExercise={handleExerciseSelect}
      />

      <NotesModal
        isOpen={isModalOpen('notes')}
        onClose={closeModal}
        onSave={handleNotesSave}
        initialNotes={getModalContext('notes')?.currentNotes || ''}
      />
    </div>
  );
};

export default RoutineCreation;
