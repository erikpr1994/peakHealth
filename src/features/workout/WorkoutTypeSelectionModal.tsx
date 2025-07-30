import { useState, useEffect } from "react";
import { X, Dumbbell, MapPin, Waves, Bike, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkoutTypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: WorkoutType) => void;
}

export type WorkoutType =
  | "strength"
  | "running"
  | "trail-running"
  | "swimming"
  | "cycling";

interface WorkoutTypeOption {
  id: WorkoutType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
  features: string[];
  comingSoon?: boolean;
}

const workoutTypes: WorkoutTypeOption[] = [
  {
    id: "strength",
    name: "Strength Training",
    description:
      "Build muscle, increase strength, and improve body composition with progressive resistance training.",
    icon: Dumbbell,
    gradient: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-900",
    iconColor: "text-indigo-600",
    features: [
      "Set & rep tracking",
      "Weight progression",
      "Rest timers",
      "Exercise library",
    ],
    comingSoon: false,
  },
  {
    id: "running",
    name: "Running",
    description:
      "Track distance, pace, and improve cardiovascular fitness through structured running workouts.",
    icon: Activity,
    gradient: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-900",
    iconColor: "text-green-600",
    features: [
      "Distance tracking",
      "Pace targets",
      "Heart rate zones",
      "Route planning",
    ],
    comingSoon: true,
  },
  {
    id: "trail-running",
    name: "Trail Running",
    description:
      "Conquer trails with elevation and terrain-specific training designed for outdoor adventures.",
    icon: MapPin,
    gradient: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-900",
    iconColor: "text-orange-600",
    features: [
      "Elevation tracking",
      "Terrain analysis",
      "Hill training",
      "Trail routes",
    ],
    comingSoon: false,
  },
  {
    id: "swimming",
    name: "Swimming",
    description:
      "Track laps, strokes, and build aquatic endurance with comprehensive pool and open water workouts.",
    icon: Waves,
    gradient: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-900",
    iconColor: "text-blue-600",
    features: [
      "Lap counting",
      "Stroke tracking",
      "Pool/open water",
      "Technique drills",
    ],
    comingSoon: true,
  },
  {
    id: "cycling",
    name: "Cycling",
    description:
      "Power through rides with comprehensive distance, power, and performance tracking.",
    icon: Bike,
    gradient: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-900",
    iconColor: "text-purple-600",
    features: ["Distance tracking", "Power meters", "Cadence", "Route mapping"],
    comingSoon: true,
  },
];

