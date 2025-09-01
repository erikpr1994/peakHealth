import type { Meta, StoryObj } from '@storybook/react';
import { UnilateralExerciseModal } from './UnilateralExerciseModal';

const meta: Meta<typeof UnilateralExerciseModal> = {
  title: 'Routines/UnilateralExerciseModal',
  component: UnilateralExerciseModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
    onConfirm: { action: 'confirmed' },
  },
};

export default meta;
type Story = StoryObj<typeof UnilateralExerciseModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {
      // Handle close
    },
    onConfirm: isUnilateral => {
      // Handle confirmation
    },
    exerciseName: 'Dumbbell Curl',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {
      // Handle close
    },
    onConfirm: isUnilateral => {
      // Handle confirmation
    },
    exerciseName: 'Dumbbell Curl',
  },
};
