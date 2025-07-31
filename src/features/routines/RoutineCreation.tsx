"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Target,
  Dumbbell,
  Leaf,
  ChevronDown,
  ChevronUp,
  Trash2,
  FileText,
  Timer,
  MapPin,
  ArrowUp,
  ArrowDown,
  Activity,
  Waves,
  Bike,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import ExerciseSelectionModal from "@/features/exercises/ExerciseSelectionModal";
import NotesModal from "@/components/shared/NotesModal";
import SetManagement, {
  WorkoutSet,
  ProgressionMethod as WorkoutProgressionMethod,
} from "@/features/workout/SetManagement";
import TrailRunningWorkout, {
  TrailRunningWorkoutData,
} from "@/features/routines/TrailRunningWorkout";

export type WorkoutType =
  | "strength"
  | "running"
  | "trail-running"
  | "swimming"
  | "cycling";

export type ProgressionMethod =
  | "linear"
  | "dual"
  | "inverse-pyramid"
  | "myo-reps"
  | "widowmaker"
  | "amrap";

interface RoutineCreationProps {
  editRoutineId?: string;
  mode?: "create" | "edit";
}

interface Exercise {
  id: string;
  name: string;
  category?: string;
  muscleGroups?: string[];
  sets: WorkoutSet[];
  restTimer: string; // rest between sets
  restAfter: string; // rest after this exercise
  notes: string;
  progressionMethod?: ProgressionMethod; // progression method for strength exercises
  hasApproachSets?: boolean; // track if approach sets have been added
  // EMOM specific properties
  emomReps?: number; // target reps per minute
  // TABATA specific properties (uses time intervals instead of sets)
}

interface WorkoutSection {
  id: string;
  name: string;
  type: "warmup" | "basic" | "cooldown" | "emom" | "tabata";
  exercises: Exercise[];
  restAfter: string; // rest after this section
  // EMOM specific properties
  emomDuration?: number; // duration in minutes
  // TABATA specific properties (always 4 minutes, 8 rounds)
}

interface StrengthWorkout {
  id: string;
  name: string;
  type: "strength";
  objective: string;
  schedule: {
    weeks: string;
    day: string;
    time: string;
  };
  sections: WorkoutSection[];
}

interface RunningWorkout {
  id: string;
  name: string;
  type: "running" | "trail-running" | "swimming" | "cycling";
  objective: string;
  schedule: {
    weeks: string;
    day: string;
    time: string;
  };
  sections: WorkoutSection[];
  trailRunningData?: TrailRunningWorkoutData; // For trail running specific data
}

