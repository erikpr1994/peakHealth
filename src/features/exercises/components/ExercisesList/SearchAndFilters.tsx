import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useExerciseSearch } from "../../hooks/useExerciseSearch";
import { useExerciseFilters } from "../../hooks/useExerciseFilters";
import { FilterDialog } from "./FilterDialog";

interface SearchAndFiltersProps {
  onFilterOpen: () => void;
  isFilterOpen: boolean;
}

export function SearchAndFilters({
  onFilterOpen,
  isFilterOpen,
}: SearchAndFiltersProps) {
  const { searchTerm, handleSearchChange } = useExerciseSearch();
  const { getActiveFilterCount } = useExerciseFilters();

  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Button variant="outline" className="relative" onClick={onFilterOpen}>
        <Filter className="w-4 h-4 mr-2" />
        Filters
        {getActiveFilterCount() > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getActiveFilterCount()}
          </span>
        )}
      </Button>
    </div>
  );
}
