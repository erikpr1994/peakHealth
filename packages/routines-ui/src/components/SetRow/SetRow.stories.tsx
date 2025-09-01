import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect, useState } from 'react';
import { SetRow } from './SetRow';
import { RoutineBuilderProvider } from '../../context/routineBuilder/RoutineBuilderContext';
import { useRoutineBuilder } from '../../hooks/useRoutineBuilder';

// Mock data for the context
const mockRoutineData = {
  _id: 'routine-1',
  name: 'Test Routine',
  description: 'A test routine for Storybook',
  userId: 'user-1',
  createdBy: 'user-1',
  routineType: 'user-created' as const,
  isActive: true,
  isFavorite: false,
  completedWorkouts: 0,
  totalWorkouts: 1,
  difficulty: 'intermediate' as const,
  goal: 'strength' as const,
  duration: 8, // 8 weeks
  objectives: ['Build strength', 'Improve form'],
  schemaVersion: '1.0',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  workouts: [
    {
      _id: 'workout-1',
      name: 'Workout 1',
      orderIndex: 0,
      type: 'strength' as const,
      sections: [
        {
          _id: 'section-1',
          name: 'Section 1',
          orderIndex: 0,
          type: 'basic' as const,
          exercises: [
            {
              _id: 'exercise-1',
              name: 'Bench Press',
              orderIndex: 0,
              exerciseId: 'bench-press',
              exerciseVariantId: 'standard',
              type: 'strength' as const,
              unilateralMode: 'simultaneous' as const,
              sets: [
                {
                  _id: 'set-1',
                  setNumber: 1,
                  setType: 'working' as const,
                  repType: 'fixed' as const,
                  reps: 10,
                  weight: 135,
                  rpe: 8,
                },
                {
                  _id: 'set-2',
                  setNumber: 2,
                  setType: 'working' as const,
                  repType: 'fixed' as const,
                  reps: 8,
                  weight: 145,
                  rpe: 9,
                },
              ],
            },
            {
              _id: 'exercise-2',
              name: 'Dumbbell Curl',
              orderIndex: 1,
              exerciseId: 'dumbbell-curl',
              exerciseVariantId: 'standard',
              type: 'strength' as const,
              unilateralMode: 'alternating' as const,
              sets: [
                {
                  _id: 'set-3',
                  setNumber: 1,
                  setType: 'working' as const,
                  repType: 'fixed' as const,
                  reps: 12,
                  weight: 25,
                },
              ],
            },
            {
              _id: 'exercise-3',
              name: 'Plank',
              orderIndex: 2,
              exerciseId: 'plank',
              exerciseVariantId: 'standard',
              type: 'bodyweight' as const,
              unilateralMode: 'simultaneous' as const,
              sets: [
                {
                  _id: 'set-4',
                  setNumber: 1,
                  setType: 'working' as const,
                  repType: 'time' as const,
                  duration: 60,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Wrapper component to provide the RoutineBuilderContext
const RoutineBuilderWrapper = ({ children }: { children: React.ReactNode }) => {
  const { state, dispatch } = useRoutineBuilder(mockRoutineData);

  return (
    <RoutineBuilderProvider value={{ state, dispatch }}>
      <div
        style={{ width: '500px', padding: '20px', border: '1px solid #ccc' }}
      >
        {children}
      </div>
    </RoutineBuilderProvider>
  );
};

const meta: Meta<typeof SetRow> = {
  title: 'Routines/SetRow',
  component: SetRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => <RoutineBuilderWrapper>{Story()}</RoutineBuilderWrapper>,
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
