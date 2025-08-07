import { render, screen } from '@testing-library/react';

import HomePage from './page';

// Mock the components to avoid complex testing setup
jest.mock('@/components/shared/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

jest.mock('@/components/shared/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

jest.mock('@/components/landing/HeroSection', () => ({
  HeroSection: () => <div data-testid="hero">Hero</div>,
}));

jest.mock('@/components/landing/FeatureSection', () => ({
  FeatureSection: () => <div data-testid="features">Features</div>,
}));

jest.mock('@/components/landing/TestimonialSection', () => ({
  TestimonialSection: () => <div data-testid="testimonials">Testimonials</div>,
}));

jest.mock('@/components/landing/CTASection', () => ({
  CTASection: () => <div data-testid="cta">CTA</div>,
}));

describe('HomePage', () => {
  it('renders all main sections', () => {
    render(<HomePage />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials')).toBeInTheDocument();
    expect(screen.getByTestId('cta')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
