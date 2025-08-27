import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { RoutineDetails } from './RoutineDetails';
import type { RoutineCreationData } from '../types';

// Mock messages for testing
const messages = {
  routines: {
    creation: {
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

describe('RoutineDetails', () => {
  const mockData = {
    name: 'Test Routine',
    description: 'Test description',
    difficulty: 'Beginner' as const,
    goal: 'Strength' as const,
    duration: 4,
    objectives: [],
  };

  const mockOnUpdate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders routine details form', () => {
    renderWithProvider(
      <RoutineDetails data={mockData} onUpdate={mockOnUpdate} />
    );
    expect(screen.getByText('Routine Details')).toBeInTheDocument();
    expect(screen.getByText('Routine Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  test('displays current form data', () => {
    renderWithProvider(
      <RoutineDetails data={mockData} onUpdate={mockOnUpdate} />
    );
    expect(screen.getByDisplayValue('Test Routine')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test description')).toBeInTheDocument();
  });

  test('renders difficulty options with translated labels', () => {
    renderWithProvider(
      <RoutineDetails data={mockData} onUpdate={mockOnUpdate} />
    );
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  test('renders goal options with translated labels', () => {
    renderWithProvider(
      <RoutineDetails data={mockData} onUpdate={mockOnUpdate} />
    );
    expect(screen.getByText('Strength')).toBeInTheDocument();
    expect(screen.getByText('Hypertrophy')).toBeInTheDocument();
    expect(screen.getByText('Endurance')).toBeInTheDocument();
    expect(screen.getByText('Weight Loss')).toBeInTheDocument();
  });
});
