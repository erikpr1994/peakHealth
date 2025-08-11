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

interface RoutineDetailsFormProps {
  name: string;
  difficulty: string;
  description: string;
  objectives: string;
  onNameChange: (name: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onDescriptionChange: (description: string) => void;
  onObjectivesChange: (objectives: string) => void;
}

const RoutineDetailsForm = ({
  name,
  difficulty,
  description,
  objectives,
  onNameChange,
  onDifficultyChange,
  onDescriptionChange,
  onObjectivesChange,
}: RoutineDetailsFormProps): React.ReactElement => {
  return (
    <Card className="mb-8">
      <div className="p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Routine Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div>
          <Label htmlFor="objectives" className="block mb-2">
            Training Objectives
          </Label>
          <Textarea
            id="objectives"
            value={objectives}
            onChange={e => onObjectivesChange(e.target.value)}
            placeholder="What are the main goals and focus areas of this routine?"
            rows={3}
          />
        </div>
      </div>
    </Card>
  );
};

export default RoutineDetailsForm;
