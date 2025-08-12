'use client';

import { useState } from 'react';
import {
  StrengthWorkout,
  RunningWorkout,
  WorkoutSection,
  Exercise,
  ProgressionMethod,
  WorkoutSet,
} from '../types';

interface UseWorkoutOperationsProps {
  initialStrengthWorkouts?: StrengthWorkout[];
  initialRunningWorkouts?: RunningWorkout[];
}

export const useWorkoutOperations = ({
  initialStrengthWorkouts = [],
  initialRunningWorkouts = [],
}: UseWorkoutOperationsProps = {}): {
  strengthWorkouts: StrengthWorkout[];
  setStrengthWorkouts: React.Dispatch<React.SetStateAction<StrengthWorkout[]>>;
  runningWorkouts: RunningWorkout[];
  setRunningWorkouts: React.Dispatch<React.SetStateAction<RunningWorkout[]>>;
  addStrengthWorkout: () => void;
  removeStrengthWorkout: (workoutId: string) => void;
  moveStrengthWorkout: (workoutId: string, direction: 'up' | 'down') => void;
  updateStrengthWorkoutName: (workoutId: string, name: string) => void;
  updateStrengthWorkoutObjective: (
    workoutId: string,
    objective: string
  ) => void;
  updateStrengthWorkoutSchedule: (
    workoutId: string,
    field: keyof StrengthWorkout['schedule'],
    value: string | string[]
  ) => void;
  addRunningWorkout: () => void;
  removeRunningWorkout: (workoutId: string) => void;
  moveRunningWorkout: (workoutId: string, direction: 'up' | 'down') => void;
  updateRunningWorkoutName: (workoutId: string, name: string) => void;
  updateRunningWorkoutObjective: (workoutId: string, objective: string) => void;
  updateRunningWorkoutSchedule: (
    workoutId: string,
    field: keyof RunningWorkout['schedule'],
    value: string | string[]
  ) => void;
  addStrengthSection: (workoutId: string) => void;
  addRunningSection: (workoutId: string) => void;
  removeStrengthSection: (workoutId: string, sectionId: string) => void;
  removeRunningSection: (workoutId: string, sectionId: string) => void;
  updateStrengthSectionName: (
    workoutId: string,
    sectionId: string,
    name: string
  ) => void;
  updateRunningSectionName: (
    workoutId: string,
    sectionId: string,
    name: string
  ) => void;
  updateStrengthSectionType: (
    workoutId: string,
    sectionId: string,
    type: WorkoutSection['type']
  ) => void;
  updateRunningSectionType: (
    workoutId: string,
    sectionId: string,
    type: WorkoutSection['type']
  ) => void;
  updateStrengthSectionRestAfter: (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ) => void;
  updateRunningSectionRestAfter: (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ) => void;
  updateStrengthSectionEmomDuration: (
    workoutId: string,
    sectionId: string,
    duration: number
  ) => void;
  updateRunningSectionEmomDuration: (
    workoutId: string,
    sectionId: string,
    duration: number
  ) => void;
  addStrengthExercise: (
    workoutId: string,
    sectionId: string,
    exerciseData: Partial<Exercise>
  ) => void;
  addRunningExercise: (
    workoutId: string,
    sectionId: string,
    exerciseData: Partial<Exercise>
  ) => void;
  removeStrengthExercise: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
  removeRunningExercise: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
  updateStrengthExerciseName: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ) => void;
  updateRunningExerciseName: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ) => void;
  updateStrengthExerciseSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ) => void;
  updateRunningExerciseSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ) => void;
  updateStrengthRestTimer: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ) => void;
  updateRunningRestTimer: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ) => void;
  updateStrengthExerciseRestAfter: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ) => void;
  updateRunningExerciseRestAfter: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ) => void;
  updateStrengthExerciseEmomReps: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ) => void;
  updateRunningExerciseEmomReps: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ) => void;
  updateStrengthExerciseProgressionMethod: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    progressionMethod: ProgressionMethod
  ) => void;
} => {
  const [strengthWorkouts, setStrengthWorkouts] = useState<StrengthWorkout[]>(
    initialStrengthWorkouts
  );
  const [runningWorkouts, setRunningWorkouts] = useState<RunningWorkout[]>(
    initialRunningWorkouts
  );

  // Strength Workout Operations
  const addStrengthWorkout = (): void => {
    const newWorkout: StrengthWorkout = {
      id: `strength-${Date.now()}`,
      name: 'New Strength Workout',
      type: 'strength',
      objective: '',
      schedule: {
        repeatPattern: '',
        repeatValue: '',
        selectedDays: [],
        time: '',
      },
      sections: [],
    };
    setStrengthWorkouts(prev => [...prev, newWorkout]);
  };

  const removeStrengthWorkout = (workoutId: string): void => {
    setStrengthWorkouts(prev =>
      prev.filter(workout => workout.id !== workoutId)
    );
  };

  const moveStrengthWorkout = (
    workoutId: string,
    direction: 'up' | 'down'
  ): void => {
    setStrengthWorkouts(prev => {
      const index = prev.findIndex(workout => workout.id === workoutId);
      if (index === -1) return prev;

      const newWorkouts = [...prev];
      if (direction === 'up' && index > 0) {
        [newWorkouts[index], newWorkouts[index - 1]] = [
          newWorkouts[index - 1],
          newWorkouts[index],
        ];
      } else if (direction === 'down' && index < newWorkouts.length - 1) {
        [newWorkouts[index], newWorkouts[index + 1]] = [
          newWorkouts[index + 1],
          newWorkouts[index],
        ];
      }
      return newWorkouts;
    });
  };

  const updateStrengthWorkoutName = (workoutId: string, name: string): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId ? { ...workout, name } : workout
      )
    );
  };

  const updateStrengthWorkoutObjective = (
    workoutId: string,
    objective: string
  ): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId ? { ...workout, objective } : workout
      )
    );
  };

  const updateStrengthWorkoutSchedule = (
    workoutId: string,
    field: keyof StrengthWorkout['schedule'],
    value: string | string[]
  ): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? { ...workout, schedule: { ...workout.schedule, [field]: value } }
          : workout
      )
    );
  };

  // Running Workout Operations
  const addRunningWorkout = (): void => {
    const newWorkout: RunningWorkout = {
      id: `running-${Date.now()}`,
      name: 'New Running Workout',
      type: 'running',
      objective: '',
      schedule: {
        repeatPattern: '',
        repeatValue: '',
        selectedDays: [],
        time: '',
      },
      sections: [],
    };
    setRunningWorkouts(prev => [...prev, newWorkout]);
  };

  const removeRunningWorkout = (workoutId: string): void => {
    setRunningWorkouts(prev =>
      prev.filter(workout => workout.id !== workoutId)
    );
  };

  const moveRunningWorkout = (
    workoutId: string,
    direction: 'up' | 'down'
  ): void => {
    setRunningWorkouts(prev => {
      const index = prev.findIndex(workout => workout.id === workoutId);
      if (index === -1) return prev;

      const newWorkouts = [...prev];
      if (direction === 'up' && index > 0) {
        [newWorkouts[index], newWorkouts[index - 1]] = [
          newWorkouts[index - 1],
          newWorkouts[index],
        ];
      } else if (direction === 'down' && index < newWorkouts.length - 1) {
        [newWorkouts[index], newWorkouts[index + 1]] = [
          newWorkouts[index + 1],
          newWorkouts[index],
        ];
      }
      return newWorkouts;
    });
  };

  const updateRunningWorkoutName = (workoutId: string, name: string): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId ? { ...workout, name } : workout
      )
    );
  };

  const updateRunningWorkoutObjective = (
    workoutId: string,
    objective: string
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId ? { ...workout, objective } : workout
      )
    );
  };

  const updateRunningWorkoutSchedule = (
    workoutId: string,
    field: keyof RunningWorkout['schedule'],
    value: string | string[]
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? { ...workout, schedule: { ...workout.schedule, [field]: value } }
          : workout
      )
    );
  };

  // Section Operations
  const addStrengthSection = (workoutId: string): void => {
    const newSection: WorkoutSection = {
      id: `section-${Date.now()}`,
      name: 'New Section',
      type: 'basic',
      exercises: [],
      restAfter: '',
    };
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? { ...workout, sections: [...workout.sections, newSection] }
          : workout
      )
    );
  };

  const addRunningSection = (workoutId: string): void => {
    const newSection: WorkoutSection = {
      id: `section-${Date.now()}`,
      name: 'New Section',
      type: 'basic',
      exercises: [],
      restAfter: '',
    };
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? { ...workout, sections: [...workout.sections, newSection] }
          : workout
      )
    );
  };

  const removeStrengthSection = (
    workoutId: string,
    sectionId: string
  ): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.filter(
                section => section.id !== sectionId
              ),
            }
          : workout
      )
    );
  };

  const removeRunningSection = (workoutId: string, sectionId: string): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.filter(
                section => section.id !== sectionId
              ),
            }
          : workout
      )
    );
  };

  const updateStrengthSectionName = (
    workoutId: string,
    sectionId: string,
    name: string
  ): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId ? { ...section, name } : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningSectionName = (
    workoutId: string,
    sectionId: string,
    name: string
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId ? { ...section, name } : section
              ),
            }
          : workout
      )
    );
  };

  const updateStrengthSectionType = (
    workoutId: string,
    sectionId: string,
    type: WorkoutSection['type']
  ): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId ? { ...section, type } : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningSectionType = (
    workoutId: string,
    sectionId: string,
    type: WorkoutSection['type']
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId ? { ...section, type } : section
              ),
            }
          : workout
      )
    );
  };

  const updateStrengthSectionRestAfter = (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId ? { ...section, restAfter } : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningSectionRestAfter = (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId ? { ...section, restAfter } : section
              ),
            }
          : workout
      )
    );
  };

  const updateStrengthSectionEmomDuration = (
    workoutId: string,
    sectionId: string,
    duration: number
  ): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId
                  ? { ...section, emomDuration: duration }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningSectionEmomDuration = (
    workoutId: string,
    sectionId: string,
    duration: number
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId
                  ? { ...section, emomDuration: duration }
                  : section
              ),
            }
          : workout
      )
    );
  };

  // Exercise Operations
  const addStrengthExercise = (
    workoutId: string,
    sectionId: string,
    exerciseData: Partial<Exercise>
  ): void => {
    const newExercise: Exercise = {
      id: `exercise-${Date.now()}`,
      name: exerciseData.name || 'New Exercise',
      category: exerciseData.category,
      muscleGroups: exerciseData.muscleGroups,
      equipment: exerciseData.equipment || [], // Include equipment data
      sets: exerciseData.sets || [],
      restTimer: exerciseData.restTimer || '',
      restAfter: exerciseData.restAfter || '',
      notes: exerciseData.notes || '',
      progressionMethod: exerciseData.progressionMethod,
      hasApproachSets: exerciseData.hasApproachSets || false,
      emomReps: exerciseData.emomReps,
    };

    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: [...section.exercises, newExercise],
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const addRunningExercise = (
    workoutId: string,
    sectionId: string,
    exerciseData: Partial<Exercise>
  ): void => {
    const newExercise: Exercise = {
      id: `exercise-${Date.now()}`,
      name: exerciseData.name || 'New Exercise',
      category: exerciseData.category,
      muscleGroups: exerciseData.muscleGroups,
      equipment: exerciseData.equipment || [], // Include equipment data
      sets: exerciseData.sets || [],
      restTimer: exerciseData.restTimer || '',
      restAfter: exerciseData.restAfter || '',
      notes: exerciseData.notes || '',
      progressionMethod: exerciseData.progressionMethod,
      hasApproachSets: exerciseData.hasApproachSets || false,
      emomReps: exerciseData.emomReps,
    };

    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: [...section.exercises, newExercise],
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const removeStrengthExercise = (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.filter(
                        exercise => exercise.id !== exerciseId
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const removeRunningExercise = (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.filter(
                        exercise => exercise.id !== exerciseId
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateStrengthExerciseName = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ): void => {
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
                          ? { ...exercise, name }
                          : exercise
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningExerciseName = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ): void => {
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
                          ? { ...exercise, name }
                          : exercise
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateStrengthExerciseSets = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ): void => {
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
                          ? { ...exercise, sets }
                          : exercise
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningExerciseSets = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ): void => {
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
                          ? { ...exercise, sets }
                          : exercise
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateStrengthRestTimer = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ): void => {
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
                          ? { ...exercise, restTimer }
                          : exercise
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningRestTimer = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ): void => {
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
                          ? { ...exercise, restTimer }
                          : exercise
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateStrengthExerciseRestAfter = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ): void => {
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
                          ? { ...exercise, restAfter }
                          : exercise
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningExerciseRestAfter = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ): void => {
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
                          ? { ...exercise, restAfter }
                          : exercise
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateStrengthExerciseEmomReps = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ): void => {
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
                          ? { ...exercise, emomReps: reps }
                          : exercise
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningExerciseEmomReps = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ): void => {
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
                          ? { ...exercise, emomReps: reps }
                          : exercise
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateStrengthExerciseProgressionMethod = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    progressionMethod: ProgressionMethod
  ): void => {
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
                          ? { ...exercise, progressionMethod }
                          : exercise
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  return {
    // State
    strengthWorkouts,
    setStrengthWorkouts,
    runningWorkouts,
    setRunningWorkouts,

    // Strength Workout Operations
    addStrengthWorkout,
    removeStrengthWorkout,
    moveStrengthWorkout,
    updateStrengthWorkoutName,
    updateStrengthWorkoutObjective,
    updateStrengthWorkoutSchedule,

    // Running Workout Operations
    addRunningWorkout,
    removeRunningWorkout,
    moveRunningWorkout,
    updateRunningWorkoutName,
    updateRunningWorkoutObjective,
    updateRunningWorkoutSchedule,

    // Section Operations
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

    // Exercise Operations
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
  };
};
