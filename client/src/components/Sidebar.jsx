import { X } from "lucide-react";
import { Link } from "react-router-dom";
export default function Sidebar({ isOpen, setIsOpen }) {
    // const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-white text-purple-700 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
        >
            <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={() => setIsOpen(false)}>
                    <X className="w-6 h-6" />
                </button>
            </div>
            <nav className="mt-6 space-y-4 px-6">
                <Link to="/dashboard" className="block hover:text-purple-200">
                    Home
                </Link>
                <Link to="/search" className="block hover:text-purple-200">
                    Search
                </Link>
                <Link to="/profile" className="block hover:text-purple-200">
                    Profile
                </Link>
                <Link to="/messages" className="block hover:text-purple-200">
                    Messages
                </Link>
            </nav>
        </div>
    );
}
