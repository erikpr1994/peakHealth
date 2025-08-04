import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { CategoryBadge } from '../CategoryBadge';

describe('CategoryBadge', () => {
  it('should render category text', () => {
    render(<CategoryBadge category="strength" />);

    expect(screen.getByText('strength')).toBeInTheDocument();
  });

  it('should apply default variant', () => {
    render(<CategoryBadge category="strength" />);

    const badge = screen.getByText('strength');
    expect(badge).toHaveClass('text-xs');
  });

  it('should apply custom variant', () => {
    render(<CategoryBadge category="strength" variant="default" />);

    const badge = screen.getByText('strength');
    expect(badge).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<CategoryBadge category="strength" className="custom-class" />);

    const badge = screen.getByText('strength');
    expect(badge).toHaveClass('custom-class');
  });

  it('should handle different categories', () => {
    const { rerender } = render(<CategoryBadge category="strength" />);
    expect(screen.getByText('strength')).toBeInTheDocument();

    rerender(<CategoryBadge category="cardio" />);
    expect(screen.getByText('cardio')).toBeInTheDocument();

    rerender(<CategoryBadge category="flexibility" />);
    expect(screen.getByText('flexibility')).toBeInTheDocument();
  });

  it('should handle special characters in category', () => {
    render(<CategoryBadge category="strength & conditioning" />);

    expect(screen.getByText('strength & conditioning')).toBeInTheDocument();
  });
});
