import { Building, Calendar, Mail } from "lucide-react";

export default function ProfileHeader({ profile }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold text-3xl mb-4 md:mb-0 md:mr-6">
                    {profile.name?.charAt(0)?.toUpperCase() || "A"}
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-purple-900">{profile.name}</h1>
                    <p className="text-purple-600 text-lg mb-2">{profile.currentPosition || "Alumni"}</p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600">
                        {profile.collegeName && (
                            <div className="flex items-center">
                                <Building className="w-4 h-4 mr-1" />
                                <span>{profile.collegeName}</span>
                            </div>
                        )}

                        {profile.yearOfPassing && (
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>Class of {profile.yearOfPassing}</span>
                            </div>
                        )}

                        {profile.email && (
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                <span>{profile.email}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}