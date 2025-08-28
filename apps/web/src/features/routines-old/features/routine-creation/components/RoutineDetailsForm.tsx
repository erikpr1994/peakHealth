'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ObjectivesInput from './ObjectivesInput';

interface RoutineDetailsFormProps {
  name: string;
  difficulty: string;
  goal: string;
  description: string;
  objectives: string[];
  duration: number;
  onNameChange: (name: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onGoalChange: (goal: string) => void;
  onDescriptionChange: (description: string) => void;
  onObjectivesChange: (objectives: string[]) => void;
  onDurationChange: (duration: number) => void;
}

const RoutineDetailsForm = ({
  name,
  difficulty,
  goal,
  description,
  objectives,
  duration,
  onNameChange,
  onDifficultyChange,
  onGoalChange,
  onDescriptionChange,
  onObjectivesChange,
  onDurationChange,
}: RoutineDetailsFormProps): React.ReactElement => {
  return (
    <Card className="mb-8">
      <div className="p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Routine Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <Label htmlFor="name" className="block mb-2">
              Routine Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={e => onNameChange(e.target.value)}
              placeholder="Enter routine name..."
            />
          </div>
          <div>
            <Label htmlFor="difficulty" className="block mb-2">
              Difficulty
            </Label>
            <Select value={difficulty} onValueChange={onDifficultyChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="goal" className="block mb-2">
              Goal
            </Label>
            <Select value={goal} onValueChange={onGoalChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Strength">Strength</SelectItem>
                <SelectItem value="Hypertrophy">Hypertrophy</SelectItem>
                <SelectItem value="Endurance">Endurance</SelectItem>
                <SelectItem value="Weight Loss">Weight Loss</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="duration" className="block mb-2">
              Duration (weeks)
            </Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="52"
              value={duration}
              onChange={e => onDurationChange(Number(e.target.value))}
              placeholder="12"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="block mb-2">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
            placeholder="Describe your routine..."
            rows={3}
          />
        </div>

        <ObjectivesInput
          label="Training Objectives"
          objectives={objectives}
          onChange={onObjectivesChange}
          placeholder="What are the main goals and focus areas of this routine?"
        />
      </div>
    </Card>
  );
};

export default RoutineDetailsForm;
