import { describe, expect, it } from 'vitest';
import { render, screen } from '../../test/test-utils';
import React from 'react';

import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('renders the hero section with correct content', () => {
    render(<HeroSection />);

    // Check for main heading
    expect(screen.getByText(/Your Ultimate/)).toBeInTheDocument();
    expect(screen.getByText(/Workout Tracker/)).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(/Log workouts, track progress, and stay motivated/)
    ).toBeInTheDocument();

    // Check for value propositions
    expect(screen.getByText('Log Workouts')).toBeInTheDocument();
    expect(screen.getByText('Track Progress')).toBeInTheDocument();

    // Check for badge
    expect(
      screen.getByText(/Coming Soon - Be the First to Experience/)
    ).toBeInTheDocument();
  });

  it('renders the app mockup elements', () => {
    render(<HeroSection />);

    // Check for app mockup elements
    expect(screen.getByText('PeakHealth')).toBeInTheDocument();
    expect(screen.getByText("Today's Workout")).toBeInTheDocument();
    expect(screen.getByText('3/5 exercises')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Day Streak')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('Goal Progress')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<HeroSection />);

    // Check that the section has proper semantic structure
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
