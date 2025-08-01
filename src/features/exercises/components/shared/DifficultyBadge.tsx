import { Zap, Award, Users, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDifficultyColorWithBorder } from "../../utils/exerciseUtils";

interface DifficultyBadgeProps {
  difficulty: string;
  showIcon?: boolean;
  className?: string;
}

export function DifficultyBadge({
  difficulty,
  showIcon = true,
  className = "",
}: DifficultyBadgeProps) {
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return <Zap className="w-3 h-3" />;
      case "Intermediate":
        return <Award className="w-3 h-3" />;
      case "Advanced":
        return <Users className="w-3 h-3" />;
      default:
        return <Info className="w-3 h-3" />;
    }
  };

  return (
    <Badge
      className={`${getDifficultyColorWithBorder(
        difficulty
      )} text-xs border ${className}`}
    >
      {showIcon && getDifficultyIcon(difficulty)}
      <span className={showIcon ? "ml-1" : ""}>{difficulty}</span>
    </Badge>
  );
}
