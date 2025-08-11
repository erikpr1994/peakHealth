'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IntensityTarget } from '@/features/routines/types';

interface IntensityTargetConfigurationProps {
  target?: IntensityTarget;
  onChange: (target: IntensityTarget) => void;
}

const IntensityTargetConfiguration = ({
  target,
  onChange,
}: IntensityTargetConfigurationProps): React.ReactElement => {
  const [localTarget, setLocalTarget] = useState<IntensityTarget>(
    target || { type: 'heart-rate', minValue: 140, maxValue: 160, unit: 'bpm' }
  );

  const handleTargetTypeChange = (newType: string): void => {
    const newTarget: IntensityTarget = {
      type: newType as IntensityTarget['type'],
      unit:
        newType === 'heart-rate'
          ? 'bpm'
          : newType === 'speed'
            ? 'min/km'
            : newType === 'power'
              ? 'W'
              : newType === 'cadence'
                ? 'rpm'
                : 'RPE',
    };
    setLocalTarget(newTarget);
    onChange(newTarget);
  };

  const getZoneDescription = (zone: number): string => {
    const zones = {
      1: 'Active Recovery',
      2: 'Endurance',
      3: 'Tempo',
      4: 'Threshold',
      5: 'VO2 Max',
      6: 'Anaerobic',
      7: 'Neuromuscular',
    };
    return zones[zone as keyof typeof zones] || `Zone ${zone}`;
  };

  const getRPEDescription = (level: number): string => {
    const descriptions = {
      1: 'Very Easy',
      2: 'Easy',
      3: 'Moderate',
      4: 'Somewhat Hard',
      5: 'Hard',
      6: 'Hard',
      7: 'Very Hard',
      8: 'Very Hard',
      9: 'Very Hard',
      10: 'Maximum',
    };
    return descriptions[level as keyof typeof descriptions] || `RPE ${level}`;
  };

  const renderTargetInputs = (): React.ReactElement | null => {
    switch (localTarget.type) {
      case 'heart-rate':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Heart Rate (bpm)</Label>
              <Input
                type="number"
                placeholder="140"
                value={localTarget.minValue || ''}
                onChange={e => {
                  const newTarget = {
                    ...localTarget,
                    minValue: parseInt(e.target.value) || undefined,
                  };
                  setLocalTarget(newTarget);
                  onChange(newTarget);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Heart Rate (bpm)</Label>
              <Input
                type="number"
                placeholder="160"
                value={localTarget.maxValue || ''}
                onChange={e => {
                  const newTarget = {
                    ...localTarget,
                    maxValue: parseInt(e.target.value) || undefined,
                  };
                  setLocalTarget(newTarget);
                  onChange(newTarget);
                }}
              />
            </div>
          </div>
        );

      case 'speed':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Pace (min/km)</Label>
              <Input
                placeholder="5:30"
                value={localTarget.minValue || ''}
                onChange={e => {
                  const newTarget = {
                    ...localTarget,
                    minValue: e.target.value,
                  };
                  setLocalTarget(newTarget);
                  onChange(newTarget);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Pace (min/km)</Label>
              <Input
                placeholder="4:30"
                value={localTarget.maxValue || ''}
                onChange={e => {
                  const newTarget = {
                    ...localTarget,
                    maxValue: e.target.value,
                  };
                  setLocalTarget(newTarget);
                  onChange(newTarget);
                }}
              />
            </div>
          </div>
        );

      case 'power':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Power Zone</Label>
              <Select
                value={localTarget.zone || ''}
                onValueChange={value => {
                  const newTarget = { ...localTarget, zone: value };
                  setLocalTarget(newTarget);
                  onChange(newTarget);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select power zone" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7].map(zone => (
                    <SelectItem key={zone} value={zone.toString()}>
                      Zone {zone} - {getZoneDescription(zone)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min Power (W)</Label>
                <Input
                  type="number"
                  placeholder="200"
                  value={localTarget.minValue || ''}
                  onChange={e => {
                    const newTarget = {
                      ...localTarget,
                      minValue: parseInt(e.target.value) || undefined,
                    };
                    setLocalTarget(newTarget);
                    onChange(newTarget);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Power (W)</Label>
                <Input
                  type="number"
                  placeholder="300"
                  value={localTarget.maxValue || ''}
                  onChange={e => {
                    const newTarget = {
                      ...localTarget,
                      maxValue: parseInt(e.target.value) || undefined,
                    };
                    setLocalTarget(newTarget);
                    onChange(newTarget);
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'cadence':
        return (
          <div className="space-y-2">
            <Label>Target Cadence (rpm)</Label>
            <Input
              type="number"
              placeholder="180"
              value={localTarget.value || ''}
              onChange={e => {
                const newTarget = {
                  ...localTarget,
                  value: parseInt(e.target.value) || undefined,
                };
                setLocalTarget(newTarget);
                onChange(newTarget);
              }}
            />
          </div>
        );

      case 'rpe':
        return (
          <div className="space-y-2">
            <Label>RPE Level (1-10)</Label>
            <Select
              value={localTarget.value?.toString() || ''}
              onValueChange={value => {
                const newTarget = { ...localTarget, value: parseInt(value) };
                setLocalTarget(newTarget);
                onChange(newTarget);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select RPE level" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                  <SelectItem key={level} value={level.toString()}>
                    RPE {level} - {getRPEDescription(level)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Intensity Target Type</Label>
        <Select value={localTarget.type} onValueChange={handleTargetTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="heart-rate">Heart Rate</SelectItem>
            <SelectItem value="speed">Speed/Pace</SelectItem>
            <SelectItem value="power">Power</SelectItem>
            <SelectItem value="cadence">Cadence</SelectItem>
            <SelectItem value="rpe">
              RPE (Rate of Perceived Exertion)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {renderTargetInputs()}
    </div>
  );
};

export default IntensityTargetConfiguration;
