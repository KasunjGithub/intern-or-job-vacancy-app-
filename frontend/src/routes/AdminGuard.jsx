import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../state/adminAuth.jsx";

export default function AdminGuard({ children }) {
  const { isAdminAuthed } = useAdminAuth();
  if (!isAdminAuthed) return <Navigate to="/admin/login" replace />;
  return children;
}
