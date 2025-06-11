import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FiltersSidebar from "../components/FiltersSidebar";
import JobListings from "../components/JobListings";
import RightSidebar from "../components/RightSidebar";
import { Job, FilterState } from "../types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchJobTitle, setSearchJobTitle] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Uploading file:", file.name);
      setShowUploadModal(false);
    }
  };

  useEffect(() => {
    fetch("https://jobs-nxthyre.vercel.app/api/jobs")
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

  const handleSearch = (jobTitle: string, location: string) => {
    setSearchJobTitle(jobTitle);
    setSearchLocation(location);
  };

  const getCompanyLogo = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = colors[hash % colors.length];
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return `${color}|${initials}`;
  };

  const filteredJobs = useMemo(() => {
    const jobTitleTerms = searchJobTitle
      .split(",")
      .map((term) => term.trim())
      .filter((term) => term.length > 0);

    const locationTerms = searchLocation
      .split(",")
      .map((term) => term.trim())
      .filter((term) => term.length > 0);

    const includesSearch = (value: any, search: string) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(search.toLowerCase());
      } else if (Array.isArray(value)) {
        return value.some(
          (item) =>
            typeof item === "string" &&
            item.toLowerCase().includes(search.toLowerCase())
        );
      }
      return false;
    };

    return jobs.filter((job) => {
      const locationMatch =
        locationTerms.length === 0 ||
        locationTerms.some((term) => includesSearch(job.location, term));

      const jobTitleMatch =
        jobTitleTerms.length === 0 ||
        jobTitleTerms.some(
          (term) =>
            includesSearch(job.title, term) ||
            includesSearch(job.company, term) ||
            includesSearch(job.department, term) ||
            includesSearch(job.category, term) ||
            includesSearch(job.skills, term)
        );

      const filterMatch =
        (filters.jobType.length === 0 ||
          (job.jobType && filters.jobType.includes(job.jobType))) &&
        (filters.location.length === 0 ||
          (job.location && filters.location.includes(job.location))) &&
        (filters.company.length === 0 ||
          (job.company && filters.company.includes(job.company))) &&
        (filters.department.length === 0 ||
          (job.department && filters.department.includes(job.department))) &&
        (filters.jobFeatures.length === 0 ||
          (job.jobFeatures &&
            filters.jobFeatures.some((feature) =>
              job.jobFeatures.includes(feature)
            ))) &&
        (filters.experience.length === 0 ||
          (job.experience && filters.experience.includes(job.experience)));

      return locationMatch && jobTitleMatch && filterMatch;
    });
  }, [jobs, searchJobTitle, searchLocation, filters]);

  const companyOptions = useMemo(() => {
    const counts = jobs.reduce((acc, job) => {
      const company = job.company;
      if (company) {
        acc[company] = (acc[company] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts)
      .map(([value, count]) => ({ label: value, value, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7);
  }, [jobs]);

  const locationOptions = useMemo(() => {
    const counts = jobs.reduce((acc, job) => {
      const location = job.location;
      if (location) {
        acc[location] = (acc[location] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts)
      .map(([value, count]) => {
        const label = value.split(",")[0].trim();
        return { label, value, count };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [jobs]);

  const jobTypeOptions = useMemo(() => {
    const counts = jobs.reduce((acc, job) => {
      const jobType = job.jobType;
      if (jobType) {
        acc[jobType] = (acc[jobType] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts)
      .map(([value, count]) => ({ label: value, value, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [jobs]);

  const departmentOptions = useMemo(() => {
    const counts = jobs.reduce((acc, job) => {
      const department = job.department;
      if (department) {
        acc[department] = (acc[department] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts)
      .map(([value, count]) => ({ label: value, value, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7);
  }, [jobs]);

  const bengaluruCompanies = useMemo(() => {
    const companyLogos = jobs.reduce((acc, job) => {
      if (job.company && job.companyLogo && !acc[job.company]) {
        acc[job.company] = job.companyLogo;
      }
      return acc;
    }, {} as Record<string, string>);

    const bengaluruJobs = jobs.filter((job) => {
      return (
        job.location &&
        typeof job.location === "string" &&
        job.location.split(",")[0].trim().toLowerCase() === "bengaluru"
      );
    });

    const counts = bengaluruJobs.reduce((acc, job) => {
      const company = job.company;
      if (company) {
        acc[company] = (acc[company] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([name, jobCount]) => ({
        id: name,
        name,
        logo: companyLogos[name] || getCompanyLogo(name),
        jobCount,
      }))
      .sort((a, b) => b.jobCount - a.jobCount)
      .slice(0, 15);
  }, [jobs]);

  const allJobFeatures = jobs.flatMap((job) => job.jobFeatures);
  const uniqueJobFeatures = [...new Set(allJobFeatures)];
  const jobFeaturesOptions = uniqueJobFeatures.map((feature) => ({
    label: feature,
    value: feature,
    count: jobs.filter((job) => job.jobFeatures.includes(feature)).length,
  }));

  const allExperiences = jobs.map((job) => job.experience);
  const uniqueExperiences = [...new Set(allExperiences)];
  const experienceOptions = uniqueExperiences.map((exp) => ({
    label: exp,
    value: exp,
    count: jobs.filter((job) => job.experience === exp).length,
  }));

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      <Header
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
        handleFileUpload={handleFileUpload}
      />
      <HeroSection onSearch={handleSearch} />

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <FiltersSidebar
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            companyOptions={companyOptions}
            locationOptions={locationOptions}
            jobTypeOptions={jobTypeOptions}
            departmentOptions={departmentOptions}
            jobFeaturesOptions={jobFeaturesOptions}
            experienceOptions={experienceOptions}
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
          <JobListings jobs={filteredJobs} filters={filters} />
        </div>

        <div className="md:col-span-3">
          <RightSidebar companies={bengaluruCompanies} />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
