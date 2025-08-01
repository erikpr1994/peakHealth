"use client";

import { Card } from "@/components/ui/card";

import styles from "./Calendar.module.css";
import { CalendarGrid } from "./components/CalendarGrid";
import { CalendarNavigation } from "./components/CalendarNavigation";
import { CalendarStats } from "./components/CalendarStats";
import { QuickActions } from "./components/QuickActions";
import { UpcomingWorkouts } from "./components/UpcomingWorkouts";
import { WorkoutTypeLegend } from "./components/WorkoutTypeLegend";
import { useCalendar } from "./hooks/useCalendar";
import { useWorkouts } from "./hooks/useWorkouts";
import { WorkoutEvent } from "./types";

export default function Calendar() {
  const {
    currentDate,
    selectedDate,
    viewMode,
    setSelectedDate,
    setViewMode,
    navigateMonth,
    navigateToToday,
  } = useCalendar();

  const { calendarDays, groupedUpcoming, stats, today } = useWorkouts(
    currentDate,
    selectedDate
  );

  const handleDaySelect = (date: number) => {
    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );
    setSelectedDate(newSelectedDate);
  };

  const handleEditWorkout = (workout: WorkoutEvent) => {
    // TODO: Implement edit functionality
    // eslint-disable-next-line no-console
    console.log("Edit workout:", workout);
  };

  const handleDeleteWorkout = (workout: WorkoutEvent) => {
    // TODO: Implement delete functionality
    // eslint-disable-next-line no-console
    console.log("Delete workout:", workout);
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
}
