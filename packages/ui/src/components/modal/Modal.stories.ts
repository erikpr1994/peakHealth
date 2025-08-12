import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Modal } from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
    title: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Example Modal',
    children: React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        },
      },
      React.createElement(
        'p',
        null,
        'This is an example modal with some content. You can put any content here.'
      ),
      React.createElement(
        'p',
        null,
        'The modal has a blurry backdrop and prevents background scrolling when open.'
      ),
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'flex-end',
          },
        },
        React.createElement(
          'button',
          {
            style: {
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              background: '#fff',
              cursor: 'pointer',
            },
          },
          'Cancel'
        ),
        React.createElement(
          'button',
          {
            style: {
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.25rem',
              background: '#007bff',
              color: '#fff',
              cursor: 'pointer',
            },
          },
          'Save'
        )
      )
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    isOpen: true,
    children: React.createElement(
      'div',
      {
        style: {
          textAlign: 'center',
          padding: '2rem',
        },
      },
      React.createElement(
        'h2',
        {
          style: {
            marginBottom: '1rem',
          },
        },
        'No Title Modal'
      ),
      React.createElement(
        'p',
        null,
        "This modal doesn't have a title prop, so no header is shown."
      )
    ),
  },
};

export const WithoutCloseButton: Story = {
  args: {
    isOpen: true,
    showCloseButton: false,
    title: 'Modal Without Close Button',
    children: React.createElement(
      'div',
      {
        style: {
          textAlign: 'center',
          padding: '2rem',
        },
      },
      React.createElement(
        'p',
        null,
        "This modal doesn't have a close button. You can still close it by clicking the backdrop or pressing Escape."
      )
    ),
  },
};

export const LongContent: Story = {
  args: {
    isOpen: true,
    title: 'Modal with Long Content',
    children: React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        },
      },
      Array.from({ length: 20 }, (_, i) =>
        React.createElement(
          'p',
          {
            key: i,
            style: {
              padding: '1rem',
              background: i % 2 === 0 ? '#f8f9fa' : '#e9ecef',
              borderRadius: '0.25rem',
            },
          },
          `This is paragraph ${i + 1} of 20. The modal content area will scroll when the content exceeds the available height.`
        )
      )
    ),
  },
};

export const FormContent: Story = {
  args: {
    isOpen: true,
    title: 'User Profile Form',
    children: React.createElement(
      'form',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
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
          'Name'
        ),
        React.createElement('input', {
          type: 'text',
          placeholder: 'Enter your name',
          style: {
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
          },
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
          'Email'
        ),
        React.createElement('input', {
          type: 'email',
          placeholder: 'Enter your email',
          style: {
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
          },
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
          'Bio'
        ),
        React.createElement('textarea', {
          placeholder: 'Tell us about yourself',
          rows: 4,
          style: {
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '0.25rem',
            resize: 'vertical',
          },
        })
      ),
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'flex-end',
            marginTop: '1rem',
          },
        },
        React.createElement(
          'button',
          {
            type: 'button',
            style: {
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              background: '#fff',
              cursor: 'pointer',
            },
          },
          'Cancel'
        ),
        React.createElement(
          'button',
          {
            type: 'submit',
            style: {
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.25rem',
              background: '#007bff',
              color: '#fff',
              cursor: 'pointer',
            },
          },
          'Save Profile'
        )
      )
    ),
  },
};
