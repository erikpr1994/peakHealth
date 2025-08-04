import { CalendarDay as CalendarDayType } from '../../types';
import {
  getStatusConfig,
  getWorkoutTypeConfig,
} from '../../utils/workoutUtils';

import styles from './CalendarDay.module.css';

interface CalendarDayProps {
  day: CalendarDayType;
  onSelect: (day: CalendarDayType) => void;
}

export const CalendarDay = ({ day, onSelect }: CalendarDayProps) => {
  const handleClick = () => {
    onSelect(day);
  };

  return (
    <div
      className={`${styles.day} ${
        day.isCurrentMonth ? styles.currentMonth : styles.otherMonth
      } ${day.isToday ? styles.today : ''} ${
        day.isSelected ? styles.selected : ''
      }`}
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
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
              {day.workouts.map(workout => {
                const typeConfig = getWorkoutTypeConfig(workout.type);
                const statusConfig = getStatusConfig(workout.status);
                return (
                  <div
                    key={workout.id}
                    className={`${styles.indicator} ${
                      workout.status === 'completed'
                        ? styles[statusConfig.color]
                        : styles[typeConfig.color]
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
                  {day.workouts.slice(0, 4).map(workout => {
                    const typeConfig = getWorkoutTypeConfig(workout.type);
                    const statusConfig = getStatusConfig(workout.status);
                    return (
                      <div
                        key={workout.id}
                        className={`${styles.smallIndicator} ${
                          workout.status === 'completed'
                            ? styles[statusConfig.color]
                            : styles[typeConfig.color]
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
