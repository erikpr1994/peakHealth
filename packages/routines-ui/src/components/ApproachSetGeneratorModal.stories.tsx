import type { Meta, StoryObj } from '@storybook/react-vite';
import { ApproachSetGeneratorModal, WarmupSet } from './ApproachSetGeneratorModal';

const meta: Meta<typeof ApproachSetGeneratorModal> = {
  title: 'Routines/ApproachSetGeneratorModal',
  component: ApproachSetGeneratorModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
    onGenerateSets: { action: 'generated' },
  },
};

export default meta;
type Story = StoryObj<typeof ApproachSetGeneratorModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    exerciseId: 'exercise-123',
    onClose: () => {
      // Handle close
    },
    onGenerateSets: (exerciseId: string, sets: WarmupSet[]) => {
      // Handle generated sets
    },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    exerciseId: 'exercise-123',
    onClose: () => {
      // Handle close
    },
    onGenerateSets: (exerciseId: string, sets: WarmupSet[]) => {
      // Handle generated sets
    },
  },
};
