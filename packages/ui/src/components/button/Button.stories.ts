import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'default',
        'destructive',
        'outline',
        'dashed',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    asChild: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Dashed: Story = {
  args: {
    variant: 'dashed',
    children: 'Dashed Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '🔍',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const WithIcon: Story = {
  args: {
    children: React.createElement(
      React.Fragment,
      null,
      React.createElement('span', null, 'Button with Icon'),
      React.createElement(
        'svg',
        {
          width: 16,
          height: 16,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
        },
        React.createElement('path', { d: 'M5 12h14M12 5l7 7-7 7' })
      )
    ),
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
          alignItems: 'flex-start',
        },
      },
      React.createElement(
        'div',
        { style: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' } },
        React.createElement(Button, { variant: 'primary' }, 'Primary'),
        React.createElement(Button, { variant: 'default' }, 'Default'),
        React.createElement(Button, { variant: 'destructive' }, 'Destructive'),
        React.createElement(Button, { variant: 'outline' }, 'Outline'),
        React.createElement(Button, { variant: 'dashed' }, 'Dashed'),
        React.createElement(Button, { variant: 'secondary' }, 'Secondary'),
        React.createElement(Button, { variant: 'ghost' }, 'Ghost'),
        React.createElement(Button, { variant: 'link' }, 'Link')
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' } },
        React.createElement(Button, { size: 'sm' }, 'Small'),
        React.createElement(Button, { size: 'default' }, 'Default'),
        React.createElement(Button, { size: 'lg' }, 'Large'),
        React.createElement(Button, { size: 'icon' }, '🔍')
      )
    ),
};
