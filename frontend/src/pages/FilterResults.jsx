import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Filter as FilterIcon } from "lucide-react";

const STORE_KEY = "admin_ads_store_v1";

function loadData() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) return { internships: [], jobs: [] };
  return JSON.parse(raw);
}

export default function FilterResults() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState({ internships: [], jobs: [] });

  const filters = {
    mode: searchParams.get("mode")?.split(",") || [],
    category: searchParams.get("category")?.split(",") || [],
    posted: searchParams.get("posted") || ""
  };

  useEffect(() => {
    const data = loadData();
    
    const filterItems = (items) => {
      return items.filter(item => {
        // Filter by work mode
        if (filters.mode.length && !filters.mode.includes(item.mode)) {
          return false;
        }
        
        // Filter by category
        if (filters.category.length && !filters.category.includes(item.type)) {
          return false;
        }
        
        return true;
      });
    };

    setResults({
      internships: filterItems(data.internships),
      jobs: filterItems(data.jobs)
    });
  }, [searchParams]);

  const totalResults = results.internships.length + results.jobs.length;
  const hasFilters = filters.mode.length || filters.category.length || filters.posted;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/20 to-amber-500/20 p-6 ring-1 ring-white/10">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/20 p-3 ring-1 ring-cyan-400/25">
            <FilterIcon className="text-cyan-300" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-cyan-300">
              Filter Results
            </h1>
            <p className="mt-1 text-sm text-white/70">
              {hasFilters ? `Found ${totalResults} results matching your filters` : "No filters applied"}
            </p>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
          <h3 className="text-sm font-semibold text-white mb-3">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {filters.mode.map(mode => (
              <span key={mode} className="px-3 py-1 text-xs rounded-lg bg-cyan-500/20 text-cyan-300">
                Mode: {mode}
              </span>
            ))}
            {filters.category.map(cat => (
              <span key={cat} className="px-3 py-1 text-xs rounded-lg bg-amber-500/20 text-amber-300">
                Category: {cat}
              </span>
            ))}
            {filters.posted && (
              <span className="px-3 py-1 text-xs rounded-lg bg-fuchsia-500/20 text-fuchsia-300">
                Posted: {filters.posted}
              </span>
            )}
          </div>
        </div>
      )}

      {hasFilters && (
        <>
          {/* Internships Results */}
          {results.internships.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-cyan-300">
                Internships ({results.internships.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {results.internships.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-bold">{item.title}</p>
                        <p className="text-sm text-cyan-300">{item.company}</p>
                        <p className="mt-2 text-sm text-white/60">{item.location} • {item.mode}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs">
                            {item.type}
                          </span>
                          {item.stipend && (
                            <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-300 text-xs">
                              💰 {item.stipend}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link 
                        to={`/apply?id=${item.id}&type=internship&title=${encodeURIComponent(item.title)}&company=${encodeURIComponent(item.company)}`}
                        className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-400"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Results */}
          {results.jobs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-amber-300">
                Jobs ({results.jobs.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {results.jobs.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-bold">{item.title}</p>
                        <p className="text-sm text-amber-300">{item.company}</p>
                        <p className="mt-2 text-sm text-white/60">{item.location} • {item.mode}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs">
                            {item.type}
                          </span>
                          {item.salary && (
                            <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-300 text-xs">
                              💰 {item.salary}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link 
                        to={`/apply?id=${item.id}&type=job&title=${encodeURIComponent(item.title)}&company=${encodeURIComponent(item.company)}`}
                        className="rounded-xl bg-amber-500 px-4 py-2 font-semibold text-slate-900 hover:bg-amber-400"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {totalResults === 0 && (
            <div className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 text-center">
              <p className="text-white/70">No results found matching your filters</p>
              <p className="text-sm text-white/50 mt-1">Try adjusting your filter criteria</p>
            </div>
          )}
        </>
      )}

      {/* Back Link */}
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        <ArrowLeft size={16} />
        Back to Home
      </Link>
    </div>
  );
}