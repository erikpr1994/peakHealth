'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoutineDetailHeader from './components/RoutineDetailHeader';
import RoutineOverviewCards from './components/RoutineOverviewCards';
import RoutineProgress from './components/RoutineProgress';
import WeeklySchedule from './components/WeeklySchedule';
import RoutineInfo from './components/RoutineInfo';
import WorkoutDaysList from './components/WorkoutDaysList';
import { RoutineData, WorkoutDay } from '@/features/routines/types';
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

    // For now, we'll calculate based on the number of workout days
    // In a real implementation, this would use the actual workout day schedules
    workoutDays.forEach((_, index) => {
      if (index < 7) {
        schedule[index] = true;
      }
    });

    return schedule;
  };
  const router = useRouter();
  const [routineData, setRoutineData] = useState<RoutineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutine = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await routineService.getRoutineById(routineId);

        // Use safe transformation function
        const transformedData = transformDatabaseRoutineToRoutineData(data);

        // Debug logging removed for production

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
        prev ? { ...prev, isFavorite: data.routine.is_favorite } : null
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
      />

      <RoutineOverviewCards
        duration={routineData.duration}
        daysPerWeek={
          calculateWeeklySchedule(routineData.workoutDays).filter(day => day)
            .length
        }
        goal={routineData.goal}
        difficulty={routineData.difficulty}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Progress & Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {routineData.isActive ? (
            <RoutineProgress
              currentWeek={routineData.progress.currentWeek}
              totalWeeks={routineData.progress.totalWeeks}
              completedWorkouts={routineData.progress.completedWorkouts}
              totalWorkouts={routineData.progress.totalWorkouts}
            />
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Progress
              </h2>
              <p className="text-gray-600">
                This routine is not currently active. Progress tracking will be
                available once you activate the routine.
              </p>
            </div>
          )}

          <WeeklySchedule
            schedule={calculateWeeklySchedule(routineData.workoutDays)}
          />
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
