import { useRef } from "react";
import { Edit, Camera } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function MyProfilePage() {
    const { user } = useAuth();
    const fileInputRef = useRef(null);

    // Create a userData object with defaults
    const userData = {
        name: user?.name ?? "there",
        email: user?.email ?? "there",
        college: user?.collegeName ?? "MIT ADT University",
        course: user?.course ?? "N/A",
        specialization: user?.specialization ?? "N/A",
        yearOfJoining: user?.yearOfJoining ?? "N/A",
        yearOfPassing: user?.yearOfPassing ?? "N/A",
        profileImage: user?.profileImage ?? "",
        bio: user?.bio?.length > 0 ? user.bio : "No bio added yet.",
        skills: user?.skills && user.skills.length > 0 ? user.skills : ["No skills added yet"],
        experience: user?.experience ?? [],
        linkedinProfile: user?.linkedinProfile ?? "",
        githubProfile: user?.githubProfile ?? "",
        city: user?.city ?? "N/A" 
    };

    return (
        <div className="min-h-screen bg-purple-50">
            <div className="flex flex-col items-center py-10 space-y-6">
                <h1 className="text-3xl font-bold text-black mb-5">Profile</h1>

                {/* Profile Header */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 flex items-center space-x-6">
                    <div className="relative">
                        <img
                            src={userData.profileImage || "https://via.placeholder.com/100"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                        />
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
                            {userData.name}
                        </h2>
                        <p className="text-gray-500">{userData.email}</p>
                    </div>
                </div>

                {/* Bio */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">Bio</h3>
                    <p className="text-gray-700">{userData.bio}</p>
                </div>

                {/* University Details */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">University Details</h3>
                    <div className="space-y-2 text-gray-700">
                        <p><span className="font-semibold">Institution:</span> {userData.college}</p>
                        <p><span className="font-semibold">Course:</span> {userData.course}</p>
                        <p><span className="font-semibold">Specialization:</span> {userData.specialization}</p>
                        <p><span className="font-semibold">Admission Year:</span> {userData.yearOfJoining}</p>
                        <p><span className="font-semibold">Graduation Year:</span> {userData.yearOfPassing}</p>
                        <p><span className="font-semibold">City:</span> {userData.city}</p>
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {userData.skills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">Job/Internship Experience</h3>
                    <div className="space-y-4 text-gray-700">
                        {userData.experience.length > 0 ? (
                            userData.experience.map((job, idx) => (
                                <div key={idx} className="border-l-4 border-purple-300 pl-4 py-2">
                                    <p><span className="font-semibold">Company:</span> {job.company}</p>
                                    <p><span className="font-semibold">Position:</span> {job.position}</p>
                                    <p><span className="font-semibold">Duration:</span> {new Date(job.startDate).toLocaleDateString()} - {job.isCurrent ? "Present" : new Date(job.endDate).toLocaleDateString()}</p>
                                    {job.description && <p><span className="font-semibold">Description:</span> {job.description}</p>}
                                </div>
                            ))
                        ) : (
                            <p>No job/internship experience added yet.</p>
                        )}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6">
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">Additional Information</h3>
                    <p><span className="font-semibold">LinkedIn:</span> {userData.linkedinProfile}</p>
                    <p><span className="font-semibold">Github:</span> {userData.githubProfile}</p>
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
