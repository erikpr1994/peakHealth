'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TrailRunningSection } from '@/features/routines/types';

interface SectionTypeSelectorProps {
  value: TrailRunningSection['type'];
  onValueChange: (value: TrailRunningSection['type']) => void;
}

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

const SectionTypeSelector = ({
  value,
  onValueChange,
}: SectionTypeSelectorProps): React.ReactElement => {
  const selectedType = sectionTypes.find(t => t.value === value);

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Section Type</Label>
      <div className="space-y-2">
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="h-12">
            <SelectValue>
              {selectedType && (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{selectedType.icon}</span>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{selectedType.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {selectedType.description}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="w-full">
            {/* Basic Types */}
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/30">
              Basic Types
            </div>
            {sectionCategories.basic.map(type => (
              <SelectItem key={type.value} value={type.value} className="p-3">
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
              <SelectItem key={type.value} value={type.value} className="p-3">
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
              <SelectItem key={type.value} value={type.value} className="p-3">
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
  );
};

export default SectionTypeSelector;
