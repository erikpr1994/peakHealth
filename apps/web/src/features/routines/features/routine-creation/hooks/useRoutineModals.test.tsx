import { describe, test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRoutineModals } from './useRoutineModals';
import { NotesContext, ExerciseModalContext } from '../types/modal';

describe('useRoutineModals', () => {
  test('should initialize with no modal open', () => {
    const { result } = renderHook(() => useRoutineModals());

    expect(result.current.isModalOpen('exercise')).toBe(false);
    expect(result.current.isModalOpen('notes')).toBe(false);
    expect(result.current.getModalContext('exercise')).toBeNull();
    expect(result.current.getModalContext('notes')).toBeNull();
  });

  test('should open exercise modal with context', () => {
    const { result } = renderHook(() => useRoutineModals());
    const exerciseContext: ExerciseModalContext = {
      workoutId: 'workout-1',
      sectionId: 'section-1',
    };

    act(() => {
      result.current.openModal('exercise', exerciseContext);
    });

    expect(result.current.isModalOpen('exercise')).toBe(true);
    expect(result.current.isModalOpen('notes')).toBe(false);
    expect(result.current.getModalContext('exercise')).toEqual(exerciseContext);
    expect(result.current.getModalContext('notes')).toBeNull();
  });

  test('should open notes modal with context', () => {
    const { result } = renderHook(() => useRoutineModals());
    const notesContext: NotesContext = {
      type: 'exercise',
      workoutId: 'workout-1',
      sectionId: 'section-1',
      exerciseId: 'exercise-1',
      currentNotes: 'Test notes',
    };

    act(() => {
      result.current.openModal('notes', notesContext);
    });

    expect(result.current.isModalOpen('notes')).toBe(true);
    expect(result.current.isModalOpen('exercise')).toBe(false);
    expect(result.current.getModalContext('notes')).toEqual(notesContext);
    expect(result.current.getModalContext('exercise')).toBeNull();
  });

  test('should close modal and clear context', () => {
    const { result } = renderHook(() => useRoutineModals());
    const exerciseContext: ExerciseModalContext = {
      workoutId: 'workout-1',
      sectionId: 'section-1',
    };

    // Open modal first
    act(() => {
      result.current.openModal('exercise', exerciseContext);
    });

    expect(result.current.isModalOpen('exercise')).toBe(true);

    // Close modal
    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isModalOpen('exercise')).toBe(false);
    expect(result.current.isModalOpen('notes')).toBe(false);
    expect(result.current.getModalContext('exercise')).toBeNull();
    expect(result.current.getModalContext('notes')).toBeNull();
  });

  test('should replace modal when opening a different type', () => {
    const { result } = renderHook(() => useRoutineModals());
    const exerciseContext: ExerciseModalContext = {
      workoutId: 'workout-1',
      sectionId: 'section-1',
    };
    const notesContext: NotesContext = {
      type: 'exercise',
      workoutId: 'workout-1',
      sectionId: 'section-1',
      exerciseId: 'exercise-1',
      currentNotes: 'Test notes',
    };

    // Open exercise modal first
    act(() => {
      result.current.openModal('exercise', exerciseContext);
    });

    expect(result.current.isModalOpen('exercise')).toBe(true);
    expect(result.current.getModalContext('exercise')).toEqual(exerciseContext);

    // Open notes modal - should replace exercise modal
    act(() => {
      result.current.openModal('notes', notesContext);
    });

    expect(result.current.isModalOpen('exercise')).toBe(false);
    expect(result.current.isModalOpen('notes')).toBe(true);
    expect(result.current.getModalContext('exercise')).toBeNull();
    expect(result.current.getModalContext('notes')).toEqual(notesContext);
  });

  test('should handle multiple open/close operations', () => {
    const { result } = renderHook(() => useRoutineModals());
    const exerciseContext: ExerciseModalContext = {
      workoutId: 'workout-1',
      sectionId: 'section-1',
    };

    // Open and close exercise modal
    act(() => {
      result.current.openModal('exercise', exerciseContext);
    });
    expect(result.current.isModalOpen('exercise')).toBe(true);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen('exercise')).toBe(false);

    // Open and close again
    act(() => {
      result.current.openModal('exercise', exerciseContext);
    });
    expect(result.current.isModalOpen('exercise')).toBe(true);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen('exercise')).toBe(false);
  });

  test('should maintain referential stability of functions', () => {
    const { result, rerender } = renderHook(() => useRoutineModals());

    const initialOpenModal = result.current.openModal;
    const initialCloseModal = result.current.closeModal;
    const initialIsModalOpen = result.current.isModalOpen;
    const initialGetModalContext = result.current.getModalContext;

    rerender();

    expect(result.current.openModal).toBe(initialOpenModal);
    expect(result.current.closeModal).toBe(initialCloseModal);
    expect(result.current.isModalOpen).toBe(initialIsModalOpen);
    expect(result.current.getModalContext).toBe(initialGetModalContext);
  });
});
