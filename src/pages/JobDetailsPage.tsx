import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  GraduationCap,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Job } from "../types";

interface CompanyInfoProps {
  companyInfo: {
    company_name: string;
    analysis_date: string;
    analysis_results: {
      company_overview: {
        business_description: string;
        industry: string;
        founded_year: number;
        headquarters: string;
        employee_count: string;
        annual_revenue: string;
      };
      work_culture_assessment: {
        good_culture: boolean;
        culture_reasons: string[];
        overall_rating: number | null;
        review_count: number | null;
      };
      work_flexibility: {
        remote_friendly: boolean;
        flexible_hours: boolean;
        details: string;
      };
      compensation_data: {
        average_pay_overall: number | null;
        currency: string | null;
        salary_range: string | null;
        data_source: string;
      };
      employee_retention: {
        median_tenure: number;
        turnover_indicator: string;
        data_source: string;
      };
      leadership_info: {
        ceo_name: string;
        founder_name: string;
        leadership_count: number | null;
      };
      recent_news: {
        recent_updates: Array<{
          headline: string;
          date: string;
          source: string;
          summary: string;
        }>;
        business_developments: string[];
        media_presence: string;
      };
    };
  };
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ companyInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { company_name, analysis_results: data } = companyInfo;

  if (!data) {
    return <div></div>;
  }

  const {
    company_overview,
    work_culture_assessment,
    work_flexibility,
    compensation_data,
    employee_retention,
    leadership_info,
    recent_news,
  } = data;

