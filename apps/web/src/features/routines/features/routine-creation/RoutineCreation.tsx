'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import {
  TrailRunningWorkoutData,
  StrengthWorkout,
  RunningWorkout,
  WorkoutSet,
  ProgressionMethod,
} from '@/features/routines/types';
import { routineService } from '../../services/routineService';
import { DatabaseWorkout } from '../../types/database';
import { transformDatabaseWorkout } from '../../utils/dataTransformers';
import { useAuth } from '@/features/auth/context/AuthContext';

// Import our new components and hooks
import RoutineHeader from './components/RoutineHeader';
import RoutineDetailsForm from './components/RoutineDetailsForm';
import StrengthWorkoutsSection from './components/StrengthWorkoutsSection';
import RunningWorkoutsSection from './components/RunningWorkoutsSection';
import dynamic from 'next/dynamic';

const RoutineExerciseSelectionModal = dynamic(
  () => import('./components/ExerciseSelectionModal'),
  { ssr: false }
);

const RoutineNotesModal = dynamic(() => import('./components/NotesModal'), {
  ssr: false,
});
import { useWorkoutOperations } from '../../hooks/useWorkoutOperations';
import { addApproachSets } from '../../utils/workoutCalculations';
import {
  RoutineDetailsProvider,
  useRoutineDetailsContext,
} from './context/RoutineDetailsContext';
import {
  ExerciseSelectionProvider,
  useExerciseSelectionContext,
} from './context/ExerciseSelectionContext';
import { NotesProvider, useNotesContext } from './context/NotesContext';

interface RoutineCreationProps {
  editRoutineId?: string;
  mode?: 'create' | 'edit';
}

