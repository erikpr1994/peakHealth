'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import IntensityTargetConfiguration from './IntensityTargetConfiguration';
import {
  TrailRunningInterval,
  IntensityTarget,
} from '@/features/routines/types';

interface RepeatIntervalsFormProps {
  repeatIntervals: Partial<TrailRunningInterval>[];
  repeatCount: number;
  skipLastRest: boolean;
  onRepeatCountChange: (count: number) => void;
  onSkipLastRestChange: (skip: boolean) => void;
  onAddInterval: () => void;
  onRemoveInterval: (index: number) => void;
  onUpdateInterval: (
    index: number,
    field: string,
    value: string | number | boolean | IntensityTarget
  ) => void;
}

const RepeatIntervalsForm = ({
  repeatIntervals,
  repeatCount,
  skipLastRest,
  onRepeatCountChange,
  onSkipLastRestChange,
  onAddInterval,
  onRemoveInterval,
  onUpdateInterval,
}: RepeatIntervalsFormProps): React.ReactElement => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Number of Repetitions</Label>
        <Input
          type="number"
          min="1"
          max="20"
          value={repeatCount}
          onChange={e => onRepeatCountChange(parseInt(e.target.value) || 1)}
          className="h-10"
        />
      </div>

      {/* Skip Last Rest Option */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Switch
              checked={skipLastRest}
              onCheckedChange={onSkipLastRestChange}
            />
            <Label className="text-sm">Skip last rest/recovery interval</Label>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          When enabled, the last interval will be removed if it&apos;s a rest or
          recovery type
        </p>
      </div>

      {/* Repeat Intervals */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Repeat Intervals</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddInterval}
            className="h-8"
          >
            Add Interval
          </Button>
        </div>

        {repeatIntervals.map((interval, index) => (
          <div
            key={index}
            className="p-3 border border-gray-200 rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Interval {index + 1}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveInterval(index)}
                className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
              >
                ×
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Name</Label>
                <Input
                  value={interval.name || ''}
                  onChange={e =>
                    onUpdateInterval(index, 'name', e.target.value)
                  }
                  placeholder="Interval name"
                  className="h-8 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Type</Label>
                <Select
                  value={interval.type || 'run'}
                  onValueChange={value =>
                    onUpdateInterval(index, 'type', value)
                  }
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="run">Run</SelectItem>
                    <SelectItem value="walk">Walk</SelectItem>
                    <SelectItem value="uphill">Uphill</SelectItem>
                    <SelectItem value="downhill">Downhill</SelectItem>
                    <SelectItem value="sprint">Sprint</SelectItem>
                    <SelectItem value="recovery">Recovery</SelectItem>
                    <SelectItem value="rest">Rest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Distance (km)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={interval.distance || ''}
                  onChange={e =>
                    onUpdateInterval(
                      index,
                      'distance',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="0.0"
                  className="h-8 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Duration (min)</Label>
                <Input
                  type="number"
                  value={interval.duration || ''}
                  onChange={e =>
                    onUpdateInterval(
                      index,
                      'duration',
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  className="h-8 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Elevation (m)</Label>
                <Input
                  type="number"
                  value={interval.elevationChange || ''}
                  onChange={e =>
                    onUpdateInterval(
                      index,
                      'elevationChange',
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  className="h-8 text-sm"
                />
              </div>
            </div>

            {interval.type !== 'rest' && (
              <div className="space-y-2">
                <Label className="text-xs">Intensity Target</Label>
                <IntensityTargetConfiguration
                  target={interval.intensityTarget}
                  onChange={target =>
                    onUpdateInterval(index, 'intensityTarget', target)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepeatIntervalsForm;
