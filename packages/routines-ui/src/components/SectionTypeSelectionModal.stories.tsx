import type { Meta, StoryObj } from '@storybook/react';
import { SectionTypeSelectionModal } from './SectionTypeSelectionModal';

const meta: Meta<typeof SectionTypeSelectionModal> = {
  title: 'Routines/SectionTypeSelectionModal',
  component: SectionTypeSelectionModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
    onSelect: { action: 'selected' },
  },
};

export default meta;
type Story = StoryObj<typeof SectionTypeSelectionModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {
      // Handle close
    },
    onSelect: type => {
      // Handle selection
    },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {
      // Handle close
    },
    onSelect: type => {
      // Handle selection
    },
  },
};
