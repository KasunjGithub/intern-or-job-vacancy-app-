import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";

export default function EmployerDash() {
  const qc = useQueryClient();
  const { token, user } = useAuth();

  const [job, setJob] = useState({
    title: "",
    companyName: "",
    location: "Remote",
    type: "internship",
    tags: "react,node,mongodb",
    description: ""
  });

  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: () => apiFetch("/api/jobs")
  });

  const createJob = useMutation({
    mutationFn: () =>
      apiFetch("/api/jobs", {
        token,
        method: "POST",
        body: {
          ...job,
          tags: job.tags.split(",").map((s) => s.trim()).filter(Boolean)
        }
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
      setJob({ ...job, title: "", description: "" });
    }
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
        <h1 className="text-2xl font-extrabold text-cyan-300">Employer Dashboard</h1>
        <p className="text-sm text-white/70 mt-1">Hello {user?.name}. Post a job below.</p>

        <div className="mt-6 space-y-4">
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
            placeholder="Tags (comma separated)"
            value={job.tags} 
            onChange={(e)=>setJob({...job, tags:e.target.value})}
          />
          <textarea 
            className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50" 
            rows="5" 
            placeholder="Description"
            value={job.description} 
            onChange={(e)=>setJob({...job, description:e.target.value})}
          />

          <button
            onClick={() => createJob.mutate()}
            className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-black hover:bg-cyan-400 transition disabled:opacity-50"
            disabled={createJob.isPending}
          >
            {createJob.isPending ? "Posting..." : "Post Job"}
          </button>
          {createJob.error && <p className="text-sm text-red-400">{createJob.error.message}</p>}
          {createJob.data && <p className="text-sm text-green-400">Job posted!</p>}
        </div>
      </section>

      <section className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
        <h2 className="text-xl font-bold text-white">All Jobs</h2>
        <p className="text-sm text-white/70 mt-1">Public feed - you can view jobs you posted here too.</p>
        <div className="mt-6 space-y-3">
          {jobsQuery.isLoading && <p className="text-sm text-white/70">Loading...</p>}
          {jobsQuery.error && <p className="text-sm text-red-400">{jobsQuery.error.message}</p>}
          {(jobsQuery.data || []).map((j) => (
            <div key={j._id} className="rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
              <p className="font-semibold text-white">{j.title}</p>
              <p className="text-sm text-white/70">{j.companyName} • {j.location}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
