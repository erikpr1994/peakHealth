import type { SelectFieldProps } from '../types';
import styles from './FormField.module.css';

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  required = false,
  className = '',
}: SelectFieldProps): React.ReactElement => {
  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.select}
      >
        <option value="">{`Select ${label.toLowerCase()}`}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
