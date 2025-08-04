import { useExerciseFilters } from '../../hooks/useExerciseFilters';
import { difficulties, equipment, muscleGroups } from '../../types';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDialog = ({ isOpen, onClose }: FilterDialogProps) => {
  const { filters, handleFilterChange, clearFilters } = useExerciseFilters();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Exercises</DialogTitle>
          <DialogDescription>
            Apply filters to narrow down your exercise search results.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Difficulty Filter */}
          <div>
            <Label className="font-semibold mb-3 block">Difficulty</Label>
            <div className="space-y-2">
              {difficulties.map(difficulty => (
                <div key={difficulty} className="flex items-center space-x-2">
                  <Checkbox
                    id={`difficulty-${difficulty}`}
                    checked={filters.difficulties.includes(difficulty)}
                    onCheckedChange={() =>
                      handleFilterChange('difficulties', difficulty)
                    }
                  />
                  <Label htmlFor={`difficulty-${difficulty}`}>
                    {difficulty}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Muscle Groups Filter */}
          <div>
            <Label className="font-semibold mb-3 block">Muscle Groups</Label>
            <div className="grid grid-cols-2 gap-2">
              {muscleGroups.slice(0, 10).map(group => (
                <div key={group} className="flex items-center space-x-2">
                  <Checkbox
                    id={`muscle-${group}`}
                    checked={filters.muscleGroups.includes(group)}
                    onCheckedChange={() =>
                      handleFilterChange('muscleGroups', group)
                    }
                  />
                  <Label htmlFor={`muscle-${group}`} className="text-sm">
                    {group}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Equipment Filter */}
          <div>
            <Label className="font-semibold mb-3 block">Equipment</Label>
            <div className="space-y-2">
              {equipment.slice(0, 7).map(equipmentItem => (
                <div
                  key={equipmentItem}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`equipment-${equipmentItem}`}
                    checked={filters.equipment.includes(equipmentItem)}
                    onCheckedChange={() =>
                      handleFilterChange('equipment', equipmentItem)
                    }
                  />
                  <Label htmlFor={`equipment-${equipmentItem}`}>
                    {equipmentItem}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={clearFilters} variant="outline" className="flex-1">
              Clear All
            </Button>
            <Button onClick={onClose} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
