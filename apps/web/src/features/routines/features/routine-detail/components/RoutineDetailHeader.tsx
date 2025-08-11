'use client';

import { ArrowLeft, Play, Edit, Share, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface RoutineDetailHeaderProps {
  routineId: string;
  name: string;
  description: string;
  isActive: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

const RoutineDetailHeader = ({
  routineId,
  name,
  description,
  isActive,
  isFavorite,
  onToggleFavorite,
  onShare,
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
        <Button variant="ghost" size="sm" onClick={onShare}>
          <Share className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push(`/routines/${routineId}/edit`)}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700"
          onClick={() => router.push(`/workout-tracker/${routineId}`)}
        >
          <Play className="w-4 h-4 mr-2" />
          Start Workout
        </Button>
      </div>
    </div>
  );
};

export default RoutineDetailHeader;
