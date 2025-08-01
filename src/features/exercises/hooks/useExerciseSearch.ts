import { useState } from "react";

export function useExerciseSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    handleSearchChange,
    clearSearch,
  };
} 