import { Users, MessageSquare, Shield, BookOpen, GraduationCap, Mail } from "lucide-react";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
export default function DashboardUI() {
  const [isOpen, setIsOpen] = useState(false);
  const name = "Arya"; // replace with actual user name (from props/context)

  return (
     <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* <div
        className={`fixed top-0 left-0 h-full w-64 bg-purple-700 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6 space-y-4 px-6">
          <a href="/" className="block hover:text-purple-200">
            Home
          </a>
          <a href="/directory" className="block hover:text-purple-200">
            Alumni Directory
          </a>
          <a href="/messages" className="block hover:text-purple-200">
            Messages
          </a>
          <a href="/settings" className="block hover:text-purple-200">
            Settings
          </a>
        </nav>
      </div> */}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-6 py-8 relative">
        {/* Menu Button (fixed top-left corner) */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md hover:bg-purple-100 fixed top-4 left-4 z-30"
        >
          <Menu className="w-6 h-6 text-purple-700" />
        </button>

        {/* Welcome Section (slightly bigger but left-aligned) */}
       {/* Welcome Section */}
{/* Welcome Section */}
<div className="bg-purple-600 text-white rounded-xl p-8 mb-8 shadow-md h-85 flex items-center justify-between">
  {/* Left side: text */}
  <div>
    <h2 className="text-3xl font-bold">Welcome, {name} 🎉</h2>
    <p className="mt-4 text-purple-100 text-lg max-w-md">
  Stay connected with your alumni and explore new opportunities.  
  Find mentorship, career guidance, and networking events to help you grow.
</p>
  </div>

  {/* Right side: SVG */}
  <img 
    src="/connect2.svg" 
    alt="College illustration" 
    className="h-90 w-120 object-contain"
  />
</div>

<div className="flex-1 min-h-0">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
    {/* Stats Grid (4 boxes) */}
    <div className="grid grid-cols-2 gap-2 lg:col-span-2 h-full">
      {[
        { title: "Connected Alumni", value: "128" },
        { title: "Total Alumni", value: "560" },
        { title: "Total Students", value: "900" },
        { title: "Connected Students", value: "340" },
      ].map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md p-10 flex flex-col justify-center items-center h-full"
        >
          <h3 className="text-base font-semibold text-purple-700">
            {stat.title}
          </h3>
          <p className="mt-1 text-xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>

    {/* What's New Box */}
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h3 className="text-xl font-bold text-purple-700 mb-4">What's New</h3>
      <ul className="space-y-3 text-sm text-gray-700">
        <li>Alumni Meetup scheduled for Sept 25</li>
        <li>15 new job postings this week</li>
        <li>Student-alumni mentorship program launched</li>
        <li> Spotlight: Alumni success stories updated</li>
      </ul>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
