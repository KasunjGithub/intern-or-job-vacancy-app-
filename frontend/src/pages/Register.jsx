import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api.js";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "candidate" });
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await apiFetch("/api/auth/register", { method: "POST", body: form });
      nav("/login");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
      <h1 className="text-2xl font-extrabold text-cyan-300">Register</h1>
      <p className="text-sm text-white/70 mt-1">Create your account to get started.</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <input 
          className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50" 
          placeholder="Full name"
          value={form.name} 
          onChange={(e)=>setForm({...form, name:e.target.value})} 
        />
        <input 
          className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50" 
          placeholder="Email"
          value={form.email} 
          onChange={(e)=>setForm({...form, email:e.target.value})} 
        />
        <input 
          className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 focus:ring-cyan-400/50" 
          placeholder="Password" 
          type="password"
          value={form.password} 
          onChange={(e)=>setForm({...form, password:e.target.value})} 
        />

        <select 
          className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white focus:ring-cyan-400/50"
          value={form.role} 
          onChange={(e)=>setForm({...form, role:e.target.value})}>
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>

        {err && <p className="text-sm text-red-400">{err}</p>}
        <button className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-black hover:bg-cyan-400 transition">
          Create account
        </button>
      </form>

      <p className="text-sm text-white/70 mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-cyan-300 hover:underline font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}
