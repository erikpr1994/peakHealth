'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Trophy,
  Clock,
  Target,
  TrendingUp,
  Camera,
  Video,
  Upload,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { WorkoutFeedback } from '@/features/workout-tracking/workout-feedback';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  rpe: number;
  restTime: number;
  isUnilateral?: boolean;
  unilateralMode?: 'sequential' | 'alternating' | 'rest-between-sides';
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
  side?: 'left' | 'right' | 'both';
  // For unilateral exercises, store separate data for each side
  leftSide?: {
    reps: number;
    weight: string;
    rpe: number;
  };
  rightSide?: {
    reps: number;
    weight: string;
    rpe: number;
  };
}

interface SetMedia {
  setId: string;
  type: 'image' | 'video';
  url: string;
}

interface WorkoutReviewProps {
  routine: WorkoutRoutine;
  completedSets: CompletedSet[];
  totalTime: number;
  startTime: Date;
}

export const WorkoutReview = ({
  routine,
  completedSets,
  totalTime,
  startTime,
}: WorkoutReviewProps) => {
  const [setMedia, setSetMedia] = useState<SetMedia[]>([]);
  const [uploadingMedia, setUploadingMedia] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [editingUnilateralData, setEditingUnilateralData] = useState<{
    [key: string]: CompletedSet;
  }>({});

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateTotalVolume = () => {
    return completedSets.reduce((total, set) => {
      const weight =
        Number.parseFloat(set.actualWeight.replace(/[^\d.]/g, '')) || 0;
      return total + weight * set.actualReps;
    }, 0);
  };

  const calculateAverageRPE = () => {
    const totalRPE = completedSets.reduce((sum, set) => sum + set.actualRpe, 0);
    return (totalRPE / completedSets.length).toFixed(1);
  };

  const getExerciseStats = (exerciseId: string) => {
    const exerciseSets = completedSets.filter(
      set => set.exerciseId === exerciseId
    );
    const exercise = routine.exercises.find(ex => ex.id === exerciseId);
    return { exerciseSets, exercise };
  };

  const handleMediaUpload = async (setId: string, type: 'image' | 'video') => {
    setUploadingMedia(setId);

    // Simulate file upload - replace with actual upload logic
    setTimeout(() => {
      const mockUrl =
        type === 'image'
          ? `/placeholder.svg?height=200&width=200&query=workout-${type}`
          : `/placeholder.svg?height=200&width=200&query=workout-video`;

      setSetMedia(prev => [...prev, { setId, type, url: mockUrl }]);
      setUploadingMedia(null);
    }, 1500);
  };

  const handleContinueToFeedback = () => {
    setShowFeedback(true);
  };

  const handleFinishWorkout = () => {
    // Navigate back to home or dashboard
    window.location.href = '/';
  };

  const handleUnilateralDataChange = (
    setId: string,
    side: 'left' | 'right',
    field: 'reps' | 'weight' | 'rpe',
    value: string | number
  ) => {
    setEditingUnilateralData(prev => ({
      ...prev,
      [setId]: {
        ...prev[setId],
        [`${side}Side`]: {
          ...prev[setId]?.[`${side}Side` as keyof CompletedSet],
          [field]: field === 'reps' || field === 'rpe' ? Number(value) : value,
        },
      },
    }));
  };

  const getUnilateralData = (set: CompletedSet, setId: string) => {
    const editingData = editingUnilateralData[setId];
    return {
      leftSide: editingData?.leftSide ||
        set.leftSide || {
          reps: set.actualReps,
          weight: set.actualWeight,
          rpe: set.actualRpe,
        },
      rightSide: editingData?.rightSide ||
        set.rightSide || {
          reps: set.actualReps,
          weight: set.actualWeight,
          rpe: set.actualRpe,
        },
    };
  };

  if (showFeedback) {
    return (
      <WorkoutFeedback
        routine={routine}
        completedSets={completedSets}
        totalTime={totalTime}
        startTime={startTime}
        onComplete={handleFinishWorkout}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Workout Complete!
        </h1>
        <p className="text-muted-foreground">{formatDate(startTime)}</p>
      </div>

      {/* Workout Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">
            {routine.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Duration</span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {formatTime(totalTime)}
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Total Sets
                </span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {completedSets.length}
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Volume</span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {calculateTotalVolume().toFixed(0)}kg
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Avg RPE</span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {calculateAverageRPE()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Results */}
      <div className="space-y-4 mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Exercise Results
        </h2>

        {routine.exercises.map(exercise => {
          const { exerciseSets } = getExerciseStats(exercise.id);

          if (exerciseSets.length === 0) return null;

          return (
            <Card key={exercise.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-foreground">
                  {exercise.name}
                </CardTitle>
                {exercise.isUnilateral && (
                  <Badge variant="secondary" className="text-xs w-fit">
                    Unilateral • {exercise.unilateralMode?.replace('-', ' ')}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {exerciseSets.map((set, index) => {
                  const setId = `${exercise.id}-${set.setNumber}`;
                  const hasMedia = setMedia.some(
                    media => media.setId === setId
                  );
                  const isUploading = uploadingMedia === setId;

                  return (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          Set {set.setNumber}
                        </span>
                        {!exercise.isUnilateral ? (
                          <Badge variant="outline" className="text-xs">
                            RPE {set.actualRpe}
                          </Badge>
                        ) : (
                          <div className="flex gap-1">
                            <Badge variant="outline" className="text-xs">
                              L: RPE{' '}
                              {getUnilateralData(set, setId).leftSide.rpe}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              R: RPE{' '}
                              {getUnilateralData(set, setId).rightSide.rpe}
                            </Badge>
                          </div>
                        )}
                      </div>

                      {exercise.isUnilateral ? (
                        <div className="space-y-4 mb-3">
                          {/* Left Side */}
                          <div className="border rounded-md p-3 bg-muted/30">
                            <Label className="text-xs font-medium text-muted-foreground mb-2 block">
                              Left Side
                            </Label>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Reps
                                </Label>
                                <Input
                                  type="number"
                                  value={
                                    getUnilateralData(set, setId).leftSide.reps
                                  }
                                  onChange={e =>
                                    handleUnilateralDataChange(
                                      setId,
                                      'left',
                                      'reps',
                                      e.target.value
                                    )
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Weight
                                </Label>
                                <Input
                                  value={
                                    getUnilateralData(set, setId).leftSide
                                      .weight
                                  }
                                  onChange={e =>
                                    handleUnilateralDataChange(
                                      setId,
                                      'left',
                                      'weight',
                                      e.target.value
                                    )
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  RPE
                                </Label>
                                <Input
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={
                                    getUnilateralData(set, setId).leftSide.rpe
                                  }
                                  onChange={e =>
                                    handleUnilateralDataChange(
                                      setId,
                                      'left',
                                      'rpe',
                                      e.target.value
                                    )
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Right Side */}
                          <div className="border rounded-md p-3 bg-muted/30">
                            <Label className="text-xs font-medium text-muted-foreground mb-2 block">
                              Right Side
                            </Label>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Reps
                                </Label>
                                <Input
                                  type="number"
                                  value={
                                    getUnilateralData(set, setId).rightSide.reps
                                  }
                                  onChange={e =>
                                    handleUnilateralDataChange(
                                      setId,
                                      'right',
                                      'reps',
                                      e.target.value
                                    )
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  Weight
                                </Label>
                                <Input
                                  value={
                                    getUnilateralData(set, setId).rightSide
                                      .weight
                                  }
                                  onChange={e =>
                                    handleUnilateralDataChange(
                                      setId,
                                      'right',
                                      'weight',
                                      e.target.value
                                    )
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  RPE
                                </Label>
                                <Input
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={
                                    getUnilateralData(set, setId).rightSide.rpe
                                  }
                                  onChange={e =>
                                    handleUnilateralDataChange(
                                      setId,
                                      'right',
                                      'rpe',
                                      e.target.value
                                    )
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-muted-foreground">
                              Reps:{' '}
                            </span>
                            <span className="font-medium text-foreground">
                              {set.actualReps}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Weight:{' '}
                            </span>
                            <span className="font-medium text-foreground">
                              {set.actualWeight}
                            </span>
                          </div>
                        </div>
                      )}

                      {set.notes && (
                        <div className="mb-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            Notes:
                          </p>
                          <p className="text-sm text-foreground">{set.notes}</p>
                        </div>
                      )}

                      {/* Media Upload */}
                      <div className="flex gap-2">
                        {!hasMedia && !isUploading && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMediaUpload(setId, 'image')}
                              className="flex-1"
                            >
                              <Camera className="w-3 h-3 mr-1" />
                              Photo
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMediaUpload(setId, 'video')}
                              className="flex-1"
                            >
                              <Video className="w-3 h-3 mr-1" />
                              Video
                            </Button>
                          </>
                        )}

                        {isUploading && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Upload className="w-3 h-3 animate-pulse" />
                            Uploading...
                          </div>
                        )}

                        {hasMedia && (
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <CheckCircle2 className="w-3 h-3" />
                            Media uploaded
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pb-6">
        <Button
          onClick={handleContinueToFeedback}
          className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          Continue to Feedback
        </Button>

        <Button
          onClick={handleFinishWorkout}
          variant="outline"
          className="w-full h-10 bg-transparent"
          size="lg"
        >
          Skip Feedback & Finish
        </Button>
      </div>
    </div>
  );
};
