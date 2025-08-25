import React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders the logo with default props', () => {
    render(<Logo />);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('peakhealth-logo');
  });

  it('renders with custom width and height', () => {
    render(<Logo width={300} height={100} />);
    const logo = screen.getByTestId('logo');
    expect(logo).toHaveAttribute('width', '300');
    expect(logo).toHaveAttribute('height', '100');
  });

  it('renders with custom className', () => {
    render(<Logo className="custom-logo" />);
    const logo = screen.getByTestId('logo');
    expect(logo).toHaveClass('peakhealth-logo', 'custom-logo');
  });

  it('has correct viewBox attribute', () => {
    render(<Logo />);
    const logo = screen.getByTestId('logo');
    expect(logo).toHaveAttribute('viewBox', '0 0 1024 306.532');
  });
});
