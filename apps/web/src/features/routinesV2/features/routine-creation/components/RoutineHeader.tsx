import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@peakhealth/ui';
import type { RoutineHeaderProps } from '../types';
import styles from './RoutineHeader.module.css';

export const RoutineHeader = ({
  mode,
  onSave,
  onCancel,
}: RoutineHeaderProps): React.ReactElement => {
  const t = useTranslations('routines');

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
            {mode === 'edit' ? t('creation.editTitle') : t('creation.title')}
          </h1>
          <p className={styles.subtitle}>
            {mode === 'edit'
              ? t('creation.editSubtitle')
              : t('creation.subtitle')}
          </p>
        </div>
      </div>

      {/* Right side - Save button */}
      <Button onClick={onSave} className={styles.saveButton}>
        {mode === 'edit'
          ? t('creation.updateRoutine')
          : t('creation.saveRoutine')}
      </Button>
    </div>
  );
};
