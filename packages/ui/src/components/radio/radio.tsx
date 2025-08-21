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
  /**
   * Optional children for the radio label
   */
  children?: React.ReactNode;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, id, children, onChange, checked, ...props }, ref) => {
    const generatedId = React.useId();
    const radioId = id || generatedId;
    
    const radioClasses = cn(
      'peakhealth-radio',
      error && 'peakhealth-radio--error',
      className
    );

    // Don't create a no-op function for controlled components without onChange
    // This allows React to properly warn about missing onChange handlers
    
    return (
      <div className="peakhealth-radio-container">
        <input
          type="radio"
          id={radioId}
          className={radioClasses}
          ref={ref}
          onChange={onChange}
          checked={checked}
          {...props}
        />
        {(label || children) && (
          <label
            htmlFor={radioId}
            className="peakhealth-radio-label"
          >
            {label || children}
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
   * Default value for uncontrolled component
   */
  defaultValue?: string;
  /**
   * Callback when selection changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  /**
   * Whether the entire group is disabled
   */
  disabled?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue,
  onChange,
  options,
  error,
  className,
  disabled,
}) => {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    
    if (onChange) {
      onChange(e);
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
          checked={currentValue === option.value}
          onChange={handleChange}
          label={option.label}
          disabled={disabled || option.disabled}
          error={error}
        />
      ))}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';

export { Radio, RadioGroup };
