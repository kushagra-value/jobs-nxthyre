import React from "react";
import { Link } from "react-router-dom";
import { Job } from "../types";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onSaveJob: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSaved, onSaveJob }) => {
  const {
    id,
    title,
    company,
    location,
    experience,
    jobType,
    salary,
    postedTime,
    companyLogo,
  } = job;

  const slugify = (text) => {
    if (!text) return "unknown";
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const renderLogo = () => {
    if (!companyLogo) {
      return (
        <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
          {company ? company.charAt(0) : "?"}
        </div>
      );
    }

    if (companyLogo.startsWith("http") || companyLogo.startsWith("https")) {
      return (
        <img
          src={companyLogo}
          alt={`${company} logo`}
          className="w-10 h-10 rounded object-cover"
        />
      );
    }

    const parts = companyLogo.split("|");
    if (parts.length === 2) {
      const [bgColor, initials] = parts;
      return (
        <div
          className={`w-10 h-10 rounded ${bgColor} flex items-center justify-center text-white font-semibold`}
        >
          {initials}
        </div>
      );
    }

    // Fallback if companyLogo is not in expected format
    return (
      <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
        ?
      </div>
    );
  };

  const renderBadge = () => {
    if (job.badges && job.badges.includes("Featured")) {
      return (
        <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 uppercase">
          Featured
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border border-gray-200 rounded-md shadow-lg mb-4 hover:bg-gray-50 transition-colors relative">
      {renderBadge()}

      <div className="flex p-4">
        <div className="mr-4">{renderLogo()}</div>

        <div className="flex-1">
          <div className="flex justify-between">
            <Link
              to={`/job/${slugify(company)}/${slugify(title)}/${id}`}
              className="group"
            >
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600">
                {title}
              </h3>
              <div className="text-sm text-gray-600 mt-1">
                {company || "N/A"} • {location || "N/A"}
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-3 mt-4 gap-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">Experience</p>
              <p className="text-sm font-medium">{experience || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Job Type</p>
              <p className="text-sm font-medium">{jobType || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Salary</p>
              <p className="text-sm font-medium">{salary || "Not specified"}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex justify-between items-center bg-gray-100">
        <div className="text-xs text-gray-500">
          {"Posted " + postedTime || "Recently posted"}
        </div>

        <button
          onClick={onSaveJob}
          className="flex items-center text-sm text-gray-600 hover:text-blue-600"
        >
          {isSaved ? (
            <BookmarkCheck className="w-5 h-5 text-blue-600" />
          ) : (
            <BookmarkPlus className="w-5 h-5" />
          )}
          <span className="ml-2">Save Job</span>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
