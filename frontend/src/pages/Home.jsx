import { Link } from "react-router-dom";
import { GraduationCap, Briefcase, ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import ContactAdminModal from "../components/ContactAdminModal";

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="space-y-8">
      {/* Hero (same gradient style as InternType header) */}
      <section className="rounded-3xl bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/20 to-amber-500/20 p-8 ring-1 ring-white/10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-300">
          Find Your Next Opportunity
        </h1>
        <p className="mt-2 max-w-2xl text-white/70">
          Browse internships for students and job vacancies for professionals — fast, clean, and mobile-friendly.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to="/interns"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-900 hover:bg-cyan-400"
          >
            Browse Internships <ArrowRight size={18} />
          </Link>

          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-bold text-slate-900 hover:bg-amber-400"
          >
            Browse Job Vacancies <ArrowRight size={18} />
          </Link>

          <button
            onClick={() => setShowContactModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-500 px-5 py-3 font-bold text-slate-900 hover:bg-fuchsia-400"
          >
            Add Vacancies <Plus size={18} />
          </button>
        </div>
      </section>

      {/* Two main sections */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Internships */}
        <div className="group relative overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-cyan-400/40">
          <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-amber-500/10" />
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-cyan-500/20 p-3 ring-1 ring-cyan-400/20">
                <GraduationCap className="text-cyan-300" />
              </div>
              <h2 className="text-xl font-bold text-cyan-300">Internships</h2>
            </div>

            <p className="mt-3 text-white/70">
              Web & Mobile, Network, Data Science, QA, UI/UX and more.
            </p>

            <Link
              to="/interns"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-cyan-300 hover:underline"
            >
              Explore internships <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Jobs */}
        <div className="group relative overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-amber-400/40">
          <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-amber-500/10 via-fuchsia-500/10 to-cyan-500/10" />
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-500/20 p-3 ring-1 ring-amber-400/20">
                <Briefcase className="text-amber-300" />
              </div>
              <h2 className="text-xl font-bold text-amber-300">Job Vacancies</h2>
            </div>

            <p className="mt-3 text-white/70">
              Software, Network, Data, QA, Design, PM and more.
            </p>

            <Link
              to="/jobs"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-amber-300 hover:underline"
            >
              Explore jobs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 p-8 ring-1 ring-white/10 text-center">
        <h3 className="text-2xl font-extrabold">Are you an Employer?</h3>
        <p className="mt-2 text-white/70">
          Post internships or vacancies and reach candidates easily.
        </p>

        <Link
          to="/employer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-900 hover:bg-gray-100"
        >
          Go to Employer Dashboard <ArrowRight size={18} />
        </Link>
      </section>

      <ContactAdminModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  );
}
