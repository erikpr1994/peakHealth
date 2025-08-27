import { Input } from '@peakhealth/ui';
import type { InputFieldProps } from '../types';
import styles from './InputField.module.css';

export const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
}: InputFieldProps): React.ReactElement => {
  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={styles.input}
      />
    </div>
  );
};
