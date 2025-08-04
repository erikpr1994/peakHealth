import { dayHeaders } from '../../config/workoutTypes';
import { CalendarDay as CalendarDayType } from '../../types';
import { CalendarDay } from '../CalendarDay';

import styles from './CalendarGrid.module.css';

interface CalendarGridProps {
  calendarDays: CalendarDayType[];
  onDaySelect: (day: CalendarDayType) => void;
}

export const CalendarGrid = ({
  calendarDays,
  onDaySelect,
}: CalendarGridProps) => {
  return (
    <div className={styles.grid}>
      {/* Day Headers */}
      <div className={styles.dayHeaders}>
        {dayHeaders.map(day => (
          <div key={day} className={styles.dayHeader}>
            <span className={styles.dayHeaderText}>{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className={styles.calendarDays}>
        {calendarDays.map((day, index) => {
          const uniqueKey = `${day.date}-${day.isCurrentMonth}-${day.isToday}-${day.isSelected}-${day.workouts.length}-${index}`;
          return (
            <CalendarDay key={uniqueKey} day={day} onSelect={onDaySelect} />
          );
        })}
      </div>
    </div>
  );
};
