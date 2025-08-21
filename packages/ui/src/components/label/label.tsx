import * as React from 'react';
import './label.css';

import { cn } from '../../utils';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Optional error state for the label
   */
  error?: boolean;
  /**
   * Optional required indicator
   */
  required?: boolean;
  /**
   * Optional disabled state
   */
  disabled?: boolean;
  /**
   * Show optional text
   */
  optional?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, error, required, disabled, optional, ...props }, ref) => {
    const labelClasses = cn(
      'peakhealth-label',
      error && 'peakhealth-label--error',
      required && 'peakhealth-label--required',
      disabled && 'peakhealth-label--disabled',
      className
    );

    return (
      <label className={labelClasses} ref={ref} {...props}>
        {children}
        {required && (
          <span className="peakhealth-label__required-indicator">*</span>
        )}
        {optional && (
          <span className="peakhealth-label__optional-text">(optional)</span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };
