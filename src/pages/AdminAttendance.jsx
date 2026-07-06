import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAttendance } from "../services/admin";

export default function AdminAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");

  const darkMode =
    localStorage.getItem("theme") === "dark";

  useEffect(() => {
    loadAttendance();
  }, [month, attendanceDate]);

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const data = await getAttendance(month, attendanceDate);

      setAttendance(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAttendance = attendance.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.employee_id.toLowerCase().includes(keyword) ||
      item.name.toLowerCase().includes(keyword) ||
      item.email.toLowerCase().includes(keyword)
    );
  });

  return (
    <div
      className={`space-y-8 min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Attendance Management
          </h1>

          <p
            className={
              darkMode ? "text-gray-300" : "text-gray-500"
            }
          >
            View and manage employee attendance records.
          </p>
        </div>

        <Link
          to="/admin"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Filters */}

      <div
        className={`rounded-xl shadow-md p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search Employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`border rounded-lg p-3 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white"
            }`}
          />

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className={`border rounded-lg p-3 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white"
            }`}
          >
            <option value="">All Months</option>

            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Month {i + 1}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className={`border rounded-lg p-3 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white"
            }`}
          />

          <button
            onClick={loadAttendance}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}

      <div
        className={`rounded-xl shadow overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Attendance Records
          </h2>

          <span>Total : {filteredAttendance.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100"
              }
            >
              <tr>
                <th className="border p-3">Employee ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Punch In</th>
                <th className="border p-3">Punch Out</th>
                <th className="border p-3">Hours</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-8"
                  >
                    Loading attendance...
                  </td>
                </tr>
              ) : filteredAttendance.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-8"
                  >
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((item) => (
                  <tr
                    key={item.id}
                    className={`text-center ${
                      darkMode
                        ? "hover:bg-gray-700"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="border p-3">
                      {item.employee_id}
                    </td>

                    <td className="border p-3">
                      {item.name}
                    </td>

                    <td className="border p-3">
                      {item.email}
                    </td>

                    <td className="border p-3">
                      {item.date}
                    </td>

                    <td className="border p-3">
                      {item.punch_in
                        ? new Date(
                            item.punch_in
                          ).toLocaleTimeString()
                        : "-"}
                    </td>

                    <td className="border p-3">
                      {item.punch_out
                        ? new Date(
                            item.punch_out
                          ).toLocaleTimeString()
                        : "-"}
                    </td>

                    <td className="border p-3">
                      {item.working_hours || "-"}
                    </td>

                    <td
                      className={`border p-3 font-semibold ${
                        item.attendance_status === "Present"
                          ? "text-green-500"
                          : item.attendance_status === "Half Day"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
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