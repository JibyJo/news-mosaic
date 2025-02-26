import React, { createContext, useState, useContext } from "react";

export interface FilterState {
  dateSort: string;
  customDate?: string | null;
  source: string;
  category: string;
  query?: string;
  fromDate?: string | null;
  toDate?: string | null;
}

const defaultFilters: FilterState = {
  dateSort: "mostRecent",
  customDate: null,
  source: "",
  category: "",
  query: "",
  fromDate: null,
  toDate: null,
};

export const FilterContext = createContext<{
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}>({
  filters: defaultFilters,
  setFilters: () => {},
});

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
