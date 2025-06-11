import React, { useState, useEffect, useMemo } from "react";
import { Job, FilterState } from "../types";
import JobCard from "./JobCard";

interface JobListingsProps {
  jobs: Job[];
  filters: FilterState;
  loading?: boolean;
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

// Helper function to parse postedTime strings into Date objects
function parsePostedTime(postedTime: string | null): number {
  if (!postedTime || postedTime.toLowerCase() === "not specified") {
    return -Infinity; // Push to end for newest-first sorting
  }
  const now = new Date();
  const timeRegex = /(\d+)\s+(hour|day|week|month|year)s?\s+ago/;
  const match = postedTime.match(timeRegex);
  if (match) {
    const amount = parseInt(match[1], 10);
    const unit = match[2];
    const date = new Date(now);
    switch (unit) {
      case "hour":
        date.setHours(now.getHours() - amount);
        break;
      case "day":
        date.setDate(now.getDate() - amount);
        break;
      case "week":
        date.setDate(now.getDate() - amount * 7);
        break;
      case "month":
        date.setMonth(now.getMonth() - amount);
        break;
      case "year":
        date.setFullYear(now.getFullYear() - amount);
        break;
      default:
        return now.getTime();
    }
    return date.getTime();
  }
  return -Infinity; // Push to end if parsing fails
}

// Helper function to parse salary strings into numerical values
function parseSalary(salary: string | null): number {
  if (!salary || salary.toLowerCase() === "not specified") {
    return -Infinity; // Push to end for high-to-low sorting
  }
  const rangeRegex = /(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)\s*LPA/;
  const match = salary.match(rangeRegex);
  if (match) {
    const lower = parseFloat(match[1]);
    const upper = parseFloat(match[2]);
    return (lower + upper) / 2; // Average of the salary range
  }
  const singleRegex = /(\d+(?:\.\d+)?)\s*LPA/;
  const singleMatch = salary.match(singleRegex);
  if (singleMatch) {
    return parseFloat(singleMatch[1]); // Single salary value
  }
  return -Infinity; // Push to end if parsing fails
}

const JobListings: React.FC<JobListingsProps> = ({ jobs, filters }) => {
  const [sortBy, setSortBy] = useState<string>("Relevance");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showNoJobsMessage, setShowNoJobsMessage] = useState(false);
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
      if (
        filters.jobType.length > 0 &&
        !filters.jobType.includes(job.jobType ?? "")
      )
        return false;

      if (
        filters.location.length > 0 &&
        !filters.location.some((loc) => (job.location ?? "").includes(loc))
      )
        return false;

      if (
        filters.company.length > 0 &&
        !filters.company.includes(job.company ?? "")
      )
        return false;

      if (
        filters.department.length > 0 &&
        !filters.department.includes(job.department ?? "")
      )
        return false;

      if (
        filters.jobFeatures.length > 0 &&
        !filters.jobFeatures.some(
          (feature) =>
            Array.isArray(job.jobFeatures) &&
            job.jobFeatures.includes(feature as import("../types").JobFeature)
        )
      )
        return false;

      if (
        filters.experience.length > 0 &&
        !filters.experience.includes(job.experience ?? "")
      )
        return false;

      return true;
    });
  }, [jobs, filters]);

  // Sort the filtered jobs based on the sortBy value
  const sortedJobs = useMemo(() => {
    const jobsToSort = [...filteredJobs];
    switch (sortBy) {
      case "Date Posted":
        return jobsToSort.sort((a, b) => {
          const dateA = parsePostedTime(a.postedTime);
          const dateB = parsePostedTime(b.postedTime);
          return dateB - dateA; // Newest first
        });
      case "Relevance":
        return jobsToSort; // Default order
      case "Salary: High to Low":
        return jobsToSort.sort((a, b) => {
          const salaryA = parseSalary(a.salary);
          const salaryB = parseSalary(b.salary);
          return salaryB - salaryA; // Highest first
        });
      case "Salary: Low to High":
        return jobsToSort.sort((a, b) => {
          const salaryA = parseSalary(a.salary);
          const salaryB = parseSalary(b.salary);
          // Handle -Infinity to push to end
          if (salaryA === -Infinity && salaryB === -Infinity) return 0;
          if (salaryA === -Infinity) return 1;
          if (salaryB === -Infinity) return -1;
          return salaryA - salaryB; // Lowest first
        });
      default:
        return jobsToSort;
    }
  }, [filteredJobs, sortBy]);

  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  const currentJobs = useMemo(() => {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    return sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  }, [sortedJobs, currentPage]);

  useEffect(() => {
    if (filteredJobs.length === 0) {
      const timer = setTimeout(() => {
        setShowNoJobsMessage(true);
      }, 10000);

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
              <option>Relevance</option>
              <option>Date Posted</option>
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
