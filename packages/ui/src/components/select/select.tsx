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

    return (
      <select className={selectClasses} ref={ref} {...props}>
        {placeholder && (
          <option value="" disabled selected hidden>
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
