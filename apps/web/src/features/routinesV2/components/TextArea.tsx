import { Textarea } from '@peakhealth/ui';
import type { TextAreaProps } from '../types';
import styles from './FormField.module.css';

export const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  rows = 4,
}: TextAreaProps): React.ReactElement => {
  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={styles.textarea}
      />
    </div>
  );
};
