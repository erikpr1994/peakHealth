'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoutineDetailHeader from './components/RoutineDetailHeader';
import RoutineOverviewCards from './components/RoutineOverviewCards';
import RoutineProgress from './components/RoutineProgress';
import WeeklySchedule from './components/WeeklySchedule';
import RoutineObjectives from './components/RoutineObjectives';
import DetailedWorkoutsList from './components/DetailedWorkoutsList';
import {
  RoutineData,
  WorkoutDay,
  StrengthWorkout,
  RunningWorkout,
} from '@/features/routines/types';
import { routineService } from '../../services/routineService';
import { transformDatabaseRoutineToRoutineData } from '../../utils/dataTransformers';

interface RoutineDetailProps {
  routineId: string;
}

const RoutineDetail = ({
  routineId,
}: RoutineDetailProps): React.ReactElement => {
  // Calculate weekly schedule from workout days
  const calculateWeeklySchedule = (workoutDays: WorkoutDay[]): boolean[] => {
    const schedule = new Array(7).fill(false);
    const dayMap = {
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6,
    };

    // Use the actual selected days from each workout's schedule
    workoutDays.forEach(workoutDay => {
      if (workoutDay.schedule?.selectedDays) {
        workoutDay.schedule.selectedDays.forEach(day => {
          const dayIndex = dayMap[day.toLowerCase() as keyof typeof dayMap];
          if (dayIndex !== undefined) {
            schedule[dayIndex] = true;
          }
        });
      }
    });

    return schedule;
  };
  const router = useRouter();
  const [routineData, setRoutineData] = useState<
    | (RoutineData & {
        strengthWorkouts: StrengthWorkout[];
        runningWorkouts: RunningWorkout[];
      })
    | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const fetchRoutine = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await routineService.getRoutineById(routineId);

        // Use safe transformation function
        const transformedData = transformDatabaseRoutineToRoutineData(data);

        setRoutineData(transformedData);
      } catch (err) {
        // Error handling without console.log
        setError(
          err instanceof Error ? err.message : 'Failed to fetch routine'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoutine();
  }, [routineId]);

  const handleToggleFavorite = async (): Promise<void> => {
    try {
      await routineService.toggleRoutineFavorite(routineId);
      // Refresh the routine data
      const data = await routineService.getRoutineById(routineId);
      setRoutineData(prev =>
        prev ? { ...prev, isFavorite: data.routine.isFavorite } : null
      );
    } catch {
      // Error handling without console.log
    }
  };

  const handleDuplicate = (): void => {
    // TODO: Implement duplicate functionality
    // Debug logging removed for production
  };

  const handleDelete = async (): Promise<void> => {
    if (
      window.confirm(
        'Are you sure you want to delete this routine? This action cannot be undone.'
      )
    ) {
      try {
        await routineService.deleteRoutine(routineId);
        router.push('/routines');
      } catch {
        // Error handling without console.log
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading routine...</div>
      </div>
    );
  }

  if (error || !routineData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">
            Error: {error || 'Routine not found'}
          </div>
          <p className="text-gray-600 mb-4">
            The routine you're looking for doesn't exist or you don't have
            permission to access it.
          </p>
          <button
            onClick={() => router.push('/routines')}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Back to Routines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <RoutineDetailHeader
        routineId={routineId}
        name={routineData.name}
        description={routineData.description}
        isActive={routineData.isActive}
        isFavorite={routineData.isFavorite}
        onToggleFavorite={handleToggleFavorite}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />

      <RoutineOverviewCards
        duration={routineData.duration}
        daysPerWeek={
          calculateWeeklySchedule(routineData.workoutDays).filter(day => day)
            .length
        }
        difficulty={routineData.difficulty}
      />

      {/* Training Objectives & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RoutineObjectives objectives={routineData.objectives || []} />

        <RoutineProgress
          currentWeek={routineData.progress.currentWeek}
          totalWeeks={routineData.progress.totalWeeks}
          completedWorkouts={routineData.progress.completedWorkouts}
          totalWorkouts={routineData.progress.totalWorkouts}
          isActive={routineData.isActive}
        />
      </div>

      {/* Weekly Schedule - Full Width */}
      <div className="mb-8">
        <WeeklySchedule
          schedule={calculateWeeklySchedule(routineData.workoutDays)}
          strengthWorkouts={routineData.strengthWorkouts}
          runningWorkouts={routineData.runningWorkouts}
        />
      </div>

      {/* Detailed Workouts */}
      <DetailedWorkoutsList
        strengthWorkouts={routineData.strengthWorkouts}
        runningWorkouts={routineData.runningWorkouts}
        routineId={routineId}
      />
    </div>
  );
};

export default RoutineDetail;
