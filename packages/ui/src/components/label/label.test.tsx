import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './label';

describe('Label', () => {
  it('renders a basic label element', () => {
    render(<Label>Label Text</Label>);
    const label = screen.getByText('Label Text');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('peakhealth-label');
  });

  it('applies additional className', () => {
    render(<Label className="custom-class">Label Text</Label>);
    const label = screen.getByText('Label Text');
    expect(label).toHaveClass('custom-class');
  });

  it('renders with htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Label Text</Label>);
    const label = screen.getByText('Label Text');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('renders with required indicator when required is true', () => {
    render(<Label required>Required Label</Label>);
    const label = screen.getByText('Required Label');
    expect(label).toHaveClass('peakhealth-label--required');
    
    // Check for the required indicator (usually an asterisk)
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveClass('peakhealth-label__required-indicator');
  });

  it('renders with error state', () => {
    render(<Label error>Error Label</Label>);
    const label = screen.getByText('Error Label');
    expect(label).toHaveClass('peakhealth-label--error');
  });

  it('renders with disabled state', () => {
    render(<Label disabled>Disabled Label</Label>);
    const label = screen.getByText('Disabled Label');
    expect(label).toHaveClass('peakhealth-label--disabled');
  });

  it('renders with both required and error states', () => {
    render(<Label required error>Error Required Label</Label>);
    const label = screen.getByText('Error Required Label');
    expect(label).toHaveClass('peakhealth-label--required');
    expect(label).toHaveClass('peakhealth-label--error');
    
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveClass('peakhealth-label__required-indicator');
  });

  it('renders with optional text when optional is true', () => {
    render(<Label optional>Optional Label</Label>);
    const label = screen.getByText('Optional Label');
    
    const optionalText = screen.getByText('(optional)');
    expect(optionalText).toBeInTheDocument();
    expect(optionalText).toHaveClass('peakhealth-label__optional-text');
  });
});

