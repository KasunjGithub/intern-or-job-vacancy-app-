import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";

export default function JobDetails() {
  const { id } = useParams();
  const { token, user } = useAuth();

  const { data: job, isLoading, error } = useQuery({
    queryKey: ["job", id],
    queryFn: () => apiFetch(`/api/jobs/${id}`)
  });

  const applyMutation = useMutation({
    mutationFn: (coverLetter) =>
      apiFetch(`/api/jobs/${id}/apply`, { token, method: "POST", body: { coverLetter } })
  });

  if (isLoading) return <p className="text-sm">Loading...</p>;
  if (error) return <p className="text-sm text-red-600">{String(error.message || error)}</p>;
  if (!job) return null;

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <Link to="/" className="text-sm text-blue-700 hover:underline">← Back</Link>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-sm text-slate-600">{job.companyName} • {job.location}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 w-fit">{job.type}</span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="font-semibold">Description</h2>
          <p className="text-sm text-slate-700 mt-1 whitespace-pre-line">
            {job.description || "No description yet."}
          </p>
        </div>
        <div className="border rounded-xl p-3">
          <h3 className="font-semibold">Apply</h3>
          {!user && (
            <p className="text-sm text-slate-600 mt-2">
              Please <Link className="text-blue-700 hover:underline" to="/login">login</Link> as a candidate to apply.
            </p>
          )}
          {user && user.role !== "candidate" && (
            <p className="text-sm text-slate-600 mt-2">Only Candidate accounts can apply.</p>
          )}

          {user && user.role === "candidate" && (
            <>
              <textarea
                className="mt-2 w-full border rounded-xl p-2 text-sm"
                rows="5"
                placeholder="Short cover letter (optional)"
                onChange={(e) => applyMutation.reset() || (window.__cover = e.target.value)}
              />
              <button
                onClick={() => applyMutation.mutate(window.__cover || "")}
                className="mt-2 w-full rounded-xl bg-slate-900 text-white py-2 text-sm hover:opacity-90 disabled:opacity-50"
                disabled={applyMutation.isPending}
              >
                {applyMutation.isPending ? "Applying..." : "Apply Now"}
              </button>
              {applyMutation.error && (
                <p className="text-sm text-red-600 mt-2">{applyMutation.error.message}</p>
              )}
              {applyMutation.data && (
                <p className="text-sm text-green-700 mt-2">Applied successfully!</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
