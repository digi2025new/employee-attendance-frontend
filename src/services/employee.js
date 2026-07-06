import api from "./api";

export const getProfile = async () => {
  const res = await api.get("/employees/profile");
  return res.data;
};

export const createEmployee = async (employee) => {
  const res = await api.post("/employees/", employee);
  return res.data;
};

export const forgotPassword = async (email, newPassword) => {
  const res = await api.post("/auth/forgot-password", {
    email,
    new_password: newPassword,
  });

  return res.data;
};

export const uploadProfilePicture = async (employeeId, file) => {
  const formData = new FormData();

  formData.append("file", file);

  const res = await api.post(
    `/employees/employee/upload-profile-picture?employee_id=${employeeId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};