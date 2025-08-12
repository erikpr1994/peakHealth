'use client';

import RoutineDetailHeader from './components/RoutineDetailHeader';
import RoutineOverviewCards from './components/RoutineOverviewCards';
import RoutineProgress from './components/RoutineProgress';
import WeeklySchedule from './components/WeeklySchedule';
import RoutineInfo from './components/RoutineInfo';
import WorkoutDaysList from './components/WorkoutDaysList';

interface RoutineDetailProps {
  routineId: string;
}

const RoutineDetail = ({
  routineId,
}: RoutineDetailProps): React.ReactElement => {
  // Mock data for demonstration
  const routineData = {
    id: routineId,
    name: 'Full Body Split',
    description: 'A comprehensive full-body workout routine',
    difficulty: 'Intermediate' as const,
    estimatedTime: '45-60 minutes',
    muscleGroups: ['Full Body'],
    isActive: true,
    isFavorite: false,
    duration: 8,
    daysPerWeek: 3,
    goal: 'Hypertrophy',
    progress: {
      currentWeek: 4,
      totalWeeks: 8,
      completedWorkouts: 9,
      totalWorkouts: 24,
    },
    schedule: [true, false, true, false, true, false, false], // M W F
    createdDate: 'June 15, 2024',
    lastModified: 'July 10, 2024',
    workoutDays: [
      {
        id: 'day-1',
        name: 'Push Day',
        exercises: [
          {
            id: '550e8400-e29b-41d4-a716-446655440001', // Bench Press
            variantId: '660e8400-e29b-41d4-a716-446655440001', // Bench Press variant
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
            id: '550e8400-e29b-41d4-a716-446655440004', // Deadlift
            variantId: '660e8400-e29b-41d4-a716-446655440011', // Conventional Deadlift variant
            name: 'Bent-Over Barbell Row',
            muscleGroups: ['Back', 'Biceps'],
            sets: [
              { reps: '8', weight: '115 lbs', restTime: '90s' },
              { reps: '8', weight: '115 lbs', restTime: '90s' },
              { reps: '8', weight: '115 lbs', restTime: '90s' },
            ],
          },
        ],
        estimatedTime: '30-35 minutes',
        difficulty: 'Intermediate' as const,
      },
      {
        id: 'day-2',
        name: 'Pull Day',
        exercises: [
          {
            id: '550e8400-e29b-41d4-a716-446655440002', // Squats
            variantId: '660e8400-e29b-41d4-a716-446655440005', // Squat variant
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
            id: '550e8400-e29b-41d4-a716-446655440004', // Deadlift
            variantId: '660e8400-e29b-41d4-a716-446655440012', // Romanian Deadlift variant
            name: 'Romanian Deadlift',
            muscleGroups: ['Hamstrings', 'Glutes', 'Back'],
            sets: [
              { reps: '8', weight: '135 lbs', restTime: '90s' },
              { reps: '8', weight: '135 lbs', restTime: '90s' },
              { reps: '8', weight: '135 lbs', restTime: '90s' },
            ],
          },
        ],
        estimatedTime: '30-35 minutes',
        difficulty: 'Intermediate' as const,
      },
    ],
  };

  const handleToggleFavorite = (): void => {
    // TODO: Implement favorite toggle
  };

  const handleDuplicate = (): void => {
    // TODO: Implement duplicate functionality
  };

  const handleDelete = (): void => {
    // TODO: Implement delete functionality
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
