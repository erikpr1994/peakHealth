import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Dialog, DialogFooter } from './dialog';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the showModal method since jsdom doesn't implement it
HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

describe('Dialog', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(
      <Dialog open title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>
    );

    expect(screen.getByText('Dialog content')).toBeInTheDocument();
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it('does not render when closed', () => {
    render(
      <Dialog open={false} title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>
    );

    // Dialog element is in the DOM but not shown
    const dialog = document.querySelector('dialog');
    expect(dialog).toBeInTheDocument();
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Dialog open title="Test Dialog" onClose={onClose}>
        <p>Dialog content</p>
      </Dialog>
    );

    const closeButton = screen.getByLabelText('Close dialog');
    fireEvent.click(closeButton);

    // Wait for animation to complete
    await waitFor(
      () => {
        expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
      },
      { timeout: 300 }
    );
  });

  it('does not show close button when showCloseButton is false', () => {
    render(
      <Dialog open title="Test Dialog" showCloseButton={false}>
        <p>Dialog content</p>
      </Dialog>
    );

    expect(screen.queryByLabelText('Close dialog')).not.toBeInTheDocument();
  });

  it('applies fullscreen class when fullscreen prop is true', () => {
    render(
      <Dialog open fullscreen title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>
    );

    const dialogElement = document.querySelector('dialog');
    expect(dialogElement).toHaveClass('dialog--fullscreen');
  });

  it('applies custom className to dialog', () => {
    render(
      <Dialog open className="custom-dialog" title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>
    );

    const dialogElement = document.querySelector('dialog');
    expect(dialogElement).toHaveClass('custom-dialog');
  });

  it('applies custom contentClassName to content', () => {
    render(
      <Dialog open contentClassName="custom-content" title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>
    );

    expect(screen.getByText('Dialog content').parentElement).toHaveClass(
      'custom-content'
    );
  });

  it('does not render title section when title is not provided', () => {
    render(
      <Dialog open>
        <p>Dialog content</p>
      </Dialog>
    );

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Close dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Dialog open title="Test Dialog" onClose={onClose}>
        <p>Dialog content</p>
      </Dialog>
    );

    const dialog = document.querySelector('dialog');
    if (!dialog) throw new Error('Dialog element not found');

    // Simulate a click outside the dialog content
    const rect = {
      left: 100,
      right: 400,
      top: 100,
      bottom: 400,
      width: 300,
      height: 300,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    } as DOMRect;
    dialog.getBoundingClientRect = vi.fn(() => rect);

    // Click outside the dialog boundaries
    fireEvent.click(dialog, { clientX: 50, clientY: 50 });

    // Wait for animation to complete
    await waitFor(
      () => {
        expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
      },
      { timeout: 300 }
    );
  });

  it('does not call onClose when clicking inside dialog content', () => {
    const onClose = vi.fn();
    render(
      <Dialog open title="Test Dialog" onClose={onClose}>
        <p>Dialog content</p>
      </Dialog>
    );

    const dialog = document.querySelector('dialog');
    if (!dialog) throw new Error('Dialog element not found');

    // Simulate a click inside the dialog content
    const rect = {
      left: 100,
      right: 400,
      top: 100,
      bottom: 400,
      width: 300,
      height: 300,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    } as DOMRect;
    dialog.getBoundingClientRect = vi.fn(() => rect);

    // Click inside the dialog boundaries
    fireEvent.click(dialog, { clientX: 200, clientY: 200 });

    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('DialogFooter', () => {
  it('renders correctly with children', () => {
    render(
      <DialogFooter>
        <button>Cancel</button>
        <button>Submit</button>
      </DialogFooter>
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <DialogFooter className="custom-footer">
        <button>Cancel</button>
      </DialogFooter>
    );

    const footer = screen.getByText('Cancel').parentElement;
    expect(footer).toHaveClass('dialog__footer');
    expect(footer).toHaveClass('custom-footer');
  });
});
