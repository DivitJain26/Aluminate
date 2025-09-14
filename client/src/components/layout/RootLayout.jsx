import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function RootLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex">
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} onLogout={logout}/>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 max-w-7xl mx-auto px-6 py-8 relative">
                {/* Menu Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 rounded-md hover:bg-purple-100 fixed top-4 left-4 z-30"
                >
                    <Menu className="w-6 h-6 text-purple-700" />
                </button>

                {/* Outlet for nested routes */}
                <Outlet />
            </div>
        </div>
    );
}
