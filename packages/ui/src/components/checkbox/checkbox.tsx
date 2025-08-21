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
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    
    const checkboxClasses = cn(
      'peakhealth-checkbox',
      error && 'peakhealth-checkbox--error',
      className
    );

    return (
      <div className="peakhealth-checkbox-container">
        <input
          type="checkbox"
          id={checkboxId}
          className={checkboxClasses}
          ref={ref}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className="peakhealth-checkbox-label"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };

