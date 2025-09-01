import type { Meta, StoryObj } from '@storybook/react';
import { ApproachSetGeneratorModal } from './ApproachSetGeneratorModal';

const meta: Meta<typeof ApproachSetGeneratorModal> = {
  title: 'Routines/ApproachSetGeneratorModal',
  component: ApproachSetGeneratorModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
    onGenerate: { action: 'generated' },
  },
};

export default meta;
type Story = StoryObj<typeof ApproachSetGeneratorModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {
      // Handle close
    },
    onGenerate: sets => {
      // Handle generated sets
    },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {
      // Handle close
    },
    onGenerate: sets => {
      // Handle generated sets
    },
  },
};
