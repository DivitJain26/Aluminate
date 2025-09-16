import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building, BookOpen, Calendar, MessageCircle, Link as LinkIcon, Github, ChevronLeft, Linkedin} from "lucide-react";
import { usersAPI } from '../../utils/api';
import ProfileHeader from '../../components/ui/ProfileHeader';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';

export default function ViewProfilePage() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await usersAPI.getUserById(id);

                if (response.data.success) {
                    setProfile(response.data.data);
                } else {
                    setError('Profile not found');
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProfile();
        }
    }, [id]);

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-purple-800 mb-4">Profile Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || "The requested profile doesn't exist"}</p>
                    <Link
                        to="/search"
                        className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
                    >
                        Back to Search
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-purple-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Back Button */}
                <Link
                    to="/search"
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back to Search
                </Link>

                {/* Profile Header */}
                <ProfileHeader profile={profile} />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Personal Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Education */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-purple-700 mb-4">Education</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Building className="w-5 h-5 text-purple-500 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">{profile.collegeName}</p>
                                        <p className="text-gray-600">{profile.course} - {profile.specialization}</p>
                                        <p className="text-sm text-gray-500">
                                            {profile.yearOfJoining} - {profile.yearOfPassing}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Experience */}
                        {(profile.currentCompany || profile.currentPosition) && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-purple-700 mb-4">Professional Experience</h3>
                                <div className="flex items-start">
                                    <Building className="w-5 h-5 text-purple-500 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        {profile.currentPosition && (
                                            <p className="font-medium">{profile.currentPosition}</p>
                                        )}
                                        {profile.currentCompany && (
                                            <p className="text-gray-600">{profile.currentCompany}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Bio */}
                        {profile.bio && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-purple-700 mb-4">About</h3>
                                <p className="text-gray-700">{profile.bio}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Additional Info */}
                    <div className="space-y-6">
                        {/* Skills */}
                        {profile.skills && profile.skills.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-purple-700 mb-4">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact & Links */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-purple-700 mb-4">Connect</h3>

                            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition mb-4 flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Send Message
                            </button>

                            <div className="space-y-3">
                                {profile.linkedinProfile && (
                                    <a
                                        href={profile.linkedinProfile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-600 hover:text-blue-800"
                                    >
                                        <Linkedin className="w-5 h-5 mr-2" />
                                        LinkedIn Profile
                                    </a>
                                )}

                                {profile.githubProfile && (
                                    <a
                                        href={profile.githubProfile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-gray-800 hover:text-gray-900"
                                    >
                                        <Github className="w-5 h-5 mr-2" />
                                        GitHub Profile
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}