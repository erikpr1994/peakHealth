'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import TrailRunningHeader from './components/TrailRunningHeader';
import WorkoutStats from './components/WorkoutStats';
import WorkoutOverview from './components/WorkoutOverview';
import IntensityTargetConfiguration from './components/IntensityTargetConfiguration';
import { useTrailRunningWorkout } from './hooks/useTrailRunningWorkout';
import {
  calculateTotals,
  formatIntensityTargetDisplay,
  getIntensityTargetColor,
} from './utils/trailRunningUtils';
import {
  TrailRunningWorkoutData,
  TrailRunningSection,
  TrailRunningInterval,
} from './types';

interface TrailRunningWorkoutProps {
  onSave: (workoutData: TrailRunningWorkoutData) => void;
  onCancel: () => void;
  initialData?: TrailRunningWorkoutData;
  mode: 'create' | 'edit';
}

export type IntervalType =
  | 'run'
  | 'uphill'
  | 'downhill'
  | 'sprint'
  | 'recovery'
  | 'rest'
  | 'walk';

// Re-export types for backward compatibility
export type {
  TrailRunningWorkoutData,
  TrailRunningSection,
  TrailRunningInterval,
  IntensityTarget,
} from './types';

// Section type definitions
const sectionTypes = [
  // Basic Types
  {
    value: 'warm-up',
    label: 'Warm-up',
    description: 'Gradual intensity increase',
    icon: '🔥',
    color: 'text-orange-500',
    autoRepeat: false,
  },
  {
    value: 'run',
    label: 'Run',
    description: 'Steady pace running',
    icon: '🏃',
    color: 'text-blue-500',
    autoRepeat: false,
  },
  {
    value: 'walk',
    label: 'Walk',
    description: 'Recovery walking',
    icon: '🚶',
    color: 'text-green-500',
    autoRepeat: false,
  },
  // Rest & Recovery
  {
    value: 'recovery',
    label: 'Recovery',
    description: 'Active recovery period',
    icon: '🔄',
    color: 'text-purple-500',
    autoRepeat: false,
  },
  {
    value: 'rest',
    label: 'Rest',
    description: 'Complete rest break',
    icon: '⏸️',
    color: 'text-gray-500',
    autoRepeat: false,
  },
  // Structured Types
  {
    value: 'uphill-repeat',
    label: 'Uphill Repeats',
    description: 'Hill climbing intervals',
    icon: '⛰️',
    color: 'text-red-500',
    autoRepeat: true,
  },
  {
    value: 'downhill-repeat',
    label: 'Downhill Repeats',
    description: 'Downhill technique work',
    icon: '📉',
    color: 'text-indigo-500',
    autoRepeat: true,
  },
  {
    value: 'caco',
    label: 'CACO',
    description: 'Climb and cruise over',
    icon: '🔄',
    color: 'text-yellow-500',
    autoRepeat: true,
  },
  {
    value: 'fartlek',
    label: 'Fartlek',
    description: 'Speed play intervals',
    icon: '⚡',
    color: 'text-pink-500',
    autoRepeat: true,
  },
  {
    value: 'series',
    label: 'Series',
    description: 'Structured intervals',
    icon: '📊',
    color: 'text-teal-500',
    autoRepeat: true,
  },
  {
    value: 'w-series',
    label: 'W-Series',
    description: 'W-shaped intervals',
    icon: '📈',
    color: 'text-cyan-500',
    autoRepeat: true,
  },
  {
    value: 'cool-down',
    label: 'Cool-down',
    description: 'Gradual intensity decrease',
    icon: '❄️',
    color: 'text-blue-300',
    autoRepeat: false,
  },
];

const sectionCategories = {
  basic: sectionTypes.filter(t =>
    ['warm-up', 'run', 'walk', 'cool-down'].includes(t.value)
  ),
  rest: sectionTypes.filter(t => ['recovery', 'rest'].includes(t.value)),
  structured: sectionTypes.filter(t =>
    [
      'uphill-repeat',
      'downhill-repeat',
      'caco',
      'fartlek',
      'series',
      'w-series',
    ].includes(t.value)
  ),
};

