import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FiltersSidebar from "../components/FiltersSidebar";
import JobListings from "../components/JobListings";
import RightSidebar from "../components/RightSidebar";
import { Job, FilterState } from "../types";
import { popularCompanies } from "../data/mockData"; // keep this if you want static sidebar

function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Uploading file:", file.name);
      setShowUploadModal(false);
    }
  };

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then(setJobs)
      .catch(console.error);
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    jobType: [],
    location: [],
    company: [],
    department: [],
    jobFeatures: [],
    experience: [],
  });

  const clearFilters = () => {
    setFilters({
      jobType: [],
      location: [],
      company: [],
      department: [],
      jobFeatures: [],
      experience: [],
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
        handleFileUpload={handleFileUpload}
      />
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <FiltersSidebar
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
          />
        </div>

        <div className="md:col-span-6">
          <div
            className="mb-4 bg-blue-200 bg-opacity-20 rounded-lg px-4 py-2 flex items-start max-w-full border border-indigo-400 cursor-pointer"
            onClick={() => setShowUploadModal(true)}
          >
            <div className="text-blue-800 p-1.5 rounded mr-2 mt-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium">Upload your resume</p>
              <p className="text-sm text-gray-400">
                We'll match you with the best jobs. Right job. Right away!
              </p>
            </div>
          </div>
          <JobListings jobs={jobs} filters={filters} />
        </div>

        <div className="md:col-span-3">
          <RightSidebar companies={popularCompanies} />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
