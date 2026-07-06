import { useEffect, useState } from "react";
import {
  getProfile,
  uploadProfilePicture,
} from "../services/employee";

export default function EmployeeProfile() {
  const employee = JSON.parse(localStorage.getItem("employee"));

  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setProfile(data);

      if (data.profile_picture) {
        setPreview(
          `http://127.0.0.1:8000${data.profile_picture}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    try {
      const res = await uploadProfilePicture(
        employee.employee_id,
        image
      );

      setPreview(
        `http://127.0.0.1:8000${res.profile_picture}`
      );

      setProfile({
        ...profile,
        profile_picture: res.profile_picture,
      });

      const updatedEmployee = {
        ...employee,
        profile_picture: res.profile_picture,
      };

      localStorage.setItem(
        "employee",
        JSON.stringify(updatedEmployee)
      );

      alert("Profile picture updated successfully.");
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Upload failed"
      );
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-8">
        Employee Profile
      </h1>

      {/* Profile Picture */}

      <div className="flex flex-col items-center mb-10">
        <img
          src={
            preview ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(profile.name)
          }
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-5"
        />

        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Upload Picture
        </button>
      </div>

      {/* Profile Details */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold text-gray-600">
            Employee ID
          </label>

          <p className="border rounded p-3 mt-1">
            {profile.employee_id}
          </p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">
            Name
          </label>

          <p className="border rounded p-3 mt-1">
            {profile.name}
          </p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">
            Email
          </label>

          <p className="border rounded p-3 mt-1">
            {profile.email}
          </p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">
            Department
          </label>

          <p className="border rounded p-3 mt-1">
            {profile.department}
          </p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">
            Designation
          </label>

          <p className="border rounded p-3 mt-1">
            {profile.designation}
          </p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">
            Status
          </label>

          <p className="border rounded p-3 mt-1">
            {profile.is_active ? "Active" : "Inactive"}
          </p>
        </div>

      </div>
    </div>
  );
}