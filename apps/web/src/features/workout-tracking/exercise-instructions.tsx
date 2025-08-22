'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';
import type { ExerciseInstruction } from '@/features/workout-tracking/workout';

interface ExerciseInstructionsProps {
  instructions: ExerciseInstruction;
  exerciseName: string;
}

export function ExerciseInstructions({
  instructions,
  exerciseName,
}: ExerciseInstructionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-0 bg-muted/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-foreground">
            Exercise Instructions
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          {/* Step-by-Step Instructions */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Step-by-Step Instructions
            </h4>
            <div className="space-y-3">
              {instructions.stepByStep.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-1">
                      {step.title}
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips and Common Mistakes */}
          <div className="grid grid-cols-1 gap-4">
            {/* Pro Tips */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Pro Tips
                </span>
              </div>
              <div className="space-y-2">
                {instructions.proTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-green-700 leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  Common Mistakes
                </span>
              </div>
              <div className="space-y-2">
                {instructions.commonMistakes.map((mistake, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-red-700 leading-relaxed">
                      {mistake}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
