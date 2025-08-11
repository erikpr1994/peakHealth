'use client';

import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface RoutineHeaderProps {
  mode: 'create' | 'edit';
  onSave: () => void;
}

const RoutineHeader = ({
  mode,
  onSave,
}: RoutineHeaderProps): React.ReactElement => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'edit' ? 'Edit Routine' : 'Create New Routine'}
          </h1>
          <p className="text-gray-600">
            {mode === 'edit'
              ? 'Update your routine details'
              : 'Build your perfect workout routine'}
          </p>
        </div>
      </div>
      <Button onClick={onSave} className="bg-indigo-600 hover:bg-indigo-700">
        <Save className="h-4 w-4 mr-2" />
        {mode === 'edit' ? 'Update Routine' : 'Save Routine'}
      </Button>
    </div>
  );
};

export default RoutineHeader;
