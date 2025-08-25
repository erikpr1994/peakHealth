import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WorkoutOverview } from './workout-overview';

// Mock the Logo component
vi.mock('@peakhealth/ui', () => ({
  Logo: ({
    width,
    height,
    className,
  }: {
    width: number;
    height: number;
    className?: string;
  }): React.JSX.Element => (
    <div data-testid="logo" style={{ width, height }} className={className}>
      Logo
    </div>
  ),
}));

describe('WorkoutOverview', () => {
  it('renders the workout overview component', () => {
    render(<WorkoutOverview />);

    // Check for logo
    expect(screen.getByTestId('logo')).toBeInTheDocument();

    // Check for start workout button
    expect(screen.getByText(/start workout/i)).toBeInTheDocument();
  });

  it('displays routine information', () => {
    render(<WorkoutOverview />);

    // Check for routine title
    expect(screen.getByText(/upper body strength/i)).toBeInTheDocument();

    // Check for workout sections title
    expect(screen.getByText(/workout sections/i)).toBeInTheDocument();
  });
});
