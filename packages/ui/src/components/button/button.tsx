import * as React from 'react';
import './button.css';

import { cn } from '../../utils';

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?:
    | 'primary'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'dashed'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const buttonClasses = cn(
      'peakhealth-button',
      `peakhealth-button--${variant}`,
      `peakhealth-button--${size === 'default' ? 'default-size' : size}`,
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: buttonClasses,
        ref,
        ...props,
      });
    }

    return (
      <button data-slot="button" className={buttonClasses} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
