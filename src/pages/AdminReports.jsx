import { useState } from "react";
import { downloadExcel, downloadPDF } from "../services/admin";

export default function AdminReports() {
  const [reportMonth, setReportMonth] = useState(
    new Date().getMonth() + 1
  );

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Reports
      </h1>

      <div className="bg-white dark:bg-slate-800 shadow rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Monthly Attendance Reports
        </h2>

        <div className="flex flex-wrap gap-4">

          <select
            value={reportMonth}
            onChange={(e) => setReportMonth(e.target.value)}
            className="border rounded-lg px-4 py-3 dark:bg-slate-700 dark:border-slate-600"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Month {i + 1}
              </option>
            ))}
          </select>

          <button
            onClick={() => downloadExcel(reportMonth)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-lg"
          >
            Download Excel
          </button>

          <button
            onClick={() => downloadPDF(reportMonth)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-lg"
          >
            Download PDF
          </button>

        </div>

      </div>

    </div>
  );
}