'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import {
  TrailRunningWorkoutData,
  StrengthWorkout,
  RunningWorkout,
} from '@/features/routines/types';
import { UnilateralMode } from '@/features/routines/types/exercise';
import { routineService } from '../../services/routineService';
import { DatabaseWorkout } from '../../types/database';
import { transformDatabaseWorkout } from '../../utils/dataTransformers';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useToast } from '@peakhealth/ui';

// Import our new components and hooks
import RoutineHeader from './components/RoutineHeader';
import RoutineDetailsForm from './components/RoutineDetailsForm';
import StrengthWorkoutsSection from './components/StrengthWorkoutsSection';
import RunningWorkoutsSection from './components/RunningWorkoutsSection';
import { useWorkoutOperations } from '../../hooks/useWorkoutOperations';
import { addApproachSets } from '../../utils/workoutCalculations';
import { ProgressionMethod } from '../../types';
import { useRoutineModals, useRoutineValidation } from './hooks';
import { NotesContext } from './types/modal';
import ExerciseSelectionModal from '@/features/exercises/ExerciseSelectionModal';
import NotesModal from '@/components/shared/NotesModal';
import UnilateralExerciseModal from './components/UnilateralExerciseModal';

interface RoutineCreationProps {
  editRoutineId?: string;
  mode?: 'create' | 'edit';
}

