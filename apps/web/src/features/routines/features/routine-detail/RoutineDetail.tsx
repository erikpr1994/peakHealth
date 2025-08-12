'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoutineDetailHeader from './components/RoutineDetailHeader';
import RoutineOverviewCards from './components/RoutineOverviewCards';
import RoutineProgress from './components/RoutineProgress';
import WeeklySchedule from './components/WeeklySchedule';
import RoutineInfo from './components/RoutineInfo';
import WorkoutDaysList from './components/WorkoutDaysList';
import { RoutineData } from '@/features/routines/types';
import { routineService } from '../../services/routineService';
import {
  DatabaseWorkout,
  DatabaseSection,
  DatabaseExercise,
  DatabaseSet,
} from '../../types/database';

interface RoutineDetailProps {
  routineId: string;
}

const RoutineDetail = ({
  routineId,
}: RoutineDetailProps): React.ReactElement => {
  const router = useRouter();
  const [routineData, setRoutineData] = useState<RoutineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutine = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await routineService.getRoutineById(routineId);

        // Calculate weekly schedule from workout configs
        const calculateWeeklySchedule = (
          workouts: DatabaseWorkout[]
        ): boolean[] => {
          const schedule = new Array(7).fill(false);

          workouts?.forEach((workout: DatabaseWorkout) => {
            if (workout.schedule?.selectedDays) {
              workout.schedule.selectedDays.forEach((day: string) => {
                const dayIndex = [
                  'monday',
                  'tuesday',
                  'wednesday',
                  'thursday',
                  'friday',
                  'saturday',
                  'sunday',
                ].indexOf(day.toLowerCase());
                if (dayIndex !== -1) {
                  schedule[dayIndex] = true;
                }
              });
            }
          });

          return schedule;
        };

        // Calculate estimated duration
        const _totalWorkouts = data.workouts?.length || 0;
        const estimatedDuration =
          data.workouts?.reduce((total: number, workout: DatabaseWorkout) => {
            return (
              total +
              (workout.sections?.reduce(
                (sectionTotal: number, section: DatabaseSection) => {
                  return (
                    sectionTotal +
                    (section.exercises?.reduce(
                      (exerciseTotal: number, exercise: DatabaseExercise) => {
                        return exerciseTotal + (exercise.sets?.length || 0) * 2; // Rough estimate: 2 minutes per set
                      },
                      0
                    ) || 0)
                  );
                },
                0
              ) || 0)
            );
          }, 0) || 0;

        // Calculate workouts per week based on schedule
        const calculateWorkoutsPerWeek = (workouts: unknown[]): number => {
          const uniqueDays = new Set<string>();
          workouts?.forEach((workout: unknown) => {
            const workoutData = workout as {
              schedule?: { selectedDays?: string[] };
            };
            if (workoutData.schedule?.selectedDays) {
              workoutData.schedule.selectedDays.forEach((day: string) => {
                uniqueDays.add(day.toLowerCase());
              });
            }
          });
          return uniqueDays.size;
        };

        const workoutsPerWeek = calculateWorkoutsPerWeek(data.workouts);

        // Transform the database data to match our frontend types
        const transformedData: RoutineData = {
          id: data.routine.id,
          name: data.routine.name,
          description: data.routine.description,
          duration: data.routine.duration || 12, // Use actual duration from database
          daysPerWeek: data.routine.days_per_week || 3,
          difficulty: data.routine.difficulty,
          goal: data.routine.goal,
          isActive: data.routine.is_active,
          isFavorite: data.routine.is_favorite,
          progress: {
            currentWeek:
              Math.floor(
                (data.routine.completed_workouts || 0) / workoutsPerWeek
              ) + 1,
            totalWeeks: data.routine.duration || 12,
            completedWorkouts: data.routine.completed_workouts || 0,
            totalWorkouts: workoutsPerWeek,
          },
          schedule: calculateWeeklySchedule(data.workouts),
          workoutDays:
            data.workouts?.map((workout: DatabaseWorkout) => ({
              id: workout.id,
              name: workout.name,
              estimatedTime: `${Math.max(30, Math.min(estimatedDuration, 90))} min`,
              difficulty: data.routine.difficulty,
              exercises:
                workout.sections?.flatMap(
                  (section: DatabaseSection) =>
                    section.exercises?.map((exercise: DatabaseExercise) => ({
                      id: exercise.id,
                      name: exercise.name,
                      muscleGroups: exercise.muscle_groups || [],
                      exerciseId: exercise.exerciseLibraryId || '', // Link to exercise library
                      variantId: exercise.exerciseLibraryId || '', // For now, treat as variant ID
                      sets:
                        exercise.sets?.map((set: DatabaseSet) => ({
                          reps: set.reps?.toString() || '',
                          weight: set.weight?.toString() || '',
                          duration: set.duration?.toString() || '',
                          restTime: set.rest_time || '90s',
                        })) || [],
                      notes: exercise.notes || '',
                    })) || []
                ) || [],
            })) || [],
          createdDate: ((): string => {
            try {
              if (data.routine.created_at) {
                const date = new Date(data.routine.created_at);
                if (!isNaN(date.getTime())) {
                  return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                }
              }
              return 'Unknown';
            } catch (error) {
              console.error(
                'Error parsing createdAt date:',
                data.routine.created_at,
                error
              );
              return 'Unknown';
            }
          })(),
          lastModified: ((): string => {
            try {
              if (data.routine.updated_at) {
                const date = new Date(data.routine.updated_at);
                if (!isNaN(date.getTime())) {
                  return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                }
              }
              return 'Unknown';
            } catch (error) {
              console.error(
                'Error parsing updatedAt date:',
                data.routine.updated_at,
                error
              );
              return 'Unknown';
            }
          })(),
        };

        // Debug logging
        console.log('Routine data from database:', {
          createdAt: data.routine.created_at,
          updatedAt: data.routine.updated_at,
          workouts: data.workouts?.length,
          workoutsPerWeek,
          completed_workouts: data.routine.completed_workouts,
        });

        setRoutineData(transformedData);
      } catch (err) {
        console.error('Error fetching routine:', err);
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
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleDuplicate = (): void => {
    // TODO: Implement duplicate functionality
    console.log('Duplicate routine');
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
      } catch (error) {
        console.error('Error deleting routine:', error);
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
        daysPerWeek={routineData.daysPerWeek}
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
