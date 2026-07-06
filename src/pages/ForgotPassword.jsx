import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/employee";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const data = await forgotPassword(form.email, form.password);

      toast.success(data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
            Reset Password
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
