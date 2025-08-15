import { useState } from 'react';

interface RoutineDetails {
  name: string;
  difficulty: string;
  goal: string;
  description: string;
  objectives: string[];
  duration: number;
}

export const useRoutineDetails = (
  initialData?: Partial<RoutineDetails>
): {
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
  updateRoutineDetails: (updates: Partial<RoutineDetails>) => void;
  resetRoutineDetails: () => void;
  getRoutineDetails: () => RoutineDetails;
} => {
  const [name, setName] = useState(initialData?.name || '');
  const [difficulty, setDifficulty] = useState(
    initialData?.difficulty || 'Beginner'
  );
  const [goal, setGoal] = useState(initialData?.goal || 'Strength');
  const [description, setDescription] = useState(
    initialData?.description || ''
  );
  const [objectives, setObjectives] = useState<string[]>(
    initialData?.objectives || []
  );
  const [duration, setDuration] = useState(initialData?.duration || 12);

  const updateRoutineDetails = (updates: Partial<RoutineDetails>): void => {
    if (updates.name !== undefined) setName(updates.name);
    if (updates.difficulty !== undefined) setDifficulty(updates.difficulty);
    if (updates.goal !== undefined) setGoal(updates.goal);
    if (updates.description !== undefined) setDescription(updates.description);
    if (updates.objectives !== undefined) setObjectives(updates.objectives);
    if (updates.duration !== undefined) setDuration(updates.duration);
  };

  const resetRoutineDetails = (): void => {
    setName('');
    setDifficulty('Beginner');
    setGoal('Strength');
    setDescription('');
    setObjectives([]);
    setDuration(12);
  };

  return {
    // State
    name,
    difficulty,
    goal,
    description,
    objectives,
    duration,

    // Setters
    setName,
    setDifficulty,
    setGoal,
    setDescription,
    setObjectives,
    setDuration,

    // Utilities
    updateRoutineDetails,
    resetRoutineDetails,

    // Get all details as an object
    getRoutineDetails: (): RoutineDetails => ({
      name,
      difficulty,
      goal,
      description,
      objectives,
      duration,
    }),
  };
};
