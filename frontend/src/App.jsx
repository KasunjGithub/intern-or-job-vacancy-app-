import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import InternType from "./pages/InternType.jsx";
import JobType from "./pages/JobType.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import AdminGuard from "./routes/AdminGuard.jsx";
import FilterResults from "./pages/FilterResults.jsx";
import Apply from "./pages/Apply.jsx";
import Search from "./pages/Search.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Interns from "./pages/Interns.jsx";
import Jobs from "./pages/Jobs.jsx";
import Admin from "./pages/Admin.jsx";
import EmployerDash from "./pages/EmployerDash.jsx";
import CandidateDash from "./pages/CandidateDash.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes (no layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminPanel />
            </AdminGuard>
          }
        />

        {/* Auth routes (no layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main app routes (with layout) */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/filter-results" element={<FilterResults />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/interns" element={<Interns />} />
          <Route path="/interns/:type" element={<InternType />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:type" element={<JobType />} />
          <Route path="/employer" element={<EmployerDash />} />
          <Route path="/candidate" element={<CandidateDash />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
