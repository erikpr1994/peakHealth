'use client';

import {
  Activity,
  Heart,
  Eye,
  Edit,
  Play,
  Target,
  Trophy,
  Zap,
  Dumbbell,
  CheckCircle,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Routine } from '@/features/routines-old/types';
import {
  getDifficultyColor,
  getGoalColor,
  getIconColor,
  calculateDaysPerWeek,
} from '@/features/routines-old/utils';
import { routineService } from '../../../services/routineService';

interface RoutineCardProps {
  routine: Routine;
  viewMode: 'grid' | 'list';
  onSetActive?: (routineId: string) => void;
  onToggleFavorite?: (routineId: string) => void;
}

const RoutineCard = ({
  routine,
  viewMode,
  onSetActive,
  onToggleFavorite,
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

  const toggleFavorite = async (): Promise<void> => {
    try {
      if (onToggleFavorite) {
        await onToggleFavorite(routine.id);
      } else {
        await routineService.toggleRoutineFavorite(routine.id);
      }
    } catch {
      // TODO: Handle error
    }
  };

  const handleSetActive = (): void => {
    if (onSetActive) {
      onSetActive(routine.id);
    }
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
                <span>{calculateDaysPerWeek(routine)} days/week</span>
                <span>•</span>
                <span>Avg. {routine.estimatedDuration || '45-60 min'}</span>
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
            {!routine.isActive && onSetActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSetActive}
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Set Active
              </Button>
            )}
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
    <Card className="p-6 hover:shadow-md transition-shadow h-full flex flex-col">
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
          <span className="font-medium">
            {calculateDaysPerWeek(routine)} days/week
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Avg. Duration</span>
          <span className="font-medium">
            {routine.estimatedDuration || '45-60 min'}
          </span>
        </div>
        {routine.isActive && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">
              {routine.progress?.current || 0}/{routine.progress?.total || 4}{' '}
              weeks
            </span>
          </div>
        )}
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
              <div
                className="text-xs text-gray-500 cursor-help"
                title={routine.objectives.slice(2).join(', ')}
              >
                +{routine.objectives.length - 2} more objectives
              </div>
            )}
          </div>
        </div>
      )}

      {/* Spacer to push buttons to bottom */}
      <div className="flex-grow"></div>

      <div className="flex space-x-2 mt-auto">
        {!routine.isActive && onSetActive && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSetActive}
            className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Set Active
          </Button>
        )}
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
