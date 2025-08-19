import { describe, expect, it } from 'vitest';
import { render, screen } from '../../test/test-utils';
import React from 'react';

import { HowItWorksSection } from './HowItWorksSection';

describe('HowItWorksSection', () => {
  it('renders the how it works section with correct content', () => {
    render(<HowItWorksSection />);

    // Check for main heading (split across elements)
    expect(screen.getByText('How')).toBeInTheDocument();
    expect(screen.getByText('PeakHealth Works')).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(/Get started in three simple steps/)
    ).toBeInTheDocument();
  });

  it('renders all three steps', () => {
    render(<HowItWorksSection />);

    // Check for step titles
    expect(screen.getByText('Create Your Routine')).toBeInTheDocument();
    expect(screen.getByText('Log Your Workouts')).toBeInTheDocument();
    expect(screen.getByText('Monitor Progress')).toBeInTheDocument();

    // Check for step descriptions
    expect(
      screen.getByText(/Build custom workout routines/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Track each exercise with sets, reps, and weights/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/View detailed charts, personal records/)
    ).toBeInTheDocument();
  });

  it('renders the features section', () => {
    render(<HowItWorksSection />);

    // Check for features
    expect(screen.getByText('Smart Rest Timers')).toBeInTheDocument();
    expect(screen.getByText('Exercise Library')).toBeInTheDocument();
    expect(screen.getByText('Personal Records')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<HowItWorksSection />);

    // Check that the section has proper semantic structure
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
