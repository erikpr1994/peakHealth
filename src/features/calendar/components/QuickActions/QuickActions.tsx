import { Plus, Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import styles from "./QuickActions.module.css";

export const QuickActions = () => {
  const router = useRouter();

  return (
    <Card className={styles.container}>
      <h3 className={styles.title}>Quick Actions</h3>
      <div className={styles.actions}>
        <Button
          variant="outline"
          className={styles.actionButton}
          onClick={() => router.push("/routines/create")}
        >
          <Plus className={styles.actionIcon} />
          Schedule Workout
        </Button>
        <Button
          variant="outline"
          className={styles.actionButton}
          onClick={() => router.push("/routines")}
        >
          <CalendarIcon className={styles.actionIcon} />
          View Routines
        </Button>
        <Button
          variant="outline"
          className={styles.actionButton}
          onClick={() => router.push("/statistics")}
        >
          <TrendingUp className={styles.actionIcon} />
          View Progress
        </Button>
      </div>
    </Card>
  );
};
