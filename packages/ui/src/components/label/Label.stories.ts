import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the label is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the label is in an error state',
    },
    required: {
      control: 'boolean',
      description: 'Whether the label is for a required field',
    },
    optional: {
      control: 'boolean',
      description: 'Whether to show the optional text',
    },
    htmlFor: {
      control: 'text',
      description: 'The ID of the form element the label is for',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const Required: Story = {
  args: {
    children: 'Required Field',
    required: true,
  },
};

export const Optional: Story = {
  args: {
    children: 'Optional Field',
    optional: true,
  },
};

export const WithError: Story = {
  args: {
    children: 'Error Field',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Field',
    disabled: true,
  },
};

export const WithHtmlFor: Story = {
  args: {
    children: 'Username',
    htmlFor: 'username',
  },
};

