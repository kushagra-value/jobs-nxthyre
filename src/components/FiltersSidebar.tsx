import React from "react";
import { FilterState } from "../types";
import { BookmarkPlus } from "lucide-react";

interface FiltersSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  clearFilters: () => void;
  companyOptions?: { label: string; value: string; count: number }[];
  locationOptions?: { label: string; value: string; count: number }[];
  jobTypeOptions?: { label: string; value: string; count: number }[];
  departmentOptions?: { label: string; value: string; count: number }[];
  jobFeaturesOptions?: { label: string; value: string; count: number }[]; // Added
  experienceOptions?: { label: string; value: string; count: number }[]; // Added
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  setFilters,
  clearFilters,
  companyOptions = [],
  locationOptions = [],
  jobTypeOptions = [],
  departmentOptions = [],
  jobFeaturesOptions = [], // Default to empty array
  experienceOptions = [], // Default to empty array
}) => {
  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      if (prev[category].includes(value)) {
        return {
          ...prev,
          [category]: prev[category].filter((item) => item !== value),
        };
      }
      return {
        ...prev,
        [category]: [...prev[category], value],
      };
    });
  };

  return (
    <div className="bg-white pl-5 pr-9 pb-5 h-fit">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-blue-600 text-sm hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Department Filters */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-sm text-gray-500">DEPARTMENT</h3>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, department: [] }))}
            className="text-gray-400 text-xs"
          >
            Clear
          </button>
        </div>

        <div className="space-y-2">
          {departmentOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              count={option.count}
              checked={filters.department.includes(option.value)}
              onChange={() => handleFilterChange("department", option.value)}
            />
          ))}
        </div>
      </div>

      {/* Job Features */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-sm text-gray-500">JOB FEATURES</h3>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, jobFeatures: [] }))}
            className="text-gray-400 text-xs"
          >
            Clear
          </button>
        </div>
        <div className="space-y-2">
          {jobFeaturesOptions.slice(0, 7).map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              count={option.count}
              checked={filters.jobFeatures.includes(option.value)}
              onChange={() => handleFilterChange("jobFeatures", option.value)}
            />
          ))}
        </div>
      </div>

      {/* Company Filters */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-sm text-gray-500">COMPANY</h3>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, company: [] }))}
            className="text-gray-400 text-xs"
          >
            Clear
          </button>
        </div>

        <div className="space-y-2">
          {companyOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              count={option.count}
              checked={filters.company.includes(option.value)}
              onChange={() => handleFilterChange("company", option.value)}
            />
          ))}
        </div>
      </div>

      {/* Location Filters */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-sm text-gray-500">LOCATION</h3>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, location: [] }))}
            className="text-gray-400 text-xs"
          >
            Clear
          </button>
        </div>

        <div className="space-y-2">
          {locationOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              count={option.count}
              checked={filters.location.includes(option.value)}
              onChange={() => handleFilterChange("location", option.value)}
            />
          ))}
        </div>
      </div>

      {/* Job Type Filters */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-sm text-gray-500">JOB TYPE</h3>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, jobType: [] }))}
            className="text-gray-400 text-xs"
          >
            Clear
          </button>
        </div>

        <div className="space-y-2">
          {jobTypeOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              count={option.count}
              checked={filters.jobType.includes(option.value)}
              onChange={() => handleFilterChange("jobType", option.value)}
            />
          ))}
        </div>
      </div>

      {/* Experience Filters */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-sm text-gray-500">EXPERIENCE</h3>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, experience: [] }))}
            className="text-gray-400 text-xs"
          >
            Clear
          </button>
        </div>
        <div className="space-y-2">
          {experienceOptions.slice(0, 7).map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              count={option.count}
              checked={filters.experience.includes(option.value)}
              onChange={() => handleFilterChange("experience", option.value)}
            />
          ))}
        </div>
        <button className="text-gray-500 mt-3 text-sm hover:text-gray-700">
          More →
        </button>
      </div>
    </div>
  );
};

interface FilterCheckboxProps {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  label,
  count,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={`filter-${label}`}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor={`filter-${label}`}
          className="ml-2 text-sm text-gray-700"
        >
          {label}
        </label>
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
};

export default FiltersSidebar;
