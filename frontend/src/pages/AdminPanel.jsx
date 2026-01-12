import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";

import { useAdminAuth } from "../state/adminAuth.jsx";
import {
  GraduationCap,
  Briefcase,
  LogOut,
  Settings,
  Home,
  LayoutDashboard,
} from "lucide-react";

const STORE_KEY = "admin_ads_store_v1";

const INTERN_TYPES = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "UI/UX Design",
  "Digital Marketing",
  "Content Writing",
  "Graphic Design",
  "Cybersecurity",
  "DevOps",
  "Quality Assurance",
  "Business Analysis"
];

const JOB_TYPES = [
  "Software Engineering",
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Data Engineering",
  "Product Management",
  "Project Management",
  "Network Administration",
  "System Administration",
  "Database Administration",
  "Cloud Architecture",
  "Sales & Marketing",
  "Human Resources",
  "Finance & Accounting"
];

function loadStore() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) {
    const init = {
      internships: [
        {
          id: "i_sample_1",
          title: "Frontend Developer Intern",
          company: "TechCorp",
          location: "San Francisco, CA",
          mode: "Hybrid",
          type: "Web Development",
          stipend: "$2,000/month"
        },
        {
          id: "i_sample_2",
          title: "Data Science Intern",
          company: "DataFlow Inc",
          location: "New York, NY",
          mode: "Remote",
          type: "Data Science",
          stipend: "$1,800/month"
        },
        {
          id: "i_sample_3",
          title: "UI/UX Design Intern",
          company: "Creative Studio",
          location: "Austin, TX",
          mode: "On-site",
          type: "UI/UX Design",
          stipend: "$1,500/month"
        }
      ],
      jobs: [
        {
          id: "j_sample_1",
          title: "Senior Software Engineer",
          company: "InnovateTech",
          location: "Seattle, WA",
          mode: "Remote",
          type: "Software Engineering",
          salary: "$120,000/year"
        },
        {
          id: "j_sample_2",
          title: "Network Administrator",
          company: "NetSolutions",
          location: "Denver, CO",
          mode: "On-site",
          type: "Network Administration",
          salary: "$85,000/year"
        },
        {
          id: "j_sample_3",
          title: "Product Manager",
          company: "StartupXYZ",
          location: "Los Angeles, CA",
          mode: "Hybrid",
          type: "Product Management",
          salary: "$110,000/year"
        }
      ]
    };
    localStorage.setItem(STORE_KEY, JSON.stringify(init));
    return init;
  }
  return JSON.parse(raw);
}

