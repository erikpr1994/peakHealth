'use client';

import styles from './Calendar.module.css';
import { CalendarGrid } from './components/CalendarGrid';
import { CalendarNavigation } from './components/CalendarNavigation';
import { CalendarStats } from './components/CalendarStats';
import { QuickActions } from './components/QuickActions';
import { UpcomingWorkouts } from './components/UpcomingWorkouts';
import { WorkoutTypeLegend } from './components/WorkoutTypeLegend';
import { useCalendar } from './hooks/useCalendar';
import { useWorkouts } from './hooks/useWorkouts';
import { WorkoutEvent, CalendarDay as CalendarDayType } from './types';

import { Card } from '@/components/ui/card';

const Calendar = () => {
  const {
    currentDate,
    selectedDate,
    viewMode,
    setCurrentDate,
    setSelectedDate,
    setViewMode,
    navigateMonth,
    navigateToToday,
  } = useCalendar();

  const { calendarDays, groupedUpcoming, stats, today } = useWorkouts(
    currentDate,
    selectedDate
  );

  /**
   * Handles day selection in the calendar grid.
   * Fixes the bug where clicking on days from adjacent months would incorrectly
   * set the date to the current month. Now correctly identifies and handles
   * days from previous/next months and navigates to the appropriate month.
   */
  const handleDaySelect = (day: CalendarDayType) => {
    // Create the selected date using the day's actual date
    let newSelectedDate: Date;

    if (day.isCurrentMonth) {
      // Day is from current month
      newSelectedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day.date
      );
    } else {
      // Day is from adjacent month - need to determine which one
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Check if this is likely from previous or next month
      // Days with high numbers (>20) at the beginning are from previous month
      // Days with low numbers (<15) at the end are from next month
      const dayIndex = calendarDays.findIndex(
        d => d.date === day.date && d.isCurrentMonth === day.isCurrentMonth
      );

      if (dayIndex < 7 && day.date > 20) {
        // Previous month
        newSelectedDate = new Date(currentYear, currentMonth - 1, day.date);
        // Also navigate to that month
        const newCurrentDate = new Date(currentDate);
        newCurrentDate.setMonth(newCurrentDate.getMonth() - 1);
        setCurrentDate(newCurrentDate);
      } else if (dayIndex >= 35 && day.date < 15) {
        // Next month
        newSelectedDate = new Date(currentYear, currentMonth + 1, day.date);
        // Also navigate to that month
        const newCurrentDate = new Date(currentDate);
        newCurrentDate.setMonth(newCurrentDate.getMonth() + 1);
        setCurrentDate(newCurrentDate);
      } else {
        // Fallback - assume current month
        newSelectedDate = new Date(currentYear, currentMonth, day.date);
      }
    }

    setSelectedDate(newSelectedDate);
  };

  const handleEditWorkout = (workout: WorkoutEvent) => {
    // TODO: Implement edit functionality
    // eslint-disable-next-line no-console
    console.log('Edit workout:', workout);
  };

  const handleDeleteWorkout = (workout: WorkoutEvent) => {
    // TODO: Implement delete functionality
    // eslint-disable-next-line no-console
    console.log('Delete workout:', workout);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Calendar</h1>
        <p className={styles.subtitle}>View and manage your workout schedule</p>
      </div>

      {/* Stats Cards */}
      <CalendarStats stats={stats} />

      <div className={styles.mainContent}>
        {/* Calendar */}
        <div className={styles.calendarSection}>
          <Card className={styles.calendarCard}>
            <CalendarNavigation
              currentDate={currentDate}
              viewMode={viewMode}
              onNavigateMonth={navigateMonth}
              onNavigateToToday={navigateToToday}
              onViewModeChange={setViewMode}
            />

            <WorkoutTypeLegend />

            <CalendarGrid
              calendarDays={calendarDays}
              onDaySelect={handleDaySelect}
            />
          </Card>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <UpcomingWorkouts
            groupedUpcoming={groupedUpcoming}
            today={today}
            onEditWorkout={handleEditWorkout}
            onDeleteWorkout={handleDeleteWorkout}
          />

          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
