import React, { useState, useEffect, useCallback } from "react";
import {
  newsAPICategories,
  newYorkTimesCategories,
} from "../../utils/constants";
import { fetchSectionsAPI } from "../../services/newsService";
import { useFilters } from "../../context/FilterContext";
interface options {
  value: string;
  name: string;
}
const FilterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { filters, setFilters } = useFilters();
  const [dateSort, setDateSort] = useState(filters.dateSort || "mostRecent");
  const [fromDate, setFromDate] = useState(filters.fromDate || "");
  const [toDate, setToDate] = useState(filters.toDate || "");
  const [source, setSource] = useState(filters.source || "");
  const [category, setCategory] = useState(filters.category || "");
  const [isCategoryEnabled, setIsCategoryEnabled] = useState(!!filters.source);
  const [categoryArr, setCategoryArr] = useState<options[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      let categories: options[] = [];
      switch (source) {
        case "guardian":
          categories = await fetchSectionsAPI();
          break;
        case "nyt":
          categories = newYorkTimesCategories;
          break;
        case "newsapi":
          categories = newsAPICategories;
          break;
        default:
          categories = [];
      }
      setCategoryArr(categories);
      setIsCategoryEnabled(!!source);
    };
    if (source) {
      fetchCategories();
    } else {
      setCategoryArr([]);
    }
  }, [source]);

  const handleApplyFilters = useCallback(() => {
    setFilters({
      dateSort,
      fromDate: dateSort === "custom" ? fromDate : null,
      toDate: dateSort === "custom" ? toDate : null,
      source,
      category: isCategoryEnabled ? category : "",
    });
    onClose();
  }, [
    dateSort,
    fromDate,
    toDate,
    source,
    category,
    isCategoryEnabled,
    setFilters,
    onClose,
  ]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white p-5 rounded-lg shadow-lg w-80 border"
        style={{
          backgroundColor: "rgb(196, 199, 200)",
          color: "rgb(20, 67, 92)",
        }}
      >
        <h2 className="text-lg font-semibold mb-3 text-center">
          Filter Articles
        </h2>

        <label className="block text-sm font-medium mb-1">Sort By Date:</label>
        <select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        >
          <option value="mostRecent">Most Recent</option>
          <option value="mostPopular">Most Popular</option>
          <option value="oldest">Oldest</option>
          <option value="custom">Custom Date Range</option>
        </select>

        {dateSort === "custom" && (
          <>
            <label className="block text-sm font-medium mb-1">From Date:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />

            <label className="block text-sm font-medium mb-1">To Date:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
          </>
        )}

        <label className="block text-sm font-medium mb-1">Source:</label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        >
          <option value="">Select Source</option>
          <option value="newsapi">News API</option>
          <option value="nyt">New York Times</option>
          <option value="guardian">The Guardian</option>
        </select>

        <label className="block text-sm font-medium mb-1">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          disabled={!isCategoryEnabled}
          style={{ backgroundColor: isCategoryEnabled ? "white" : "#d3d3d3" }}
        >
          <option value="">Select Category</option>
          {categoryArr?.map((cat, index) => (
            <option key={`${cat.value}${index}`} value={cat.value}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-2">
          <button
            className="px-3 py-1 text-white rounded"
            style={{ color: "rgb(20, 67, 92)" }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 text-white rounded"
            style={{ backgroundColor: "rgb(20, 67, 92)" }}
            onClick={handleApplyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
