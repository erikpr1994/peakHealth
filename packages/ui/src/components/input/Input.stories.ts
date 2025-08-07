import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Sample text',
    placeholder: 'Enter text...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email...',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password...',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number...',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    placeholder: 'This field has an error',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
};

export const AllVariants: Story = {
  render: () =>
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '300px',
        },
      },
      React.createElement(Input, { placeholder: 'Default input' }),
      React.createElement(Input, { type: 'email', placeholder: 'Email input' }),
      React.createElement(Input, {
        type: 'password',
        placeholder: 'Password input',
      }),
      React.createElement(Input, {
        variant: 'error',
        placeholder: 'Error input',
      }),
      React.createElement(Input, {
        disabled: true,
        placeholder: 'Disabled input',
      })
    ),
};

export const WithLabels: Story = {
  render: () =>
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '300px',
        },
      },
      React.createElement(
        'div',
        null,
        React.createElement(
          'label',
          {
            style: {
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
            },
          },
          'Email Address'
        ),
        React.createElement(Input, {
          type: 'email',
          placeholder: 'Enter your email',
        })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'label',
          {
            style: {
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
            },
          },
          'Password'
        ),
        React.createElement(Input, {
          type: 'password',
          placeholder: 'Enter your password',
        })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'label',
          {
            style: {
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
            },
          },
          'Confirm Password'
        ),
        React.createElement(Input, {
          type: 'password',
          variant: 'error',
          placeholder: "Passwords don't match",
        })
      )
    ),
};
