'use client';

import RoutineDetailHeader from './components/RoutineDetailHeader';
import RoutineOverviewCards from './components/RoutineOverviewCards';
import RoutineProgress from './components/RoutineProgress';
import WeeklySchedule from './components/WeeklySchedule';
import RoutineInfo from './components/RoutineInfo';
import WorkoutDaysList from './components/WorkoutDaysList';
import { RoutineData } from '@/features/routines/types';

interface RoutineDetailProps {
  routineId: string;
}

const RoutineDetail = ({
  routineId,
}: RoutineDetailProps): React.ReactElement => {
  // Mock data - in a real app, this would come from an API based on routineId
  const routineData: RoutineData = {
    id: routineId,
    name: 'Full Body Split',
    description:
      'A comprehensive full-body workout targeting all major muscle groups with compound movements. Perfect for intermediate lifters looking to build strength and muscle mass.',
    duration: 8,
    daysPerWeek: 3,
    difficulty: 'Intermediate',
    goal: 'Hypertrophy',
    isActive: true,
    isFavorite: false,
    progress: {
      currentWeek: 4,
      totalWeeks: 8,
      completedWorkouts: 9,
      totalWorkouts: 24,
    },
    schedule: [true, false, true, false, true, false, false], // M W F
    workoutDays: [
      {
        id: 'workout-a',
        name: 'Workout A - Upper Focus',
        estimatedTime: '45-60 min',
        difficulty: 'Intermediate',
        exercises: [
          {
            id: 'bench-press',
            name: 'Barbell Bench Press',
            muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
            sets: [
              { reps: '10', weight: 'Warm-up', restTime: '60s' },
              { reps: '8', weight: '135 lbs', restTime: '90s' },
              { reps: '6', weight: '155 lbs', restTime: '90s' },
              { reps: '6', weight: '155 lbs', restTime: '90s' },
            ],
          },
          {
            id: 'bent-over-row',
            name: 'Bent-Over Barbell Row',
            muscleGroups: ['Back', 'Biceps'],
            sets: [
              { reps: '8', weight: '115 lbs', restTime: '90s' },
              { reps: '8', weight: '125 lbs', restTime: '90s' },
              { reps: '6', weight: '135 lbs', restTime: '90s' },
            ],
          },
          {
            id: 'shoulder-press',
            name: 'Overhead Press',
            muscleGroups: ['Shoulders', 'Triceps'],
            sets: [
              { reps: '8', weight: '85 lbs', restTime: '90s' },
              { reps: '6', weight: '95 lbs', restTime: '90s' },
              { reps: '6', weight: '95 lbs', restTime: '90s' },
            ],
          },
          {
            id: 'pull-ups',
            name: 'Pull-ups',
            muscleGroups: ['Back', 'Biceps'],
            sets: [
              { reps: '8', weight: 'Bodyweight', restTime: '90s' },
              { reps: '6', weight: 'Bodyweight', restTime: '90s' },
              { reps: '5', weight: 'Bodyweight', restTime: '90s' },
            ],
          },
        ],
      },
      {
        id: 'workout-b',
        name: 'Workout B - Lower Focus',
        estimatedTime: '50-65 min',
        difficulty: 'Intermediate',
        exercises: [
          {
            id: 'squats',
            name: 'Barbell Back Squat',
            muscleGroups: ['Quadriceps', 'Glutes', 'Core'],
            sets: [
              { reps: '10', weight: 'Warm-up', restTime: '60s' },
              { reps: '8', weight: '155 lbs', restTime: '2 min' },
              { reps: '6', weight: '185 lbs', restTime: '2 min' },
              { reps: '6', weight: '185 lbs', restTime: '2 min' },
            ],
          },
          {
            id: 'deadlift',
            name: 'Romanian Deadlift',
            muscleGroups: ['Hamstrings', 'Glutes', 'Back'],
            sets: [
              { reps: '8', weight: '135 lbs', restTime: '90s' },
              { reps: '6', weight: '155 lbs', restTime: '90s' },
              { reps: '6', weight: '165 lbs', restTime: '90s' },
            ],
          },
        ],
      },
    ],
    createdDate: 'June 15, 2024',
    lastModified: 'July 10, 2024',
  };

  const handleToggleFavorite = (): void => {
    // TODO: Implement favorite toggle
    console.log('Toggle favorite');
  };

  const handleShare = (): void => {
    // TODO: Implement share functionality
    console.log('Share routine');
  };

  const handleDuplicate = (): void => {
    // TODO: Implement duplicate functionality
    console.log('Duplicate routine');
  };

  const handleDelete = (): void => {
    // TODO: Implement delete functionality
    console.log('Delete routine');
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <RoutineDetailHeader
        routineId={routineId}
        name={routineData.name}
        description={routineData.description}
        isActive={routineData.isActive}
        isFavorite={routineData.isFavorite}
        onToggleFavorite={handleToggleFavorite}
        onShare={handleShare}
      />

      <RoutineOverviewCards
        duration={routineData.duration}
        daysPerWeek={routineData.daysPerWeek}
        goal={routineData.goal}
        difficulty={routineData.difficulty}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Progress & Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <RoutineProgress
            currentWeek={routineData.progress.currentWeek}
            totalWeeks={routineData.progress.totalWeeks}
            completedWorkouts={routineData.progress.completedWorkouts}
            totalWorkouts={routineData.progress.totalWorkouts}
          />

          <WeeklySchedule schedule={routineData.schedule} />
        </div>

        {/* Routine Info */}
        <RoutineInfo
          difficulty={routineData.difficulty}
          createdDate={routineData.createdDate}
          lastModified={routineData.lastModified}
          onDuplicate={handleDuplicate}
          onShare={handleShare}
          onDelete={handleDelete}
        />
      </div>

      <WorkoutDaysList
        workoutDays={routineData.workoutDays}
        routineId={routineId}
      />
    </div>
  );
};

export default RoutineDetail;
