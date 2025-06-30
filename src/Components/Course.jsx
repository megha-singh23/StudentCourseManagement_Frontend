import Navbar from "./Navbar";

import { useState } from "react";
function Course({ courses, setCurrentPage }) {
    const [student, setStudent] = useState(() => {
        const saved = localStorage.getItem("student");
        return saved ? JSON.parse(saved) : null;
    });
    return (
        <>
            <Navbar student={student} />
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-primary">Course Catalog</h1>
                        <button
                            onClick={() => setCurrentPage('home')}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map(course => (
                            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-primary mb-2">{course.name}</h3>
                                    <div className="space-y-2 text-gray-600">
                                        <p className="flex justify-between">
                                            <span className="font-medium">Duration:</span>
                                            <span>{course.duration}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="font-medium">Fees:</span>
                                            <span className="text-green-600">{course.fees}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                            onClick={() => {
                                                if (!student) {
                                                    alert('Please login to enroll');
                                                    setIsLoginOpen(true);
                                                } else {
                                                    alert(`Enrolled in ${course.name}`);
                                                }
                                            }}
                                        >
                                            Enroll
                                        </button>
                                        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Course;