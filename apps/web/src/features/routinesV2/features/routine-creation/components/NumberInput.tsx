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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Parse as float to handle decimal values
    const parsedValue = parseFloat(inputValue);

    // Check if it's a valid number
    if (isNaN(parsedValue)) {
      // Only set to min if the input is completely empty
      if (inputValue === '') {
        onChange(min);
      }
      return; // Don't update if invalid
    }

    // Apply min/max constraints
    let finalValue = parsedValue;
    if (finalValue < min) {
      finalValue = min;
    } else if (finalValue > max) {
      finalValue = max;
    }

    onChange(finalValue);
  };

  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        required={required}
        className={styles.input}
      />
    </div>
  );
};
