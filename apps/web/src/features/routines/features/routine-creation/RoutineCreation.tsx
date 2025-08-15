'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import {
  TrailRunningWorkoutData,
  StrengthWorkout,
  RunningWorkout,
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

  // Exercise selection handlers
  const { openExerciseModal } = useExerciseSelectionContext();

  const handleAddExerciseClick = (
    workoutId: string,
    sectionId: string
  ): void => {
    openExerciseModal(workoutId, sectionId);
  };

  // Notes handlers
  const { openNotesModal } = useNotesContext();

  const handleNotesClick = (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string
  ): void => {
    openNotesModal(type, workoutId, sectionId, exerciseId, setId);
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
      <NotesProvider
        strengthWorkouts={strengthWorkouts}
        runningWorkouts={runningWorkouts}
        setStrengthWorkouts={setStrengthWorkouts}
        setRunningWorkouts={setRunningWorkouts}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <RoutineHeader mode={mode} onSave={handleSaveRoutine} />

          <RoutineDetailsForm />

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
            onEditRunning={handleEditRunning}
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

          <RoutineExerciseSelectionModal />
          <RoutineNotesModal />
        </div>
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
