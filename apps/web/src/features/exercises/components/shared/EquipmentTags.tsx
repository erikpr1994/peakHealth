import { Badge } from '@/components/ui/badge';

interface EquipmentTagsProps {
  equipment: string[];
  className?: string;
}

export const EquipmentTags = ({
  equipment,
  className = '',
}: EquipmentTagsProps) => {
  if (!equipment || equipment.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {equipment.map(item => (
        <Badge key={item} variant="outline" className="bg-gray-50">
          {item}
        </Badge>
      ))}
    </div>
  );
};
