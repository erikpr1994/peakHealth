import type { Meta, StoryObj } from '@storybook/react-vite';
import { SetRow } from './SetRow';
import { RoutineBuilderProvider } from '../../context/routineBuilder/RoutineBuilderContext';

// Mock data for the context
const mockRoutineData = {
  id: 'routine-1',
  name: 'Test Routine',
  description: 'A test routine for Storybook',
  workouts: {
    'workout-1': {
      id: 'workout-1',
      name: 'Workout 1',
      sections: {
        'section-1': {
          id: 'section-1',
          name: 'Section 1',
          type: 'strength',
          exercises: {
            'exercise-1': {
              id: 'exercise-1',
              name: 'Bench Press',
              unilateralMode: 'simultaneous',
              sets: {
                'set-1': {
                  id: 'set-1',
                  setNumber: 1,
                  setType: 'working',
                  repType: 'standard',
                  reps: 10,
                  weight: 135,
                  rpe: 8,
                },
                'set-2': {
                  id: 'set-2',
                  setNumber: 2,
                  setType: 'working',
                  repType: 'standard',
                  reps: 8,
                  weight: 145,
                  rpe: 9,
                },
              },
            },
            'exercise-2': {
              id: 'exercise-2',
              name: 'Dumbbell Curl',
              unilateralMode: 'alternating',
              sets: {
                'set-3': {
                  id: 'set-3',
                  setNumber: 1,
                  setType: 'working',
                  repType: 'standard',
                  reps: 12,
                  weight: 25,
                },
              },
            },
            'exercise-3': {
              id: 'exercise-3',
              name: 'Plank',
              unilateralMode: 'simultaneous',
              sets: {
                'set-4': {
                  id: 'set-4',
                  setNumber: 1,
                  setType: 'working',
                  repType: 'time',
                  duration: 60,
                },
              },
            },
          },
        },
      },
    },
  },
};

const meta: Meta<typeof SetRow> = {
  title: 'Routines/SetRow',
  component: SetRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <RoutineBuilderProvider initialState={mockRoutineData}>
        <div style={{ width: '500px', padding: '20px', border: '1px solid #ccc' }}>
          {Story()}
        </div>
      </RoutineBuilderProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SetRow>;

export const StandardSet: Story = {
  args: {
    workoutId: 'workout-1',
    sectionId: 'section-1',
    exerciseId: 'exercise-1',
    setId: 'set-1',
  },
};

export const AlternatingSet: Story = {
  args: {
    workoutId: 'workout-1',
    sectionId: 'section-1',
    exerciseId: 'exercise-2',
    setId: 'set-3',
  },
};

export const TimeBasedSet: Story = {
  args: {
    workoutId: 'workout-1',
    sectionId: 'section-1',
    exerciseId: 'exercise-3',
    setId: 'set-4',
  },
};