const RoutineCreation = ({
  editRoutineId,
  mode = 'create',
}: RoutineCreationProps): React.ReactElement => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();

  // Routine metadata state
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [goal, setGoal] = useState('Strength');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState<string[]>([]);
  const [duration, setDuration] = useState(12); // Default 12 weeks (3 months)

  // Modal state management
  const { isModalOpen, openModal, closeModal, getModalContext } =
    useRoutineModals();

  // Running workout creation/editing states
  const [creatingRunning, setCreatingRunning] = useState(false);
  const [editingRunning, setEditingRunning] = useState<{
    workoutId: string;
    data: TrailRunningWorkoutData;
  } | null>(null);

  // Unilateral exercise selection state
  const [unilateralExerciseData, setUnilateralExerciseData] = useState<{
    exercise: {
      id: string;
      name: string;
      category?: string;
      muscleGroups?: string[];
    };
    variant?: {
      id: string;
      name: string;
      muscleGroups: string[];
      difficulty: string;
      equipment: string[];
      instructions: string[];
    };
    context: {
      workoutId: string;
      sectionId: string;
    };
  } | null>(null);

  // Collapse states
  const [collapsedStrengthWorkouts, setCollapsedStrengthWorkouts] = useState<
    Set<string>
  >(new Set());
  const [collapsedRunningWorkouts, setCollapsedRunningWorkouts] = useState<
    Set<string>
  >(new Set());

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

  // Use our new validation hook
  const { validateRoutineData } = useRoutineValidation();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRoutineId, mode]);

  const toggleStrengthWorkoutCollapse = (workoutId: string): void => {
    setCollapsedStrengthWorkouts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(workoutId)) {
        newSet.delete(workoutId);
      } else {
        newSet.add(workoutId);
      }
      return newSet;
    });
  };

  const toggleRunningWorkoutCollapse = (workoutId: string): void => {
    setCollapsedRunningWorkouts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(workoutId)) {
        newSet.delete(workoutId);
      } else {
        newSet.add(workoutId);
      }
      return newSet;
    });
  };

  const handleAddRunningWorkout = (): void => {
    setCreatingRunning(true);
  };

  const handleRunningSave = (runningData: TrailRunningWorkoutData): void => {
    if (editingRunning) {
      setRunningWorkouts(prev =>
        prev.map(workout =>
          workout.id === editingRunning.workoutId
            ? { ...workout, trailRunningData: runningData }
            : workout
        )
      );
      setEditingRunning(null);
    } else {
      const newWorkout = {
        id: `running-${Date.now()}`,
        name: runningData.name || 'New Running Workout',
        type: 'running' as 'running',
        objective: runningData.description || '',
        schedule: {
          repeatPattern: '',
          repeatValue: '',
          selectedDays: [],
          time: '',
        },
        sections: [],
        trailRunningData: runningData,
      };
      setRunningWorkouts(prev => [...prev, newWorkout]);
      setCreatingRunning(false);
    }
  };

  const handleRunningCancel = (): void => {
    setCreatingRunning(false);
    setEditingRunning(null);
  };

  const handleEditRunning = (workoutId: string): void => {
    const workout = runningWorkouts.find(w => w.id === workoutId);
    if (workout?.trailRunningData) {
      setEditingRunning({
        workoutId,
        data: workout.trailRunningData,
      });
    }
  };

  const handleUnilateralModeSelect = (mode: UnilateralMode): void => {
    if (!unilateralExerciseData) return;

    const { exercise, variant, context } = unilateralExerciseData;
    const { workoutId, sectionId } = context;
    const isStrength = strengthWorkouts.some(w => w.id === workoutId);

    const newExercise = {
      id: `exercise-${Date.now()}`,
      name: variant?.name || exercise.name,
      category: exercise.category,
      muscleGroups: variant?.muscleGroups || exercise.muscleGroups,
      equipment: variant?.equipment || [],
      exerciseId: exercise.id,
      variantId: variant?.id,
      sets: [],
      restTimer: '90s',
      restAfter: '2 min',
      notes: '',
      progressionMethod: isStrength
        ? ('linear' as ProgressionMethod)
        : undefined,
      hasApproachSets: false,
      isUnilateral: true,
      unilateralMode: mode,
    };

    if (isStrength) {
      addStrengthExercise(workoutId, sectionId, newExercise);
    } else {
      addRunningExercise(workoutId, sectionId, newExercise);
    }

    setUnilateralExerciseData(null);
  };

  const handleUnilateralModalClose = (): void => {
    setUnilateralExerciseData(null);
  };

  // Exercise selection handlers
  const handleAddExerciseClick = useCallback(
    (workoutId: string, sectionId: string): void => {
      openModal('exercise', { workoutId, sectionId });
    },
    [openModal]
  );

  const handleExerciseSelect = useCallback(
    (
      selectedExercise: {
        id: string;
        name: string;
        category?: string;
        muscleGroups?: string[];
      },
      selectedVariant?: {
        id: string;
        name: string;
        muscleGroups: string[];
        difficulty: string;
        equipment: string[];
        instructions: string[];
        isUnilateral?: boolean;
      }
    ): void => {
      const exerciseContext = getModalContext('exercise');
      if (!exerciseContext) return;

      const { workoutId, sectionId } = exerciseContext;

      // Check if this is a unilateral exercise
      if (selectedVariant?.isUnilateral) {
        // Store the exercise data and show unilateral modal
        setUnilateralExerciseData({
          exercise: selectedExercise,
          variant: selectedVariant,
          context: { workoutId, sectionId },
        });
        closeModal();
        return;
      }

      // Handle non-unilateral exercise as before
      const isStrength = strengthWorkouts.some(w => w.id === workoutId);
      const exerciseData = selectedVariant || selectedExercise;

      const newExercise = {
        id: `exercise-${Date.now()}`,
        name: exerciseData.name,
        category: selectedExercise.category,
        muscleGroups: exerciseData.muscleGroups,
        equipment: selectedVariant?.equipment || [],
        exerciseId: selectedExercise.id,
        variantId: selectedVariant?.id,
        sets: [],
        restTimer: '90s',
        restAfter: '2 min',
        notes: '',
        progressionMethod: isStrength
          ? ('linear' as ProgressionMethod)
          : undefined,
        hasApproachSets: false,
        isUnilateral: false,
      };

      if (isStrength) {
        addStrengthExercise(workoutId, sectionId, newExercise);
      } else {
        addRunningExercise(workoutId, sectionId, newExercise);
      }

      closeModal();
    },
    [
      getModalContext,
      strengthWorkouts,
      addStrengthExercise,
      addRunningExercise,
      closeModal,
    ]
  );

  const handleNotesClick = useCallback(
    (
      type: 'exercise' | 'set',
      workoutId: string,
      sectionId: string,
      exerciseId: string,
      setId?: string
    ): void => {
      const isStrength = strengthWorkouts.some(w => w.id === workoutId);
      const workouts = isStrength ? strengthWorkouts : runningWorkouts;
      const workout = workouts.find(w => w.id === workoutId);
      const section = workout?.sections.find(s => s.id === sectionId);
      const exercise = section?.exercises.find(e => e.id === exerciseId);

      if (!exercise) return;

      let currentNotes = '';
      if (type === 'exercise') {
        currentNotes = exercise.notes;
      } else if (type === 'set' && setId) {
        const set = exercise.sets.find(s => s.id === setId);
        currentNotes = set?.notes || '';
      }

      const notesContext: NotesContext = {
        type,
        workoutId,
        sectionId,
        exerciseId,
        setId,
        currentNotes,
      };
      openModal('notes', notesContext);
    },
    [strengthWorkouts, runningWorkouts, openModal]
  );

  const handleNotesSave = useCallback(
    (notes: string): void => {
      const notesContext = getModalContext('notes');
      if (!notesContext) return;

      const { type, workoutId, sectionId, exerciseId, setId } = notesContext;
      const isStrength = strengthWorkouts.some(w => w.id === workoutId);

      if (type === 'exercise') {
        if (isStrength) {
          setStrengthWorkouts(prev =>
            prev.map(workout =>
              workout.id === workoutId
                ? {
                    ...workout,
                    sections: workout.sections.map(section =>
                      section.id === sectionId
                        ? {
                            ...section,
                            exercises: section.exercises.map(exercise =>
                              exercise.id === exerciseId
                                ? { ...exercise, notes }
                                : exercise
                            ),
                          }
                        : section
                    ),
                  }
                : workout
            )
          );
        } else {
          setRunningWorkouts(prev =>
            prev.map(workout =>
              workout.id === workoutId
                ? {
                    ...workout,
                    sections: workout.sections.map(section =>
                      section.id === sectionId
                        ? {
                            ...section,
                            exercises: section.exercises.map(exercise =>
                              exercise.id === exerciseId
                                ? { ...exercise, notes }
                                : exercise
                            ),
                          }
                        : section
                    ),
                  }
                : workout
            )
          );
        }
      } else if (type === 'set' && setId) {
        if (isStrength) {
          setStrengthWorkouts(prev =>
            prev.map(workout =>
              workout.id === workoutId
                ? {
                    ...workout,
                    sections: workout.sections.map(section =>
                      section.id === sectionId
                        ? {
                            ...section,
                            exercises: section.exercises.map(exercise =>
                              exercise.id === exerciseId
                                ? {
                                    ...exercise,
                                    sets: exercise.sets.map(set =>
                                      set.id === setId ? { ...set, notes } : set
                                    ),
                                  }
                                : exercise
                            ),
                          }
                        : section
                    ),
                  }
                : workout
            )
          );
        } else {
          setRunningWorkouts(prev =>
            prev.map(workout =>
              workout.id === workoutId
                ? {
                    ...workout,
                    sections: workout.sections.map(section =>
                      section.id === sectionId
                        ? {
                            ...section,
                            exercises: section.exercises.map(exercise =>
                              exercise.id === exerciseId
                                ? {
                                    ...exercise,
                                    sets: exercise.sets.map(set =>
                                      set.id === setId ? { ...set, notes } : set
                                    ),
                                  }
                                : exercise
                            ),
                          }
                        : section
                    ),
                  }
                : workout
            )
          );
        }
      }

      closeModal();
    },
    [
      getModalContext,
      strengthWorkouts,
      setStrengthWorkouts,
      setRunningWorkouts,
      closeModal,
    ]
  );

  const handleAddApproachSets = useCallback(
    (workoutId: string, sectionId: string, exerciseId: string): void => {
      const isStrength = strengthWorkouts.some(w => w.id === workoutId);
      const workouts = isStrength ? strengthWorkouts : runningWorkouts;
      const workout = workouts.find(w => w.id === workoutId);
      const section = workout?.sections.find(s => s.id === sectionId);
      const exercise = section?.exercises.find(e => e.id === exerciseId);

      if (!exercise) return;

      const updatedSets = addApproachSets(exercise.sets);

      if (isStrength) {
        updateStrengthExerciseSets(
          workoutId,
          sectionId,
          exerciseId,
          updatedSets
        );
        // Mark as having approach sets
        setStrengthWorkouts(prev =>
          prev.map(w =>
            w.id === workoutId
              ? {
                  ...w,
                  sections: w.sections.map(s =>
                    s.id === sectionId
                      ? {
                          ...s,
                          exercises: s.exercises.map(e =>
                            e.id === exerciseId
                              ? { ...e, hasApproachSets: true }
                              : e
                          ),
                        }
                      : s
                  ),
                }
              : w
          )
        );
      } else {
        updateRunningExerciseSets(
          workoutId,
          sectionId,
          exerciseId,
          updatedSets
        );
        setRunningWorkouts(prev =>
          prev.map(w =>
            w.id === workoutId
              ? {
                  ...w,
                  sections: w.sections.map(s =>
                    s.id === sectionId
                      ? {
                          ...s,
                          exercises: s.exercises.map(e =>
                            e.id === exerciseId
                              ? { ...e, hasApproachSets: true }
                              : e
                          ),
                        }
                      : s
                  ),
                }
              : w
          )
        );
      }
    },
    [
      strengthWorkouts,
      runningWorkouts,
      updateStrengthExerciseSets,
      updateRunningExerciseSets,
      setStrengthWorkouts,
      setRunningWorkouts,
    ]
  );

  // Memoize callback functions to prevent infinite re-renders
  const handleNameChange = useCallback((name: string) => {
    setName(name);
  }, []);

  const handleDifficultyChange = useCallback((difficulty: string) => {
    setDifficulty(difficulty);
  }, []);

  const handleGoalChange = useCallback((goal: string) => {
    setGoal(goal);
  }, []);

  const handleDescriptionChange = useCallback((description: string) => {
    setDescription(description);
  }, []);

  const handleObjectivesChange = useCallback((objectives: string[]) => {
    setObjectives(objectives);
  }, []);

  const handleDurationChange = useCallback((duration: number) => {
    setDuration(duration);
  }, []);

  // Memoize move workout functions to prevent infinite re-renders
  const handleMoveStrengthWorkoutUp = useCallback(
    (workoutId: string) => {
      moveStrengthWorkout(workoutId, 'up');
    },
    [moveStrengthWorkout]
  );

  const handleMoveStrengthWorkoutDown = useCallback(
    (workoutId: string) => {
      moveStrengthWorkout(workoutId, 'down');
    },
    [moveStrengthWorkout]
  );

  const handleMoveRunningWorkoutUp = useCallback(
    (workoutId: string) => {
      moveRunningWorkout(workoutId, 'up');
    },
    [moveRunningWorkout]
  );

  const handleMoveRunningWorkoutDown = useCallback(
    (workoutId: string) => {
      moveRunningWorkout(workoutId, 'down');
    },
    [moveRunningWorkout]
  );

  // Memoize save routine handler to prevent infinite re-renders
  const handleSaveRoutine = useCallback(async (): Promise<void> => {
    // Check authentication first
    if (!isAuthenticated || !user) {
      showToast({
        message:
          'You must be logged in to create a routine. Please log in first.',
        variant: 'error',
      });
      return;
    }

    // Validate routine data using our extracted validation hook
    const validationError = validateRoutineData({
      name,
      difficulty,
      goal,
      objectives,
      strengthWorkouts,
      runningWorkouts,
    });

    if (validationError) {
      showToast({
        message: validationError.message,
        variant: 'error',
      });
      return;
    }

    // Prepare routine data
    const routineData = {
      userId: user.id,
      name: name.trim(),
      description: description.trim(),
      difficulty: difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
      goal: goal as 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss',
      objectives,
      duration,
      // daysPerWeek is calculated dynamically from workout days
      strengthWorkouts,
      runningWorkouts,
    };

    try {
      // setIsSaving(true); // This state variable is not defined in the original file
      await routineService.createRoutine(routineData);
      showToast({
        message: 'Routine saved successfully!',
        variant: 'success',
      });
      router.push('/routines');
    } catch (error) {
      showToast({
        message: `Failed to save routine: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'error',
      });
    } finally {
      // setIsSaving(false); // This state variable is not defined in the original file
    }
  }, [
    isAuthenticated,
    user,
    validateRoutineData,
    name,
    difficulty,
    goal,
    objectives,
    strengthWorkouts,
    runningWorkouts,
    description,
    duration,
    routineService,
    showToast,
    router,
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
        onNameChange={handleNameChange}
        onDifficultyChange={handleDifficultyChange}
        onGoalChange={handleGoalChange}
        onDescriptionChange={handleDescriptionChange}
        onObjectivesChange={handleObjectivesChange}
        onDurationChange={handleDurationChange}
      />

      <StrengthWorkoutsSection
        strengthWorkouts={strengthWorkouts}
        collapsedStrengthWorkouts={collapsedStrengthWorkouts}
        onAddStrengthWorkout={addStrengthWorkout}
        onToggleCollapse={toggleStrengthWorkoutCollapse}
        onMoveUp={handleMoveStrengthWorkoutUp}
        onMoveDown={handleMoveStrengthWorkoutDown}
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
        onEditRunning={handleEditRunning}
        onToggleCollapse={toggleRunningWorkoutCollapse}
        onMoveUp={handleMoveRunningWorkoutUp}
        onMoveDown={handleMoveRunningWorkoutDown}
        onRemove={removeRunningWorkout}
        onUpdateName={updateRunningWorkoutName}
        onUpdateObjective={updateRunningWorkoutObjective}
        onUpdateSchedule={updateRunningWorkoutSchedule}
        onAddSection={addRunningSection}
        onUpdateSectionName={updateRunningSectionName}
        onUpdateSectionType={updateRunningSectionType}
        onUpdateSectionRestAfter={updateRunningSectionRestAfter}
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

      <UnilateralExerciseModal
        isOpen={!!unilateralExerciseData}
        onClose={handleUnilateralModalClose}
        onConfirm={handleUnilateralModeSelect}
        exerciseName={
          unilateralExerciseData?.variant?.name ||
          unilateralExerciseData?.exercise.name ||
          ''
        }
      />
    </div>
  );
};

export default RoutineCreation;
