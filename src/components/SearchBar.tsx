import { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import FilterModal from "./FilterModal";
import { useFilters } from "../context/FilterContext";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const { setFilters } = useFilters();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: debouncedQuery,
    }));
  }, [debouncedQuery, setFilters]);

  return (
    <div className="flex items-center w-full max-w-lg p-2 border rounded-lg shadow-md bg-white">
      <FaSearch className="text-gray-500 mx-2" />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="flex-1 outline-none px-2 py-1"
      />

      <button
        className="p-2 text-gray-600 hover:text-black"
        onClick={() => setShowFilter(true)}
      >
        <FaFilter size={20} />
      </button>

      {showFilter && <FilterModal onClose={() => setShowFilter(false)} />}
    </div>
  );
};

export default SearchBar;
