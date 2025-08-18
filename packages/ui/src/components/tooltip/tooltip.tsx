'use client';

import * as React from 'react';

import './tooltip.css';
import { cn } from '../../utils';

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div
      className={cn('peakhealth-tooltip-container', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div
        className={cn(
          'peakhealth-tooltip',
          `peakhealth-tooltip--${position}`,
          isVisible && 'peakhealth-tooltip--visible'
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
