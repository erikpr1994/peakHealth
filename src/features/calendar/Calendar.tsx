"use client";

import { Card } from "@/components/ui/card";
import { useCalendar } from "./hooks/useCalendar";
import { useWorkouts } from "./hooks/useWorkouts";
import { CalendarNavigation } from "./components/CalendarNavigation";
import { CalendarGrid } from "./components/CalendarGrid";
import { CalendarStats } from "./components/CalendarStats";
import { UpcomingWorkouts } from "./components/UpcomingWorkouts";
import { QuickActions } from "./components/QuickActions";
import { WorkoutTypeLegend } from "./components/WorkoutTypeLegend";
import { WorkoutEvent } from "./types";
import styles from "./Calendar.module.css";

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
    console.log("Edit workout:", workout);
  };

  const handleDeleteWorkout = (workout: WorkoutEvent) => {
    // TODO: Implement delete functionality
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
