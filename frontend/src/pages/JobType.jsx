import { Link, useParams } from "react-router-dom";
import { jobTypes } from "../data/jobs.js";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

const STORE_KEY = "admin_ads_store_v1";

function loadJobs() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) return [];
  const data = JSON.parse(raw);
  return data.jobs || [];
}

export default function JobType() {
  const { type } = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(loadJobs());
  }, []);

  const typeInfo = jobTypes.find((t) => t.key === type);
  
  // Map admin types to route types
  const getMatchingJobs = () => {
    if (type === "software") {
      return jobs.filter(j => 
        j.type === "Software Engineering" || 
        j.type === "Frontend Development" ||
        j.type === "Backend Development" ||
        j.type === "Full Stack Development"
      );
    }
    if (type === "network") {
      return jobs.filter(j => 
        j.type === "Network Administration" || 
        j.type === "System Administration" ||
        j.type === "Cloud Architecture"
      );
    }
    if (type === "data") {
      return jobs.filter(j => j.type === "Data Engineering");
    }
    if (type === "pm") {
      return jobs.filter(j => 
        j.type === "Product Management" || 
        j.type === "Project Management"
      );
    }
    if (type === "marketing") {
      return jobs.filter(j => j.type === "Sales & Marketing");
    }
    if (type === "admin") {
      return jobs.filter(j => 
        j.type === "Database Administration" ||
        j.type === "Human Resources" ||
        j.type === "Finance & Accounting"
      );
    }
    return [];
  };

  const list = getMatchingJobs();

  return (
    <div className="space-y-5">
      <div>
        <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft size={16} />
          Back to Job Categories
        </Link>
        <h1 className="mt-2 text-2xl font-bold">{typeInfo?.title || "Jobs"}</h1>
        <p className="text-white/70 text-sm">{typeInfo?.desc || "Available vacancies"}</p>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <p className="text-white/70">No vacancies found for this category yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((x) => (
            <div key={x.id} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-bold">{x.title}</p>
                  <p className="text-sm text-white/70">{x.company}</p>
                  <p className="mt-2 text-sm text-white/60">{x.location} • {x.mode}</p>
                  <p className="mt-2 text-sm">
                    <span className="text-white/60">Salary:</span>{" "}
                    <span className="font-semibold text-amber-300">{x.salary}</span>
                  </p>
                </div>

                <Link 
                  to={`/apply?id=${x.id}&type=job&title=${encodeURIComponent(x.title)}&company=${encodeURIComponent(x.company)}`}
                  className="rounded-xl bg-amber-500 px-4 py-2 font-semibold text-slate-900 hover:bg-amber-400"
                >
                  Apply
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