export default function WorkoutTypeSelectionModal({
  isOpen,
  onClose,
  onSelectType,
}: WorkoutTypeSelectionModalProps) {
  const [selectedType, setSelectedType] = useState<WorkoutType | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Add overflow-hidden to body when modal opens
      document.body.style.overflow = "hidden";

      // Cleanup: restore body scroll when modal closes
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  const handleSelect = (type: WorkoutType) => {
    setSelectedType(type);
  };

  const handleConfirm = () => {
    if (selectedType) {
      onSelectType(selectedType);
      setSelectedType(null);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedType(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full h-full max-w-none max-h-none m-0 bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white flex-shrink-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Choose Workout Type
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Select the type of workout you want to add to your routine. Each
              type offers specialized features and tracking capabilities.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content wrapper with proper scrolling */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {/* Available Workout Types */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Available Now
            </h4>

            <div className="space-y-6">
              {workoutTypes
                .filter((type) => !type.comingSoon)
                .map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;

                  return (
                    <div
                      key={type.id}
                      className={`relative group cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "transform scale-[1.02]"
                          : "hover:transform hover:scale-[1.01]"
                      }`}
                      onClick={() => handleSelect(type.id)}
                    >
                      <div
                        className={`
                      relative overflow-hidden rounded-2xl border-2 bg-white shadow-lg transition-all duration-300
                      ${
                        isSelected
                          ? `${type.borderColor} shadow-2xl ring-4 ${type.borderColor} ring-opacity-30`
                          : `border-gray-200 hover:${
                              type.borderColor
                            } hover:shadow-xl group-hover:ring-2 group-hover:${type.borderColor.replace(
                              "border-",
                              "ring-"
                            )}`
                      }
                    `}
                      >
                        {/* Background Gradient (only when selected) */}
                        {isSelected && (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-5`}
                          />
                        )}

                        <div className="relative p-8">
                          <div className="flex items-center space-x-6">
                            {/* Icon */}
                            <div
                              className={`
                            flex items-center justify-center w-20 h-20 rounded-2xl transition-all duration-300
                            ${
                              isSelected
                                ? `bg-gradient-to-br ${type.gradient} shadow-lg`
                                : `${type.bgColor} group-hover:shadow-md`
                            }
                          `}
                            >
                              <Icon
                                className={`
                              w-10 h-10 transition-all duration-300
                              ${isSelected ? "text-white" : type.iconColor}
                            `}
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <h3
                                  className={`
                                text-2xl font-bold transition-colors duration-300
                                ${isSelected ? type.textColor : "text-gray-900"}
                              `}
                                >
                                  {type.name}
                                </h3>
                                <div className="flex items-center space-x-3">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    Available Now
                                  </span>
                                  {isSelected && (
                                    <div
                                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${type.gradient} flex items-center justify-center shadow-lg`}
                                    >
                                      <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={3}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <p
                                className={`
                              text-base mb-4 leading-relaxed transition-colors duration-300
                              ${
                                isSelected
                                  ? type.textColor.replace("900", "700")
                                  : "text-gray-600"
                              }
                            `}
                              >
                                {type.description}
                              </p>

                              {/* Features Grid */}
                              <div className="grid grid-cols-2 gap-3">
                                {type.features.map((feature, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                  >
                                    <div
                                      className={`
                                    w-2 h-2 rounded-full transition-colors duration-300
                                    ${
                                      isSelected
                                        ? `bg-gradient-to-r ${type.gradient}`
                                        : type.iconColor.replace("text-", "bg-")
                                    }
                                  `}
                                    />
                                    <span
                                      className={`
                                    text-sm font-medium transition-colors duration-300
                                    ${
                                      isSelected
                                        ? type.textColor.replace("900", "700")
                                        : "text-gray-700"
                                    }
                                  `}
                                    >
                                      {feature}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Coming Soon Section */}
          {workoutTypes.filter((type) => type.comingSoon).length > 0 && (
            <>
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 animate-pulse"></span>
                  Coming Soon
                </h4>
              </div>

              {/* Grid for Coming Soon Items */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {workoutTypes
                  .filter((type) => type.comingSoon)
                  .map((type) => {
                    const Icon = type.icon;

                    return (
                      <div
                        key={type.id}
                        className="relative group opacity-75 cursor-not-allowed"
                      >
                        <div
                          className={`
                        relative overflow-hidden rounded-2xl border-2 bg-white shadow-lg transition-all duration-300 border-gray-200
                      `}
                        >
                          {/* Coming Soon Badge */}
                          <div className="absolute top-4 right-4 z-10">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                              Coming Soon
                            </div>
                          </div>

                          <div className="relative p-6">
                            <div className="flex items-start space-x-4">
                              {/* Icon */}
                              <div
                                className={`
                              flex items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 ${type.bgColor} flex-shrink-0
                            `}
                              >
                                <Icon className={`w-8 h-8 ${type.iconColor}`} />
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                  {type.name}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                  {type.description}
                                </p>

                                {/* Features */}
                                <div className="space-y-2">
                                  {type.features.map((feature, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center space-x-2"
                                    >
                                      <div
                                        className={`w-1.5 h-1.5 rounded-full ${type.iconColor.replace(
                                          "text-",
                                          "bg-"
                                        )}`}
                                      />
                                      <span className="text-xs font-medium text-gray-700">
                                        {feature}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 px-8 py-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {selectedType &&
                workoutTypes.find((t) => t.id === selectedType)?.comingSoon && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="text-amber-600 font-medium">
                      This workout type will be available in a future update
                    </span>
                  </div>
                )}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="px-6 py-3 text-base"
              >
                Cancel
              </Button>

              <Button
                onClick={handleConfirm}
                disabled={!selectedType}
                className={`
                  px-8 py-3 text-base font-medium transition-all duration-300
                  ${
                    selectedType
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {selectedType ? (
                  <>
                    Add {workoutTypes.find((t) => t.id === selectedType)?.name}
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </>
                ) : (
                  "Select a Workout Type"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
