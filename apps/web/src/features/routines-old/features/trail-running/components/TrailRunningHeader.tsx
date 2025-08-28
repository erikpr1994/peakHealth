'use client';

import { Mountain } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface TrailRunningHeaderProps {
  mode: 'create' | 'edit';
  canSave: boolean;
  onCancel: () => void;
  onSave: () => void;
}

const TrailRunningHeader = ({
  mode,
  canSave,
  onCancel,
  onSave,
}: TrailRunningHeaderProps): React.ReactElement => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <Mountain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {mode === 'create'
              ? 'Create Trail Running Workout'
              : 'Edit Trail Running Workout'}
          </h3>
          <p className="text-sm text-gray-600">
            Design your trail running adventure
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={onSave}
          disabled={!canSave}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
        >
          {mode === 'create' ? 'Add Workout' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default TrailRunningHeader;
