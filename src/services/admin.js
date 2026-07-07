import api from "./api";

export const getEmployees = async () => {
  const res = await api.get("/admin/employees");
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

export const createEmployee = async (employee) => {
  const res = await api.post("/employees/", employee);
  return res.data;
};

export const updateEmployee = async (
  employeeId,
  employee
) => {

  const res = await api.put(
    `/admin/employee/${employeeId}`,
    employee
  );

  return res.data;

};

export const getAttendance = async (
  month = "",
  attendanceDate = ""
) => {

  const res = await api.get(
    "/admin/attendance-details",
    {
      params: {
        month,
        date: attendanceDate,
      },
    }
  );

  return res.data;

};

const API_URL = api.defaults.baseURL;

export const downloadExcel = (month) => {
  window.open(`${API_URL}/reports/excel/${month}`, "_blank");
};

export const downloadPDF = (month) => {
  window.open(`${API_URL}/reports/pdf/${month}`, "_blank");
};

export const toggleEmployee = async (employeeId) => {
  const res = await api.put(
    `/admin/employee/${employeeId}/toggle`
  );

  return res.data;
};

export const deleteEmployee = async (employeeId) => {
  const res = await api.delete(`/admin/employee/${employeeId}`);
  return res.data;
};