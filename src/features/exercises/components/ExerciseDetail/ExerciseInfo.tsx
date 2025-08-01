import { ExerciseData } from "../../types";
import { getDifficultyColor } from "../../utils/exerciseUtils";

interface ExerciseInfoProps {
  exercise: ExerciseData;
}

export function ExerciseInfo({ exercise }: ExerciseInfoProps) {
  return (
    <>
      {/* Exercise Details Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Type</div>
          <div className="font-medium text-gray-800">
            {exercise.type}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Equipment</div>
          <div className="font-medium text-gray-800">
            {exercise.equipment.join(", ")}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Difficulty</div>
          <span
            className={`px-2 py-1 rounded text-sm ${getDifficultyColor(
              exercise.difficulty
            )}`}
          >
            {exercise.difficulty}
          </span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Mechanics</div>
          <div className="font-medium text-gray-800">
            {exercise.mechanics}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Description
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {exercise.description}
        </p>
      </div>

      {/* Primary Muscles */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Primary Muscles
        </h3>
        <div className="flex flex-wrap gap-2">
          {exercise.primaryMuscles.map((muscle) => (
            <span
              key={muscle}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>
    </>
  );
} 