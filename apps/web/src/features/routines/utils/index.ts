import { Leaf, Dumbbell, Timer, Target } from 'lucide-react';
import { ProgressionMethod } from '../types';

export const getDifficultyColor = (difficulty: string): string => {
  const colors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700',
  };
  return colors[difficulty as keyof typeof colors] || colors.Intermediate;
};

export const getGoalColor = (goal: string): string => {
  const colors = {
    Strength: 'bg-blue-100 text-blue-700',
    Hypertrophy: 'bg-purple-100 text-purple-700',
    Endurance: 'bg-green-100 text-green-700',
    'Weight Loss': 'bg-orange-100 text-orange-700',
  };
  return colors[goal as keyof typeof colors] || colors.Strength;
};

export const getSectionColors = (type: string): Record<string, string> => {
  const colors = {
    warmup: {
      bg: 'bg-orange-50/50',
      border: 'border-orange-200',
      headerBg: 'bg-orange-100',
      headerText: 'text-orange-800',
      headerBorder: 'border-orange-200',
      icon: 'text-orange-600',
    },
    basic: {
      bg: 'bg-indigo-50/50',
      border: 'border-indigo-200',
      headerBg: 'bg-indigo-100',
      headerText: 'text-indigo-800',
      headerBorder: 'border-indigo-200',
      icon: 'text-indigo-600',
    },
    cooldown: {
      bg: 'bg-blue-50/50',
      border: 'border-blue-200',
      headerBg: 'bg-blue-100',
      headerText: 'text-blue-800',
      headerBorder: 'border-blue-200',
      icon: 'text-blue-600',
    },
    emom: {
      bg: 'bg-purple-50/50',
      border: 'border-purple-200',
      headerBg: 'bg-purple-100',
      headerText: 'text-purple-800',
      headerBorder: 'border-purple-200',
      icon: 'text-purple-600',
    },
    tabata: {
      bg: 'bg-red-50/50',
      border: 'border-red-200',
      headerBg: 'bg-red-100',
      headerText: 'text-red-800',
      headerBorder: 'border-red-200',
      icon: 'text-red-600',
    },
  };
  return colors[type as keyof typeof colors] || colors.basic;
};

export const progressionMethods = [
  {
    value: 'linear',
    label: 'Linear Progression',
    description: 'Increase weight consistently each session',
  },
  {
    value: 'dual',
    label: 'Dual Progression',
    description: 'Progress reps first, then weight',
  },
  {
    value: 'inverse-pyramid',
    label: 'Inverse Pyramid',
    description: 'Start heavy, decrease weight and increase reps',
  },
  {
    value: 'myo-reps',
    label: 'Myo-Reps',
    description: 'Activation set followed by mini-sets to failure',
  },
  {
    value: 'widowmaker',
    label: 'Widowmaker',
    description: 'Warmup set + 20-rep failure set',
  },
  {
    value: 'amrap',
    label: 'AMRAP',
    description: 'Regular sets + final AMRAP set',
  },
];

export const getProgressionMethodLabel = (
  method: ProgressionMethod
): string => {
  return progressionMethods.find(pm => pm.value === method)?.label || method;
};

export const getProgressionMethodColor = (
  method: ProgressionMethod
): string => {
  const colors = {
    linear: 'bg-green-100 text-green-800 border-green-200',
    dual: 'bg-blue-100 text-blue-800 border-blue-200',
    'inverse-pyramid': 'bg-purple-100 text-purple-800 border-purple-200',
    'myo-reps': 'bg-orange-100 text-orange-800 border-orange-200',
    widowmaker: 'bg-red-100 text-red-800 border-red-200',
    amrap: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };
  return colors[method] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getProgressionMethodDescription = (
  method: ProgressionMethod
): string => {
  return progressionMethods.find(pm => pm.value === method)?.description || '';
};

export const getObjectiveIcon = (index: number): string => {
  const icons = ['Target', 'Trophy', 'Zap', 'Dumbbell'];
  return icons[index % icons.length];
};

export const getIconColor = (color: string): string => {
  const colors = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export const getSectionIcon = (
  type: string
): React.ComponentType<{ className?: string }> => {
  const icons = {
    warmup: Leaf,
    basic: Dumbbell,
    cooldown: Leaf,
    emom: Timer,
    tabata: Target,
  };
  return icons[type as keyof typeof icons] || Dumbbell;
};
