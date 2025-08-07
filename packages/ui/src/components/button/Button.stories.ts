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
        'nav',
        'nav-selected',
        'nav-unselected',
        'action',
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

export const Nav: Story = {
  args: {
    variant: 'nav',
    children: 'Navigation Button',
  },
};

export const NavSelected: Story = {
  args: {
    variant: 'nav-selected',
    children: 'Selected Nav',
  },
};

export const NavUnselected: Story = {
  args: {
    variant: 'nav-unselected',
    children: 'Unselected Nav',
  },
};

export const Action: Story = {
  args: {
    variant: 'action',
    children: 'Action Button',
  },
};

export const SignInButton: Story = {
  args: {
    variant: 'primary',
    children: 'Sign in',
  },
};

export const StartWorkoutButton: Story = {
  args: {
    variant: 'primary',
    children: React.createElement(
      React.Fragment,
      null,
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
        React.createElement('polygon', { points: '5,3 19,12 5,21' })
      ),
      'Start Workout'
    ),
  },
};

export const SaveCancelButtons: Story = {
  render: () =>
    React.createElement(
      'div',
      { style: { display: 'flex', gap: '0.5rem' } },
      React.createElement(Button, {
        variant: 'primary',
        children: React.createElement(
          React.Fragment,
          null,
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
            React.createElement('path', {
              d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z',
            }),
            React.createElement('polyline', {
              points: '17,21 17,13 7,13 7,21',
            }),
            React.createElement('polyline', { points: '7,3 7,8 15,8' })
          ),
          'Save Changes'
        ),
      }),
      React.createElement(Button, { variant: 'secondary' }, 'Cancel')
    ),
};

export const NavigationExample: Story = {
  render: () =>
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          gap: '0.25rem',
          padding: '1rem',
          backgroundColor: 'white',
        },
      },
      React.createElement(Button, {
        variant: 'nav-selected',
        children: React.createElement(
          React.Fragment,
          null,
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
            React.createElement('path', {
              d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
            }),
            React.createElement('polyline', { points: '9,22 9,12 15,12 15,22' })
          ),
          'Dashboard'
        ),
      }),
      React.createElement(Button, {
        variant: 'nav',
        children: React.createElement(
          React.Fragment,
          null,
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
            React.createElement('path', {
              d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
            }),
            React.createElement('polyline', { points: '14,2 14,8 20,8' }),
            React.createElement('line', {
              x1: '16',
              y1: '13',
              x2: '8',
              y2: '13',
            }),
            React.createElement('line', {
              x1: '16',
              y1: '17',
              x2: '8',
              y2: '17',
            }),
            React.createElement('polyline', { points: '10,9 9,9 8,9' })
          ),
          'Routines'
        ),
      }),
      React.createElement(Button, {
        variant: 'nav-unselected',
        children: React.createElement(
          React.Fragment,
          null,
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
            React.createElement('path', { d: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6' }),
            React.createElement('path', { d: 'M6 2v2' }),
            React.createElement('path', { d: 'M6 11H4.5a2.5 2.5 0 0 0 0 5H6' }),
            React.createElement('path', { d: 'M6 22v-2' }),
            React.createElement('path', { d: 'M2 6h2' }),
            React.createElement('path', { d: 'M11 6h1' }),
            React.createElement('path', { d: 'M20 6h2' }),
            React.createElement('path', { d: 'M2 18h2' }),
            React.createElement('path', { d: 'M11 18h1' }),
            React.createElement('path', { d: 'M20 18h2' })
          ),
          'Exercises'
        ),
      })
    ),
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
        React.createElement(Button, { variant: 'link' }, 'Link'),
        React.createElement(Button, { variant: 'action' }, 'Action')
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' } },
        React.createElement(Button, { variant: 'nav' }, 'Navigation'),
        React.createElement(Button, { variant: 'nav-selected' }, 'Selected'),
        React.createElement(Button, { variant: 'nav-unselected' }, 'Unselected')
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
