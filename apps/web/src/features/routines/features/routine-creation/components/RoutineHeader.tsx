'use client';

import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useToast } from '@peakhealth/ui';

interface RoutineHeaderProps {
  mode: 'create' | 'edit';
  onSave: () => void;
}

const RoutineHeader = ({
  mode,
  onSave,
}: RoutineHeaderProps): React.ReactElement => {
  const router = useRouter();
  const { showToast } = useToast();

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
      <div className="flex space-x-2">
        <Button
          onClick={() => {
            console.log('Test Toast button clicked!');
            console.log('showToast function:', showToast);
            try {
              showToast({
                message: 'Test toast message!',
                variant: 'success',
                duration: 10000,
              });
              console.log('showToast called successfully');
            } catch (error) {
              console.error('Error calling showToast:', error);
            }
          }}
          className="bg-green-600 hover:bg-green-700"
        >
          Test Toast
        </Button>
        <Button onClick={onSave} className="bg-indigo-600 hover:bg-indigo-700">
          <Save className="h-4 w-4 mr-2" />
          {mode === 'edit' ? 'Update Routine' : 'Save Routine'}
        </Button>
      </div>
    </div>
  );
};

export default RoutineHeader;
