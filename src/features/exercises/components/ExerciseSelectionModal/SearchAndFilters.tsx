import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { exerciseCategories } from "../../data/exerciseCategories";

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: SearchAndFiltersProps) {
  return (
    <div className="p-6 bg-white border-b border-gray-100 flex-shrink-0">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {exerciseCategories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category ? "default" : "outline"
              }
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={`h-8 px-4 rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
} 