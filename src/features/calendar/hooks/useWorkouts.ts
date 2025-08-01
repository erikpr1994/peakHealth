import { useMemo } from "react";

import { mockWorkouts } from "../data/mockWorkouts";
import { generateCalendarDays } from "../utils/calendarUtils";
import {
  calculateCalendarStats,
  getUpcomingWorkouts,
  groupWorkoutsByDay,
} from "../utils/workoutUtils";

export const useWorkouts = (currentDate: Date, selectedDate: Date) => {
  const today = useMemo(() => new Date(2025, 6, 22), []); // July 22, 2025

  const workouts = useMemo(() => mockWorkouts, []);

  const calendarDays = useMemo(
    () => generateCalendarDays(currentDate, workouts, selectedDate, today),
    [currentDate, selectedDate, workouts, today]
  );

  const upcomingWorkouts = useMemo(
    () => getUpcomingWorkouts(workouts, today),
    [workouts, today]
  );

  const groupedUpcoming = useMemo(
    () => groupWorkoutsByDay(upcomingWorkouts),
    [upcomingWorkouts]
  );

  const stats = useMemo(
    () => calculateCalendarStats(workouts, today),
    [workouts, today]
  );

  return {
    workouts,
    calendarDays,
    upcomingWorkouts,
    groupedUpcoming,
    stats,
    today,
  };
};
