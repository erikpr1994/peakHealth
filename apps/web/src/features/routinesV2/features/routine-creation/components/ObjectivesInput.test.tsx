import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ObjectivesInput } from './ObjectivesInput';

// Mock messages for testing
const messages = {
  routines: {
    creation: {
      trainingObjectives: 'Training Objectives',
      objectivesPlaceholder:
        'What are the main goals and focus areas of this routine?',
      objectivesHelpText:
        'Press Enter to add each objective. Click the X to remove.',
    },
  },
};

const renderWithProvider = (
  component: React.ReactElement
): ReturnType<typeof render> => {
  return render(
    <NextIntlClientProvider messages={messages} locale="en">
      {component}
    </NextIntlClientProvider>
  );
};

describe('ObjectivesInput', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders training objectives label', () => {
    renderWithProvider(
      <ObjectivesInput objectives={[]} onChange={mockOnChange} />
    );
    expect(screen.getByText('Training Objectives')).toBeInTheDocument();
  });

  test('renders help text', () => {
    renderWithProvider(
      <ObjectivesInput objectives={[]} onChange={mockOnChange} />
    );
    expect(
      screen.getByText(
        'Press Enter to add each objective. Click the X to remove.'
      )
    ).toBeInTheDocument();
  });

  test('displays existing objectives', () => {
    const objectives = ['Build strength', 'Improve endurance'];
    renderWithProvider(
      <ObjectivesInput objectives={objectives} onChange={mockOnChange} />
    );
    expect(screen.getByText('Build strength')).toBeInTheDocument();
    expect(screen.getByText('Improve endurance')).toBeInTheDocument();
  });

  test('uses custom placeholder when provided', () => {
    const customPlaceholder = 'Custom placeholder text';
    renderWithProvider(
      <ObjectivesInput
        objectives={[]}
        onChange={mockOnChange}
        placeholder={customPlaceholder}
      />
    );
    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const customClass = 'custom-objectives-class';
    renderWithProvider(
      <ObjectivesInput
        objectives={[]}
        onChange={mockOnChange}
        className={customClass}
      />
    );
    const container = screen.getByText('Training Objectives').closest('div');
    expect(container).toHaveClass(customClass);
  });
});
