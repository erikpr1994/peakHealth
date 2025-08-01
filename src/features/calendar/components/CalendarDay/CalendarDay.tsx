import { CalendarDay as CalendarDayType } from "../../types";
import { getWorkoutTypeConfig, getStatusConfig } from "../../utils/workoutUtils";
import styles from "./CalendarDay.module.css";

interface CalendarDayProps {
  day: CalendarDayType;
  onSelect: (date: number) => void;
}

export const CalendarDay = ({ day, onSelect }: CalendarDayProps) => {
  const handleClick = () => {
    onSelect(day.date);
  };

  return (
    <div
      className={`${styles.day} ${
        day.isCurrentMonth ? styles.currentMonth : styles.otherMonth
      } ${day.isToday ? styles.today : ""} ${
        day.isSelected ? styles.selected : ""
      }`}
      onClick={handleClick}
    >
      <span
        className={`${styles.dateNumber} ${
          day.isToday
            ? styles.todayText
            : day.isCurrentMonth
              ? styles.currentMonthText
              : styles.otherMonthText
        }`}
      >
        {day.date}
      </span>

      {/* Workout indicators */}
      {day.workouts.length > 0 && (
        <div className={styles.workoutIndicators}>
          {day.workouts.length === 1 ? (
            // Single workout - show as before
            <div className={styles.singleWorkout}>
              {day.workouts.map((workout, i) => {
                const typeConfig = getWorkoutTypeConfig(workout.type);
                const statusConfig = getStatusConfig(workout.status);
                return (
                  <div
                    key={i}
                    className={`${styles.indicator} ${
                      workout.status === "completed"
                        ? statusConfig.color
                        : typeConfig.color
                    }`}
                    title={`${workout.name} at ${workout.time} - ${workout.status}`}
                  />
                );
              })}
            </div>
          ) : (
            // Multiple workouts - show count and time indicators
            <div className={styles.multipleWorkouts}>
              <div className={styles.indicatorRow}>
                <div className={styles.indicators}>
                  {day.workouts.slice(0, 4).map((workout, i) => {
                    const typeConfig = getWorkoutTypeConfig(workout.type);
                    const statusConfig = getStatusConfig(workout.status);
                    return (
                      <div
                        key={i}
                        className={`${styles.smallIndicator} ${
                          workout.status === "completed"
                            ? statusConfig.color
                            : typeConfig.color
                        }`}
                        title={`${workout.name} at ${workout.time} - ${workout.status}`}
                      />
                    );
                  })}
                  {day.workouts.length > 4 && (
                    <span className={styles.moreIndicator}>
                      +{day.workouts.length - 4}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.sessionCount}>
                {day.workouts.length} sessions
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 