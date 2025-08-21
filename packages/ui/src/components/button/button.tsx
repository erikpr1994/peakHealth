import * as React from 'react';
import './button.css';

import { cn } from '../../utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button
   * @default "default"
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /**
   * The size of the button
   * @default "default"
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const buttonClasses = cn(
      'peakhealth-button',
      `peakhealth-button--${variant}`,
      `peakhealth-button--${size}`,
      loading && 'peakhealth-button--loading',
      className
    );

    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="peakhealth-button__spinner" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </span>
        )}
        <span className="peakhealth-button__content">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

