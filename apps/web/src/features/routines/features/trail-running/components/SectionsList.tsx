'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import {
  formatIntensityTargetDisplay,
  getIntensityTargetColor,
} from '@/features/routines/utils/trailRunningUtils';
import { TrailRunningSection } from '@/features/routines/types';

interface SectionsListProps {
  sections: TrailRunningSection[];
  onEditSection: (section: TrailRunningSection) => void;
  onRemoveSection: (sectionId: string) => void;
}

// Section type definitions for icons
const sectionTypes = [
  { value: 'warm-up', icon: '🔥' },
  { value: 'run', icon: '🏃' },
  { value: 'walk', icon: '🚶' },
  { value: 'recovery', icon: '🔄' },
  { value: 'rest', icon: '⏸️' },
  { value: 'uphill-repeat', icon: '⛰️' },
  { value: 'downhill-repeat', icon: '📉' },
  { value: 'caco', icon: '🔄' },
  { value: 'fartlek', icon: '⚡' },
  { value: 'series', icon: '📊' },
  { value: 'w-series', icon: '📈' },
  { value: 'cool-down', icon: '❄️' },
];

const SectionsList = ({
  sections,
  onEditSection,
  onRemoveSection,
}: SectionsListProps): React.ReactElement => {
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Training Sections</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2">
        {sections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No sections added yet.</p>
            <p className="text-sm">
              Start by adding your first training section.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map((section, index) => {
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
                          {selectedType?.value} •{' '}
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
                        onClick={() => onEditSection(section)}
                        className="h-8 w-8 p-0"
                      >
                        ✏️
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveSection(section.id)}
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
                              (section.repeatSections || []).reduce(
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
                            {(section.repeatSections || []).reduce(
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
  );
};

export default SectionsList;
