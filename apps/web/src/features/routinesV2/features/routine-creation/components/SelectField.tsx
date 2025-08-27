import { useTranslations } from 'next-intl';
import type { SelectFieldProps } from '../types';
import styles from './SelectField.module.css';

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  required = false,
  className = '',
}: SelectFieldProps): React.ReactElement => {
  const t = useTranslations('routines');

  // Use a special value for the default option that won't conflict with typed unions
  const DEFAULT_OPTION_VALUE = '__default__';

  const handleChange = (newValue: string): void => {
    // Only call onChange if a valid option is selected (not the default option)
    if (newValue !== DEFAULT_OPTION_VALUE) {
      onChange(newValue);
    }
  };

  // Determine the appropriate translation key based on the label
  const getDefaultOptionText = (): string => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('difficulty')) {
      return t('creation.selectDifficulty');
    }
    if (lowerLabel.includes('goal')) {
      return t('creation.selectGoal');
    }
    // Fallback for other fields
    return t('creation.selectDifficulty').replace('difficulty', lowerLabel);
  };

  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <select
        value={value || DEFAULT_OPTION_VALUE}
        onChange={e => handleChange(e.target.value)}
        className={styles.select}
      >
        <option value={DEFAULT_OPTION_VALUE}>{getDefaultOptionText()}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
