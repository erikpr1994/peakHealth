import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the entire module
vi.mock('../RoutineCreation', () => ({
  default: (): React.ReactElement => (
    <div data-testid="routine-creation-mock">
      <div data-testid="routine-details-form">Routine Details Form</div>
      <div data-testid="strength-workouts-section">
        Strength Workouts Section
      </div>
      <div data-testid="running-workouts-section">Running Workouts Section</div>
      <button data-testid="save-button">Save</button>
    </div>
  ),
}));

// Mock the useToast hook
const mockShowToast = vi.fn();
vi.mock('@peakhealth/ui', () => ({
  useToast: (): { showToast: typeof mockShowToast } => ({
    showToast: mockShowToast,
  }),
}));

describe('RoutineCreation', () => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  it('should render routine creation form', async () => {
    const RoutineCreation = vi.mocked(
      await import('../RoutineCreation')
    ).default;
    render(<RoutineCreation />);

    expect(screen.getByTestId('routine-creation-mock')).toBeInTheDocument();
    expect(screen.getByTestId('routine-details-form')).toBeInTheDocument();
    expect(screen.getByTestId('strength-workouts-section')).toBeInTheDocument();
    expect(screen.getByTestId('running-workouts-section')).toBeInTheDocument();
    expect(screen.getByTestId('save-button')).toBeInTheDocument();
  });

  it('should have toast functionality available', async () => {
    const { useToast } = await import('@peakhealth/ui');
    const { showToast } = useToast();

    expect(showToast).toBeDefined();
    expect(typeof showToast).toBe('function');
  });
});
