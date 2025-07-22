"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search posts...",
  defaultValue = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  // Update local state when defaultValue changes
  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-lg w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg border-2 border-gray-300 rounded-none focus:border-gray-900 focus:outline-none transition-colors font-serif text-gray-800 placeholder-gray-500"
        />
        <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-500" />
      </div>
    </form>
  );
}
