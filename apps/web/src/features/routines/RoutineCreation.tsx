'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { TrailRunningWorkoutData } from '@/features/routines/TrailRunningWorkout';

// Import our new components and hooks
import RoutineHeader from './components/RoutineHeader';
import RoutineDetailsForm from './components/RoutineDetailsForm';
import StrengthWorkoutsSection from './components/StrengthWorkoutsSection';
import RunningWorkoutsSection from './components/RunningWorkoutsSection';
import RoutineModals from './components/RoutineModals';
import { useWorkoutOperations } from './hooks/useWorkoutOperations';
import { addApproachSets } from './utils/workoutCalculations';
import { ProgressionMethod } from './types';

interface RoutineCreationProps {
  editRoutineId?: string;
  mode?: 'create' | 'edit';
}

const RoutineCreation = ({
  editRoutineId,
  mode = 'create',
}: RoutineCreationProps): React.ReactElement => {
  const router = useRouter();

  // Routine metadata state
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState('');

  // Modal states
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [currentAddExerciseContext, setCurrentAddExerciseContext] = useState<{
    workoutId: string;
    sectionId: string;
  } | null>(null);
  const [currentNotesContext, setCurrentNotesContext] = useState<{
    type: 'exercise' | 'set';
    workoutId: string;
    sectionId: string;
    exerciseId: string;
    setId?: string;
    currentNotes: string;
  } | null>(null);

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
    if (editRoutineId && mode === 'edit') {
      // TODO: Load routine data from API
      // For now, we'll use placeholder data
      console.log('Loading routine for editing:', editRoutineId);
    }
  }, [editRoutineId, mode]);

  // Collapse toggle handlers
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

  // Running workout handlers
  const handleAddRunningWorkout = (): void => {
    setCreatingRunning(true);
  };

  const handleRunningSave = (runningData: TrailRunningWorkoutData): void => {
    if (editingRunning) {
      // Update existing running workout
      setRunningWorkouts(prev =>
        prev.map(workout =>
          workout.id === editingRunning.workoutId
            ? { ...workout, trailRunningData: runningData }
            : workout
        )
      );
      setEditingRunning(null);
    } else {
      // Create new running workout
      const newWorkout = {
        id: `running-${Date.now()}`,
        name: runningData.name || 'New Running Workout',
        type: 'running' as 'running',
        objective: runningData.description || '',
        schedule: {
          weeks: '',
          day: 'monday',
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
  const handleAddExerciseClick = (
    workoutId: string,
    sectionId: string
  ): void => {
    setCurrentAddExerciseContext({ workoutId, sectionId });
    setExerciseModalOpen(true);
  };

  const handleExerciseSelect = (selectedExercise: {
    name: string;
    category?: string;
    muscleGroups?: string[];
  }): void => {
    if (!currentAddExerciseContext) return;

    const { workoutId, sectionId } = currentAddExerciseContext;
    const isStrength = strengthWorkouts.some(w => w.id === workoutId);

    const newExercise = {
      id: `exercise-${Date.now()}`,
      name: selectedExercise.name,
      category: selectedExercise.category,
      muscleGroups: selectedExercise.muscleGroups,
      sets: [],
      restTimer: '90s',
      restAfter: '2 min',
      notes: '',
      progressionMethod: isStrength
        ? ('linear' as ProgressionMethod)
        : undefined,
      hasApproachSets: false,
    };

    if (isStrength) {
      addStrengthExercise(workoutId, sectionId, newExercise);
    } else {
      addRunningExercise(workoutId, sectionId, newExercise);
    }

    setExerciseModalOpen(false);
    setCurrentAddExerciseContext(null);
  };

  // Notes handlers
  const handleNotesClick = (
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

    setCurrentNotesContext({
      type,
      workoutId,
      sectionId,
      exerciseId,
      setId,
      currentNotes,
    });
    setNotesModalOpen(true);
  };

  const handleNotesSave = (notes: string): void => {
    if (!currentNotesContext) return;

    const { type, workoutId, sectionId, exerciseId, setId } =
      currentNotesContext;
    const isStrength = strengthWorkouts.some(w => w.id === workoutId);

    if (type === 'exercise') {
      // Update exercise notes
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
      // Update set notes
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

    setNotesModalOpen(false);
    setCurrentNotesContext(null);
  };

  // Approach sets handler
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
      // Mark as having approach sets
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
    const routineData = {
      name,
      difficulty,
      description,
      objectives,
      strengthWorkouts,
      runningWorkouts,
    };

    try {
      // TODO: Save routine to API
      console.log('Saving routine:', routineData);

      // For now, just navigate back
      router.push('/routines');
    } catch (error) {
      console.error('Error saving routine:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RoutineHeader mode={mode} onSave={handleSaveRoutine} />

        <RoutineDetailsForm
          name={name}
          difficulty={difficulty}
          description={description}
          objectives={objectives}
          onNameChange={setName}
          onDifficultyChange={setDifficulty}
          onDescriptionChange={setDescription}
          onObjectivesChange={setObjectives}
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
      </div>

      <RoutineModals
        exerciseModalOpen={exerciseModalOpen}
        notesModalOpen={notesModalOpen}
        currentNotesContext={currentNotesContext}
        onExerciseModalClose={() => {
          setExerciseModalOpen(false);
          setCurrentAddExerciseContext(null);
        }}
        onNotesModalClose={() => {
          setNotesModalOpen(false);
          setCurrentNotesContext(null);
        }}
        onExerciseSelect={handleExerciseSelect}
        onNotesSave={handleNotesSave}
      />
    </div>
  );
};

export default RoutineCreation;
