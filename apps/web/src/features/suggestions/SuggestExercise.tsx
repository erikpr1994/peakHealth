import {
  ArrowLeft,
  Send,
  Plus,
  X,
  Video,
  Image,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Page } from '@/types/app';

interface SuggestExerciseProps {
  onNavigate: (page: Page, id?: string) => void;
}

interface ExerciseSuggestion {
  name: string;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  instructions: string;
  tips: string;
  commonMistakes: string;
  variations: string[];
  alternativeNames: string[];
  videoUrl?: string;
  imageUrls: string[];
  reasonForSuggestion: string;
  sourcesReferences: string;
  isCompoundMovement: boolean;
  safetyNotes: string;
  targetReps?: string;
  targetSets?: string;
  restTime?: string;
}

export default function SuggestExercise({ onNavigate }: SuggestExerciseProps) {
  const [exerciseData, setExerciseData] = useState<ExerciseSuggestion>({
    name: '',
    category: '',
    muscleGroups: [],
    equipment: [],
    difficulty: 'beginner',
    instructions: '',
    tips: '',
    commonMistakes: '',
    variations: [],
    alternativeNames: [],
    videoUrl: '',
    imageUrls: [],
    reasonForSuggestion: '',
    sourcesReferences: '',
    isCompoundMovement: false,
    safetyNotes: '',
    targetReps: '',
    targetSets: '',
    restTime: '',
  });

  const [newVariation, setNewVariation] = useState('');
  const [newAlternateName, setNewAlternateName] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const categories = [
    'Chest',
    'Back',
    'Shoulders',
    'Arms',
    'Legs',
    'Core',
    'Cardio',
    'Full Body',
    'Flexibility',
    'Balance',
    'Power',
    'Olympic Lifts',
  ];

  const muscleGroups = [
    'Chest',
    'Back',
    'Shoulders',
    'Biceps',
    'Triceps',
    'Forearms',
    'Quadriceps',
    'Hamstrings',
    'Glutes',
    'Calves',
    'Core',
    'Abs',
    'Obliques',
    'Lower Back',
    'Traps',
    'Lats',
    'Rhomboids',
    'Delts',
  ];

  const equipmentOptions = [
    'None (Bodyweight)',
    'Barbell',
    'Dumbbells',
    'Kettlebell',
    'Resistance Bands',
    'Cable Machine',
    'Pull-up Bar',
    'Bench',
    'Swiss Ball',
    'Medicine Ball',
    'TRX/Suspension Trainer',
    'Yoga Mat',
    'Foam Roller',
    'Parallette Bars',
    'Olympic Rings',
    'Plyo Box',
    'Battle Ropes',
    'Landmine',
    'Smith Machine',
  ];

  const difficultyLevels = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'New to exercise or movement pattern',
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'Some experience with similar movements',
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'Experienced with complex movements',
    },
    {
      id: 'expert',
      name: 'Expert',
      description: 'High level of skill and strength required',
    },
  ];

  // Check if required fields are filled
  const isMinimumRequirementsMet = () => {
    return (
      exerciseData.name.trim() !== '' &&
      exerciseData.category !== '' &&
      exerciseData.reasonForSuggestion.trim() !== ''
    );
  };

  // Calculate completion percentage
  const calculateCompletionPercentage = () => {
    const sections = [
      {
        name: 'Basic Info',
        completed:
          exerciseData.name &&
          exerciseData.category &&
          exerciseData.muscleGroups.length > 0,
      },
      {
        name: 'Reason',
        completed: exerciseData.reasonForSuggestion.trim() !== '',
      },
      {
        name: 'Alternative Names',
        completed: exerciseData.alternativeNames.length > 0,
      },
      { name: 'Equipment', completed: exerciseData.equipment.length > 0 },
      {
        name: 'Instructions',
        completed: exerciseData.instructions.trim() !== '',
      },
      {
        name: 'Programming',
        completed: exerciseData.targetReps || exerciseData.targetSets,
      },
      { name: 'Variations', completed: exerciseData.variations.length > 0 },
      {
        name: 'Media',
        completed: exerciseData.videoUrl || exerciseData.imageUrls.length > 0,
      },
    ];

    const completed = sections.filter(s => s.completed).length;
    return Math.round((completed / sections.length) * 100);
  };

  const handleMuscleGroupToggle = (muscle: string) => {
    setExerciseData(prev => ({
      ...prev,
      muscleGroups: prev.muscleGroups.includes(muscle)
        ? prev.muscleGroups.filter(m => m !== muscle)
        : [...prev.muscleGroups, muscle],
    }));
  };

  const handleEquipmentToggle = (equipment: string) => {
    setExerciseData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment],
    }));
  };

  const handleAddVariation = () => {
    if (newVariation && !exerciseData.variations.includes(newVariation)) {
      setExerciseData(prev => ({
        ...prev,
        variations: [...prev.variations, newVariation],
      }));
      setNewVariation('');
    }
  };

  const handleRemoveVariation = (variation: string) => {
    setExerciseData(prev => ({
      ...prev,
      variations: prev.variations.filter(v => v !== variation),
    }));
  };

  const handleAddAlternateName = () => {
    if (
      newAlternateName &&
      !exerciseData.alternativeNames.includes(newAlternateName)
    ) {
      setExerciseData(prev => ({
        ...prev,
        alternativeNames: [...prev.alternativeNames, newAlternateName],
      }));
      setNewAlternateName('');
    }
  };

  const handleRemoveAlternateName = (name: string) => {
    setExerciseData(prev => ({
      ...prev,
      alternativeNames: prev.alternativeNames.filter(n => n !== name),
    }));
  };

  const handleAddImageUrl = () => {
    if (newImageUrl && !exerciseData.imageUrls.includes(newImageUrl)) {
      setExerciseData(prev => ({
        ...prev,
        imageUrls: [...prev.imageUrls, newImageUrl],
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImageUrl = (url: string) => {
    setExerciseData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter(u => u !== url),
    }));
  };

  const handleSubmitSuggestion = () => {
    // In a real app, this would submit to an API for professional review
    console.log('Submitting exercise suggestion:', exerciseData);
    onNavigate('suggestions');
  };

  const completionPercentage = calculateCompletionPercentage();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onNavigate('exercises')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Suggest Exercise
            </h1>
            <p className="text-gray-500 mt-2">
              Help expand our exercise library with detailed movement
              descriptions
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onNavigate('exercises')}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitSuggestion}
            disabled={!isMinimumRequirementsMet()}
            className="bg-primary text-primary-foreground"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Suggestion
          </Button>
        </div>
      </div>

      {/* Progress and Information */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Completion</div>
              <div className="text-sm text-gray-600">
                {completionPercentage}%
              </div>
            </div>
            <Progress value={completionPercentage} className="w-32" />
          </div>
          <div className="text-sm text-gray-600">
            {isMinimumRequirementsMet() ? (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                Ready to submit
              </span>
            ) : (
              <span className="text-amber-600">
                Complete required fields to submit
              </span>
            )}
          </div>
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Required:</strong> Exercise name, category, and reason for
            suggestion.
            <strong>Optional but encouraged:</strong> Additional details help
            our team review and approve suggestions faster.
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-8">
        {/* 1. Basic Information - REQUIRED */}
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <Badge variant="destructive" className="text-xs">
              Required
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="lg:col-span-2 xl:col-span-3">
              <Label htmlFor="name">Exercise Name *</Label>
              <Input
                id="name"
                value={exerciseData.name}
                onChange={e =>
                  setExerciseData({ ...exerciseData, name: e.target.value })
                }
                placeholder="e.g., Bulgarian Split Squat, Single-Arm Dumbbell Row"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="category">Primary Category *</Label>
              <Select
                value={exerciseData.category}
                onValueChange={value =>
                  setExerciseData({ ...exerciseData, category: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select
                value={exerciseData.difficulty}
                onValueChange={(value: ExerciseSuggestion['difficulty']) =>
                  setExerciseData({ ...exerciseData, difficulty: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map(level => (
                    <SelectItem key={level.id} value={level.id}>
                      <div>
                        <div className="font-medium">{level.name}</div>
                        <div className="text-xs text-gray-500">
                          {level.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="xl:col-span-1">
              <div className="flex items-center space-x-2 mt-8">
                <Checkbox
                  id="compound"
                  checked={exerciseData.isCompoundMovement}
                  onCheckedChange={checked =>
                    setExerciseData({
                      ...exerciseData,
                      isCompoundMovement: !!checked,
                    })
                  }
                />
                <Label htmlFor="compound">
                  This is a compound movement (works multiple muscle groups)
                </Label>
              </div>
            </div>

            {/* Target Muscle Groups */}
            <div className="lg:col-span-2 xl:col-span-3">
              <Label className="mb-3 block">Target Muscle Groups</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {muscleGroups.map(muscle => (
                  <div key={muscle} className="flex items-center space-x-2">
                    <Checkbox
                      id={muscle}
                      checked={exerciseData.muscleGroups.includes(muscle)}
                      onCheckedChange={() => handleMuscleGroupToggle(muscle)}
                    />
                    <Label htmlFor={muscle} className="text-sm cursor-pointer">
                      {muscle}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* 2. Why suggest this exercise? - REQUIRED */}
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold">
              Why suggest this exercise?
            </h3>
            <Badge variant="destructive" className="text-xs">
              Required
            </Badge>
          </div>

          <div className="max-w-4xl">
            <Textarea
              value={exerciseData.reasonForSuggestion}
              onChange={e =>
                setExerciseData({
                  ...exerciseData,
                  reasonForSuggestion: e.target.value,
                })
              }
              placeholder="Help our team understand why this exercise should be added. Is it effective for specific goals? Does it fill a gap in our current library? Is it commonly requested?"
              rows={4}
              className="mb-4"
            />

            <div className="text-sm text-gray-600">
              This information helps our review team prioritize and validate
              exercise suggestions.
            </div>
          </div>
        </Card>

        {/* 3. Alternative Names - OPTIONAL */}
        <Card className="p-6 border-l-4 border-l-gray-300">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold">Alternative Names</h3>
            <Badge variant="secondary" className="text-xs">
              Optional
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            List other names this exercise might be known by to improve
            searchability.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="alternateName">Add Alternative Name</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="alternateName"
                  value={newAlternateName}
                  onChange={e => setNewAlternateName(e.target.value)}
                  placeholder="e.g., Rear Foot Elevated Split Squat"
                  onKeyPress={e =>
                    e.key === 'Enter' && handleAddAlternateName()
                  }
                />
                <Button type="button" onClick={handleAddAlternateName}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {exerciseData.alternativeNames.length > 0 && (
              <div>
                <Label>Alternative Names</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {exerciseData.alternativeNames.map(name => (
                    <Badge
                      key={name}
                      variant="secondary"
                      className="flex items-center gap-1 px-2 py-1"
                    >
                      {name}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveAlternateName(name)}
                        className="h-auto p-0 ml-1 hover:bg-transparent"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* 4. Equipment - OPTIONAL */}
        <Card className="p-6 border-l-4 border-l-gray-300">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold">Required Equipment</h3>
            <Badge variant="secondary" className="text-xs">
              Optional
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Select all equipment needed to perform this exercise.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {equipmentOptions.map(equipment => (
              <div key={equipment} className="flex items-center space-x-2">
                <Checkbox
                  id={equipment}
                  checked={exerciseData.equipment.includes(equipment)}
                  onCheckedChange={() => handleEquipmentToggle(equipment)}
                />
                <Label htmlFor={equipment} className="text-sm cursor-pointer">
                  {equipment}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* 5. Instructions & Details - OPTIONAL */}
        <Card className="p-6 border-l-4 border-l-gray-300">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold">Exercise Instructions</h3>
            <Badge variant="secondary" className="text-xs">
              Optional
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="instructions">Step-by-step Instructions</Label>
              <Textarea
                id="instructions"
                value={exerciseData.instructions}
                onChange={e =>
                  setExerciseData({
                    ...exerciseData,
                    instructions: e.target.value,
                  })
                }
                placeholder="1. Start in a standing position with feet hip-width apart...&#10;2. Step your right foot back into a lunge position...&#10;3. Lower your body until your front thigh is parallel to the ground..."
                className="mt-2"
                rows={8}
              />
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="tips">Form Tips & Cues</Label>
                <Textarea
                  id="tips"
                  value={exerciseData.tips}
                  onChange={e =>
                    setExerciseData({ ...exerciseData, tips: e.target.value })
                  }
                  placeholder="• Keep your torso upright throughout the movement&#10;• Drive through your front heel when returning to start&#10;• Focus on controlled movement rather than speed..."
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="commonMistakes">Common Mistakes</Label>
                <Textarea
                  id="commonMistakes"
                  value={exerciseData.commonMistakes}
                  onChange={e =>
                    setExerciseData({
                      ...exerciseData,
                      commonMistakes: e.target.value,
                    })
                  }
                  placeholder="• Leaning too far forward&#10;• Pushing off the back foot instead of the front&#10;• Not going deep enough in the lunge..."
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="safetyNotes">Safety Notes & Precautions</Label>
              <Textarea
                id="safetyNotes"
                value={exerciseData.safetyNotes}
                onChange={e =>
                  setExerciseData({
                    ...exerciseData,
                    safetyNotes: e.target.value,
                  })
                }
                placeholder="Start with bodyweight only. Avoid this exercise if you have knee injuries. Ensure proper warm-up before performing..."
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* 6. Programming Recommendations - OPTIONAL */}
        <Card className="p-6 border-l-4 border-l-gray-300">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold">
              Programming Recommendations
            </h3>
            <Badge variant="secondary" className="text-xs">
              Optional
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="lg:col-span-2">
              <Label htmlFor="targetSets">Recommended Sets</Label>
              <Input
                id="targetSets"
                value={exerciseData.targetSets}
                onChange={e =>
                  setExerciseData({
                    ...exerciseData,
                    targetSets: e.target.value,
                  })
                }
                placeholder="e.g., 3-4, 2-3"
                className="mt-2"
              />
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="targetReps">Recommended Reps</Label>
              <Input
                id="targetReps"
                value={exerciseData.targetReps}
                onChange={e =>
                  setExerciseData({
                    ...exerciseData,
                    targetReps: e.target.value,
                  })
                }
                placeholder="e.g., 8-12, 10-15 each leg"
                className="mt-2"
              />
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="restTime">Rest Time</Label>
              <Input
                id="restTime"
                value={exerciseData.restTime}
                onChange={e =>
                  setExerciseData({ ...exerciseData, restTime: e.target.value })
                }
                placeholder="e.g., 60-90s, 2-3 minutes"
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* 7. Variations - OPTIONAL */}
        <Card className="p-6 border-l-4 border-l-gray-300">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold">Exercise Variations</h3>
            <Badge variant="secondary" className="text-xs">
              Optional
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            List different ways to perform or modify this exercise.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="variation">Add Variation</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="variation"
                  value={newVariation}
                  onChange={e => setNewVariation(e.target.value)}
                  placeholder="e.g., Weighted Bulgarian Split Squat, Jumping Bulgarian Split Squat"
                  onKeyPress={e => e.key === 'Enter' && handleAddVariation()}
                />
                <Button type="button" onClick={handleAddVariation}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {exerciseData.variations.length > 0 && (
              <div>
                <Label>Variations</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {exerciseData.variations.map(variation => (
                    <Badge
                      key={variation}
                      variant="secondary"
                      className="flex items-center gap-1 px-2 py-1"
                    >
                      {variation}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveVariation(variation)}
                        className="h-auto p-0 ml-1 hover:bg-transparent"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* 8. Media & References - OPTIONAL */}
        <Card className="p-6 border-l-4 border-l-gray-300">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold">Media & References</h3>
            <Badge variant="secondary" className="text-xs">
              Optional
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="videoUrl" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Instructional Video URL
              </Label>
              <Input
                id="videoUrl"
                value={exerciseData.videoUrl}
                onChange={e =>
                  setExerciseData({ ...exerciseData, videoUrl: e.target.value })
                }
                placeholder="https://youtube.com/watch?v=..."
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="sourcesReferences">Sources & References</Label>
              <Textarea
                id="sourcesReferences"
                value={exerciseData.sourcesReferences}
                onChange={e =>
                  setExerciseData({
                    ...exerciseData,
                    sourcesReferences: e.target.value,
                  })
                }
                placeholder="List any books, studies, or expert sources that support this exercise..."
                className="mt-2"
                rows={3}
              />
            </div>

            <div className="lg:col-span-2">
              <Label htmlFor="imageUrl" className="flex items-center gap-2">
                <Image className="w-4 h-4" aria-label="Image icon" />
                Reference Images
              </Label>
              <div className="flex gap-2 mt-2 mb-4">
                <Input
                  id="imageUrl"
                  value={newImageUrl}
                  onChange={e => setNewImageUrl(e.target.value)}
                  placeholder="https://example.com/exercise-image.jpg"
                  onKeyPress={e => e.key === 'Enter' && handleAddImageUrl()}
                />
                <Button type="button" onClick={handleAddImageUrl}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {exerciseData.imageUrls.length > 0 && (
                <div>
                  <Label>Image URLs</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {exerciseData.imageUrls.map((url, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm text-gray-600 flex-1 truncate">
                          {url}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveImageUrl(url)}
                          className="h-auto p-1"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Bottom submission area */}
        <Card className="p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">
                Ready to submit your suggestion?
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {isMinimumRequirementsMet()
                  ? `Great! Your suggestion is ${completionPercentage}% complete and ready for review.`
                  : 'Complete the required fields above to submit your suggestion.'}
              </p>
            </div>
            <Button
              onClick={handleSubmitSuggestion}
              disabled={!isMinimumRequirementsMet()}
              className="bg-primary text-primary-foreground"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Suggestion
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
