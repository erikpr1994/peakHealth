import * as React from 'react';
import './select.css';

import { cn } from '../../utils';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Optional error state for the select
   */
  error?: boolean;
  /**
   * Optional placeholder text
   */
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, error, placeholder, ...props }, ref) => {
    const selectClasses = cn(
      'peakhealth-select',
      error && 'peakhealth-select--error',
      className
    );

    // If placeholder is provided and no value/defaultValue is set, 
    // use empty string as defaultValue to show the placeholder
    const selectProps = {
      ...props,
      defaultValue: placeholder && !props.value && !props.defaultValue ? "" : props.defaultValue
    };

    return (
      <select className={selectClasses} ref={ref} {...selectProps}>
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export interface SelectOptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const SelectOption = React.forwardRef<HTMLOptionElement, SelectOptionProps>(
  ({ className, children, ...props }, ref) => {
    const optionClasses = cn('peakhealth-select__option', className);

    return (
      <option className={optionClasses} ref={ref} {...props}>
        {children}
      </option>
    );
  }
);

SelectOption.displayName = 'SelectOption';

export { Select, SelectOption };
