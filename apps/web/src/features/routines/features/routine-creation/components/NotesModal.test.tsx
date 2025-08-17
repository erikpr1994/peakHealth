import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RoutineNotesModal from './NotesModal';
import { NotesProvider } from '../context/NotesContext';

// Mock the NotesModal component
vi.mock('@/components/shared/NotesModal', () => ({
  default: ({
    isOpen,
    onClose,
    onSave,
    initialNotes,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (notes: string) => void;
    initialNotes: string;
  }): React.ReactElement => (
    <div data-testid="notes-modal">
      <span data-testid="modal-open">{isOpen.toString()}</span>
      <span data-testid="initial-notes">{initialNotes}</span>
      <button onClick={onClose}>Close</button>
      <button onClick={() => onSave('New notes')}>Save</button>
    </div>
  ),
}));

describe('RoutineNotesModal', () => {
  it('should render the notes modal', () => {
    const mockOnNotesSave = vi.fn();

    render(
      <NotesProvider onNotesSave={mockOnNotesSave}>
        <RoutineNotesModal />
      </NotesProvider>
    );

    expect(screen.getByTestId('notes-modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-open')).toHaveTextContent('false');
    expect(screen.getByTestId('initial-notes')).toHaveTextContent('');
  });

  it('should handle modal state correctly', () => {
    const mockOnNotesSave = vi.fn();

    render(
      <NotesProvider onNotesSave={mockOnNotesSave}>
        <RoutineNotesModal />
      </NotesProvider>
    );

    // Modal should be closed by default
    expect(screen.getByTestId('modal-open')).toHaveTextContent('false');
  });
});
