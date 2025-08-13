import { render, screen } from '@testing-library/react';

import HomePage from './page';

/* eslint-disable no-undef */

// Mock the components to avoid complex testing setup
vi.mock('@/components/shared/Header', () => ({
  Header: (): React.JSX.Element => <div data-testid="header">Header</div>,
}));

vi.mock('@/components/shared/Footer', () => ({
  Footer: (): React.JSX.Element => <div data-testid="footer">Footer</div>,
}));

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

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument();
    expect(screen.getByTestId('cta')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
