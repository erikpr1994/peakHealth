import {
  Mountain,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
  Navigation,
  Repeat,
  Play,
  Pause,
  Plus,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface TrailRunningWorkoutProps {
  onSave: (workoutData: TrailRunningWorkoutData) => void;
  onCancel: () => void;
  initialData?: TrailRunningWorkoutData;
  mode: "create" | "edit";
}

export type IntervalType =
  | "run"
  | "uphill"
  | "downhill"
  | "sprint"
  | "recovery"
  | "rest"
  | "walk";

export interface TrailRunningInterval {
  id: string;
  name: string;
  type: IntervalType;
  distance?: number;
  duration?: number;
  intensityTarget?: IntensityTarget;
  elevationChange?: number;
}

export interface TrailRunningWorkoutData {
  id: string;
  name: string;
  description: string;
  type: "trail-running";
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  estimatedDuration: number; // calculated from sections
  targetDistance: number; // calculated from sections
  elevationGain: number; // calculated from sections
  sections: TrailRunningSection[];
}

export interface IntensityTarget {
  type: "heart-rate" | "speed" | "power" | "cadence" | "rpe";
  value?: number; // For fixed values (cadence)
  minValue?: number | string; // For ranges (heart rate, power zones) or pace strings (speed)
  maxValue?: number | string; // For ranges (heart rate, power zones) or pace strings (speed)
  zone?: string; // For power zones (Z1, Z2, etc.)
  unit?: string; // Display unit (bpm, min/km, rpm, etc.)
}

export interface TrailRunningSection {
  id: string;
  name: string;
  type:
    | "warm-up"
    | "cool-down"
    | "run"
    | "walk"
    | "uphill-repeat"
    | "downhill-repeat"
    | "recovery"
    | "rest"
    | "caco"
    | "fartlek"
    | "series"
    | "w-series";
  distance?: number; // in km
  duration?: number; // in minutes
  intensityTarget?: IntensityTarget; // Flexible intensity target configuration
  elevationChange?: number; // in meters (positive for uphill)
  isRepeated?: boolean;
  repeatCount?: number;
  repeatSections?: TrailRunningInterval[];
}

const difficultyLevels = [
  {
    value: "beginner",
    label: "Beginner",
    color: "bg-green-100 text-green-800",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "advanced",
    label: "Advanced",
    color: "bg-orange-100 text-orange-800",
  },
  { value: "expert", label: "Expert", color: "bg-red-100 text-red-800" },
];

// Categorized section types for better organization
const sectionCategories = {
  basic: [
    {
      value: "warm-up",
      label: "Warm-up",
      icon: Zap,
      color: "text-blue-600",
      description: "Easy preparation phase",
      autoRepeat: false,
    },
    {
      value: "cool-down",
      label: "Cool-down",
      icon: Zap,
      color: "text-blue-600",
      description: "Easy recovery phase",
      autoRepeat: false,
    },
    {
      value: "run",
      label: "Run",
      icon: TrendingUp,
      color: "text-green-600",
      description: "Steady running pace",
      autoRepeat: false,
    },
    {
      value: "walk",
      label: "Walk",
      icon: Play,
      color: "text-gray-500",
      description: "Walking pace section",
      autoRepeat: false,
    },
  ],
  rest: [
    {
      value: "rest",
      label: "Rest",
      icon: Pause,
      color: "text-gray-600",
      description: "Complete rest (intensity 0)",
      autoRepeat: false,
    },
    {
      value: "recovery",
      label: "Recovery",
      icon: Play,
      color: "text-green-400",
      description: "Active recovery (intensity 0-1)",
      autoRepeat: false,
    },
  ],
  structured: [
    {
      value: "uphill-repeat",
      label: "Uphill Repeat",
      icon: Mountain,
      color: "text-orange-600",
      description: "Uphill intervals",
      autoRepeat: true,
    },
    {
      value: "downhill-repeat",
      label: "Downhill Repeat",
      icon: TrendingDown,
      color: "text-purple-600",
      description: "Downhill intervals",
      autoRepeat: true,
    },
    {
      value: "w-series",
      label: "W Series",
      icon: Zap,
      color: "text-red-600",
      description: "Paired uphill/downhill intervals",
      autoRepeat: true,
    },
    {
      value: "caco",
      label: "CACO (Run/Walk)",
      icon: TrendingUp,
      color: "text-blue-600",
      description: "Alternating run/walk",
      autoRepeat: true,
    },
    {
      value: "fartlek",
      label: "Fartlek",
      icon: Navigation,
      color: "text-indigo-600",
      description: "Playful speed variations",
      autoRepeat: true,
    },
    {
      value: "series",
      label: "Series",
      icon: Repeat,
      color: "text-orange-500",
      description: "Structured interval series",
      autoRepeat: true,
    },
  ],
};

// Basic interval types that can be used within sections
const intervalTypes = [
  {
    value: "run",
    label: "Run",
    icon: Zap,
    color: "text-green-600",
    description: "General running effort",
  },
  {
    value: "uphill",
    label: "Uphill",
    icon: Mountain,
    color: "text-orange-600",
    description: "Uphill climbing effort",
  },
  {
    value: "downhill",
    label: "Downhill",
    icon: TrendingDown,
    color: "text-purple-600",
    description: "Downhill running effort",
  },
  {
    value: "sprint",
    label: "Sprint",
    icon: TrendingUp,
    color: "text-red-600",
    description: "High intensity burst",
  },
  {
    value: "recovery",
    label: "Recovery",
    icon: Play,
    color: "text-green-400",
    description: "Active recovery",
  },
  {
    value: "rest",
    label: "Rest",
    icon: Pause,
    color: "text-gray-600",
    description: "Complete rest",
  },
  {
    value: "walk",
    label: "Walk",
    icon: Play,
    color: "text-gray-500",
    description: "Walking pace",
  },
];

// Flat array for backward compatibility
const sectionTypes = [
  ...sectionCategories.basic,
  ...sectionCategories.rest,
  ...sectionCategories.structured,
];

// Helper functions for intensity targets (moved here for global access)
const formatIntensityTargetDisplay = (target?: IntensityTarget) => {
  if (!target) return "Not set";

  // Zone descriptions for heart rate and power zones (0-5)
  const getZoneDisplayDescription = (zoneValue: number) => {
    const descriptions = [
      "Active Recovery",
      "Endurance/Base",
      "Aerobic",
      "Tempo/Lactate Threshold",
      "VO2 Max/Lactate",
      "Anaerobic Capacity",
    ];
    return descriptions[zoneValue] || "Unknown";
  };

  switch (target.type) {
    case "heart-rate":
      return `HR Zone ${target.value} - ${getZoneDisplayDescription(
        target.value || 3
      )}`;
    case "speed":
      if (target.minValue && target.maxValue) {
        return `${target.minValue}-${target.maxValue} ${target.unit}`;
      } else if (target.minValue) {
        return `${target.minValue}+ ${target.unit}`;
      } else if (target.maxValue) {
        return `<${target.maxValue} ${target.unit}`;
      }
      return `${target.value || "Not set"} ${target.unit}`;
    case "power":
      return `Power Zone ${target.value} - ${getZoneDisplayDescription(
        target.value || 3
      )}`;
    case "cadence":
      return `${target.value} ${target.unit}`;
    case "rpe":
      return `RPE ${target.value}/10`;
    default:
      return "Unknown";
  }
};

const getIntensityTargetColor = (target?: IntensityTarget) => {
  if (!target) return "bg-gray-200 text-gray-600";

  switch (target.type) {
    case "heart-rate":
      // Color based on zone intensity (0-5)
      const hrValue = target.value || 3;
      if (hrValue === 0) return "bg-gray-200 text-gray-600";
      if (hrValue <= 1) return "bg-green-200 text-green-800";
      if (hrValue <= 2) return "bg-blue-200 text-blue-800";
      if (hrValue <= 3) return "bg-yellow-200 text-yellow-800";
      if (hrValue <= 4) return "bg-orange-200 text-orange-800";
      return "bg-red-200 text-red-800";
    case "speed":
      return "bg-blue-200 text-blue-800";
    case "power":
      // Color based on zone intensity (0-5)
      const powerValue = target.value || 3;
      if (powerValue === 0) return "bg-gray-200 text-gray-600";
      if (powerValue <= 1) return "bg-green-200 text-green-800";
      if (powerValue <= 2) return "bg-blue-200 text-blue-800";
      if (powerValue <= 3) return "bg-yellow-200 text-yellow-800";
      if (powerValue <= 4) return "bg-orange-200 text-orange-800";
      return "bg-red-200 text-red-800";
    case "cadence":
      return "bg-green-200 text-green-800";
    case "rpe":
      const value = target.value || 5;
      if (value <= 2) return "bg-gray-200 text-gray-600";
      if (value <= 4) return "bg-green-200 text-green-800";
      if (value <= 6) return "bg-yellow-200 text-yellow-800";
      if (value <= 8) return "bg-orange-200 text-orange-800";
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200 text-gray-600";
  }
};

const getDefaultIntensityTarget = (type: string): IntensityTarget => {
  switch (type) {
    // Section types
    case "warm-up":
      return { type: "heart-rate", value: 1, unit: "zone" }; // Zone 1 - Endurance/Base
    case "cool-down":
      return { type: "heart-rate", value: 0, unit: "zone" }; // Zone 0 - Active Recovery
    case "run":
      return { type: "heart-rate", value: 3, unit: "zone" }; // Zone 3 - Tempo
    case "walk":
      return { type: "heart-rate", value: 1, unit: "zone" }; // Zone 1 - Light walking effort
    case "uphill-repeat":
      return { type: "power", value: 4, unit: "zone" }; // Zone 4 - VO2 Max/Lactate
    case "downhill-repeat":
      return { type: "heart-rate", value: 3, unit: "zone" }; // Zone 3 - Controlled downhill effort
    case "w-series":
      return { type: "power", value: 4, unit: "zone" }; // Zone 4 - VO2 Max/Lactate for matched uphill/downhill efforts
    case "fartlek":
      return { type: "heart-rate", value: 3, unit: "zone" }; // Zone 3 - Tempo/Lactate Threshold
    case "series":
      return { type: "power", value: 5, unit: "zone" }; // Zone 5 - Anaerobic Capacity
    case "caco":
      return { type: "rpe", value: 4, unit: "RPE" }; // Moderate RPE for run/walk

    // Interval types
    case "uphill":
      return { type: "power", value: 4, unit: "zone" }; // Zone 4 - VO2 Max/Lactate
    case "downhill":
      return { type: "heart-rate", value: 3, unit: "zone" }; // Zone 3 - Controlled effort
    case "sprint":
      return { type: "power", value: 5, unit: "zone" }; // Zone 5 - Anaerobic Capacity
    case "recovery":
      return { type: "heart-rate", value: 1, unit: "zone" }; // Zone 1 - Active Recovery
    case "rest":
      return { type: "rpe", value: 1, unit: "RPE" }; // Very light effort
    default:
      return { type: "rpe", value: 5, unit: "RPE" };
  }
};

// Intensity Target Configuration Component
function IntensityTargetConfiguration({
  target,
  onChange,
}: {
  target?: IntensityTarget;
  onChange: (target: IntensityTarget) => void;
}) {
  const intensityTargetTypes = [
    {
      value: "heart-rate",
      label: "Heart Rate",
      unit: "bpm",
      icon: "💓",
      description: "Target heart rate zone",
    },
    {
      value: "speed",
      label: "Speed",
      unit: "min/km",
      icon: "🏃",
      description: "Target pace range",
    },
    {
      value: "power",
      label: "Power Zone",
      unit: "zone",
      icon: "⚡",
      description: "Structured power zones",
    },
    {
      value: "cadence",
      label: "Cadence",
      unit: "rpm",
      icon: "🔄",
      description: "Steps per minute",
    },
    {
      value: "rpe",
      label: "Perceived Exertion",
      unit: "RPE",
      icon: "🎯",
      description: "Rate of perceived exertion (1-10)",
    },
  ];

  const currentTarget = target || { type: "rpe", value: 5, unit: "RPE" };

  const handleTargetTypeChange = (newType: string) => {
    const targetType = intensityTargetTypes.find(t => t.value === newType);
    if (!targetType) return;

    const newTarget: IntensityTarget = {
      type: newType as IntensityTarget["type"],
      unit: targetType.unit,
    };

    // Set appropriate default values based on type
    switch (newType) {
      case "heart-rate":
        newTarget.value = 3; // Zone 3 (Tempo)
        break;
      case "speed":
        newTarget.minValue = "5:00"; // 5:00 min/km
        newTarget.maxValue = "5:59"; // 5:59 min/km
        break;
      case "power":
        newTarget.value = 3; // Zone 3 (Tempo)
        break;
      case "cadence":
        newTarget.value = 180;
        break;
      case "rpe":
        newTarget.value = 5;
        break;
    }

    onChange(newTarget);
  };

  // Zone descriptions for heart rate and power zones (0-5)
  const getZoneDescription = (zone: number) => {
    const descriptions = [
      "Active Recovery",
      "Endurance/Base",
      "Aerobic",
      "Tempo/Lactate Threshold",
      "VO2 Max/Lactate",
      "Anaerobic Capacity",
    ];
    return descriptions[zone] || "Unknown";
  };

  // RPE descriptions for 1-10 scale
  const getRPEDescription = (level: number) => {
    const descriptions = [
      "", // No level 0 for RPE
      "Very Easy - Minimal effort",
      "Easy - Light effort",
      "Moderate - Some effort",
      "Somewhat Hard - Noticeable effort",
      "Hard - Strong effort",
      "Harder - Very strong effort",
      "Very Hard - Very strong effort",
      "Very, Very Hard - Maximal effort",
      "Near Maximal - Almost all-out",
      "Maximal - All-out effort",
    ];
    return descriptions[level] || "Unknown";
  };

  const renderTargetInputs = () => {
    switch (currentTarget.type) {
      case "heart-rate":
        return (
          <Select
            value={currentTarget.value?.toString() || "3"}
            onValueChange={value =>
              onChange({ ...currentTarget, value: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5].map(zone => (
                <SelectItem key={zone} value={zone.toString()}>
                  <div className="flex flex-col">
                    <span>Heart Rate Zone {zone}</span>
                    <span className="text-xs text-muted-foreground">
                      {getZoneDescription(zone)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "power":
        return (
          <Select
            value={currentTarget.value?.toString() || "3"}
            onValueChange={value =>
              onChange({ ...currentTarget, value: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5].map(zone => (
                <SelectItem key={zone} value={zone.toString()}>
                  <div className="flex flex-col">
                    <span>Power Zone {zone}</span>
                    <span className="text-xs text-muted-foreground">
                      {getZoneDescription(zone)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "speed":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Min Pace</Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="5:00"
                    value={currentTarget.minValue || ""}
                    onChange={e => {
                      const value = e.target.value;
                      // Allow partial input while typing: digits, digits with colon, or complete MM:SS
                      if (
                        value === "" ||
                        /^(\d{1,2}(:[0-5]?\d?)?)?$/.test(value)
                      ) {
                        onChange({
                          ...currentTarget,
                          minValue: value || undefined,
                        });
                      }
                    }}
                    onBlur={e => {
                      const value = e.target.value;
                      // On blur, validate complete MM:SS format and auto-format if needed
                      if (value && !/^\d{1,2}:[0-5]\d$/.test(value)) {
                        // Try to auto-format common inputs
                        if (/^\d{1,2}$/.test(value)) {
                          // Just minutes entered, add :00
                          const formattedValue = `${value}:00`;
                          onChange({
                            ...currentTarget,
                            minValue: formattedValue,
                          });
                        } else if (/^\d{1,2}:\d$/.test(value)) {
                          // Single digit seconds, pad with 0
                          const formattedValue = value.replace(
                            /(\d{1,2}):(\d)$/,
                            "$1:0$2"
                          );
                          onChange({
                            ...currentTarget,
                            minValue: formattedValue,
                          });
                        }
                      }
                    }}
                    className="pr-16"
                    maxLength={5}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                    min/km
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Max Pace</Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="5:59"
                    value={currentTarget.maxValue || ""}
                    onChange={e => {
                      const value = e.target.value;
                      // Allow partial input while typing: digits, digits with colon, or complete MM:SS
                      if (
                        value === "" ||
                        /^(\d{1,2}(:[0-5]?\d?)?)?$/.test(value)
                      ) {
                        onChange({
                          ...currentTarget,
                          maxValue: value || undefined,
                        });
                      }
                    }}
                    onBlur={e => {
                      const value = e.target.value;
                      // On blur, validate complete MM:SS format and auto-format if needed
                      if (value && !/^\d{1,2}:[0-5]\d$/.test(value)) {
                        // Try to auto-format common inputs
                        if (/^\d{1,2}$/.test(value)) {
                          // Just minutes entered, add :00
                          const formattedValue = `${value}:00`;
                          onChange({
                            ...currentTarget,
                            maxValue: formattedValue,
                          });
                        } else if (/^\d{1,2}:\d$/.test(value)) {
                          // Single digit seconds, pad with 0
                          const formattedValue = value.replace(
                            /(\d{1,2}):(\d)$/,
                            "$1:0$2"
                          );
                          onChange({
                            ...currentTarget,
                            maxValue: formattedValue,
                          });
                        }
                      }
                    }}
                    className="pr-16"
                    maxLength={5}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                    min/km
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Set pace range for this interval (e.g., 5:00-5:59 min/km)
            </p>
          </div>
        );
      case "cadence":
        return (
          <Input
            type="number"
            placeholder="Cadence (RPM)"
            value={currentTarget.value || ""}
            onChange={e =>
              onChange({
                ...currentTarget,
                value: parseInt(e.target.value) || undefined,
              })
            }
          />
        );
      case "rpe":
        return (
          <Select
            value={currentTarget.value?.toString() || "5"}
            onValueChange={value =>
              onChange({ ...currentTarget, value: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                <SelectItem key={level} value={level.toString()}>
                  <div className="flex flex-col">
                    <span>RPE {level}/10</span>
                    <span className="text-xs text-muted-foreground">
                      {getRPEDescription(level)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <Label>Intensity Target</Label>

      <Select value={currentTarget.type} onValueChange={handleTargetTypeChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {intensityTargetTypes.map(type => (
            <SelectItem key={type.value} value={type.value}>
              <div className="flex items-center space-x-2">
                <span>{type.icon}</span>
                <div>
                  <div>{type.label}</div>
                  <div className="text-xs text-gray-500">
                    {type.description}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {renderTargetInputs()}
    </div>
  );
}

export default function TrailRunningWorkout({
  onSave,
  onCancel,
  initialData,
  mode,
}: TrailRunningWorkoutProps) {
  const [workoutData, setWorkoutData] = useState<TrailRunningWorkoutData>(
    initialData || {
      id: Date.now().toString(),
      name: "",
      description: "",
      type: "trail-running",
      difficulty: "intermediate",
      estimatedDuration: 0, // calculated
      targetDistance: 0, // calculated
      elevationGain: 0, // calculated
      sections: [],
    }
  );

  const [currentSection, setCurrentSection] = useState<
    Partial<TrailRunningSection>
  >({
    type: "warm-up",
    intensityTarget: { type: "rpe", value: 3, unit: "RPE" },
    isRepeated: false,
    repeatCount: 1,
  });

  const [repeatIntervals, setRepeatIntervals] = useState<
    Partial<TrailRunningInterval>[]
  >([]);
  const [editingSection, setEditingSection] =
    useState<TrailRunningSection | null>(null);
  const [skipLastRest, setSkipLastRest] = useState(false);

  // Get smart defaults for section types
  const getSmartDefaults = (type: string) => {
    const defaults = {
      "uphill-repeat": {
        repeatCount: 6,
        intervals: [
          {
            name: "Hill Climb",
            type: "uphill",
            distance: 0.2,
            intensityTarget: { type: "power", value: 4, unit: "zone" },
            elevationChange: 30,
          },
          {
            name: "Recovery Jog",
            type: "recovery",
            distance: 0.2,
            intensityTarget: { type: "heart-rate", value: 1, unit: "zone" },
            elevationChange: -30,
          },
        ],
      },
      "downhill-repeat": {
        repeatCount: 6,
        intervals: [
          {
            name: "Downhill Run",
            type: "downhill",
            distance: 0.3,
            intensityTarget: { type: "heart-rate", value: 3, unit: "zone" },
            elevationChange: -40,
          },
          {
            name: "Easy Recovery",
            type: "recovery",
            distance: 0.2,
            intensityTarget: { type: "heart-rate", value: 1, unit: "zone" },
            elevationChange: 20,
          },
        ],
      },
      "w-series": {
        repeatCount: 6,
        intervals: [
          {
            name: "Uphill Segment",
            type: "uphill",
            distance: 0.4,
            intensityTarget: { type: "power", value: 4, unit: "zone" },
            elevationChange: 40,
          },
          {
            name: "Downhill Segment",
            type: "downhill",
            distance: 0.4,
            intensityTarget: { type: "power", value: 4, unit: "zone" },
            elevationChange: -40,
          },
        ],
      },
      caco: {
        repeatCount: 8,
        intervals: [
          {
            name: "Run Segment",
            type: "run",
            distance: 0.4,
            duration: 2,
            intensityTarget: { type: "heart-rate", value: 2, unit: "zone" },
          },
          {
            name: "Walk Break",
            type: "walk",
            distance: 0.4,
            duration: 2,
            intensityTarget: { type: "heart-rate", value: 1, unit: "zone" },
          },
        ],
      },
      fartlek: {
        repeatCount: 5,
        intervals: [
          {
            name: "Fast Surge",
            type: "sprint",
            distance: 0.3,
            intensityTarget: { type: "heart-rate", value: 4, unit: "zone" },
          },
          {
            name: "Easy Recovery",
            type: "recovery",
            distance: 0.5,
            intensityTarget: { type: "heart-rate", value: 1, unit: "zone" },
          },
        ],
      },
      series: {
        repeatCount: 4,
        intervals: [
          {
            name: "Work Interval",
            type: "run",
            distance: 0.8,
            intensityTarget: { type: "power", value: 5, unit: "zone" },
          },
          { name: "Rest Break", type: "rest", duration: 3 },
        ],
      },
    };

    return defaults[type as keyof typeof defaults];
  };

  // Calculate totals from sections
  const calculateTotals = (sections: TrailRunningSection[]) => {
    let totalDistance = 0;
    let totalDuration = 0;
    let totalElevation = 0;

    const processSection = (
      section: TrailRunningSection | TrailRunningInterval,
      multiplier: number = 1
    ) => {
      if (section.distance) totalDistance += section.distance * multiplier;
      if (section.duration) totalDuration += section.duration * multiplier;
      if (section.elevationChange)
        totalElevation += Math.max(0, section.elevationChange) * multiplier;
    };

    sections.forEach(section => {
      if (section.isRepeated && section.repeatSections && section.repeatCount) {
        section.repeatSections.forEach(repeatSection => {
          processSection(repeatSection, section.repeatCount!);
        });
      } else {
        processSection(section);
      }
    });

    return {
      distance: Math.round(totalDistance * 10) / 10,
      duration: Math.round(totalDuration),
      elevation: Math.round(totalElevation),
    };
  };

  // Update calculated values whenever sections change
  useEffect(() => {
    const totals = calculateTotals(workoutData.sections);
    setWorkoutData(prev => ({
      ...prev,
      targetDistance: totals.distance,
      estimatedDuration: totals.duration,
      elevationGain: totals.elevation,
    }));
  }, [workoutData.sections]);

  // Helper function to check if a section is rest/recovery type
  const isRestOrRecovery = (
    section: Partial<TrailRunningSection | TrailRunningInterval>
  ) => {
    return section.type === "rest" || section.type === "recovery";
  };

  // Process repeat sections with skip last rest logic
  const processRepeatSections = (
    sections: Partial<TrailRunningInterval>[],
    skipLast: boolean
  ) => {
    if (!skipLast || sections.length === 0) {
      return sections;
    }

    // Check if the last section is rest or recovery
    const lastSection = sections[sections.length - 1];
    if (isRestOrRecovery(lastSection)) {
      // Remove the last section if it's rest/recovery
      return sections.slice(0, -1);
    }

    return sections;
  };

  const addSection = () => {
    if (!currentSection.name) return;

    if (editingSection) {
      // Update existing section
      const processedRepeatIntervals = currentSection.isRepeated
        ? processRepeatSections(repeatIntervals, skipLastRest)
        : undefined;

      const updatedSection: TrailRunningSection = {
        ...editingSection,
        type: currentSection.type || "warm-up",
        name: currentSection.name,
        distance: currentSection.distance,
        duration: currentSection.duration,
        elevationChange: currentSection.elevationChange,
        intensityTarget: currentSection.intensityTarget || {
          type: "rpe",
          value: 5,
          unit: "RPE",
        },
        isRepeated: currentSection.isRepeated || false,
        repeatCount: currentSection.isRepeated
          ? currentSection.repeatCount
          : undefined,
        repeatSections: processedRepeatIntervals
          ? processedRepeatIntervals.map(
              rs =>
                ({
                  ...rs,
                  id: rs.id || Date.now().toString() + Math.random(),
                  name: rs.name || "Unnamed Interval",
                  type: rs.type || "run",
                  intensityTarget:
                    rs.intensityTarget ||
                    getDefaultIntensityTarget(rs.type || "run"),
                }) as TrailRunningInterval
            )
          : undefined,
      };

      // Store the skipLastRest setting in a custom property for editing later
      if (currentSection.isRepeated) {
        (
          updatedSection as TrailRunningSection & { skipLastRest?: boolean }
        ).skipLastRest = skipLastRest;
      }

      setWorkoutData(prev => ({
        ...prev,
        sections: prev.sections.map(section =>
          section.id === editingSection.id ? updatedSection : section
        ),
      }));

      setEditingSection(null);
    } else {
      // Add new section
      const processedRepeatIntervals = currentSection.isRepeated
        ? processRepeatSections(repeatIntervals, skipLastRest)
        : undefined;

      const section: TrailRunningSection = {
        id: Date.now().toString(),
        type: currentSection.type || "warm-up",
        name: currentSection.name,
        distance: currentSection.distance,
        duration: currentSection.duration,
        elevationChange: currentSection.elevationChange,
        intensityTarget: currentSection.intensityTarget || {
          type: "rpe",
          value: 5,
          unit: "RPE",
        },
        isRepeated: currentSection.isRepeated || false,
        repeatCount: currentSection.isRepeated
          ? currentSection.repeatCount
          : undefined,
        repeatSections: processedRepeatIntervals
          ? processedRepeatIntervals.map(
              rs =>
                ({
                  ...rs,
                  id: rs.id || Date.now().toString() + Math.random(),
                  name: rs.name || "Unnamed Interval",
                  type: rs.type || "run",
                  intensityTarget:
                    rs.intensityTarget ||
                    getDefaultIntensityTarget(rs.type || "run"),
                }) as TrailRunningInterval
            )
          : undefined,
      };

      // Store the skipLastRest setting in a custom property for editing later
      if (currentSection.isRepeated) {
        (
          section as TrailRunningSection & { skipLastRest?: boolean }
        ).skipLastRest = skipLastRest;
      }

      setWorkoutData(prev => ({
        ...prev,
        sections: [...prev.sections, section],
      }));
    }

    // Reset form with smart defaults
    const nextType = "warm-up";
    const nextTypeInfo = sectionTypes.find(t => t.value === nextType);
    const shouldAutoRepeat = nextTypeInfo?.autoRepeat || false;
    const smartDefaults = shouldAutoRepeat ? getSmartDefaults(nextType) : null;

    setCurrentSection({
      type: nextType,
      intensityTarget: { type: "rpe", value: 5, unit: "RPE" },
      isRepeated: shouldAutoRepeat,
      repeatCount: smartDefaults?.repeatCount || 1,
      name: getDefaultName(nextType),
    });

    if (shouldAutoRepeat && smartDefaults?.intervals) {
      setRepeatIntervals(
        smartDefaults.intervals.map((interval, index) => {
          const mappedInterval: Partial<TrailRunningInterval> = {
            ...interval,
            id: `${Date.now()}-${index}`,
            type: (interval.type as IntervalType) || "run",
            intensityTarget: interval.intensityTarget
              ? {
                  ...interval.intensityTarget,
                  type: interval.intensityTarget.type as
                    | "heart-rate"
                    | "speed"
                    | "power"
                    | "cadence"
                    | "rpe",
                }
              : undefined,
          };

          if (mappedInterval.type === "rest") {
            delete mappedInterval.intensityTarget;
          }

          return mappedInterval;
        }) as Partial<TrailRunningInterval>[]
      );
    } else {
      setRepeatIntervals([]);
    }
    setSkipLastRest(false);
  };

  const removeSection = (id: string) => {
    setWorkoutData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== id),
    }));
  };

  const addRepeatInterval = () => {
    setRepeatIntervals(prev => {
      // Determine appropriate default type based on current section type and position
      const getDefaultIntervalType = (currentLength: number) => {
        switch (currentSection.type) {
          case "uphill-repeat":
            return currentLength % 2 === 0 ? "uphill" : "recovery";
          case "downhill-repeat":
            return currentLength % 2 === 0 ? "downhill" : "recovery";
          case "w-series":
            // W-pattern: uphill, downhill alternating
            return currentLength % 2 === 0 ? "uphill" : "downhill";
          case "fartlek":
            return currentLength % 2 === 0 ? "sprint" : "recovery";
          case "series":
            return currentLength % 2 === 0 ? "run" : "rest";
          case "caco":
            return currentLength % 2 === 0 ? "run" : "walk";
          default:
            return "run";
        }
      };

      const intervalType = getDefaultIntervalType(prev.length);
      const newInterval: Partial<TrailRunningInterval> = {
        type: intervalType,
        name: `Interval ${prev.length + 1}`,
      };

      // Only add intensity target if not a rest interval
      if (intervalType !== "rest") {
        newInterval.intensityTarget = getDefaultIntensityTarget(intervalType);
      }

      return [...prev, newInterval];
    });
  };

  const updateRepeatInterval = (
    index: number,
    field: string,
    value: string | number | boolean | IntensityTarget
  ) => {
    setRepeatIntervals(prev =>
      prev.map((interval, i) => {
        if (i === index) {
          const updatedInterval = { ...interval, [field]: value };

          // If changing type to 'rest', clear distance, elevation, and intensity target
          if (field === "type" && value === "rest") {
            updatedInterval.distance = undefined;
            updatedInterval.elevationChange = undefined;
            updatedInterval.intensityTarget = undefined;
          }

          return updatedInterval;
        }
        return interval;
      })
    );
  };

  const removeRepeatInterval = (index: number) => {
    setRepeatIntervals(prev => prev.filter((_, i) => i !== index));
  };

  const editSection = (section: TrailRunningSection) => {
    setEditingSection(section);
    setCurrentSection({
      type: section.type,
      name: section.name,
      distance: section.distance,
      duration: section.duration,
      elevationChange: section.elevationChange,
      intensityTarget: section.intensityTarget,
      isRepeated: section.isRepeated,
      repeatCount: section.repeatCount,
    });

    if (section.isRepeated && section.repeatSections) {
      setRepeatIntervals(
        section.repeatSections.map(rs => ({
          ...rs,
        }))
      );
      // Check if skip last rest was enabled for this section (stored in a custom property)
      setSkipLastRest(
        (section as TrailRunningSection & { skipLastRest?: boolean })
          .skipLastRest || false
      );
    } else {
      setRepeatIntervals([]);
      setSkipLastRest(false);
    }
  };

  const cancelEdit = () => {
    setEditingSection(null);
    // Reset form
    const nextType = "warm-up";
    const nextTypeInfo = sectionTypes.find(t => t.value === nextType);
    const shouldAutoRepeat = nextTypeInfo?.autoRepeat || false;
    const smartDefaults = shouldAutoRepeat ? getSmartDefaults(nextType) : null;

    setCurrentSection({
      type: nextType,
      intensityTarget: { type: "rpe", value: 5, unit: "RPE" },
      isRepeated: shouldAutoRepeat,
      repeatCount: smartDefaults?.repeatCount || 1,
      name: getDefaultName(nextType),
    });

    if (shouldAutoRepeat && smartDefaults?.intervals) {
      setRepeatIntervals(
        smartDefaults.intervals.map((interval, index) => {
          const mappedInterval: Partial<TrailRunningInterval> = {
            ...interval,
            id: `${Date.now()}-${index}`,
            type: (interval.type as IntervalType) || "run",
            intensityTarget: interval.intensityTarget
              ? {
                  ...interval.intensityTarget,
                  type: interval.intensityTarget.type as
                    | "heart-rate"
                    | "speed"
                    | "power"
                    | "cadence"
                    | "rpe",
                }
              : undefined,
          };

          if (mappedInterval.type === "rest") {
            delete mappedInterval.intensityTarget;
          }

          return mappedInterval;
        }) as Partial<TrailRunningInterval>[]
      );
    } else {
      setRepeatIntervals([]);
    }
    setSkipLastRest(false);
  };

  const getDefaultName = (type: string) => {
    const names = {
      "warm-up": "Warm-up Phase",
      "cool-down": "Cool-down Phase",
      run: "Running Section",
      walk: "Walking Section",
      "uphill-repeat": "Uphill Repeats",
      "downhill-repeat": "Downhill Repeats",
      "w-series": "W Series",
      recovery: "Recovery Run",
      rest: "Rest Break",
      caco: "CACO Run/Walk",
      fartlek: "Fartlek Play",
      series: "Section Series",
    };
    return names[type as keyof typeof names] || "Training Section";
  };

  const canSave = workoutData.name.trim() && workoutData.sections.length > 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {mode === "create"
                ? "Create Trail Running Workout"
                : "Edit Trail Running Workout"}
            </h3>
            <p className="text-sm text-gray-600">
              Design your trail running adventure
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={() => onSave(workoutData)}
            disabled={!canSave}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            {mode === "create" ? "Add Workout" : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div>
        {/* Calculated Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {workoutData.targetDistance}km
              </div>
              <div className="text-sm text-gray-600">Total Distance</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {workoutData.estimatedDuration}min
              </div>
              <div className="text-sm text-gray-600">Total Duration</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                +{workoutData.elevationGain}m
              </div>
              <div className="text-sm text-gray-600">Elevation Gain</div>
            </CardContent>
          </Card>
        </div>

        {/* Workout Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Workout Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Workout Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Mountain Peak Challenge"
                  value={workoutData.name}
                  onChange={e =>
                    setWorkoutData(prev => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={workoutData.difficulty}
                  onValueChange={(
                    value: TrailRunningWorkoutData["difficulty"]
                  ) => setWorkoutData(prev => ({ ...prev, difficulty: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              level.color.split(" ")[0]
                            }`}
                          />
                          <span>{level.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Describe your trail running workout, terrain challenges, and what makes it special..."
                value={workoutData.description}
                onChange={e =>
                  setWorkoutData(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Training Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Section Form */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center justify-between">
                <span>
                  {editingSection
                    ? "Edit Training Section"
                    : "Add Training Section"}
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
                    onValueChange={(value: TrailRunningSection["type"]) => {
                      const newType = value;
                      const selectedType = sectionTypes.find(
                        t => t.value === newType
                      );
                      const defaultTarget = getDefaultIntensityTarget(newType);

                      // Auto-enable repeat for certain types and apply smart defaults
                      const shouldAutoRepeat =
                        selectedType?.autoRepeat || false;
                      const smartDefaults = shouldAutoRepeat
                        ? getSmartDefaults(newType)
                        : null;

                      setCurrentSection(prev => ({
                        ...prev,
                        type: newType,
                        intensityTarget: defaultTarget,
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
                                type: (interval.type as IntervalType) || "run",
                                intensityTarget: interval.intensityTarget
                                  ? {
                                      ...interval.intensityTarget,
                                      type: interval.intensityTarget.type as
                                        | "heart-rate"
                                        | "speed"
                                        | "power"
                                        | "cadence"
                                        | "rpe",
                                    }
                                  : undefined,
                              };

                            if (mappedInterval.type === "rest") {
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
                          (() => {
                            const selectedType = sectionTypes.find(
                              t => t.value === currentSection.type
                            );
                            if (selectedType) {
                              const Icon = selectedType.icon;
                              return (
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center space-x-3">
                                    <Icon
                                      className={`w-5 h-5 ${selectedType.color}`}
                                    />
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
                      {sectionCategories.basic.map(type => {
                        const Icon = type.icon;
                        return (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                            className="p-3"
                          >
                            <div className="flex items-center space-x-3 w-full">
                              <Icon
                                className={`w-4 h-4 ${type.color} flex-shrink-0`}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium">
                                    {type.label}
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {type.description}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}

                      {/* Rest & Recovery */}
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/30 mt-1">
                        Rest & Recovery
                      </div>
                      {sectionCategories.rest.map(type => {
                        const Icon = type.icon;
                        return (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                            className="p-3"
                          >
                            <div className="flex items-center space-x-3 w-full">
                              <Icon
                                className={`w-4 h-4 ${type.color} flex-shrink-0`}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium">
                                    {type.label}
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {type.description}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}

                      {/* Structured Types */}
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/30 mt-1">
                        Structured Types
                      </div>
                      {sectionCategories.structured.map(type => {
                        const Icon = type.icon;
                        return (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                            className="p-3"
                          >
                            <div className="flex items-center space-x-3 w-full">
                              <Icon
                                className={`w-4 h-4 ${type.color} flex-shrink-0`}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium">
                                    {type.label}
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {type.description}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Section Name</Label>
                <Input
                  placeholder="e.g., Steep Ascent to Summit"
                  value={currentSection.name || ""}
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
                            currentSection.type || "warm-up"
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
                                      (interval.type as IntervalType) || "run",
                                    intensityTarget: interval.intensityTarget
                                      ? {
                                          ...interval.intensityTarget,
                                          type: interval.intensityTarget
                                            .type as
                                            | "heart-rate"
                                            | "speed"
                                            | "power"
                                            | "cadence"
                                            | "rpe",
                                        }
                                      : undefined,
                                  };

                                if (mappedInterval.type === "rest") {
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
                          We&apos;ve automatically configured this{" "}
                          {sectionTypes
                            .find(t => t.value === currentSection.type)
                            ?.label.toLowerCase()}{" "}
                          with{" "}
                          {
                            getSmartDefaults(currentSection.type || "warm-up")
                              ?.repeatCount
                          }{" "}
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

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Intervals</Label>
                        <div className="flex items-center space-x-2">
                          {getSmartDefaults(currentSection.type || "warm-up") &&
                            repeatIntervals.length === 0 && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const smartDefaults = getSmartDefaults(
                                    currentSection.type || "warm-up"
                                  );
                                  if (smartDefaults) {
                                    setRepeatIntervals(
                                      smartDefaults.intervals.map(
                                        (interval, index) => {
                                          const mappedInterval: Partial<TrailRunningInterval> =
                                            {
                                              ...interval,
                                              id: `${Date.now()}-${index}`,
                                              type:
                                                (interval.type as IntervalType) ||
                                                "run",
                                              intensityTarget:
                                                interval.intensityTarget
                                                  ? {
                                                      ...interval.intensityTarget,
                                                      type: interval
                                                        .intensityTarget
                                                        .type as
                                                        | "heart-rate"
                                                        | "speed"
                                                        | "power"
                                                        | "cadence"
                                                        | "rpe",
                                                    }
                                                  : undefined,
                                            };

                                          if (mappedInterval.type === "rest") {
                                            delete mappedInterval.intensityTarget;
                                          }

                                          return mappedInterval;
                                        }
                                      )
                                    );
                                  }
                                }}
                                className="text-blue-600 border-blue-300 hover:bg-blue-50 h-8"
                              >
                                Use Template
                              </Button>
                            )}
                          <Button
                            size="sm"
                            onClick={addRepeatInterval}
                            className="bg-orange-600 hover:bg-orange-700 h-8"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Interval
                          </Button>
                        </div>
                      </div>

                      {repeatIntervals.map((interval, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded p-3 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <Input
                              placeholder="Interval name"
                              value={interval.name || ""}
                              onChange={e =>
                                updateRepeatInterval(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="flex-1 mr-2"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeRepeatInterval(index)}
                              className="text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Interval Type Selection */}
                          <div className="space-y-2">
                            <Label className="text-xs">Type</Label>
                            <Select
                              value={interval.type || "run"}
                              onValueChange={(value: IntervalType) =>
                                updateRepeatInterval(index, "type", value)
                              }
                            >
                              <SelectTrigger className="text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {intervalTypes.map(type => {
                                  const Icon = type.icon;
                                  return (
                                    <SelectItem
                                      key={type.value}
                                      value={type.value}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <Icon
                                          className={`w-3 h-3 ${type.color}`}
                                        />
                                        <span className="text-xs">
                                          {type.label}
                                        </span>
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            {interval.type === "rest" ? (
                              // Rest intervals only show duration
                              <>
                                <div className="text-xs text-muted-foreground">
                                  <span>Duration (min)</span>
                                </div>
                                <Input
                                  type="number"
                                  placeholder="2"
                                  value={interval.duration || ""}
                                  onChange={e =>
                                    updateRepeatInterval(
                                      index,
                                      "duration",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                />
                              </>
                            ) : (
                              // All other intervals show distance, duration, and elevation
                              <>
                                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                                  <span>Distance (km)</span>
                                  <span>Duration (min)</span>
                                  <span>Elevation (m)</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0.5"
                                    value={interval.distance || ""}
                                    onChange={e =>
                                      updateRepeatInterval(
                                        index,
                                        "distance",
                                        parseFloat(e.target.value) || 0
                                      )
                                    }
                                  />
                                  <Input
                                    type="number"
                                    placeholder="5"
                                    value={interval.duration || ""}
                                    onChange={e =>
                                      updateRepeatInterval(
                                        index,
                                        "duration",
                                        parseInt(e.target.value) || 0
                                      )
                                    }
                                  />
                                  <Input
                                    type="number"
                                    placeholder="30"
                                    value={interval.elevationChange || ""}
                                    onChange={e =>
                                      updateRepeatInterval(
                                        index,
                                        "elevationChange",
                                        parseInt(e.target.value) || 0
                                      )
                                    }
                                  />
                                </div>
                              </>
                            )}
                          </div>

                          {interval.type !== "rest" && (
                            <IntensityTargetConfiguration
                              target={interval.intensityTarget}
                              onChange={newTarget =>
                                updateRepeatInterval(
                                  index,
                                  "intensityTarget",
                                  newTarget
                                )
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!currentSection.isRepeated && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Distance (km)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="2.5"
                        value={currentSection.distance || ""}
                        onChange={e =>
                          setCurrentSection(prev => ({
                            ...prev,
                            distance: parseFloat(e.target.value) || undefined,
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Duration (min)</Label>
                      <Input
                        type="number"
                        placeholder="15"
                        value={currentSection.duration || ""}
                        onChange={e =>
                          setCurrentSection(prev => ({
                            ...prev,
                            duration: parseInt(e.target.value) || undefined,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Elevation Change (m)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 200 (positive for uphill)"
                      value={currentSection.elevationChange || ""}
                      onChange={e =>
                        setCurrentSection(prev => ({
                          ...prev,
                          elevationChange:
                            parseInt(e.target.value) || undefined,
                        }))
                      }
                    />
                  </div>
                </>
              )}

              {!currentSection.isRepeated && currentSection.type !== "rest" && (
                <IntensityTargetConfiguration
                  target={currentSection.intensityTarget}
                  onChange={newTarget =>
                    setCurrentSection(prev => ({
                      ...prev,
                      intensityTarget: newTarget,
                    }))
                  }
                />
              )}

              <Button
                onClick={addSection}
                disabled={!currentSection.name}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {editingSection ? "Update Section" : "Add Section"}
              </Button>
            </CardContent>
          </Card>

          {/* Sections List */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center justify-between">
                <span>Training Sections ({workoutData.sections.length})</span>
                <div className="text-sm text-gray-600">
                  {workoutData.targetDistance}km •{" "}
                  {workoutData.estimatedDuration}min
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-2">
              {workoutData.sections.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No sections added yet
                </p>
              ) : (
                <div className="space-y-3">
                  {workoutData.sections.map(section => {
                    const SectionIcon =
                      sectionTypes.find(t => t.value === section.type)?.icon ||
                      Clock;
                    const sectionColor =
                      sectionTypes.find(t => t.value === section.type)?.color ||
                      "text-gray-600";

                    return (
                      <div
                        key={section.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <SectionIcon
                              className={`w-4 h-4 ${sectionColor}`}
                            />
                            <span className="font-medium">{section.name}</span>
                            {section.isRepeated && (
                              <Badge variant="outline" className="text-xs">
                                <Repeat className="w-3 h-3 mr-1" />
                                {section.repeatCount}x
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => editSection(section)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSection(section.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>

                        {section.isRepeated && section.repeatSections ? (
                          <div className="space-y-3">
                            {/* Overall section info */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-800">
                                  Block Overview
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-blue-600">
                                    {section.repeatCount} repetitions
                                  </span>
                                  {(
                                    section as TrailRunningSection & {
                                      skipLastRest?: boolean;
                                    }
                                  ).skipLastRest && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-orange-50 text-orange-600 border-orange-200"
                                    >
                                      Skip last rest
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-xs text-blue-600 block">
                                    Total Distance
                                  </span>
                                  <span className="font-medium text-blue-900">
                                    {Number(
                                      (
                                        section.repeatSections.reduce(
                                          (sum, sub) =>
                                            sum + (sub.distance || 0),
                                          0
                                        ) * (section.repeatCount || 1)
                                      ).toFixed(2)
                                    )}
                                    km
                                  </span>
                                </div>
                                <div>
                                  <span className="text-xs text-blue-600 block">
                                    Total Duration
                                  </span>
                                  <span className="font-medium text-blue-900">
                                    {section.repeatSections.reduce(
                                      (sum, sub) => sum + (sub.duration || 0),
                                      0
                                    ) * (section.repeatCount || 1)}
                                    min
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Intervals */}
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Per Repetition:
                              </p>
                              <div className="space-y-2">
                                {section.repeatSections.map(
                                  (interval, intervalIndex) => (
                                    <div
                                      key={intervalIndex}
                                      className="ml-4 p-3 bg-gray-50 rounded-lg"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-sm">
                                          {interval.name}
                                        </span>
                                        {interval.type !== "rest" && (
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
                                      {interval.type === "rest" ? (
                                        // Rest intervals only show duration
                                        <div className="text-sm text-gray-600">
                                          <div>
                                            <span className="text-xs text-gray-500 block">
                                              Duration
                                            </span>
                                            <span className="font-medium">
                                              {interval.duration
                                                ? `${interval.duration}min`
                                                : "Not set"}
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
                                                : "Not set"}
                                            </span>
                                          </div>
                                          <div>
                                            <span className="text-xs text-gray-500 block">
                                              Duration
                                            </span>
                                            <span>
                                              {interval.duration
                                                ? `${interval.duration}min`
                                                : "Not set"}
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
                                                      ? "+"
                                                      : ""
                                                  }${interval.elevationChange}m`
                                                : "0m"}
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
                            {section.type !== "rest" && (
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
                                    : "Not set"}
                                </span>
                              </div>
                              <div>
                                <span className="text-xs text-gray-500 block">
                                  Duration
                                </span>
                                <span className="font-medium">
                                  {section.duration
                                    ? `${section.duration}min`
                                    : "Not set"}
                                </span>
                              </div>
                              <div>
                                <span className="text-xs text-gray-500 block">
                                  Elevation
                                </span>
                                <span className="font-medium">
                                  {section.elevationChange
                                    ? `${
                                        section.elevationChange > 0 ? "+" : ""
                                      }${section.elevationChange}m`
                                    : "0m"}
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
    </div>
  );
}
