import { useRef, } from "react";
import { Edit, Camera } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function MyProfilePage() {
    const { user } = useAuth();

    const fileInputRef = useRef(null);
    const name = user.name ?? "there"
    const email = user.email ?? "there"
    const college = user.collegeName ?? "MIT ADT University"
    const course = user.course ?? "N/A";
    const specialization = user.specialization ?? "N/A";
    const yearOfJoining = user.yearOfJoining ?? "N/A";
    const yearOfPassing = user.yearOfPassing ?? "N/A";
    const profileImage = user.profileImage ?? "";
    const bio = user.bio.length > 0 ? user.bio : "No bio added yet.";
    const skills = user.skills && user.skills.length > 0
        ? user.skills
        : ["No skills added yet"];
    const currentCompany = user.currentCompany ?? "";
    const currentPosition = user.currentPosition ?? "";
    const linkedinProfile = user.linkedinProfile ?? "";
    const githubProfile = user.githubProfile ?? "";


    return (
        <div className="min-h-screen bg-purple-50">

            {/* Profile Page */}
            <div className="flex flex-col items-center py-10 space-y-6">
                <h1 className="text-3xl font-bold text-black mb-5">Profile</h1>

                {/* Profile Header */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 flex items-center space-x-6">
                    <div className="relative">
                        <img
                            src={profileImage || "https://via.placeholder.com/100"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                        />
                        {/* Edit Icon Overlay */}
                        <Link to="/edit-profile">
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white shadow-md hover:bg-purple-700"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-purple-700">
                            {name}
                        </h2>
                        <p className="text-gray-500">{email}</p>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">
                        Bio
                    </h3>
                    <div className="space-y-2 text-gray-700">
                        <p>{bio}</p>
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
                            {college}
                        </p>
                        <p>
                            <span className="font-semibold">Course:</span> {course}
                        </p>
                        <p>
                            <span className="font-semibold">Specialization:</span> {specialization}
                        </p>
                        <p>
                            <span className="font-semibold">Admission Year:</span>{" "}
                            {yearOfJoining}
                        </p>
                        <p>
                            <span className="font-semibold">Graduation Year:</span>{" "}
                            {yearOfPassing}
                        </p>

                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {(skills
                            ? Array.isArray(skills)
                                ? skills
                                : skills.split(",").map(s => s.trim())
                            : ["No skills added yet"]
                        ).map((skill, idx) => (
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
                        Job/Internship Experience
                    </h3>
                    <div className="space-y-2 text-gray-700">
                        <p>
                            <span className="font-semibold">Current Company:</span>{" "}
                            {currentCompany}
                        </p>
                        <p>
                            <span className="font-semibold">Current Position:</span>{" "}
                            {currentPosition}
                        </p>

                    </div>

                </div>

                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">
                        Additional Information
                    </h3>
                    <div className="space-y-2 text-gray-700">
                        <p>
                            <span className="font-semibold">LinkedIn:</span>{" "}
                            {linkedinProfile}
                        </p>
                        <p>
                            <span className="font-semibold">Github:</span>{" "}
                            {githubProfile}
                        </p>
                    </div>

                </div>

                {/* Edit Button */}
                <div className="flex justify-center mt-6">
                    <Link to="/edit-profile">
                        <button className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
                            <Edit className="w-5 h-5 mr-2" /> Edit
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
