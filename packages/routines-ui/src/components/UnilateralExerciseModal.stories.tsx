import type { Meta, StoryObj } from '@storybook/react-vite';
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
    onModeSelect: { action: 'modeSelected' },
  },
};

export default meta;
type Story = StoryObj<typeof UnilateralExerciseModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    exerciseId: 'exercise-123',
    onClose: () => {
      // Handle close
    },
    onModeSelect: (exerciseId: string, mode: string) => {
      // Handle mode selection
    },
    currentMode: 'simultaneous',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    exerciseId: 'exercise-123',
    onClose: () => {
      // Handle close
    },
    onModeSelect: (exerciseId: string, mode: string) => {
      // Handle mode selection
    },
    currentMode: 'alternating',
  },
};
