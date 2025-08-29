import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import { describe, it } from 'vitest';
import * as stories from './Accordion.stories';

const { Default } = composeStories(stories);

describe('Accordion Stories', () => {
  it('should render the default story', () => {
    render(<Default />);
    screen.getByText('Is it accessible?');
    screen.getByText('Yes. It adheres to the WAI-ARIA design pattern.');
  });
});
