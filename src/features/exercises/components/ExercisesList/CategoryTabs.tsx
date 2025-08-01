interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const categories = [
    "All Exercises",
    "Strength",
    "Cardio",
    "Flexibility",
    "Balance",
    "Favorites",
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <div className="flex space-x-4 sm:space-x-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`py-2 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeCategory === category
                ? "border-indigo-600 text-indigo-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
