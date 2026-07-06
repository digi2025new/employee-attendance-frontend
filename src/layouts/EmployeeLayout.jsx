import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function EmployeeLayout() {

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white transition-colors duration-300">

      <Header />

      <main className="p-6">

        <Outlet />

      </main>

    </div>

  );

}