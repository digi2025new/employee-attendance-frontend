import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DepartmentBarChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5">
        Department Wise Employees
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="department" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="employees"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}