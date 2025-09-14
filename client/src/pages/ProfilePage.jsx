import { useState, useRef } from "react";
import { Edit, Menu, Camera } from "lucide-react";

export default function ProfilePage() {
    
    const fileInputRef = useRef(null);

    // Dummy data
    const [profile, setProfile] = useState({
        name: "Arya Phansalkar",
        email: "arya@mituniv.edu",
        photo: "https://via.placeholder.com/100",
        mobile: "+91-9876543210",
        abcId: "ABC123",
        institution: "MIT ADT University",
        degree: "B.Tech",
        branch: "CSE - AI & Analytics",
        admissionYear: "2023",
        gradYear: "2027",
        currentYear: "2nd Year",
        cgpa: "8.7",
        skills: ["Python", "React", "Machine Learning"],
        projects: [
            {
                title: "Cafe Management System",
                desc: "Python project for managing cafe orders.",
                link: "https://github.com/example/cafe-project",
            },
        ],
        internships: [
            {
                company: "ABC Corp",
                role: "Intern - Data Science",
                duration: "2 months",
            },
        ],
    });

    // Handle photo upload
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfile((prev) => ({ ...prev, photo: imageUrl }));
        }
    };

    return (
        <div className="min-h-screen bg-purple-50">

            {/* Profile Page */}
            <div className="flex flex-col items-center py-10 space-y-6">
                <h1 className="text-3xl font-bold text-black mb-5">Profile</h1>

                {/* Profile Header */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 flex items-center space-x-6">
                    <div className="relative">
                        <img
                            src={profile.photo}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                        />
                        {/* Edit Icon Overlay */}
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white shadow-md hover:bg-purple-700"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                            className="hidden"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-purple-700">
                            {profile.name}
                        </h2>
                        <p className="text-gray-500">{profile.email}</p>
                    </div>
                </div>

                {/* University Details */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">
                        University Details
                    </h3>
                    <div className="space-y-2 text-gray-700">
                        <p>
                            <span className="font-semibold">Institution:</span>{" "}
                            {profile.institution}
                        </p>
                        <p>
                            <span className="font-semibold">Degree:</span> {profile.degree}
                        </p>
                        <p>
                            <span className="font-semibold">Branch:</span> {profile.branch}
                        </p>
                        <p>
                            <span className="font-semibold">Admission Year:</span>{" "}
                            {profile.admissionYear}
                        </p>
                        <p>
                            <span className="font-semibold">Graduation Year:</span>{" "}
                            {profile.gradYear}
                        </p>
                        <p>
                            <span className="font-semibold">Current Year:</span>{" "}
                            {profile.currentYear}
                        </p>
                        <p>
                            <span className="font-semibold">CGPA:</span> {profile.cgpa}
                        </p>
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">
                        Experience
                    </h3>

                    {/* Projects */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Projects:</h4>
                        <ul className="list-disc ml-6 space-y-1">
                            {profile.projects.map((proj, idx) => (
                                <li key={idx}>
                                    <span className="font-medium">{proj.title}</span> - {proj.desc}
                                    {proj.link && (
                                        <a
                                            href={proj.link}
                                            className="text-purple-600 ml-2 underline"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Link
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Internships */}
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Internships:</h4>
                        <ul className="list-disc ml-6 space-y-1">
                            {profile.internships.map((intern, idx) => (
                                <li key={idx}>
                                    {intern.company} - {intern.role} ({intern.duration})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Edit Button */}
                <div className="flex justify-center mt-6">
                    <button className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
                        <Edit className="w-5 h-5 mr-2" /> Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
