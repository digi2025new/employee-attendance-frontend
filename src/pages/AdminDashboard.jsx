import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDashboardStats,
  getEmployees,
  toggleEmployee,
} from "../services/admin";

import AdminStatCard from "../components/AdminStatCard";
import AddEmployeeForm from "../components/AddEmployeeForm";
import EditEmployeeModal from "../components/EditEmployeeModal";
import AttendancePieChart from "../components/AttendancePieChart";
import DepartmentBarChart from "../components/DepartmentBarChart";


import {
  getAttendanceChart,
  getDepartmentChart,
} from "../services/chart";


export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [attendanceChart, setAttendanceChart] = useState([]);
  const [departmentChart, setDepartmentChart] = useState([]);



  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statData = await getDashboardStats();
      const employeeData = await getEmployees();

      const attendanceData = await getAttendanceChart();
      const departmentData = await getDepartmentChart();

      setStats(statData);
      setEmployees(employeeData);

      setAttendanceChart(attendanceData);
      setDepartmentChart(departmentData);
    } catch (err) {
      console.log(err);
    }
  };


  const filteredEmployees = employees.filter((emp) => {
    const keyword = search.toLowerCase();

    return (
      emp.employee_id.toLowerCase().includes(keyword) ||
      emp.name.toLowerCase().includes(keyword) ||
      emp.email.toLowerCase().includes(keyword) ||
      emp.department.toLowerCase().includes(keyword) ||
      emp.designation.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="space-y-8 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/attendance"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Attendance Records
          </Link>

          <button
            onClick={loadDashboard}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>
      </div>



      {/* Add Employee */}

      <AddEmployeeForm onSuccess={loadDashboard} />

      {/* Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        <AdminStatCard
          title="Employees"
          value={stats.total_employees || 0}
          color="bg-blue-600"
        />

        <AdminStatCard
          title="Present Today"
          value={stats.present_today || 0}
          color="bg-green-600"
        />

        <AdminStatCard
          title="Half Day"
          value={stats.half_day || 0}
          color="bg-yellow-500"
        />

        <AdminStatCard
          title="Absent Today"
          value={stats.absent_today || 0}
          color="bg-red-600"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 my-10">
        <AttendancePieChart data={attendanceChart} />

        <DepartmentBarChart data={departmentChart} />
      </div>
      {/* Search */}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by ID, Name, Email, Department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white rounded-lg p-3"
        />
      </div>

      {/* Table */}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-hidden transition-colors">
        <div className="bg-slate-800 dark:bg-slate-900 text-white px-6 py-4 flex justify-between">
          <h2 className="text-xl font-semibold">Employee List</h2>

          <span>Total Employees : {filteredEmployees.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Designation</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-8">
                    No Employees Found
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr
  key={emp.id}
  className="text-center hover:bg-slate-50 dark:hover:bg-slate-700 transition"
>
                    <td className="border dark:border-slate-700 p-3">{emp.employee_id}</td>

                    <td className="border dark:border-slate-700 p-3">{emp.name}</td>

                    <td className="border dark:border-slate-700 p-3">{emp.email}</td>

                    <td className="border dark:border-slate-700 p-3">{emp.department}</td>

                    <td className="border dark:border-slate-700 p-3">{emp.designation}</td>

                    <td className="border dark:border-slate-700 p-3">
                      {emp.is_active ? (
                        <span className="text-green-600 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="border dark:border-slate-700 p-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setShowModal(true);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={async () => {
                            await toggleEmployee(emp.employee_id);
                            loadDashboard();
                          }}
                          className={`px-4 py-2 rounded text-white transition ${
                            emp.is_active
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {emp.is_active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowModal(false)}
          onSuccess={loadDashboard}
        />
      )}
    </div>
  );
}
