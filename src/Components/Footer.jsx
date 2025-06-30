export default function Footer() {
    return (
        <footer className="bg-primary text-white py-8 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">EduTrack</h3>
                    <p className="text-gray-300">
                        Empowering students with the tools they need for academic success.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
                        <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
                        <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} EduTrack. All rights reserved.</p>
            </div>
        </footer>
    );
}
