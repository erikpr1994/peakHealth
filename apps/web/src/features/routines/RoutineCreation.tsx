'use client';

import { ArrowLeft, Save, Plus, Dumbbell, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import NotesModal from '@/components/shared/NotesModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ExerciseSelectionModal from '@/features/exercises/ExerciseSelectionModal';
import TrailRunningWorkout, {
  TrailRunningWorkoutData,
} from '@/features/routines/TrailRunningWorkout';

// Import our new components and hooks
import WorkoutHeader from './components/WorkoutHeader';
import WorkoutDetails from './components/WorkoutDetails';
import WorkoutSection from './components/WorkoutSection';
import { useWorkoutOperations } from './hooks/useWorkoutOperations';
import {
  calculateWorkoutDuration,
  addApproachSets,
} from './utils/workoutCalculations';
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {mode === 'edit' ? 'Edit Routine' : 'Create New Routine'}
              </h1>
              <p className="text-gray-600">
                {mode === 'edit'
                  ? 'Update your routine details'
                  : 'Build your perfect workout routine'}
              </p>
            </div>
          </div>
          <Button
            onClick={handleSaveRoutine}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {mode === 'edit' ? 'Update Routine' : 'Save Routine'}
          </Button>
        </div>

        {/* Routine Details */}
        <Card className="mb-8">
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Routine Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Routine Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter routine name..."
                />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe your routine..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="objectives">Training Objectives</Label>
              <Textarea
                id="objectives"
                value={objectives}
                onChange={e => setObjectives(e.target.value)}
                placeholder="What are the main goals and focus areas of this routine?"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Strength Workouts Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Strength Workouts ({strengthWorkouts.length})
            </h2>
            <Button
              onClick={addStrengthWorkout}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Dumbbell className="h-4 w-4 mr-2" />
              Add Strength Workout
            </Button>
          </div>

          {strengthWorkouts.map((workout, index) => (
            <Card key={workout.id} className="overflow-hidden">
              <WorkoutHeader
                workout={workout}
                index={index}
                totalCount={strengthWorkouts.length}
                isCollapsed={collapsedStrengthWorkouts.has(workout.id)}
                duration={calculateWorkoutDuration(workout)}
                onToggleCollapse={() =>
                  toggleStrengthWorkoutCollapse(workout.id)
                }
                onMoveUp={() => moveStrengthWorkout(workout.id, 'up')}
                onMoveDown={() => moveStrengthWorkout(workout.id, 'down')}
                onRemove={() => removeStrengthWorkout(workout.id)}
                onUpdateName={name =>
                  updateStrengthWorkoutName(workout.id, name)
                }
              />

              {!collapsedStrengthWorkouts.has(workout.id) && (
                <>
                  <WorkoutDetails
                    objective={workout.objective}
                    schedule={workout.schedule}
                    onUpdateObjective={objective =>
                      updateStrengthWorkoutObjective(workout.id, objective)
                    }
                    onUpdateSchedule={(field, value) =>
                      updateStrengthWorkoutSchedule(workout.id, field, value)
                    }
                  />

                  {/* Sections */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">Sections</h4>
                      <Button
                        onClick={() => addStrengthSection(workout.id)}
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Section
                      </Button>
                    </div>

                    {workout.sections.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No sections added yet</p>
                        <Button
                          onClick={() => addStrengthSection(workout.id)}
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Section
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {workout.sections.map(section => (
                          <WorkoutSection
                            key={section.id}
                            section={section}
                            workoutId={workout.id}
                            onUpdateName={name =>
                              updateStrengthSectionName(
                                workout.id,
                                section.id,
                                name
                              )
                            }
                            onUpdateType={type =>
                              updateStrengthSectionType(
                                workout.id,
                                section.id,
                                type
                              )
                            }
                            onUpdateRestAfter={restAfter =>
                              updateStrengthSectionRestAfter(
                                workout.id,
                                section.id,
                                restAfter
                              )
                            }
                            onUpdateEmomDuration={duration =>
                              updateStrengthSectionEmomDuration(
                                workout.id,
                                section.id,
                                duration
                              )
                            }
                            onRemove={() =>
                              removeStrengthSection(workout.id, section.id)
                            }
                            onAddExercise={() =>
                              handleAddExerciseClick(workout.id, section.id)
                            }
                            onUpdateExerciseEmomReps={(exerciseId, reps) =>
                              updateStrengthExerciseEmomReps(
                                workout.id,
                                section.id,
                                exerciseId,
                                reps
                              )
                            }
                            onUpdateExerciseSets={(exerciseId, sets) =>
                              updateStrengthExerciseSets(
                                workout.id,
                                section.id,
                                exerciseId,
                                sets
                              )
                            }
                            onUpdateExerciseName={(exerciseId, name) =>
                              updateStrengthExerciseName(
                                workout.id,
                                section.id,
                                exerciseId,
                                name
                              )
                            }
                            onUpdateRestTimer={(exerciseId, restTimer) =>
                              updateStrengthRestTimer(
                                workout.id,
                                section.id,
                                exerciseId,
                                restTimer
                              )
                            }
                            onUpdateExerciseRestAfter={(
                              exerciseId,
                              restAfter
                            ) =>
                              updateStrengthExerciseRestAfter(
                                workout.id,
                                section.id,
                                exerciseId,
                                restAfter
                              )
                            }
                            onRemoveExercise={exerciseId =>
                              removeStrengthExercise(
                                workout.id,
                                section.id,
                                exerciseId
                              )
                            }
                            onAddApproachSets={exerciseId =>
                              handleAddApproachSets(
                                workout.id,
                                section.id,
                                exerciseId
                              )
                            }
                            onUpdateProgressionMethod={(exerciseId, method) =>
                              updateStrengthExerciseProgressionMethod(
                                workout.id,
                                section.id,
                                exerciseId,
                                method
                              )
                            }
                            onNotesClick={(type, exerciseId, setId) =>
                              handleNotesClick(
                                type,
                                workout.id,
                                section.id,
                                exerciseId,
                                setId
                              )
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </Card>
          ))}

          {strengthWorkouts.length === 0 && (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Dumbbell className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-gray-500 mb-4">
                    No strength workouts added yet
                  </p>
                  <Button
                    onClick={addStrengthWorkout}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Dumbbell className="h-4 w-4 mr-2" />
                    Add Your First Strength Workout
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Running Workouts Section */}
        <div className="space-y-4 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Running Workouts (
              {runningWorkouts.length + (creatingRunning ? 1 : 0)})
            </h2>
            <Button
              onClick={handleAddRunningWorkout}
              className="bg-green-600 hover:bg-green-700"
            >
              <Activity className="h-4 w-4 mr-2" />
              Add Running Workout
            </Button>
          </div>

          {/* Running Creation Inline */}
          {creatingRunning && (
            <Card className="border-2 border-green-200">
              <TrailRunningWorkout
                onSave={handleRunningSave}
                onCancel={handleRunningCancel}
                mode="create"
              />
            </Card>
          )}

          {/* Running Editing Inline */}
          {editingRunning && (
            <Card className="border-2 border-green-200">
              <TrailRunningWorkout
                onSave={handleRunningSave}
                onCancel={handleRunningCancel}
                initialData={editingRunning.data}
                mode="edit"
              />
            </Card>
          )}

          {runningWorkouts.map((workout, index) => (
            <Card key={workout.id} className="overflow-hidden">
              <WorkoutHeader
                workout={workout}
                index={index}
                totalCount={runningWorkouts.length}
                isCollapsed={collapsedRunningWorkouts.has(workout.id)}
                duration={calculateWorkoutDuration(workout)}
                onToggleCollapse={() =>
                  toggleRunningWorkoutCollapse(workout.id)
                }
                onMoveUp={() => moveRunningWorkout(workout.id, 'up')}
                onMoveDown={() => moveRunningWorkout(workout.id, 'down')}
                onRemove={() => removeRunningWorkout(workout.id)}
                onEdit={() => handleEditRunning(workout.id)}
                onUpdateName={name =>
                  updateRunningWorkoutName(workout.id, name)
                }
              />

              {!collapsedRunningWorkouts.has(workout.id) && (
                <>
                  <WorkoutDetails
                    objective={workout.objective}
                    schedule={workout.schedule}
                    onUpdateObjective={objective =>
                      updateRunningWorkoutObjective(workout.id, objective)
                    }
                    onUpdateSchedule={(field, value) =>
                      updateRunningWorkoutSchedule(workout.id, field, value)
                    }
                  />

                  {/* Sections */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">Sections</h4>
                      <Button
                        onClick={() => addRunningSection(workout.id)}
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Section
                      </Button>
                    </div>

                    {workout.sections.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No sections added yet</p>
                        <Button
                          onClick={() => addRunningSection(workout.id)}
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Section
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {workout.sections.map(section => (
                          <WorkoutSection
                            key={section.id}
                            section={section}
                            workoutId={workout.id}
                            onUpdateName={name =>
                              updateRunningSectionName(
                                workout.id,
                                section.id,
                                name
                              )
                            }
                            onUpdateType={type =>
                              updateRunningSectionType(
                                workout.id,
                                section.id,
                                type
                              )
                            }
                            onUpdateRestAfter={restAfter =>
                              updateRunningSectionRestAfter(
                                workout.id,
                                section.id,
                                restAfter
                              )
                            }
                            onUpdateEmomDuration={duration =>
                              updateRunningSectionEmomDuration(
                                workout.id,
                                section.id,
                                duration
                              )
                            }
                            onRemove={() =>
                              removeRunningSection(workout.id, section.id)
                            }
                            onAddExercise={() =>
                              handleAddExerciseClick(workout.id, section.id)
                            }
                            onUpdateExerciseEmomReps={(exerciseId, reps) =>
                              updateRunningExerciseEmomReps(
                                workout.id,
                                section.id,
                                exerciseId,
                                reps
                              )
                            }
                            onUpdateExerciseSets={(exerciseId, sets) =>
                              updateRunningExerciseSets(
                                workout.id,
                                section.id,
                                exerciseId,
                                sets
                              )
                            }
                            onUpdateExerciseName={(exerciseId, name) =>
                              updateRunningExerciseName(
                                workout.id,
                                section.id,
                                exerciseId,
                                name
                              )
                            }
                            onUpdateRestTimer={(exerciseId, restTimer) =>
                              updateRunningRestTimer(
                                workout.id,
                                section.id,
                                exerciseId,
                                restTimer
                              )
                            }
                            onUpdateExerciseRestAfter={(
                              exerciseId,
                              restAfter
                            ) =>
                              updateRunningExerciseRestAfter(
                                workout.id,
                                section.id,
                                exerciseId,
                                restAfter
                              )
                            }
                            onRemoveExercise={exerciseId =>
                              removeRunningExercise(
                                workout.id,
                                section.id,
                                exerciseId
                              )
                            }
                            onAddApproachSets={exerciseId =>
                              handleAddApproachSets(
                                workout.id,
                                section.id,
                                exerciseId
                              )
                            }
                            onUpdateProgressionMethod={(exerciseId, method) => {
                              // Running workouts don't have progression methods
                              console.log(
                                'Progression methods not supported for running workouts'
                              );
                            }}
                            onNotesClick={(type, exerciseId, setId) =>
                              handleNotesClick(
                                type,
                                workout.id,
                                section.id,
                                exerciseId,
                                setId
                              )
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </Card>
          ))}

          {runningWorkouts.length === 0 && !creatingRunning && (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Activity className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-gray-500 mb-4">
                    No running workouts added yet
                  </p>
                  <Button
                    onClick={handleAddRunningWorkout}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Add Your First Running Workout
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Modals */}
      <ExerciseSelectionModal
        isOpen={exerciseModalOpen}
        onClose={() => {
          setExerciseModalOpen(false);
          setCurrentAddExerciseContext(null);
        }}
        onSelectExercise={handleExerciseSelect}
      />

      <NotesModal
        isOpen={notesModalOpen}
        onClose={() => {
          setNotesModalOpen(false);
          setCurrentNotesContext(null);
        }}
        onSave={handleNotesSave}
        initialNotes={currentNotesContext?.currentNotes || ''}
      />
    </div>
  );
};

export default RoutineCreation;
