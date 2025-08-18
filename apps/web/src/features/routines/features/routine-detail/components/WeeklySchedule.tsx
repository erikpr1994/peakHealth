'use client';

import { Card } from '@/components/ui/card';
import { StrengthWorkout, RunningWorkout } from '@/features/routines/types';

interface WeeklyScheduleProps {
  schedule: boolean[];
  strengthWorkouts: StrengthWorkout[];
  runningWorkouts: RunningWorkout[];
}

const WeeklySchedule = ({
  schedule,
  strengthWorkouts,
  runningWorkouts,
}: WeeklyScheduleProps): React.ReactElement => {
  const dayLabels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const dayNames = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const getWorkoutsForDay = (
    dayIndex: number
  ): Array<{ name: string; time: string; type: 'strength' | 'running' }> => {
    const dayName = dayNames[dayIndex];
    const workouts: Array<{
      name: string;
      time: string;
      type: 'strength' | 'running';
    }> = [];

    // Check strength workouts
    strengthWorkouts.forEach(workout => {
      if (workout.schedule.selectedDays.includes(dayName)) {
        workouts.push({
          name: workout.name,
          time: workout.schedule.time || 'No time set',
          type: 'strength',
        });
      }
    });

    // Check running workouts
    runningWorkouts.forEach(workout => {
      if (workout.schedule.selectedDays.includes(dayName)) {
        workouts.push({
          name: workout.name,
          time: workout.schedule.time || 'No time set',
          type: 'running',
        });
      }
    });

    return workouts;
  };

  const formatTime = (time: string): string => {
    if (!time || time === 'No time set') return '';

    // Handle different time formats
    if (time.includes(':')) {
      // Already in HH:MM format
      return time;
    }

    // Try to parse as 24-hour format
    try {
      const [hours, minutes] = time.split(':').map(Number);
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        return time;
      }
    } catch {
      // If parsing fails, return as is
    }

    return time;
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Weekly Schedule
      </h2>
      <div className="grid grid-cols-7 gap-3">
        {schedule.map((isActive, index) => {
          const dayWorkouts = getWorkoutsForDay(index);

          return (
            <div
              key={index}
              className={`min-h-24 rounded-lg flex flex-col items-center justify-center p-3 ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              <div className="text-sm font-medium mb-2 text-center leading-tight">
                {dayLabels[index]}
              </div>
              {isActive && dayWorkouts.length > 0 ? (
                <div className="text-center space-y-2 w-full">
                  {dayWorkouts.map((workout, workoutIndex) => (
                    <div key={workoutIndex} className="text-sm">
                      <div
                        className="font-medium truncate px-1"
                        title={workout.name}
                      >
                        {workout.name}
                      </div>
                      {workout.time && workout.time !== 'No time set' && (
                        <div className="text-xs opacity-75 mt-1">
                          {formatTime(workout.time)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : isActive ? (
                <div className="text-sm mt-1 whitespace-nowrap">Workout</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default WeeklySchedule;
