'use client';

import * as React from 'react';

import './tooltip.css';

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
  return (
    <div className={`tooltip-container ${className || ''}`}>
      {children}
      <div className={`tooltip ${position}`}>{content}</div>
    </div>
  );
};

export default Tooltip;
