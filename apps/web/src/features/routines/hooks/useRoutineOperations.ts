import { useState } from 'react';
import {
  StrengthWorkout,
  RunningWorkout,
  ProgressionMethod,
  WorkoutSet,
} from '../types';

export function useRoutineOperations(): {
  strengthWorkouts: StrengthWorkout[];
  setStrengthWorkouts: React.Dispatch<React.SetStateAction<StrengthWorkout[]>>;
  runningWorkouts: RunningWorkout[];
  setRunningWorkouts: React.Dispatch<React.SetStateAction<RunningWorkout[]>>;
  generateSetsForProgression: (
    progressionMethod: ProgressionMethod
  ) => WorkoutSet[];
  calculateWorkoutDuration: (
    workout: StrengthWorkout | RunningWorkout
  ) => string;
  addApproachSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
} {
  const [strengthWorkouts, setStrengthWorkouts] = useState<StrengthWorkout[]>(
    []
  );
  const [runningWorkouts, setRunningWorkouts] = useState<RunningWorkout[]>([]);

  // Function to generate sets based on progression method
  const generateSetsForProgression = (
    progressionMethod: ProgressionMethod
  ): WorkoutSet[] => {
    const sets: WorkoutSet[] = [];
    let setNumber = 1;

    switch (progressionMethod) {
      case 'linear':
        // 3 sets of 5 fixed reps
        for (let i = 0; i < 3; i++) {
          sets.push({
            id: `${Date.now()}_${i}_linear`,
            setNumber: setNumber++,
            setType: 'normal',
            repType: 'fixed',
            reps: 5,
            weight: null,
            rpe: null,
            notes: '',
          });
        }
        break;

      case 'dual':
        // 3 sets of 8-12 rep ranges
        for (let i = 0; i < 3; i++) {
          sets.push({
            id: `${Date.now()}_${i}_dual`,
            setNumber: setNumber++,
            setType: 'normal',
            repType: 'range',
            reps: null,
            repsMin: 8,
            repsMax: 12,
            weight: null,
            rpe: null,
            notes: '',
          });
        }
        break;

      case 'inverse-pyramid': {
        // 4 sets with decreasing weight/increasing reps
        const pyramidSets = [
          { reps: 6, note: 'Start with heaviest weight' },
          { reps: 8, note: '~90% of first set' },
          { reps: 10, note: '~80% of first set' },
          { reps: 12, note: '~70% of first set' },
        ];

        pyramidSets.forEach((pyramid, i) => {
          sets.push({
            id: `${Date.now()}_${i}_pyramid`,
            setNumber: setNumber++,
            setType: 'normal',
            repType: 'fixed',
            reps: pyramid.reps,
            weight: null,
            rpe: null,
            notes: pyramid.note,
          });
        });
        break;
      }

      case 'myo-reps':
        // Activation set + 4 mini-sets
        sets.push({
          id: `${Date.now()}_activation`,
          setNumber: setNumber++,
          setType: 'normal',
          repType: 'fixed',
          reps: 12,
          weight: null,
          rpe: null,
          notes: 'Activation set - 2-3 reps in reserve',
        });

        for (let i = 0; i < 4; i++) {
          sets.push({
            id: `${Date.now()}_mini_${i}`,
            setNumber: setNumber++,
            setType: 'failure',
            repType: 'fixed',
            reps: 3,
            weight: null,
            rpe: null,
            notes: `Mini-set ${i + 1} - to failure`,
          });
        }
        break;

      case 'widowmaker':
        // Single high-rep failure set
        sets.push({
          id: `${Date.now()}_widowmaker`,
          setNumber: 1,
          setType: 'failure',
          repType: 'fixed',
          reps: 20,
          weight: null,
          rpe: null,
          notes: 'Single high-rep set to failure',
        });
        break;

      case 'amrap':
        // 2 regular sets + 1 AMRAP set
        for (let i = 0; i < 2; i++) {
          sets.push({
            id: `${Date.now()}_regular_${i}`,
            setNumber: setNumber++,
            setType: 'normal',
            repType: 'fixed',
            reps: 8,
            weight: null,
            rpe: null,
            notes: '',
          });
        }

        sets.push({
          id: `${Date.now()}_amrap`,
          setNumber: setNumber,
          setType: 'failure',
          repType: 'fixed',
          reps: null,
          weight: null,
          rpe: null,
          notes: 'AMRAP - As many reps as possible',
        });
        break;

      default:
        // Default: single set with fixed 5 reps for linear (default)
        sets.push({
          id: `${Date.now()}_default`,
          setNumber: 1,
          setType: 'normal',
          repType: 'fixed',
          reps: 5,
          weight: null,
          rpe: null,
          notes: '',
        });
    }

    return sets;
  };

  // Calculate estimated duration based on workout content
  const calculateWorkoutDuration = (
    workout: StrengthWorkout | RunningWorkout
  ): string => {
    // For running workouts with trail running data, use the actual estimated duration
    if (
      workout.type === 'running' &&
      'trailRunningData' in workout &&
      workout.trailRunningData
    ) {
      const duration = workout.trailRunningData.estimatedDuration;
      if (duration < 60) return `${duration} min`;
      const hours = Math.floor(duration / 60);
      const mins = duration % 60;
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }

    // For other non-strength workouts, show placeholder or basic estimates
    if (workout.type !== 'strength') {
      const baseEstimates = {
        running: '45 min',
        swimming: '45 min',
        cycling: '60 min',
        'trail-running': '45 min',
      };
      return baseEstimates[workout.type] || '45 min';
    }

    let totalMinutes = 0;

    workout.sections.forEach((section, sectionIndex) => {
      if (section.type === 'emom' && section.emomDuration) {
        // EMOM duration is fixed
        totalMinutes += section.emomDuration;
      } else if (section.type === 'tabata') {
        // TABATA is always 4 minutes
        totalMinutes += 4;
      } else {
        // Standard section calculation
        section.exercises.forEach((exercise, exerciseIndex) => {
          // Calculate time for each set (estimate 45 seconds per set)
          exercise.sets.forEach(() => {
            totalMinutes += 0.75;
          });

          // Add rest time between sets
          if (exercise.sets.length > 1) {
            const restTime = exercise.restTimer;
            const [minutes, seconds] = restTime.split(':').map(Number);
            const restMinutes = minutes + seconds / 60;
            totalMinutes += restMinutes * (exercise.sets.length - 1);
          }

          // Add rest time after exercise (except for the last exercise in section)
          if (exerciseIndex < section.exercises.length - 1) {
            const restAfter = exercise.restAfter;
            const [minutes, seconds] = restAfter.split(':').map(Number);
            totalMinutes += minutes + seconds / 60;
          }
        });
      }

      // Add rest time after section (except for the last section)
      if (sectionIndex < workout.sections.length - 1) {
        const sectionRest = section.restAfter;
        const [minutes, seconds] = sectionRest.split(':').map(Number);
        totalMinutes += minutes + seconds / 60;
      }
    });

    // Round to nearest 5 minutes and format
    const roundedMinutes = Math.round(totalMinutes / 5) * 5;

    if (roundedMinutes === 0) return '—';
    if (roundedMinutes < 60) return `${roundedMinutes} min`;

    const hours = Math.floor(roundedMinutes / 60);
    const mins = roundedMinutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  // Add approach sets to an exercise
  const addApproachSets = (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ): void => {
    setStrengthWorkouts(
      strengthWorkouts.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map(section =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map(exercise => {
                        if (exercise.id === exerciseId) {
                          // Create 2-3 approach sets with lower weight and similar reps
                          const mainSets = exercise.sets.filter(
                            set => set.setType === 'normal'
                          );
                          const firstMainSet =
                            mainSets.length > 0 ? mainSets[0] : null;

                          // Generate approach sets if we have a main set to base them on
                          const approachSets: WorkoutSet[] = [];
                          if (firstMainSet) {
                            // Create 3 approach sets with progressive weight increases
                            const baseWeight = firstMainSet.weight || 60; // Default to 60kg if no weight
                            const targetReps =
                              firstMainSet.reps || firstMainSet.repsMin || 8; // Use reps or min reps

                            for (let i = 1; i <= 3; i++) {
                              const approachWeight = Math.round(
                                baseWeight * (0.4 + i * 0.15)
                              ); // 55%, 70%, 85% progression
                              approachSets.push({
                                id: `approach-${Date.now()}-${i}`,
                                setNumber: i,
                                setType: 'warmup',
                                repType: 'fixed',
                                reps: Math.max(3, Math.round(targetReps * 0.6)), // Fewer reps for approach
                                weight: approachWeight,
                                rpe: Math.min(6, i + 3), // RPE 4-6 for approach sets
                                notes: '',
                              });
                            }
                          }

                          // Insert approach sets at the beginning, then renumber all sets
                          const allSets = [...approachSets, ...exercise.sets];
                          const renumberedSets = allSets.map((set, index) => ({
                            ...set,
                            setNumber: index + 1,
                          }));

                          return {
                            ...exercise,
                            sets: renumberedSets,
                            hasApproachSets: true,
                          };
                        }
                        return exercise;
                      }),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  return {
    strengthWorkouts,
    setStrengthWorkouts,
    runningWorkouts,
    setRunningWorkouts,
    generateSetsForProgression,
    calculateWorkoutDuration,
    addApproachSets,
  };
}
