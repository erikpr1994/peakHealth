import type { Meta, StoryObj } from '@storybook/react-vite';
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
    onSectionTypeSelect: { action: 'selected' },
  },
};

export default meta;
type Story = StoryObj<typeof SectionTypeSelectionModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    workoutId: 'workout-123',
    onClose: () => {
      // Handle close
    },
    onSectionTypeSelect: (workoutId: string, sectionType: string) => {
      // Handle selection
    },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    workoutId: 'workout-123',
    onClose: () => {
      // Handle close
    },
    onSectionTypeSelect: (workoutId: string, sectionType: string) => {
      // Handle selection
    },
  },
};
