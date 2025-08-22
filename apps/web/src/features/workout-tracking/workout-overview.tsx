'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Target,
  Zap,
  Play,
  Timer,
  Repeat,
  TrendingUp,
} from 'lucide-react';
import type {
  WorkoutRoutine,
  SectionType,
} from '@features/workout-tracking/workout';

const mockRoutine: WorkoutRoutine = {
  id: '1',
  name: 'Upper Body Strength',
  estimatedTime: 45,
  totalExercises: 8,
  sections: [
    {
      id: 'warmup-1',
      name: 'Dynamic Warm-up',
      type: 'warm-up',
      exercises: [
        {
          id: '1',
          name: 'Arm Circles',
          sets: 2,
          reps: '10 each direction',
          weight: 'Bodyweight',
          rpe: 3,
          restTime: 30,
          progressionMethod: 'linear',
          setTypes: ['warm-up'],
          muscleGroups: ['Shoulders'],
        },
        {
          id: '2',
          name: 'Band Pull-aparts',
          sets: 2,
          reps: '15',
          weight: 'Light band',
          rpe: 4,
          restTime: 30,
          progressionMethod: 'linear',
          setTypes: ['warm-up'],
          muscleGroups: ['Rear Delts', 'Rhomboids'],
        },
      ],
    },
    {
      id: 'main-1',
      name: 'Main Strength Work',
      type: 'basic',
      exercises: [
        {
          id: '3',
          name: 'Bench Press',
          sets: 4,
          reps: '8-10',
          weight: '80kg',
          rpe: 8,
          restTime: 180,
          progressionMethod: 'dual',
          setTypes: ['working'],
          muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
        },
        {
          id: '4',
          name: 'Pull-ups',
          sets: 3,
          reps: '6-8',
          weight: 'Bodyweight',
          rpe: 7,
          restTime: 120,
          progressionMethod: 'linear',
          setTypes: ['working'],
          muscleGroups: ['Lats', 'Biceps'],
        },
      ],
    },
    {
      id: 'emom-1',
      name: 'EMOM Finisher',
      type: 'emom',
      intervalTime: 60,
      exercises: [
        {
          id: '5',
          name: 'Push-ups',
          sets: 8,
          reps: '10',
          weight: 'Bodyweight',
          rpe: 6,
          restTime: 0,
          progressionMethod: 'linear',
          setTypes: ['working'],
          muscleGroups: ['Chest', 'Triceps'],
        },
      ],
    },
    {
      id: 'amrap-1',
      name: 'AMRAP Circuit',
      type: 'amrap',
      duration: 300, // 5 minutes
      exercises: [
        {
          id: '6',
          name: 'Burpees',
          sets: 1,
          reps: '5',
          weight: 'Bodyweight',
          rpe: 7,
          restTime: 0,
          progressionMethod: 'amrap',
          setTypes: ['working'],
          muscleGroups: ['Full Body'],
        },
        {
          id: '7',
          name: 'Mountain Climbers',
          sets: 1,
          reps: '10',
          weight: 'Bodyweight',
          rpe: 6,
          restTime: 0,
          progressionMethod: 'amrap',
          setTypes: ['working'],
          muscleGroups: ['Core', 'Shoulders'],
        },
      ],
    },
  ],
};

const getSectionTypeInfo = (type: SectionType) => {
  switch (type) {
    case 'warm-up':
      return { icon: TrendingUp, color: 'text-green-500', label: 'Warm-up' };
    case 'basic':
      return { icon: Target, color: 'text-primary', label: 'Strength' };
    case 'emom':
      return { icon: Timer, color: 'text-orange-500', label: 'EMOM' };
    case 'tabata':
      return { icon: Zap, color: 'text-red-500', label: 'Tabata' };
    case 'amrap':
      return { icon: Repeat, color: 'text-purple-500', label: 'AMRAP' };
    case 'cooldown':
      return { icon: Clock, color: 'text-blue-500', label: 'Cool-down' };
    default:
      return { icon: Target, color: 'text-primary', label: 'Basic' };
  }
};

export const WorkoutOverview = () => {
  const [routine] = useState<WorkoutRoutine>(mockRoutine);

  const handleStartWorkout = () => {
    window.location.href = `/workout/${routine.id}`;
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-foreground">PeakHealth</h1>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-semibold">
              P
            </span>
          </div>
        </div>
        <p className="text-muted-foreground">Ready for your workout?</p>
      </div>

      {/* Workout Summary Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">
            {routine.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Stats */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Est. Time</span>
            </div>
            <span className="font-semibold text-foreground">
              {routine.estimatedTime} min
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Exercises</span>
            </div>
            <span className="font-semibold text-foreground">
              {routine.totalExercises}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Sections</span>
            </div>
            <span className="font-semibold text-foreground">
              {routine.sections.length}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-24">
        {' '}
        {/* increased bottom margin from mb-8 to mb-24 to provide space for floating button */}
        <CardHeader>
          <CardTitle className="text-lg text-foreground">
            Workout Sections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routine.sections.map(section => {
              const sectionInfo = getSectionTypeInfo(section.type);
              const SectionIcon = sectionInfo.icon;

              return (
                <div key={section.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <SectionIcon className={`w-4 h-4 ${sectionInfo.color}`} />
                      <span className="font-medium text-foreground text-sm">
                        {section.name}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {sectionInfo.label}
                    </Badge>
                  </div>

                  {/* Section-specific info */}
                  {section.type === 'emom' && (
                    <p className="text-xs text-muted-foreground mb-2">
                      Every {section.intervalTime}s for{' '}
                      {section.exercises[0]?.sets} rounds
                    </p>
                  )}
                  {section.type === 'amrap' && (
                    <p className="text-xs text-muted-foreground mb-2">
                      As many rounds as possible in{' '}
                      {Math.floor(section.duration! / 60)} minutes
                    </p>
                  )}

                  <div className="space-y-1">
                    {section.exercises.map((exercise, index) => (
                      <div
                        key={exercise.id}
                        className="flex items-center justify-between py-1"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-muted-foreground">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-xs">
                              {exercise.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {exercise.sets} sets × {exercise.reps}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          RPE {exercise.rpe}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto">
        <Button
          onClick={handleStartWorkout}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Workout
        </Button>
      </div>
    </div>
  );
};
