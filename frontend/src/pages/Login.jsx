import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";

export default function Login() {
  const nav = useNavigate();
  const auth = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const data = await apiFetch("/api/auth/login", { method: "POST", body: form });
      auth.login(data);
      if (data.user.role === "employer") nav("/employer");
      else nav("/candidate");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
      <h1 className="text-2xl font-extrabold text-cyan-300">Login</h1>
      <p className="text-sm text-white/70 mt-1">Welcome back! Sign in to your account.</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {err && <p className="text-sm text-red-400">{err}</p>}
        <button className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-black hover:bg-cyan-400 transition">
          Login
        </button>
      </form>

      <p className="text-sm text-white/70 mt-4 text-center">
        No account?{" "}
        <Link to="/register" className="text-cyan-300 hover:underline font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
}
