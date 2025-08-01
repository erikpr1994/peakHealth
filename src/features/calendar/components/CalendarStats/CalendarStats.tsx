import { Target, TrendingUp, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CalendarStats as CalendarStatsType } from "../../types";
import styles from "./CalendarStats.module.css";

interface CalendarStatsProps {
  stats: CalendarStatsType;
}

export const CalendarStats = ({ stats }: CalendarStatsProps) => {
  return (
    <div className={styles.statsGrid}>
      <Card className={styles.statCard}>
        <div className={styles.statContent}>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>This Month</p>
            <p className={styles.statValue}>
              {stats.completedThisMonth}/{stats.scheduledThisMonth}
            </p>
            <p className={styles.statDescription}>Workouts completed</p>
          </div>
          <div className={styles.statIcon}>
            <Target className={styles.icon} />
          </div>
        </div>
      </Card>

      <Card className={styles.statCard}>
        <div className={styles.statContent}>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Calories</p>
            <p className={styles.statValue}>
              {stats.totalCaloriesBurned.toLocaleString()}
            </p>
            <p className={styles.statDescription}>Burned this month</p>
          </div>
          <div className={styles.statIcon}>
            <TrendingUp className={styles.icon} />
          </div>
        </div>
      </Card>

      <Card className={styles.statCard}>
        <div className={styles.statContent}>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Avg Duration</p>
            <p className={styles.statValue}>{stats.avgDuration}m</p>
            <p className={styles.statDescription}>Per workout</p>
          </div>
          <div className={styles.statIcon}>
            <Clock className={styles.icon} />
          </div>
        </div>
      </Card>

      <Card className={styles.statCard}>
        <div className={styles.statContent}>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Double Days</p>
            <p className={styles.statValue}>{stats.daysWithMultipleSessions}</p>
            <p className={styles.statDescription}>Multiple sessions</p>
          </div>
          <div className={styles.statIcon}>
            <Users className={styles.icon} />
          </div>
        </div>
      </Card>
    </div>
  );
}; 