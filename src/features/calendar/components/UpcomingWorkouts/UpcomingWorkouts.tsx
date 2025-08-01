import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkoutEvent } from "../../types";
import { formatDate } from "../../utils/calendarUtils";
import { WorkoutEventCard } from "../WorkoutEventCard";
import styles from "./UpcomingWorkouts.module.css";

interface UpcomingWorkoutsProps {
  groupedUpcoming: Record<string, WorkoutEvent[]>;
  today: Date;
  onEditWorkout?: (workout: WorkoutEvent) => void;
  onDeleteWorkout?: (workout: WorkoutEvent) => void;
}

export const UpcomingWorkouts = ({
  groupedUpcoming,
  today,
  onEditWorkout,
  onDeleteWorkout,
}: UpcomingWorkoutsProps) => {
  const router = useRouter();

  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Upcoming Workouts</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/routines")}
          className={styles.viewAllButton}
        >
          View All
        </Button>
      </div>

      <div className={styles.content}>
        {Object.entries(groupedUpcoming).map(([dateKey, dayWorkouts]) => (
          <div key={dateKey} className={styles.dayGroup}>
            {/* Day Header */}
            <div className={styles.dayHeader}>
              <h4 className={styles.dayTitle}>
                {formatDate(dayWorkouts[0].date)}
              </h4>
              {dayWorkouts.length > 1 && (
                <Badge variant="outline" className={styles.sessionBadge}>
                  {dayWorkouts.length} sessions
                </Badge>
              )}
            </div>

            {/* Workouts for this day */}
            <div className={styles.workoutsList}>
              {dayWorkouts.map(workout => (
                <WorkoutEventCard
                  key={workout.id}
                  workout={workout}
                  today={today}
                  onEdit={onEditWorkout}
                  onDelete={onDeleteWorkout}
                />
              ))}
            </div>
          </div>
        ))}

        {Object.keys(groupedUpcoming).length === 0 && (
          <div className={styles.emptyState}>
            <CalendarIcon className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>No upcoming workouts</p>
            <p className={styles.emptyDescription}>
              Schedule your next session
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
