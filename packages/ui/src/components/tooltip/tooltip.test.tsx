import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  const defaultProps = {
    children: <button>Hover me</button>,
    content: 'Tooltip content',
  };

  it('renders children correctly', () => {
    render(<Tooltip {...defaultProps} />);
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip on mouse enter', () => {
    render(<Tooltip {...defaultProps} />);
    const trigger = screen.getByText('Hover me');

    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    render(<Tooltip {...defaultProps} />);
    const trigger = screen.getByText('Hover me');

    fireEvent.mouseEnter(trigger);
    const tooltip = screen.getByText('Tooltip content');
    expect(tooltip).toHaveClass('peakhealth-tooltip--visible');

    fireEvent.mouseLeave(trigger);
    expect(tooltip).not.toHaveClass('peakhealth-tooltip--visible');
  });

  it('applies position classes correctly', () => {
    render(<Tooltip {...defaultProps} position="bottom" />);
    const trigger = screen.getByText('Hover me');

    fireEvent.mouseEnter(trigger);
    const tooltip = screen.getByText('Tooltip content');
    expect(tooltip).toHaveClass('peakhealth-tooltip--bottom');
  });

  it('applies custom className', () => {
    render(<Tooltip {...defaultProps} className="custom-class" />);
    const container = screen
      .getByText('Hover me')
      .closest('.peakhealth-tooltip-container');
    expect(container).toHaveClass('custom-class');
  });
});
