import * as React from 'react';
import './checkbox.css';

import { cn } from '../../utils';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional label for the checkbox
   */
  label?: string;
  /**
   * Optional error state for the checkbox
   */
  error?: boolean;
  /**
   * Optional children for the checkbox label
   */
  children?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, children, onChange, checked, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    
    const checkboxClasses = cn(
      'peakhealth-checkbox',
      error && 'peakhealth-checkbox--error',
      className
    );

    // Add onChange handler if checked is provided but onChange is not
    const handleChange = onChange || (checked !== undefined ? () => {} : undefined);

    return (
      <div className="peakhealth-checkbox__container">
        <input
          type="checkbox"
          id={checkboxId}
          className={checkboxClasses}
          ref={ref}
          onChange={handleChange}
          checked={checked}
          {...props}
        />
        {(label || children) && (
          <label
            htmlFor={checkboxId}
            className="peakhealth-checkbox-label"
          >
            {label || children}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
