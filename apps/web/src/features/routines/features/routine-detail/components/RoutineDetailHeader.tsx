'use client';

import { ArrowLeft, Play, Edit, Heart, Copy, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface RoutineDetailHeaderProps {
  routineId: string;
  name: string;
  description: string;
  isActive: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const RoutineDetailHeader = ({
  routineId,
  name,
  description,
  isActive,
  isFavorite,
  onToggleFavorite,
  onDuplicate,
  onDelete,
}: RoutineDetailHeaderProps): React.ReactElement => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.push('/routines')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Routines
        </Button>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
            {isActive && (
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                Active
              </span>
            )}
          </div>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onToggleFavorite}>
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push(`/routines/${routineId}/edit`)}
          className="whitespace-nowrap min-w-[80px]"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="outline"
          onClick={onDuplicate}
          className="whitespace-nowrap"
        >
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </Button>
        <Button
          variant="outline"
          onClick={onDelete}
          className="whitespace-nowrap text-red-600 hover:text-red-700"
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </Button>
        {isActive && (
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap min-w-[120px]"
            onClick={() => router.push(`/workout-tracker/${routineId}`)}
          >
            <Play className="w-4 h-4 mr-2" />
            Start next workout
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoutineDetailHeader;
