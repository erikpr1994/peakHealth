import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useRoutineDetails } from './useRoutineDetails';

describe('useRoutineDetails', () => {
  it('should initialize with default values when no initial data is provided', () => {
    const { result } = renderHook(() => useRoutineDetails());

    expect(result.current.name).toBe('');
    expect(result.current.difficulty).toBe('Beginner');
    expect(result.current.goal).toBe('Strength');
    expect(result.current.description).toBe('');
    expect(result.current.objectives).toEqual([]);
    expect(result.current.duration).toBe(12);
  });

  it('should initialize with provided initial data', () => {
    const initialData = {
      name: 'Test Routine',
      difficulty: 'Advanced',
      goal: 'Hypertrophy',
      description: 'Test description',
      objectives: ['Objective 1', 'Objective 2'],
      duration: 8,
    };

    const { result } = renderHook(() => useRoutineDetails(initialData));

    expect(result.current.name).toBe('Test Routine');
    expect(result.current.difficulty).toBe('Advanced');
    expect(result.current.goal).toBe('Hypertrophy');
    expect(result.current.description).toBe('Test description');
    expect(result.current.objectives).toEqual(['Objective 1', 'Objective 2']);
    expect(result.current.duration).toBe(8);
  });

  it('should update individual fields correctly', () => {
    const { result } = renderHook(() => useRoutineDetails());

    act(() => {
      result.current.setName('New Name');
    });
    expect(result.current.name).toBe('New Name');

    act(() => {
      result.current.setDifficulty('Intermediate');
    });
    expect(result.current.difficulty).toBe('Intermediate');

    act(() => {
      result.current.setGoal('Endurance');
    });
    expect(result.current.goal).toBe('Endurance');

    act(() => {
      result.current.setDescription('New description');
    });
    expect(result.current.description).toBe('New description');

    act(() => {
      result.current.setObjectives(['New objective']);
    });
    expect(result.current.objectives).toEqual(['New objective']);

    act(() => {
      result.current.setDuration(16);
    });
    expect(result.current.duration).toBe(16);
  });

  it('should update multiple fields with updateRoutineDetails', () => {
    const { result } = renderHook(() => useRoutineDetails());

    act(() => {
      result.current.updateRoutineDetails({
        name: 'Updated Name',
        difficulty: 'Advanced',
        goal: 'Weight Loss',
      });
    });

    expect(result.current.name).toBe('Updated Name');
    expect(result.current.difficulty).toBe('Advanced');
    expect(result.current.goal).toBe('Weight Loss');
    // Other fields should remain unchanged
    expect(result.current.description).toBe('');
    expect(result.current.objectives).toEqual([]);
    expect(result.current.duration).toBe(12);
  });

  it('should reset all fields to default values', () => {
    const initialData = {
      name: 'Test Routine',
      difficulty: 'Advanced',
      goal: 'Hypertrophy',
      description: 'Test description',
      objectives: ['Objective 1'],
      duration: 8,
    };

    const { result } = renderHook(() => useRoutineDetails(initialData));

    act(() => {
      result.current.resetRoutineDetails();
    });

    expect(result.current.name).toBe('');
    expect(result.current.difficulty).toBe('Beginner');
    expect(result.current.goal).toBe('Strength');
    expect(result.current.description).toBe('');
    expect(result.current.objectives).toEqual([]);
    expect(result.current.duration).toBe(12);
  });

  it('should return all details as an object', () => {
    const initialData = {
      name: 'Test Routine',
      difficulty: 'Intermediate',
      goal: 'Endurance',
      description: 'Test description',
      objectives: ['Objective 1', 'Objective 2'],
      duration: 10,
    };

    const { result } = renderHook(() => useRoutineDetails(initialData));

    const details = result.current.getRoutineDetails();

    expect(details).toEqual({
      name: 'Test Routine',
      difficulty: 'Intermediate',
      goal: 'Endurance',
      description: 'Test description',
      objectives: ['Objective 1', 'Objective 2'],
      duration: 10,
    });
  });
});
