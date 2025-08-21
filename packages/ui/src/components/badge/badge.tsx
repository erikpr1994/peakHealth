import * as React from 'react';
import './badge.css';

import { cn } from '../../utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The variant of the badge
   * @default "default"
   */
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'peakhealth-badge',
          `peakhealth-badge--${variant}`,
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };

