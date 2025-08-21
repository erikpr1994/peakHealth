import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './radio';

const meta = {
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
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

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

// Using a separate meta for RadioGroup
const radioGroupMeta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

type RadioGroupStory = StoryObj<typeof radioGroupMeta>;

export const RadioGroupExample: RadioGroupStory = {
  args: {
    name: 'radio-group-example',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
  },
  render: (args) => <RadioGroup {...args} />,
};

