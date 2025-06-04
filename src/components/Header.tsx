import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown, Upload } from "lucide-react";

interface HeaderProps {
  showUploadModal: boolean;
  setShowUploadModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({
  showUploadModal,
  setShowUploadModal,
  handleFileUpload,
}) => {
  return (
    <>
      <header className="bg-[#080736] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-10 flex items-center">
            <img
              src="/NxtHyre_Logo.png"
              alt="NxtHyre Logo"
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              <li>
                <Link to="/jobs" className="font-semibold">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className="text-gray-300 hover:text-white"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-300 hover:text-white">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Services
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 text-sm border border-gray-600 rounded-lg px-3 py-1.5 hover:bg-gray-800"
          >
            <Upload size={18} />
            <span>Upload Resume</span>
          </button>

          <div className="relative">
            <button className="text-gray-300 hover:text-white">
              <Bell size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-1 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
              S
            </div>
            <span className="hidden md:inline">Steve</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </header>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
            <p className="text-gray-600 mb-4">
              Upload your resume to help us match you with the best jobs.
              Supported formats: PDF, DOC, DOCX
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
