import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import CreateRoutinePage from './page';

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
      title: 'Create New Routine',
      subtitle: 'Build your perfect workout routine',
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

describe('CreateRoutinePage', () => {
  test('renders the routine creation component in create mode', () => {
    renderWithProvider(<CreateRoutinePage />);
    expect(screen.getByTestId('routine-creation')).toBeInTheDocument();
    expect(screen.getByText('Create Mode')).toBeInTheDocument();
  });

  test('displays routine creation component', () => {
    renderWithProvider(<CreateRoutinePage />);
    expect(screen.getByTestId('routine-creation')).toBeInTheDocument();
  });
});
