import { Link, useParams } from "react-router-dom";
import { internshipTypes } from "../data/internships.js";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

const STORE_KEY = "admin_ads_store_v1";

function loadInternships() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) return [];
  const data = JSON.parse(raw);
  return data.internships || [];
}

export default function InternType() {
  const { type } = useParams();
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    setInternships(loadInternships());
  }, []);

  // Map admin types to route types
  const getMatchingInternships = () => {
    const typeMap = {
      "web-development": "Web Development",
      "mobile-development": "Mobile Development", 
      "data-science": "Data Science",
      "machine-learning": "Machine Learning",
      "ui-ux-design": "UI/UX Design",
      "digital-marketing": "Digital Marketing",
      "content-writing": "Content Writing",
      "graphic-design": "Graphic Design",
      "cybersecurity": "Cybersecurity",
      "devops": "DevOps",
      "quality-assurance": "Quality Assurance",
      "business-analysis": "Business Analysis"
    };
    
    const adminType = typeMap[type];
    return adminType ? internships.filter(i => i.type === adminType) : [];
  };

  const list = getMatchingInternships();
  
  // Get category info
  const getCategoryInfo = () => {
    const categoryMap = {
      "web-development": { title: "Web Development", desc: "Frontend, Backend, Full Stack development" },
      "mobile-development": { title: "Mobile Development", desc: "iOS, Android, Cross-platform apps" },
      "data-science": { title: "Data Science", desc: "Analytics, Machine Learning, AI" },
      "machine-learning": { title: "Machine Learning", desc: "AI, Deep Learning, Neural Networks" },
      "ui-ux-design": { title: "UI/UX Design", desc: "User Interface, User Experience design" },
      "digital-marketing": { title: "Digital Marketing", desc: "SEO, Social Media, Content Marketing" },
      "content-writing": { title: "Content Writing", desc: "Blogs, Articles, Copywriting" },
      "graphic-design": { title: "Graphic Design", desc: "Visual Design, Branding, Illustrations" },
      "cybersecurity": { title: "Cybersecurity", desc: "Security Analysis, Penetration Testing" },
      "devops": { title: "DevOps", desc: "CI/CD, Cloud Infrastructure, Automation" },
      "quality-assurance": { title: "Quality Assurance", desc: "Testing, QA Automation, Bug Tracking" },
      "business-analysis": { title: "Business Analysis", desc: "Requirements Analysis, Process Improvement" }
    };
    return categoryMap[type] || { title: "Internships", desc: "Available internships" };
  };
  
  const categoryInfo = getCategoryInfo();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <Link to="/interns" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft size={16} />
            Back to Internship Types
          </Link>
          <h1 className="mt-2 text-2xl font-bold">{categoryInfo.title}</h1>
          <p className="text-white/70 text-sm">{categoryInfo.desc}</p>
        </div>
      </div>

      {/* List */}
      {list.length === 0 ? (
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <p className="text-white/70">No internships found for this type yet.</p>
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
                    <span className="text-white/60">Stipend:</span>{" "}
                    <span className="font-semibold text-cyan-300">{x.stipend}</span>
                  </p>
                </div>

                <Link 
                  to={`/apply?id=${x.id}&type=internship&title=${encodeURIComponent(x.title)}&company=${encodeURIComponent(x.company)}`}
                  className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-400"
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
