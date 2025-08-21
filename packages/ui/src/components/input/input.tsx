import * as React from 'react';
import './input.css';

import { cn } from '../../utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional error state for the input
   */
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = 'text', ...props }, ref) => {
    const inputClasses = cn(
      'peakhealth-input',
      error && 'peakhealth-input--error',
      className
    );

    return (
      <input type={type} className={inputClasses} ref={ref} {...props} />
    );
  }
);

Input.displayName = 'Input';

export { Input };

