'use client';

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

// Generate time options from 5:00 AM to 10:00 PM
const generateTimeOptions = (): Array<{ label: string; value: string }> => {
  const times = [];
  for (let hour = 5; hour <= 22; hour++) {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const time12 = `${displayHour}:00 ${ampm}`;
    const time24 = `${hour.toString().padStart(2, '0')}:00`;
    times.push({ label: time12, value: time24 });
  }
  return times;
};

const timeOptions = generateTimeOptions();

const repeatOptions = [
  { label: 'Every week', value: 'every-week' },
  { label: 'Every 2 weeks', value: 'every-2-weeks' },
  { label: 'Every 3 weeks', value: 'every-3-weeks' },
  { label: 'Every 4 weeks', value: 'every-4-weeks' },
  { label: 'Week 1 only', value: 'week-1' },
  { label: 'Weeks 1, 3, 5', value: 'weeks-1-3-5' },
  { label: 'Weeks 2, 4, 6', value: 'weeks-2-4-6' },
  { label: 'Custom weeks', value: 'custom' },
];

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
        <Label className="block mb-2">Objective</Label>
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
          <Label className="block mb-2">Repeat every</Label>
          <Select
            value={schedule.weeks}
            onValueChange={value => onUpdateSchedule('weeks', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select repeat pattern" />
            </SelectTrigger>
            <SelectContent>
              {repeatOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {schedule.weeks === 'custom' && (
            <Input
              className="mt-2"
              placeholder="e.g., Week 1, 3, 5"
              onChange={e => onUpdateSchedule('weeks', e.target.value)}
            />
          )}
        </div>
        <div>
          <Label className="block mb-2">Day</Label>
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
          <Label className="block mb-2">Time</Label>
          <Select
            value={schedule.time}
            onValueChange={value => onUpdateSchedule('time', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
