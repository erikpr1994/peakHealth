import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the select is in an error state',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the select',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => (
    <Select {...args}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

export const WithError: Story = {
  args: {
    placeholder: 'Select an option',
    error: true,
  },
  render: (args) => (
    <Select {...args}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Select an option',
    disabled: true,
  },
  render: (args) => (
    <Select {...args}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
};

export const WithGroups: Story = {
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => (
    <Select {...args}>
      <optgroup label="Group 1">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </optgroup>
      <optgroup label="Group 2">
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </optgroup>
    </Select>
  ),
};

