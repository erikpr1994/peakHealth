import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from './alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'The variant of the alert',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default alert',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'This is a destructive alert',
  },
};

export const WithTitle: Story = {
  render: args => (
    <Alert {...args}>
      <AlertTitle>Alert Title</AlertTitle>
      {args.children}
    </Alert>
  ),
  args: {
    children: 'This is an alert with a title',
  },
};

export const WithDescription: Story = {
  render: args => (
    <Alert {...args}>
      <AlertDescription>{args.children}</AlertDescription>
    </Alert>
  ),
  args: {
    children: 'This is an alert with a description',
  },
};

export const Complete: Story = {
  render: args => (
    <Alert {...args}>
      <AlertTitle>Alert Title</AlertTitle>
      <AlertDescription>
        This is a complete alert with title and description.
      </AlertDescription>
    </Alert>
  ),
  args: {},
};

export const WithIcon: Story = {
  render: args => (
    <Alert {...args}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This is an alert with an icon, title, and description.
      </AlertDescription>
    </Alert>
  ),
  args: {},
};
