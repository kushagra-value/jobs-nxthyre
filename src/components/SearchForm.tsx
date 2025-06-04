import React from "react";
import clsx from "clsx"; // for conditional classNames

interface SearchFormProps {
  jobTitle: string;
  location: string;
  setJobTitle: (value: string) => void;
  setLocation: (value: string) => void;
  onSearch: () => void;
}

const FloatingInput = ({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}) => {
  const isFilled = value.trim().length > 0;

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={clsx(
          "w-full px-4 pt-6 pb-2 rounded-lg bg-white text-gray-800 shadow-xl focus:outline-none",
          "peer"
        )}
        placeholder=" "
      />
      <label
        className={clsx(
          "absolute left-4 text-xs text-gray-500 transition-all",
          {
            "top-1 text-sm text-blue-600": isFilled,
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600":
              !isFilled,
          }
        )}
      >
        {label}
      </label>
    </div>
  );
};

const SearchForm: React.FC<SearchFormProps> = ({
  jobTitle,
  location,
  setJobTitle,
  setLocation,
  onSearch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
      <FloatingInput
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        label="Search job title, keywords or company"
      />
      <FloatingInput
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        label="Location"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-8 rounded-lg transition duration-200 shadow-lg"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
