import { ArrowLeft } from 'lucide-react';
import { Button } from '@peakhealth/ui';
import type { RoutineHeaderProps } from '../types';
import styles from './RoutineHeader.module.css';

export const RoutineHeader = ({
  mode,
  onSave,
  onCancel,
}: RoutineHeaderProps): React.ReactElement => {
  return (
    <div className={styles.header}>
      {/* Left side - Back button and title */}
      <div className={styles.leftSection}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className={styles.backButton}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div>
          <h1 className={styles.title}>
            {mode === 'edit' ? 'Edit Routine' : 'Create New Routine'}
          </h1>
          <p className={styles.subtitle}>
            {mode === 'edit'
              ? 'Update your workout routine'
              : 'Build your perfect workout routine'}
          </p>
        </div>
      </div>

      {/* Right side - Save button */}
      <Button onClick={onSave} className={styles.saveButton}>
        {mode === 'edit' ? 'Update Routine' : 'Save Routine'}
      </Button>
    </div>
  );
};
