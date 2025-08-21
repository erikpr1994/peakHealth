import * as React from 'react';
import './alert.css';

import { cn } from '../../utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the alert
   * @default "default"
   */
  variant?: 'default' | 'destructive';
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const alertClasses = cn(
      'peakhealth-alert',
      `peakhealth-alert--${variant}`,
      className
    );

    return <div ref={ref} role="alert" className={alertClasses} {...props} />;
  }
);

Alert.displayName = 'Alert';

export interface AlertTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

const AlertTitle = React.forwardRef<HTMLDivElement, AlertTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('peakhealth-alert__title', className)}
        {...props}
      />
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('peakhealth-alert__description', className)}
      {...props}
    />
  );
});

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
