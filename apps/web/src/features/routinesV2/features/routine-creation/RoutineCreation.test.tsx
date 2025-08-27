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
  (): {
    useToast: () => { showToast: ReturnType<typeof vi.fn> };
    Button: React.ComponentType<any>;
    Input: React.ComponentType<any>;
    Select: React.ComponentType<any>;
    NumberInput: React.ComponentType<any>;
    TextArea: React.ComponentType<any>;
    Textarea: React.ComponentType<any>;
    Label: React.ComponentType<any>;
  } => ({
    useToast: () => ({
      showToast: vi.fn(),
    }),
    Button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    Input: ({ ...props }: any) => <input {...props} />,
    Select: ({ children, ...props }: any) => (
      <select {...props}>{children}</select>
    ),
    NumberInput: ({ ...props }: any) => <input type="number" {...props} />,
    TextArea: ({ ...props }: any) => <textarea {...props} />,
    Textarea: ({ ...props }: any) => <textarea {...props} />,
    Label: ({ children, ...props }: any) => (
      <label {...props}>{children}</label>
    ),
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
      saveRoutine: 'Save Routine',
      updateRoutine: 'Update Routine',
      routineDetails: 'Routine Details',
      routineName: 'Routine Name',
      routineNamePlaceholder: 'Enter routine name...',
      difficulty: 'Difficulty',
      selectDifficulty: 'Select difficulty',
      goal: 'Goal',
      selectGoal: 'Select goal',
      duration: 'Duration (weeks)',
      description: 'Description',
      descriptionPlaceholder: 'Describe your routine...',
      trainingObjectives: 'Training Objectives',
      objectivesPlaceholder:
        'What are the main goals and focus areas of this routine?',
      objectivesHelpText:
        'Press Enter to add each objective. Click the X to remove.',
    },
    difficulty: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
    goals: {
      strength: 'Strength',
      hypertrophy: 'Hypertrophy',
      endurance: 'Endurance',
      weightLoss: 'Weight Loss',
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
