'use client';

import React from 'react';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './tooltip.module.css';

interface TooltipProps {
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
  const positionClass = styles[position] || styles.top;

  return (
    <div className={`${styles.tooltipContainer} ${className || ''}`}>
      {children}
      <div className={`${styles.tooltip} ${positionClass}`}>{content}</div>
    </div>
  );
};

export default Tooltip;
