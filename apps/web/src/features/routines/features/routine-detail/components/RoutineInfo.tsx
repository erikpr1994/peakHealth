'use client';

import { Copy, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getDifficultyColor } from '@/features/routines/utils';

interface RoutineInfoProps {
  difficulty: string;
  createdDate: string;
  lastModified: string;
  onDuplicate: () => void;
  onDelete: () => void;
}

const RoutineInfo = ({
  difficulty,
  createdDate,
  lastModified,
  onDuplicate,
  onDelete,
}: RoutineInfoProps): React.ReactElement => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Routine Info</h2>
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">Difficulty Level</div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}
          >
            {difficulty}
          </span>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Created</div>
          <div className="font-medium text-gray-800">{createdDate}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Last Modified</div>
          <div className="font-medium text-gray-800">{lastModified}</div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500 mb-3">Quick Actions</div>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start whitespace-nowrap"
              onClick={onDuplicate}
            >
              <Copy className="w-4 h-4 mr-2" />
              Duplicate Routine
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start whitespace-nowrap text-red-600 hover:text-red-700"
              onClick={onDelete}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete Routine
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoutineInfo;
