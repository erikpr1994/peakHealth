import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import EditRoutinePage from './page';

// Mock the RoutineCreation component
vi.mock(
  '@/features/routinesV2/features/routine-creation/RoutineCreation',
  (): {
    RoutineCreation: React.ComponentType<{
      mode?: string;
      editRoutineId?: string;
    }>;
  } => ({
    RoutineCreation: ({ mode, editRoutineId }) => (
      <div data-testid="routine-creation">
        {mode === 'edit' ? 'Edit Mode' : 'Create Mode'}
        {editRoutineId && <span data-testid="edit-id">{editRoutineId}</span>}
      </div>
    ),
  })
);

// Mock messages for testing
const messages = {
  routines: {
    creation: {
      title: 'Edit Routine',
      subtitle: 'Update your workout routine',
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

describe('EditRoutinePage', () => {
  test('renders the routine creation component in edit mode', () => {
    renderWithProvider(<EditRoutinePage />);
    expect(screen.getByTestId('routine-creation')).toBeInTheDocument();
    expect(screen.getByText('Edit Mode')).toBeInTheDocument();
    expect(screen.getByTestId('edit-id')).toHaveTextContent('1');
  });

  test('displays routine creation component', () => {
    renderWithProvider(<EditRoutinePage />);
    expect(screen.getByTestId('routine-creation')).toBeInTheDocument();
  });
});
