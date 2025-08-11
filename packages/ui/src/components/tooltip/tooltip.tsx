'use client';

import * as React from 'react';

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

  const getTooltipStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      zIndex: 1000,
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      transition: 'opacity 0.2s, visibility 0.2s',
      pointerEvents: 'none',
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          bottom: '125%',
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'bottom':
        return {
          ...baseStyles,
          top: '125%',
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          ...baseStyles,
          right: '125%',
          top: '50%',
          transform: 'translateY(-50%)',
        };
      case 'right':
        return {
          ...baseStyles,
          left: '125%',
          top: '50%',
          transform: 'translateY(-50%)',
        };
      default:
        return baseStyles;
    }
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  const tooltipStyles = getTooltipStyles();

  return (
    <div
      style={containerStyles}
      className={className}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div style={tooltipStyles}>{content}</div>
    </div>
  );
};

export default Tooltip;
