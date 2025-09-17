import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Building,
    BookOpen,
    Calendar,
    MessageCircle,
    Mail,
    MapPin,
    Award,
    Github,
    ChevronLeft,
    Linkedin,
    Briefcase,
    User,
    Star,
    ExternalLink
} from "lucide-react";
import { usersAPI } from '../../utils/api.js';
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

    // Calculate years of experience
    const calculateExperience = (experience) => {
        if (!experience || experience.length === 0) return 0;

        const sortedExp = [...experience].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        const earliestStart = new Date(sortedExp[0].startDate);
        const currentDate = new Date();

        return Math.floor((currentDate - earliestStart) / (365.25 * 24 * 60 * 60 * 1000));
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-purple-50 flex items-center justify-center px-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-purple-800 mb-4">Profile Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || "The requested profile doesn't exist"}</p>
                    <Link
                        to="/search"
                        className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition inline-flex items-center"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Search
                    </Link>
                </div>
            </div>
        );
    }

    const yearsOfExperience = calculateExperience(profile.experience);

    return (
        <div className="min-h-screen bg-purple-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        to="/search"
                        className="inline-flex items-center text-purple-700 hover:text-purple-900 font-medium bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Back to Search
                    </Link>
                </div>

                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <ProfileHeader profile={profile} />

                    {/* Stats Bar */}
                    <div className="border-t border-gray-100">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                            <div className="p-4 text-center">
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="font-semibold text-purple-700 capitalize">{profile.currentStatus}</p>
                            </div>
                            <div className="p-4 text-center">
                                <p className="text-sm text-gray-500">Course</p>
                                <p className="font-semibold text-purple-700">{profile.course}</p>
                            </div>
                            <div className="p-4 text-center">
                                <p className="text-sm text-gray-500">Specialization</p>
                                <p className="font-semibold text-purple-700">{profile.specialization}</p>
                            </div>
                            <div className="p-4 text-center">
                                <p className="text-sm text-gray-500">Experience</p>
                                <p className="font-semibold text-purple-700">
                                    {yearsOfExperience > 0 ? `${yearsOfExperience}+ years` : 'Fresh Graduate'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Personal Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Professional Summary */}
                        {profile.bio && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-purple-600" />
                                    Professional Summary
                                </h3>
                                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                            </div>
                        )}

                        {/* Professional Experience */}
                        {profile.experience && profile.experience.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-purple-800 mb-6 flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                                    Professional Experience
                                </h3>
                                <div className="space-y-6">
                                    {profile.experience.map((job, index) => (
                                        <div key={index} className="relative pl-8 pb-6 border-l-2 border-purple-200 last:pb-0">
                                            <div className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-600 rounded-full"></div>
                                            <div className="mb-1">
                                                <h4 className="text-lg font-semibold text-gray-900">{job.position}</h4>
                                                <p className="text-purple-700 font-medium">{job.company}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-3">
                                                {new Date(job.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {job.isCurrent ? 'Present' : new Date(job.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                <span className="mx-2">•</span>
                                                {calculateJobDuration(job.startDate, job.endDate, job.isCurrent)}
                                            </p>
                                            {job.description && (
                                                <p className="text-gray-700 mt-2 leading-relaxed">{job.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-purple-800 mb-6 flex items-center">
                                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                                Education
                            </h3>
                            <div className="space-y-6">
                                <div className="relative pl-8">
                                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-600 rounded-full"></div>
                                    <h4 className="text-lg font-semibold text-gray-900">{profile.course} - {profile.specialization}</h4>
                                    <p className="text-purple-700 font-medium">{profile.collegeName}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {profile.yearOfJoining} - {profile.yearOfPassing}
                                        <span className="mx-2">•</span>
                                        {profile.yearOfPassing - profile.yearOfJoining} years
                                    </p>
                                    {profile.abcId && (
                                        <p className="text-sm text-gray-600 mt-2">
                                            <span className="font-medium">ID:</span> {profile.abcId}
                                        </p>
                                    )}
                                    {profile.enrollment && (
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Enrollment:</span> {profile.enrollment}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Additional Info */}
                    <div className="space-y-8">
                        {/* Skills */}
                        {profile.skills && profile.skills.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                                    <Award className="w-5 h-5 mr-2 text-purple-600" />
                                    Skills & Expertise
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {profile.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium shadow-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact & Links */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-purple-800 mb-5 flex items-center">
                                <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
                                Connect
                            </h3>

                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl transition mb-6 flex items-center justify-center font-medium shadow-md hover:shadow-lg">
                                <Mail className="w-5 h-5 mr-2" />
                                Send Message
                            </button>

                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-700 border-b pb-2">Professional Profiles</h4>

                                {profile.linkedinProfile && (
                                    <a
                                        href={profile.linkedinProfile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition group"
                                    >
                                        <div className="flex items-center">
                                            <Linkedin className="w-5 h-5 mr-3 text-blue-700" />
                                            <span className="text-blue-700 font-medium">LinkedIn</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-blue-700 opacity-0 group-hover:opacity-100 transition" />
                                    </a>
                                )}

                                {profile.githubProfile && (
                                    <a
                                        href={profile.githubProfile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition group"
                                    >
                                        <div className="flex items-center">
                                            <Github className="w-5 h-5 mr-3 text-gray-800" />
                                            <span className="text-gray-800 font-medium">GitHub</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-gray-800 opacity-0 group-hover:opacity-100 transition" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                                Additional Information
                            </h3>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">City</span>
                                    <span className="font-medium text-purple-700">
                                        {profile.city || "Not specified"}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Member Since</span>
                                    <span className="font-medium text-purple-700">
                                        {new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Last Active</span>
                                    <span className="font-medium text-purple-700">
                                        {new Date(profile.lastLoginAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status</span>
                                    <span className="font-medium text-purple-700 capitalize">{profile.currentStatus}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function to calculate job duration
function calculateJobDuration(startDate, endDate, isCurrent) {
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : new Date(endDate);

    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();

    let duration = '';
    if (years > 0) duration += `${years} yr${years > 1 ? 's' : ''} `;
    if (months > 0 || years === 0) duration += `${months} mo${months !== 1 ? 's' : ''}`;

    return duration.trim();
}