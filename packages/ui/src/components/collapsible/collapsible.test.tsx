import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './collapsible';

// Mock ResizeObserver for tests
beforeAll(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

describe('Collapsible', () => {
  it('renders correctly', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    expect(screen.getByText('Toggle')).toBeInTheDocument();
  });

  it('applies custom className to components', () => {
    render(
      <Collapsible className="custom-collapsible" defaultOpen={true}>
        <CollapsibleTrigger className="custom-trigger">
          Toggle
        </CollapsibleTrigger>
        <CollapsibleContent className="custom-content">
          Content
        </CollapsibleContent>
      </Collapsible>
    );

    expect(screen.getByRole('button')).toHaveClass('custom-trigger');
    expect(screen.getByText('Content').parentElement).toHaveClass(
      'custom-content'
    );
    expect(
      screen.getByRole('button').closest('[data-slot="collapsible"]')
    ).toHaveClass('custom-collapsible');
  });

  it('toggles content visibility when trigger is clicked', () => {
    render(
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole('button');

    // Initially closed - content should not be in the document
    expect(screen.queryByText('Content')).toBeNull();

    // Click to open
    fireEvent.click(trigger);
    expect(screen.getByText('Content')).toBeInTheDocument();

    // Click to close
    fireEvent.click(trigger);

    // Content is removed after animation in our implementation
    // We can't easily test the animation timing in a unit test
    // So we'll just verify the aria-expanded attribute is set correctly
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('respects the defaultOpen prop', () => {
    render(
      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    // Content should be visible when defaultOpen is true
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('can be controlled externally with open prop', () => {
    const { rerender } = render(
      <Collapsible open={false}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    // Content should be hidden when open is false
    expect(screen.queryByText('Content')).toBeNull();
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    // Update the open prop
    rerender(
      <Collapsible open={true}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    // Content should be visible when open is true
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('forwards additional props to the underlying elements', () => {
    render(
      <Collapsible data-testid="collapsible-root" defaultOpen={true}>
        <CollapsibleTrigger data-testid="collapsible-trigger">
          Toggle
        </CollapsibleTrigger>
        <CollapsibleContent data-testid="collapsible-content">
          Content
        </CollapsibleContent>
      </Collapsible>
    );

    expect(screen.getByTestId('collapsible-root')).toBeInTheDocument();
    expect(screen.getByTestId('collapsible-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('collapsible-content')).toBeInTheDocument();
  });
});

