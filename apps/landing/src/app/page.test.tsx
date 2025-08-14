import { render, screen } from '@testing-library/react';
import React from 'react'; // Added React import for JSX.Element type

import HomePage from './page';

/* eslint-disable no-undef */

// Mock the components to avoid complex testing setup
vi.mock('@/components/landing/HeroSection', () => ({
  HeroSection: (): React.JSX.Element => <div data-testid="hero">Hero</div>,
}));

vi.mock('@/components/landing/FeatureSection', () => ({
  FeatureSection: (): React.JSX.Element => (
    <div data-testid="features">Features</div>
  ),
}));

vi.mock('@/components/landing/HowItWorksSection', () => ({
  HowItWorksSection: (): React.JSX.Element => (
    <div data-testid="how-it-works">How It Works</div>
  ),
}));

vi.mock('@/components/landing/CTASection', () => ({
  CTASection: (): React.JSX.Element => <div data-testid="cta">CTA</div>,
}));

describe('HomePage', () => {
  it('renders all main sections', () => {
    render(<HomePage />);

    expect(screen.getByTestId('hero')).toBeDefined();
    expect(screen.getByTestId('features')).toBeDefined();
    expect(screen.getByTestId('how-it-works')).toBeDefined();
    expect(screen.getByTestId('cta')).toBeDefined();
  });
});
