import { Link } from "react-router-dom";
import { jobTypes } from "../data/jobs.js";
import { ArrowRight, Briefcase } from "lucide-react";

export default function Jobs() {
  return (
    <div className="space-y-6">
      {/* Header matching home page style */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500/25 via-fuchsia-500/20 to-cyan-500/20 p-6 ring-1 ring-white/10">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-500/20 p-3 ring-1 ring-amber-400/25">
            <Briefcase className="text-amber-300" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-amber-300">
              Job Categories
            </h1>
            <p className="mt-1 text-sm text-white/70">
              Select a category to view available vacancies.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {jobTypes.map((t) => (
          <Link
            key={t.key}
            to={`/jobs/${t.key}`}
            className="group relative overflow-hidden rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-amber-400/40"
          >
            {/* Hover overlay matching home page style */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-amber-500/10 via-fuchsia-500/10 to-cyan-500/10" />

            <div className="relative z-10">
              <p className="text-lg font-bold text-white">{t.title}</p>
              <p className="mt-1 text-sm text-white/70">{t.desc}</p>

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
                View vacancies <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
