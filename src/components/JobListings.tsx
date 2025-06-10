import React, { useState, useEffect, useMemo } from "react";
import { Job, FilterState } from "../types";
import JobCard from "./JobCard";

interface JobListingsProps {
  jobs: Job[];
  filters: FilterState;
  loading: boolean;
}

function JobListingsSkeleton() {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-300 rounded-lg"></div>
      ))}
    </div>
  );
}

const JobListings: React.FC<JobListingsProps> = ({ jobs, filters }) => {
  const [sortBy, setSortBy] = useState<string>("Date Posted");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showNoJobsMessage, setShowNoJobsMessage] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 7;

  const handleSaveJob = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Job Type Filter
      if (filters.jobType.length > 0 && !filters.jobType.includes(job.jobType))
        return false;

      // Location Filter
      if (
        filters.location.length > 0 &&
        !filters.location.some((loc) => job.location.includes(loc))
      )
        return false;

      // Company Filter
      if (filters.company.length > 0 && !filters.company.includes(job.company))
        return false;

      // Department Filter
      if (
        filters.department.length > 0 &&
        !filters.department.includes(job.department)
      )
        return false;

      // Job Features Filter
      if (
        filters.jobFeatures.length > 0 &&
        !filters.jobFeatures.some((feature) =>
          job.jobFeatures.includes(feature as import("../types").JobFeature)
        )
      )
        return false;

      // Experience Filter
      if (
        filters.experience.length > 0 &&
        !filters.experience.includes(job.experience)
      )
        return false;

      return true;
    });
  }, [jobs, filters]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const currentJobs = useMemo(() => {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    return filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  }, [filteredJobs, currentPage]);

  useEffect(() => {
    if (filteredJobs.length === 0) {
      const timer = setTimeout(() => {
        setShowNoJobsMessage(true);
      }, 7000);

      return () => {
        clearTimeout(timer);
        setShowNoJobsMessage(false);
      };
    } else {
      setShowNoJobsMessage(false);
    }

    setCurrentPage(1); // Reset page when filters change
  }, [filteredJobs]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobs.includes(job.id)}
              onSaveJob={() => handleSaveJob(job.id)}
            />
          ))
        ) : !showNoJobsMessage ? (
          <JobListingsSkeleton />
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No jobs match your current filters.</p>
            <button className="mt-2 text-blue-600 hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 py-4">
          {/* Prev Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Ellipsis + Last Page */}
          {totalPages > 6 && (
            <>
              <span className="px-2 text-gray-500">...</span>
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListings;
