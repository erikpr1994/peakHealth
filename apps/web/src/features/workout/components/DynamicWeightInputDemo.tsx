import React, { useState } from 'react';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DynamicWeightInput } from './DynamicWeightInput';

interface DemoExercise {
  name: string;
  equipment: string[];
  description: string;
}

const demoExercises: DemoExercise[] = [
  {
    name: 'Push-ups',
    equipment: ['Bodyweight'],
    description: 'Pure bodyweight exercise - no weight input needed',
  },
  {
    name: 'Pull-ups',
    equipment: ['Bodyweight', 'Pull-up Bar'],
    description: 'Bodyweight + optional added weight (weight belt, vest)',
  },
  {
    name: 'Barbell Bench Press',
    equipment: ['Barbell', 'Bench'],
    description: 'Free weight exercise - standard weight input',
  },
  {
    name: 'Chest Press Machine',
    equipment: ['Machine'],
    description: 'Weight stack machine - standard weight input',
  },
  {
    name: 'Cable Crossover',
    equipment: ['Cable'],
    description: 'Cable machine - standard weight input',
  },
  {
    name: 'Resistance Band Rows',
    equipment: ['Resistance Band'],
    description: 'Resistance band exercise - band level selection (future)',
  },
];

export const DynamicWeightInputDemo = (): React.ReactElement => {
  const [weights, setWeights] = useState<Record<string, number | null>>({});

  const handleWeightChange = (
    exerciseName: string,
    weight: number | null
  ): void => {
    setWeights(prev => ({
      ...prev,
      [exerciseName]: weight,
    }));
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dynamic Weight Input Demo</h2>
        <p className="text-gray-600">
          This demo shows how weight input adapts based on exercise equipment
          requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {demoExercises.map(exercise => (
          <Card key={exercise.name} className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{exercise.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {exercise.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {exercise.equipment.map(equipment => (
                    <span
                      key={equipment}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                    >
                      {equipment}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Weight Input:</Label>
                <div className="mt-2">
                  <DynamicWeightInput
                    value={weights[exercise.name] || null}
                    onChange={weight =>
                      handleWeightChange(exercise.name, weight)
                    }
                    exerciseEquipment={exercise.equipment}
                    exerciseName={exercise.name}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <strong>Current value:</strong>{' '}
                {weights[exercise.name] !== null
                  ? weights[exercise.name]
                  : 'null'}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-gray-50">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <ul className="text-sm space-y-1">
          <li>
            • <strong>Bodyweight:</strong> Shows disabled input with
            "Bodyweight" text
          </li>
          <li>
            • <strong>Bodyweight + Equipment:</strong> Shows "Bodyweight" with
            option to add weight
          </li>
          <li>
            • <strong>Free Weights/Machines:</strong> Shows standard number
            input
          </li>
          <li>
            • <strong>Resistance Bands:</strong> Shows band selection (future
            feature)
          </li>
          <li>
            • <strong>Tooltips:</strong> Hover over the info icon for
            explanations
          </li>
        </ul>
      </Card>
    </div>
  );
};
