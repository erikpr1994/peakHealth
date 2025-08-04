import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { Difficulty } from '../../../types';
import { DifficultyBadge } from '../DifficultyBadge';

describe('DifficultyBadge', () => {
  it('should render difficulty text', () => {
    render(<DifficultyBadge difficulty="Beginner" />);

    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('should show icon by default', () => {
    render(<DifficultyBadge difficulty="Beginner" />);

    const badge = screen.getByText('Beginner');
    expect(badge.previousElementSibling).toBeInTheDocument();
  });

  it('should hide icon when showIcon is false', () => {
    render(<DifficultyBadge difficulty="Beginner" showIcon={false} />);

    const badge = screen.getByText('Beginner');
    expect(badge.previousElementSibling).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<DifficultyBadge difficulty="Beginner" className="custom-class" />);

    const badge = screen.getByText('Beginner').parentElement;
    expect(badge).toHaveClass('custom-class');
  });

  it('should handle all difficulty levels', () => {
    const difficulties: Difficulty[] = [
      'Beginner',
      'Intermediate',
      'Advanced',
      'Unknown',
    ];

    difficulties.forEach(difficulty => {
      const { unmount } = render(<DifficultyBadge difficulty={difficulty} />);
      expect(screen.getByText(difficulty)).toBeInTheDocument();
      unmount();
    });
  });

  it('should render Beginner difficulty with correct icon', () => {
    render(<DifficultyBadge difficulty="Beginner" />);

    expect(screen.getByText('Beginner')).toBeInTheDocument();
    // Check for Zap icon (Beginner)
    const icon = screen.getByText('Beginner').previousElementSibling;
    expect(icon).toHaveClass('w-3', 'h-3');
  });

  it('should render Intermediate difficulty with correct icon', () => {
    render(<DifficultyBadge difficulty="Intermediate" />);

    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    // Check for Award icon (Intermediate)
    const icon = screen.getByText('Intermediate').previousElementSibling;
    expect(icon).toHaveClass('w-3', 'h-3');
  });

  it('should render Advanced difficulty with correct icon', () => {
    render(<DifficultyBadge difficulty="Advanced" />);

    expect(screen.getByText('Advanced')).toBeInTheDocument();
    // Check for Users icon (Advanced)
    const icon = screen.getByText('Advanced').previousElementSibling;
    expect(icon).toHaveClass('w-3', 'h-3');
  });

  it('should render Unknown difficulty with correct icon', () => {
    render(<DifficultyBadge difficulty="Unknown" />);

    expect(screen.getByText('Unknown')).toBeInTheDocument();
    // Check for Info icon (Unknown)
    const icon = screen.getByText('Unknown').previousElementSibling;
    expect(icon).toHaveClass('w-3', 'h-3');
  });

  it('should handle unknown difficulty value gracefully', () => {
    render(<DifficultyBadge difficulty={'Unknown' as Difficulty} />);

    expect(screen.getByText('Unknown')).toBeInTheDocument();
    const icon = screen.getByText('Unknown').previousElementSibling;
    expect(icon).toHaveClass('w-3', 'h-3');
  });

  it('should apply correct spacing when icon is shown', () => {
    render(<DifficultyBadge difficulty="Beginner" showIcon />);

    const textSpan = screen.getByText('Beginner');
    expect(textSpan).toHaveClass('ml-1');
  });

  it('should not apply spacing when icon is hidden', () => {
    render(<DifficultyBadge difficulty="Beginner" showIcon={false} />);

    const textSpan = screen.getByText('Beginner');
    expect(textSpan).not.toHaveClass('ml-1');
  });

  it('should have border class', () => {
    render(<DifficultyBadge difficulty="Beginner" />);

    const badge = screen.getByText('Beginner').parentElement;
    expect(badge).toHaveClass('border');
  });

  it('should have text-xs class', () => {
    render(<DifficultyBadge difficulty="Beginner" />);

    const badge = screen.getByText('Beginner').parentElement;
    expect(badge).toHaveClass('text-xs');
  });
});
