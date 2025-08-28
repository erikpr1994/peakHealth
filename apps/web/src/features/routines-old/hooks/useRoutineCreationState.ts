import { useState } from 'react';
import { TrailRunningWorkoutData } from '../types';

/**
 * Hook to manage all state for routine creation
 * Extracted from RoutineCreation component to reduce complexity
 */
export const useRoutineCreationState = (): {
  // Routine metadata state
  name: string;
  difficulty: string;
  goal: string;
  description: string;
  objectives: string[];
  duration: number;
  setName: (name: string) => void;
  setDifficulty: (difficulty: string) => void;
  setGoal: (goal: string) => void;
  setDescription: (description: string) => void;
  setObjectives: (objectives: string[]) => void;
  setDuration: (duration: number) => void;

  // Running workout states
  creatingRunning: boolean;
  editingRunning: {
    workoutId: string;
    data: TrailRunningWorkoutData;
  } | null;
  setCreatingRunning: (creating: boolean) => void;
  setEditingRunning: (
    editing: {
      workoutId: string;
      data: TrailRunningWorkoutData;
    } | null
  ) => void;

  // Collapse states
  collapsedStrengthWorkouts: Set<string>;
  collapsedRunningWorkouts: Set<string>;
  setCollapsedStrengthWorkouts: (collapsed: Set<string>) => void;
  setCollapsedRunningWorkouts: (collapsed: Set<string>) => void;

  // Handlers
  toggleStrengthWorkoutCollapse: (workoutId: string) => void;
  toggleRunningWorkoutCollapse: (workoutId: string) => void;
  handleAddRunningWorkout: () => void;
  handleRunningCancel: () => void;
  handleEditRunning: (
    workoutId: string,
    runningWorkouts: Array<{
      id: string;
      trailRunningData?: TrailRunningWorkoutData;
    }>
  ) => void;

  // State management
  resetState: () => void;
  loadStateForEditing: (routineData: {
    name: string;
    difficulty: string;
    goal: string;
    description: string;
    objectives?: string[];
    duration?: number;
  }) => void;
} => {
  // Routine metadata state
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [goal, setGoal] = useState('Strength');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState<string[]>([]);
  const [duration, setDuration] = useState(12); // Default 12 weeks (3 months)

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

  const handleRunningCancel = (): void => {
    setCreatingRunning(false);
    setEditingRunning(null);
  };

  const handleEditRunning = (
    workoutId: string,
    runningWorkouts: Array<{
      id: string;
      trailRunningData?: TrailRunningWorkoutData;
    }>
  ): void => {
    const workout = runningWorkouts.find(w => w.id === workoutId);
    if (workout?.trailRunningData) {
      setEditingRunning({
        workoutId,
        data: workout.trailRunningData,
      });
    }
  };

  // Reset state for new routine creation
  const resetState = (): void => {
    setName('');
    setDifficulty('Beginner');
    setGoal('Strength');
    setDescription('');
    setObjectives([]);
    setDuration(12);
    setCreatingRunning(false);
    setEditingRunning(null);
    setCollapsedStrengthWorkouts(new Set());
    setCollapsedRunningWorkouts(new Set());
  };

  // Load state for editing existing routine
  const loadStateForEditing = (routineData: {
    name: string;
    difficulty: string;
    goal: string;
    description: string;
    objectives?: string[];
    duration?: number;
  }): void => {
    setName(routineData.name);
    setDifficulty(routineData.difficulty);
    setGoal(routineData.goal);
    setDescription(routineData.description);
    setObjectives(routineData.objectives || []);
    setDuration(routineData.duration || 12);
  };

  return {
    // Routine metadata state
    name,
    difficulty,
    goal,
    description,
    objectives,
    duration,
    setName,
    setDifficulty,
    setGoal,
    setDescription,
    setObjectives,
    setDuration,

    // Running workout states
    creatingRunning,
    editingRunning,
    setCreatingRunning,
    setEditingRunning,

    // Collapse states
    collapsedStrengthWorkouts,
    collapsedRunningWorkouts,
    setCollapsedStrengthWorkouts,
    setCollapsedRunningWorkouts,

    // Handlers
    toggleStrengthWorkoutCollapse,
    toggleRunningWorkoutCollapse,
    handleAddRunningWorkout,
    handleRunningCancel,
    handleEditRunning,

    // State management
    resetState,
    loadStateForEditing,
  };
};
