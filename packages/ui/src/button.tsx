import * as React from 'react';

import { cn } from './utils';
import './button.css';

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'dashed'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const buttonClasses = cn(
      'peakhealth-button',
      `peakhealth-button--${variant}`,
      `peakhealth-button--${size === 'default' ? 'default-size' : size}`,
      className
    );

    return (
      <button
        data-slot="button"
        className={buttonClasses}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
