import { Play } from 'lucide-react';

import { Exercise, ExerciseVariant } from '../../types';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ExerciseVideoProps {
  exercise: Exercise;
  variant: ExerciseVariant;
}

export const ExerciseVideo = ({ exercise, variant }: ExerciseVideoProps) => {
  const featuredVideo =
    variant.media?.featuredVideo || variant.media?.videos?.[0];

  if (!featuredVideo) {
    return (
      <Card className="overflow-hidden">
        <div className="bg-gray-100 h-64 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="text-4xl mb-2">📹</div>
              <p className="text-sm">No video available</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2">
            Demonstration Video
          </h3>
          <p className="text-sm text-gray-600">
            Video demonstration not available for this exercise variant.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-gray-100 h-64 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Button className="h-16 w-16 rounded-full bg-white/80 hover:bg-white/90">
            <Play className="w-6 h-6 text-indigo-600" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">
          Demonstration Video
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Watch this demonstration to ensure proper form and technique.
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Video available</span>
          <Button variant="ghost" size="sm" className="text-indigo-600">
            Full Screen
          </Button>
        </div>
      </div>
    </Card>
  );
};
