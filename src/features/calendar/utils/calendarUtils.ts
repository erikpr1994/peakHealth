import { CalendarDay, WorkoutEvent } from "../types";

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const generateCalendarDays = (
  currentDate: Date,
  workouts: WorkoutEvent[],
  selectedDate: Date,
  today: Date
): CalendarDay[] => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const days: CalendarDay[] = [];

  // Add previous month's trailing days
  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = prevMonth.getDate() - i;
    const workoutDate = new Date(currentYear, currentMonth - 1, date);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      workouts: workouts.filter(w => isSameDay(w.date, workoutDate)),
    });
  }

  // Add current month's days
  for (let date = 1; date <= daysInMonth; date++) {
    const workoutDate = new Date(currentYear, currentMonth, date);
    const isToday = isSameDay(workoutDate, today);
    const isSelected = isSameDay(workoutDate, selectedDate);

    days.push({
      date,
      isCurrentMonth: true,
      isToday,
      isSelected,
      workouts: workouts.filter(w => isSameDay(w.date, workoutDate)),
    });
  }

  // Add next month's leading days
  const remainingDays = 42 - days.length; // 6 weeks × 7 days
  for (let date = 1; date <= remainingDays; date++) {
    const workoutDate = new Date(currentYear, currentMonth + 1, date);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      workouts: workouts.filter(w => isSameDay(w.date, workoutDate)),
    });
  }

  return days;
};

export const formatDate = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (isSameDay(date, today)) {
    return "Today";
  } else if (isSameDay(date, tomorrow)) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  }
};
