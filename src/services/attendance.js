import api from "./api";

export const getAttendanceHistory = async () => {
  const res = await api.get("/attendance/history");
  return res.data;
};