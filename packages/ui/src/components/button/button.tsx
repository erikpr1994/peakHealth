import * as React from 'react';
import './button.css';

import { cn } from '../../utils';

// Button component with CSS co-located styles

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?:
    | 'primary'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'dashed'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'nav'
    | 'nav-selected'
    | 'nav-unselected'
    | 'action';
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
      const child = children as React.ReactElement<
        React.ComponentProps<'button'>
      >;
      return React.cloneElement(child, {
        className: cn(buttonClasses, child.props.className),
        ref,
        ...props,
      });
    }

    return React.createElement(
      'button',
      {
        className: buttonClasses,
        ref,
        ...props,
      },
      children
    );
  }
);

Button.displayName = 'Button';

export { Button };
