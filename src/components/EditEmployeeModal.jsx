import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateEmployee } from "../services/admin";

export default function EditEmployeeModal({ employee, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    designation: "",
  });

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        department: employee.department,
        designation: employee.designation,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const save = async () => {
    try {
      await updateEmployee(employee.employee_id, form);

      toast.success("Employee updated successfully");

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update employee");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px]">
        <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-3 rounded w-full mb-3"
        />

        <input
          value={employee.email}
          disabled
          className="border p-3 rounded w-full mb-3 bg-gray-100"
        />

        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
          className="border p-3 rounded w-full mb-3"
        />

        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="border p-3 rounded w-full mb-5"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={save}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
