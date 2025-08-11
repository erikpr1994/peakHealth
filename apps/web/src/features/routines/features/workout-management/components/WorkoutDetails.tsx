'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
    repeatPattern: string;
    repeatValue: string;
    selectedDays: string[];
    time: string;
  };
  onUpdateObjective: (objective: string) => void;
  onUpdateSchedule: (
    field: 'repeatPattern' | 'repeatValue' | 'selectedDays' | 'time',
    value: string | string[]
  ) => void;
}

const repeatPatternOptions = [
  { label: 'Every X days', value: 'days' },
  { label: 'Every X weeks', value: 'weeks' },
  { label: 'Specific days of the week', value: 'weekdays' },
];

const dayOptions = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
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
      <div className="space-y-4">
        {/* Repeat Pattern */}
        <div>
          <Label className="block mb-2">Repeat Pattern</Label>
          <Select
            value={schedule.repeatPattern}
            onValueChange={value => onUpdateSchedule('repeatPattern', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select repeat pattern" />
            </SelectTrigger>
            <SelectContent>
              {repeatPatternOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Repeat Value or Selected Days */}
        {schedule.repeatPattern === 'days' && (
          <div>
            <Label className="block mb-2">Every X days</Label>
            <Input
              type="number"
              min="1"
              max="30"
              value={schedule.repeatValue}
              onChange={e => onUpdateSchedule('repeatValue', e.target.value)}
              placeholder="e.g., 2 for every 2 days"
              className="w-full"
            />
          </div>
        )}

        {schedule.repeatPattern === 'weeks' && (
          <div>
            <Label className="block mb-2">Every X weeks</Label>
            <Input
              type="number"
              min="1"
              max="12"
              value={schedule.repeatValue}
              onChange={e => onUpdateSchedule('repeatValue', e.target.value)}
              placeholder="e.g., 2 for every 2 weeks"
              className="w-full"
            />
          </div>
        )}

        {schedule.repeatPattern === 'weekdays' && (
          <div>
            <Label className="block mb-2">Select days of the week</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dayOptions.map(day => (
                <div key={day.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={day.value}
                    checked={schedule.selectedDays.includes(day.value)}
                    onCheckedChange={checked => {
                      const newSelectedDays = checked
                        ? [...schedule.selectedDays, day.value]
                        : schedule.selectedDays.filter(d => d !== day.value);
                      onUpdateSchedule('selectedDays', newSelectedDays);
                    }}
                  />
                  <Label htmlFor={day.value} className="text-sm font-normal">
                    {day.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Time */}
        <div>
          <Label className="block mb-2">Time</Label>
          <Input
            type="time"
            value={schedule.time}
            onChange={e => onUpdateSchedule('time', e.target.value)}
            min="05:00"
            max="22:00"
            step="900"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
