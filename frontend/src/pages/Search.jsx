import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";

const STORE_KEY = "admin_ads_store_v1";

function loadData() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) return { internships: [], jobs: [] };
  return JSON.parse(raw);
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState({ internships: [], jobs: [] });

  useEffect(() => {
    if (!query.trim()) {
      setResults({ internships: [], jobs: [] });
      return;
    }

    const data = loadData();
    const searchTerm = query.toLowerCase();

    const filteredInternships = data.internships.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.company.toLowerCase().includes(searchTerm) ||
      item.location.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm)
    );

    const filteredJobs = data.jobs.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.company.toLowerCase().includes(searchTerm) ||
      item.location.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm)
    );

    setResults({ internships: filteredInternships, jobs: filteredJobs });
  }, [query]);

  const totalResults = results.internships.length + results.jobs.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/20 to-amber-500/20 p-6 ring-1 ring-white/10">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/20 p-3 ring-1 ring-cyan-400/25">
            <SearchIcon className="text-cyan-300" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-cyan-300">
              Search Results
            </h1>
            <p className="mt-1 text-sm text-white/70">
              {query ? `Found ${totalResults} results for "${query}"` : "Enter a search term to find opportunities"}
            </p>
          </div>
        </div>
      </div>

      {query && (
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
          {totalResults === 0 && query && (
            <div className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 text-center">
              <p className="text-white/70">No results found for "{query}"</p>
              <p className="text-sm text-white/50 mt-1">Try different keywords or check spelling</p>
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