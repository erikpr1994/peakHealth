import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <Accordion.Header>Is it accessible?</Accordion.Header>
      <Accordion.Content>
        Yes. It adheres to the WAI-ARIA design pattern.
      </Accordion.Content>
    </Accordion>
  ),
};
