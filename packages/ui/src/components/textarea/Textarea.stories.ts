import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the textarea is in an error state',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    rows: {
      control: 'number',
      description: 'Number of rows to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Type your message here...',
    rows: 4,
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Type your message here...',
    rows: 4,
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is a pre-filled textarea with some content that the user can edit.',
    rows: 4,
  },
};

