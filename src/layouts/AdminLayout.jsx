import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">

        <AdminNavbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 md:p-8 overflow-auto text-gray-900 dark:text-white transition-colors duration-300">
          <Outlet />
        </main>

      </div>

    </div>
  );
}