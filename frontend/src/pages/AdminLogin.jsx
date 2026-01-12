import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Home } from "lucide-react";
import { useAdminAuth } from "../state/adminAuth.jsx";

export default function AdminLogin() {
  const nav = useNavigate();
  const { login } = useAdminAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");
    const ok = login(username.trim(), password);
    if (!ok) {
      setErr("Invalid admin username or password.");
      return;
    }
    nav("/admin");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Professional Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/20 to-amber-500/20 ring-1 ring-white/10 mb-4">
            <Shield className="text-cyan-300" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-cyan-300">Admin Portal</h1>
          <p className="text-white/70 text-sm mt-2">Secure access to administrative dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmit} className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Username</label>
              <input
                className="w-full rounded-xl bg-black/40 p-4 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
              <input
                type="password"
                className="w-full rounded-xl bg-black/40 p-4 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>

            {err && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3">
                <p className="text-sm text-red-300">{err}</p>
              </div>
            )}

            <button 
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 py-4 font-bold text-slate-900 hover:from-cyan-400 hover:to-cyan-500 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Access Admin Panel
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-cyan-300 hover:underline mb-2"
            >
              <Home size={14} /> Back to Home
            </Link>
            <p className="text-xs text-white/50 text-center">
              Default credentials: <span className="text-cyan-300 font-medium">admin / admin123</span>
              <br />
              <span className="text-white/40">Change credentials after first login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
