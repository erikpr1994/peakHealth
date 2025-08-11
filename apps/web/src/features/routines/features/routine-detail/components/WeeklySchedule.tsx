'use client';

import { Card } from '@/components/ui/card';

interface WeeklyScheduleProps {
  schedule: boolean[];
}

const WeeklySchedule = ({
  schedule,
}: WeeklyScheduleProps): React.ReactElement => {
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Weekly Schedule
      </h2>
      <div className="flex gap-3">
        {schedule.map((isActive, index) => (
          <div
            key={index}
            className={`flex-1 h-16 rounded-lg flex flex-col items-center justify-center ${
              isActive
                ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            <div className="text-xs font-medium">{dayLabels[index]}</div>
            {isActive && (
              <div className="text-xs mt-1 whitespace-nowrap">Workout</div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeeklySchedule;
