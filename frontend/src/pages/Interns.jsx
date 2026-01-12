import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";

const STORE_KEY = "admin_ads_store_v1";

const INTERN_CATEGORIES = [
  { key: "web-development", title: "Web Development", desc: "Frontend, Backend, Full Stack development" },
  { key: "mobile-development", title: "Mobile Development", desc: "iOS, Android, Cross-platform apps" },
  { key: "data-science", title: "Data Science", desc: "Analytics, Machine Learning, AI" },
  { key: "machine-learning", title: "Machine Learning", desc: "AI, Deep Learning, Neural Networks" },
  { key: "ui-ux-design", title: "UI/UX Design", desc: "User Interface, User Experience design" },
  { key: "digital-marketing", title: "Digital Marketing", desc: "SEO, Social Media, Content Marketing" },
  { key: "content-writing", title: "Content Writing", desc: "Blogs, Articles, Copywriting" },
  { key: "graphic-design", title: "Graphic Design", desc: "Visual Design, Branding, Illustrations" },
  { key: "cybersecurity", title: "Cybersecurity", desc: "Security Analysis, Penetration Testing" },
  { key: "devops", title: "DevOps", desc: "CI/CD, Cloud Infrastructure, Automation" },
  { key: "quality-assurance", title: "Quality Assurance", desc: "Testing, QA Automation, Bug Tracking" },
  { key: "business-analysis", title: "Business Analysis", desc: "Requirements Analysis, Process Improvement" }
];

function loadInternships() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) return [];
  const data = JSON.parse(raw);
  return data.internships || [];
}

export default function Interns() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    setInternships(loadInternships());
  }, []);

  // Show all categories
  const availableCategories = INTERN_CATEGORIES;
  return (
    <div className="space-y-6">
      {/* Header matching home page style */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/20 to-amber-500/20 p-6 ring-1 ring-white/10">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/20 p-3 ring-1 ring-cyan-400/25">
            <GraduationCap className="text-cyan-300" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-cyan-300">
              Internship Types
            </h1>
            <p className="mt-1 text-sm text-white/70">
              Pick a category to see available internships.
            </p>
          </div>
        </div>
      </div>

      {/* Cards matching home page style */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {availableCategories.map((t) => {
          const hasInternships = internships.some(intern => intern.type === t.title);
          return (
            <Link
              key={t.key}
              to={`/interns/${t.key}`}
              className="group relative overflow-hidden rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-cyan-400/40"
            >
              {/* Hover overlay matching home page style */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-amber-500/10" />

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-lg font-bold text-white">{t.title}</p>
                    <p className="mt-1 text-sm text-white/70">{t.desc}</p>
                  </div>
                  {hasInternships && (
                    <span className="ml-2 rounded-full bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">
                      Available
                    </span>
                  )}
                </div>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  Explore <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>


    </div>
  );
}