// Component that uses the context hooks
const RoutineCreationContentWithContext = ({
  mode,
  onSave,
  strengthWorkouts,
  collapsedStrengthWorkouts,
  runningWorkouts,
  collapsedRunningWorkouts,
  creatingRunning,
  editingRunning,
  onAddStrengthWorkout,
  onToggleStrengthCollapse,
  onMoveStrengthUp,
  onMoveStrengthDown,
  onRemoveStrength,
  onUpdateStrengthName,
  onUpdateStrengthObjective,
  onUpdateStrengthSchedule,
  onAddStrengthSection,
  onUpdateStrengthSectionName,
  onUpdateStrengthSectionType,
  onUpdateStrengthSectionRestAfter,
  onUpdateStrengthSectionEmomDuration,
  onRemoveStrengthSection,
  onUpdateStrengthExerciseEmomReps,
  onUpdateStrengthExerciseSets,
  onUpdateStrengthExerciseName,
  onUpdateStrengthRestTimer,
  onUpdateStrengthExerciseRestAfter,
  onRemoveStrengthExercise,
  onUpdateStrengthExerciseProgressionMethod,
  onAddRunningWorkout,
  onRunningSave,
  onRunningCancel,
  onEditRunning,
  onToggleRunningCollapse,
  onMoveRunningUp,
  onMoveRunningDown,
  onRemoveRunning,
  onUpdateRunningName,
  onUpdateRunningObjective,
  onUpdateRunningSchedule,
  onAddRunningSection,
  onUpdateRunningSectionName,
  onUpdateRunningSectionType,
  onUpdateRunningSectionRestAfter,
  onUpdateRunningSectionEmomDuration,
  onRemoveRunningSection,
  onUpdateRunningExerciseEmomReps,
  onUpdateRunningExerciseSets,
  onUpdateRunningExerciseName,
  onUpdateRunningRestTimer,
  onUpdateRunningExerciseRestAfter,
  onRemoveRunningExercise,
  onAddApproachSets,
}: {
  mode: 'create' | 'edit';
  onSave: () => Promise<void>;
  strengthWorkouts: StrengthWorkout[];
  collapsedStrengthWorkouts: Set<string>;
  runningWorkouts: RunningWorkout[];
  collapsedRunningWorkouts: Set<string>;
  creatingRunning: boolean;
  editingRunning: { workoutId: string; data: TrailRunningWorkoutData } | null;
  onAddStrengthWorkout: () => void;
  onToggleStrengthCollapse: (workoutId: string) => void;
  onMoveStrengthUp: (workoutId: string) => void;
  onMoveStrengthDown: (workoutId: string) => void;
  onRemoveStrength: (workoutId: string) => void;
  onUpdateStrengthName: (workoutId: string, name: string) => void;
  onUpdateStrengthObjective: (workoutId: string, objective: string) => void;
  onUpdateStrengthSchedule: (
    workoutId: string,
    field: 'repeatPattern' | 'repeatValue' | 'selectedDays' | 'time',
    value: string | string[]
  ) => void;
  onAddStrengthSection: (workoutId: string) => void;
  onUpdateStrengthSectionName: (
    workoutId: string,
    sectionId: string,
    name: string
  ) => void;
  onUpdateStrengthSectionType: (
    workoutId: string,
    sectionId: string,
    type: 'amrap' | 'warmup' | 'basic' | 'cooldown' | 'emom' | 'tabata'
  ) => void;
  onUpdateStrengthSectionRestAfter: (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ) => void;
  onUpdateStrengthSectionEmomDuration: (
    workoutId: string,
    sectionId: string,
    duration: number
  ) => void;
  onRemoveStrengthSection: (workoutId: string, sectionId: string) => void;
  onUpdateStrengthExerciseEmomReps: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ) => void;
  onUpdateStrengthExerciseSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ) => void;
  onUpdateStrengthExerciseName: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ) => void;
  onUpdateStrengthRestTimer: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ) => void;
  onUpdateStrengthExerciseRestAfter: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ) => void;
  onRemoveStrengthExercise: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
  onUpdateStrengthExerciseProgressionMethod: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    method: ProgressionMethod
  ) => void;
  onAddRunningWorkout: () => void;
  onRunningSave: (runningData: TrailRunningWorkoutData) => void;
  onRunningCancel: () => void;
  onEditRunning: (workoutId: string) => void;
  onToggleRunningCollapse: (workoutId: string) => void;
  onMoveRunningUp: (workoutId: string) => void;
  onMoveRunningDown: (workoutId: string) => void;
  onRemoveRunning: (workoutId: string) => void;
  onUpdateRunningName: (workoutId: string, name: string) => void;
  onUpdateRunningObjective: (workoutId: string, objective: string) => void;
  onUpdateRunningSchedule: (
    workoutId: string,
    field: 'repeatPattern' | 'repeatValue' | 'selectedDays' | 'time',
    value: string | string[]
  ) => void;
  onAddRunningSection: (workoutId: string) => void;
  onUpdateRunningSectionName: (
    workoutId: string,
    sectionId: string,
    name: string
  ) => void;
  onUpdateRunningSectionType: (
    workoutId: string,
    sectionId: string,
    type: 'amrap' | 'warmup' | 'basic' | 'cooldown' | 'emom' | 'tabata'
  ) => void;
  onUpdateRunningSectionRestAfter: (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ) => void;
  onUpdateRunningSectionEmomDuration: (
    workoutId: string,
    sectionId: string,
    duration: number
  ) => void;
  onRemoveRunningSection: (workoutId: string, sectionId: string) => void;
  onUpdateRunningExerciseEmomReps: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ) => void;
  onUpdateRunningExerciseSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ) => void;
  onUpdateRunningExerciseName: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ) => void;
  onUpdateRunningRestTimer: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ) => void;
  onUpdateRunningExerciseRestAfter: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ) => void;
  onRemoveRunningExercise: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
  onAddApproachSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
}): React.ReactElement => {
  // Now we can safely use the context hooks since we're wrapped by the providers
  const { openExerciseModal } = useExerciseSelectionContext();
  const { openNotesModal } = useNotesContext();

  const handleAddExerciseClick = (
    workoutId: string,
    sectionId: string
  ): void => {
    openExerciseModal(workoutId, sectionId);
  };

  const handleNotesClick = (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string
  ): void => {
    // Find the current notes based on the context
    const isStrength = strengthWorkouts.some(w => w.id === workoutId);
    const workouts = isStrength ? strengthWorkouts : runningWorkouts;
    const workout = workouts.find(w => w.id === workoutId);
    const section = workout?.sections.find(s => s.id === sectionId);
    const exercise = section?.exercises.find(e => e.id === exerciseId);

    if (!exercise) return;

    let currentNotes = '';
    if (type === 'exercise') {
      currentNotes = exercise.notes || '';
    } else if (type === 'set' && setId) {
      const set = exercise.sets.find(s => s.id === setId);
      currentNotes = set?.notes || '';
    }

    openNotesModal(type, workoutId, sectionId, exerciseId, setId, currentNotes);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <RoutineHeader mode={mode} onSave={onSave} />

      <RoutineDetailsForm />

      <StrengthWorkoutsSection
        strengthWorkouts={strengthWorkouts}
        collapsedStrengthWorkouts={collapsedStrengthWorkouts}
        operations={{
          onAddStrengthWorkout: onAddStrengthWorkout,
          onToggleCollapse: onToggleStrengthCollapse,
          onMoveUp: onMoveStrengthUp,
          onMoveDown: onMoveStrengthDown,
          onRemove: onRemoveStrength,
          onUpdateName: onUpdateStrengthName,
          onUpdateObjective: onUpdateStrengthObjective,
          onUpdateSchedule: onUpdateStrengthSchedule,
          onAddSection: onAddStrengthSection,
          onUpdateSectionName: onUpdateStrengthSectionName,
          onUpdateSectionType: onUpdateStrengthSectionType,
          onUpdateSectionRestAfter: onUpdateStrengthSectionRestAfter,
          onUpdateSectionEmomDuration: onUpdateStrengthSectionEmomDuration,
          onRemoveSection: onRemoveStrengthSection,
          onAddExercise: handleAddExerciseClick,
          onUpdateExerciseEmomReps: onUpdateStrengthExerciseEmomReps,
          onUpdateExerciseSets: onUpdateStrengthExerciseSets,
          onUpdateExerciseName: onUpdateStrengthExerciseName,
          onUpdateRestTimer: onUpdateStrengthRestTimer,
          onUpdateExerciseRestAfter: onUpdateStrengthExerciseRestAfter,
          onRemoveExercise: onRemoveStrengthExercise,
          onAddApproachSets: onAddApproachSets,
          onUpdateProgressionMethod: onUpdateStrengthExerciseProgressionMethod,
          onNotesClick: handleNotesClick,
        }}
      />

      <RunningWorkoutsSection
        runningWorkouts={runningWorkouts}
        collapsedRunningWorkouts={collapsedRunningWorkouts}
        creatingRunning={creatingRunning}
        editingRunning={editingRunning}
        onAddRunningWorkout={onAddRunningWorkout}
        onRunningSave={onRunningSave}
        onRunningCancel={onRunningCancel}
        onEditRunning={onEditRunning}
        onToggleCollapse={onToggleRunningCollapse}
        onMoveUp={onMoveRunningUp}
        onMoveDown={onMoveRunningDown}
        onRemove={onRemoveRunning}
        onUpdateName={onUpdateRunningName}
        onUpdateObjective={onUpdateRunningObjective}
        onUpdateSchedule={onUpdateRunningSchedule}
        onAddSection={onAddRunningSection}
        onUpdateSectionName={onUpdateRunningSectionName}
        onUpdateSectionType={onUpdateRunningSectionType}
        onUpdateSectionRestAfter={onUpdateRunningSectionRestAfter}
        onUpdateSectionEmomDuration={onUpdateRunningSectionEmomDuration}
        onRemoveSection={onRemoveRunningSection}
        onAddExercise={handleAddExerciseClick}
        onUpdateExerciseEmomReps={onUpdateRunningExerciseEmomReps}
        onUpdateExerciseSets={onUpdateRunningExerciseSets}
        onUpdateExerciseName={onUpdateRunningExerciseName}
        onUpdateRestTimer={onUpdateRunningRestTimer}
        onUpdateExerciseRestAfter={onUpdateRunningExerciseRestAfter}
        onRemoveExercise={onRemoveRunningExercise}
        onAddApproachSets={onAddApproachSets}
        onNotesClick={handleNotesClick}
      />

      <RoutineExerciseSelectionModal />
      <RoutineNotesModal />
    </div>
  );
};

