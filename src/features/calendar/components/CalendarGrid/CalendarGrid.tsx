import { CalendarDay as CalendarDayType } from "../../types";
import { dayHeaders } from "../../config/workoutTypes";
import { CalendarDay } from "../CalendarDay";
import { WorkoutTypeLegend } from "../WorkoutTypeLegend";
import styles from "./CalendarGrid.module.css";

interface CalendarGridProps {
  calendarDays: CalendarDayType[];
  onDaySelect: (date: number) => void;
}

export const CalendarGrid = ({ calendarDays, onDaySelect }: CalendarGridProps) => {
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
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            onSelect={onDaySelect}
          />
        ))}
      </div>
    </div>
  );
}; 