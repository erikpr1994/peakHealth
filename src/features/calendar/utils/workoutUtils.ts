import { workoutTypes } from "../config/workoutTypes";
import {
  CalendarStats,
  StatusConfig,
  TimeOfDayConfig,
  WorkoutEvent,
  WorkoutTypeConfig,
} from "../types";

export const convertTo24Hour = (time: string): string => {
  const [timePart, period] = time.split(" ");
  const [hours, minutes] = timePart.split(":");
  let hour = parseInt(hours);

  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, "0")}:${minutes}`;
};

export const getUpcomingWorkouts = (workouts: WorkoutEvent[], today: Date) => {
  return workouts
    .filter(w => w.status === "scheduled" && w.date >= today)
    .sort((a, b) => {
      // First sort by date, then by time
      if (a.date.getTime() !== b.date.getTime()) {
        return a.date.getTime() - b.date.getTime();
      }
      // Convert time to 24-hour format for comparison
      const timeA = convertTo24Hour(a.time);
      const timeB = convertTo24Hour(b.time);
      return timeA.localeCompare(timeB);
    })
    .slice(0, 8); // Show more to accommodate multiple daily sessions
};

export const groupWorkoutsByDay = (workoutList: WorkoutEvent[]) => {
  const grouped = workoutList.reduce(
    (acc, workout) => {
      const dateKey = workout.date.toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(workout);
      return acc;
    },
    {} as Record<string, WorkoutEvent[]>
  );

  // Sort workouts within each day by time
  Object.keys(grouped).forEach(dateKey => {
    grouped[dateKey].sort((a, b) => {
      const timeA = convertTo24Hour(a.time);
      const timeB = convertTo24Hour(b.time);
      return timeA.localeCompare(timeB);
    });
  });

  return grouped;
};

export const getTimeOfDay = (time: string): TimeOfDayConfig => {
  const hour24 = parseInt(convertTo24Hour(time).split(":")[0]);

  if (hour24 >= 5 && hour24 < 12) {
    return {
      period: "Morning",
      color: "text-amber-700",
      bgColor: "bg-amber-50 border-amber-200",
    };
  } else if (hour24 >= 12 && hour24 < 17) {
    return {
      period: "Afternoon",
      color: "text-blue-700",
      bgColor: "bg-blue-50 border-blue-200",
    };
  } else {
    return {
      period: "Evening",
      color: "text-purple-700",
      bgColor: "bg-purple-50 border-purple-200",
    };
  }
};

export const getWorkoutTypeConfig = (
  type: WorkoutEvent["type"]
): WorkoutTypeConfig => {
  return workoutTypes.find(wt => wt.name === type) || workoutTypes[0];
};

export const getStatusConfig = (
  status: WorkoutEvent["status"]
): StatusConfig => {
  switch (status) {
    case "completed":
      return {
        color: "bg-green-500",
        text: "Completed",
        textColor: "text-green-700",
      };
    case "scheduled":
      return {
        color: "bg-blue-500",
        text: "Scheduled",
        textColor: "text-blue-700",
      };
    case "missed":
      return {
        color: "bg-red-500",
        text: "Missed",
        textColor: "text-red-700",
      };
    case "active":
      return {
        color: "bg-yellow-500",
        text: "In Progress",
        textColor: "text-yellow-700",
      };
    default:
      return {
        color: "bg-gray-500",
        text: "Unknown",
        textColor: "text-gray-700",
      };
  }
};

export const calculateCalendarStats = (
  workouts: WorkoutEvent[],
  today: Date
): CalendarStats => {
  const completedThisMonth = workouts.filter(
    w =>
      w.status === "completed" &&
      w.date.getMonth() === today.getMonth() &&
      w.date.getFullYear() === today.getFullYear()
  ).length;

  const scheduledThisMonth = workouts.filter(
    w =>
      w.date.getMonth() === today.getMonth() &&
      w.date.getFullYear() === today.getFullYear()
  ).length;

  const totalCaloriesBurned = workouts
    .filter(w => w.status === "completed" && w.actualCalories)
    .reduce((sum, w) => sum + (w.actualCalories || 0), 0);

  // Calculate days with multiple sessions this month
  const daysWithMultipleSessions = Object.values(
    workouts
      .filter(
        w =>
          w.date.getMonth() === today.getMonth() &&
          w.date.getFullYear() === today.getFullYear()
      )
      .reduce(
        (acc, workout) => {
          const dateKey = workout.date.toDateString();
          if (!acc[dateKey]) {
            acc[dateKey] = 0;
          }
          acc[dateKey]++;
          return acc;
        },
        {} as Record<string, number>
      )
  ).filter(count => count > 1).length;

  // Calculate average workout duration
  const completedWorkouts = workouts.filter(w => w.status === "completed");
  const totalMinutes = completedWorkouts.reduce((sum, w) => {
    const minutes = parseInt(w.duration.split(" ")[0]);
    return sum + minutes;
  }, 0);
  const avgDuration =
    completedWorkouts.length > 0
      ? Math.round(totalMinutes / completedWorkouts.length)
      : 0;

  return {
    completedThisMonth,
    scheduledThisMonth,
    totalCaloriesBurned,
    avgDuration,
    daysWithMultipleSessions,
  };
};
