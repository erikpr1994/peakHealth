import { workoutTypes } from "../../config/workoutTypes";

import styles from "./WorkoutTypeLegend.module.css";

export const WorkoutTypeLegend = () => {
  return (
    <div className={styles.legend}>
      <span className={styles.label}>Legend:</span>
      {workoutTypes.map(type => (
        <div key={type.name} className={styles.legendItem}>
          <div className={`${styles.indicator} ${type.color}`} />
          <span className={styles.typeName}>{type.name}</span>
        </div>
      ))}
    </div>
  );
};