const difficultyLevels = [
  { value: 'beginner', label: 'Beginner', color: 'bg-green-500' },
  { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500' },
  { value: 'advanced', label: 'Advanced', color: 'bg-orange-500' },
  { value: 'expert', label: 'Expert', color: 'bg-red-500' },
];

export default function TrailRunningWorkout({
  onSave,
  onCancel,
  initialData,
  mode,
}: TrailRunningWorkoutProps): React.ReactElement {
  const {
    workoutData,
    setWorkoutData,
    editingSection,
    currentSection,
    setCurrentSection,
    repeatIntervals,
    setRepeatIntervals,
    addSection,
    removeSection,
    editSection,
    cancelEdit,
    addRepeatInterval,
    removeRepeatInterval,
    updateRepeatInterval,
    canSave,
  } = useTrailRunningWorkout({ initialData, mode });

  const [skipLastRest, setSkipLastRest] = useState(false);

  // Get smart defaults for section types
  const getSmartDefaults = (type: string): Record<string, unknown> | null => {
    const defaults = {
      'uphill-repeat': {
        repeatCount: 6,
        intervals: [
          {
            name: 'Hill Climb',
            type: 'uphill',
            distance: 0.2,
            intensityTarget: { type: 'power', value: 4, unit: 'zone' },
            elevationChange: 30,
          },
          {
            name: 'Recovery Jog',
            type: 'recovery',
            distance: 0.2,
            intensityTarget: { type: 'heart-rate', value: 1, unit: 'zone' },
            elevationChange: -30,
          },
        ],
      },
      'downhill-repeat': {
        repeatCount: 6,
        intervals: [
          {
            name: 'Downhill Run',
            type: 'downhill',
            distance: 0.3,
            intensityTarget: { type: 'heart-rate', value: 3, unit: 'zone' },
            elevationChange: -40,
          },
          {
            name: 'Easy Recovery',
            type: 'recovery',
            distance: 0.2,
            intensityTarget: { type: 'heart-rate', value: 1, unit: 'zone' },
            elevationChange: 20,
          },
        ],
      },
      'w-series': {
        repeatCount: 6,
        intervals: [
          {
            name: 'Uphill Segment',
            type: 'uphill',
            distance: 0.4,
            intensityTarget: { type: 'power', value: 4, unit: 'zone' },
            elevationChange: 40,
          },
          {
            name: 'Downhill Segment',
            type: 'downhill',
            distance: 0.4,
            intensityTarget: { type: 'power', value: 4, unit: 'zone' },
            elevationChange: -40,
          },
        ],
      },
      caco: {
        repeatCount: 8,
        intervals: [
          {
            name: 'Run Segment',
            type: 'run',
            distance: 0.4,
            duration: 2,
            intensityTarget: { type: 'heart-rate', value: 2, unit: 'zone' },
          },
          {
            name: 'Walk Break',
            type: 'walk',
            distance: 0.4,
            duration: 2,
            intensityTarget: { type: 'heart-rate', value: 1, unit: 'zone' },
          },
        ],
      },
      fartlek: {
        repeatCount: 5,
        intervals: [
          {
            name: 'Fast Surge',
            type: 'sprint',
            distance: 0.3,
            intensityTarget: { type: 'heart-rate', value: 4, unit: 'zone' },
          },
          {
            name: 'Easy Recovery',
            type: 'recovery',
            distance: 0.5,
            intensityTarget: { type: 'heart-rate', value: 1, unit: 'zone' },
          },
        ],
      },
      series: {
        repeatCount: 4,
        intervals: [
          {
            name: 'Work Interval',
            type: 'run',
            distance: 0.5,
            intensityTarget: { type: 'heart-rate', value: 4, unit: 'zone' },
          },
          {
            name: 'Rest Interval',
            type: 'rest',
            duration: 2,
          },
        ],
      },
    };
    return defaults[type as keyof typeof defaults] || null;
  };

  // Update workout totals when sections change
  useEffect(() => {
    const totals = calculateTotals(workoutData.sections);
    setWorkoutData(prev => ({
      ...prev,
      targetDistance: totals.distance,
      estimatedDuration: totals.duration,
      elevationGain: totals.elevation,
    }));
  }, [workoutData.sections, setWorkoutData]);

  const processRepeatSections = (
    sections: Partial<TrailRunningInterval>[],
    skipLast: boolean
  ): TrailRunningInterval[] => {
    if (skipLast && sections.length > 0) {
      const lastSection = sections[sections.length - 1];
      if (lastSection.type === 'rest' || lastSection.type === 'recovery') {
        return sections.slice(0, -1).map((section, index) => ({
          ...section,
          id: `${Date.now()}-${index}`,
          type: (section.type as IntervalType) || 'run',
        })) as TrailRunningInterval[];
      }
    }
    return sections.map((section, index) => ({
      ...section,
      id: `${Date.now()}-${index}`,
      type: (section.type as IntervalType) || 'run',
    })) as TrailRunningInterval[];
  };

  const getDefaultName = (type: string): string => {
    const names: Record<string, string> = {
      'warm-up': 'Warm-up',
      'cool-down': 'Cool-down',
      run: 'Steady Run',
      walk: 'Recovery Walk',
      'uphill-repeat': 'Hill Repeats',
      'downhill-repeat': 'Downhill Repeats',
      recovery: 'Recovery',
      rest: 'Rest Break',
      caco: 'CACO Run/Walk',
      fartlek: 'Fartlek Play',
      series: 'Section Series',
    };
    return names[type] || 'Training Section';
  };

  return (
    <div className="p-6">
      <TrailRunningHeader
        mode={mode}
        onCancel={onCancel}
        onSave={() => onSave(workoutData)}
        canSave={canSave}
      />

      <WorkoutStats
        targetDistance={workoutData.targetDistance}
        estimatedDuration={workoutData.estimatedDuration}
        elevationGain={workoutData.elevationGain}
      />

      <WorkoutOverview
        name={workoutData.name}
        description={workoutData.description}
        difficulty={workoutData.difficulty}
        onNameChange={name => setWorkoutData(prev => ({ ...prev, name }))}
        onDescriptionChange={description =>
          setWorkoutData(prev => ({ ...prev, description }))
        }
        onDifficultyChange={difficulty =>
          setWorkoutData(prev => ({ ...prev, difficulty }))
        }
        difficultyLevels={difficultyLevels}
      />

      {/* Training Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Section Form */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center justify-between">
              <span>
                {editingSection
                  ? 'Edit Training Section'
                  : 'Add Training Section'}
              </span>
              {editingSection && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelEdit}
                  className="text-gray-600 hover:text-gray-700"
                >
                  Cancel Edit
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Section Type</Label>
              <div className="space-y-2">
                <Select
                  value={currentSection.type}
                  onValueChange={(value: TrailRunningSection['type']) => {
                    const newType = value;
                    const selectedType = sectionTypes.find(
                      t => t.value === newType
                    );

                    // Auto-enable repeat for certain types and apply smart defaults
                    const shouldAutoRepeat = selectedType?.autoRepeat || false;
                    const smartDefaults = shouldAutoRepeat
                      ? getSmartDefaults(newType)
                      : null;

                    setCurrentSection(prev => ({
                      ...prev,
                      type: newType,
                      isRepeated: shouldAutoRepeat,
                      repeatCount: smartDefaults?.repeatCount || 1,
                      name: prev.name || getDefaultName(newType),
                    }));

                    // Set smart intervals if available
                    if (shouldAutoRepeat && smartDefaults?.intervals) {
                      setRepeatIntervals(
                        smartDefaults.intervals.map((interval, index) => {
                          const mappedInterval: Partial<TrailRunningInterval> =
                            {
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
                        })
                      );
                    } else if (!shouldAutoRepeat) {
                      setRepeatIntervals([]);
                    }
                  }}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue>
                      {currentSection.type &&
                        ((): React.ReactElement | null => {
                          const selectedType = sectionTypes.find(
                            t => t.value === currentSection.type
                          );
                          if (selectedType) {
                            return (
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center space-x-3">
                                  <span className="text-2xl">
                                    {selectedType.icon}
                                  </span>
                                  <div className="flex flex-col items-start">
                                    <span className="font-medium">
                                      {selectedType.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {selectedType.description}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {/* Basic Types */}
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/30">
                      Basic Types
                    </div>
                    {sectionCategories.basic.map(type => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="p-3"
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <span className="text-xl">{type.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">{type.label}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {type.description}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}

                    {/* Rest & Recovery */}
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/30 mt-1">
                      Rest & Recovery
                    </div>
                    {sectionCategories.rest.map(type => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="p-3"
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <span className="text-xl">{type.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">{type.label}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {type.description}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}

                    {/* Structured Types */}
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/30 mt-1">
                      Structured Types
                    </div>
                    {sectionCategories.structured.map(type => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="p-3"
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <span className="text-xl">{type.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">{type.label}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {type.description}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Section Name</Label>
              <Input
                placeholder="e.g., Steep Ascent to Summit"
                value={currentSection.name || ''}
                onChange={e =>
                  setCurrentSection(prev => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="h-10"
              />
            </div>

            {/* Repeat Option */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={currentSection.isRepeated || false}
                    onCheckedChange={checked => {
                      setCurrentSection(prev => ({
                        ...prev,
                        isRepeated: checked,
                      }));
                      if (!checked) {
                        setRepeatIntervals([]);
                      } else {
                        // Auto-populate smart defaults when manually enabling
                        const smartDefaults = getSmartDefaults(
                          currentSection.type || 'warm-up'
                        );
                        if (smartDefaults) {
                          setCurrentSection(prev => ({
                            ...prev,
                            repeatCount: smartDefaults.repeatCount,
                          }));
                          setRepeatIntervals(
                            smartDefaults.intervals.map((interval, index) => {
                              const mappedInterval: Partial<TrailRunningInterval> =
                                {
                                  ...interval,
                                  id: `${Date.now()}-${index}`,
                                  type:
                                    (interval.type as IntervalType) || 'run',
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
                            })
                          );
                        }
                      }
                    }}
                  />
                  <Label className="text-sm font-medium">
                    Create Repeated Section Block
                  </Label>
                </div>
              </div>

              {sectionTypes.find(t => t.value === currentSection.type)
                ?.autoRepeat && (
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
                        {sectionTypes
                          .find(t => t.value === currentSection.type)
                          ?.label.toLowerCase()}{' '}
                        with{' '}
                        {
                          getSmartDefaults(currentSection.type || 'warm-up')
                            ?.repeatCount
                        }{' '}
                        repetitions and suggested intervals. You can customize
                        them below.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentSection.isRepeated && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Number of Repetitions
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={currentSection.repeatCount || 1}
                      onChange={e =>
                        setCurrentSection(prev => ({
                          ...prev,
                          repeatCount: parseInt(e.target.value) || 1,
                        }))
                      }
                      className="h-10"
                    />
                  </div>

                  {/* Skip Last Rest Option */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={skipLastRest}
                          onCheckedChange={setSkipLastRest}
                        />
                        <Label className="text-sm">
                          Skip last rest/recovery interval
                        </Label>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      When enabled, the last interval will be removed if
                      it&apos;s a rest or recovery type
                    </p>
                  </div>

                  {/* Repeat Intervals */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">
                        Repeat Intervals
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addRepeatInterval}
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
                          <span className="text-sm font-medium">
                            Interval {index + 1}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRepeatInterval(index)}
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
                                updateRepeatInterval(
                                  index,
                                  'name',
                                  e.target.value
                                )
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
                                updateRepeatInterval(index, 'type', value)
                              }
                            >
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="run">Run</SelectItem>
                                <SelectItem value="walk">Walk</SelectItem>
                                <SelectItem value="uphill">Uphill</SelectItem>
                                <SelectItem value="downhill">
                                  Downhill
                                </SelectItem>
                                <SelectItem value="sprint">Sprint</SelectItem>
                                <SelectItem value="recovery">
                                  Recovery
                                </SelectItem>
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
                                updateRepeatInterval(
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
                                updateRepeatInterval(
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
                                updateRepeatInterval(
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
                                updateRepeatInterval(
                                  index,
                                  'intensityTarget',
                                  target
                                )
                              }
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Non-repeated section configuration */}
              {!currentSection.isRepeated && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Distance (km)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={currentSection.distance || ''}
                        onChange={e =>
                          setCurrentSection(prev => ({
                            ...prev,
                            distance: parseFloat(e.target.value) || 0,
                          }))
                        }
                        placeholder="0.0"
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Duration (min)</Label>
                      <Input
                        type="number"
                        value={currentSection.duration || ''}
                        onChange={e =>
                          setCurrentSection(prev => ({
                            ...prev,
                            duration: parseInt(e.target.value) || 0,
                          }))
                        }
                        placeholder="0"
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Elevation (m)</Label>
                      <Input
                        type="number"
                        value={currentSection.elevationChange || ''}
                        onChange={e =>
                          setCurrentSection(prev => ({
                            ...prev,
                            elevationChange: parseInt(e.target.value) || 0,
                          }))
                        }
                        placeholder="0"
                        className="h-10"
                      />
                    </div>
                  </div>

                  {currentSection.type !== 'rest' && (
                    <div className="space-y-2">
                      <Label className="text-sm">Intensity Target</Label>
                      <IntensityTargetConfiguration
                        target={currentSection.intensityTarget}
                        onChange={target =>
                          setCurrentSection(prev => ({
                            ...prev,
                            intensityTarget: target,
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
              )}

              <Button
                onClick={() => {
                  if (currentSection.isRepeated) {
                    const processedIntervals = processRepeatSections(
                      repeatIntervals,
                      skipLastRest
                    );
                    addSection();
                    setCurrentSection(prev => ({
                      ...prev,
                      repeatSections: processedIntervals,
                    }));
                  } else {
                    addSection();
                  }
                }}
                disabled={!currentSection.name || !currentSection.type}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                {editingSection ? 'Update Section' : 'Add Section'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sections List */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Training Sections</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2">
            {workoutData.sections.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No sections added yet.</p>
                <p className="text-sm">
                  Start by adding your first training section.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {workoutData.sections.map((section, index) => {
                  const selectedType = sectionTypes.find(
                    t => t.value === section.type
                  );
                  return (
                    <div
                      key={section.id}
                      className="p-4 border border-gray-200 rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">
                            {selectedType?.icon || '🏃'}
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {section.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {selectedType?.label} •{' '}
                              {section.isRepeated
                                ? `${section.repeatCount}x repeated`
                                : 'Single section'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editSection(section)}
                            className="h-8 w-8 p-0"
                          >
                            ✏️
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSection(section.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            🗑️
                          </Button>
                        </div>
                      </div>

                      {section.isRepeated ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Total Distance
                              </span>
                              <span className="font-medium text-gray-900">
                                {(
                                  section.repeatSections?.reduce(
                                    (sum, sub) => sum + (sub.distance || 0),
                                    0
                                  ) * (section.repeatCount || 1)
                                ).toFixed(2)}
                                km
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-blue-600 block">
                                Total Duration
                              </span>
                              <span className="font-medium text-blue-900">
                                {section.repeatSections?.reduce(
                                  (sum, sub) => sum + (sub.duration || 0),
                                  0
                                ) * (section.repeatCount || 1)}
                                min
                              </span>
                            </div>
                          </div>

                          {/* Intervals */}
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Per Repetition:
                            </p>
                            <div className="space-y-2">
                              {section.repeatSections?.map(
                                (interval, intervalIndex) => (
                                  <div
                                    key={intervalIndex}
                                    className="ml-4 p-3 bg-gray-50 rounded-lg"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium text-sm">
                                        {interval.name}
                                      </span>
                                      {interval.type !== 'rest' && (
                                        <span
                                          className={`px-2 py-1 rounded-full text-xs font-medium ${getIntensityTargetColor(
                                            interval.intensityTarget
                                          )}`}
                                        >
                                          {formatIntensityTargetDisplay(
                                            interval.intensityTarget
                                          )}
                                        </span>
                                      )}
                                    </div>
                                    {interval.type === 'rest' ? (
                                      // Rest intervals only show duration
                                      <div className="text-sm text-gray-600">
                                        <div>
                                          <span className="text-xs text-gray-500 block">
                                            Duration
                                          </span>
                                          <span className="font-medium">
                                            {interval.duration
                                              ? `${interval.duration}min`
                                              : 'Not set'}
                                          </span>
                                        </div>
                                      </div>
                                    ) : (
                                      // All other intervals show distance, duration, and elevation
                                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                                        <div>
                                          <span className="text-xs text-gray-500 block">
                                            Distance
                                          </span>
                                          <span>
                                            {interval.distance
                                              ? `${interval.distance}km`
                                              : 'Not set'}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="text-xs text-gray-500 block">
                                            Duration
                                          </span>
                                          <span>
                                            {interval.duration
                                              ? `${interval.duration}min`
                                              : 'Not set'}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="text-xs text-gray-500 block">
                                            Elevation
                                          </span>
                                          <span>
                                            {interval.elevationChange
                                              ? `${
                                                  interval.elevationChange > 0
                                                    ? '+'
                                                    : ''
                                                }${interval.elevationChange}m`
                                              : '0m'}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* Intensity target for non-repeated sections */}
                          {section.type !== 'rest' && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">
                                Intensity:
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getIntensityTargetColor(
                                  section.intensityTarget
                                )}`}
                              >
                                {formatIntensityTargetDisplay(
                                  section.intensityTarget
                                )}
                              </span>
                            </div>
                          )}

                          {/* Section details */}
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Distance
                              </span>
                              <span className="font-medium">
                                {section.distance
                                  ? `${section.distance}km`
                                  : 'Not set'}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Duration
                              </span>
                              <span className="font-medium">
                                {section.duration
                                  ? `${section.duration}min`
                                  : 'Not set'}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Elevation
                              </span>
                              <span className="font-medium">
                                {section.elevationChange
                                  ? `${
                                      section.elevationChange > 0 ? '+' : ''
                                    }${section.elevationChange}m`
                                  : '0m'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
