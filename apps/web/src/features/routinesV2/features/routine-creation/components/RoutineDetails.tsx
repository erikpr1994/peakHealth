import type { RoutineDetailsProps, RoutineCreationData } from '../types';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { NumberInput } from './NumberInput';
import { TextArea } from './TextArea';
import { ObjectivesInput } from './ObjectivesInput';
import styles from './RoutineDetails.module.css';

const difficultyOptions = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

const goalOptions = [
  { value: 'Strength', label: 'Strength' },
  { value: 'Hypertrophy', label: 'Hypertrophy' },
  { value: 'Endurance', label: 'Endurance' },
  { value: 'Weight Loss', label: 'Weight Loss' },
];

export const RoutineDetails = ({
  data,
  onUpdate,
}: RoutineDetailsProps): React.ReactElement => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Routine Details</h2>

      <div className={styles.formGrid}>
        {/* Routine Name */}
        <InputField
          label="Routine Name"
          value={data.name}
          onChange={value => onUpdate({ name: value })}
          placeholder="Enter routine name..."
          required
        />

        {/* Difficulty */}
        <SelectField
          label="Difficulty"
          value={data.difficulty}
          onChange={value =>
            onUpdate({ difficulty: value as RoutineCreationData['difficulty'] })
          }
          options={difficultyOptions}
          required
        />

        {/* Goal */}
        <SelectField
          label="Goal"
          value={data.goal}
          onChange={value =>
            onUpdate({ goal: value as RoutineCreationData['goal'] })
          }
          options={goalOptions}
          required
        />

        {/* Duration */}
        <NumberInput
          label="Duration (weeks)"
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
          label="Description"
          value={data.description}
          onChange={value => onUpdate({ description: value })}
          placeholder="Describe your routine..."
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
