import { useState, useMemo } from "react";
import { Search, Filter, Briefcase, GraduationCap, MapPin, DollarSign } from "lucide-react";
import { jobs, jobTypes } from "../data/jobs";
import { internships, internshipTypes } from "../data/internships";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  const allItems = activeTab === "jobs" ? jobs : internships;
  const allTypes = activeTab === "jobs" ? jobTypes : internshipTypes;

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !selectedType || item.type === selectedType;
      const matchesMode = !selectedMode || item.mode === selectedMode;
      
      return matchesSearch && matchesType && matchesMode;
    });
  }, [allItems, searchTerm, selectedType, selectedMode]);

  const modes = ["Remote", "On-site", "Hybrid"];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
        <h1 className="text-2xl font-extrabold text-cyan-300">Admin Panel</h1>
        <p className="mt-2 text-white/70">Manage jobs and internships with search and filters.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition ${
            activeTab === "jobs"
              ? "bg-amber-500 text-slate-900"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          <Briefcase size={16} /> Jobs ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab("internships")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition ${
            activeTab === "internships"
              ? "bg-cyan-500 text-slate-900"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          <GraduationCap size={16} /> Internships ({internships.length})
        </button>
      </div>

      {/* Search and Filters */}
      <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              placeholder="Search by title, company, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-white/10 pl-10 pr-4 py-3 text-white placeholder-white/50 ring-1 ring-white/20 focus:ring-cyan-400/50"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-xl bg-white/10 px-4 py-3 text-white ring-1 ring-white/20 focus:ring-cyan-400/50"
          >
            <option value="">All Types</option>
            {allTypes.map(type => (
              <option key={type.key} value={type.key} className="bg-slate-800">
                {type.title}
              </option>
            ))}
          </select>

          {/* Mode Filter */}
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="rounded-xl bg-white/10 px-4 py-3 text-white ring-1 ring-white/20 focus:ring-cyan-400/50"
          >
            <option value="">All Modes</option>
            {modes.map(mode => (
              <option key={mode} value={mode} className="bg-slate-800">
                {mode}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
          <Filter size={16} />
          <span>Showing {filteredItems.length} of {allItems.length} items</span>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredItems.map(item => (
          <div key={item.id} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 hover:bg-white/10 transition">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-cyan-300 font-semibold">{item.company}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={14} />
                    {activeTab === "jobs" ? item.salary : item.stipend}
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    item.mode === "Remote" ? "bg-green-500/20 text-green-300" :
                    item.mode === "Hybrid" ? "bg-amber-500/20 text-amber-300" :
                    "bg-blue-500/20 text-blue-300"
                  }`}>
                    {item.mode}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-xl bg-cyan-500/20 px-4 py-2 text-cyan-300 hover:bg-cyan-500/30 transition">
                  Edit
                </button>
                <button className="rounded-xl bg-red-500/20 px-4 py-2 text-red-300 hover:bg-red-500/30 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 text-center">
            <p className="text-white/70">No items found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
