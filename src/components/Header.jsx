import { NavLink, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const employee = JSON.parse(localStorage.getItem("employee"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employee");
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md px-8 py-4 flex justify-between items-center transition-colors duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Integrated Personal Service
        </h1>

        <p className="text-gray-500 dark:text-gray-300">
          Welcome, {employee?.name}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <NavLink
          to="/employee"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-blue-600"
              : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employee/profile"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-blue-600"
              : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
          }
        >
          Profile
        </NavLink>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-yellow-400 transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}