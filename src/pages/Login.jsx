import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check current route
  const isAdminLogin = location.pathname === "/admin-login";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", form.email);
      formData.append("password", form.password);

      const res = await api.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("========== LOGIN SUCCESS ==========");
      console.log(res.data);

      // Wrong portal check
      if (isAdminLogin && !res.data.is_admin) {
        toast.error("This account is not an Admin account.");
        return;
      }

      if (!isAdminLogin && res.data.is_admin) {
        toast.error("Please login from the Admin Login page.");
        return;
      }

      // Save token
      localStorage.setItem("token", res.data.access_token);

      localStorage.setItem("employee", JSON.stringify(res.data));

      localStorage.setItem("employee_id", res.data.employee_id);

      localStorage.setItem("name", res.data.name);

      localStorage.setItem("is_admin", String(res.data.is_admin));

      console.log("Token Saved");
      console.log("Admin:", res.data.is_admin);

      // First login
      toast.success("Login Successful");
      if (res.data.must_change_password) {
        navigate("/change-password");
        return;
      }

      // Redirect
      if (res.data.is_admin) {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.detail || err.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
  Integrated Personal Service
</h1>

        <p className="text-center text-gray-500 mb-8">
  {isAdminLogin
    ? "Administrator Login"
    : "Employee Attendance Management System"}
</p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label>Email</label>

            <div className="flex items-center border rounded mt-1">
              <FaUser className="mx-3 text-gray-400" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                placeholder="Enter Email"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label>Password</label>

            <div className="flex items-center border rounded mt-1">
              <FaLock className="mx-3 text-gray-400" />

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                placeholder="Enter Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
