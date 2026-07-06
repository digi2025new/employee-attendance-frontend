import {
  FaBell,
  FaUserCircle,
  FaBars,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

export default function AdminNavbar({
  setSidebarOpen,
}) {
  const adminName = localStorage.getItem("name") || "Admin";

  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-800 shadow px-4 md:px-8 py-4 flex justify-between items-center transition-colors duration-300">

      {/* Left */}

      <div className="flex items-center gap-4">

        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-2xl dark:text-white"
        >
          <FaBars />
        </button>

        <div>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Welcome, {adminName}
          </h2>

          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Integrated Personal Service
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Dark Mode */}

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-slate-700 hover:scale-110 transition"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400 text-xl" />
          ) : (
            <FaMoon className="text-gray-700 text-xl" />
          )}
        </button>

        {/* Notification */}

        <button className="relative">

          <FaBell className="text-2xl text-gray-600 dark:text-white hover:text-blue-600 transition" />

          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>

        </button>

        {/* Profile */}

        <div className="flex items-center gap-2">

          <FaUserCircle className="text-4xl text-blue-600" />

          <div className="hidden md:block">

            <p className="font-semibold dark:text-white">
              {adminName}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-300">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}