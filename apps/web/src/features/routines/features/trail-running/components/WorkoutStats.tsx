'use client';

import { Card, CardContent } from '@/components/ui/card';

interface WorkoutStatsProps {
  targetDistance: number;
  estimatedDuration: number;
  elevationGain: number;
}

const WorkoutStats = ({
  targetDistance,
  estimatedDuration,
  elevationGain,
}: WorkoutStatsProps): React.ReactElement => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {targetDistance}km
          </div>
          <div className="text-sm text-gray-600">Total Distance</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {estimatedDuration}min
          </div>
          <div className="text-sm text-gray-600">Total Duration</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            +{elevationGain}m
          </div>
          <div className="text-sm text-gray-600">Elevation Gain</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutStats;
