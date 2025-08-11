'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WorkoutOverviewProps {
  name: string;
  difficulty: string;
  description: string;
  onNameChange: (name: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onDescriptionChange: (description: string) => void;
}

const difficultyLevels = [
  { value: 'beginner', label: 'Beginner', color: 'bg-green-500' },
  { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500' },
  { value: 'advanced', label: 'Advanced', color: 'bg-orange-500' },
  { value: 'expert', label: 'Expert', color: 'bg-red-500' },
];

const WorkoutOverview = ({
  name,
  difficulty,
  description,
  onNameChange,
  onDifficultyChange,
  onDescriptionChange,
}: WorkoutOverviewProps): React.ReactElement => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Workout Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="block mb-2">
              Workout Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., Mountain Peak Challenge"
              value={name}
              onChange={e => onNameChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty" className="block mb-2">
              Difficulty Level
            </Label>
            <Select value={difficulty} onValueChange={onDifficultyChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficultyLevels.map(level => (
                  <SelectItem key={level.value} value={level.value}>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          level.color.split(' ')[0]
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
          <Label htmlFor="description" className="block mb-2">
            Description
          </Label>
          <textarea
            id="description"
            className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Describe your trail running workout, terrain challenges, and what makes it special..."
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutOverview;
