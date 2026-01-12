import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg text-sm ${isActive ? "bg-slate-900 text-white" : "hover:bg-slate-200"}`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">Intern & Job App</Link>

          <nav className="flex items-center gap-2">
            <NavItem to="/">Jobs</NavItem>
            {user?.role === "employer" && <NavItem to="/employer">Employer</NavItem>}
            {user?.role === "candidate" && <NavItem to="/candidate">Candidate</NavItem>}

            {!user ? (
              <>
                <NavItem to="/login">Login</NavItem>
                <NavItem to="/register">Register</NavItem>
              </>
            ) : (
              <button
                onClick={logout}
                className="px-3 py-2 rounded-lg text-sm bg-red-600 text-white hover:opacity-90"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

      <footer className="mx-auto max-w-6xl px-4 pb-10 text-xs text-slate-500">
        Mobile responsive: grids stack on small screens, cards resize naturally.
      </footer>
    </div>
  );
}
