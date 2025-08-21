import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './collapsible';

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
    expect(screen.getByText('Content')).toHaveClass('custom-content');
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
    expect(screen.queryByText('Content')).toBeNull();
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

    // Update the open prop
    rerender(
      <Collapsible open={true}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    // Content should be visible when open is true
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('forwards additional props to the underlying elements', () => {
    render(
      <Collapsible data-testid="collapsible-root">
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
