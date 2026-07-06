import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/employee" replace />;
  }

  return <Outlet />;
}