'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  MessageSquare,
  Star,
  ThumbsUp,
  Target,
  Zap,
  Clock,
} from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  rpe: number;
  restTime: number;
}

interface WorkoutRoutine {
  id: string;
  name: string;
  estimatedTime: number;
  totalExercises: number;
  exercises: Exercise[];
}

interface CompletedSet {
  exerciseId: string;
  setNumber: number;
  actualReps: number;
  actualWeight: string;
  actualRpe: number;
  notes?: string;
}

interface WorkoutFeedbackProps {
  routine: WorkoutRoutine;
  completedSets: CompletedSet[];
  totalTime: number;
  startTime: Date;
  onComplete: () => void;
}

interface FeedbackData {
  overallRating: number;
  difficulty: string;
  enjoyment: string;
  energyLevel: string;
  wouldRecommend: boolean;
  improvements: string[];
  additionalComments: string;
}

export const WorkoutFeedback = ({
  routine,
  completedSets,
  totalTime,
  startTime,
  onComplete,
}: WorkoutFeedbackProps) => {
  const [feedback, setFeedback] = useState<FeedbackData>({
    overallRating: 0,
    difficulty: '',
    enjoyment: '',
    energyLevel: '',
    wouldRecommend: false,
    improvements: [],
    additionalComments: '',
  });

  const handleRatingChange = (rating: number) => {
    setFeedback(prev => ({ ...prev, overallRating: rating }));
  };

  const handleImprovementChange = (improvement: string, checked: boolean) => {
    setFeedback(prev => ({
      ...prev,
      improvements: checked
        ? [...prev.improvements, improvement]
        : prev.improvements.filter(item => item !== improvement),
    }));
  };

  const handleSubmitFeedback = () => {
    // Submit feedback data - replace with actual API call
    console.log('Submitting feedback:', feedback);
    onComplete();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const improvementOptions = [
    'Exercise instructions',
    'Rest timer accuracy',
    'Exercise variety',
    'Workout duration',
    'Difficulty progression',
    'User interface',
    'Progress tracking',
    'Exercise demonstrations',
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-md min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-accent-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          How was your workout?
        </h1>
        <p className="text-muted-foreground">
          {routine.name} • {formatDate(startTime)}
        </p>
      </div>

      {/* Quick Stats Reminder */}
      <Card className="mb-6">
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-sm font-medium text-foreground">
                {formatTime(totalTime)}
              </p>
              <p className="text-xs text-muted-foreground">Duration</p>
            </div>
            <div>
              <Target className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-sm font-medium text-foreground">
                {completedSets.length}
              </p>
              <p className="text-xs text-muted-foreground">Sets</p>
            </div>
            <div>
              <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-sm font-medium text-foreground">
                {(
                  completedSets.reduce((sum, set) => sum + set.actualRpe, 0) /
                  completedSets.length
                ).toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">Avg RPE</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6 mb-8">
        {/* Overall Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Overall Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <Button
                  key={rating}
                  variant={
                    feedback.overallRating >= rating ? 'default' : 'outline'
                  }
                  size="sm"
                  className="w-12 h-12 p-0"
                  onClick={() => handleRatingChange(rating)}
                >
                  <Star
                    className={`w-5 h-5 ${feedback.overallRating >= rating ? 'fill-current' : ''}`}
                  />
                </Button>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {feedback.overallRating === 0 && 'Tap to rate your workout'}
              {feedback.overallRating === 1 && 'Poor'}
              {feedback.overallRating === 2 && 'Fair'}
              {feedback.overallRating === 3 && 'Good'}
              {feedback.overallRating === 4 && 'Very Good'}
              {feedback.overallRating === 5 && 'Excellent'}
            </p>
          </CardContent>
        </Card>

        {/* Difficulty */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              How difficult was this workout?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={feedback.difficulty}
              onValueChange={value =>
                setFeedback(prev => ({ ...prev, difficulty: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="too-easy" id="too-easy" />
                <Label htmlFor="too-easy" className="text-sm">
                  Too Easy
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="just-right" id="just-right" />
                <Label htmlFor="just-right" className="text-sm">
                  Just Right
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="challenging" id="challenging" />
                <Label htmlFor="challenging" className="text-sm">
                  Challenging
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="too-hard" id="too-hard" />
                <Label htmlFor="too-hard" className="text-sm">
                  Too Hard
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Enjoyment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              How much did you enjoy it?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={feedback.enjoyment}
              onValueChange={value =>
                setFeedback(prev => ({ ...prev, enjoyment: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="loved-it" id="loved-it" />
                <Label htmlFor="loved-it" className="text-sm">
                  Loved it!
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="liked-it" id="liked-it" />
                <Label htmlFor="liked-it" className="text-sm">
                  Liked it
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral" className="text-sm">
                  It was okay
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disliked-it" id="disliked-it" />
                <Label htmlFor="disliked-it" className="text-sm">
                  Didn't like it
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Energy Level */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              How do you feel now?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={feedback.energyLevel}
              onValueChange={value =>
                setFeedback(prev => ({ ...prev, energyLevel: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="energized" id="energized" />
                <Label htmlFor="energized" className="text-sm">
                  Energized & Strong
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="satisfied" id="satisfied" />
                <Label htmlFor="satisfied" className="text-sm">
                  Satisfied
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tired" id="tired" />
                <Label htmlFor="tired" className="text-sm">
                  Tired but Good
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exhausted" id="exhausted" />
                <Label htmlFor="exhausted" className="text-sm">
                  Completely Exhausted
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Would Recommend */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="recommend"
                checked={feedback.wouldRecommend}
                onCheckedChange={checked =>
                  setFeedback(prev => ({ ...prev, wouldRecommend: !!checked }))
                }
              />
              <Label
                htmlFor="recommend"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                <ThumbsUp className="w-4 h-4" />I would recommend this workout
                to others
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Improvements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              What could we improve?
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Select all that apply
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {improvementOptions.map(option => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={feedback.improvements.includes(option)}
                    onCheckedChange={checked =>
                      handleImprovementChange(option, !!checked)
                    }
                  />
                  <Label htmlFor={option} className="text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Comments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              Additional Comments
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Tell us more about your experience (optional)
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="How did the workout feel? Any specific exercises you loved or struggled with? Suggestions for improvement?"
              value={feedback.additionalComments}
              onChange={e =>
                setFeedback(prev => ({
                  ...prev,
                  additionalComments: e.target.value,
                }))
              }
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="pb-6">
        <Button
          onClick={handleSubmitFeedback}
          className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          Submit Feedback & Finish
        </Button>
      </div>
    </div>
  );
};
