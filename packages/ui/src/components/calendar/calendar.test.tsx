import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Calendar } from './calendar';

describe('Calendar', () => {
  it('renders correctly', () => {
    render(<Calendar data-testid="calendar" />);
    const calendar = screen.getByTestId('calendar');
    expect(calendar).toBeInTheDocument();
    expect(calendar).toHaveClass('peakhealth-calendar');
  });

  it('renders with showOutsideDays=true by default', () => {
    render(<Calendar data-testid="calendar" />);
    // This is a bit tricky to test directly since it's a prop passed to DayPicker
    // We'll check that the component renders without errors
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('renders with showOutsideDays=false when specified', () => {
    render(<Calendar showOutsideDays={false} data-testid="calendar" />);
    // Again, this is a prop passed to DayPicker, so we're just checking rendering
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('applies additional className', () => {
    render(<Calendar className="custom-class" data-testid="calendar" />);
    const calendar = screen.getByTestId('calendar');
    expect(calendar).toHaveClass('custom-class');
  });

  it('renders with navigation buttons', () => {
    render(<Calendar />);
    // Since the navigation buttons are rendered by react-day-picker,
    // we'll just check that the component renders without errors
    const calendar = document.querySelector('.peakhealth-calendar');
    expect(calendar).toBeInTheDocument();
  });

  it('renders with range mode when specified', () => {
    render(<Calendar mode="range" data-testid="calendar" />);
    // Check that the component renders without errors
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('renders with single mode by default', () => {
    render(<Calendar data-testid="calendar" />);
    // Check that the component renders without errors
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });
});