function saveStore(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

function uid(prefix) {
  return `${prefix}_${Date.now()}`;
}

export default function AdminPanel() {
  const { logout, changeCreds, getUsername } = useAdminAuth();

  const [tab, setTab] = useState("interns"); // interns | jobs | applications | settings
  const [store, setStore] = useState(loadStore());
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  const [form, setForm] = useState({
    id: "",
    title: "",
    company: "",
    location: "",
    mode: "Remote",
    type: "",
    value: "",
  });

  const list = useMemo(() => {
    const items = tab === "interns" ? store.internships : store.jobs;
    
    // Apply search and filters
    return items.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = !selectedType || item.type === selectedType;
      const matchesMode = !selectedMode || item.mode === selectedMode;
      
      return matchesSearch && matchesType && matchesMode;
    });
  }, [store, tab, searchTerm, selectedType, selectedMode]);

  const resetForm = () =>
    setForm({
      id: "",
      title: "",
      company: "",
      location: "",
      mode: "Remote",
      type: "",
      value: "",
    });

  const saveItem = () => {
    if (!form.title || !form.company || !form.type) {
      alert("Title, Company, and Type are required");
      return;
    }

    const entry = {
      id: form.id || uid(tab === "interns" ? "i" : "j"),
      title: form.title,
      company: form.company,
      location: form.location,
      mode: form.mode,
      type: form.type,
      stipend: tab === "interns" ? form.value : undefined,
      salary: tab === "jobs" ? form.value : undefined,
    };

    const next = { ...store };
    if (tab === "interns") {
      next.internships = form.id
        ? next.internships.map((x) => (x.id === form.id ? entry : x))
        : [entry, ...next.internships];
    } else {
      next.jobs = form.id
        ? next.jobs.map((x) => (x.id === form.id ? entry : x))
        : [entry, ...next.jobs];
    }

    saveStore(next);
    setStore(next);
    resetForm();
  };

  const editItem = (x) => {
    setForm({
      id: x.id,
      title: x.title,
      company: x.company,
      location: x.location,
      mode: x.mode,
      type: x.type,
      value: tab === "interns" ? x.stipend : x.salary,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteItem = (id) => {
    if (!confirm("Delete this item?")) return;
    const next = { ...store };
    next[tab === "interns" ? "internships" : "jobs"] =
      list.filter((x) => x.id !== id);
    saveStore(next);
    setStore(next);
  };

  // settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const saveSettings = (e) => {
    e.preventDefault();
    const res = changeCreds({
      currentPassword,
      newUsername,
      newPassword,
    });
    setMsg(res.message);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/20 to-amber-500/20 p-6 ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-cyan-300">
              Admin Panel
            </h1>
            <p className="text-sm text-white/70">
              Logged in as <span className="font-semibold text-cyan-300">{getUsername()}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-xl bg-white/10 px-4 py-2 font-semibold text-white ring-1 ring-white/10 hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Home size={18} /> Home
            </Link>
            <button
              onClick={logout}
              className="rounded-xl bg-white/10 px-4 py-2 font-semibold text-white ring-1 ring-white/10 hover:bg-white/20 transition-all"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("interns")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all ${
            tab === "interns"
              ? "bg-cyan-500 text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <GraduationCap size={18} /> Internships
        </button>

        <button
          onClick={() => setTab("jobs")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all ${
            tab === "jobs"
              ? "bg-amber-500 text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Briefcase size={18} /> Jobs
        </button>

        <button
          onClick={() => setTab("applications")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all ${
            tab === "applications"
              ? "bg-green-500 text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <LayoutDashboard size={18} /> Applications
        </button>

        <button
          onClick={() => setTab("settings")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all ${
            tab === "settings"
              ? "bg-fuchsia-500 text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Settings size={18} /> Settings
        </button>
      </div>

      {/* Settings */}
      {tab === "settings" ? (
        <form
          onSubmit={saveSettings}
          className="max-w-xl rounded-3xl bg-white/5 p-6 ring-1 ring-white/10"
        >
          <h2 className="text-xl font-bold text-cyan-300">Admin Credentials</h2>

          <input
            type="password"
            placeholder="Current password"
            className="mt-4 w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            placeholder="New username (optional)"
            className="mt-3 w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
            onChange={(e) => setNewUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="New password (optional)"
            className="mt-3 w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {msg && <p className="mt-3 text-sm text-cyan-300">{msg}</p>}

          <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 py-3 font-bold text-black hover:from-cyan-400 hover:to-cyan-500 transition-all">
            Save Changes
          </button>
        </form>
      ) : tab === "applications" ? (
        <ApplicationsTab />
      ) : (
        <>
          {/* Form */}
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-bold text-cyan-300">
              {tab === "interns" ? "Add Internship" : "Add Job Vacancy"}
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                key="title"
                placeholder="TITLE"
                value={form.title}
                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                className="rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              />
              
              <input
                key="company"
                placeholder="COMPANY"
                value={form.company}
                onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                className="rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              />
              
              <input
                key="location"
                placeholder="LOCATION"
                value={form.location}
                onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
                className="rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              />
              
              <select
                value={form.mode}
                onChange={(e) => setForm((s) => ({ ...s, mode: e.target.value }))}
                className="rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              >
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              
              <select
                value={form.type}
                onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
                className="rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              >
                <option value="">{tab === "interns" ? "Select Intern Type" : "Select Job Type"}</option>
                {(tab === "interns" ? INTERN_TYPES : JOB_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <input
                placeholder={tab === "interns" ? "STIPEND" : "SALARY"}
                value={form.value}
                onChange={(e) => setForm((s) => ({ ...s, value: e.target.value }))}
                className="rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              />
            </div>

            <button
              onClick={saveItem}
              className={`mt-5 rounded-xl px-6 py-3 font-bold text-black transition-all hover:opacity-90 ${
                tab === "interns" ? "bg-cyan-500 hover:bg-cyan-400" : "bg-amber-500 hover:bg-amber-400"
              }`}
            >
              {form.id ? "Update" : "Add"}
            </button>
          </div>

          {/* List */}
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-cyan-300">Current Items</h2>
              <span className="text-sm text-white/70">
                Showing {list.length} of {(tab === "interns" ? store.internships : store.jobs).length} items
              </span>
            </div>

            {/* Search and Filters */}
            <div className="grid gap-3 md:grid-cols-3 mb-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                <input
                  type="text"
                  placeholder="Search title, company, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl bg-black/40 pl-9 pr-3 py-2 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400/50"
                />
              </div>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="rounded-xl bg-black/40 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400/50"
              >
                <option value="">All Types</option>
                {(tab === "interns" ? INTERN_TYPES : JOB_TYPES).map(type => (
                  <option key={type} value={type} className="bg-slate-800">
                    {type}
                  </option>
                ))}
              </select>

              {/* Mode Filter */}
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="rounded-xl bg-black/40 px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400/50"
              >
                <option value="">All Modes</option>
                <option value="Remote" className="bg-slate-800">Remote</option>
                <option value="On-site" className="bg-slate-800">On-site</option>
                <option value="Hybrid" className="bg-slate-800">Hybrid</option>
              </select>
            </div>

            <div className="mt-4 space-y-3">
              {list.map((x) => (
                <div
                  key={x.id}
                  className="rounded-2xl bg-black/40 p-4 ring-1 ring-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-white text-lg">{x.title}</p>
                      <p className="text-cyan-300 font-medium">{x.company}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm">
                        <span className="px-2 py-1 rounded-lg bg-white/10 text-white/70">
                          📍 {x.location || 'Not specified'}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-white/10 text-white/70">
                          💼 {x.mode}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300">
                          {x.type}
                        </span>
                        {(x.stipend || x.salary) && (
                          <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-300">
                            💰 {x.stipend || x.salary}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => editItem(x)}
                        className="rounded-xl bg-blue-500/20 px-3 py-1 text-sm text-blue-300 hover:bg-blue-500/30 transition-all"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteItem(x.id)}
                        className="rounded-xl bg-red-500/20 px-3 py-1 text-sm text-red-300 hover:bg-red-500/30 transition-all"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {list.length === 0 && searchTerm && (
                <div className="text-center py-8 text-white/50">
                  <p>No items found matching "{searchTerm}".</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                </div>
              )}
              
              {list.length === 0 && !searchTerm && (
                <div className="text-center py-8 text-white/50">
                  <p>No {tab === "interns" ? "internships" : "jobs"} added yet.</p>
                  <p className="text-sm mt-1">Use the form above to add your first {tab === "interns" ? "internship" : "job"}.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

function ApplicationsTab() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApplications = () => {
      const apps = JSON.parse(localStorage.getItem("applications") || "[]");
      setApplications(apps);
    };
    loadApplications();
  }, []);

  const downloadCV = (application) => {
    if (application.cv && application.cv.data) {
      // Convert base64 back to blob
      const byteCharacters = atob(application.cv.data.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${application.fullName}_CV.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
      <h2 className="text-xl font-bold text-green-300 mb-6">Job Applications</h2>
      
      {applications.length === 0 ? (
        <div className="text-center py-8 text-white/50">
          <p>No applications received yet.</p>
          <p className="text-sm mt-1">Applications will appear here when users apply for positions.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="rounded-2xl bg-black/40 p-5 ring-1 ring-white/10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-white">{app.fullName}</h3>
                    <span className={`px-2 py-1 rounded-lg text-xs ${
                      app.jobType === 'internship' 
                        ? 'bg-cyan-500/20 text-cyan-300' 
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {app.jobType === 'internship' ? 'Internship' : 'Job'}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/70">Position: <span className="text-white">{app.jobTitle}</span></p>
                      <p className="text-white/70">Company: <span className="text-white">{app.company}</span></p>
                      <p className="text-white/70">Email: <span className="text-white">{app.email}</span></p>
                      <p className="text-white/70">Phone: <span className="text-white">{app.phone}</span></p>
                    </div>
                    <div>
                      <p className="text-white/70">Address: <span className="text-white">{app.address || 'Not provided'}</span></p>
                      <p className="text-white/70">Applied: <span className="text-white">{new Date(app.appliedAt).toLocaleDateString()}</span></p>
                    </div>
                  </div>
                  
                  {app.experience && (
                    <div className="mt-3">
                      <p className="text-white/70 text-sm">Experience:</p>
                      <p className="text-white text-sm bg-white/5 rounded-lg p-2 mt-1">{app.experience}</p>
                    </div>
                  )}
                  
                  {app.coverLetter && (
                    <div className="mt-3">
                      <p className="text-white/70 text-sm">Cover Letter:</p>
                      <p className="text-white text-sm bg-white/5 rounded-lg p-2 mt-1">{app.coverLetter}</p>
                    </div>
                  )}
                </div>
                
                <div className="ml-4">
                  {app.cv && (
                    <button
                      onClick={() => downloadCV(app)}
                      className="rounded-xl bg-green-500/20 px-4 py-2 text-sm text-green-300 hover:bg-green-500/30 transition-all"
                    >
                      📄 Download CV
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
