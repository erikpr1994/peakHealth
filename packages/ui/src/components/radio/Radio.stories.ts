import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio is checked',
    },
    name: {
      control: 'text',
      description: 'The name of the radio',
    },
    value: {
      control: 'text',
      description: 'The value of the radio',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    name: 'radio-example',
    value: 'option1',
    children: 'Option 1',
  },
};

export const Checked: Story = {
  args: {
    name: 'radio-example',
    value: 'option1',
    checked: true,
    children: 'Option 1',
  },
};

export const Disabled: Story = {
  args: {
    name: 'radio-example',
    value: 'option1',
    disabled: true,
    children: 'Option 1',
  },
};

export const DisabledChecked: Story = {
  args: {
    name: 'radio-example',
    value: 'option1',
    disabled: true,
    checked: true,
    children: 'Option 1',
  },
};

export const WithLabel: Story = {
  args: {
    name: 'radio-example',
    value: 'option1',
    children: 'Radio with a longer label that wraps to multiple lines to demonstrate how the component handles longer text content',
  },
};

export const RadioGroupExample: StoryObj<typeof RadioGroup> = {
  args: {
    name: 'radio-group-example',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
  },
};

