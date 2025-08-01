import { Clock, Edit, Play, Target, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { WorkoutEvent } from "../../types";
import { isSameDay } from "../../utils/calendarUtils";
import { getTimeOfDay, getWorkoutTypeConfig } from "../../utils/workoutUtils";

import styles from "./WorkoutEventCard.module.css";

interface WorkoutEventCardProps {
  workout: WorkoutEvent;
  today: Date;
  onEdit?: (workout: WorkoutEvent) => void;
  onDelete?: (workout: WorkoutEvent) => void;
}

export const WorkoutEventCard = ({
  workout,
  today,
  onEdit,
  onDelete,
}: WorkoutEventCardProps) => {
  const router = useRouter();
  const typeConfig = getWorkoutTypeConfig(workout.type);
  const timeOfDay = getTimeOfDay(workout.time);
  const isToday = isSameDay(workout.date, today);

  const handleStartWorkout = () => {
    router.push("/workout-tracker");
  };

  const handleEdit = () => {
    onEdit?.(workout);
  };

  const handleDelete = () => {
    onDelete?.(workout);
  };

  return (
    <div
      className={`${styles.card} ${isToday ? styles.today : styles.default}`}
    >
      <div className={styles.header}>
        <div className={styles.content}>
          <div className={styles.titleSection}>
            <h5 className={styles.title}>{workout.name}</h5>
            <Badge
              variant="outline"
              className={`${styles.timeBadge} ${timeOfDay.color} ${timeOfDay.bgColor}`}
            >
              {timeOfDay.period}
            </Badge>
          </div>
          <div className={styles.badges}>
            <Badge
              variant="secondary"
              className={`${styles.typeBadge} ${typeConfig.bgColor} ${typeConfig.textColor}`}
            >
              {workout.type}
            </Badge>
            <Badge variant="outline" className={styles.difficultyBadge}>
              {workout.difficulty}
            </Badge>
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className={styles.actionButton}
          >
            <Edit className={styles.actionIcon} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className={styles.actionButton}
          >
            <Trash className={styles.deleteIcon} />
          </Button>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <Clock className={styles.detailIcon} />
          <span className={styles.detailText}>
            {workout.time} • {workout.duration}
          </span>
        </div>
        <div className={styles.detailItem}>
          <Target className={styles.detailIcon} />
          <span className={styles.detailText}>
            {workout.exercises} exercises
          </span>
        </div>
      </div>

      {workout.estimatedCalories && (
        <div className={styles.calories}>
          Estimated: ~{workout.estimatedCalories} calories
        </div>
      )}

      {isToday && (
        <Button
          className={styles.startButton}
          size="sm"
          onClick={handleStartWorkout}
        >
          <Play className={styles.startIcon} />
          Start {timeOfDay.period} Workout
        </Button>
      )}
    </div>
  );
};
