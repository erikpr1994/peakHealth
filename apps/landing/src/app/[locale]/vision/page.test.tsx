import { describe, expect, it } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import React from 'react';

import VisionPage from './page';

describe('VisionPage', () => {
  it('renders the vision page with correct content', () => {
    render(<VisionPage />);

    // Check for main title
    expect(screen.getByText(/Our Vision for/)).toBeInTheDocument();
    expect(screen.getByText(/Global Health/)).toBeInTheDocument();

    // Check for hero description
    expect(
      screen.getByText(/Health today is severely deteriorated/)
    ).toBeInTheDocument();

    // Check for mission section
    expect(screen.getByText('Why PeakHealth Exists')).toBeInTheDocument();

    // Check for problem and solution cards
    expect(screen.getByText('The Problem')).toBeInTheDocument();
    expect(screen.getByText('Our Solution')).toBeInTheDocument();

    // Check for pillars section
    expect(screen.getByText('Our Core Principles')).toBeInTheDocument();

    // Check for individual pillars
    expect(screen.getByText('Holistic Health')).toBeInTheDocument();
    expect(screen.getByText('Preventive Focus')).toBeInTheDocument();
    expect(screen.getByText('Global Impact')).toBeInTheDocument();
    expect(screen.getByText('Evidence-Based')).toBeInTheDocument();
    expect(screen.getByText('Continuous Evolution')).toBeInTheDocument();
    expect(screen.getByText('Accessible Health')).toBeInTheDocument();

    // Check for impact section
    expect(screen.getByText('Our Impact Vision')).toBeInTheDocument();

    // Check for impact levels
    expect(screen.getByText('Individual Level')).toBeInTheDocument();
    expect(screen.getByText('Community Level')).toBeInTheDocument();
    expect(screen.getByText('Global Level')).toBeInTheDocument();

    // Check for CTA section
    expect(screen.getByText('Join Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('renders all vision pillars with descriptions', () => {
    render(<VisionPage />);

    // Check that all pillar descriptions are present
    expect(
      screen.getByText(/We believe in treating the whole person/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Instead of waiting for health issues to arise/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Our vision extends beyond individual users/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Every approach and recommendation is grounded/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We constantly evolve our understanding/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We believe that comprehensive health and fitness/)
    ).toBeInTheDocument();
  });

  it('renders impact descriptions', () => {
    render(<VisionPage />);

    // Check impact descriptions
    expect(
      screen.getByText(
        /Help millions of people build sustainable health habits/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Create supportive networks where people can share/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Contribute to a paradigm shift in how society/)
    ).toBeInTheDocument();
  });
});
