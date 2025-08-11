'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WorkoutDetailsProps {
  objective: string;
  schedule: {
    weeks: string;
    day: string;
    time: string;
  };
  onUpdateObjective: (objective: string) => void;
  onUpdateSchedule: (field: 'weeks' | 'day' | 'time', value: string) => void;
}

const WorkoutDetails = ({
  objective,
  schedule,
  onUpdateObjective,
  onUpdateSchedule,
}: WorkoutDetailsProps): React.ReactElement => {
  return (
    <div className="p-4 space-y-4">
      {/* Objective */}
      <div>
        <Label>Objective</Label>
        <Textarea
          value={objective}
          onChange={e => onUpdateObjective(e.target.value)}
          placeholder="What is the primary goal of this workout?"
          rows={2}
        />
      </div>

      {/* Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Weeks</Label>
          <Input
            value={schedule.weeks}
            onChange={e => onUpdateSchedule('weeks', e.target.value)}
            placeholder="e.g., Week 1, 3, 5"
          />
        </div>
        <div>
          <Label>Day</Label>
          <Select
            value={schedule.day}
            onValueChange={value => onUpdateSchedule('day', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monday">Monday</SelectItem>
              <SelectItem value="tuesday">Tuesday</SelectItem>
              <SelectItem value="wednesday">Wednesday</SelectItem>
              <SelectItem value="thursday">Thursday</SelectItem>
              <SelectItem value="friday">Friday</SelectItem>
              <SelectItem value="saturday">Saturday</SelectItem>
              <SelectItem value="sunday">Sunday</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Time</Label>
          <Input
            value={schedule.time}
            onChange={e => onUpdateSchedule('time', e.target.value)}
            placeholder="e.g., 6:00 AM"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
