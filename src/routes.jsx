import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAttendance from "./pages/AdminAttendance";

import EmployeeLayout from "./layouts/EmployeeLayout";

import AdminRoute from "./routes/AdminRoute";
import EmployeeRoute from "./routes/EmployeeRoute";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeProfile from "./pages/EmployeeProfile";
import ForgotPassword from "./pages/ForgotPassword";

import AdminReports from "./pages/AdminReports";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Employee Login */}
      <Route path="/" element={<Login />} />

      {/* Admin Login */}
      <Route path="/admin-login" element={<Login adminOnly={true} />} />

      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Employee Protected Routes */}
      <Route element={<EmployeeRoute />}>
        <Route element={<EmployeeLayout />}>
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
        </Route>
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Route>
      </Route>
    </Routes>
  );
}
