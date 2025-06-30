import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer'
import MainContent from './Components/MainContent'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Course from './Components/Course'

function App() {
    const navigate = useNavigate();
    const [student, setStudent] = useState(() => {
        const saved = localStorage.getItem("student");
        return saved ? JSON.parse(saved) : null;
    });
    useEffect(() => {
        fetchdata();
    }, []);

    const fetchdata = async () => {
        try {
            const res = await axios.get('http://localhost:8080/');
            const data = await res.data;
            console.log(data);
        } catch (error) {
            console.error(error)
        }
    };

    //      useEffect(() => {
    //     const savedStudent = JSON.parse(localStorage.getItem("student"));
    //     if (savedStudent) {
    //       setStudent(savedStudent);
    //       setCurrentPage('dashboard');
    //     }
    //   }, []);
    // const [student, setStudent] = React.useState(null);
    const [activeCard, setActiveCard] = React.useState(null);
    const [isLoginOpen, setIsLoginOpen] = React.useState(false);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState('home');
    const [courses, setCourses] = React.useState([
        { id: 1, name: 'Java Full Stack', duration: '16 weeks', fees: '₹25000' },
        { id: 2, name: 'Python Full Stack', duration: '14 weeks', fees: '₹25000' },
        { id: 3, name: 'Data Analytics', duration: '12 weeks', fees: '₹29000' },
        { id: 4, name: 'Data Science', duration: '16 weeks', fees: '₹24000' },
        { id: 5, name: '.NET Development', duration: '12 weeks', fees: '₹25000' },
        { id: 6, name: 'Digital Marketing', duration: '8 weeks', fees: '₹23000' },
        { id: 7, name: "Web Development (HTML, CSS, JS)", duration: '20 weeks', fees: '₹15000' },
        { id: 8, name: 'Data Structures and Algorithms', duration: '20 weeks', fees: '₹35000' },
        { id: 9, name: 'Android App Development', duration: '20 weeks', fees: '₹25000' },
        { id: 10, name: 'Git & GitHub Essentials', duration: '20 weeks', fees: '₹5000' }
    ]);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        mobileNumber: '',
        gender: '',
        courseIds: []
    });
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "courseIds"
                ? value.split(',').map(v => v.trim()).filter(Boolean)
                : value
        }));
    };

    useEffect(() => {
        const savedStudent = JSON.parse(localStorage.getItem("student"));
        if (savedStudent) {
            setStudent(savedStudent);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("student");
        setStudent(null);
        setCurrentPage('home');
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to register");
            }

            const result = await response.json();
            console.log("User registered:", result);

            setIsRegisterOpen(false);
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        setStudent(formData);
        setCurrentPage('dashboard');
        setFormData({
            name: '',
            email: '',
            password: '',
            mobileNumber: '',
            gender: '',
            courseIds: []
        })
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginForm.email,
                    password: loginForm.password,
                }),
            });

            if (response.ok) {
                const userData = await response.json();
                console.log("Login successful:", userData);

                localStorage.setItem('student', JSON.stringify(userData));

                navigate("/dashboard");
            } else {
                alert("Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed");
        }
    };

    const features = [
        {
            id: 1,
            title: "Course Dashboard",
            description: "Track all your courses in one centralized location with real-time updates",
            icon: "📊",
            onClick: () => setCurrentPage('courses')
        },
        {
            id: 2,
            title: "Assignment Tracker",
            description: "Never miss a deadline with our smart assignment tracking system",
            icon: "📅"
        },
        {
            id: 3,
            title: "Grade Analyzer",
            description: "Visualize your progress and get actionable insights",
            icon: "📈"
        },
        {
            id: 4,
            title: "Resource Library",
            description: "Access all your course materials in one organized place",
            icon: "📚"
        }
    ];


    if (currentPage === 'dashboard' && student) {
        return <Dashboard
            student={student}
            setStudent={setStudent}
            setCurrentPage={setCurrentPage}
            setIsLoginOpen={setIsLoginOpen}
            setIsEditOpen={setIsEditOpen}
        />;
    }
    else if (currentPage === 'courses') {
        return <Course courses={courses} setCurrentPage={setCurrentPage} />;
    }

    return (

        <>
            <div className="min-h-screen flex flex-col">
                <Navbar
                    setIsLoginOpen={setIsLoginOpen}
                    setIsRegisterOpen={setIsRegisterOpen}
                    setIsEditOpen={setIsEditOpen}
                    student={student}
                    onLogout={handleLogout}

                />

                <MainContent features={features} activeCard={activeCard} setActiveCard={setActiveCard} />
                {isLoginOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-primary">Login</h2>
                                <button
                                    onClick={() => setIsLoginOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <form className="space-y-6" onSubmit={handleSubmitLogin}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={loginForm.email}
                                        onChange={handleLoginChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={loginForm.password}
                                        onChange={handleLoginChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-secondary hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
                                >
                                    Sign In
                                </button>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                Don't have an account?
                                <button
                                    className="text-secondary ml-1 hover:underline"
                                    onClick={() => setIsRegisterOpen(true)}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                )}



                {isRegisterOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-primary">Register</h2>
                                <button
                                    onClick={() => setIsRegisterOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <form className="space-y-4" onSubmit={handleSubmitRegister}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        placeholder="Enter your mobile number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Gender
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="inline-flex items-center">
                                            <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleInputChange} className="text-primary" />
                                            <span className="ml-2">Male</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleInputChange} className="text-primary" />
                                            <span className="ml-2">Female</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input type="radio" name="gender" value="other" checked={formData.gender === "other"} onChange={handleInputChange} className="text-primary" />
                                            <span className="ml-2">Other</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="courses" className="block text-sm font-medium text-gray-700 mb-1">
                                        CourseIds
                                    </label>
                                    <input
                                        type="text"
                                        id="courses"
                                        name="courseIds"
                                        value={Array.isArray(formData.courseIds) ? formData.courseIds.join(',') : ''}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        placeholder="Enter Course IDs (e.g., 1,2,3)"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-secondary hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors mt-4"
                                >
                                    Register
                                </button>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?
                                <button
                                    className="text-secondary ml-1 hover:underline"
                                    onClick={() => setIsLoginOpen(true)}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <Footer />

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
                            <form className="space-y-4" onSubmit={handleSubmitRegister}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Gender
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={formData.gender === 'male'}
                                                onChange={handleInputChange}
                                                className="text-primary"
                                            />
                                            <span className="ml-2">Male</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={formData.gender === 'female'}
                                                onChange={handleInputChange}
                                                className="text-primary"
                                            />
                                            <span className="ml-2">Female</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="other"
                                                checked={formData.gender === 'other'}
                                                onChange={handleInputChange}
                                                className="text-primary"
                                            />
                                            <span className="ml-2">Other</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="courses" className="block text-sm font-medium text-gray-700 mb-1">
                                        Select Courses
                                    </label>
                                    <input
                                        type="text"
                                        id="courses"
                                        name="courses"
                                        value={formData.courseIds}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-secondary hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors mt-4"
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


export default App;
