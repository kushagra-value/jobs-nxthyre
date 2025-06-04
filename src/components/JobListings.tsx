import React, { useState } from "react";
import { Job, FilterState } from "../types";
import JobCard from "./JobCard";

interface JobListingsProps {
  jobs: Job[];
  filters: FilterState;
  loading: boolean; // <-- Add a loading prop to know if jobs are loading
}

const JobListings: React.FC<JobListingsProps> = ({
  jobs,
  filters,
  loading,
}) => {
  const [sortBy, setSortBy] = useState<string>("Date Posted");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const handleSaveJob = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = jobs.filter((job) => {
    // Apply job type filter
    if (filters.jobType.length > 0 && !filters.jobType.includes(job.jobType)) {
      return false;
    }

    // Apply location filter
    if (
      filters.location.length > 0 &&
      !filters.location.includes(job.location)
    ) {
      return false;
    }

    // Apply company filter
    if (filters.company.length > 0 && !filters.company.includes(job.company)) {
      return false;
    }

    return true;
  });

  // Skeleton loader component (simple example)
  const SkeletonLoader = () => (
    <div className="space-y-4 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 h-20 rounded-md" />
      ))}
    </div>
  );

  return (
    <div className="bg-white">
      <div className="px-1 py-2 flex items-center justify-between">
        <p className="text-gray-600 text-sm">
          <span className="font-medium">{filteredJobs.length}</span> results
          found
        </p>
        <div className="flex items-center text-sm">
          <span className="text-gray-600 mr-1">Sort By:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent pr-5 pl-1 font-medium text-blue-600 cursor-pointer focus:outline-none"
            >
              <option>Date Posted</option>
              <option>Relevance</option>
              <option>Salary: High to Low</option>
              <option>Salary: Low to High</option>
            </select>
            <svg
              className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <SkeletonLoader />
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobs.includes(job.id)}
              onSaveJob={() => handleSaveJob(job.id)}
            />
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No jobs match your current filters.</p>
            <button className="mt-2 text-blue-600 hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
