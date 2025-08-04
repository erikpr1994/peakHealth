import { getCategoryColor } from '../../utils/exerciseUtils';

import { Badge } from '@/components/ui/badge';

interface CategoryBadgeProps {
  category: string;
  variant?: 'default' | 'outline';
  className?: string;
}

export const CategoryBadge = ({
  category,
  variant = 'outline',
  className = '',
}: CategoryBadgeProps) => {
  return (
    <Badge
      variant={variant}
      className={`text-xs ${getCategoryColor(category)} ${className}`}
    >
      {category}
    </Badge>
  );
};
