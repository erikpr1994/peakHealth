import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked by default',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    children: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    children: 'Checked checkbox',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled checkbox',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    children: 'Disabled checked checkbox',
  },
};

export const WithLongLabel: Story = {
  args: {
    children: 'This is a checkbox with a very long label that wraps to multiple lines to demonstrate how the component handles longer text content.',
  },
};

