import React from 'react';
import styles from './WorkoutCompletion.module.css';

const WorkoutCompletion = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className={styles.title}>Workout Complete!</h2>
        <p className={styles.message}>Great job! Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default WorkoutCompletion;
