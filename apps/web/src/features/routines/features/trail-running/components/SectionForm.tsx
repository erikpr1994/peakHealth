'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import IntensityTargetConfiguration from './IntensityTargetConfiguration';
import {
  TrailRunningSection,
  IntensityTarget,
} from '@/features/routines/types';

interface SectionFormProps {
  section: Partial<TrailRunningSection>;
  onUpdateSection: (updates: Partial<TrailRunningSection>) => void;
}

const SectionForm = ({
  section,
  onUpdateSection,
}: SectionFormProps): React.ReactElement => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label className="text-sm">Distance (km)</Label>
          <Input
            type="number"
            step="0.1"
            value={section.distance || ''}
            onChange={e =>
              onUpdateSection({
                distance: parseFloat(e.target.value) || 0,
              })
            }
            placeholder="0.0"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Duration (min)</Label>
          <Input
            type="number"
            value={section.duration || ''}
            onChange={e =>
              onUpdateSection({
                duration: parseInt(e.target.value) || 0,
              })
            }
            placeholder="0"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Elevation (m)</Label>
          <Input
            type="number"
            value={section.elevationChange || ''}
            onChange={e =>
              onUpdateSection({
                elevationChange: parseInt(e.target.value) || 0,
              })
            }
            placeholder="0"
            className="h-10"
          />
        </div>
      </div>

      {section.type !== 'rest' && (
        <div className="space-y-2">
          <Label className="text-sm">Intensity Target</Label>
          <IntensityTargetConfiguration
            target={section.intensityTarget}
            onChange={(target: IntensityTarget) =>
              onUpdateSection({ intensityTarget: target })
            }
          />
        </div>
      )}
    </div>
  );
};

export default SectionForm;
