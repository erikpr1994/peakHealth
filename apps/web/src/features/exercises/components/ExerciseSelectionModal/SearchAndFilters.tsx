import { Filter, Search, X } from 'lucide-react';
import { useState } from 'react';

import { useExerciseFilters } from '../../hooks/useExerciseFilters';
import { exerciseCategories } from '../../types';
import { DIFFICULTY, EQUIPMENT, MUSCLE_GROUP } from '../../types/constants';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const SearchAndFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: SearchAndFiltersProps) => {
  const { filters, handleFilterChange, clearFilters, getActiveFilterCount } =
    useExerciseFilters();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="p-6 bg-white border-b border-gray-100 flex-shrink-0">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {exerciseCategories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={`h-8 px-4 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-8 px-3 gap-2 ${
                    activeFilterCount > 0
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <Filter className="w-3 h-3" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 px-1.5 text-xs"
                    >
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">Filters</h4>
                    {activeFilterCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <Label className="font-medium text-sm text-gray-700 mb-2 block">
                      Difficulty
                    </Label>
                    <div className="space-y-2">
                      {Object.values(DIFFICULTY).map(difficulty => (
                        <div
                          key={difficulty}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`difficulty-${difficulty}`}
                            checked={filters.difficulties.includes(difficulty)}
                            onCheckedChange={() =>
                              handleFilterChange('difficulties', difficulty)
                            }
                          />
                          <Label
                            htmlFor={`difficulty-${difficulty}`}
                            className="text-sm text-gray-600"
                          >
                            {difficulty}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Muscle Groups Filter */}
                  <div>
                    <Label className="font-medium text-sm text-gray-700 mb-2 block">
                      Muscle Groups
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.values(MUSCLE_GROUP).map(muscle => (
                        <div
                          key={muscle}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`muscle-${muscle}`}
                            checked={filters.muscleGroups.includes(muscle)}
                            onCheckedChange={() =>
                              handleFilterChange('muscleGroups', muscle)
                            }
                          />
                          <Label
                            htmlFor={`muscle-${muscle}`}
                            className="text-sm text-gray-600"
                          >
                            {muscle}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Equipment Filter */}
                  <div>
                    <Label className="font-medium text-sm text-gray-700 mb-2 block">
                      Equipment
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.values(EQUIPMENT).map(equipment => (
                        <div
                          key={equipment}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`equipment-${equipment}`}
                            checked={filters.equipment.includes(equipment)}
                            onCheckedChange={() =>
                              handleFilterChange('equipment', equipment)
                            }
                          />
                          <Label
                            htmlFor={`equipment-${equipment}`}
                            className="text-sm text-gray-600"
                          >
                            {equipment}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Active Filter Badges */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-1">
                {filters.difficulties.map(difficulty => (
                  <Badge
                    key={`difficulty-${difficulty}`}
                    variant="secondary"
                    className="h-6 px-2 text-xs bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {difficulty}
                    <button
                      onClick={() =>
                        handleFilterChange('difficulties', difficulty)
                      }
                      className="ml-1 hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {filters.muscleGroups.map(muscle => (
                  <Badge
                    key={`muscle-${muscle}`}
                    variant="secondary"
                    className="h-6 px-2 text-xs bg-green-50 text-green-700 border-green-200"
                  >
                    {muscle}
                    <button
                      onClick={() => handleFilterChange('muscleGroups', muscle)}
                      className="ml-1 hover:text-green-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {filters.equipment.map(equipment => (
                  <Badge
                    key={`equipment-${equipment}`}
                    variant="secondary"
                    className="h-6 px-2 text-xs bg-purple-50 text-purple-700 border-purple-200"
                  >
                    {equipment}
                    <button
                      onClick={() => handleFilterChange('equipment', equipment)}
                      className="ml-1 hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
