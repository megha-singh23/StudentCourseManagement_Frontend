export default function Navbar({student, onLogout, setIsLoginOpen, setIsRegisterOpen}) {
    // const student= useState(JSON.parse(localStorage.getItem("student")));
    
            return (
                <nav className="bg-primary text-white px-8 py-4 flex justify-between items-center shadow-md">
                    <a href="#" className="text-2xl font-semibold">EduTrack</a>
                    <div className="flex gap-6">
                {!student?.name ? (
                    <> <button 
                            className="px-4 py-2 rounded-md font-medium border border-white hover:bg-white hover:text-primary transition-colors"
                            onClick={() =>setIsLoginOpen(true)}>
                            Login
                        </button>
                        <button 
                            className="px-4 py-2 rounded-md font-medium bg-secondary hover:bg-blue-600 text-white transition-colors"
                            onClick={() =>setIsRegisterOpen(true)}
                        >Register</button>
                        </>
                    ) : (
                <>
                    <span className="mr-2"> <strong>Welcome, {student.name}</strong></span>
                        <button
                            onClick={onLogout}
                            className="bg-red-500 hover:bg-red-600 font-medium text-white px-4 py-1 rounded"
                        >
                        Logout
                    </button>
                </>
                )}
                    </div>
                </nav>
            );
        }
