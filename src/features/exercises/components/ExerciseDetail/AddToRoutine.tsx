import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Routine } from '../../types';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface AddToRoutineProps {
  routines: Routine[];
}

export const AddToRoutine = ({ routines }: AddToRoutineProps) => {
  const router = useRouter();
  const [selectedRoutines, setSelectedRoutines] = useState<string[]>([]);

  const handleRoutineToggle = (routineId: string) => {
    setSelectedRoutines(prev =>
      prev.includes(routineId)
        ? prev.filter(id => id !== routineId)
        : [...prev, routineId]
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Add to Routine</h2>
        <Button
          onClick={() => router.push('/routines/create')}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Create New Routine
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routines.map(routine => (
          <div
            key={routine.id}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => handleRoutineToggle(routine.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">{routine.name}</h4>
              <Checkbox
                checked={
                  routine.isSelected || selectedRoutines.includes(routine.id)
                }
                disabled
              />
            </div>
            <p className="text-sm text-gray-600">{routine.schedule}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
