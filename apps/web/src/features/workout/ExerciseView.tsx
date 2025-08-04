import {
  Play,
  Info,
  Target,
  Clock,
  RotateCcw,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Star,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface Exercise {
  id: string;
  name: string;
  instructions: string;
  muscleGroups: string[];
  sets: Array<{
    id: string;
    type: 'reps' | 'time';
    reps?: string;
    weight?: string;
    duration?: string;
    restTime: string;
  }>;
  // Enhanced exercise data
  description?: string;
  type?: string;
  equipment?: string[];
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  mechanics?: string;
  rating?: number;
  totalRatings?: number;
  steps?: Array<{
    title: string;
    description: string;
  }>;
  proTips?: string[];
  commonMistakes?: string[];
  videoUrl?: string;
  videoDuration?: string;
}

interface ExerciseViewProps {
  exercise: Exercise;
  currentSet: {
    id: string;
    type: 'reps' | 'time';
    reps?: string;
    weight?: string;
    duration?: string;
    restTime: string;
  };
  setNumber: number;
  totalSets: number;
  onSetCompleted: (data: {
    weight?: string;
    reps?: string;
    duration?: string;
    notes?: string;
  }) => void;
}

export default function ExerciseView({
  exercise,
  currentSet,
  setNumber,
  totalSets,
  onSetCompleted,
}: ExerciseViewProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showProTips, setShowProTips] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Enhanced mock data - in real app this would come from the exercise database
  const enhancedExercise: Exercise = {
    ...exercise,
    description:
      "The bench press is a compound exercise that targets the chest, shoulders, and triceps. It's one of the most popular strength training exercises and is essential for building upper body strength.",
    type: 'Strength',
    equipment: ['Barbell', 'Bench'],
    difficulty: 'Intermediate',
    mechanics: 'Compound',
    rating: 4.8,
    totalRatings: 124,
    steps: [
      {
        title: 'Starting Position',
        description:
          'Lie flat on the bench with your feet planted firmly on the floor. Your eyes should be directly under the barbell.',
      },
      {
        title: 'Grip',
        description:
          'Grip the barbell with hands slightly wider than shoulder-width apart. Wrap your thumbs around the bar for safety.',
      },
      {
        title: 'Lowering Phase',
        description:
          'Lower the bar slowly and under control to your mid-chest. Keep your elbows at approximately a 45-75 degree angle.',
      },
      {
        title: 'Pressing Phase',
        description:
          'Push the bar back up to the starting position by extending your arms. Focus on pushing through your chest muscles.',
      },
      {
        title: 'Breathing',
        description:
          'Inhale during the lowering phase and exhale during the pressing phase.',
      },
    ],
    proTips: [
      'Keep your wrists straight and directly above your elbows.',
      'Maintain a slight arch in your lower back, but keep your butt on the bench.',
      'Drive through your feet for stability and added power.',
      'Keep your shoulder blades retracted and "tucked" throughout the movement.',
      'Focus on pushing yourself away from the bar, rather than pushing the bar away from you.',
    ],
    commonMistakes: [
      'Bouncing the bar off your chest, which can lead to injury.',
      'Lifting your butt off the bench, which reduces stability.',
      'Flaring your elbows out too wide, which can strain your shoulders.',
      'Not lowering the bar to chest level, which reduces the effectiveness.',
      'Using too much weight and sacrificing proper form.',
    ],
    videoUrl: '/videos/bench-press-demo.mp4',
    videoDuration: '3:45 min',
  };

  const handleStartSet = () => {
    onSetCompleted({});
  };

  const getSetTypeIcon = (type: string) => {
    switch (type) {
      case 'reps':
        return <RotateCcw className="w-5 h-5" />;
      case 'time':
        return <Clock className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Beginner: 'bg-green-100 text-green-700',
      Intermediate: 'bg-yellow-100 text-yellow-700',
      Advanced: 'bg-red-100 text-red-700',
    };
    return colors[difficulty as keyof typeof colors] || colors.Intermediate;
  };

  const formatSetTarget = () => {
    if (currentSet.type === 'reps') {
      return {
        primary: currentSet.reps || '8-12',
        secondary: currentSet.weight || 'Bodyweight',
        primaryLabel: 'Target Reps',
        secondaryLabel: 'Weight',
      };
    } else {
      return {
        primary: currentSet.duration || '30s',
        secondary: currentSet.weight || 'Bodyweight',
        primaryLabel: 'Duration',
        secondaryLabel: 'Weight',
      };
    }
  };

  const setTarget = formatSetTarget();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        {/* Exercise Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 sm:px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            Set {setNumber} of {totalSets}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl sm:text-2xl">🏋️</span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                {enhancedExercise.name}
              </h1>
              {enhancedExercise.rating && (
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-gray-600">
                      {enhancedExercise.rating} ({enhancedExercise.totalRatings}{' '}
                      ratings)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Exercise Metadata */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 max-w-2xl mx-auto">
            {enhancedExercise.type && (
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">Type</div>
                <div className="font-medium text-gray-800">
                  {enhancedExercise.type}
                </div>
              </div>
            )}
            {enhancedExercise.equipment && (
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">Equipment</div>
                <div className="font-medium text-gray-800">
                  {enhancedExercise.equipment.join(', ')}
                </div>
              </div>
            )}
            {enhancedExercise.difficulty && (
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">Difficulty</div>
                <span
                  className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
                    enhancedExercise.difficulty
                  )}`}
                >
                  {enhancedExercise.difficulty}
                </span>
              </div>
            )}
            {enhancedExercise.mechanics && (
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">Mechanics</div>
                <div className="font-medium text-gray-800">
                  {enhancedExercise.mechanics}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {enhancedExercise.muscleGroups.map(muscle => (
              <Badge key={muscle} variant="secondary" className="text-sm">
                {muscle}
              </Badge>
            ))}
          </div>
        </div>

        {/* Current Set Target Card */}
        <Card className="p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 bg-white shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              {getSetTypeIcon(currentSet.type)}
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
              Current Set Target
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-lg mx-auto mb-6 sm:mb-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-2">
                  {setTarget.primary}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
                  {setTarget.primaryLabel}
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {setTarget.secondary}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
                  {setTarget.secondaryLabel}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  Rest after set: {currentSet.restTime}s
                </span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleStartSet}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 sm:px-12 py-3 text-base sm:text-lg w-full sm:w-auto"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              Start Set
            </Button>
          </div>
        </Card>

        {/* Exercise Information Sections */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          {/* Step-by-Step Instructions */}
          <Card className="overflow-hidden">
            <Collapsible
              open={showInstructions}
              onOpenChange={setShowInstructions}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-sm sm:text-base">
                        Step-by-Step Instructions
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Detailed breakdown of proper form
                      </p>
                    </div>
                  </div>
                  {showInstructions ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 pb-6 space-y-4">
                  {enhancedExercise.steps?.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 mb-1">
                          {step.title}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Pro Tips */}
          <Card className="overflow-hidden">
            <Collapsible open={showProTips} onOpenChange={setShowProTips}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Pro Tips</h3>
                      <p className="text-sm text-gray-600">
                        Expert advice for better performance
                      </p>
                    </div>
                  </div>
                  {showProTips ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 pb-6">
                  <ul className="space-y-3">
                    {enhancedExercise.proTips?.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Common Mistakes */}
          <Card className="overflow-hidden">
            <Collapsible open={showMistakes} onOpenChange={setShowMistakes}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Common Mistakes</h3>
                      <p className="text-sm text-gray-600">
                        What to avoid for safety and effectiveness
                      </p>
                    </div>
                  </div>
                  {showMistakes ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 pb-6">
                  <ul className="space-y-3">
                    {enhancedExercise.commonMistakes?.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Video Demo */}
          {enhancedExercise.videoUrl && (
            <Card className="overflow-hidden">
              <Collapsible open={showVideo} onOpenChange={setShowVideo}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Play className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">Video Demonstration</h3>
                        <p className="text-sm text-gray-600">
                          Watch proper form and technique (
                          {enhancedExercise.videoDuration})
                        </p>
                      </div>
                    </div>
                    {showVideo ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6">
                    <div className="bg-gray-100 h-64 rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button className="h-16 w-16 rounded-full bg-white/80 hover:bg-white/90">
                          <Play className="w-6 h-6 text-indigo-600" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600">
                        Watch this demonstration to ensure proper form and
                        technique.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )}
        </div>

        {/* All Sets for This Exercise */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            All Sets for This Exercise
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {enhancedExercise.sets.map((set, index) => (
              <div
                key={set.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  index + 1 === setNumber
                    ? 'border-indigo-500 bg-indigo-50'
                    : index + 1 < setNumber
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Set {index + 1}
                  </div>
                  <div className="font-semibold">
                    {set.type === 'reps' ? set.reps : set.duration}
                  </div>
                  <div className="text-xs text-gray-500">{set.weight}</div>
                  {index + 1 < setNumber && (
                    <div className="text-xs text-green-600 mt-1">
                      ✓ Complete
                    </div>
                  )}
                  {index + 1 === setNumber && (
                    <div className="text-xs text-indigo-600 mt-1">
                      ● Current
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
