import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

export default function Dashboard({ setCurrentPage, setIsLoginOpen }) {
    const [student, setStudent] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        password: '',
        mobileNumber: '',
        gender: '',
        courseIds: '',
    });

    useEffect(() => {
        const savedStudent = JSON.parse(localStorage.getItem("student"));
        if (!savedStudent) {
            setCurrentPage('home');
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
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedStudent = {
            ...editForm,

        };

        fetch(`http://localhost:8080/api/students/${student.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedStudent),
        })
            .then(res => {
                if (!res.ok) throw new Error('Update failed');
                return res.json();
            })
            .then((data) => {
                localStorage.setItem("student", JSON.stringify(data));
                setStudent(data);
                setIsEditOpen(false);
                alert("Profile updated successfully.");
            })
            .catch(err => {
                console.error("Update error:", err);
                alert("Failed to update student.");
            });
    };

    // Delete (DELETE)
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            fetch(`http://localhost:8080/api/students/${id}`, {
                method: 'DELETE',
            })
                .then(res => {
                    if (!res.ok) throw new Error('Delete failed');
                    localStorage.removeItem("student");
                    setCurrentPage('home');
                    setIsLoginOpen(true);
                })
                .catch(err => {
                    console.error("Delete error:", err);
                    alert("Failed to delete student.");
                });
        }
    };
    if (!student) return null;
    return (
        <>
            <Navbar student={student} />
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">Welcome, {student.name}</h2>
                            <div className="mt-4 space-y-2 text-gray-700">
                                <p className="flex items-center"><span className="w-32 font-medium">Email:</span><span>{student.email}</span></p>
                                <p className="flex items-center"><span className="w-32 font-medium">Password:</span><span className="font-mono">{student.password}</span></p>
                                <p className="flex items-center"><span className="w-32 font-medium">Mobile:</span><span>{student.mobileNumber}</span></p>
                                <p className="flex items-center"><span className="w-32 font-medium">Gender:</span><span>{student.gender}</span></p>
                                <p className="flex items-center"> <span
                                    className="text-black-500 cursor-pointer hover:underline"
                                    onClick={() => setCurrentPage('courses')}
                                >CourseId
                                    {student.courseIds}
                                </span></p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    setCurrentPage('home');
                                    setIsLoginOpen(false);
                                }}
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                            >
                                Back to Home
                            </button>

                            <button
                                onClick={() => setIsEditOpen(true)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                            >
                                Edit Profile
                            </button>

                            <button
                                onClick={() => handleDelete(student.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
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
                                    {['male', 'female', 'other'].map((g) => (
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
                                    placeholder="Courses (e.g., 1,2,3)"
                                    className="w-full px-4 py-2 border rounded-md"
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
