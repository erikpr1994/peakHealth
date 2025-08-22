import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Dialog, DialogFooter } from './dialog';
import './dialog.css';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
    fullscreen: {
      control: { type: 'boolean' },
    },
    title: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to manage dialog state
const DialogExample = (args: React.ComponentProps<typeof Dialog>) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
        }}
      >
        Open Dialog
      </button>

      <Dialog {...args} open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Default: Story = {
  render: args => <DialogExample {...args} />,
  args: {
    title: 'Example Dialog',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>
          This is an example dialog with some content. You can put any content
          here.
        </p>
        <p>
          The dialog uses the native HTML dialog element with CSS animations and
          styling.
        </p>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  render: args => <DialogExample {...args} />,
  args: {
    title: 'Dialog with Footer',
    children: (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p>This dialog includes a footer with action buttons.</p>
          <p>The footer is separated from the content with a border.</p>
        </div>
        <DialogFooter>
          <button
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.25rem',
              background: '#3b82f6',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </DialogFooter>
      </>
    ),
  },
};

export const WithoutTitle: Story = {
  render: args => <DialogExample {...args} />,
  args: {
    children: (
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>No Title Dialog</h2>
        <p>This dialog doesn't have a title prop, so no header is shown.</p>
      </div>
    ),
  },
};

export const WithoutCloseButton: Story = {
  render: args => <DialogExample {...args} />,
  args: {
    showCloseButton: false,
    title: 'Dialog Without Close Button',
    children: (
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <p>
          This dialog doesn't have a close button. You can still close it by
          clicking outside or pressing Escape.
        </p>
      </div>
    ),
  },
};

export const Fullscreen: Story = {
  render: args => <DialogExample {...args} />,
  args: {
    fullscreen: true,
    title: 'Fullscreen Dialog',
    children: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        <p>This dialog takes up the full screen.</p>
        <p>
          It's useful for mobile views or when you need to display a lot of
          content.
        </p>
      </div>
    ),
  },
};

export const LongContent: Story = {
  render: args => <DialogExample {...args} />,
  args: {
    title: 'Dialog with Long Content',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p
            key={i}
            style={{
              padding: '1rem',
              background: i % 2 === 0 ? '#f8f9fa' : '#e9ecef',
              borderRadius: '0.25rem',
            }}
          >
            {`This is paragraph ${i + 1} of 20. The dialog content area will scroll when the content exceeds the available height.`}
          </p>
        ))}
      </div>
    ),
  },
};

export const FormContent: Story = {
  render: args => <DialogExample {...args} />,
  args: {
    title: 'User Profile Form',
    children: (
      <>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
          onSubmit={e => e.preventDefault()}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
              }}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '0.25rem',
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '0.25rem',
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
              }}
            >
              Bio
            </label>
            <textarea
              placeholder="Tell us about yourself"
              rows={4}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '0.25rem',
                resize: 'vertical',
              }}
            />
          </div>
        </form>
        <DialogFooter>
          <button
            type="button"
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.25rem',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.25rem',
              background: '#3b82f6',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Save Profile
          </button>
        </DialogFooter>
      </>
    ),
  },
};
