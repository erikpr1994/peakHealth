import { Input } from '@peakhealth/ui';
import type { NumberInputProps } from '../types';
import styles from './NumberInput.module.css';

export const NumberInput = ({
  label,
  value,
  onChange,
  min = 1,
  max = 100,
  required = false,
  className = '',
}: NumberInputProps): React.ReactElement => {
  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <Input
        type="number"
        value={value}
        onChange={e => onChange(parseInt(e.target.value) || 0)}
        min={min}
        max={max}
        required={required}
        className={styles.input}
      />
    </div>
  );
};