  // Helper function to determine if a field should be displayed
  const shouldDisplay = (value: any) => {
    if (typeof value === "string") {
      return value && value !== "N/A"; // For strings: not empty, not "N/A"
    } else if (typeof value === "number") {
      return value != null; // For numbers: not null or undefined
    } else {
      return false; // For other types, default to not displaying
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        About {company_name.charAt(0).toUpperCase() + company_name.slice(1)}
      </h2>
      <div
        className={`relative transition-all duration-300 ${
          isExpanded ? "" : "max-h-60 overflow-hidden"
        }`}
      >
        {/* Business Description */}
        {shouldDisplay(company_overview.business_description) && (
          <p className="text-gray-600 mb-4">
            {company_overview.business_description}
          </p>
        )}

        {/* Key Stats */}
        <h3 className="font-semibold text-gray-600 mb-2">Key Stats : </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {shouldDisplay(company_overview.industry) && (
            <div className="text-gray-600 mb-2">
              <span>Industry:</span> {company_overview.industry}
            </div>
          )}
          {shouldDisplay(company_overview.founded_year) && (
            <div className="text-gray-600 mb-2">
              <span>Founded:</span> {company_overview.founded_year}
            </div>
          )}
          {shouldDisplay(company_overview.headquarters) && (
            <div className="text-gray-600 mb-2">
              <span>Headquarters:</span> {company_overview.headquarters}
            </div>
          )}
          {shouldDisplay(company_overview.employee_count) && (
            <div className="text-gray-600 mb-2">
              <span>Employees:</span> {company_overview.employee_count}
            </div>
          )}
          {shouldDisplay(company_overview.annual_revenue) && (
            <div className="text-gray-600 mb-2">
              <span>Revenue:</span> {company_overview.annual_revenue}
            </div>
          )}
        </div>

        {/* Work Culture */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-600 mb-2">Work Culture : </h3>
          <p className="text-gray-600">
            {work_culture_assessment.good_culture
              ? "Good"
              : "Needs Improvement"}
          </p>
          {work_culture_assessment.culture_reasons.length > 0 && (
            <ul className="list-disc pl-5 text-gray-600">
              {work_culture_assessment.culture_reasons
                .slice(0, 2)
                .map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
            </ul>
          )}
          {shouldDisplay(work_culture_assessment.review_count) && (
            <>
              <h3 className="font-semibold text-gray-600 mb-2 mt-4">
                Reviews :{" "}
              </h3>
              <p className="text-gray-600">
                {work_culture_assessment.review_count} reviews
              </p>
            </>
          )}
        </div>

        {/* Flexibility */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-600 mb-2">Flexibility : </h3>
          <div className="flex space-x-4 text-gray-600">
            {work_flexibility.remote_friendly && <span>Remote Friendly</span>}
            {work_flexibility.flexible_hours && <span>Flexible Hours</span>}
          </div>
        </div>

        {/* Average Pay */}
        {shouldDisplay(compensation_data.average_pay_overall) && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-600 mb-2">Average Pay : </h3>
            <p className="text-gray-600">
              {compensation_data.average_pay_overall}{" "}
              {shouldDisplay(compensation_data.currency)
                ? compensation_data.currency
                : ""}
            </p>
          </div>
        )}

        {/* Employee Retention */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-600 mb-2">
            Employee Retention :{" "}
          </h3>
          {shouldDisplay(employee_retention.median_tenure) && (
            <p className="text-gray-600">
              Median Tenure: {employee_retention.median_tenure} years
            </p>
          )}
          {shouldDisplay(employee_retention.turnover_indicator) && (
            <p className="text-gray-600">
              Turnover: {employee_retention.turnover_indicator}
            </p>
          )}
        </div>

        {/* Leadership */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-600 mb-2">Leadership : </h3>
          {shouldDisplay(leadership_info.ceo_name) && (
            <p className="text-gray-600">CEO: {leadership_info.ceo_name}</p>
          )}
          {shouldDisplay(leadership_info.founder_name) && (
            <p className="text-gray-600">
              Founder: {leadership_info.founder_name}
            </p>
          )}
        </div>

        {/* Recent News */}
        {recent_news.recent_updates.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-600 mb-2">Recent News : </h3>
            {recent_news.recent_updates.slice(0, 2).map((news, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm font-semibold text-gray-600">
                  {news.headline}
                </p>
                <p className="text-sm text-gray-500">
                  {news.date} - {news.source}
                </p>
              </div>
            ))}
          </div>
        )}

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-gray-600 font-semibold hover:underline flex items-center"
        >
          {isExpanded ? (
            <>
              Show less
              <ChevronUp size={16} className="ml-1" />
            </>
          ) : (
            <>
              Show more
              <ChevronDown size={16} className="ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

function JobDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-300 rounded-lg h-10 w-1/3"></div>
          <div className="bg-gray-300 rounded-lg h-6 w-1/4"></div>
          <div className="flex space-x-4 mt-6">
            <div className="bg-gray-300 rounded-lg h-8 w-20"></div>
            <div className="bg-gray-300 rounded-lg h-8 w-20"></div>
            <div className="bg-gray-300 rounded-lg h-8 w-20"></div>
            <div className="bg-gray-300 rounded-lg h-8 w-20"></div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="bg-gray-300 rounded-lg h-6 w-1/5"></div>
            <div className="bg-gray-300 rounded-lg h-4 w-full"></div>
            <div className="bg-gray-300 rounded-lg h-4 w-full"></div>
            <div className="bg-gray-300 rounded-lg h-4 w-3/4"></div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="bg-gray-300 rounded-lg h-6 w-1/5"></div>
            <ul className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <li key={i} className="bg-gray-300 rounded-lg h-4 w-full"></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 mt-8">
            <div className="bg-gray-300 rounded-lg h-6 w-1/5"></div>
            <ul className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <li key={i} className="bg-gray-300 rounded-lg h-4 w-full"></li>
              ))}
            </ul>
          </div>
        </div>
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          {/* About the Company Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="bg-gray-300 rounded-lg h-8 w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="bg-gray-300 rounded-lg h-4 w-full"></div>
              <div className="bg-gray-300 rounded-lg h-4 w-full"></div>
              <div className="bg-gray-300 rounded-lg h-4 w-3/4"></div>
            </div>
          </div>
          {/* Job Features Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="bg-gray-300 rounded-lg h-8 w-1/3 mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-300 rounded-lg h-6 w-full"
                ></div>
              ))}
            </div>
          </div>
          {/* Similar Jobs Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="bg-gray-300 rounded-lg h-8 w-1/3 mb-4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-300 rounded-lg h-12 w-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobDetailsPage() {
  const { company, title, id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  useEffect(() => {
    setShowNotFoundMessage(false);
    setJob(null);

    fetch("https://jobs-nxthyre.vercel.app/api/jobs")
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
    if (job) {
      const correctCompanySlug = slugify(job.company);
      const correctTitleSlug = slugify(job.title);
      if (company !== correctCompanySlug || title !== correctTitleSlug) {
        navigate(`/job/${correctCompanySlug}/${correctTitleSlug}/${job.id}`, {
          replace: true,
        });
      }
    }
  }, [job, company, title, navigate]);

  useEffect(() => {
    if (job === null) {
      const timer = setTimeout(() => {
        setShowNotFoundMessage(true);
      }, 7000);
      return () => clearTimeout(timer);
    } else {
      setShowNotFoundMessage(false);
    }
  }, [job]);

  if (job === null && !showNotFoundMessage) {
    return <JobDetailsSkeleton />;
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
            {job.companyInfo && <CompanyInfo companyInfo={job.companyInfo} />}
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
                    to={`/job/${slugify(relatedJob.company)}/${slugify(
                      relatedJob.title
                    )}/${relatedJob.id}`}
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
