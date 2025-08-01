import { CheckCircle, XCircle } from 'lucide-react';

import { ExerciseData } from '../../types';

import { Card } from '@/components/ui/card';

interface ExerciseTipsProps {
  exercise: ExerciseData;
}

export const ExerciseTips = ({ exercise }: ExerciseTipsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-md flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Pro Tips</h2>
        </div>
        <ul className="space-y-3">
          {exercise.proTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-md flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Common Mistakes</h2>
        </div>
        <ul className="space-y-3">
          {exercise.commonMistakes.map((mistake, index) => (
            <li key={index} className="flex items-start gap-3">
              <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{mistake}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
