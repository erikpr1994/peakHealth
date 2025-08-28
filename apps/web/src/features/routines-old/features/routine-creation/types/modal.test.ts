import { describe, test, expect } from 'vitest';
import {
  NotesContext,
  ExerciseModalContext,
  ModalType,
  ModalContext,
  ModalState,
} from './modal';

describe('Modal Types', () => {
  describe('NotesContext', () => {
    test('should have correct structure for exercise notes', () => {
      const notesContext: NotesContext = {
        type: 'exercise',
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        currentNotes: 'Test exercise notes',
      };

      expect(notesContext.type).toBe('exercise');
      expect(notesContext.workoutId).toBe('workout-1');
      expect(notesContext.sectionId).toBe('section-1');
      expect(notesContext.exerciseId).toBe('exercise-1');
      expect(notesContext.currentNotes).toBe('Test exercise notes');
      expect(notesContext.setId).toBeUndefined();
    });

    test('should have correct structure for set notes', () => {
      const notesContext: NotesContext = {
        type: 'set',
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        setId: 'set-1',
        currentNotes: 'Test set notes',
      };

      expect(notesContext.type).toBe('set');
      expect(notesContext.setId).toBe('set-1');
    });
  });

  describe('ExerciseModalContext', () => {
    test('should have correct structure', () => {
      const exerciseContext: ExerciseModalContext = {
        workoutId: 'workout-1',
        sectionId: 'section-1',
      };

      expect(exerciseContext.workoutId).toBe('workout-1');
      expect(exerciseContext.sectionId).toBe('section-1');
    });
  });

  describe('ModalType', () => {
    test('should accept valid modal types', () => {
      const exerciseType: ModalType = 'exercise';
      const notesType: ModalType = 'notes';

      expect(exerciseType).toBe('exercise');
      expect(notesType).toBe('notes');
    });

    test('should be a union type', () => {
      const types: ModalType[] = ['exercise', 'notes'];
      expect(types).toHaveLength(2);
      expect(types).toContain('exercise');
      expect(types).toContain('notes');
    });
  });

  describe('ModalContext', () => {
    test('should have correct structure for exercise context', () => {
      const modalContext: ModalContext = {
        exercise: {
          workoutId: 'workout-1',
          sectionId: 'section-1',
        },
        notes: {
          type: 'exercise',
          workoutId: 'workout-1',
          sectionId: 'section-1',
          exerciseId: 'exercise-1',
          currentNotes: 'Test notes',
        },
      };

      expect(modalContext.exercise).toBeDefined();
      expect(modalContext.exercise.workoutId).toBe('workout-1');
      expect(modalContext.notes).toBeDefined();
      expect(modalContext.notes.type).toBe('exercise');
    });
  });

  describe('ModalState', () => {
    test('should have correct structure when no modal is open', () => {
      const modalState: ModalState = {
        modal: null,
        context: null,
      };

      expect(modalState.modal).toBeNull();
      expect(modalState.context).toBeNull();
    });

    test('should have correct structure when exercise modal is open', () => {
      const modalState: ModalState = {
        modal: 'exercise',
        context: {
          workoutId: 'workout-1',
          sectionId: 'section-1',
        },
      };

      expect(modalState.modal).toBe('exercise');
      expect(modalState.context).toBeDefined();
      expect(modalState.context).toHaveProperty('workoutId');
      expect(modalState.context).toHaveProperty('sectionId');
    });

    test('should have correct structure when notes modal is open', () => {
      const modalState: ModalState = {
        modal: 'notes',
        context: {
          type: 'exercise',
          workoutId: 'workout-1',
          sectionId: 'section-1',
          exerciseId: 'exercise-1',
          currentNotes: 'Test notes',
        },
      };

      expect(modalState.modal).toBe('notes');
      expect(modalState.context).toBeDefined();
      expect(modalState.context).toHaveProperty('type');
      expect(modalState.context).toHaveProperty('currentNotes');
    });
  });

  describe('Type Compatibility', () => {
    test('should allow ModalContext to be used with ModalState', () => {
      const exerciseContext: ModalContext['exercise'] = {
        workoutId: 'workout-1',
        sectionId: 'section-1',
      };

      const notesContext: ModalContext['notes'] = {
        type: 'exercise',
        workoutId: 'workout-1',
        sectionId: 'section-1',
        exerciseId: 'exercise-1',
        currentNotes: 'Test notes',
      };

      // This should compile without errors
      const exerciseState: ModalState = {
        modal: 'exercise',
        context: exerciseContext,
      };

      const notesState: ModalState = {
        modal: 'notes',
        context: notesContext,
      };

      expect(exerciseState.modal).toBe('exercise');
      expect(notesState.modal).toBe('notes');
    });
  });
});
