import { useMemo } from "react";
import { WorkoutEvent, CalendarStats } from "../types";
import { mockWorkouts } from "../data/mockWorkouts";
import { 
  getUpcomingWorkouts, 
  groupWorkoutsByDay, 
  calculateCalendarStats 
} from "../utils/workoutUtils";
import { generateCalendarDays } from "../utils/calendarUtils";

export const useWorkouts = (currentDate: Date, selectedDate: Date) => {
  const today = new Date(2025, 6, 22); // July 22, 2025

  const workouts = useMemo(() => mockWorkouts, []);

  const calendarDays = useMemo(() => 
    generateCalendarDays(currentDate, workouts, selectedDate, today), 
    [currentDate, selectedDate, workouts]
  );

  const upcomingWorkouts = useMemo(() => 
    getUpcomingWorkouts(workouts, today), 
    [workouts]
  );

  const groupedUpcoming = useMemo(() => 
    groupWorkoutsByDay(upcomingWorkouts), 
    [upcomingWorkouts]
  );

  const stats = useMemo(() => 
    calculateCalendarStats(workouts, today), 
    [workouts]
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