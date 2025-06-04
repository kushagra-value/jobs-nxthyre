import React, { useState } from "react";
import SearchForm from "./SearchForm";

const HeroSection: React.FC = () => {
  const [jobTitle, setJobTitle] = useState<string>("Designer");
  const [location, setLocation] = useState<string>("Chicago, IL");

  const handleSearch = () => {
    console.log("Searching for:", { jobTitle, location });
    // In a real app, this would trigger the search
  };

  return (
    <div className="relative">
      {/* Background Layer (dark blue) */}
      <div className="bg-[#080736] h-[72%] absolute top-0 left-0 w-full z-0" />

      {/* Foreground content */}
      <div
        className="relative z-10 px-6 py-8 md:py-16"
        style={{ paddingBottom: "32px" }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Find your dream job
          </h1>

          <SearchForm
            jobTitle={jobTitle}
            location={location}
            setJobTitle={setJobTitle}
            setLocation={setLocation}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
