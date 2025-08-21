import * as React from 'react';
import './radio.css';

import { cn } from '../../utils';

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional label for the radio button
   */
  label?: string;
  /**
   * Optional error state for the radio button
   */
  error?: boolean;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const radioId = id || generatedId;
    
    const radioClasses = cn(
      'peakhealth-radio',
      error && 'peakhealth-radio--error',
      className
    );

    return (
      <div className="peakhealth-radio-container">
        <input
          type="radio"
          id={radioId}
          className={radioClasses}
          ref={ref}
          {...props}
        />
        {label && (
          <label
            htmlFor={radioId}
            className="peakhealth-radio-label"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export interface RadioGroupProps {
  /**
   * The name attribute to be applied to all radio buttons in the group
   */
  name: string;
  /**
   * The currently selected value
   */
  value?: string;
  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;
  /**
   * Radio options
   */
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  /**
   * Optional error state for the radio group
   */
  error?: boolean;
  /**
   * Optional additional className
   */
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  error,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const groupClasses = cn('peakhealth-radio-group', className);

  return (
    <div className={groupClasses}>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={handleChange}
          label={option.label}
          disabled={option.disabled}
          error={error}
        />
      ))}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';

export { Radio, RadioGroup };

