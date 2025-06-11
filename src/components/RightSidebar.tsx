import React, { useState } from "react";
import { Company } from "../types";

interface RightSidebarProps {
  companies: Company[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ companies }) => {
  const [email, setEmail] = useState("richard@piedpiper.com");

  return (
    <div className="space-y-6">
      {/* User Info Section */}
      <div className="bg-white p-5">
        <div className="mb-4">
          <h2 className="font-semibold text-lg">
            Be the first to see new jobs in{" "}
            <span className="text-blue-600">Bengaluru, IND</span>
          </h2>
        </div>

        <div className="relative mb-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 pt-6 pb-2 border bg-white border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-2 text-xs text-gray-500"
          >
            Email
          </label>
        </div>

        <button className="w-full border border-indigo-400 bg-blue-200 bg-opacity-20 hover:bg-opacity-40 text-indigo-600 font-medium py-2 rounded transition duration-200">
          Subscribe Now
        </button>

        <p className="text-xs text-gray-500 mt-2">Not interested? Hide now</p>
      </div>

      {/* Popular Companies Section */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-semibold text-lg mb-4">Popular in Bengaluru</h2>

        <div className="space-y-3">
          {companies.map((company) => (
            <CompanyItem key={company.id} company={company} />
          ))}
          {/* <button className="text-blue-600 text-sm hover:underline mt-2">
            See all jobs →
          </button> */}
        </div>
      </div>
    </div>
  );
};

interface CompanyItemProps {
  company: Company;
}

const CompanyItem: React.FC<CompanyItemProps> = ({ company }) => {
  const renderLogo = () => {
    if (company.logo.startsWith("http") || company.logo.startsWith("https")) {
      return (
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="w-8 h-8 rounded object-cover mr-3"
        />
      );
    } else {
      const parts = company.logo.split("|");
      if (parts.length === 2) {
        const [bgColor, initials] = parts;
        return (
          <div
            className={`w-8 h-8 rounded ${bgColor} flex items-center justify-center text-white font-semibold text-xs mr-3`}
          >
            {initials}
          </div>
        );
      } else {
        return (
          <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-gray-500 font-semibold text-xs mr-3">
            {company.name ? company.name.charAt(0).toUpperCase() : "?"}
          </div>
        );
      }
    }
  };

  return (
    <div className="flex items-center">
      {renderLogo()}
      <div className="flex-1">
        <p className="text-sm font-medium">{company.name}</p>
        <p className="text-xs text-gray-500">{company.jobCount} jobs</p>
      </div>
    </div>
  );
};

export default RightSidebar;
