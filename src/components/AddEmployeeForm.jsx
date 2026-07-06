import { useState } from "react";
import { toast } from "react-toastify";
import { createEmployee } from "../services/admin";

export default function AddEmployeeForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createEmployee(form);

      toast.success(
        `Employee Created!
ID: ${data.employee_id}
Password: ${data.default_password}`,
      );

      setForm({
        name: "",
        email: "",
        department: "",
        designation: "",
      });

      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to create employee");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Employee Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <button className="bg-blue-600 text-white rounded p-3 hover:bg-blue-700 md:col-span-2">
          Add Employee
        </button>
      </form>
    </div>
  );
}
