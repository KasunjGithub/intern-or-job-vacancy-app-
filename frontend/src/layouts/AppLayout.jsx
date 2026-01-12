import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../state/adminAuth.jsx";
import { useState } from "react";

import { Home, LayoutDashboard, Filter, Briefcase, GraduationCap, Shield, Search } from "lucide-react";

const navItem =
  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-white/10";
const navActive = "bg-white/15 ring-1 ring-white/20";

export default function AppLayout() {
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    mode: [],
    category: [],
    posted: ''
  });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: type === 'posted' ? value : 
        prev[type].includes(value) 
          ? prev[type].filter(item => item !== value)
          : [...prev[type], value]
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (filters.mode.length) params.set('mode', filters.mode.join(','));
    if (filters.category.length) params.set('category', filters.category.join(','));
    if (filters.posted) params.set('posted', filters.posted);
    
    navigate(`/filter-results?${params.toString()}`);
    setShowFilter(false);
  };

  const clearFilters = () => {
    setFilters({ mode: [], category: [], posted: '' });
  };
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="flex items-center justify-between px-3 py-3 md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile menu button placeholder (optional later) */}
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-cyan-500 grid place-items-center font-bold">
              RJ
            </div>
            <div className="leading-tight">
              <p className="text-sm text-white/70">Intern & Job Vacancy App</p>
              <p className="font-semibold">Dashboard</p>
            </div>
          </div>
          <Link
  to="/"
  className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/20"
>
  <Home size={18} />
  <span className="hidden sm:inline">Home</span>
