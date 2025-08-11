'use client';

import {
  Calendar,
  Clock,
  Target,
  Users,
  Star,
  Activity,
  Heart,
  Eye,
  Edit,
  Play,
  Trophy,
  Zap,
  Dumbbell,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Routine } from '@/features/routines/types';
import {
  getDifficultyColor,
  getGoalColor,
  getIconColor,
} from '@/features/routines/utils';

interface RoutineCardProps {
  routine: Routine;
  viewMode: 'grid' | 'list';
}

const RoutineCard = ({
  routine,
  viewMode,
}: RoutineCardProps): React.ReactElement => {
  const router = useRouter();

  const handleViewDetails = (): void => {
    router.push(`/routines/${routine.id}`);
  };

  const handleEdit = (): void => {
    router.push(`/routines/${routine.id}/edit`);
  };

  const handleStartWorkout = (): void => {
    router.push(`/workout-tracker/${routine.id}`);
  };

  const toggleFavorite = (): void => {
    // TODO: Implement favorite toggle
    // eslint-disable-next-line no-console
    console.log('Toggle favorite for routine:', routine.id);
  };

  if (viewMode === 'list') {
    return (
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-indigo-600" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {routine.name}
                </h3>
                {routine.isActive && (
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    Active
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {routine.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{routine.daysPerWeek} days/week</span>
                <span>•</span>
                <span>{routine.estimatedDuration || '45-60 min'}</span>
                <span>•</span>
                <span
                  className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
                    routine.difficulty
                  )}`}
                >
                  {routine.difficulty}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs ${getGoalColor(
                    routine.goal
                  )}`}
                >
                  {routine.goal}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFavorite}
              className="text-gray-400 hover:text-red-500"
            >
              <Heart
                className={`w-4 h-4 ${
                  routine.isFavorite ? 'text-red-500 fill-red-500' : ''
                }`}
              />
            </Button>
            <Button variant="outline" size="sm" onClick={handleViewDetails}>
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              onClick={handleStartWorkout}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Play className="w-4 h-4 mr-1" />
              Start
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Activity className="w-6 h-6 text-indigo-600" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFavorite}
          className="text-gray-400 hover:text-red-500"
        >
          <Heart
            className={`w-4 h-4 ${
              routine.isFavorite ? 'text-red-500 fill-red-500' : ''
            }`}
          />
        </Button>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {routine.name}
          </h3>
          {routine.isActive && (
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              Active
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {routine.description}
        </p>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Frequency</span>
          <span className="font-medium">{routine.daysPerWeek} days/week</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Duration</span>
          <span className="font-medium">
            {routine.estimatedDuration || '45-60 min'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium">
            {routine.progress.current}/{routine.progress.total} weeks
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
            routine.difficulty
          )}`}
        >
          {routine.difficulty}
        </span>
        <span
          className={`px-2 py-1 rounded text-xs ${getGoalColor(routine.goal)}`}
        >
          {routine.goal}
        </span>
      </div>

      {routine.objectives && routine.objectives.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Objectives</h4>
          <div className="space-y-1">
            {routine.objectives.slice(0, 2).map((objective, index) => {
              const icons = [Target, Trophy, Zap, Dumbbell];
              const IconComponent = icons[index % icons.length];
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-xs text-gray-600"
                >
                  <IconComponent
                    className={`w-3 h-3 ${getIconColor(['green', 'blue', 'purple', 'orange'][index])}`}
                  />
                  <span className="truncate">{objective}</span>
                </div>
              );
            })}
            {routine.objectives.length > 2 && (
              <div className="text-xs text-gray-500">
                +{routine.objectives.length - 2} more objectives
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewDetails}
          className="flex-1"
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
        <Button
          size="sm"
          onClick={handleStartWorkout}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
        >
          <Play className="w-4 h-4 mr-1" />
          Start
        </Button>
      </div>
    </Card>
  );
};

export default RoutineCard;
