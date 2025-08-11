'use client';

import {
  ChevronDown,
  ChevronUp,
  Edit,
  GripVertical,
  Trash2,
  Dumbbell,
  Activity,
  MapPin,
  Waves,
  Bike,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { WorkoutType } from '@/features/routines/types';

interface WorkoutHeaderProps {
  workout: {
    id: string;
    name: string;
    type: WorkoutType;
  };
  index: number;
  totalCount: number;
  isCollapsed: boolean;
  duration: string;
  onToggleCollapse: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onEdit?: () => void;
  onUpdateName: (name: string) => void;
}

const WorkoutHeader = ({
  workout,
  index,
  totalCount,
  isCollapsed,
  duration,
  onToggleCollapse,
  onMoveUp,
  onMoveDown,
  onRemove,
  onEdit,
  onUpdateName,
}: WorkoutHeaderProps): React.ReactElement => {
  const getWorkoutIcon = (type: WorkoutType): React.ReactElement => {
    const iconProps = { className: 'h-5 w-5' };

    switch (type) {
      case 'strength':
        return <Dumbbell {...iconProps} className="h-5 w-5 text-indigo-600" />;
      case 'running':
        return <Activity {...iconProps} className="h-5 w-5 text-green-600" />;
      case 'trail-running':
        return <MapPin {...iconProps} className="h-5 w-5 text-orange-600" />;
      case 'swimming':
        return <Waves {...iconProps} className="h-5 w-5 text-blue-600" />;
      case 'cycling':
        return <Bike {...iconProps} className="h-5 w-5 text-purple-600" />;
      default:
        return <Activity {...iconProps} className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Workout Order Controls */}
          <div className="flex flex-col space-y-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMoveUp}
                    disabled={index === 0}
                    className="p-1 h-6 w-6"
                  >
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move up</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMoveDown}
                    disabled={index === totalCount - 1}
                    className="p-1 h-6 w-6"
                  >
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move down</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Workout Order Number */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
            {index + 1}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-1"
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>

          <div className="flex items-center space-x-3">
            {getWorkoutIcon(workout.type)}

            <div>
              <Input
                value={workout.name}
                onChange={e => onUpdateName(e.target.value)}
                className="font-medium border-none p-0 h-auto bg-transparent focus:bg-white focus:border-gray-300"
              />
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-gray-500">{duration}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500 capitalize">
                  {workout.type.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="text-green-600 hover:text-green-700"
            >
              Edit
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHeader;
