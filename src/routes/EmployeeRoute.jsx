import { Navigate, Outlet } from "react-router-dom";

export default function EmployeeRoute() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}