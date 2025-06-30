import React, { useEffect, useState } from 'react';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    gender: '',
    courseIds: [],
  });


  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:8080/api/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Fetch Error:", err));
  };

  // DELETE
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/students/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          setStudents(prev => prev.filter(s => s.id !== id));
        } else {
          alert("Failed to delete student");
        }
      })
      .catch(err => console.error("Delete Error:", err));
  };

  // UPDATE: Open edit form
  const handleEditClick = (student) => {
    setEditingStudent(student.id);
    setEditForm({
      name: student.name,
      email: student.email,
      mobileNumber: student.mobileNumber,
      gender: student.gender,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/students/${editingStudent}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editForm),
    })
      .then(res => res.json())
      .then(() => {
        fetchStudents();
        setEditingStudent(null);
      })
      .catch(err => console.error("Update Error:", err));
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>
      <ul className="space-y-4">
        {students.map(student => (
          <li key={student.id} className="p-4 border rounded shadow-sm flex justify-between items-center">
            <div>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Gender:</strong> {student.gender}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditClick(student)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingStudent && (
        <form onSubmit={handleUpdate} className="mt-8 p-4 border rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Edit Student</h3>
          <input
            type="text"
            name="name"
            value={editForm.name}
            onChange={handleEditChange}
            placeholder="Name"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={editForm.email}
            onChange={handleEditChange}
            placeholder="Email"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="mobileNumber"
            value={editForm.mobileNumber}
            onChange={handleEditChange}
            placeholder="Mobile Number"
            className="w-full mb-2 p-2 border rounded"
          />
          <select
            name="gender"
            value={editForm.gender}
            onChange={handleEditChange}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingStudent(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default StudentList;
