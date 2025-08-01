interface MuscleGroupTagsProps {
  muscleGroups: string[];
  maxDisplay?: number;
  className?: string;
}

export function MuscleGroupTags({
  muscleGroups,
  maxDisplay = 2,
  className = "",
}: MuscleGroupTagsProps) {
  const displayGroups = muscleGroups.slice(0, maxDisplay);
  const remainingCount = muscleGroups.length - maxDisplay;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {displayGroups.map(muscle => (
        <span
          key={muscle}
          className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md"
        >
          {muscle}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
          +{remainingCount}
        </span>
      )}
    </div>
  );
}