const RoutineCreationContent = ({
  editRoutineId,
  mode = 'create',
}: RoutineCreationProps): React.ReactElement => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const {
    name,
    difficulty,
    goal,
    description,
    objectives,
    duration,
    updateRoutineDetails,
  } = useRoutineDetailsContext();

  // Running workout creation/editing states
  const [creatingRunning, setCreatingRunning] = useState(false);
  const [editingRunning, setEditingRunning] = useState<{
    workoutId: string;
    data: TrailRunningWorkoutData;
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

  // Load routine data if editing
  useEffect(() => {
    const loadRoutineForEditing = async (): Promise<void> => {
      if (editRoutineId && mode === 'edit') {
        try {
          const data = await routineService.getRoutineById(editRoutineId);

          // Set routine metadata
          updateRoutineDetails({
            name: data.routine.name,
            difficulty: data.routine.difficulty,
            goal: data.routine.goal,
            description: data.routine.description,
            objectives: data.routine.objectives || [],
            duration: data.routine.duration || 12,
          });

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
    updateRoutineDetails,
  ]);

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

  const handleAddApproachSets = (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ): void => {
    const isStrength = strengthWorkouts.some(w => w.id === workoutId);
    const workouts = isStrength ? strengthWorkouts : runningWorkouts;
    const workout = workouts.find(w => w.id === workoutId);
    const section = workout?.sections.find(s => s.id === sectionId);
    const exercise = section?.exercises.find(e => e.id === exerciseId);

    if (!exercise) return;

    const updatedSets = addApproachSets(exercise.sets);

    if (isStrength) {
      updateStrengthExerciseSets(workoutId, sectionId, exerciseId, updatedSets);
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
      updateRunningExerciseSets(workoutId, sectionId, exerciseId, updatedSets);
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
  };

  const handleNotesSave = (
    context: {
      type: 'exercise' | 'set';
      workoutId: string;
      sectionId: string;
      exerciseId: string;
      setId?: string;
      currentNotes: string;
    },
    notes: string
  ): void => {
    const { type, workoutId, sectionId, exerciseId, setId } = context;
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
  };

  // Save routine handler
  const handleSaveRoutine = async (): Promise<void> => {
    // Check authentication first
    if (!isAuthenticated || !user) {
      alert('You must be logged in to create a routine. Please log in first.');
      return;
    }

    // Validate routine data
    if (!name.trim()) {
      alert('Routine name is required');
      return;
    }
    if (!difficulty || !goal) {
      alert('Difficulty and goal are required');
      return;
    }
    if (!objectives || objectives.length === 0) {
      alert('At least one objective is required');
      return;
    }

    // Validate workouts
    if (!strengthWorkouts || strengthWorkouts.length === 0) {
      alert('At least one strength workout is required');
      return;
    }

    // Validate each workout
    for (const workout of strengthWorkouts) {
      if (!workout.name?.trim()) {
        alert(`Workout "${workout.name || 'Unnamed'}" must have a name`);
        return;
      }
      if (!workout.objective?.trim()) {
        alert(`Workout "${workout.name}" must have an objective`);
        return;
      }
      if (!workout.sections || workout.sections.length === 0) {
        alert(`Workout "${workout.name}" must have at least one section`);
        return;
      }

      // Validate each section
      for (const section of workout.sections) {
        if (!section.name?.trim()) {
          alert(
            `Section "${section.name || 'Unnamed'}" in workout "${workout.name}" must have a name`
          );
          return;
        }
        if (!section.exercises || section.exercises.length === 0) {
          alert(
            `Section "${section.name}" in workout "${workout.name}" must have at least one exercise`
          );
          return;
        }

        // Validate each exercise
        for (const exercise of section.exercises) {
          if (!exercise.variantId && !exercise.exerciseId) {
            alert(
              `Exercise "${exercise.name || 'Unnamed'}" in section "${section.name}" must be selected from the exercise library`
            );
            return;
          }
          if (!exercise.sets || exercise.sets.length === 0) {
            alert(
              `Exercise "${exercise.name || 'Unnamed'}" in section "${section.name}" must have at least one set`
            );
            return;
          }

          // Validate each set
          for (const set of exercise.sets) {
            if (!set.reps || set.reps <= 0) {
              alert(
                `Set ${set.setNumber} in exercise "${exercise.name || 'Unnamed'}" must have valid reps`
              );
              return;
            }
          }
        }
      }
    }

    // Validate running workouts if any
    if (runningWorkouts && runningWorkouts.length > 0) {
      for (const workout of runningWorkouts) {
        if (!workout.name?.trim()) {
          alert(
            `Running workout "${workout.name || 'Unnamed'}" must have a name`
          );
          return;
        }
        if (!workout.objective?.trim()) {
          alert(`Running workout "${workout.name}" must have an objective`);
          return;
        }
        if (!workout.sections || workout.sections.length === 0) {
          alert(
            `Running workout "${workout.name}" must have at least one section`
          );
          return;
        }

        // Validate each section
        for (const section of workout.sections) {
          if (!section.name?.trim()) {
            alert(
              `Section "${section.name || 'Unnamed'}" in running workout "${workout.name}" must have a name`
            );
            return;
          }
          if (!section.exercises || section.exercises.length === 0) {
            alert(
              `Section "${section.name}" in running workout "${workout.name}" must have at least one exercise`
            );
            return;
          }

          // Validate each exercise
          for (const exercise of section.exercises) {
            if (!exercise.variantId && !exercise.exerciseId) {
              alert(
                `Exercise "${exercise.name || 'Unnamed'}" in section "${section.name}" must be selected from the exercise library`
              );
              return;
            }
          }
        }
      }
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
      router.push('/routines');
    } catch (error) {
      alert(
        `Failed to save routine: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      // setIsSaving(false); // This state variable is not defined in the original file
    }
  };

  return (
    <ExerciseSelectionProvider
      strengthWorkouts={strengthWorkouts}
      runningWorkouts={runningWorkouts}
      addStrengthExercise={addStrengthExercise}
      addRunningExercise={addRunningExercise}
    >
      <NotesProvider onNotesSave={handleNotesSave}>
        <RoutineCreationContentWithContext
          mode={mode}
          onSave={handleSaveRoutine}
          strengthWorkouts={strengthWorkouts}
          collapsedStrengthWorkouts={collapsedStrengthWorkouts}
          runningWorkouts={runningWorkouts}
          collapsedRunningWorkouts={collapsedRunningWorkouts}
          creatingRunning={creatingRunning}
          editingRunning={editingRunning}
          onAddStrengthWorkout={addStrengthWorkout}
          onToggleStrengthCollapse={toggleStrengthWorkoutCollapse}
          onMoveStrengthUp={(workoutId: string) =>
            moveStrengthWorkout(workoutId, 'up')
          }
          onMoveStrengthDown={(workoutId: string) =>
            moveStrengthWorkout(workoutId, 'down')
          }
          onRemoveStrength={removeStrengthWorkout}
          onUpdateStrengthName={updateStrengthWorkoutName}
          onUpdateStrengthObjective={updateStrengthWorkoutObjective}
          onUpdateStrengthSchedule={updateStrengthWorkoutSchedule}
          onAddStrengthSection={addStrengthSection}
          onUpdateStrengthSectionName={updateStrengthSectionName}
          onUpdateStrengthSectionType={updateStrengthSectionType}
          onUpdateStrengthSectionRestAfter={updateStrengthSectionRestAfter}
          onUpdateStrengthSectionEmomDuration={
            updateStrengthSectionEmomDuration
          }
          onRemoveStrengthSection={removeStrengthSection}
          onUpdateStrengthExerciseEmomReps={updateStrengthExerciseEmomReps}
          onUpdateStrengthExerciseSets={updateStrengthExerciseSets}
          onUpdateStrengthExerciseName={updateStrengthExerciseName}
          onUpdateStrengthRestTimer={updateStrengthRestTimer}
          onUpdateStrengthExerciseRestAfter={updateStrengthExerciseRestAfter}
          onRemoveStrengthExercise={removeStrengthExercise}
          onUpdateStrengthExerciseProgressionMethod={
            updateStrengthExerciseProgressionMethod
          }
          onAddRunningWorkout={handleAddRunningWorkout}
          onRunningSave={handleRunningSave}
          onRunningCancel={handleRunningCancel}
          onEditRunning={handleEditRunning}
          onToggleRunningCollapse={toggleRunningWorkoutCollapse}
          onMoveRunningUp={(workoutId: string) =>
            moveRunningWorkout(workoutId, 'up')
          }
          onMoveRunningDown={(workoutId: string) =>
            moveRunningWorkout(workoutId, 'down')
          }
          onRemoveRunning={removeRunningWorkout}
          onUpdateRunningName={updateRunningWorkoutName}
          onUpdateRunningObjective={updateRunningWorkoutObjective}
          onUpdateRunningSchedule={updateRunningWorkoutSchedule}
          onAddRunningSection={addRunningSection}
          onUpdateRunningSectionName={updateRunningSectionName}
          onUpdateRunningSectionType={updateRunningSectionType}
          onUpdateRunningSectionRestAfter={updateRunningSectionRestAfter}
          onUpdateRunningSectionEmomDuration={updateRunningSectionEmomDuration}
          onRemoveRunningSection={removeRunningSection}
          onUpdateRunningExerciseEmomReps={updateRunningExerciseEmomReps}
          onUpdateRunningExerciseSets={updateRunningExerciseSets}
          onUpdateRunningExerciseName={updateRunningExerciseName}
          onUpdateRunningRestTimer={updateRunningRestTimer}
          onUpdateRunningExerciseRestAfter={updateRunningExerciseRestAfter}
          onRemoveRunningExercise={removeRunningExercise}
          onAddApproachSets={handleAddApproachSets}
        />
      </NotesProvider>
    </ExerciseSelectionProvider>
  );
};

const RoutineCreation = ({
  editRoutineId,
  mode = 'create',
}: RoutineCreationProps): React.ReactElement => {
  return (
    <RoutineDetailsProvider>
      <RoutineCreationContent editRoutineId={editRoutineId} mode={mode} />
    </RoutineDetailsProvider>
  );
};

export default RoutineCreation;
