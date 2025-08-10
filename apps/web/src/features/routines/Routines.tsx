'use client';

import { Routine } from './types';
import RoutinesList from './components/RoutinesList';

const Routines = (): React.ReactElement => {
  const routines: Routine[] = [
    {
      id: 'full-body-split',
      name: 'Full Body Split',
      description:
        'A comprehensive full-body workout targeting all major muscle groups with compound movements. Perfect for intermediate lifters looking to build strength and muscle mass.',
      daysPerWeek: 3,
      difficulty: 'Intermediate',
      goal: 'Hypertrophy',
      isActive: true,
      isFavorite: false,
      schedule: [true, false, true, false, true, false, false], // M W F
      progress: { current: 4, total: 8 },
      objectives: [
        'Increase muscle mass by 15%',
        'Boost strength by 25%',
        '4-5 workouts per week',
        'Improve cardiovascular health',
      ],
      totalWorkouts: 24,
      completedWorkouts: 9,
      estimatedDuration: '55 min',
    },
    {
      id: 'upper-lower-split',
      name: 'Upper/Lower Split',
      description:
        'Split routine focusing on upper body and lower body on alternating days for maximum recovery.',
      daysPerWeek: 4,
      difficulty: 'Advanced',
      goal: 'Strength',
      isActive: false,
      isFavorite: false,
      schedule: [true, true, false, true, true, false, false], // M T Th F
      progress: { current: 0, total: 8 },
      lastUsed: '2 weeks ago',
    },
    {
      id: 'push-pull-legs',
      name: 'Push/Pull/Legs',
      description:
        'Three-day split targeting push movements, pull movements, and leg exercises for balanced development.',
      daysPerWeek: 3,
      difficulty: 'Intermediate',
      goal: 'Hypertrophy',
      isActive: false,
      isFavorite: true,
      schedule: [true, false, true, false, true, false, false], // M W F
      progress: { current: 2, total: 6 },
      lastUsed: '1 week ago',
      objectives: [
        'Build muscle mass',
        'Improve strength',
        '3 workouts per week',
      ],
      totalWorkouts: 18,
      completedWorkouts: 6,
      estimatedDuration: '60 min',
    },
    {
      id: 'strength-focus',
      name: 'Strength Focus',
      description:
        'Heavy compound movements with longer rest periods designed to build maximum strength.',
      daysPerWeek: 3,
      difficulty: 'Advanced',
      goal: 'Strength',
      isActive: false,
      isFavorite: false,
      schedule: [true, false, true, false, true, false, false], // M W F
      progress: { current: 0, total: 12 },
      lastUsed: '3 weeks ago',
      objectives: [
        'Increase 1RM on major lifts',
        'Improve power output',
        '3 workouts per week',
      ],
      totalWorkouts: 36,
      completedWorkouts: 0,
      estimatedDuration: '75 min',
    },
    {
      id: 'cardio-hiit',
      name: 'Cardio HIIT',
      description:
        'High-intensity interval training focused on cardiovascular fitness and fat burning.',
      daysPerWeek: 4,
      difficulty: 'Intermediate',
      goal: 'Weight Loss',
      isActive: false,
      isFavorite: false,
      schedule: [true, true, false, true, true, false, false], // M T Th F
      progress: { current: 0, total: 4 },
      lastUsed: '1 month ago',
      objectives: [
        'Improve cardiovascular fitness',
        'Burn fat',
        '4 workouts per week',
      ],
      totalWorkouts: 16,
      completedWorkouts: 0,
      estimatedDuration: '30 min',
    },
    {
      id: 'beginner-full-body',
      name: 'Beginner Full Body',
      description:
        'Simple, effective full-body routine perfect for those new to strength training.',
      daysPerWeek: 3,
      difficulty: 'Beginner',
      goal: 'Strength',
      isActive: false,
      isFavorite: false,
      schedule: [true, false, true, false, true, false, false], // M W F
      progress: { current: 0, total: 8 },
      lastUsed: '2 months ago',
      objectives: [
        'Learn proper form',
        'Build basic strength',
        '3 workouts per week',
      ],
      totalWorkouts: 24,
      completedWorkouts: 0,
      estimatedDuration: '45 min',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <RoutinesList routines={routines} />
    </div>
  );
};

export default Routines;
