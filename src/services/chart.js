import api from "./api";

export const getAttendanceChart = async () => {
  const res = await api.get("/admin/charts/attendance");
  return res.data;
};

export const getDepartmentChart = async () => {
  const res = await api.get("/admin/charts/departments");
  return res.data;
};