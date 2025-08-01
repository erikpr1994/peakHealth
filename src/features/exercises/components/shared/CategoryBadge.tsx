import { Badge } from "@/components/ui/badge";
import { getCategoryColor } from "../../utils/exerciseUtils";

interface CategoryBadgeProps {
  category: string;
  variant?: "default" | "outline";
  className?: string;
}

export function CategoryBadge({ 
  category, 
  variant = "outline", 
  className = "" 
}: CategoryBadgeProps) {
  return (
    <Badge 
      variant={variant}
      className={`text-xs ${getCategoryColor(category)} ${className}`}
    >
      {category}
    </Badge>
  );
} 