import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input is in an error state',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'time', 'file'],
      description: 'The type of the input',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
    disabled: true,
  },
};

export const Email: Story = {
  args: {
    placeholder: 'Enter email...',
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Enter password...',
    type: 'password',
  },
};

export const Number: Story = {
  args: {
    placeholder: 'Enter number...',
    type: 'number',
  },
};

export const Date: Story = {
  args: {
    type: 'date',
  },
};

export const File: Story = {
  args: {
    type: 'file',
  },
};

