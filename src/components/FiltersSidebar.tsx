import React from "react";
import { FilterState } from "../types";
import { BookmarkPlus } from "lucide-react";

interface FiltersSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  clearFilters: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  setFilters,
  clearFilters,
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

  const departments = [
    { label: "Engineering", count: 42 },
    { label: "IT", count: 42 },
    { label: "Sales", count: 42 },
    { label: "Marketing", count: 42 },
    { label: "Design", count: 42 },
    { label: "Finance", count: 42 },
    { label: "HR", count: 42 },
  ];

  const jobFeatures = [
    "Actively Hiring",
    "Good Job Culture",
    "Visa Sponsorship",
    "Flexible Hours",
    "Benefits Package",
  ];

  const experienceLevels = [
    { label: "0-1 Years", count: 56 },
    { label: "1-3 Years", count: 84 },
    { label: "3-5 Years", count: 92 },
    { label: "5-7 Years", count: 64 },
    { label: "7+ Years", count: 38 },
  ];

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
          <FilterCheckbox
            label="Full Time"
            count={146}
            checked={filters.jobType.includes("Full Time")}
            onChange={() => handleFilterChange("jobType", "Full Time")}
          />
          <FilterCheckbox
            label="Part Time"
            count={13}
            checked={filters.jobType.includes("Part Time")}
            onChange={() => handleFilterChange("jobType", "Part Time")}
          />
          <FilterCheckbox
            label="Contract"
            count={32}
            checked={filters.jobType.includes("Contract")}
            onChange={() => handleFilterChange("jobType", "Contract")}
          />
          <FilterCheckbox
            label="Internship"
            count={81}
            checked={filters.jobType.includes("Internship")}
            onChange={() => handleFilterChange("jobType", "Internship")}
          />
          <FilterCheckbox
            label="Freelance"
            count={5}
            checked={filters.jobType.includes("Freelance")}
            onChange={() => handleFilterChange("jobType", "Freelance")}
          />
        </div>
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
          {departments.map((dept) => (
            <FilterCheckbox
              key={dept.label}
              label={dept.label}
              count={dept.count}
              checked={filters.department.includes(dept.label)}
              onChange={() => handleFilterChange("department", dept.label)}
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
          {jobFeatures.map((feature) => (
            <FilterCheckbox
              key={feature}
              label={feature}
              count={42}
              checked={filters.jobFeatures.includes(feature)}
              onChange={() => handleFilterChange("jobFeatures", feature)}
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
          {experienceLevels.map((exp) => (
            <FilterCheckbox
              key={exp.label}
              label={exp.label}
              count={exp.count}
              checked={filters.experience.includes(exp.label)}
              onChange={() => handleFilterChange("experience", exp.label)}
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
          <FilterCheckbox
            label="Bengaluru, Karnataka"
            count={256}
            checked={filters.location.includes("Bengaluru, Karnataka")}
            onChange={() =>
              handleFilterChange("location", "Bengaluru, Karnataka")
            }
          />
          <FilterCheckbox
            label="Pimpri-Chinchwad, Maharashtra"
            count={148}
            checked={filters.location.includes("Pimpri-Chinchwad, Maharashtra")}
            onChange={() =>
              handleFilterChange("location", "Pimpri-Chinchwad, Maharashtra")
            }
          />
          <FilterCheckbox
            label="Pune, Maharashtra"
            count={39}
            checked={filters.location.includes("Pune, Maharashtra")}
            onChange={() => handleFilterChange("location", "Pune, Maharashtra")}
          />
          <FilterCheckbox
            label="Chennai, Tamil Nadu"
            count={37}
            checked={filters.location.includes("Chennai, Tamil Nadu")}
            onChange={() =>
              handleFilterChange("location", "Chennai, Tamil Nadu")
            }
          />
          <FilterCheckbox
            label="Hyderabad, Telangana"
            count={32}
            checked={filters.location.includes("Hyderabad, Telangana")}
            onChange={() =>
              handleFilterChange("location", "Hyderabad, Telangana")
            }
          />
        </div>
      </div>

      {/* Company Filters */}
      <div>
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
          <FilterCheckbox
            label="Aspire Software"
            count={32}
            checked={filters.company.includes("Aspire Software")}
            onChange={() => handleFilterChange("company", "Aspire Software")}
          />
          <FilterCheckbox
            label="Deloitte"
            count={28}
            checked={filters.company.includes("Deloitte")}
            onChange={() => handleFilterChange("company", "Deloitte")}
          />
          <FilterCheckbox
            label="Nanonets"
            count={25}
            checked={filters.company.includes("Nanonets")}
            onChange={() => handleFilterChange("company", "Nanonets")}
          />
          <FilterCheckbox
            label="Coditas"
            count={22}
            checked={filters.company.includes("Coditas")}
            onChange={() => handleFilterChange("company", "Coditas")}
          />
          <FilterCheckbox
            label="Coforge"
            count={21}
            checked={filters.company.includes("Coforge")}
            onChange={() => handleFilterChange("company", "Coforge")}
          />
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
