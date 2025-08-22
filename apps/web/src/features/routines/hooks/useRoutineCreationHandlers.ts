import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useToast } from '@peakhealth/ui';
import { routineService } from '../services/routineService';
import {
  useRoutineValidation,
  useRoutineModals,
} from '../features/routine-creation/hooks';
import { addApproachSets } from '../utils/workoutCalculations';
import {
  StrengthWorkout,
  RunningWorkout,
  TrailRunningWorkoutData,
  WorkoutSet,
  Exercise,
  WorkoutSection,
} from '../types';
import { NotesContext } from '../features/routine-creation/types/modal';

/**
 * Hook to manage all event handlers for routine creation
 * Extracted from RoutineCreation component to reduce complexity
 */
export const useRoutineCreationHandlers = (
  // State from useRoutineCreationState
  name: string,
  difficulty: string,
  goal: string,
  description: string,
  objectives: string[],
  duration: number,
  creatingRunning: boolean,
  editingRunning: {
    workoutId: string;
    data: TrailRunningWorkoutData;
  } | null,
  setCreatingRunning: (creating: boolean) => void,
  setEditingRunning: (
    editing: {
      workoutId: string;
      data: TrailRunningWorkoutData;
    } | null
  ) => void,
  // Workout operations from useWorkoutOperations
  strengthWorkouts: StrengthWorkout[],
  runningWorkouts: RunningWorkout[],
  setStrengthWorkouts: (workouts: StrengthWorkout[]) => void,
  setRunningWorkouts: (workouts: RunningWorkout[]) => void,
  addStrengthExercise: (
    workoutId: string,
    sectionId: string,
    exercise: Partial<Exercise>
  ) => void,
  addRunningExercise: (
    workoutId: string,
    sectionId: string,
    exercise: Partial<Exercise>
  ) => void,
  updateStrengthExerciseSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ) => void,
  updateRunningExerciseSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ) => void
): {
  // Save and validation handlers
  handleSaveRoutine: () => Promise<void>;

  // Running workout handlers
  handleRunningSave: (runningData: TrailRunningWorkoutData) => void;
  handleEditRunning: (workoutId: string) => void;

  // Exercise selection handlers
  handleAddExerciseClick: (workoutId: string, sectionId: string) => void;
  handleExerciseSelect: (
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
    }
  ) => void;

  // Notes handlers
  handleNotesClick: (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string
  ) => void;
  handleNotesSave: (notes: string) => void;

  // Set management handlers
  handleAddApproachSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
} => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  const { validateRoutineData } = useRoutineValidation();
  const { openModal, closeModal, getModalContext } = useRoutineModals();

  // Save routine handler
  const handleSaveRoutine = async (): Promise<void> => {
    if (!isAuthenticated || !user) {
      showToast({
        message: 'Please log in to save routines',
        variant: 'error',
      });
      return;
    }

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

    try {
      const routineData = {
        name,
        difficulty: difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
        goal: goal as 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss',
        description,
        objectives,
        duration,
        strengthWorkouts,
        runningWorkouts,
        userId: user.id,
      };

      await routineService.createRoutine(routineData);
      showToast({
        message: 'Routine saved successfully!',
        variant: 'success',
      });
      router.push('/routines');
    } catch {
      showToast({
        message: 'Failed to save routine. Please try again.',
        variant: 'error',
      });
    }
  };

  // Running workout handlers
  const handleRunningSave = (runningData: TrailRunningWorkoutData): void => {
    if (editingRunning) {
      // Update existing running workout
      const updatedWorkouts = runningWorkouts.map((workout: RunningWorkout) =>
        workout.id === editingRunning.workoutId
          ? {
              ...workout,
              trailRunningData: runningData,
            }
          : workout
      );
      setRunningWorkouts(updatedWorkouts);
      setEditingRunning(null);
    } else {
      // Create new running workout
      const newWorkout: RunningWorkout = {
        id: `running-${Date.now()}`,
        name: runningData.name || 'New Running Workout',
        type: 'running',
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
      setRunningWorkouts([...runningWorkouts, newWorkout]);
    }
    setCreatingRunning(false);
  };

  const handleEditRunning = (workoutId: string): void => {
    const workout = runningWorkouts.find(
      (w: RunningWorkout) => w.id === workoutId
    );
    if (workout?.trailRunningData) {
      setEditingRunning({
        workoutId,
        data: workout.trailRunningData,
      });
      setCreatingRunning(true);
    }
  };

  // Exercise selection handlers
  const handleAddExerciseClick = (
    workoutId: string,
    sectionId: string
  ): void => {
    openModal('exercise', { workoutId, sectionId });
  };

  const handleExerciseSelect = (
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
    }
  ): void => {
    const modalContext = getModalContext('exercise');
    if (!modalContext) return;

    const { workoutId, sectionId } = modalContext;
    const exercise = selectedVariant || selectedExercise;

    // Determine workout type and add exercise
    const strengthWorkout = strengthWorkouts.find(
      (w: StrengthWorkout) => w.id === workoutId
    );
    const runningWorkout = runningWorkouts.find(
      (w: RunningWorkout) => w.id === workoutId
    );

    if (strengthWorkout) {
      addStrengthExercise(workoutId, sectionId, exercise);
    } else if (runningWorkout) {
      addRunningExercise(workoutId, sectionId, exercise);
    }

    closeModal();
  };

  // Notes handlers
  const handleNotesClick = (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string
  ): void => {
    // Find current notes
    let currentNotes = '';
    const strengthWorkout = strengthWorkouts.find(
      (w: StrengthWorkout) => w.id === workoutId
    );
    const runningWorkout = runningWorkouts.find(
      (w: RunningWorkout) => w.id === workoutId
    );

    if (strengthWorkout) {
      const section = strengthWorkout.sections.find(
        (s: WorkoutSection) => s.id === sectionId
      );
      if (section) {
        const exercise = section.exercises.find(
          (e: Exercise) => e.id === exerciseId
        );
        if (exercise) {
          if (type === 'exercise') {
            currentNotes = exercise.notes || '';
          } else if (setId) {
            const set = exercise.sets.find((s: WorkoutSet) => s.id === setId);
            currentNotes = set?.notes || '';
          }
        }
      }
    } else if (runningWorkout) {
      const section = runningWorkout.sections.find(
        (s: WorkoutSection) => s.id === sectionId
      );
      if (section) {
        const exercise = section.exercises.find(
          (e: Exercise) => e.id === exerciseId
        );
        if (exercise) {
          if (type === 'exercise') {
            currentNotes = exercise.notes || '';
          } else if (setId) {
            const set = exercise.sets.find((s: WorkoutSet) => s.id === setId);
            currentNotes = set?.notes || '';
          }
        }
      }
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
  };

  const handleNotesSave = (notes: string): void => {
    const notesContext = getModalContext('notes');
    if (!notesContext) return;

    const { type, workoutId, sectionId, exerciseId, setId } = notesContext;

    // Update notes in the appropriate workout
    const strengthWorkout = strengthWorkouts.find(
      (w: StrengthWorkout) => w.id === workoutId
    );
    const runningWorkout = runningWorkouts.find(
      (w: RunningWorkout) => w.id === workoutId
    );

    if (strengthWorkout) {
      const updatedWorkouts = strengthWorkouts.map(
        (workout: StrengthWorkout) =>
          workout.id === workoutId
            ? {
                ...workout,
                sections: workout.sections.map((section: WorkoutSection) =>
                  section.id === sectionId
                    ? {
                        ...section,
                        exercises: section.exercises.map(
                          (exercise: Exercise) =>
                            exercise.id === exerciseId
                              ? type === 'exercise'
                                ? { ...exercise, notes }
                                : {
                                    ...exercise,
                                    sets: exercise.sets.map(
                                      (set: WorkoutSet) =>
                                        set.id === setId
                                          ? { ...set, notes }
                                          : set
                                    ),
                                  }
                              : exercise
                        ),
                      }
                    : section
                ),
              }
            : workout
      );
      setStrengthWorkouts(updatedWorkouts);
    } else if (runningWorkout) {
      const updatedWorkouts = runningWorkouts.map((workout: RunningWorkout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section: WorkoutSection) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise: Exercise) =>
                        exercise.id === exerciseId
                          ? type === 'exercise'
                            ? { ...exercise, notes }
                            : {
                                ...exercise,
                                sets: exercise.sets.map((set: WorkoutSet) =>
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
      );
      setRunningWorkouts(updatedWorkouts);
    }

    closeModal();
  };

  // Set management handlers
  const handleAddApproachSets = (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ): void => {
    // Find the exercise and add approach sets
    const strengthWorkout = strengthWorkouts.find(
      (w: StrengthWorkout) => w.id === workoutId
    );
    const runningWorkout = runningWorkouts.find(
      (w: RunningWorkout) => w.id === workoutId
    );

    if (strengthWorkout) {
      const section = strengthWorkout.sections.find(
        (s: WorkoutSection) => s.id === sectionId
      );
      if (section) {
        const exercise = section.exercises.find(
          (e: Exercise) => e.id === exerciseId
        );
        if (exercise) {
          const updatedSets = addApproachSets(exercise.sets);
          updateStrengthExerciseSets(
            workoutId,
            sectionId,
            exerciseId,
            updatedSets
          );
        }
      }
    } else if (runningWorkout) {
      const section = runningWorkout.sections.find(
        (s: WorkoutSection) => s.id === sectionId
      );
      if (section) {
        const exercise = section.exercises.find(
          (e: Exercise) => e.id === exerciseId
        );
        if (exercise) {
          const updatedSets = addApproachSets(exercise.sets);
          updateRunningExerciseSets(
            workoutId,
            sectionId,
            exerciseId,
            updatedSets
          );
        }
      }
    }

    // Update local state
    if (strengthWorkout) {
      const updatedWorkouts = strengthWorkouts.map((w: StrengthWorkout) =>
        w.id === workoutId
          ? {
              ...w,
              sections: w.sections.map((s: WorkoutSection) =>
                s.id === sectionId
                  ? {
                      ...s,
                      exercises: s.exercises.map((e: Exercise) =>
                        e.id === exerciseId
                          ? {
                              ...e,
                              sets: addApproachSets(e.sets),
                            }
                          : e
                      ),
                    }
                  : s
              ),
            }
          : w
      );
      setStrengthWorkouts(updatedWorkouts);
    } else if (runningWorkout) {
      const updatedWorkouts = runningWorkouts.map((w: RunningWorkout) =>
        w.id === workoutId
          ? {
              ...w,
              sections: w.sections.map((s: WorkoutSection) =>
                s.id === sectionId
                  ? {
                      ...s,
                      exercises: s.exercises.map((e: Exercise) =>
                        e.id === exerciseId
                          ? {
                              ...e,
                              sets: addApproachSets(e.sets),
                            }
                          : e
                      ),
                    }
                  : s
              ),
            }
          : w
      );
      setRunningWorkouts(updatedWorkouts);
    }
  };

  return {
    handleSaveRoutine,
    handleRunningSave,
    handleEditRunning,
    handleAddExerciseClick,
    handleExerciseSelect,
    handleNotesClick,
    handleNotesSave,
    handleAddApproachSets,
  };
};
