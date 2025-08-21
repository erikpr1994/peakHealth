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
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, error, required, ...props }, ref) => {
    const labelClasses = cn(
      'peakhealth-label',
      error && 'peakhealth-label--error',
      className
    );

    return (
      <label className={labelClasses} ref={ref} {...props}>
        {children}
        {required && <span className="peakhealth-label__required">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };

