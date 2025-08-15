import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RoutineDetailsForm from './RoutineDetailsForm';
import { RoutineDetailsProvider } from '../context/RoutineDetailsContext';

describe('RoutineDetailsForm', () => {
  it('should render the form with all fields', () => {
    render(
      <RoutineDetailsProvider>
        <RoutineDetailsForm />
      </RoutineDetailsProvider>
    );

    expect(screen.getByText('Routine Details')).toBeInTheDocument();
    expect(screen.getByLabelText('Routine Name')).toBeInTheDocument();
    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByText('Goal')).toBeInTheDocument();
    expect(screen.getByLabelText('Duration (weeks)')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByText('Training Objectives')).toBeInTheDocument();
  });

  it('should display default values', () => {
    render(
      <RoutineDetailsProvider>
        <RoutineDetailsForm />
      </RoutineDetailsProvider>
    );

    const nameInput = screen.getByLabelText('Routine Name') as HTMLInputElement;
    const durationInput = screen.getByLabelText(
      'Duration (weeks)'
    ) as HTMLInputElement;

    expect(nameInput.value).toBe('');
    expect(durationInput.value).toBe('12');
  });

  it('should display initial values when provided through context', () => {
    const initialData = {
      name: 'Test Routine',
      difficulty: 'Advanced',
      goal: 'Hypertrophy',
      description: 'Test description',
      objectives: ['Objective 1'],
      duration: 8,
    };

    render(
      <RoutineDetailsProvider initialData={initialData}>
        <RoutineDetailsForm />
      </RoutineDetailsProvider>
    );

    const nameInput = screen.getByLabelText('Routine Name') as HTMLInputElement;
    const durationInput = screen.getByLabelText(
      'Duration (weeks)'
    ) as HTMLInputElement;
    const descriptionTextarea = screen.getByLabelText(
      'Description'
    ) as HTMLInputElement;

    expect(nameInput.value).toBe('Test Routine');
    expect(durationInput.value).toBe('8');
    expect(descriptionTextarea.value).toBe('Test description');
  });
});
