import { renderHook } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { useRoutineValidation } from './useRoutineValidation';
import type { RoutineCreationData } from '../types';
import React from 'react';

// Mock messages for testing (full mock of routines.validation namespace)
const messages = {
  routines: {
    validation: {
      routineNameRequired: 'Routine name is required',
      routineNameMinLength: 'Routine name must be at least 3 characters',
      routineNameMaxLength: 'Routine name must be at most 100 characters',
      descriptionRequired: 'Description is required',
      descriptionMinLength: 'Description must be at least 10 characters',
      descriptionMaxLength: 'Description must be at most 500 characters',
      durationMin: 'Duration must be at least 1 week',
      durationMax: 'Duration must be at most 52 weeks',
      objectivesRequired: 'At least one objective is required',
      objectivesNotEmpty: 'All objectives must not be empty',
    },
  },
};

const renderHookWithProvider = () => {
  return renderHook(() => useRoutineValidation(), {
    wrapper: ({ children }) => {
      return React.createElement(NextIntlClientProvider, {
        messages,
        children,
        locale: 'en',
      });
    },
  });
};

describe('useRoutineValidation', () => {
  const validData: RoutineCreationData = {
    name: 'Test Routine',
    description: 'A test routine description',
    difficulty: 'Intermediate',
    goal: 'Strength',
    duration: 4,
    objectives: ['Build strength', 'Improve endurance'],
  };

  test('returns null for valid data', () => {
    const { result } = renderHookWithProvider();
    const validationError = result.current.validateRoutine(validData);
    expect(validationError).toBeNull();
  });

  test('returns error for missing name', () => {
    const { result } = renderHookWithProvider();
    const invalidData = { ...validData, name: '' };
    const validationError = result.current.validateRoutine(invalidData);
    expect(validationError).toBe('Routine name is required');
  });

  test('returns error for name too short', () => {
    const { result } = renderHookWithProvider();
    const invalidData = { ...validData, name: 'ab' };
    const validationError = result.current.validateRoutine(invalidData);
    expect(validationError).toBe('Routine name must be at least 3 characters');
  });

  test('returns error for name too long', () => {
    const { result } = renderHookWithProvider();
    const invalidData = { ...validData, name: 'a'.repeat(101) };
    const validationError = result.current.validateRoutine(invalidData);
    expect(validationError).toBe('Routine name must be at most 100 characters');
  });

  test('returns error for missing description', () => {
    const { result } = renderHookWithProvider();
    const invalidData = { ...validData, description: '' };
    const validationError = result.current.validateRoutine(invalidData);
    expect(validationError).toBe('Description is required');
  });

  test('returns error for description too short', () => {
    const { result } = renderHookWithProvider();
    const invalidData = { ...validData, description: 'short' };
    const validationError = result.current.validateRoutine(invalidData);
    expect(validationError).toBe('Description must be at least 10 characters');
  });

  test('returns error for description too long', () => {
    const { result } = renderHookWithProvider();
    const invalidData = { ...validData, description: 'a'.repeat(501) };
    const validationError = result.current.validateRoutine(invalidData);
    expect(validationError).toBe('Description must be at most 500 characters');
  });

  test('returns error for invalid duration', () => {
    const { result } = renderHookWithProvider();
    const invalidData = { ...validData, duration: 0 };
    const validationError = result.current.validateRoutine(invalidData);
    expect(validationError).toBe('Duration must be at least 1 week');
  });

  test('returns error for duration too high', () => {
    const { result } = renderHookWithProvider();
    const invalidData = { ...validData, duration: 53 };
    const validationError = result.current.validateRoutine(invalidData);
    expect(validationError).toBe('Duration must be at most 52 weeks');
  });

  test('returns error for empty objectives', () => {
    const { result } = renderHookWithProvider();
    const invalidData = { ...validData, objectives: [] };
    const validationError = result.current.validateRoutine(invalidData);
    expect(validationError).toBe('At least one objective is required');
  });

  test('returns first validation error when multiple errors exist', () => {
    const { result } = renderHookWithProvider();
    const invalidData = {
      ...validData,
      name: '',
      description: '',
      duration: 0,
    };
    const validationError = result.current.validateRoutine(invalidData);
    expect(validationError).toBe('Routine name is required');
  });
});
