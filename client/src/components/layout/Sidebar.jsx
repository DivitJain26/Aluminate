import { X, LogOut, Home, Search, User, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen, onLogout }) {
    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl text-purple-700 transform 
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            transition-transform duration-300 ease-in-out z-50 flex flex-col`}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-purple-200">
                <h2 className="text-xl font-bold">Menu</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-purple-600 hover:text-purple-900"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="mt-6 flex-1 px-4 space-y-3">
                <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition">
                    <Home className="w-5 h-5" /> Home
                </Link>
                <Link to="/search" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition">
                    <Search className="w-5 h-5" /> Search
                </Link>
                <Link to="/my-profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition">
                    <User className="w-5 h-5" /> Profile
                </Link>
                <Link to="/messages" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition">
                    <MessageCircle className="w-5 h-5" /> Messages
                </Link>
            </nav>

            {/* Logout (Sticky Bottom) */}
            <div className="p-4 border-t border-purple-200">
                <button
                    onClick={onLogout}
                    className="flex items-center w-full gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-purple-200 transition"
                >
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </div>
        </div>
    );
}
