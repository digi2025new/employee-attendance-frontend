import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export default function ChangePassword() {
  const navigate = useNavigate();

  const employee = JSON.parse(localStorage.getItem("employee"));

  const [form, setForm] = useState({
    email: employee?.email || "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/change-password", {
        email: form.email,
        old_password: form.old_password,
        new_password: form.new_password,
      });

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.detail || "Password change failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex justify-center items-center transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-2 dark:text-white">
          Change Password
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
          Please change your default password.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            name="old_password"
            placeholder="Current Password"
            value={form.old_password}
            onChange={handleChange}
            className="border dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded w-full mb-4"
            required
          />

          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={form.new_password}
            onChange={handleChange}
            className="border dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded w-full mb-4"
            required
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm New Password"
            value={form.confirm_password}
            onChange={handleChange}
            className="border dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white p-3 rounded w-full mb-6"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:bg-blue-400"
          >
            {loading ? "Changing Password..." : "Change Password"}
          </button>

        </form>
      </div>
    </div>
  );
}