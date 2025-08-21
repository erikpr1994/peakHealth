import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './select';

const meta: Meta<typeof Select> = {
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
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
    children: [
      { type: 'option', props: { value: 'option1', children: 'Option 1' } },
      { type: 'option', props: { value: 'option2', children: 'Option 2' } },
      { type: 'option', props: { value: 'option3', children: 'Option 3' } },
    ],
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Select an option',
    error: true,
    children: [
      { type: 'option', props: { value: 'option1', children: 'Option 1' } },
      { type: 'option', props: { value: 'option2', children: 'Option 2' } },
      { type: 'option', props: { value: 'option3', children: 'Option 3' } },
    ],
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Select an option',
    disabled: true,
    children: [
      { type: 'option', props: { value: 'option1', children: 'Option 1' } },
      { type: 'option', props: { value: 'option2', children: 'Option 2' } },
      { type: 'option', props: { value: 'option3', children: 'Option 3' } },
    ],
  },
};

export const WithGroups: Story = {
  args: {
    placeholder: 'Select an option',
    children: [
      { 
        type: 'optgroup', 
        props: { 
          label: 'Group 1',
          children: [
            { type: 'option', props: { value: 'option1', children: 'Option 1' } },
            { type: 'option', props: { value: 'option2', children: 'Option 2' } },
          ]
        } 
      },
      { 
        type: 'optgroup', 
        props: { 
          label: 'Group 2',
          children: [
            { type: 'option', props: { value: 'option3', children: 'Option 3' } },
            { type: 'option', props: { value: 'option4', children: 'Option 4' } },
          ]
        } 
      },
    ],
  },
};

