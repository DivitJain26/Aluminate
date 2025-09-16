import {
    Building,
    BookOpen,
    Calendar,
    User,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { Link } from 'react-router-dom';

export default function AlumniCard({ person, loading }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {person.name?.charAt(0)?.toUpperCase() || "A"}
                    </div>
                    <div className="ml-4 flex-1">
                        <h3 className="text-lg font-semibold text-purple-900 truncate">
                            {person.name}
                        </h3>
                        <p className="text-purple-600 text-sm font-medium">Alumni</p>
                    </div>
                </div>

                <div className="space-y-3 mb-6 text-gray-700">
                    <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
                        <span className="text-sm truncate" title={person.collegeName}>
                            {person.collegeName}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
                        <span className="text-sm truncate">
                            {person.course} - {person.specialization}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
                        <span className="text-sm">Graduated {person.yearOfPassing}</span>
                    </div>

                    {person.currentCompany && (
                        <div className="flex items-center">
                            <Building className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
                            <span className="text-sm truncate" title={person.currentCompany}>
                                {person.currentPosition ? `${person.currentPosition} at ` : ""}
                                {person.currentCompany}
                            </span>
                        </div>
                    )}

                    {person.skills && person.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {person.skills.slice(0, 3).map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                            {person.skills.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    +{person.skills.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <Link
                    to={`/view-profile/${person._id}`}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
                >
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                </Link>
            </div>
        </div>
    );
}