import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Toast, ToastProvider, useToast } from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default toast message',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success! Your changes have been saved.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error! Something went wrong. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning! Please review your input before proceeding.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info: This is an informational message.',
  },
};

export const WithoutCloseButton: Story = {
  args: {
    variant: 'success',
    showCloseButton: false,
    children: 'This toast cannot be manually closed',
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
          maxWidth: '400px',
        },
      },
      React.createElement(Toast, {
        variant: 'default',
        children: 'Default toast message',
      }),
      React.createElement(Toast, {
        variant: 'success',
        children: 'Success toast message',
      }),
      React.createElement(Toast, {
        variant: 'error',
        children: 'Error toast message',
      }),
      React.createElement(Toast, {
        variant: 'warning',
        children: 'Warning toast message',
      }),
      React.createElement(Toast, {
        variant: 'info',
        children: 'Info toast message',
      })
    ),
};

// Toast Provider Stories
const ToastDemo: React.FC = (): React.ReactElement => {
  const { showToast } = useToast();

  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1rem',
      },
    },
    React.createElement(
      'button',
      {
        onClick: () =>
          showToast({ message: 'Default toast message', variant: 'default' }),
        style: {
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
          background: '#fff',
          cursor: 'pointer',
        },
      },
      'Show Default Toast'
    ),
    React.createElement(
      'button',
      {
        onClick: () =>
          showToast({
            message: 'Success! Your changes have been saved.',
            variant: 'success',
          }),
        style: {
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
          background: '#fff',
          cursor: 'pointer',
        },
      },
      'Show Success Toast'
    ),
    React.createElement(
      'button',
      {
        onClick: () =>
          showToast({
            message: 'Error! Something went wrong. Please try again.',
            variant: 'error',
          }),
        style: {
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
          background: '#fff',
          cursor: 'pointer',
        },
      },
      'Show Error Toast'
    ),
    React.createElement(
      'button',
      {
        onClick: () =>
          showToast({
            message: 'Warning! Please review your input before proceeding.',
            variant: 'warning',
          }),
        style: {
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
          background: '#fff',
          cursor: 'pointer',
        },
      },
      'Show Warning Toast'
    ),
    React.createElement(
      'button',
      {
        onClick: () =>
          showToast({
            message: 'Info: This is an informational message.',
            variant: 'info',
          }),
        style: {
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
          background: '#fff',
          cursor: 'pointer',
        },
      },
      'Show Info Toast'
    ),
    React.createElement(
      'button',
      {
        onClick: () =>
          showToast({
            message: 'This toast will disappear in 2 seconds',
            variant: 'info',
            duration: 2000,
          }),
        style: {
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
          background: '#fff',
          cursor: 'pointer',
        },
      },
      'Show Short Duration Toast'
    ),
    React.createElement(
      'button',
      {
        onClick: () =>
          showToast({
            message: 'This toast will not auto-dismiss',
            variant: 'warning',
            duration: 0,
          }),
        style: {
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
          background: '#fff',
          cursor: 'pointer',
        },
      },
      'Show Persistent Toast'
    )
  );
};

export const ToastProviderDemo: Story = {
  render: () =>
    React.createElement(ToastProvider, null, React.createElement(ToastDemo)),
  parameters: {
    layout: 'fullscreen',
  },
};

export const MultipleToasts: Story = {
  render: () => {
    const MultipleToastDemo: React.FC = (): React.ReactElement => {
      const { showToast } = useToast();

      const showMultipleToasts = (): void => {
        showToast({ message: 'First toast message', variant: 'info' });
        setTimeout(
          () =>
            showToast({ message: 'Second toast message', variant: 'success' }),
          500
        );
        setTimeout(
          () =>
            showToast({ message: 'Third toast message', variant: 'warning' }),
          1000
        );
        setTimeout(
          () =>
            showToast({ message: 'Fourth toast message', variant: 'error' }),
          1500
        );
      };

      return React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '1rem',
          },
        },
        React.createElement(
          'button',
          {
            onClick: showMultipleToasts,
            style: {
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              background: '#fff',
              cursor: 'pointer',
            },
          },
          'Show Multiple Toasts'
        )
      );
    };

    return React.createElement(
      ToastProvider,
      null,
      React.createElement(MultipleToastDemo)
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const LongMessage: Story = {
  args: {
    variant: 'info',
    children:
      'This is a very long toast message that demonstrates how the component handles text that wraps to multiple lines. The toast should expand vertically to accommodate the content while maintaining proper spacing and readability.',
  },
};

export const WithCustomStyling: Story = {
  args: {
    variant: 'success',
    className: 'custom-toast',
    children: 'Toast with custom styling',
  },
  parameters: {
    docs: {
      description: {
        story: 'This toast uses a custom CSS class for additional styling.',
      },
    },
  },
};
