import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { RoutineHeader } from './RoutineHeader';

// Mock @peakhealth/ui
vi.mock('@peakhealth/ui', (): { Button: React.ComponentType<any> } => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock messages for testing (partial mock of routines.creation namespace)
const messages = {
  routines: {
    creation: {
      title: 'Create New Routine',
      subtitle: 'Build your perfect workout routine',
      editTitle: 'Edit Routine',
      editSubtitle: 'Update your workout routine',
      saveRoutine: 'Save Routine',
      updateRoutine: 'Update Routine',
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

describe('RoutineHeader', () => {
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders create mode by default', () => {
    renderWithProvider(
      <RoutineHeader
        mode="create"
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByText('Create New Routine')).toBeInTheDocument();
    expect(
      screen.getByText('Build your perfect workout routine')
    ).toBeInTheDocument();
    expect(screen.getByText('Save Routine')).toBeInTheDocument();
  });

  test('renders edit mode when specified', () => {
    renderWithProvider(
      <RoutineHeader mode="edit" onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    expect(screen.getByText('Edit Routine')).toBeInTheDocument();
    expect(screen.getByText('Update your workout routine')).toBeInTheDocument();
    expect(screen.getByText('Update Routine')).toBeInTheDocument();
  });
});
