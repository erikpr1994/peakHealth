import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { RoutineCreation } from './RoutineCreation';

// Mock dependencies
vi.mock(
  'next/navigation',
  (): { useRouter: () => { push: ReturnType<typeof vi.fn> } } => ({
    useRouter: () => ({
      push: vi.fn(),
    }),
  })
);

vi.mock(
  '@/features/auth/context/AuthContext',
  (): {
    useAuth: () => {
      isAuthenticated: boolean;
      user: { id: string; email: string } | null;
    };
  } => ({
    useAuth: () => ({
      isAuthenticated: true,
      user: { id: 'user-1', email: 'test@example.com' },
    }),
  })
);

vi.mock(
  '@peakhealth/ui',
  (): { useToast: () => { showToast: ReturnType<typeof vi.fn> } } => ({
    useToast: () => ({
      showToast: vi.fn(),
    }),
  })
);

vi.mock(
  './services/routineService',
  (): {
    routineService: {
      createRoutine: ReturnType<typeof vi.fn>;
      updateRoutine: ReturnType<typeof vi.fn>;
    };
  } => ({
    routineService: {
      createRoutine: vi.fn().mockResolvedValue({}),
      updateRoutine: vi.fn().mockResolvedValue({}),
    },
  })
);

// Mock messages for testing (full mock of routines namespace)
const messages = {
  routines: {
    creation: {
      title: 'Create New Routine',
      subtitle: 'Build your perfect workout routine',
      editTitle: 'Edit Routine',
      editSubtitle: 'Update your workout routine',
      saveButton: 'Save Routine',
      updateButton: 'Update Routine',
    },
    messages: {
      routineCreated: 'Routine created successfully',
      routineUpdated: 'Routine updated successfully',
      errorCreating: 'Error creating routine',
      errorUpdating: 'Error updating routine',
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

describe('RoutineCreation', () => {
  test('renders create mode by default', () => {
    renderWithProvider(<RoutineCreation />);
    expect(screen.getByText('Create New Routine')).toBeInTheDocument();
    expect(
      screen.getByText('Build your perfect workout routine')
    ).toBeInTheDocument();
    expect(screen.getByText('Save Routine')).toBeInTheDocument();
  });

  test('renders edit mode when specified', () => {
    renderWithProvider(
      <RoutineCreation mode="edit" editRoutineId="routine-1" />
    );
    expect(screen.getByText('Edit Routine')).toBeInTheDocument();
    expect(screen.getByText('Update your workout routine')).toBeInTheDocument();
    expect(screen.getByText('Update Routine')).toBeInTheDocument();
  });
});
