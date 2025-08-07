import * as React from 'react';

import './input.css';
import { cn } from '../../utils';

export interface InputProps extends React.ComponentProps<'input'> {
  variant?: 'default' | 'error';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <input
        className={cn(
          'peakhealth-input',
          `peakhealth-input--${variant}`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