</Link>


          {/* Search + actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/10">
              <Search size={16} className="text-white/70" />
              <input
                className="w-72 bg-transparent text-sm outline-none placeholder:text-white/50"
                placeholder="Search jobs, internships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>

            {/* Filter icons */}
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className={`rounded-xl px-3 py-2 ring-1 ring-white/10 hover:bg-white/15 ${
                showFilter ? 'bg-cyan-500/20 ring-cyan-400/30' : 'bg-white/10'
              }`}
            >
              <Filter size={18} />
            </button>

            {/* Filter dropdown */}
            {showFilter && (
              <div className="absolute top-16 right-4 z-50 w-80 max-h-96 overflow-y-auto rounded-xl bg-slate-900 p-4 ring-1 ring-white/10 shadow-xl">
                <h3 className="text-sm font-semibold text-white mb-4">Filter Options</h3>
                
                {/* Work Mode */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-white/70 mb-2 block">Work Mode</label>
                  <div className="flex flex-wrap gap-2">
                    {['Remote', 'On-site', 'Hybrid'].map(mode => (
                      <button 
                        key={mode} 
                        onClick={() => toggleFilter('mode', mode)}
                        className={`px-3 py-1 text-xs rounded-lg transition-all ${
                          filters.mode.includes(mode) 
                            ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400/50' 
                            : 'bg-white/10 text-white hover:bg-cyan-500/20 hover:text-cyan-300'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-white/70 mb-2 block">Location</label>
                  <input 
                    className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-white/50 ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400/50"
                    placeholder="Enter city or region..."
                  />
                </div>

                {/* Salary Range */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-white/70 mb-2 block">Salary/Stipend Range</label>
                  <div className="flex gap-2">
                    <input 
                      className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-white/50 ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400/50"
                      placeholder="Min"
                    />
                    <input 
                      className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-white/50 ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400/50"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Type */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-white/70 mb-2 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {['Web Development', 'Data Science', 'UI/UX Design', 'Marketing', 'DevOps', 'Cybersecurity'].map(type => (
                      <button 
                        key={type} 
                        onClick={() => toggleFilter('category', type)}
                        className={`px-3 py-1 text-xs rounded-lg transition-all ${
                          filters.category.includes(type) 
                            ? 'bg-amber-500/30 text-amber-300 ring-1 ring-amber-400/50' 
                            : 'bg-white/10 text-white hover:bg-amber-500/20 hover:text-amber-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Posted */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-white/70 mb-2 block">Posted</label>
                  <div className="flex flex-wrap gap-2">
                    {['Today', 'This Week', 'This Month', 'All Time'].map(time => (
                      <button 
                        key={time} 
                        onClick={() => toggleFilter('posted', time)}
                        className={`px-3 py-1 text-xs rounded-lg transition-all ${
                          filters.posted === time 
                            ? 'bg-fuchsia-500/30 text-fuchsia-300 ring-1 ring-fuchsia-400/50' 
                            : 'bg-white/10 text-white hover:bg-fuchsia-500/20 hover:text-fuchsia-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={applyFilters}
                    className="flex-1 rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
                  >
                    Apply Filters
                  </button>
                  <button 
                    onClick={clearFilters}
                    className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Admin panel area */}
            <Link
              to="/admin"
              className="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 px-3 py-2 font-semibold text-slate-900 hover:opacity-90"
            >
              <Shield size={18} />
              Admin Panel
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Vertical sidebar */}
        <aside className="hidden md:block w-72 border-r border-white/10 bg-slate-950">
          <div className="p-4">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/15 to-amber-500/15 p-4 ring-1 ring-white/10">
              <p className="text-xs text-white/70">Quick Access</p>
              <p className="mt-1 text-lg font-bold">Find your next role</p>
              <p className="mt-1 text-sm text-white/70">
                Separate sections for internships and jobs.
              </p>
            </div>

            <nav className="mt-4 space-y-4">
              {/* Internships section */}
              <div className="mb-4">
  <NavLink
    to="/"
    className={({ isActive }) =>
      `${navItem} ${isActive ? navActive : ""}`
    }
  >
    <Home size={18} />
    Home
  </NavLink>
</div>

              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-cyan-300/90">
                  INTERNSHIPS
                </p>
                <div className="space-y-1">
                  <NavLink to="/interns" className={({ isActive }) => `${navItem} ${isActive ? navActive : ""}`}>
                    <GraduationCap size={18} />
                    Browse Internships
                  </NavLink>
                  <NavLink to="/interns/saved" className={({ isActive }) => `${navItem} ${isActive ? navActive : ""}`}>
                    <LayoutDashboard size={18} />
                    Saved Internships
                  </NavLink>
                </div>
              </div>

              {/* Jobs section */}
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-amber-300/90">
                  JOB VACANCIES
                </p>
                <div className="space-y-1">
                  <NavLink to="/jobs" className={({ isActive }) => `${navItem} ${isActive ? navActive : ""}`}>
                    <Briefcase size={18} />
                    Browse Jobs
                  </NavLink>
                  <NavLink to="/jobs/saved" className={({ isActive }) => `${navItem} ${isActive ? navActive : ""}`}>
                    <LayoutDashboard size={18} />
                    Saved Jobs
                  </NavLink>
                </div>
              </div>

              {/* Employer/admin utilities */}
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-fuchsia-300/90">
                  MANAGEMENT
                </p>
                <div className="space-y-1">
                  <NavLink to="/employer" className={({ isActive }) => `${navItem} ${isActive ? navActive : ""}`}>
                    <LayoutDashboard size={18} />
                    Employer Dashboard
                  </NavLink>
                  <NavLink to="/admin" className={({ isActive }) => `${navItem} ${isActive ? navActive : ""}`}>
                    <Shield size={18} />
                    Admin Panel
                  </NavLink>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          {/* Mobile top quick tabs (since sidebar is hidden on mobile) */}
          <div className="md:hidden mb-4 grid grid-cols-3 gap-2">
  <Link
    to="/"
    className="rounded-xl bg-white/10 p-3 text-center font-semibold ring-1 ring-white/10"
  >
    Home
  </Link>

  <Link
    to="/interns"
    className="rounded-xl bg-cyan-500/20 p-3 text-center font-semibold ring-1 ring-cyan-400/30"
  >
    Interns
  </Link>

  <Link
    to="/jobs"
    className="rounded-xl bg-amber-500/20 p-3 text-center font-semibold ring-1 ring-amber-400/30"
  >
    Jobs
  </Link>
</div>


          <Outlet />
        </main>
      </div>
    </div>
  );
}
