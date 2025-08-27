import { useTranslations } from 'next-intl';
import type { RoutineDetailsProps, RoutineCreationData } from '../types';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { NumberInput } from './NumberInput';
import { TextArea } from './TextArea';
import { ObjectivesInput } from './ObjectivesInput';
import styles from './RoutineDetails.module.css';

export const RoutineDetails = ({
  data,
  onUpdate,
}: RoutineDetailsProps): React.ReactElement => {
  const t = useTranslations('routines');

  const difficultyOptions = [
    { value: 'Beginner', label: t('difficulty.beginner') },
    { value: 'Intermediate', label: t('difficulty.intermediate') },
    { value: 'Advanced', label: t('difficulty.advanced') },
  ];

  const goalOptions = [
    { value: 'Strength', label: t('goals.strength') },
    { value: 'Hypertrophy', label: t('goals.hypertrophy') },
    { value: 'Endurance', label: t('goals.endurance') },
    { value: 'Weight Loss', label: t('goals.weightLoss') },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('creation.routineDetails')}</h2>

      <div className={styles.formGrid}>
        {/* Routine Name */}
        <InputField
          label={t('creation.routineName')}
          value={data.name}
          onChange={value => onUpdate({ name: value })}
          placeholder={t('creation.routineNamePlaceholder')}
          required
        />

        {/* Difficulty */}
        <SelectField
          label={t('creation.difficulty')}
          value={data.difficulty}
          onChange={value =>
            onUpdate({ difficulty: value as RoutineCreationData['difficulty'] })
          }
          options={difficultyOptions}
          required
        />

        {/* Goal */}
        <SelectField
          label={t('creation.goal')}
          value={data.goal}
          onChange={value =>
            onUpdate({ goal: value as RoutineCreationData['goal'] })
          }
          options={goalOptions}
          required
        />

        {/* Duration */}
        <NumberInput
          label={t('creation.duration')}
          value={data.duration}
          onChange={value => onUpdate({ duration: value })}
          min={1}
          max={52}
          required
        />
      </div>

      {/* Description - Full width */}
      <div className={styles.fullWidth}>
        <TextArea
          label={t('creation.description')}
          value={data.description}
          onChange={value => onUpdate({ description: value })}
          placeholder={t('creation.descriptionPlaceholder')}
          required
          rows={4}
        />
      </div>

      {/* Training Objectives - Full width */}
      <div className={styles.fullWidth}>
        <ObjectivesInput
          objectives={data.objectives}
          onChange={(objectives: string[]) => onUpdate({ objectives })}
        />
      </div>
    </div>
  );
};
