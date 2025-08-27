import { useState, KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Input, Button } from '@peakhealth/ui';
import styles from './ObjectivesInput.module.css';

interface ObjectivesInputProps {
  objectives: string[];
  onChange: (objectives: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const ObjectivesInput = ({
  objectives,
  onChange,
  placeholder,
  className = '',
}: ObjectivesInputProps): React.ReactElement => {
  const t = useTranslations('routines');
  const [inputValue, setInputValue] = useState('');

  const defaultPlaceholder = t('creation.objectivesPlaceholder');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addObjective();
    }
  };

  const addObjective = (): void => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !objectives.includes(trimmedValue)) {
      onChange([...objectives, trimmedValue]);
      setInputValue('');
    }
  };

  const removeObjective = (objectiveToRemove: string): void => {
    onChange(objectives.filter(obj => obj !== objectiveToRemove));
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <label className={styles.label}>
        {t('creation.trainingObjectives')}
        <span className={styles.required}>*</span>
      </label>

      <div className={styles.inputSection}>
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || defaultPlaceholder}
          className={styles.input}
        />
        <p className={styles.helpText}>{t('creation.objectivesHelpText')}</p>
      </div>

      {objectives.length > 0 && (
        <div className={styles.objectivesList}>
          {objectives.map((objective, index) => (
            <div key={index} className={styles.objectiveItem}>
              <span className={styles.objectiveText}>{objective}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeObjective(objective)}
                className={styles.removeButton}
              >
                <X className={styles.removeIcon} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
