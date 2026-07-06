import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaFileExcel,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Employees",
      path: "/admin",
      icon: <FaUsers />,
    },
    {
      name: "Attendance",
      path: "/admin/attendance",
      icon: <FaClipboardList />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <FaFileExcel />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          z-50
          h-screen
          w-64
          bg-slate-900
          dark:bg-slate-950
          text-white
          flex
          flex-col
          shadow-xl
          transform
          transition-all
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}

        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">
              Integrated Personal Service
            </h1>

            <p className="text-sm text-gray-400">
              Admin Panel
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}

        <nav className="flex-1 p-4">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-slate-800 hover:translate-x-1"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-semibold"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}