import { useAuth } from "../state/auth.jsx";

export default function CandidateDash() {
  const { user } = useAuth();
  return (
    <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
      <h1 className="text-2xl font-extrabold text-cyan-300">Candidate Dashboard</h1>
      <p className="text-sm text-white/70 mt-1">Hello {user?.name}. Apply from the Jobs page.</p>
      <div className="mt-6 rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
        <p className="text-sm text-white/70">
          Next upgrade: show my applications list.
        </p>
      </div>
    </div>
  );
}
