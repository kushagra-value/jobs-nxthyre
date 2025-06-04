import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Job } from "../types";

function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);

  useEffect(() => {
    // Reset message and job on id change
    setShowNotFoundMessage(false);
    setJob(null);

    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data: Job[]) => {
        const selected = data.find((j) => j.id === id);
        setJob(selected || null);

        const related = data
          .filter(
            (j) =>
              j.department === selected?.department && j.id !== selected?.id
          )
          .slice(0, 3);
        setRelatedJobs(related);
      })
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (job === null) {
      // Start 10 second timer before showing "Job not found"
      const timer = setTimeout(() => {
        setShowNotFoundMessage(true);
      }, 10000);

      return () => {
        clearTimeout(timer);
        setShowNotFoundMessage(false);
      };
    } else {
      // If job is loaded, hide the message immediately
      setShowNotFoundMessage(false);
    }
  }, [job]);

  if (job === null && !showNotFoundMessage) {
    // Waiting period — don't show anything yet (or show a loader if you want)
    return null;
  }

  if (showNotFoundMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Job not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {job.title || "N/A"}
                  </h1>
                  <div className="mt-2 flex items-center text-gray-600">
                    <Building2 size={18} className="mr-2" />
                    <span>{job.company || "N/A"}</span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Apply Now
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Briefcase size={18} className="mr-2" />
                  <span>{job.jobType || "N/A"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  <span>{job.location || "N/A"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2" />
                  <span>{job.experience || "N/A"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <GraduationCap size={18} className="mr-2" />
                  <span>{job.education || "N/A"}</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">Skills Required</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-gray-600 mb-6">{job.description}</p>

                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc pl-5 mb-6">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600 mb-2">
                      {req}
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                <ul className="list-disc pl-5 mb-6">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-600 mb-2">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Job Features</h2>
              <div className="space-y-3">
                {job.jobFeatures?.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="mr-2 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
              <div className="space-y-4">
                {relatedJobs.map((relatedJob) => (
                  <Link
                    key={relatedJob.id}
                    to={`/job/${relatedJob.id}`}
                    className="block p-4 border rounded-lg hover:border-blue-500"
                  >
                    <h3 className="font-medium text-gray-900">
                      {relatedJob.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {relatedJob.company}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      {relatedJob.location} • {relatedJob.jobType}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default JobDetailsPage;
