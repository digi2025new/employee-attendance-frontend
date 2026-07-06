import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { getAttendanceHistory } from "../services/attendance";
import DashboardCard from "../components/DashboardCard";

export default function EmployeeDashboard() {
  const employee = JSON.parse(localStorage.getItem("employee"));
  const employeeId = employee?.employee_id;

  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getAttendanceHistory();
      setHistory(data);
    } catch (err) {
      console.log(err);
    }
  };

  const today = history.length > 0 ? history[history.length - 1] : {};

  const punchIn = async () => {
    try {
      const res = await api.post(
        `/attendance/punch-in?employee_id=${employeeId}`,
      );

      setIsError(false);
      toast.success(res.data.message);

      loadHistory();
    } catch (err) {
      setIsError(true);

      setMessage("❌ " + (err.response?.data?.detail || "Punch In Failed"));
    }
  };

  const punchOut = async () => {
    try {
      const res = await api.post(
        `/attendance/punch-out?employee_id=${employeeId}`,
      );

      setIsError(false);

      toast.success(
        `Punch Out Successful
Status: ${res.data.status}
Working Hours: ${res.data.working_hours}`,
      );

      loadHistory();
    } catch (err) {
      setIsError(true);

      toast.error(err.response?.data?.detail || "Punch In Failed");

      toast.error(err.response?.data?.detail || "Punch Out Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>

          <p className="text-gray-500 dark:text-gray-400">Employee ID : {employeeId}</p>
        </div>

        {message && (
          <div
  className={`mb-8 rounded-lg p-4 whitespace-pre-line font-medium transition-colors ${
              isError
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <DashboardCard
            title="Punch In"
            value={
              today?.punch_in
                ? new Date(today.punch_in).toLocaleTimeString()
                : "--"
            }
            color="green"
          />

          <DashboardCard
            title="Punch Out"
            value={
              today?.punch_out
                ? new Date(today.punch_out).toLocaleTimeString()
                : "--"
            }
            color="red"
          />

          <DashboardCard
            title="Working Hours"
            value={today?.working_hours || "--"}
            color="blue"
          />

          <DashboardCard
            title="Attendance"
            value={today?.attendance_status || "--"}
            color="yellow"
          />
        </div>

        {/* Buttons */}

        <div className="flex gap-5 mb-10">
          <button
            onClick={punchIn}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Punch In
          </button>

          <button
            onClick={punchOut}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Punch Out
          </button>
        </div>

        {/* Attendance History */}

        <h2 className="text-2xl font-bold mb-5">Attendance History</h2>

        <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow transition-colors">
          <table className="w-full text-gray-900 dark:text-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Punch In</th>
                <th className="p-4">Punch Out</th>
                <th className="p-4">Hours</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td className="text-center p-6 text-gray-600 dark:text-gray-300" colSpan="5">
                    No Attendance Found
                  </td>
                </tr>
              ) : (
                history.map((item) => (
                  <tr
                    key={item.id}
                    className="text-center border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <td className="p-4">{item.date}</td>

                    <td className="p-4">
                      {item.punch_in
                        ? new Date(item.punch_in).toLocaleTimeString()
                        : "-"}
                    </td>

                    <td className="p-4">
                      {item.punch_out
                        ? new Date(item.punch_out).toLocaleTimeString()
                        : "-"}
                    </td>

                    <td className="p-4">{item.working_hours || "-"}</td>

                    <td className="p-4 font-semibold">
                      {item.attendance_status || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
