import { useState } from "react";
import { Briefcase, Users, Eye, Plus, Edit, Trash2, BarChart3, TrendingUp } from "lucide-react";

export default function EmployerDash() {
  const [activeTab, setActiveTab] = useState("overview");

  const [job, setJob] = useState({
    title: "",
    companyName: "",
    location: "Remote",
    type: "internship",
    tags: "react,node,mongodb",
    description: "",
    salary: ""
  });

  // Mock data that works without backend
  const employerStats = {
    totalJobs: 12,
    activeJobs: 8,
    totalViews: 1247,
    applications: 89,
    recentApplications: [
      { id: 1, name: "John Doe", position: "Frontend Developer", date: "2024-01-15" },
      { id: 2, name: "Jane Smith", position: "Backend Developer", date: "2024-01-14" },
      { id: 3, name: "Mike Johnson", position: "UI/UX Designer", date: "2024-01-13" }
    ],
    myJobs: [
      { id: 1, title: "Senior React Developer", company: "TechCorp", location: "Remote", type: "full-time", tags: ["React", "Node.js", "MongoDB"] },
      { id: 2, title: "UI/UX Designer", company: "DesignStudio", location: "New York", type: "contract", tags: ["Figma", "Adobe", "Sketch"] },
      { id: 3, title: "Backend Developer Intern", company: "StartupXYZ", location: "San Francisco", type: "internship", tags: ["Python", "Django", "PostgreSQL"] }
    ]
  };

  const handlePostJob = () => {
    if (!job.title || !job.companyName) {
      alert("Please fill in title and company name");
      return;
    }
    alert("Job posted successfully! (Demo mode)");
    setJob({ ...job, title: "", description: "", salary: "" });
  };

  const StatCard = ({ title, value, icon: Icon, color = "cyan" }) => {
    const colorClasses = {
      cyan: "text-cyan-300 bg-cyan-500/20",
      amber: "text-amber-300 bg-amber-500/20",
      green: "text-green-300 bg-green-500/20",
      purple: "text-purple-300 bg-purple-500/20"
    };

    return (
      <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
        <div className="flex items-center gap-3">
          <div className={`rounded-xl p-3 ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-white/70">{title}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/20 to-amber-500/20 p-6 ring-1 ring-white/10">
        <h1 className="text-3xl font-extrabold text-cyan-300">Employer Dashboard</h1>
        <p className="text-white/70 mt-2">Welcome back! Manage your job postings and track applications.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition ${
            activeTab === "overview"
              ? "bg-cyan-500 text-slate-900"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          <BarChart3 size={16} /> Overview
        </button>
        <button
          onClick={() => setActiveTab("post-job")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition ${
            activeTab === "post-job"
              ? "bg-amber-500 text-slate-900"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          <Plus size={16} /> Post Job
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition ${
            activeTab === "manage"
              ? "bg-green-500 text-slate-900"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          <Briefcase size={16} /> Manage Jobs
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard title="Total Jobs" value={employerStats.totalJobs} icon={Briefcase} color="cyan" />
            <StatCard title="Active Jobs" value={employerStats.activeJobs} icon={TrendingUp} color="green" />
            <StatCard title="Total Views" value={employerStats.totalViews} icon={Eye} color="purple" />
            <StatCard title="Applications" value={employerStats.applications} icon={Users} color="amber" />
          </div>

          {/* Recent Applications */}
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Recent Applications</h3>
            <div className="space-y-3">
              {employerStats.recentApplications.map(app => (
                <div key={app.id} className="flex items-center justify-between rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                  <div>
                    <p className="font-semibold text-white">{app.name}</p>
                    <p className="text-sm text-white/70">{app.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/70">{app.date}</p>
                    <button className="text-cyan-300 hover:underline text-sm">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Post Job Tab */}
      {activeTab === "post-job" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">Post New Job</h2>

            <div className="space-y-4">
              <input 
                className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50" 
                placeholder="Job title"
                value={job.title} 
                onChange={(e)=>setJob({...job, title:e.target.value})}
              />
              <input 
                className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50" 
                placeholder="Company name"
                value={job.companyName} 
                onChange={(e)=>setJob({...job, companyName:e.target.value})}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input 
                  className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50" 
                  placeholder="Location"
                  value={job.location} 
                  onChange={(e)=>setJob({...job, location:e.target.value})}
                />
                <select 
                  className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white focus:ring-cyan-400/50"
                  value={job.type} 
                  onChange={(e)=>setJob({...job, type:e.target.value})}>
                  <option value="internship">Internship</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <input 
                className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50" 
                placeholder="Salary/Stipend (e.g., $50,000/year or $2,000/month)"
                value={job.salary} 
                onChange={(e)=>setJob({...job, salary:e.target.value})}
              />
              <input 
                className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50" 
                placeholder="Tags (comma separated)"
                value={job.tags} 
                onChange={(e)=>setJob({...job, tags:e.target.value})}
              />
              <textarea 
                className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50" 
                rows="5" 
                placeholder="Job description and requirements"
                value={job.description} 
                onChange={(e)=>setJob({...job, description:e.target.value})}
              />

              <button
                onClick={handlePostJob}
                className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-black hover:bg-cyan-400 transition"
              >
                Post Job
              </button>
            </div>
          </section>

          <section className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Posting Tips</h3>
            <div className="space-y-4 text-sm text-white/70">
              <div className="rounded-xl bg-black/40 p-4">
                <h4 className="font-semibold text-white mb-2">📝 Write Clear Titles</h4>
                <p>Use specific job titles like "Senior React Developer" instead of "Developer"</p>
              </div>
              <div className="rounded-xl bg-black/40 p-4">
                <h4 className="font-semibold text-white mb-2">💰 Include Salary Range</h4>
                <p>Transparent salary information attracts more qualified candidates</p>
              </div>
              <div className="rounded-xl bg-black/40 p-4">
                <h4 className="font-semibold text-white mb-2">🎯 Use Relevant Tags</h4>
                <p>Add skills and technologies to help candidates find your posting</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Manage Jobs Tab */}
      {activeTab === "manage" && (
        <section className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Manage Your Jobs</h2>
          <div className="space-y-3">
            {employerStats.myJobs.map((j) => (
              <div key={j.id} className="rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-white text-lg">{j.title}</p>
                    <p className="text-cyan-300 font-medium">{j.company}</p>
                    <p className="text-sm text-white/70 mt-1">{j.location} • {j.type}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {j.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="rounded-xl bg-blue-500/20 px-3 py-2 text-blue-300 hover:bg-blue-500/30 transition flex items-center gap-1">
                      <Edit size={14} /> Edit
                    </button>
                    <button className="rounded-xl bg-red-500/20 px-3 py-2 text-red-300 hover:bg-red-500/30 transition flex items-center gap-1">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
