'use client';

import { Card } from '@/components/ui/card';
import { Target } from 'lucide-react';
import styles from './RoutineObjectives.module.css';

interface RoutineObjectivesProps {
  objectives: string[];
}

const RoutineObjectives = ({
  objectives,
}: RoutineObjectivesProps): React.ReactElement | null => {
  if (!objectives || objectives.length === 0) {
    return null;
  }

  return (
    <Card className={styles.objectivesCard}>
      <div className={styles.objectivesHeader}>
        <Target className={styles.objectivesIcon} />
        <h2 className={styles.objectivesTitle}>Training Objectives</h2>
      </div>
      <div className={styles.objectivesList}>
        {objectives.map((objective, index) => (
          <span key={index} className={styles.objectiveTag}>
            {objective}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default RoutineObjectives;
