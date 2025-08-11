import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    content: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    position: 'top',
    content: 'Tooltip on top',
    children: React.createElement('button', null, 'Hover me (top)'),
  },
};

export const Bottom: Story = {
  args: {
    position: 'bottom',
    content: 'Tooltip on bottom',
    children: React.createElement('button', null, 'Hover me (bottom)'),
  },
};

export const Left: Story = {
  args: {
    position: 'left',
    content: 'Tooltip on left',
    children: React.createElement('button', null, 'Hover me (left)'),
  },
};

export const Right: Story = {
  args: {
    position: 'right',
    content: 'Tooltip on right',
    children: React.createElement('button', null, 'Hover me (right)'),
  },
};

export const WithButton: Story = {
  args: {
    content: 'This is a helpful tooltip',
    children: React.createElement(
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
      'Button with Tooltip'
    ),
  },
};

export const WithIcon: Story = {
  args: {
    content: 'Click to save your changes',
    children: React.createElement(
      'button',
      {
        style: {
          width: '2rem',
          height: '2rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      '💾'
    ),
  },
};

export const AllPositions: Story = {
  render: () =>
    React.createElement(
      'div',
      {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          padding: '2rem',
          maxWidth: '600px',
        },
      },
      React.createElement(
        'div',
        { style: { textAlign: 'center' } },
        React.createElement(Tooltip, {
          position: 'top',
          content: 'Tooltip on top',
          children: React.createElement('button', {
            style: {
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              background: '#fff',
              cursor: 'pointer',
            },
            children: 'Top Tooltip',
          }),
        })
      ),
      React.createElement(
        'div',
        { style: { textAlign: 'center' } },
        React.createElement(Tooltip, {
          position: 'bottom',
          content: 'Tooltip on bottom',
          children: React.createElement('button', {
            style: {
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              background: '#fff',
              cursor: 'pointer',
            },
            children: 'Bottom Tooltip',
          }),
        })
      ),
      React.createElement(
        'div',
        { style: { textAlign: 'center' } },
        React.createElement(Tooltip, {
          position: 'left',
          content: 'Tooltip on left',
          children: React.createElement('button', {
            style: {
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              background: '#fff',
              cursor: 'pointer',
            },
            children: 'Left Tooltip',
          }),
        })
      ),
      React.createElement(
        'div',
        { style: { textAlign: 'center' } },
        React.createElement(Tooltip, {
          position: 'right',
          content: 'Tooltip on right',
          children: React.createElement('button', {
            style: {
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              background: '#fff',
              cursor: 'pointer',
            },
            children: 'Right Tooltip',
          }),
        })
      )
    ),
};
