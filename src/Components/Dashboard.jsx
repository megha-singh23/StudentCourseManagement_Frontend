import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  User,
  TrendingUp,
  Award,
} from "lucide-react";

export default function Dashboard({ setCurrentPage, setIsLoginOpen }) {
  const [student, setStudent] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: "",
    courseIds: "",
  });
  

  useEffect(() => {
    const savedStudent = JSON.parse(localStorage.getItem("student"));
    if (!savedStudent) {
      setCurrentPage("home");
      setIsLoginOpen(true);
      return;
    }
    setStudent(savedStudent);
    setEditForm({
      name: savedStudent.name,
      email: savedStudent.email,
      password: savedStudent.password,
      mobileNumber: savedStudent.mobileNumber,
      gender: savedStudent.gender,
      courseIds: savedStudent.courseIds,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedStudent = {
      ...editForm,
    };
    console.log("Updating with:", student);
    fetch(`http://localhost:8080/api/students/${student.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("student", JSON.stringify(data));
        setStudent(data);
        setIsEditOpen(false);
        alert("Profile updated successfully.");
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update student.");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch(`http://localhost:8080/api/students/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Delete failed");
          localStorage.removeItem("student");
          setCurrentPage("home");
          setIsLoginOpen(true);
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Failed to delete student.");
        });
    }
  };

  if (!student) return null;

  return (
    <>
      <Navbar student={student} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome, {student.name}
              </h2>
              <p className="text-gray-500 mt-2">
                Track your progress and manage your profile easily.
              </p>
            </div>
            <img
              src="https://img.icons8.com/clouds/200/student-male.png"
              alt="student"
              className="w-28 h-28"
            />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-6 rounded-2xl shadow-md flex items-center gap-4">
              <User className="text-blue-700 w-8 h-8" />
              <div>
                <p className="text-gray-600">Your Courses</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {student.courses?.length || 0}
                </h3>
              </div>
            </div>
            <div className="bg-green-100 p-6 rounded-2xl shadow-md flex items-center gap-4">
              <TrendingUp className="text-green-700 w-8 h-8" />
              <div>
                <p className="text-gray-600">Performance</p>
                <h3 className="text-2xl font-bold text-gray-800">85%</h3>
              </div>
            </div>
            <div className="bg-yellow-100 p-6 rounded-2xl shadow-md flex items-center gap-4">
              <Award className="text-yellow-700 w-8 h-8" />
              <div>
                <p className="text-gray-600">Achievements</p>
                <h3 className="text-2xl font-bold text-gray-800">5</h3>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Profile Information
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Email:</span> {student.email}
              </p>
              <p>
                <span className="font-medium">Password:</span>{" "}
                <span className="font-mono">{student.password}</span>
              </p>
              <p>
                <span className="font-medium">Mobile:</span>{" "}
                {student.mobileNumber}
              </p>
              <p>
                <span className="font-medium">Gender:</span> {student.gender}
              </p>
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">Courses:</span>
                {(student.courses ?? []).length > 0 ? (
  student.courses.map((course) => (
    <span 
      key={course.courseid} 
      className="px-2 py-1 bg-blue-100 rounded-md text-sm"
    >
      {course.coursename} ({course.duration} months)
    </span>
  ))
) : (
  <span>No courses</span>
)}

              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setCurrentPage("home");
                  setIsLoginOpen(false);
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Back to Home
              </button>

              <button
                onClick={() => setIsEditOpen(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Edit Profile
              </button>

              <button
                onClick={() => handleDelete(student.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">Edit Profile</h2>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  type="password"
                  name="password"
                  value={editForm.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  type="tel"
                  name="mobileNumber"
                  value={editForm.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Mobile Number"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
                <div className="flex gap-4">
                  {["male", "female", "other"].map((g) => (
                    <label key={g} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={editForm.gender === g}
                        onChange={handleInputChange}
                      />
                      <span className="ml-2 capitalize">{g}</span>
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  name="courseIds"
                  value={editForm.courseIds}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md bg-blue-100"
                  disabled
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
