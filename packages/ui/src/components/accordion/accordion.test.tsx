import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Accordion } from './';

describe('Accordion', () => {
  it('should render the header and content', () => {
    render(
      <Accordion>
        <Accordion.Header>Header</Accordion.Header>
        <Accordion.Content>Content</Accordion.Content>
      </Accordion>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
