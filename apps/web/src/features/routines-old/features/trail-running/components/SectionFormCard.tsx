'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import SectionTypeSelector from './SectionTypeSelector';
import RepeatIntervalsForm from './RepeatIntervalsForm';
import SectionForm from './SectionForm';
import {
  getSmartDefaults,
  processRepeatSections,
} from '@/features/routines-old/utils/smartDefaults';
import { getDefaultName } from '@/features/routines-old/utils/trailRunningUtils';
import {
  TrailRunningSection,
  TrailRunningInterval,
  IntervalType,
  IntensityTarget,
} from '@/features/routines-old/types';

interface SectionFormCardProps {
  editingSection: TrailRunningSection | null;
  currentSection: Partial<TrailRunningSection>;
  repeatIntervals: Partial<TrailRunningInterval>[];
  skipLastRest: boolean;
  onUpdateCurrentSection: (updates: Partial<TrailRunningSection>) => void;
  onUpdateRepeatIntervals: (intervals: Partial<TrailRunningInterval>[]) => void;
  onSkipLastRestChange: (skip: boolean) => void;
  onAddInterval: () => void;
  onRemoveInterval: (index: number) => void;
  onUpdateInterval: (
    index: number,
    field: string,
    value: string | number | boolean | IntensityTarget
  ) => void;
  onCancelEdit: () => void;
  onAddSection: () => void;
}

const SectionFormCard = ({
  editingSection,
  currentSection,
  repeatIntervals,
  skipLastRest,
  onUpdateCurrentSection,
  onUpdateRepeatIntervals,
  onSkipLastRestChange,
  onAddInterval,
  onRemoveInterval,
  onUpdateInterval,
  onCancelEdit,
  onAddSection,
}: SectionFormCardProps): React.ReactElement => {
  const handleTypeChange = (value: TrailRunningSection['type']): void => {
    const selectedType = value;
    const smartDefaults = getSmartDefaults(selectedType);

    onUpdateCurrentSection({
      type: selectedType,
      isRepeated: smartDefaults ? true : false,
      repeatCount: smartDefaults?.repeatCount || 1,
      name: currentSection.name || getDefaultName(selectedType),
    });

    // Set smart intervals if available
    if (smartDefaults?.intervals) {
      const mappedIntervals = smartDefaults.intervals.map((interval, index) => {
        const mappedInterval: Partial<TrailRunningInterval> = {
          ...interval,
          id: `${Date.now()}-${index}`,
          type: (interval.type as IntervalType) || 'run',
          intensityTarget: interval.intensityTarget
            ? {
                ...interval.intensityTarget,
                type: interval.intensityTarget.type as
                  | 'heart-rate'
                  | 'speed'
                  | 'power'
                  | 'cadence'
                  | 'rpe',
              }
            : undefined,
        };

        if (mappedInterval.type === 'rest') {
          delete mappedInterval.intensityTarget;
        }

        return mappedInterval;
      });
      onUpdateRepeatIntervals(mappedIntervals);
    } else {
      onUpdateRepeatIntervals([]);
    }
  };

  const handleRepeatToggle = (checked: boolean): void => {
    onUpdateCurrentSection({ isRepeated: checked });

    if (!checked) {
      onUpdateRepeatIntervals([]);
    } else {
      // Auto-populate smart defaults when manually enabling
      const smartDefaults = getSmartDefaults(currentSection.type || 'warm-up');
      if (smartDefaults) {
        onUpdateCurrentSection({ repeatCount: smartDefaults.repeatCount });
        const mappedIntervals = smartDefaults.intervals.map(
          (interval, index) => {
            const mappedInterval: Partial<TrailRunningInterval> = {
              ...interval,
              id: `${Date.now()}-${index}`,
              type: (interval.type as IntervalType) || 'run',
              intensityTarget: interval.intensityTarget
                ? {
                    ...interval.intensityTarget,
                    type: interval.intensityTarget.type as
                      | 'heart-rate'
                      | 'speed'
                      | 'power'
                      | 'cadence'
                      | 'rpe',
                  }
                : undefined,
            };

            if (mappedInterval.type === 'rest') {
              delete mappedInterval.intensityTarget;
            }

            return mappedInterval;
          }
        );
        onUpdateRepeatIntervals(mappedIntervals);
      }
    }
  };

  const handleAddSection = (): void => {
    if (currentSection.isRepeated) {
      const processedIntervals = processRepeatSections(
        repeatIntervals,
        skipLastRest
      );
      onUpdateCurrentSection({ repeatSections: processedIntervals });
    }
    onAddSection();
  };

  const smartDefaults = getSmartDefaults(currentSection.type || '');
  const isAutoRepeat = smartDefaults !== null;

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center justify-between">
          <span>
            {editingSection ? 'Edit Training Section' : 'Add Training Section'}
          </span>
          {editingSection && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancelEdit}
              className="text-gray-600 hover:text-gray-700"
            >
              Cancel Edit
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2">
        <SectionTypeSelector
          value={currentSection.type || 'warm-up'}
          onValueChange={handleTypeChange}
        />

        <div className="space-y-2">
          <Label className="text-sm font-medium">Section Name</Label>
          <Input
            placeholder="e.g., Steep Ascent to Summit"
            value={currentSection.name || ''}
            onChange={e => onUpdateCurrentSection({ name: e.target.value })}
            className="h-10"
          />
        </div>

        {/* Repeat Option */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Switch
                checked={currentSection.isRepeated || false}
                onCheckedChange={handleRepeatToggle}
              />
              <Label className="text-sm font-medium">
                Create Repeated Section Block
              </Label>
            </div>
          </div>

          {isAutoRepeat && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm text-white">💡</span>
                </div>
                <div className="space-y-2 flex-1">
                  <p className="text-sm font-medium text-blue-800">
                    Template Applied
                  </p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    We&apos;ve automatically configured this{' '}
                    {currentSection.type} with {smartDefaults?.repeatCount}{' '}
                    repetitions and suggested intervals. You can customize them
                    below.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentSection.isRepeated && (
            <RepeatIntervalsForm
              repeatIntervals={repeatIntervals}
              repeatCount={currentSection.repeatCount || 1}
              skipLastRest={skipLastRest}
              onRepeatCountChange={count =>
                onUpdateCurrentSection({ repeatCount: count })
              }
              onSkipLastRestChange={onSkipLastRestChange}
              onAddInterval={onAddInterval}
              onRemoveInterval={onRemoveInterval}
              onUpdateInterval={onUpdateInterval}
            />
          )}

          {/* Non-repeated section configuration */}
          {!currentSection.isRepeated && (
            <SectionForm
              section={currentSection}
              onUpdateSection={onUpdateCurrentSection}
            />
          )}

          <Button
            onClick={handleAddSection}
            disabled={!currentSection.name || !currentSection.type}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            {editingSection ? 'Update Section' : 'Add Section'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionFormCard;
