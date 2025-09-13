import { Users, MessageSquare, Shield, BookOpen, GraduationCap, Mail } from "lucide-react";

export default function DashboardUI() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-900">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl text-white p-8 mb-8 shadow-md">
        <div className="flex items-center mb-4">
          <div className="w-14 h-14 mr-4 bg-white/20 rounded-full flex items-center justify-center">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome, John Doe</h1>
            <p className="text-blue-100 text-base">
              Your personalized alumni dashboard
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-xl font-semibold">ABC University</div>
            <div className="text-blue-100">College</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-xl font-semibold">B.Tech</div>
            <div className="text-blue-100">Course</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-xl font-semibold">Computer Science</div>
            <div className="text-blue-100">Specialization</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: "Connect with Alumni",
            desc: "Find and network with graduates from your institution.",
            color: "bg-blue-600",
            icon: <Users className="w-6 h-6 text-white" />,
          },
          {
            title: "Messages",
            desc: "Communicate securely with your peers and alumni.",
            color: "bg-green-600",
            icon: <MessageSquare className="w-6 h-6 text-white" />,
          },
          {
            title: "Admin Panel",
            desc: "Manage users, permissions, and platform settings.",
            color: "bg-purple-600",
            icon: <Shield className="w-6 h-6 text-white" />,
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer border border-gray-100"
          >
            <div className="p-6">
              <div
                className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
              >
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Summary */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Academic Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700" />
              Academic Details
            </h3>
            <dl className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <dt className="text-gray-600">College</dt>
                <dd className="font-medium">ABC University</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="text-gray-600">Course</dt>
                <dd className="font-medium">B.Tech</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="text-gray-600">Specialization</dt>
                <dd className="font-medium">Computer Science</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Duration</dt>
                <dd className="font-medium">2020 - 2024</dd>
              </div>
            </dl>
          </div>

          {/* Status & Role */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-700" />
              Status & Role
            </h3>
            <dl className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <dt className="text-gray-600">Status</dt>
                <dd>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Student
                  </span>
                </dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="text-gray-600">Role</dt>
                <dd>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    Admin
                  </span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Email</dt>
                <dd className="font-medium truncate">johndoe@example.com</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