export default function RoutineCreation({
  editRoutineId,
  mode = "create",
}: RoutineCreationProps) {
  const router = useRouter();
  const [routineName, setRoutineName] = useState("");
  const [duration, setDuration] = useState("4");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");

  // Modal states
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);

  // Running workout inline creation state
  const [creatingRunning, setCreatingRunning] = useState(false);
  const [editingRunning, setEditingRunning] = useState<{
    workoutId: string;
    data: TrailRunningWorkoutData;
  } | null>(null);

  const [currentNotesContext, setCurrentNotesContext] = useState<{
    type: "exercise" | "set";
    workoutId: string;
    sectionId: string;
    exerciseId: string;
    setId?: string;
    currentNotes: string;
  } | null>(null);
  const [currentAddExerciseContext, setCurrentAddExerciseContext] = useState<{
    workoutId: string;
    sectionId: string;
  } | null>(null);

  // Collapsed workouts state
  const [collapsedStrengthWorkouts, setCollapsedStrengthWorkouts] = useState<
    Set<string>
  >(new Set());
  const [collapsedRunningWorkouts, setCollapsedRunningWorkouts] = useState<
    Set<string>
  >(new Set());

  // Separate workout arrays
  const [strengthWorkouts, setStrengthWorkouts] = useState<StrengthWorkout[]>(
    []
  );

  const [runningWorkouts, setRunningWorkouts] = useState<RunningWorkout[]>([]);

  // Load existing routine data when in edit mode
  useEffect(() => {
    if (mode === "edit" && editRoutineId) {
      // Mock data for editing - in a real app, this would come from an API
      const existingRoutine = {
        name: "Full Body Split",
        duration: "8",
        difficulty: "Intermediate",
        description:
          "A comprehensive full-body workout targeting all major muscle groups with compound movements.",
        objectives:
          "Build strength, increase muscle mass, and improve overall fitness through progressive overload",
        strengthWorkouts: [
          {
            id: "1",
            name: "Full Body Strength A",
            type: "strength" as const,
            objective:
              "Build foundational strength across all major muscle groups with compound movements",
            schedule: {
              weeks: "Week 1, 3, 5",
              day: "Monday",
              time: "9:00 AM",
            },
            sections: [
              {
                id: "1",
                name: "Warm-up",
                type: "warmup" as const,
                restAfter: "02:00",
                exercises: [
                  {
                    id: "1",
                    name: "Dynamic Stretching",
                    sets: [
                      {
                        id: "1",
                        setNumber: 1,
                        setType: "normal" as const,
                        repType: "fixed" as const,
                        reps: null,
                        weight: null,
                        rpe: null,
                        notes: "",
                      },
                    ],
                    restTimer: "00:15",
                    restAfter: "01:00",
                    notes: "",
                    progressionMethod: "linear" as const,
                  },
                ],
              },
              {
                id: "2",
                name: "Basic Workout",
                type: "basic" as const,
                restAfter: "03:00",
                exercises: [
                  {
                    id: "2",
                    name: "Barbell Squat",
                    sets: [
                      {
                        id: "1",
                        setNumber: 1,
                        setType: "warmup" as const,
                        repType: "fixed" as const,
                        reps: 10,
                        weight: 60,
                        rpe: 6,
                        notes: "",
                      },
                      {
                        id: "2",
                        setNumber: 2,
                        setType: "normal" as const,
                        repType: "range" as const,
                        reps: null,
                        repsMin: 8,
                        repsMax: 12,
                        weight: 80,
                        rpe: 8,
                        notes: "",
                      },
                      {
                        id: "3",
                        setNumber: 3,
                        setType: "normal" as const,
                        repType: "range" as const,
                        reps: null,
                        repsMin: 8,
                        repsMax: 12,
                        weight: 80,
                        rpe: 8,
                        notes: "",
                      },
                      {
                        id: "4",
                        setNumber: 4,
                        setType: "failure" as const,
                        repType: "fixed" as const,
                        reps: null,
                        weight: 70,
                        rpe: 10,
                        notes: "",
                      },
                    ],
                    restTimer: "02:00",
                    restAfter: "02:30",
                    notes: "Focus on depth and controlled movement",
                    progressionMethod: "dual" as const,
                  },
                ],
              },
              {
                id: "3",
                name: "Cool-down",
                type: "cooldown" as const,
                restAfter: "00:00",
                exercises: [
                  {
                    id: "3",
                    name: "Static Stretching",
                    sets: [],
                    restTimer: "00:00",
                    restAfter: "00:00",
                    notes: "",
                    progressionMethod: "linear" as const,
                  },
                ],
              },
            ],
          },
        ],
        runningWorkouts: runningWorkouts,
      };

      setRoutineName(existingRoutine.name);
      setDuration(existingRoutine.duration);
      setDifficulty(existingRoutine.difficulty);
      setDescription(existingRoutine.description);
      setObjectives(existingRoutine.objectives);
      setStrengthWorkouts(existingRoutine.strengthWorkouts);
      setRunningWorkouts(existingRoutine.runningWorkouts);
    }
  }, [mode, editRoutineId]);

  // Progression method options with descriptions
  const progressionMethods = [
    {
      value: "linear",
      label: "Linear Progression",
      description: "Increase weight consistently each session",
    },
    {
      value: "dual",
      label: "Dual Progression",
      description: "Progress reps first, then weight",
    },
    {
      value: "inverse-pyramid",
      label: "Inverse Pyramid",
      description: "Start heavy, decrease weight and increase reps",
    },
    {
      value: "myo-reps",
      label: "Myo-Reps",
      description: "Activation set followed by mini-sets to failure",
    },
    {
      value: "widowmaker",
      label: "Widowmaker",
      description: "Single high-rep set with moderate weight",
    },
    {
      value: "amrap",
      label: "AMRAP",
      description: "As Many Reps As Possible on final set",
    },
  ];

  const getProgressionMethodLabel = (method: ProgressionMethod) => {
    return (
      progressionMethods.find((pm) => pm.value === method)?.label || method
    );
  };

  const getProgressionMethodColor = (method: ProgressionMethod) => {
    const colors = {
      linear: "bg-green-100 text-green-800 border-green-200",
      dual: "bg-blue-100 text-blue-800 border-blue-200",
      "inverse-pyramid": "bg-purple-100 text-purple-800 border-purple-200",
      "myo-reps": "bg-orange-100 text-orange-800 border-orange-200",
      widowmaker: "bg-red-100 text-red-800 border-red-200",
      amrap: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return colors[method] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleAddStrengthWorkout = () => {
    const workoutName = `Strength Workout ${strengthWorkouts.length + 1}`;
    const defaultObjective = "";

    const newStrengthWorkout: StrengthWorkout = {
      id: Date.now().toString(),
      name: workoutName,
      type: "strength",
      objective: defaultObjective,
      schedule: {
        weeks: "",
        day: "Monday",
        time: "",
      },
      sections: [],
    };

    setStrengthWorkouts([...strengthWorkouts, newStrengthWorkout]);
  };

  const handleAddRunningWorkout = () => {
    setCreatingRunning(true);
  };

  const handleRunningSave = (runningData: TrailRunningWorkoutData) => {
    if (editingRunning) {
      // Edit existing workout
      setRunningWorkouts(
        runningWorkouts.map((workout) => {
          if (workout.id === editingRunning.workoutId) {
            return {
              ...workout,
              name: runningData.name,
              objective: runningData.description,
              trailRunningData: runningData,
            };
          }
          return workout;
        })
      );
      setEditingRunning(null);
    } else {
      // Create new workout
      const newWorkout: RunningWorkout = {
        id: Date.now().toString(),
        name: runningData.name,
        type: "running",
        objective: runningData.description,
        schedule: {
          weeks: "Week 1, 2, 3",
          day: "Tuesday",
          time: "10:00 AM",
        },
        sections: [], // Running uses its own data structure
        trailRunningData: runningData,
      };

      setRunningWorkouts([...runningWorkouts, newWorkout]);
      setCreatingRunning(false);
    }
  };

  const handleRunningCancel = () => {
    setCreatingRunning(false);
    setEditingRunning(null);
  };

  const handleEditRunning = (workoutId: string) => {
    const workout = runningWorkouts.find((w) => w.id === workoutId);
    if (workout?.trailRunningData) {
      setEditingRunning({ workoutId, data: workout.trailRunningData });
    }
  };

  const removeStrengthWorkout = (workoutId: string) => {
    setStrengthWorkouts(
      strengthWorkouts.filter((workout) => workout.id !== workoutId)
    );
  };

  const removeRunningWorkout = (workoutId: string) => {
    setRunningWorkouts(
      runningWorkouts.filter((workout) => workout.id !== workoutId)
    );
  };

  const moveStrengthWorkout = (workoutId: string, direction: "up" | "down") => {
    const currentIndex = strengthWorkouts.findIndex((w) => w.id === workoutId);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= strengthWorkouts.length) return;

    const newWorkouts = [...strengthWorkouts];
    const [movedWorkout] = newWorkouts.splice(currentIndex, 1);
    newWorkouts.splice(newIndex, 0, movedWorkout);
    setStrengthWorkouts(newWorkouts);
  };

  const moveRunningWorkout = (workoutId: string, direction: "up" | "down") => {
    const currentIndex = runningWorkouts.findIndex((w) => w.id === workoutId);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= runningWorkouts.length) return;

    const newWorkouts = [...runningWorkouts];
    const [movedWorkout] = newWorkouts.splice(currentIndex, 1);
    newWorkouts.splice(newIndex, 0, movedWorkout);
    setRunningWorkouts(newWorkouts);
  };

  const updateStrengthWorkoutName = (workoutId: string, name: string) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId ? { ...workout, name } : workout
      )
    );
  };

  const updateRunningWorkoutName = (workoutId: string, name: string) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId ? { ...workout, name } : workout
      )
    );
  };

  const updateStrengthWorkoutObjective = (
    workoutId: string,
    objective: string
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId ? { ...workout, objective } : workout
      )
    );
  };

  const updateRunningWorkoutObjective = (
    workoutId: string,
    objective: string
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId ? { ...workout, objective } : workout
      )
    );
  };

  const updateStrengthWorkoutSchedule = (
    workoutId: string,
    field: keyof StrengthWorkout["schedule"],
    value: string
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? { ...workout, schedule: { ...workout.schedule, [field]: value } }
          : workout
      )
    );
  };

  const updateRunningWorkoutSchedule = (
    workoutId: string,
    field: keyof RunningWorkout["schedule"],
    value: string
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? { ...workout, schedule: { ...workout.schedule, [field]: value } }
          : workout
      )
    );
  };

  // Wrapper functions for renderWorkoutCard compatibility
  const updateStrengthWorkoutScheduleWrapper = (
    workoutId: string,
    field: string,
    value: string
  ) => {
    updateStrengthWorkoutSchedule(
      workoutId,
      field as keyof StrengthWorkout["schedule"],
      value
    );
  };

  const updateRunningWorkoutScheduleWrapper = (
    workoutId: string,
    field: string,
    value: string
  ) => {
    updateRunningWorkoutSchedule(
      workoutId,
      field as keyof RunningWorkout["schedule"],
      value
    );
  };

  // Calculate estimated duration based on workout content
  const calculateWorkoutDuration = (
    workout: StrengthWorkout | RunningWorkout
  ): string => {
    // For running workouts with trail running data, use the actual estimated duration
    if (
      workout.type === "running" &&
      "trailRunningData" in workout &&
      workout.trailRunningData
    ) {
      const duration = workout.trailRunningData.estimatedDuration;
      if (duration < 60) return `${duration} min`;
      const hours = Math.floor(duration / 60);
      const mins = duration % 60;
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }

    // For other non-strength workouts, show placeholder or basic estimates
    if (workout.type !== "strength") {
      const baseEstimates = {
        running: "45 min",
        swimming: "45 min",
        cycling: "60 min",
        "trail-running": "45 min",
      };
      return baseEstimates[workout.type] || "45 min";
    }

    let totalMinutes = 0;

    workout.sections.forEach((section, sectionIndex) => {
      if (section.type === "emom" && section.emomDuration) {
        // EMOM duration is fixed
        totalMinutes += section.emomDuration;
      } else if (section.type === "tabata") {
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
            const [minutes, seconds] = restTime.split(":").map(Number);
            const restMinutes = minutes + seconds / 60;
            totalMinutes += restMinutes * (exercise.sets.length - 1);
          }

          // Add rest time after exercise (except for the last exercise in section)
          if (exerciseIndex < section.exercises.length - 1) {
            const restAfter = exercise.restAfter;
            const [minutes, seconds] = restAfter.split(":").map(Number);
            totalMinutes += minutes + seconds / 60;
          }
        });
      }

      // Add rest time after section (except for the last section)
      if (sectionIndex < workout.sections.length - 1) {
        const sectionRest = section.restAfter;
        const [minutes, seconds] = sectionRest.split(":").map(Number);
        totalMinutes += minutes + seconds / 60;
      }
    });

    // Round to nearest 5 minutes and format
    const roundedMinutes = Math.round(totalMinutes / 5) * 5;

    if (roundedMinutes === 0) return "—";
    if (roundedMinutes < 60) return `${roundedMinutes} min`;

    const hours = Math.floor(roundedMinutes / 60);
    const mins = roundedMinutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const addStrengthSection = (workoutId: string) => {
    const newSection: WorkoutSection = {
      id: Date.now().toString(),
      name: "Basic Section",
      type: "basic",
      restAfter: "02:00",
      exercises: [],
    };

    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? { ...workout, sections: [...workout.sections, newSection] }
          : workout
      )
    );
  };

  const addRunningSection = (workoutId: string) => {
    const newSection: WorkoutSection = {
      id: Date.now().toString(),
      name: "Basic Section",
      type: "basic",
      restAfter: "02:00",
      exercises: [],
    };

    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? { ...workout, sections: [...workout.sections, newSection] }
          : workout
      )
    );
  };

  const removeStrengthSection = (workoutId: string, sectionId: string) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.filter(
                (section) => section.id !== sectionId
              ),
            }
          : workout
      )
    );
  };

  const removeRunningSection = (workoutId: string, sectionId: string) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.filter(
                (section) => section.id !== sectionId
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
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
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
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
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
    type: WorkoutSection["type"]
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      type,
                      // Set default values for EMOM and TABATA
                      emomDuration: type === "emom" ? 10 : section.emomDuration,
                      // Clear exercises if switching to TABATA since they need different configuration
                      exercises:
                        type === "tabata" || type === "emom"
                          ? []
                          : section.exercises,
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningSectionType = (
    workoutId: string,
    sectionId: string,
    type: WorkoutSection["type"]
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      type,
                      // Set default values for EMOM and TABATA
                      emomDuration: type === "emom" ? 10 : section.emomDuration,
                      // Clear exercises if switching to TABATA since they need different configuration
                      exercises:
                        type === "tabata" || type === "emom"
                          ? []
                          : section.exercises,
                    }
                  : section
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
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
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
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
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
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
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
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? { ...section, emomDuration: duration }
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
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
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
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
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

  // Function to generate sets based on progression method
  const generateSetsForProgression = (
    progressionMethod: ProgressionMethod
  ): WorkoutSet[] => {
    const sets: WorkoutSet[] = [];
    let setNumber = 1;

    switch (progressionMethod) {
      case "linear":
        // 3 sets of 5 fixed reps
        for (let i = 0; i < 3; i++) {
          sets.push({
            id: `${Date.now()}_${i}_linear`,
            setNumber: setNumber++,
            setType: "normal",
            repType: "fixed",
            reps: 5,
            weight: null,
            rpe: null,
            notes: "",
          });
        }
        break;

      case "dual":
        // 3 sets of 8-12 rep ranges
        for (let i = 0; i < 3; i++) {
          sets.push({
            id: `${Date.now()}_${i}_dual`,
            setNumber: setNumber++,
            setType: "normal",
            repType: "range",
            reps: null,
            repsMin: 8,
            repsMax: 12,
            weight: null,
            rpe: null,
            notes: "",
          });
        }
        break;

      case "inverse-pyramid":
        // 4 sets with decreasing weight/increasing reps
        const pyramidSets = [
          { reps: 6, note: "Start with heaviest weight" },
          { reps: 8, note: "~90% of first set" },
          { reps: 10, note: "~80% of first set" },
          { reps: 12, note: "~70% of first set" },
        ];

        pyramidSets.forEach((pyramid, i) => {
          sets.push({
            id: `${Date.now()}_${i}_pyramid`,
            setNumber: setNumber++,
            setType: "normal",
            repType: "fixed",
            reps: pyramid.reps,
            weight: null,
            rpe: null,
            notes: pyramid.note,
          });
        });
        break;

      case "myo-reps":
        // Activation set + 4 mini-sets
        sets.push({
          id: `${Date.now()}_activation`,
          setNumber: setNumber++,
          setType: "normal",
          repType: "fixed",
          reps: 12,
          weight: null,
          rpe: null,
          notes: "Activation set - 2-3 reps in reserve",
        });

        for (let i = 0; i < 4; i++) {
          sets.push({
            id: `${Date.now()}_mini_${i}`,
            setNumber: setNumber++,
            setType: "failure",
            repType: "fixed",
            reps: 3,
            weight: null,
            rpe: null,
            notes: `Mini-set ${i + 1} - to failure`,
          });
        }
        break;

      case "widowmaker":
        // Single high-rep failure set
        sets.push({
          id: `${Date.now()}_widowmaker`,
          setNumber: 1,
          setType: "failure",
          repType: "fixed",
          reps: 20,
          weight: null,
          rpe: null,
          notes: "Single high-rep set to failure",
        });
        break;

      case "amrap":
        // 2 regular sets + 1 AMRAP set
        for (let i = 0; i < 2; i++) {
          sets.push({
            id: `${Date.now()}_regular_${i}`,
            setNumber: setNumber++,
            setType: "normal",
            repType: "fixed",
            reps: 8,
            weight: null,
            rpe: null,
            notes: "",
          });
        }

        sets.push({
          id: `${Date.now()}_amrap`,
          setNumber: setNumber,
          setType: "failure",
          repType: "fixed",
          reps: null,
          weight: null,
          rpe: null,
          notes: "AMRAP - As many reps as possible",
        });
        break;

      default:
        // Default: single set with fixed 5 reps for linear (default)
        sets.push({
          id: `${Date.now()}_default`,
          setNumber: 1,
          setType: "normal",
          repType: "fixed",
          reps: 5,
          weight: null,
          rpe: null,
          notes: "",
        });
    }

    return sets;
  };

  const updateStrengthExerciseProgressionMethod = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    progressionMethod: ProgressionMethod
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
                        exercise.id === exerciseId
                          ? {
                              ...exercise,
                              progressionMethod,
                              sets: generateSetsForProgression(
                                progressionMethod
                              ), // Auto-generate sets
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
  };

  const addApproachSets = (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) => {
                        if (exercise.id === exerciseId) {
                          // Create 2-3 approach sets with lower weight and similar reps
                          const mainSets = exercise.sets.filter(
                            (set) => set.setType === "normal"
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
                                setType: "warmup",
                                repType: "fixed",
                                reps: Math.max(3, Math.round(targetReps * 0.6)), // Fewer reps for approach
                                weight: approachWeight,
                                rpe: Math.min(6, i + 3), // RPE 4-6 for approach sets
                                notes: "",
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

  const handleAddExerciseClick = (workoutId: string, sectionId: string) => {
    setCurrentAddExerciseContext({ workoutId, sectionId });
    setExerciseModalOpen(true);
  };

  const handleExerciseSelect = (selectedExercise: any) => {
    if (!currentAddExerciseContext) return;

    // Find the section to determine exercise configuration
    const strengthWorkout = strengthWorkouts.find(
      (w) => w.id === currentAddExerciseContext.workoutId
    );
    const runningWorkout = runningWorkouts.find(
      (w) => w.id === currentAddExerciseContext.workoutId
    );
    const workout = strengthWorkout || runningWorkout;

    if (!workout) return;

    const section = workout.sections.find(
      (s) => s.id === currentAddExerciseContext.sectionId
    );

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: selectedExercise.name,
      category: selectedExercise.category,
      muscleGroups: selectedExercise.muscleGroups,
      sets:
        section?.type === "tabata"
          ? []
          : strengthWorkout
          ? generateSetsForProgression("linear")
          : [], // Auto-generate sets for strength exercises
      restTimer: section?.type === "emom" ? "00:00" : "01:30", // EMOM doesn't need rest between sets
      restAfter: section?.type === "tabata" ? "00:00" : "02:00", // TABATA rest is built into the protocol
      notes: "",
      progressionMethod: strengthWorkout ? "linear" : undefined, // Only add progression method for strength exercises
      // Initialize EMOM properties
      emomReps: section?.type === "emom" ? 10 : undefined,
    };

    if (strengthWorkout) {
      setStrengthWorkouts(
        strengthWorkouts.map((workout) =>
          workout.id === currentAddExerciseContext!.workoutId
            ? {
                ...workout,
                sections: workout.sections.map((section) =>
                  section.id === currentAddExerciseContext!.sectionId
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
    } else if (runningWorkout) {
      setRunningWorkouts(
        runningWorkouts.map((workout) =>
          workout.id === currentAddExerciseContext!.workoutId
            ? {
                ...workout,
                sections: workout.sections.map((section) =>
                  section.id === currentAddExerciseContext!.sectionId
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
    }

    setCurrentAddExerciseContext(null);
    setExerciseModalOpen(false);
  };

  const handleNotesClick = (
    type: "exercise" | "set",
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string
  ) => {
    const strengthWorkout = strengthWorkouts.find((w) => w.id === workoutId);
    const runningWorkout = runningWorkouts.find((w) => w.id === workoutId);
    const workout = strengthWorkout || runningWorkout;

    if (!workout) return;

    const section = workout.sections.find((s) => s.id === sectionId);
    const exercise = section?.exercises.find((e) => e.id === exerciseId);

    let currentNotes = "";
    if (type === "exercise") {
      currentNotes = exercise?.notes || "";
    } else if (type === "set" && setId) {
      const set = exercise?.sets.find((s) => s.id === setId);
      currentNotes = set?.notes || "";
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

  const handleNotesSave = (notes: string) => {
    if (!currentNotesContext) return;

    const { type, workoutId, sectionId, exerciseId, setId } =
      currentNotesContext;

    // Update in strength workouts
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
                        exercise.id === exerciseId
                          ? type === "exercise"
                            ? { ...exercise, notes }
                            : {
                                ...exercise,
                                sets: exercise.sets.map((set) =>
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

    // Update in running workouts
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
                        exercise.id === exerciseId
                          ? type === "exercise"
                            ? { ...exercise, notes }
                            : {
                                ...exercise,
                                sets: exercise.sets.map((set) =>
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

    setCurrentNotesContext(null);
  };

  const updateStrengthExerciseSets = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
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
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
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

  const updateStrengthExerciseName = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
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
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
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

  const updateStrengthRestTimer = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
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
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
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
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
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
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.map((exercise) =>
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

  const toggleStrengthWorkoutCollapse = (workoutId: string) => {
    setCollapsedStrengthWorkouts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(workoutId)) {
        newSet.delete(workoutId);
      } else {
        newSet.add(workoutId);
      }
      return newSet;
    });
  };

  const toggleRunningWorkoutCollapse = (workoutId: string) => {
    setCollapsedRunningWorkouts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(workoutId)) {
        newSet.delete(workoutId);
      } else {
        newSet.add(workoutId);
      }
      return newSet;
    });
  };

  const getSectionColors = (type: string) => {
    const colors = {
      warmup: {
        bg: "bg-orange-50/50",
        border: "border-orange-200",
        headerBg: "bg-orange-100",
        headerText: "text-orange-800",
        headerBorder: "border-orange-200",
        icon: "text-orange-600",
      },
      basic: {
        bg: "bg-indigo-50/50",
        border: "border-indigo-200",
        headerBg: "bg-indigo-100",
        headerText: "text-indigo-800",
        headerBorder: "border-indigo-200",
        icon: "text-indigo-600",
      },
      cooldown: {
        bg: "bg-blue-50/50",
        border: "border-blue-200",
        headerBg: "bg-blue-100",
        headerText: "text-blue-800",
        headerBorder: "border-blue-200",
        icon: "text-blue-600",
      },
      emom: {
        bg: "bg-purple-50/50",
        border: "border-purple-200",
        headerBg: "bg-purple-100",
        headerText: "text-purple-800",
        headerBorder: "border-purple-200",
        icon: "text-purple-600",
      },
      tabata: {
        bg: "bg-red-50/50",
        border: "border-red-200",
        headerBg: "bg-red-100",
        headerText: "text-red-800",
        headerBorder: "border-red-200",
        icon: "text-red-600",
      },
    };
    return colors[type as keyof typeof colors] || colors.basic;
  };

  const getSectionIcon = (type: string) => {
    const icons = {
      warmup: Leaf,
      basic: Dumbbell,
      cooldown: Leaf,
      emom: Timer,
      tabata: Target,
    };
    return icons[type as keyof typeof icons] || Dumbbell;
  };

  const removeStrengthExercise = (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => {
    setStrengthWorkouts(
      strengthWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.filter(
                        (exercise) => exercise.id !== exerciseId
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
  ) => {
    setRunningWorkouts(
      runningWorkouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      exercises: section.exercises.filter(
                        (exercise) => exercise.id !== exerciseId
                      ),
                    }
                  : section
              ),
            }
          : workout
      )
    );
  };

  const canSave =
    routineName.trim() &&
    (strengthWorkouts.length > 0 || runningWorkouts.length > 0);

  const renderWorkoutCard = (
    workout: StrengthWorkout | RunningWorkout,
    index: number,
    isStrength: boolean,
    collapsedSet: Set<string>,
    toggleCollapse: (id: string) => void,
    moveWorkout: (id: string, direction: "up" | "down") => void,
    removeWorkout: (id: string) => void,
    updateWorkoutName: (id: string, name: string) => void,
    updateWorkoutObjective: (id: string, objective: string) => void,
    updateWorkoutSchedule: (id: string, field: string, value: string) => void,
    addSection: (id: string) => void,
    removeSection: (workoutId: string, sectionId: string) => void,
    updateSectionName: (
      workoutId: string,
      sectionId: string,
      name: string
    ) => void,
    updateSectionType: (
      workoutId: string,
      sectionId: string,
      type: WorkoutSection["type"]
    ) => void,
    updateSectionRestAfter: (
      workoutId: string,
      sectionId: string,
      restAfter: string
    ) => void,
    updateSectionEmomDuration: (
      workoutId: string,
      sectionId: string,
      duration: number
    ) => void,
    updateExerciseEmomReps: (
      workoutId: string,
      sectionId: string,
      exerciseId: string,
      reps: number
    ) => void,
    updateExerciseSets: (
      workoutId: string,
      sectionId: string,
      exerciseId: string,
      sets: WorkoutSet[]
    ) => void,
    updateExerciseName: (
      workoutId: string,
      sectionId: string,
      exerciseId: string,
      name: string
    ) => void,
    updateRestTimer: (
      workoutId: string,
      sectionId: string,
      exerciseId: string,
      restTimer: string
    ) => void,
    updateExerciseRestAfter: (
      workoutId: string,
      sectionId: string,
      exerciseId: string,
      restAfter: string
    ) => void,
    removeExercise: (
      workoutId: string,
      sectionId: string,
      exerciseId: string
    ) => void,
    totalCount: number
  ) => (
    <Card key={workout.id} className="overflow-hidden">
      {/* Workout Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Workout Order Controls */}
            <div className="flex flex-col space-y-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveWorkout(workout.id, "up")}
                      disabled={index === 0}
                      className="p-1 h-6 w-6"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Move up</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveWorkout(workout.id, "down")}
                      disabled={index === totalCount - 1}
                      className="p-1 h-6 w-6"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Move down</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Workout Order Number */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
              {index + 1}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleCollapse(workout.id)}
              className="p-1"
            >
              {collapsedSet.has(workout.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>

            <div className="flex items-center space-x-3">
              {workout.type === "strength" && (
                <Dumbbell className="h-5 w-5 text-indigo-600" />
              )}
              {workout.type === "running" && (
                <Activity className="h-5 w-5 text-green-600" />
              )}
              {workout.type === "trail-running" && (
                <MapPin className="h-5 w-5 text-orange-600" />
              )}
              {workout.type === "swimming" && (
                <Waves className="h-5 w-5 text-blue-600" />
              )}
              {workout.type === "cycling" && (
                <Bike className="h-5 w-5 text-purple-600" />
              )}

              <div>
                <Input
                  value={workout.name}
                  onChange={(e) =>
                    updateWorkoutName(workout.id, e.target.value)
                  }
                  className="font-medium border-none p-0 h-auto bg-transparent focus:bg-white focus:border-gray-300"
                />
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-gray-500">
                    {calculateWorkoutDuration(workout)}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500 capitalize">
                    {workout.type.replace("-", " ")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {workout.type === "running" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditRunning(workout.id)}
                className="text-green-600 hover:text-green-700"
              >
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeWorkout(workout.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Workout Content */}
      {!collapsedSet.has(workout.id) && (
        <div className="p-4 space-y-4">
          {/* Objective */}
          <div>
            <Label>Objective</Label>
            <Textarea
              value={workout.objective}
              onChange={(e) =>
                updateWorkoutObjective(workout.id, e.target.value)
              }
              placeholder="What is the primary goal of this workout?"
              rows={2}
            />
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Weeks</Label>
              <Input
                value={workout.schedule.weeks}
                onChange={(e) =>
                  updateWorkoutSchedule(workout.id, "weeks", e.target.value)
                }
                placeholder="e.g., Week 1, 3, 5"
              />
            </div>
            <div>
              <Label>Day</Label>
              <Select
                value={workout.schedule.day}
                onValueChange={(value) =>
                  updateWorkoutSchedule(workout.id, "day", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                  <SelectItem value="Saturday">Saturday</SelectItem>
                  <SelectItem value="Sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Time</Label>
              <Input
                value={workout.schedule.time}
                onChange={(e) =>
                  updateWorkoutSchedule(workout.id, "time", e.target.value)
                }
                placeholder="e.g., 9:00 AM"
              />
            </div>
          </div>

          {/* Running Workout Details */}
          {workout.type === "running" &&
            "trailRunningData" in workout &&
            workout.trailRunningData && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-green-900">
                    Running Configuration
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-green-700">
                    <span>{workout.trailRunningData.targetDistance}km</span>
                    <span>•</span>
                    <span>{workout.trailRunningData.estimatedDuration}min</span>
                    <span>•</span>
                    <span>+{workout.trailRunningData.elevationGain}m</span>
                  </div>
                </div>
                <p className="text-sm text-green-700">
                  {workout.trailRunningData.sections.length} training sections
                  configured
                </p>
              </div>
            )}

          {/* Sections for other workout types */}
          {workout.type !== "running" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Sections</h4>
                <Button
                  size="sm"
                  onClick={() => addSection(workout.id)}
                  className="text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Section
                </Button>
              </div>

              {workout.sections.map((section, sectionIndex) => {
                const colors = getSectionColors(section.type);
                const SectionIcon = getSectionIcon(section.type);

                return (
                  <div
                    key={section.id}
                    className={`border rounded-lg ${colors.border} ${colors.bg}`}
                  >
                    {/* Section Header */}
                    <div
                      className={`flex items-center justify-between p-3 border-b ${colors.headerBorder} ${colors.headerBg}`}
                    >
                      <div className="flex items-center space-x-3">
                        <SectionIcon className={`h-4 w-4 ${colors.icon}`} />
                        <Input
                          value={section.name}
                          onChange={(e) =>
                            updateSectionName(
                              workout.id,
                              section.id,
                              e.target.value
                            )
                          }
                          className="border-none p-0 h-auto bg-transparent font-medium"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={section.type}
                          onValueChange={(value: any) =>
                            updateSectionType(workout.id, section.id, value)
                          }
                        >
                          <SelectTrigger className="w-32 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="warmup">Warm-up</SelectItem>
                            <SelectItem value="basic">Basic</SelectItem>
                            <SelectItem value="cooldown">Cool-down</SelectItem>
                            <SelectItem value="emom">EMOM</SelectItem>
                            <SelectItem value="tabata">TABATA</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSection(workout.id, section.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className="p-3 space-y-3">
                      {/* EMOM Duration */}
                      {section.type === "emom" && (
                        <div className="flex items-center space-x-4">
                          <Label className="text-sm font-medium">
                            Duration (minutes):
                          </Label>
                          <Input
                            type="number"
                            value={section.emomDuration || 10}
                            onChange={(e) =>
                              updateSectionEmomDuration(
                                workout.id,
                                section.id,
                                parseInt(e.target.value) || 10
                              )
                            }
                            className="w-20"
                            min="1"
                            max="60"
                          />
                        </div>
                      )}

                      {/* TABATA Info */}
                      {section.type === "tabata" && (
                        <div className="bg-red-100 border border-red-200 rounded p-3">
                          <p className="text-sm text-red-800">
                            TABATA Protocol: 4 minutes total (8 rounds of 20
                            seconds work, 10 seconds rest)
                          </p>
                        </div>
                      )}

                      {/* Exercises */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">
                            Exercises
                          </Label>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleAddExerciseClick(workout.id, section.id)
                            }
                            className="text-sm"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Exercise
                          </Button>
                        </div>

                        {section.exercises.length === 0 ? (
                          <p className="text-sm text-gray-500 py-4 text-center">
                            No exercises added yet
                          </p>
                        ) : (
                          section.exercises.map((exercise, exerciseIndex) => (
                            <div
                              key={exercise.id}
                              className="bg-white rounded border p-3 space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-1">
                                  <Input
                                    value={exercise.name}
                                    onChange={(e) =>
                                      updateExerciseName(
                                        workout.id,
                                        section.id,
                                        exercise.id,
                                        e.target.value
                                      )
                                    }
                                    className="font-medium border-none p-0 h-auto bg-transparent flex-1"
                                  />
                                  {/* Progression Method Badge for Strength Exercises */}
                                  {isStrength && exercise.progressionMethod && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div>
                                            <Badge
                                              variant="outline"
                                              className={`text-xs ${getProgressionMethodColor(
                                                exercise.progressionMethod
                                              )}`}
                                            >
                                              <TrendingUp className="h-3 w-3 mr-1" />
                                              {getProgressionMethodLabel(
                                                exercise.progressionMethod
                                              )}
                                            </Badge>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          {
                                            progressionMethods.find(
                                              (pm) =>
                                                pm.value ===
                                                exercise.progressionMethod
                                            )?.description
                                          }
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            handleNotesClick(
                                              "exercise",
                                              workout.id,
                                              section.id,
                                              exercise.id
                                            )
                                          }
                                          className={
                                            exercise.notes
                                              ? "text-blue-600"
                                              : "text-gray-400"
                                          }
                                        >
                                          <FileText className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        {exercise.notes
                                          ? "Edit notes"
                                          : "Add notes"}
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      removeExercise(
                                        workout.id,
                                        section.id,
                                        exercise.id
                                      )
                                    }
                                    className="text-red-600 hover:text-red-700 p-1"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Progression Method Selection for Strength Exercises */}
                              {isStrength &&
                                section.type !== "tabata" &&
                                section.type !== "emom" && (
                                  <div>
                                    <Label className="text-sm">
                                      Progression Method
                                    </Label>
                                    <Select
                                      value={
                                        exercise.progressionMethod || "linear"
                                      }
                                      onValueChange={(
                                        value: ProgressionMethod
                                      ) =>
                                        updateStrengthExerciseProgressionMethod(
                                          workout.id,
                                          section.id,
                                          exercise.id,
                                          value
                                        )
                                      }
                                    >
                                      <SelectTrigger className="text-sm">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {progressionMethods.map((method) => (
                                          <SelectItem
                                            key={method.value}
                                            value={method.value}
                                          >
                                            <div className="flex flex-col">
                                              <span>{method.label}</span>
                                              <span className="text-xs text-gray-500">
                                                {method.description}
                                              </span>
                                            </div>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                )}

                              {/* EMOM Reps */}
                              {section.type === "emom" && (
                                <div className="flex items-center space-x-4">
                                  <Label className="text-sm">
                                    Target reps per minute:
                                  </Label>
                                  <Input
                                    type="number"
                                    value={exercise.emomReps || 10}
                                    onChange={(e) =>
                                      updateExerciseEmomReps(
                                        workout.id,
                                        section.id,
                                        exercise.id,
                                        parseInt(e.target.value) || 10
                                      )
                                    }
                                    className="w-20"
                                    min="1"
                                    max="50"
                                  />
                                </div>
                              )}

                              {/* Sets Management for non-TABATA/EMOM */}
                              {section.type !== "tabata" &&
                                section.type !== "emom" && (
                                  <div className="space-y-3">
                                    <SetManagement
                                      sets={exercise.sets}
                                      onSetsChange={(sets) =>
                                        updateExerciseSets(
                                          workout.id,
                                          section.id,
                                          exercise.id,
                                          sets
                                        )
                                      }
                                      onNotesClick={(setId) =>
                                        handleNotesClick(
                                          "set",
                                          workout.id,
                                          section.id,
                                          exercise.id,
                                          setId
                                        )
                                      }
                                      progressionMethod={
                                        isStrength
                                          ? exercise.progressionMethod
                                          : undefined
                                      }
                                    />

                                    {/* Add Approach Sets Button - only show for strength exercises with existing sets that have weight and haven't had approach sets added */}
                                    {isStrength &&
                                      exercise.sets.length > 0 &&
                                      !exercise.hasApproachSets &&
                                      exercise.sets[0]?.weight && (
                                        <div className="flex justify-center">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              addApproachSets(
                                                workout.id,
                                                section.id,
                                                exercise.id
                                              )
                                            }
                                            className="text-sm text-gray-600 hover:text-gray-800"
                                          >
                                            <Plus className="h-4 w-4 mr-1" />
                                            Add Approach Sets
                                          </Button>
                                        </div>
                                      )}
                                  </div>
                                )}

                              {/* Rest Timers for non-TABATA */}
                              {section.type !== "tabata" && (
                                <div className="space-y-3">
                                  {section.type === "emom" ? (
                                    <>
                                      {/* EMOM Rest Explanation */}
                                      <div className="bg-purple-50 border border-purple-200 rounded p-3">
                                        <p className="text-sm text-purple-800">
                                          <strong>EMOM Rest:</strong> Rest is
                                          automatic - the remaining time after
                                          completing your reps becomes your rest
                                          period before the next minute starts.
                                        </p>
                                      </div>
                                      {/* Only Rest after exercise for EMOM - only show if NOT the last exercise */}
                                      {exerciseIndex <
                                        section.exercises.length - 1 && (
                                        <div>
                                          <Label className="text-sm">
                                            Rest after exercise
                                          </Label>
                                          <Input
                                            value={exercise.restAfter}
                                            onChange={(e) =>
                                              updateExerciseRestAfter(
                                                workout.id,
                                                section.id,
                                                exercise.id,
                                                e.target.value
                                              )
                                            }
                                            placeholder="02:30"
                                            className="text-sm"
                                          />
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    /* Standard Rest Timers for non-EMOM */
                                    <div
                                      className={`grid gap-4 ${
                                        exerciseIndex <
                                        section.exercises.length - 1
                                          ? "grid-cols-2"
                                          : "grid-cols-1"
                                      }`}
                                    >
                                      <div>
                                        <Label className="text-sm">
                                          Rest between sets
                                        </Label>
                                        <Input
                                          value={exercise.restTimer}
                                          onChange={(e) =>
                                            updateRestTimer(
                                              workout.id,
                                              section.id,
                                              exercise.id,
                                              e.target.value
                                            )
                                          }
                                          placeholder="02:00"
                                          className="text-sm"
                                        />
                                      </div>
                                      {/* Only show rest after exercise if NOT the last exercise */}
                                      {exerciseIndex <
                                        section.exercises.length - 1 && (
                                        <div>
                                          <Label className="text-sm">
                                            Rest after exercise
                                          </Label>
                                          <Input
                                            value={exercise.restAfter}
                                            onChange={(e) =>
                                              updateExerciseRestAfter(
                                                workout.id,
                                                section.id,
                                                exercise.id,
                                                e.target.value
                                              )
                                            }
                                            placeholder="02:30"
                                            className="text-sm"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>

                      {/* Section Rest - only show if NOT the last section */}
                      {sectionIndex < workout.sections.length - 1 && (
                        <div>
                          <Label className="text-sm">Rest after section</Label>
                          <Input
                            value={section.restAfter}
                            onChange={(e) =>
                              updateSectionRestAfter(
                                workout.id,
                                section.id,
                                e.target.value
                              )
                            }
                            placeholder="03:00"
                            className="text-sm w-32"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/routines")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Routines</span>
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900">
              {mode === "create" ? "Create Routine" : "Edit Routine"}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => router.push("/routines")}>
              Cancel
            </Button>
            <Button
              onClick={() => router.push("/routines")}
              disabled={!canSave}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>
                {mode === "create" ? "Create Routine" : "Save Changes"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Routine Details */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="name">Routine Name</Label>
                <Input
                  id="name"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                  placeholder="e.g., Full Body Split"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (weeks)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 weeks</SelectItem>
                    <SelectItem value="6">6 weeks</SelectItem>
                    <SelectItem value="8">8 weeks</SelectItem>
                    <SelectItem value="12">12 weeks</SelectItem>
                    <SelectItem value="16">16 weeks</SelectItem>
                  </SelectContent>
                </Select>
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
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your routine..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="objectives">Training Objectives</Label>
              <Textarea
                id="objectives"
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
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
              onClick={handleAddStrengthWorkout}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Dumbbell className="h-4 w-4 mr-2" />
              Add Strength Workout
            </Button>
          </div>

          {strengthWorkouts.map((workout, index) =>
            renderWorkoutCard(
              workout,
              index,
              true,
              collapsedStrengthWorkouts,
              toggleStrengthWorkoutCollapse,
              moveStrengthWorkout,
              removeStrengthWorkout,
              updateStrengthWorkoutName,
              updateStrengthWorkoutObjective,
              updateStrengthWorkoutScheduleWrapper,
              addStrengthSection,
              removeStrengthSection,
              updateStrengthSectionName,
              updateStrengthSectionType,
              updateStrengthSectionRestAfter,
              updateStrengthSectionEmomDuration,
              updateStrengthExerciseEmomReps,
              updateStrengthExerciseSets,
              updateStrengthExerciseName,
              updateStrengthRestTimer,
              updateStrengthExerciseRestAfter,
              removeStrengthExercise,
              strengthWorkouts.length
            )
          )}

          {strengthWorkouts.length === 0 && (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Dumbbell className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-gray-500 mb-4">
                    No strength workouts added yet
                  </p>
                  <Button
                    onClick={handleAddStrengthWorkout}
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
        <div className="space-y-4">
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

          {runningWorkouts.map((workout, index) =>
            renderWorkoutCard(
              workout,
              index,
              false,
              collapsedRunningWorkouts,
              toggleRunningWorkoutCollapse,
              moveRunningWorkout,
              removeRunningWorkout,
              updateRunningWorkoutName,
              updateRunningWorkoutObjective,
              updateRunningWorkoutScheduleWrapper,
              addRunningSection,
              removeRunningSection,
              updateRunningSectionName,
              updateRunningSectionType,
              updateRunningSectionRestAfter,
              updateRunningSectionEmomDuration,
              updateRunningExerciseEmomReps,
              updateRunningExerciseSets,
              updateRunningExerciseName,
              updateRunningRestTimer,
              updateRunningExerciseRestAfter,
              removeRunningExercise,
              runningWorkouts.length
            )
          )}

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
        initialNotes={currentNotesContext?.currentNotes || ""}
      />
    </div>
  );
}
